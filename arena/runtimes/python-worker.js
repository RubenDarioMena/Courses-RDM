const VERSION = '314.0.7';
const CDN = `https://cdn.jsdelivr.net/pyodide/v${VERSION}/full/`;
let runtime;
let queue = Promise.resolve();

async function initialize() {
  const [{loadPyodide}, response] = await Promise.all([import(`${CDN}pyodide.mjs`),fetch(new URL('./harness.py',import.meta.url))]);
  if (!response.ok) throw new Error('No se pudo cargar el ejecutor de ejercicios.');
  const pyodide = await loadPyodide({indexURL:CDN});
  pyodide.globals.set('__name__','arena_runtime');
  await pyodide.runPythonAsync(await response.text());
  return pyodide;
}

self.onmessage = ({data}) => {
  queue = queue.then(async () => {
    try {
      runtime ??= initialize();
      const pyodide = await runtime;
      if (data.type === 'initialize') {self.postMessage({id:data.id,ready:true});return;}
      pyodide.globals.set('arena_payload_json', JSON.stringify(data.requests));
      const serialized = pyodide.runPython('arena_run_json(arena_payload_json)');
      pyodide.globals.delete('arena_payload_json');
      self.postMessage({id:data.id,results:JSON.parse(serialized)});
    } catch (error) {
      self.postMessage({id:data.id,error:error.message || String(error)});
    }
  });
};
