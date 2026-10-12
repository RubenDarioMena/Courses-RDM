import test from "node:test";
import assert from "node:assert/strict";
import {
  newFactory,
  tick,
  place,
  remove,
  inventory,
  validateFactory,
  makeNode,
} from "../arena/factory/model.js";
import { validateSession, snapshot } from "../arena/factory/storage.js";
import {
  createDatabase,
  syncDatabase,
  dumpDatabase,
} from "../arena/factory/database.js";
test("la línea produce circuitos por pasos, conserva material y completa el objetivo", () => {
  const s = newFactory();
  s.nodes.forEach((n) => (n.enabled = true));
  tick(s, 1);
  assert.equal(s.produced, 0);
  assert.ok(s.nodes[0].progress > 0);
  assert.equal(s.packets.length, 0);
  for (let i = 0; i < 2400; i++) tick(s, 0.1);
  assert.ok(inventory(s, "circuito") >= 8);
  assert.ok(s.completed.includes("ocho"));
  const weights = { cobre: 1, placa: 1, circuito: 2 };
  const extracted = s.nodes
    .filter((n) => n.type === "extractor")
    .reduce((v, n) => v + n.produced, 0);
  const present =
    s.nodes.reduce(
      (v, n) =>
        v +
        n.input.reduce((q, m) => q + weights[m], 0) +
        (n.output ? weights[n.output] : 0) +
        Object.entries(n.stock).reduce((q, [m, c]) => q + weights[m] * c, 0),
      0,
    ) + s.packets.reduce((v, p) => v + weights[p.material], 0);
  assert.equal(extracted, present);
});
test("una salida sin conexión acumula una pieza, sin inventar producción", () => {
  const s = newFactory();
  s.nodes = [s.nodes[0]];
  s.nodes[0].enabled = true;
  for (let i = 0; i < 10; i++) tick(s, 10);
  assert.equal(s.nodes[0].produced, 1);
  assert.equal(s.nodes[0].output, "cobre");
});
test("los componentes construidos y girados forman otra línea funcional", () => {
  const s = newFactory();
  s.nodes = [];
  const ex = place(s, "extractor", 2, 2, 1),
    belt = place(s, "cinta", 2, 3, 1),
    store = place(s, "almacen", 2, 4, 0);
  ex.enabled = true;
  for (let i = 0; i < 100; i++) tick(s, 0.2);
  assert.ok(store.stock.cobre > 0);
  assert.throws(() => remove(s, store.id), /Vacía/);
  assert.throws(() => place(s, "cinta", 2, 3, 0), /ocupada/);
  assert.throws(() => place(s, "cinta", -1, 3, 0), /terreno/);
});
test("guardar durante el transporte y restaurar reproduce el mismo futuro", () => {
  const s = newFactory();
  s.nodes.forEach((n) => (n.enabled = true));
  tick(s, 5.1);
  assert.ok(s.packets.length > 0);
  const restored = validateSession(
    JSON.parse(JSON.stringify(snapshot(s, "const x=1;", "SELECT 1;"))),
  ).factory;
  for (let i = 0; i < 250; i++) {
    tick(s, 0.1);
    tick(restored, 0.1);
  }
  assert.deepEqual(restored, s);
});
test("sesiones corruptas se rechazan antes de reemplazar el mundo", () => {
  const s = newFactory();
  s.nodes[0].x = NaN;
  assert.throws(() => validateFactory(s));
  const duplicate = newFactory();
  duplicate.nodes.push(structuredClone(duplicate.nodes[0]));
  assert.throws(() => validateFactory(duplicate));
  assert.throws(() => validateSession({ version: 1 }));
});
test("PostgreSQL consulta datos reales y exporta pedidos y tablas del alumno", async () => {
  const db = await createDatabase();
  const s = newFactory();
  s.nodes.forEach((n) => (n.enabled = true));
  for (let i = 0; i < 30; i++) tick(s, 10);
  await syncDatabase(db, s);
  const result = await db.query(
    "SELECT SUM(cantidad)::int AS total FROM inventario WHERE material = 'circuito'",
  );
  assert.equal(result.rows[0].total, inventory(s, "circuito"));
  await db.exec(
    "CREATE TABLE notas (texto text); INSERT INTO notas VALUES ('mi fábrica'); INSERT INTO pedidos(material,cantidad) VALUES ('circuito',24);",
  );
  const bytes = await dumpDatabase(db);
  const restored = await createDatabase(bytes);
  assert.equal(
    (await restored.query("SELECT * FROM notas")).rows[0].texto,
    "mi fábrica",
  );
  assert.equal(
    (await restored.query("SELECT COUNT(*)::int AS total FROM pedidos")).rows[0]
      .total,
    3,
  );
  await restored.close();
  await db.close();
});
