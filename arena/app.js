import { EditorView, basicSetup } from "codemirror";
import { StateEffect, StateField } from "@codemirror/state";
import { Decoration } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import { sql, PostgreSQL } from "@codemirror/lang-sql";
import { oneDark } from "@codemirror/theme-one-dark";
import { createWorld } from "./factory/world.js";
import {
  newFactory,
  at,
  place,
  remove,
  tick,
  TYPES,
  MATERIALS,
  inventory,
  status,
} from "./factory/model.js";
import {
  snapshot,
  loadLocal,
  saveLocal,
  validateSession,
  storeDatabase,
  loadDatabase,
} from "./factory/storage.js";
const $ = (id) => document.getElementById(id);
const highlight = StateEffect.define();
const activeLine = StateField.define({
  create: () => Decoration.none,
  update(value, tr) {
    value = value.map(tr.changes);
    for (const e of tr.effects)
      if (e.is(highlight)) {
        const line = Math.max(
          1,
          Math.min(tr.state.doc.lines, e.value.line || 1),
        );
        value = e.value.clear
          ? Decoration.none
          : Decoration.set([
              Decoration.line({
                class: e.value.error ? "cm-failure" : "cm-executing",
              }).range(tr.state.doc.line(line).from),
            ]);
      }
    return value;
  },
  provide: (f) => EditorView.decorations.from(f),
});
const initialCode = `// Activa tu primera línea de producción.\n// Los identificadores aparecen al seleccionar.\nawait fabrica.activar("extractor_1");\nawait fabrica.activar("fundidor_1");\nawait fabrica.activar("ensamblador_1");\n\nconsole.log("Línea en marcha. Observa el cobre.");\n\n// Tu próximo experimento:\n// ¿Cómo pararías al guardar 8 circuitos?`;
const initialSql = `-- Datos reales, en el momento de consultar.\nSELECT material, SUM(cantidad) AS total\nFROM inventario\nGROUP BY material\nORDER BY total DESC;`;
let saved = null,
  loadError = null;
try {
  saved = loadLocal();
} catch (e) {
  loadError = e.message;
}
let state = saved?.factory || newFactory(),
  selected = null,
  tool = "select",
  dir = 0,
  playing = true,
  speed = 1,
  worker = null,
  runId = 0,
  runLine = 1,
  world,
  db = null,
  dbReady = null,
  dbBusy = false,
  importing = false,
  bootBytes = null,
  toastTimer,
  clockTick = 0,
  saveTime = 0;
const codeEditor = new EditorView({
  parent: $("code-editor"),
  doc: saved?.code || initialCode,
  extensions: [
    basicSetup,
    activeLine,
    javascript(),
    oneDark,
    EditorView.lineWrapping,
    EditorView.contentAttributes.of({
      "aria-label": "Código JavaScript de la fábrica",
      spellcheck: "false",
    }),
  ],
});
const sqlEditor = new EditorView({
  parent: $("sql-editor"),
  doc: saved?.sql || initialSql,
  extensions: [
    basicSetup,
    sql({ dialect: PostgreSQL }),
    oneDark,
    EditorView.lineWrapping,
    EditorView.contentAttributes.of({
      "aria-label": "Consulta PostgreSQL",
      spellcheck: "false",
    }),
  ],
});
function log(message, type = "info") {
  const p = document.createElement("p");
  p.className = `log-${type}`;
  p.textContent = String(message).slice(0, 1500);
  $("logs").append(p);
  while ($("logs").children.length > 70) $("logs").firstChild.remove();
  $("logs").scrollTop = $("logs").scrollHeight;
}
function toast(message) {
  $("toast").textContent = message;
  $("toast").hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => ($("toast").hidden = true), 4500);
}
function persist() {
  try {
    saveLocal(
      snapshot(
        state,
        codeEditor.state.doc.toString(),
        sqlEditor.state.doc.toString(),
      ),
    );
    $("save-state").textContent = "Guardado en este navegador";
  } catch {
    $("save-state").textContent = "Sin espacio · descarga tu sesión";
  }
}
function selectTool(value) {
  tool = value;
  document
    .querySelectorAll("[data-tool]")
    .forEach((el) => el.classList.toggle("active", el.dataset.tool === value));
  world?.setTool(value === "select" ? null : value, dir);
  $("build-tip").hidden = value === "select";
  $("build-tip").textContent =
    value === "remove"
      ? "Desmontar · haz clic en un elemento vacío · Esc para salir"
      : `${TYPES[value]?.name || ""} · clic para construir · R gira · Esc cancela`;
}
function selectNode(n) {
  selected = n?.id || null;
  $("inspector").hidden = !n;
  updateInspector();
}
function updateInspector() {
  const n = state.nodes.find((n) => n.id === selected);
  if (!n) {
    $("inspector").hidden = true;
    return;
  }
  $("node-name").textContent = TYPES[n.type].name;
  $("node-id").textContent = n.id;
  $("node-description").textContent = TYPES[n.type].description;
  $("node-state").textContent = status(state, n);
  $("node-stock").textContent =
    n.type === "almacen"
      ? Object.entries(n.stock)
          .map(([m, c]) => `${MATERIALS[m]}: ${c}`)
          .join(" · ")
      : `Producidas: ${n.produced} · En espera: ${n.input.length}`;
  $("toggle-node").textContent = n.enabled ? "Desactivar" : "Activar";
  $("toggle-node").disabled = n.type === "almacen";
}
function clickCell(x, y) {
  if (importing) return;
  try {
    const n = at(state, x, y);
    if (tool === "select") selectNode(n);
    else if (tool === "remove") {
      if (n) {
        remove(state, n.id);
        if (selected === n.id) selectNode(null);
        persist();
      }
    } else {
      const built = place(state, tool, x, y, dir);
      toast(
        `${TYPES[tool].name} construida · ${built.id}${built.enabled ? "" : " · actívala desde el inspector o tu programa"}`,
      );
      persist();
    }
  } catch (e) {
    toast(e.message);
  }
}
function syncStats() {
  $("copper").textContent = inventory(state, "cobre");
  $("plates").textContent = inventory(state, "placa");
  $("circuits").textContent = inventory(state, "circuito");
  const done = state.completed.includes("ocho");
  $("mission-count").textContent = `${Math.min(8, state.produced)} / 8`;
  $("mission-progress").style.width =
    `${Math.min(100, (state.produced / 8) * 100)}%`;
  $("mission-description").textContent = done
    ? "Objetivo logrado. Amplía tu fábrica, gestiona pedidos y prueba otra estrategia."
    : "Pon la línea en marcha y fabrica 8 circuitos. La estrategia es tuya.";
  $("sim-clock").textContent =
    `${String(Math.floor(state.time / 60)).padStart(2, "0")}:${String(Math.floor(state.time % 60)).padStart(2, "0")}`;
  $("sim-status").textContent = playing
    ? "SIMULACIÓN ACTIVA"
    : "SIMULACIÓN EN PAUSA";
  $("pause").textContent = playing ? "Ⅱ" : "▶";
  $("pause").setAttribute(
    "aria-label",
    playing ? "Pausar simulación" : "Reanudar simulación",
  );
  $("zoom-value").textContent = `${world?.zoomLevel || 100}%`;
  updateInspector();
}
function waitFor(check, generation) {
  return new Promise((resolve, reject) => {
    const timer = setInterval(() => {
      if (generation !== runId) {
        clearInterval(timer);
        reject(new Error("Programa detenido."));
      } else if (check()) {
        clearInterval(timer);
        resolve();
      }
    }, 30);
  });
}
function stopProgram(message = true) {
  runId++;
  if (worker) worker.terminate();
  worker = null;
  $("run").disabled = false;
  $("stop").disabled = true;
  $("run-status").textContent = "Programa detenido";
  if (message) log("Programa detenido. Las máquinas conservan su estado.");
}
async function handleCall(method, args, generation) {
  if (method === "paso") {
    runLine = args[0];
    codeEditor.dispatch({ effects: highlight.of({ line: runLine }) });
    $("run-status").textContent = `Línea ${runLine}`;
    await waitFor(() => playing, generation);
    await new Promise((r) => setTimeout(r, 130 / speed));
    return;
  }
  if (method === "log") {
    log(args.join(" "), "success");
    return;
  }
  if (method === "esperar") {
    const seconds = args[0];
    if (
      typeof seconds !== "number" ||
      !Number.isFinite(seconds) ||
      seconds < 0 ||
      seconds > 600
    )
      throw new Error("esperar(segundos) acepta un número entre 0 y 600.");
    const target = state.time + seconds;
    await waitFor(() => state.time >= target, generation);
    return;
  }
  if (method === "velocidad") {
    if (![0.5, 1, 2].includes(args[0]))
      throw new Error("La velocidad debe ser 0.5, 1 o 2.");
    speed = args[0];
    $("speed").textContent = `${speed}×`;
    return;
  }
  if (method === "inventario") {
    if (!Object.hasOwn(MATERIALS, args[0]))
      throw new Error("Material desconocido. Usa cobre, placa o circuito.");
    return inventory(state, args[0]);
  }
  if (method === "entregar") {
    if (!Number.isSafeInteger(args[0]) || args[0] < 1)
      throw new Error("entregar(id) necesita el número de un pedido.");
    if (dbBusy)
      throw new Error(
        "La base de datos está ocupada. Termina la consulta antes de entregar.",
      );
    dbBusy = true;
    try {
      const client = await ensureDatabase(),
        order = await client.call("pedido", { pedido: args[0] });
      if (!order)
        throw new Error(
          `No existe el pedido ${args[0]}. Consulta la tabla pedidos.`,
        );
      if (order.entregado) throw new Error("Este pedido ya está entregado.");
      const available = inventory(state, order.material);
      if (available < order.cantidad)
        throw new Error(
          `Pedido ${order.id}: necesitas ${order.cantidad} ${order.material}; hay ${available} en almacenes.`,
        );
      if (!(await client.call("entregar", { pedido: order.id })))
        throw new Error("El pedido ya no está pendiente.");
      let remaining = order.cantidad;
      for (const n of state.nodes) {
        const take = Math.min(n.stock[order.material] || 0, remaining);
        n.stock[order.material] -= take;
        remaining -= take;
      }
      await storeDatabase(await client.call("snapshot"));
      persist();
      log(
        `Pedido ${order.id} entregado: ${order.cantidad} ${order.material}.`,
        "success",
      );
      return true;
    } finally {
      dbBusy = false;
    }
  }
  if (method === "maquinas")
    return state.nodes.map((n) => ({
      id: n.id,
      tipo: n.type,
      activa: n.enabled,
      producidas: n.produced,
    }));
  if (method === "activar" || method === "desactivar") {
    const n = state.nodes.find((n) => n.id === args[0]);
    if (!n)
      throw new Error(
        `No existe «${args[0]}». Selecciona una máquina para consultar su identificador.`,
      );
    if (n.type === "almacen")
      throw new Error("Los almacenes reciben materiales automáticamente.");
    n.enabled = method === "activar";
    selected = n.id;
    log(`${n.id} → ${n.enabled ? "activada" : "desactivada"}`, "success");
    return;
  }
  throw new Error("Orden desconocida.");
}
function runProgram() {
  if (importing) return;
  stopProgram(false);
  playing = true;
  const generation = runId;
  worker = new Worker(new URL("./factory/runtime-worker.js", import.meta.url), {
    type: "module",
  });
  const activeWorker = worker;
  let watchdog,
    operations = 0,
    chain = Promise.resolve();
  const arm = () => {
    clearTimeout(watchdog);
    watchdog = setTimeout(() => {
      if (worker === activeWorker) {
        log(
          "El programa dejó de responder. Revisa los bucles sin await; se ha detenido para recuperar el control.",
          "error",
        );
        stopProgram(false);
      }
    }, 5000);
  };
  $("run").disabled = true;
  $("stop").disabled = false;
  $("run-status").textContent = "Ejecutando";
  log("Ejecutando control.js…");
  worker.onmessage = ({ data }) => {
    if (generation !== runId) return;
    clearTimeout(watchdog);
    if (data.type === "call") {
      if (++operations > 20000) {
        log(
          "Se alcanzó el límite de 20.000 instrucciones. Divide el programa o añade esperas.",
          "error",
        );
        stopProgram(false);
        return;
      }
      chain = chain.then(async () => {
        try {
          if (generation !== runId) return;
          const value = await handleCall(data.method, data.args, generation);
          if (generation !== runId) return;
          activeWorker.postMessage({ type: "reply", id: data.id, value });
          arm();
        } catch (e) {
          if (generation === runId) {
            activeWorker.postMessage({
              type: "reply",
              id: data.id,
              error: e.message,
            });
            arm();
          }
        }
      });
    } else if (data.type === "done" || data.type === "error") {
      chain.then(() => {
        if (generation !== runId) return;
        clearTimeout(watchdog);
        if (data.type === "error") {
          codeEditor.dispatch({
            effects: highlight.of({ line: data.line || runLine, error: true }),
          });
          log(`Línea ${data.line || runLine}: ${data.message}`, "error");
        } else {
          codeEditor.dispatch({ effects: highlight.of({ clear: true }) });
          log("Programa terminado. La fábrica sigue trabajando.", "success");
        }
        activeWorker.terminate();
        worker = null;
        $("run").disabled = false;
        $("stop").disabled = true;
        $("run-status").textContent =
          data.type === "error" ? "Revisa el registro" : "Programa terminado";
        persist();
      });
    }
  };
  worker.onerror = (e) => {
    clearTimeout(watchdog);
    log(e.message, "error");
    stopProgram(false);
  };
  worker.postMessage({ type: "run", code: codeEditor.state.doc.toString() });
  arm();
}
function databaseClient() {
  const w = new Worker(
    new URL("./factory/database-worker.js", import.meta.url),
    { type: "module" },
  );
  let id = 0;
  const calls = new Map();
  w.onmessage = ({ data }) => {
    const p = calls.get(data.id);
    if (!p) return;
    calls.delete(data.id);
    clearTimeout(p.timer);
    data.error ? p.reject(new Error(data.error)) : p.resolve(data.value);
  };
  w.onerror = (e) => {
    for (const p of calls.values()) {
      clearTimeout(p.timer);
      p.reject(new Error(e.message));
    }
    calls.clear();
  };
  return {
    call(method, data = {}) {
      return new Promise((resolve, reject) => {
        const next = ++id;
        const timer = setTimeout(() => {
          calls.delete(next);
          reject(
            new Error(
              "La base de datos tardó demasiado. Descarga tu sesión y recarga para reintentarlo.",
            ),
          );
        }, 60000);
        calls.set(next, { resolve, reject, timer });
        w.postMessage({ id: next, method, ...data });
      });
    },
    close() {
      w.terminate();
      for (const p of calls.values()) {
        clearTimeout(p.timer);
        p.reject(new Error("Base de datos cerrada."));
      }
      calls.clear();
    },
  };
}
async function ensureDatabase() {
  if (dbReady) return dbReady;
  db = databaseClient();
  $("db-status").textContent = "Iniciando PostgreSQL…";
  dbReady = (async () => {
    const bytes = bootBytes || (await loadDatabase());
    await db.call("init", { bytes });
    $("db-status").textContent = "PostgreSQL listo";
    return db;
  })().catch((e) => {
    db?.close();
    db = null;
    dbReady = null;
    $("db-status").textContent = "No se pudo abrir";
    throw e;
  });
  return dbReady;
}
function resultTable(results) {
  $("sql-results").replaceChildren();
  for (const result of results) {
    const rows = result.rows || [];
    if (!rows.length) {
      const p = document.createElement("p");
      p.textContent = `Consulta correcta · ${result.affectedRows ?? 0} filas afectadas`;
      $("sql-results").append(p);
      continue;
    }
    const table = document.createElement("table"),
      head = table.createTHead().insertRow(),
      keys = Object.keys(rows[0]);
    for (const key of keys) {
      const th = document.createElement("th");
      th.textContent = key;
      head.append(th);
    }
    const body = table.createTBody();
    for (const row of rows) {
      const tr = body.insertRow();
      for (const key of keys) {
        const td = tr.insertCell();
        td.textContent =
          row[key] === null
            ? "NULL"
            : typeof row[key] === "object"
              ? JSON.stringify(row[key])
              : String(row[key]);
      }
    }
    $("sql-results").append(table);
    if (result.total > 200) {
      const p = document.createElement("p");
      p.textContent = `Mostrando 200 de ${result.total} filas. Usa LIMIT para acotar.`;
      $("sql-results").append(p);
    }
  }
}
async function query() {
  if (dbBusy || importing) return;
  dbBusy = true;
  $("query").disabled = true;
  $("db-status").textContent = "Consultando…";
  try {
    const client = await ensureDatabase(),
      results = await client.call("query", {
        sql: sqlEditor.state.doc.toString(),
        state: structuredClone(state),
      });
    resultTable(results);
    await storeDatabase(await client.call("snapshot"));
    if (!state.completed.includes("sql")) state.completed.push("sql");
    $("db-status").textContent = `Datos a ${Math.floor(state.time)} s`;
    persist();
  } catch (e) {
    $("sql-results").replaceChildren();
    const p = document.createElement("p");
    p.className = "sql-error";
    p.textContent = e.message;
    $("sql-results").append(p);
    $("db-status").textContent = "Revisa la consulta";
    log(`SQL: ${e.message}`, "error");
  } finally {
    dbBusy = false;
    $("query").disabled = false;
  }
}
async function download() {
  if (importing || dbBusy) {
    toast("Espera a que termine la operación de datos.");
    return;
  }
  $("download").disabled = true;
  dbBusy = true;
  try {
    const data = snapshot(
        state,
        codeEditor.state.doc.toString(),
        sqlEditor.state.doc.toString(),
      ),
      client = await ensureDatabase();
    const bytes = await client.call("export", { state: data.factory });
    let binary = "";
    for (let i = 0; i < bytes.length; i += 8192)
      binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
    data.database = btoa(binary);
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" }),
      url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = `arena-factory-${new Intl.DateTimeFormat("en-CA", { timeZone: "America/Mexico_City" }).format(new Date())}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
    toast("Sesión descargada: fábrica, código, progreso y base de datos.");
  } catch (e) {
    toast(`No se pudo descargar: ${e.message}`);
  } finally {
    dbBusy = false;
    $("download").disabled = false;
  }
}
async function importFile(file) {
  if (!file) return;
  if (importing || dbBusy) {
    toast("Espera a que termine la operación de datos.");
    return;
  }
  if (file.size > 42000000) {
    toast("El archivo supera el límite de 40 MB.");
    return;
  }
  let candidate;
  importing = true;
  try {
    const data = validateSession(JSON.parse(await file.text()));
    if (typeof data.database !== "string" || data.database.length > 40000000)
      throw new Error("La sesión no incluye una base de datos compatible.");
    const bytes = Uint8Array.from(atob(data.database), (c) => c.charCodeAt(0));
    candidate = databaseClient();
    await candidate.call("init", { bytes });
    const previous = snapshot(
      state,
      codeEditor.state.doc.toString(),
      sqlEditor.state.doc.toString(),
    );
    const previousBytes = db ? await db.call("snapshot") : await loadDatabase();
    try {
      await storeDatabase(bytes);
      saveLocal(snapshot(data.factory, data.code, data.sql));
    } catch (e) {
      if (previousBytes) await storeDatabase(previousBytes);
      saveLocal(previous);
      throw e;
    }
    stopProgram(false);
    db?.close();
    db = candidate;
    candidate = null;
    dbReady = Promise.resolve(db);
    bootBytes = bytes;
    state = data.factory;
    codeEditor.dispatch({
      changes: { from: 0, to: codeEditor.state.doc.length, insert: data.code },
    });
    sqlEditor.dispatch({
      changes: { from: 0, to: sqlEditor.state.doc.length, insert: data.sql },
    });
    selectNode(null);
    playing = false;
    world.resetCamera();
    $("sql-results").replaceChildren();
    $("db-status").textContent = "PostgreSQL listo";
    toast("Sesión importada. Reanuda la simulación cuando quieras.");
    log("Fábrica y base de datos restauradas.", "success");
  } catch (e) {
    candidate?.close();
    toast(`No se importó la sesión: ${e.message}`);
  } finally {
    importing = false;
    $("import-file").value = "";
  }
}
function tab(name) {
  for (const id of ["code", "sql", "guide"]) {
    $(`${id}-pane`).hidden = id !== name;
    $(`tab-${id}`).classList.toggle("active", id === name);
    $(`tab-${id}`).setAttribute("aria-selected", String(id === name));
  }
  if (name === "sql")
    ensureDatabase().catch((e) => log(`SQL: ${e.message}`, "error"));
}
$("run").onclick = runProgram;
$("stop").onclick = () => stopProgram();
$("query").onclick = query;
$("download").onclick = download;
$("import").onclick = () => {
  if (!dbBusy && !importing) $("import-file").click();
};
$("import-file").onchange = (e) => importFile(e.target.files[0]);
for (const id of ["code", "sql", "guide"])
  $(`tab-${id}`).onclick = () => tab(id);
$("pause").onclick = () => {
  playing = !playing;
};
$("step").onclick = () => {
  playing = false;
  tick(state, 0.5);
};
$("speed").onclick = () => {
  const speeds = [0.5, 1, 2];
  speed = speeds[(speeds.indexOf(speed) + 1) % 3];
  $("speed").textContent = `${speed}×`;
};
$("clear-log").onclick = () => $("logs").replaceChildren();
$("hint").onclick = () => ($("hint-text").hidden = !$("hint-text").hidden);
$("close-inspector").onclick = () => selectNode(null);
$("toggle-node").onclick = () => {
  const n = state.nodes.find((n) => n.id === selected);
  if (n && n.type !== "almacen") {
    n.enabled = !n.enabled;
    log(`${n.id} → ${n.enabled ? "activada" : "desactivada"}`);
    persist();
  }
};
$("rotate-node").onclick = () => {
  const n = state.nodes.find((n) => n.id === selected);
  if (n) {
    n.dir = (n.dir + 1) % 4;
    persist();
  }
};
$("collapse").onclick = () => {
  const collapsed = $("workbench").classList.toggle("collapsed");
  if (!collapsed) {
    const panel = $("workbench");
    panel.style.left = `${Math.max(8, Math.min(panel.offsetLeft, innerWidth - panel.offsetWidth - 8))}px`;
    panel.style.top = `${Math.max(8, Math.min(panel.offsetTop, $("workspace").clientHeight - panel.offsetHeight - 105))}px`;
  }
  $("collapse").textContent = collapsed ? "+" : "−";
  $("collapse").setAttribute(
    "aria-label",
    collapsed ? "Abrir panel" : "Plegar panel",
  );
};
let drag = null;
$("panel-handle").addEventListener("pointerdown", (e) => {
  if (
    !$("workbench").classList.contains("collapsed") ||
    e.target.closest("button")
  )
    return;
  const r = $("workbench").getBoundingClientRect();
  drag = { x: e.clientX, y: e.clientY, left: r.left, top: r.top - 70 };
  $("panel-handle").setPointerCapture(e.pointerId);
});
$("panel-handle").addEventListener("pointermove", (e) => {
  if (!drag) return;
  $("workbench").style.left =
    `${Math.max(8, Math.min(innerWidth - 320, drag.left + e.clientX - drag.x))}px`;
  $("workbench").style.top =
    `${Math.max(8, Math.min(innerHeight - 220, drag.top + e.clientY - drag.y))}px`;
});
$("panel-handle").addEventListener("pointerup", () => (drag = null));
$("panel-handle").addEventListener("pointercancel", () => (drag = null));
$("welcome").addEventListener("close", () => {
  state.tutorial = true;
  persist();
});
$("help").onclick = () => $("welcome").showModal();
document
  .querySelectorAll("[data-tool]")
  .forEach((b) => (b.onclick = () => selectTool(b.dataset.tool)));
document.addEventListener("keydown", (e) => {
  if (
    e.target.closest(".cm-editor,input,textarea,dialog") ||
    e.metaKey ||
    e.ctrlKey ||
    e.altKey
  )
    return;
  if (e.key === "Escape") selectTool("select");
  if (e.key.toLowerCase() === "r") {
    dir = (dir + 1) % 4;
    world?.setTool(tool === "select" ? null : tool, dir);
    toast(`Salida ${["→ derecha", "↓ abajo", "← izquierda", "↑ arriba"][dir]}`);
  }
  const t = [
    "extractor",
    "cinta",
    "fundidor",
    "ensamblador",
    "almacen",
    "remove",
  ][Number(e.key) - 1];
  if (t) selectTool(t);
  if (e.code === "Space") {
    e.preventDefault();
    playing = !playing;
  }
});
window.addEventListener("beforeunload", () => {
  if (!importing) persist();
});
try {
  world = await createWorld($("world"), { click: clickCell });
  $("loading").hidden = true;
  $("zoom-in").onclick = () => world.zoom(1.15);
  $("zoom-out").onclick = () => world.zoom(1 / 1.15);
  $("center").onclick = () => world.resetCamera();
  let achieved = state.completed.includes("ocho");
  world.app.ticker.add((t) => {
    const elapsed = Math.min(t.deltaMS / 1000, 0.1);
    if (playing && !importing) tick(state, elapsed * speed);
    world.render(state, selected);
    clockTick += elapsed;
    saveTime += elapsed;
    if (clockTick > 0.2) {
      syncStats();
      clockTick = 0;
    }
    if (saveTime > 3 && !importing) {
      persist();
      saveTime = 0;
    }
    if (!achieved && state.completed.includes("ocho")) {
      achieved = true;
      toast(
        "8 circuitos producidos. Tu primera línea funciona. ¿Qué construirás ahora?",
      );
      log("Objetivo logrado: 8 circuitos. Continúa experimentando.", "success");
    }
  });
  if (!state.tutorial) $("welcome").showModal();
  if (saved) {
    $("logs").replaceChildren();
    log(
      `Sesión recuperada · ${state.nodes.length} elementos · ${Math.floor(state.time)} s de simulación.`,
    );
  }
  if (loadError) log(`No se pudo recuperar el guardado: ${loadError}`, "error");
} catch (e) {
  $("loading").textContent =
    `No se pudo iniciar el mundo: ${e.message}. Comprueba que tu navegador permita WebGL y vuelve a cargar.`;
  log(e.message, "error");
}
