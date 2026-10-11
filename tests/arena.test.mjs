import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {pythonCourse,courseCatalog} from '../arena/courses/python.js';
import {grade,gradeSuite} from '../arena/core/grading.js';
import {validateGenerated} from '../arena/core/generation.js';
import {cleanProgress} from '../arena/core/storage.js';
import generate from '../netlify/functions/generate-exercise.mjs';

const harness=fileURLToPath(new URL('../arena/runtimes/harness.py',import.meta.url));
const run=requests=>{const result=spawnSync('python3',[harness],{input:JSON.stringify(requests),encoding:'utf8',timeout:10000,maxBuffer:8_000_000});assert.equal(result.status,0,result.stderr);return JSON.parse(result.stdout);};
const exercises=pythonCourse.topics.flatMap(t=>t.exercises);

test('all 40 original solutions solve every case in the real Python executor',()=>{
  const requests=exercises.flatMap(e=>e.tests.map(t=>({source:e.solution,context:t.context,inputs:t.inputs,watch:[...new Set([...e.watch,...Object.keys(t.expect.vars??{})])],required:e.required??[]})));
  const results=run(requests);let offset=0;
  for(const exercise of exercises){const suite=gradeSuite(results.slice(offset,offset+exercise.tests.length),exercise.tests);assert.equal(suite.passed,true,`${exercise.id}: ${JSON.stringify(suite.grades)}`);offset+=exercise.tests.length;}
  assert.equal(exercises.length,40);
});
test('boundary cases reject a strict greater-than door condition',()=>{
  const e=exercises.find(e=>e.id==='booleans-1');const results=run(e.tests.map(t=>({source:'puerta_abierta = energia > 30',context:t.context,watch:e.watch})));
  const suite=gradeSuite(results,e.tests);assert.equal(suite.passed,false);assert.equal(suite.grades[1].passed,false);
});
test('an infinite loop terminates with an educational error and bounded replay',()=>{
  const [result]=run([{source:'while energia < objetivo:\n    energia = energia',context:{energia:10,objetivo:50},watch:['energia']}]);
  assert.match(result.error,/demasiados pasos/);assert.equal(result.frames.length,181);assert.equal(result.vars.energia,10);
});
test('each run starts from a fresh context and replay snapshots do not mutate',()=>{
  const [a,b]=run([{source:'carga.append("radio")',context:{carga:['agua']},watch:['carga']},{source:'print(carga)',context:{carga:['agua']},watch:['carga']}]);
  assert.deepEqual(a.frames[0].vars.carga,['agua']);assert.deepEqual(a.vars.carga,['agua','radio']);assert.deepEqual(b.vars.carga,['agua']);
});
test('input converts types and missing responses produce useful errors',()=>{
  const [a,b]=run([{source:'energia = int(input())',inputs:['65'],watch:['energia']},{source:'energia = int(input())',inputs:[],watch:['energia']}]);
  assert.equal(a.types.energia,'int');assert.equal(a.vars.energia,65);assert.match(b.error,/Falta una respuesta/);
});
test('the runner rejects imports and unfamiliar generated concepts',()=>{
  const [a,b]=run([{source:'import os'},{source:'for n in range(2):\n    print(n)',conceptLevel:0}]);assert.match(a.error,/Import/);assert.match(b.error,/todavía no/);
});
test('grading compares actual values, types and stdout, accepting equivalent code',()=>{
  assert.equal(grade({vars:{energia:'65'},types:{energia:'str'},output:''},{expect:{vars:{energia:65}}}).passed,false);
  const e=exercises.find(e=>e.id==='operators-1');const results=run(e.tests.map(t=>({source:'restante = -consumo + energia',context:t.context,watch:e.watch})));assert.equal(gradeSuite(results,e.tests).passed,true);
});
test('generation validates its contract and needs meaningful tests',()=>{
  const sample={title:'Señal nueva',description:'Imprime A.',starter:'# Completa la señal',solution:'print("A")',watch:[],inputs:[],hints:['Usa print.','El texto va entre comillas.','print("A")'],tests:[{name:'Uno',context_json:'{}',expect_json:'{"output":"A\\n"}',inputs:[]},{name:'Dos',context_json:'{}',expect_json:'{"output":"A\\n"}',inputs:[]}]};
  const result=validateGenerated(sample,pythonCourse.topics[0]);assert.equal(result.generated,true);assert.equal(result.tests.length,2);
  assert.throws(()=>validateGenerated({...sample,tests:[]},pythonCourse.topics[0]));
});
test('progress export excludes unknown fields and credentials',()=>{
  const clean=cleanProgress({version:1,completed:['print-1','print-1'],drafts:{'print-1':'print("A")'},position:'print-1',apiKey:'should-never-persist'});
  assert.deepEqual(clean.completed,['print-1']);assert.equal('apiKey' in clean,false);
});
test('the course catalog reserves separate runtime adapters for web and SQL',()=>{
  assert.deepEqual(courseCatalog.map(c=>[c.runtime,c.status]),[['python','ready'],['web','planned'],['sql','planned']]);
});
test('BYOK endpoint refuses missing credentials and cross-origin requests',async()=>{
  assert.equal((await generate(new Request('http://localhost:4173/.netlify/functions/generate-exercise',{method:'POST',body:'{}'}))).status,401);
  assert.equal((await generate(new Request('http://localhost:4173/.netlify/functions/generate-exercise',{method:'POST',headers:{Origin:'https://other.example',Authorization:'Bearer test-key-never-real'},body:'{}'}))).status,403);
});
test('BYOK endpoint forwards only the supplied key and extracts structured output',async()=>{
  const original=globalThis.fetch;let seen;
  globalThis.fetch=async(url,options)=>{seen={url,options};return Response.json({status:'completed',output:[{type:'message',content:[{type:'output_text',text:'{"title":"Variante"}'}]}]});};
  try {
    const response=await generate(new Request('http://localhost:4173/.netlify/functions/generate-exercise',{method:'POST',headers:{Authorization:'Bearer test-key-never-real'},body:JSON.stringify({model:'model-from-user',topicId:'print',difficulty:'same'})}));
    assert.equal(response.status,200);assert.equal((await response.json()).title,'Variante');assert.equal(seen.url,'https://api.openai.com/v1/responses');assert.equal(seen.options.headers.Authorization,'Bearer test-key-never-real');assert.equal(JSON.parse(seen.options.body).store,false);assert.equal(response.headers.get('Cache-Control'),'no-store');
  } finally {globalThis.fetch=original;}
});
