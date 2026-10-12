import { PGlite } from "@electric-sql/pglite";
export async function createDatabase(bytes) {
  const db = await PGlite.create({
    ...(bytes ? { loadDataDir: new Blob([bytes]) } : {}),
    wasmModule: undefined,
  });
  await db.exec(`CREATE TABLE IF NOT EXISTS inventario (almacen text, material text, cantidad integer, PRIMARY KEY (almacen,material));
    CREATE TABLE IF NOT EXISTS produccion (id bigint PRIMARY KEY, segundo numeric, maquina text, material text, cantidad integer);
    CREATE TABLE IF NOT EXISTS maquinas (id text PRIMARY KEY, tipo text, activa boolean, producidas integer);
    CREATE TABLE IF NOT EXISTS pedidos (id serial PRIMARY KEY, material text NOT NULL CHECK(material IN ('cobre','placa','circuito')), cantidad integer NOT NULL CHECK(cantidad>0), entregado boolean NOT NULL DEFAULT false);`);
  if (!bytes)
    await db.exec(
      "INSERT INTO pedidos(material,cantidad) VALUES ('circuito',8),('placa',12)",
    );
  return db;
}
export async function syncDatabase(db, state) {
  await db.transaction(async (tx) => {
    await tx.exec(
      "DELETE FROM inventario; DELETE FROM produccion; DELETE FROM maquinas;",
    );
    for (const n of state.nodes) {
      await tx.query("INSERT INTO maquinas VALUES ($1,$2,$3,$4)", [
        n.id,
        n.type,
        n.enabled,
        n.produced,
      ]);
      if (n.type === "almacen")
        for (const [m, q] of Object.entries(n.stock))
          await tx.query("INSERT INTO inventario VALUES ($1,$2,$3)", [
            n.id,
            m,
            q,
          ]);
    }
    if (state.history.length)
      await tx.query(
        `INSERT INTO produccion SELECT id,segundo,maquina,material,cantidad FROM json_to_recordset($1::json) AS t(id bigint,segundo numeric,maquina text,material text,cantidad integer)`,
        [JSON.stringify(state.history)],
      );
  });
}
export async function dumpDatabase(db) {
  const result = await db.dumpDataDir("gzip");
  return new Uint8Array(await result.arrayBuffer());
}
export function bytesToBase64(bytes) {
  let s = "";
  for (let i = 0; i < bytes.length; i += 8192)
    s += String.fromCharCode(...bytes.subarray(i, i + 8192));
  return btoa(s);
}
export function base64ToBytes(s) {
  if (typeof s !== "string" || s.length > 40000000)
    throw new Error("Base de datos de sesión demasiado grande.");
  return Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
}
