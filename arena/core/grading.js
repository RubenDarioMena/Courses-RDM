export function equal(actual, expected) {
  if (typeof actual !== typeof expected) return false;
  if (Array.isArray(expected)) return Array.isArray(actual) && actual.length === expected.length && expected.every((v,i) => equal(actual[i],v));
  if (expected !== null && typeof expected === 'object') return actual !== null && Object.keys(actual).length === Object.keys(expected).length && Object.entries(expected).every(([k,v]) => equal(actual[k],v));
  return actual === expected;
}
export function formatValue(value) {
  if(value===undefined)return 'sin definir';
  if(value===null)return 'None';
  if(typeof value==='boolean')return value?'True':'False';
  if(Array.isArray(value))return `[${value.map(formatValue).join(', ')}]`;
  if(typeof value==='object')return `{${Object.entries(value).map(([k,v])=>`${JSON.stringify(k)}: ${formatValue(v)}`).join(', ')}}`;
  return JSON.stringify(value);
}
export function grade(result, test) {
  if (result.error) return {passed:false, message:result.error};
  for (const [key, expected] of Object.entries(test.expect.vars ?? {})) {
    if (!equal(result.vars[key], expected)) return {passed:false, message:`${key}: esperábamos ${formatValue(expected)}; obtuvimos ${result.vars[key] === undefined ? 'una variable sin definir' : formatValue(result.vars[key])}.`};
  }
  for (const [key,type] of Object.entries(test.expect.types ?? {})) if (result.types[key] !== type) return {passed:false,message:`${key} debe tener tipo ${type}; recibimos ${result.types[key] ?? 'una variable sin definir'}.`};
  if (test.expect.output !== undefined && result.output !== test.expect.output) return {passed:false,message:`La salida esperada era ${JSON.stringify(test.expect.output)}; tu programa produjo ${JSON.stringify(result.output)}.`};
  return {passed:true,message:'Resultado correcto'};
}
export function gradeSuite(results, tests) {
  const grades = tests.map((test,i) => ({...grade(results[i] ?? {error:'Esta prueba no se ejecutó.'},test), name:test.name, context:test.context, inputs:test.inputs}));
  return {passed:grades.every(g => g.passed), grades};
}
