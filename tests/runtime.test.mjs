import { test } from "node:test";
import assert from "node:assert/strict";
import { Worker } from "node:worker_threads";
const workerUrl = new URL("../arena/factory/runtime-worker.js", import.meta.url)
  .href;
function execute(code) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      `const {parentPort}=require('node:worker_threads');global.self={postMessage:v=>parentPort.postMessage(v)};import(${JSON.stringify(workerUrl)}).then(()=>{parentPort.on('message',data=>self.onmessage({data}));parentPort.postMessage({type:'ready'});});`,
      { eval: true },
    );
    const events = [];
    const timeout = setTimeout(() => {
      worker.terminate();
      reject(new Error("runtime timeout"));
    }, 4000);
    worker.on("error", reject);
    worker.on("message", (data) => {
      if (data.type === "ready") worker.postMessage({ type: "run", code });
      else if (data.type === "call") {
        events.push(data);
        worker.postMessage({
          type: "reply",
          id: data.id,
          value: data.method === "inventario" ? 3 : undefined,
        });
      } else if (data.type === "done" || data.type === "error") {
        clearTimeout(timeout);
        worker.terminate();
        resolve({ events, ...data });
      }
    });
  });
}
test("JavaScript ejecuta bucles y funciones async en orden con valores reales", async () => {
  const r = await execute(
    'async function activar(id){await fabrica.activar(id);}\nfor(let i=0;i<3;i++){await activar("m_"+i);}\nconst n=await fabrica.inventario("circuito"); console.log(n);',
  );
  assert.equal(r.type, "done");
  assert.deepEqual(
    r.events.filter((e) => e.method === "activar").map((e) => e.args[0]),
    ["m_0", "m_1", "m_2"],
  );
  assert.equal(r.events.find((e) => e.method === "log").args[0], "3");
});
test("los errores de sintaxis mantienen el número de línea original", async () => {
  const r = await execute("const x=1;\nconst y=;");
  assert.equal(r.type, "error");
  assert.equal(r.line, 2);
});
test("las funciones síncronas y los condicionales conservan su semántica", async () => {
  const r = await execute(
    'function doble(x){return x*2;}\nif(doble(3)===6){await fabrica.activar("correcta");}',
  );
  assert.equal(r.type, "done");
  assert.equal(
    r.events.find((e) => e.method === "activar").args[0],
    "correcta",
  );
});
