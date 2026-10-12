export const SIZE = { width: 30, height: 20 };
export const TYPES = {
  extractor: {
    name: "Extractor",
    color: 0x52dfdc,
    description: "Extrae cobre. Su flecha indica la salida.",
    duration: 2.4,
  },
  cinta: {
    name: "Cinta",
    color: 0x89a6c5,
    description: "Transporta una pieza hacia la celda indicada por la flecha.",
    duration: 0.9,
  },
  fundidor: {
    name: "Fundidor",
    color: 0xffb26b,
    description: "Convierte 1 cobre en 1 placa en 3 segundos.",
    duration: 3,
  },
  ensamblador: {
    name: "Ensamblador",
    color: 0xb9a0ff,
    description: "Convierte 2 placas en 1 circuito en 4 segundos.",
    duration: 4,
  },
  almacen: {
    name: "Almacén",
    color: 0x91e4a3,
    description:
      "Guarda las piezas recibidas. Consulta sus existencias en SQL.",
    duration: 0,
  },
};
export const MATERIALS = {
  cobre: "Cobre",
  placa: "Placas",
  circuito: "Circuitos",
};
export const DIRS = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];
export function makeNode(type, x, y, dir = 0, id) {
  return {
    id,
    type,
    x,
    y,
    dir,
    enabled: type === "cinta" || type === "almacen",
    progress: 0,
    input: [],
    output: null,
    stock: { cobre: 0, placa: 0, circuito: 0 },
    produced: 0,
  };
}
export function newFactory() {
  const nodes = [];
  const add = (type, x, y, dir, id) =>
    nodes.push(makeNode(type, x, y, dir, id));
  add("extractor", 8, 7, 0, "extractor_1");
  for (let x = 9; x < 12; x++) add("cinta", x, 7, 0, `cinta_${x - 8}`);
  add("fundidor", 12, 7, 0, "fundidor_1");
  for (let x = 13; x < 16; x++) add("cinta", x, 7, 0, `cinta_${x - 9}`);
  add("ensamblador", 16, 7, 0, "ensamblador_1");
  add("cinta", 17, 7, 0, "cinta_7");
  add("cinta", 18, 7, 1, "cinta_8");
  add("cinta", 18, 8, 1, "cinta_9");
  add("cinta", 18, 9, 2, "cinta_10");
  add("almacen", 17, 9, 0, "almacen_1");
  return {
    version: 1,
    nodes,
    packets: [],
    time: 0,
    produced: 0,
    nextId: 20,
    history: [],
    completed: [],
    tutorial: false,
  };
}
export function at(state, x, y) {
  return state.nodes.find((n) => n.x === x && n.y === y);
}
export function place(state, type, x, y, dir) {
  if (
    !TYPES[type] ||
    !Number.isInteger(x) ||
    !Number.isInteger(y) ||
    x < 0 ||
    y < 0 ||
    x >= SIZE.width ||
    y >= SIZE.height
  )
    throw new Error("Construye dentro del terreno.");
  if (at(state, x, y))
    throw new Error(
      "Esta celda ya está ocupada. Selecciona la máquina o usa Desmontar.",
    );
  if (state.nodes.length >= 300)
    throw new Error("Límite de esta fábrica: 300 elementos.");
  const node = makeNode(type, x, y, dir, `${type}_${state.nextId++}`);
  state.nodes.push(node);
  return node;
}
export function remove(state, id) {
  const node = state.nodes.find((n) => n.id === id);
  if (!node) return;
  if (
    node.input.length ||
    node.output ||
    Object.values(node.stock).some(Boolean) ||
    node.progress ||
    state.packets.some((p) => p.to === id || p.from === id)
  )
    throw new Error(
      "Vacía y detén esta máquina antes de desmontarla; contiene material o tiene una entrega en curso.",
    );
  state.nodes = state.nodes.filter((n) => n.id !== id);
}
function accepts(node, material) {
  if (node.type === "almacen") return true;
  if (node.input.length >= (node.type === "ensamblador" ? 4 : 1)) return false;
  return (
    node.type === "cinta" ||
    (node.type === "fundidor" && material === "cobre") ||
    (node.type === "ensamblador" && material === "placa")
  );
}
export function status(state, node) {
  if (node.type === "almacen") return "Recibiendo materiales";
  if (!node.enabled) return "Desactivada";
  if (node.output) return "Salida bloqueada";
  if (node.progress > 0) return "Trabajando";
  if (node.type === "extractor") return "Extrayendo cobre";
  if (node.type === "cinta") return "Esperando una pieza";
  return node.type === "fundidor" ? "Necesita 1 cobre" : "Necesita 2 placas";
}
export function tick(state, delta) {
  // Fixed substeps ensure long render frames cannot skip deliveries or manufacturing.
  let remaining = Math.min(Math.max(delta, 0), 10);
  while (remaining > 0) {
    const dt = Math.min(remaining, 0.05);
    step(state, dt);
    remaining -= dt;
  }
}
function step(s, dt) {
  s.time += dt;
  for (const p of [...s.packets]) {
    p.progress += dt / p.duration;
    if (p.progress < 1) continue;
    const target = s.nodes.find((n) => n.id === p.to);
    if (target) {
      if (target.type === "almacen") target.stock[p.material]++;
      else target.input.push(p.material);
    }
    s.packets.splice(s.packets.indexOf(p), 1);
  }
  for (const n of s.nodes) {
    if (!n.enabled || n.type === "almacen") continue;
    if (n.output) {
      const [dx, dy] = DIRS[n.dir],
        dest = at(s, n.x + dx, n.y + dy);
      if (
        dest &&
        accepts(dest, n.output) &&
        !s.packets.some((p) => p.to === dest.id)
      ) {
        s.packets.push({
          id: s.nextId++,
          from: n.id,
          to: dest.id,
          material: n.output,
          progress: 0,
          duration: n.type === "cinta" ? 0.65 : 0.85,
        });
        n.output = null;
      }
      continue;
    }
    const ready =
      n.type === "extractor" ||
      (n.type === "cinta" && n.input.length) ||
      (n.type === "fundidor" && n.input.includes("cobre")) ||
      (n.type === "ensamblador" &&
        n.input.filter((x) => x === "placa").length >= 2);
    if (!ready) continue;
    n.progress += dt / TYPES[n.type].duration;
    if (n.progress < 1) continue;
    n.progress = 0;
    if (n.type === "extractor") n.output = "cobre";
    if (n.type === "cinta") n.output = n.input.shift();
    if (n.type === "fundidor") {
      n.input.shift();
      n.output = "placa";
    }
    if (n.type === "ensamblador") {
      n.input.splice(0, 2);
      n.output = "circuito";
      s.produced++;
    }
    if (n.type !== "cinta") {
      n.produced++;
      s.history.push({
        id: s.nextId++,
        segundo: Math.round(s.time * 10) / 10,
        maquina: n.id,
        material: n.output,
        cantidad: 1,
      });
      if (s.history.length > 2000) s.history.shift();
    }
  }
  if (s.produced >= 1 && !s.completed.includes("primero"))
    s.completed.push("primero");
  if (s.produced >= 8 && !s.completed.includes("ocho"))
    s.completed.push("ocho");
}
export function inventory(state, material) {
  return state.nodes.reduce((sum, n) => sum + (n.stock[material] || 0), 0);
}
export function validateFactory(raw) {
  if (
    !raw ||
    raw.version !== 1 ||
    !Array.isArray(raw.nodes) ||
    raw.nodes.length > 300 ||
    !Array.isArray(raw.packets) ||
    raw.packets.length > 600
  )
    throw new Error("El archivo no contiene una fábrica compatible.");
  const s = structuredClone(raw),
    ids = new Set(),
    cells = new Set();
  const finite = (n, max = 1e9) =>
    typeof n === "number" && Number.isFinite(n) && n >= 0 && n <= max;
  for (const n of s.nodes) {
    if (
      !Object.hasOwn(TYPES, n.type) ||
      typeof n.id !== "string" ||
      !/^\w{1,60}$/.test(n.id) ||
      ids.has(n.id) ||
      !Number.isInteger(n.x) ||
      !Number.isInteger(n.y) ||
      n.x < 0 ||
      n.x >= SIZE.width ||
      n.y < 0 ||
      n.y >= SIZE.height ||
      cells.has(`${n.x},${n.y}`) ||
      ![0, 1, 2, 3].includes(n.dir) ||
      typeof n.enabled !== "boolean" ||
      !finite(n.progress, 1.1) ||
      !finite(n.produced) ||
      !Array.isArray(n.input) ||
      n.input.length > 4 ||
      n.input.some((m) => !Object.hasOwn(MATERIALS, m)) ||
      (n.output !== null && !Object.hasOwn(MATERIALS, n.output)) ||
      !n.stock ||
      Object.keys(MATERIALS).some(
        (k) => !Number.isInteger(n.stock[k]) || !finite(n.stock[k]),
      )
    )
      throw new Error("La sesión contiene una máquina inválida.");
    ids.add(n.id);
    cells.add(`${n.x},${n.y}`);
  }
  for (const p of s.packets)
    if (
      !ids.has(p.to) ||
      !ids.has(p.from) ||
      !Object.hasOwn(MATERIALS, p.material) ||
      !finite(p.progress, 1) ||
      !finite(p.duration, 10) ||
      p.duration === 0
    )
      throw new Error("Entrega inválida en la sesión.");
  if (
    !finite(s.time) ||
    !finite(s.produced) ||
    !Number.isSafeInteger(s.nextId) ||
    s.nextId < 1 ||
    !Array.isArray(s.history) ||
    s.history.length > 2000 ||
    !Array.isArray(s.completed) ||
    s.completed.some((x) => !["primero", "ocho", "sql"].includes(x))
  )
    throw new Error("Datos de progreso inválidos.");
  for (const h of s.history)
    if (
      !finite(h.id) ||
      !finite(h.segundo) ||
      typeof h.maquina !== "string" ||
      h.maquina.length > 60 ||
      !Object.hasOwn(MATERIALS, h.material) ||
      h.cantidad !== 1
    )
      throw new Error("Historial inválido.");
  return s;
}
