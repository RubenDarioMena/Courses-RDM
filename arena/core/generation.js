export function validateGenerated(raw,topic) {
  const fail=()=>{throw new Error('El modelo devolvió una variante incompleta. Conservamos la misión actual.');};
  for(const key of ['title','description','starter','solution'])if(typeof raw[key]!=='string'||!raw[key].trim()||raw[key].length>12000)fail();
  if(!Array.isArray(raw.hints)||raw.hints.length!==3||raw.hints.some(v=>typeof v!=='string'||v.length>1000))fail();
  if(!Array.isArray(raw.watch)||raw.watch.length>20||raw.watch.some(v=>typeof v!=='string'||!/^[a-zA-Z][a-zA-Z0-9_]{0,50}$/.test(v)))fail();
  if(!Array.isArray(raw.inputs)||raw.inputs.some(v=>typeof v!=='string'||v.length>1000))fail();
  if(!Array.isArray(raw.tests)||raw.tests.length<2||raw.tests.length>5)fail();
  const tests=raw.tests.map(test=>{
    let context,expect;
    try {context=JSON.parse(test.context_json);expect=JSON.parse(test.expect_json);}catch{fail();}
    if(!context||Array.isArray(context)||typeof context!=='object'||!expect||typeof expect!=='object'||Array.isArray(expect))fail();
    if(typeof test.name!=='string'||!Array.isArray(test.inputs)||test.inputs.some(v=>typeof v!=='string'))fail();
    if(!expect.vars&&expect.output===undefined)fail();
    if(expect.vars&&(typeof expect.vars!=='object'||Array.isArray(expect.vars)))fail();
    if(expect.output!==undefined&&typeof expect.output!=='string')fail();
    if(Object.keys(context).some(k=>!/^[a-zA-Z][a-zA-Z0-9_]{0,50}$/.test(k)))fail();
    if(expect.vars&&Object.keys(expect.vars).some(k=>!/^[a-zA-Z][a-zA-Z0-9_]{0,50}$/.test(k)))fail();
    return {name:test.name,context,expect,inputs:test.inputs};
  });
  return {...raw,id:`ai-${crypto.randomUUID()}`,stage:'Variante IA',scene:'base',guide:[],tests,required:topic.exercises[3].required??[],generated:true};
}
