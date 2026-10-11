import {pythonCourse,courseCatalog} from './courses/python.js';
import {gradeSuite,formatValue} from './core/grading.js';
import {loadProgress,saveProgress,cleanProgress} from './core/storage.js';
import {PythonRunner} from './runtimes/python.js';
import {renderBase} from './scenes/base.js';
import {validateGenerated} from './core/generation.js';

const $=id=>document.getElementById(id);
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let progress=loadProgress();
let topicIndex=0,exerciseIndex=0,generated=null,hintIndex=0,frames=[],replayTimer=null,busy=false,revision=0;
let credentials=null,aiAvailable=false,lastRuns=[];
const allExercises=pythonCourse.topics.flatMap(t=>t.exercises);
const runner=new PythonRunner(status=>$('runtime-status').textContent=status);
const getTopic=()=>pythonCourse.topics[topicIndex];
const getExercise=()=>generated??getTopic().exercises[exerciseIndex];
const persist=()=>{if(!saveProgress(progress))$('next-description').textContent='Almacenamiento lleno: exporta tu progreso.';};

function renderRoute() {
  $('topics').innerHTML=pythonCourse.topics.map((topic,i)=>{
    const count=topic.exercises.filter(e=>progress.completed.includes(e.id)).length;
    return `<button class="topic-button ${i===topicIndex?'active':''}" data-topic="${i}" ${i===topicIndex?'aria-current="step"':''}><span class="topic-number">${String(i+1).padStart(2,'0')}</span><span>${escape(topic.title)}</span><span class="topic-check">${count===4?'✓':`${count}/4`}</span></button>`;
  }).join('');
  const completed=allExercises.filter(e=>progress.completed.includes(e.id)).length;
  $('progress-label').textContent=`${completed} de ${allExercises.length} misiones`;
  const percent=Math.round(completed/allExercises.length*100);
  $('progress-percent').textContent=`${percent}%`;$('progress-fill').style.width=`${percent}%`;
  $('exercise-switcher').innerHTML=getTopic().exercises.map((e,i)=>`<button class="exercise-button ${!generated&&i===exerciseIndex?'active':''} ${progress.completed.includes(e.id)?'completed':''}" data-exercise="${i}" ${!generated&&i===exerciseIndex?'aria-current="step"':''}>${i+1}. ${escape(e.stage)}</button>`).join('')+(generated?'<button class="exercise-button active" aria-current="step">✧ Variante IA</button>':'');
}

function renderVariables(values) {
  $('variables').innerHTML=Object.entries(values).map(([key,value])=>`<span class="variable">${escape(key)} = <b>${escape(formatValue(value))}</b></span>`).join('')||'<span class="variable">Aquí observarás los datos de tu programa.</span>';
}
function scene(values={},output='') {
  $('scene-description').textContent=renderBase($('scene'),values,output);renderVariables(values);
}
function stopReplay() {if(replayTimer)clearInterval(replayTimer);replayTimer=null;$('replay').textContent='▶';}
function showFrame(index) {
  const frame=frames[index];if(!frame)return;
  $('timeline').value=index;scene(frame.vars,frame.output);
  $('step-label').textContent=`${Number(index)+1}/${frames.length}`;
  $('scene-mode').textContent=frame.line===null?'Resultado final':`Antes de línea ${frame.line}`;
  const lines=$('editor').value.split('\n');
  $('line-numbers').textContent=lines.map((_,i)=>(i+1===frame.line?'› ':'')+(i+1)).join('\n');
}
function lineNumbers() {$('line-numbers').textContent=$('editor').value.split('\n').map((_,i)=>i+1).join('\n');}
function select(topic,exercise=0) {
  if(busy)return;
  stopReplay();topicIndex=topic;exerciseIndex=exercise;generated=null;renderExercise();
}
function renderExercise() {
  revision++;stopReplay();frames=[];lastRuns=[];hintIndex=0;
  const exercise=getExercise();
  if(!generated){progress.position=exercise.id;persist();}
  renderRoute();
  $('mission-kicker').textContent=`PYTHON / ${String(topicIndex+1).padStart(2,'0')} · ${getTopic().title.toUpperCase()}`;
  $('mission-title').textContent=exercise.title;$('mission-level').textContent=exercise.stage;
  $('mission-description').textContent=exercise.description;$('concept').textContent=getTopic().concept;
  $('guide').innerHTML=exercise.guide?.length?`<ol>${exercise.guide.map(step=>`<li>${escape(step)}</li>`).join('')}</ol>`:'';
  $('editor').value=progress.drafts[exercise.id]??exercise.starter;lineNumbers();
  $('input-panel').hidden=!(exercise.inputs?.length||exercise.starter.includes('input('));
  $('program-input').value=(exercise.inputs??[]).join('\n');
  $('hint-content').hidden=true;$('solution-content').open=false;$('solution-code').textContent=exercise.solution;
  $('console-output').textContent='La salida de print() aparecerá aquí.';$('console-panel').open=false;
  $('result-heading').textContent=progress.completed.includes(exercise.id)?'Misión completada · puedes seguir experimentando':'La estación está esperando';
  $('feedback').className='';$('feedback').textContent='Completa la misión y ejecuta tu código. Puedes experimentar todas las veces que quieras.';
  $('test-results').replaceChildren();$('timeline').disabled=true;$('timeline').max=0;$('timeline').value=0;$('replay').disabled=true;$('step-label').textContent='Ejecuta para explorar';$('scene-mode').textContent='Estado inicial';
  $('next').textContent=exerciseIndex===3?'Siguiente tema →':'Siguiente misión →';
  if(topicIndex===9&&exerciseIndex===3)$('next').textContent='Volver al inicio ↺';
  scene(exercise.tests[0]?.context??{});
}
function setBusy(value) {
  busy=value;
  for(const id of ['run','next','generate','reset-code','hint','solution','load-solution'])$(id).disabled=value;
  document.querySelectorAll('[data-topic],[data-exercise]').forEach(button=>button.disabled=value);
  $('editor').readOnly=value;$('program-input').readOnly=value;
  $('run').innerHTML=value?'Ejecutando…':'<span aria-hidden="true">▶</span> Ejecutar <kbd>⌘ ↵</kbd>';
}
const requestFor=(exercise,source,test)=>({source,context:test.context??{},inputs:test.inputs??[],watch:[...new Set([...exercise.watch,...Object.keys(test.expect.vars??{})])],required:exercise.required??[],...(exercise.generated?{conceptLevel:topicIndex}:{})});

async function execute() {
  if(busy)return;
  stopReplay();setBusy(true);const currentRevision=revision;const exercise=getExercise();const source=$('editor').value;
  $('feedback').className='';$('feedback').textContent='Ejecutando tu programa y comprobando los escenarios…';
  try {
    const preview={...exercise.tests[0],inputs:$('input-panel').hidden?[]:$('program-input').value.split('\n')};
    const requests=[requestFor(exercise,source,preview),...exercise.tests.map(test=>requestFor(exercise,source,test))];
    const [first,...results]=await runner.run(requests);
    if(revision!==currentRevision)return;
    lastRuns=results;
    const suite=gradeSuite(results,exercise.tests);
    const failedIndex=suite.grades.findIndex(g=>!g.passed);
    const shown=failedIndex>=0&&!first.error?results[failedIndex]:first;
    frames=shown.frames;
    $('timeline').disabled=frames.length<2;$('timeline').max=frames.length-1;$('replay').disabled=frames.length<2;
    showFrame(frames.length-1);
    $('console-output').textContent=(shown.output||'(Sin salida de print)')+(shown.error?`\n${shown.error}`:'');
    if(first.error)$('console-panel').open=true;
    if(failedIndex>=0&&!first.error)$('scene-mode').textContent=`Caso: ${exercise.tests[failedIndex].name}`;
    $('test-results').innerHTML=suite.grades.map((g,i)=>`<div class="test-row"><span class="${g.passed?'pass':'fail'}">${g.passed?'✓':'×'}</span><span><button class="text-button" data-case="${i}" aria-label="Ver escenario ${escape(g.name)}">${escape(g.name)} ↗</button>${g.passed?'':` · ${escape(g.message)}`}<br>${g.passed?'':`<span class="muted">Datos: ${escape(formatValue(g.context))}${g.inputs.length?` · Entradas: ${escape(formatValue(g.inputs))}`:''}</span>`}</span></div>`).join('');
    if(suite.passed&&!first.error) {
      $('result-heading').textContent='Misión conseguida';$('feedback').className='success';
      $('feedback').textContent=`Tu programa resolvió ${exercise.tests.length} ${exercise.tests.length===1?'escenario':'escenarios'}. Explora la ejecución, prueba otra entrada o continúa.`;
      if(!generated&&!progress.completed.includes(exercise.id)){progress.completed.push(exercise.id);persist();renderRoute();}
    } else {
      $('result-heading').textContent='Una pista está en el resultado';$('feedback').className='error';
      const failure=suite.grades.find(g=>!g.passed);
      $('feedback').textContent=first.error??`${failure?.name}: ${failure?.message}`;
    }
    if(first.traceTruncated)$('feedback').textContent+=' La línea de tiempo muestra los primeros 180 pasos y el resultado final.';
  } catch(error) {
    $('result-heading').textContent='Todavía no pudimos terminar';$('feedback').className='error';$('feedback').textContent=error.message;
  } finally {setBusy(false);}
}

async function generate() {
  if(busy)return;
  if(!aiAvailable){$('ai-dialog').showModal();return;}
  if(!credentials){$('ai-dialog').showModal();$('ai-message').textContent='Conecta tu clave para generar. Puedes seguir las misiones sin IA.';return;}
  setBusy(true);stopReplay();$('feedback').className='';$('feedback').textContent='Tu IA está creando una variante. Después comprobaremos su solución antes de mostrarla…';
  try {
    const response=await fetch('/.netlify/functions/generate-exercise',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${credentials.key}`},body:JSON.stringify({model:credentials.model,topicId:getTopic().id,difficulty:credentials.difficulty,previousTitle:getExercise().title}),signal:AbortSignal.timeout(65000)});
    if(!response.ok){const error=await response.json().catch(()=>({error:'El servicio de IA no está disponible. En local ejecuta npm run dev; en Netlify despliega también la función.'}));throw new Error(error.error);}
    const candidate=validateGenerated(await response.json(),getTopic());
    const results=await runner.run(candidate.tests.map(test=>requestFor(candidate,candidate.solution,test)));
    const suite=gradeSuite(results,candidate.tests);
    if(!suite.passed)throw new Error('La variante no pasó la comprobación de su solución. Conservamos tu misión actual; puedes intentar otra generación.');
    generated=candidate;renderExercise();$('feedback').textContent='Variante generada y solución verificada. Resuélvela con los conceptos de este tema.';
  } catch(error) {$('feedback').className='error';$('feedback').textContent=error.message;} finally {setBusy(false);}
}

$('topics').addEventListener('click',event=>{const button=event.target.closest('[data-topic]');if(button)select(Number(button.dataset.topic));});
$('exercise-switcher').addEventListener('click',event=>{const button=event.target.closest('[data-exercise]');if(button)select(topicIndex,Number(button.dataset.exercise));});
$('editor').addEventListener('input',()=>{lineNumbers();if(!generated){progress.drafts[getExercise().id]=$('editor').value;persist();}});
$('editor').addEventListener('scroll',()=>{$('line-numbers').scrollTop=$('editor').scrollTop;});
$('editor').addEventListener('keydown',event=>{
  if(event.key==='Tab'){event.preventDefault();const input=$('editor'),start=input.selectionStart,end=input.selectionEnd;input.setRangeText('    ',start,end,'end');input.dispatchEvent(new Event('input'));}
  if(event.key==='Enter'&&(event.metaKey||event.ctrlKey)){event.preventDefault();execute();}
});
$('run').addEventListener('click',execute);
$('reset-code').addEventListener('click',()=>{delete progress.drafts[getExercise().id];persist();$('editor').value=getExercise().starter;lineNumbers();});
$('hint').addEventListener('click',()=>{const hints=getExercise().hints;$('hint-content').hidden=false;$('hint-content').textContent=`Pista ${Math.min(hintIndex+1,hints.length)}/${hints.length}: ${hints[Math.min(hintIndex,hints.length-1)]}`;hintIndex++;});
$('solution').addEventListener('click',()=>{$('solution-content').open=!$('solution-content').open;});
$('load-solution').addEventListener('click',()=>{$('editor').value=getExercise().solution;$('editor').dispatchEvent(new Event('input'));$('editor').focus();});
$('next').addEventListener('click',()=>{if(exerciseIndex<3)select(topicIndex,exerciseIndex+1);else select((topicIndex+1)%pythonCourse.topics.length);});
$('timeline').addEventListener('input',()=>{stopReplay();showFrame(Number($('timeline').value));});
$('replay').addEventListener('click',()=>{if(replayTimer){stopReplay();return;}let index=0;showFrame(index);$('replay').textContent='Ⅱ';replayTimer=setInterval(()=>{index++;if(index>=frames.length){stopReplay();return;}showFrame(index);},window.matchMedia('(prefers-reduced-motion: reduce)').matches?1000:550);});
$('ai-settings').addEventListener('click',()=>{$('ai-dialog').showModal();});
$('close-ai').addEventListener('click',()=>{$('api-key').value='';$('ai-dialog').close();});
$('ai-dialog').addEventListener('cancel',()=>{$('api-key').value='';});
$('ai-form').addEventListener('submit',event=>{event.preventDefault();const key=$('api-key').value.trim()||credentials?.key,model=$('ai-model').value.trim();if(!key||!model){$('ai-message').textContent='Introduce la clave y el ID del modelo.';return;}credentials={key,model,difficulty:$('ai-difficulty').value};$('api-key').value='';$('ai-settings').textContent='✧ IA conectada';$('ai-message').textContent='Conectada para esta pestaña. Se usará cuando pulses Generar otro.';$('ai-dialog').close();});
$('forget-key').addEventListener('click',()=>{credentials=null;$('api-key').value='';$('ai-model').value='';$('ai-settings').textContent='✧ IA opcional';$('ai-message').textContent='Clave eliminada de esta pestaña.';});
$('generate').addEventListener('click',generate);
$('test-results').addEventListener('click',event=>{const button=event.target.closest('[data-case]');if(!button||busy)return;stopReplay();const index=Number(button.dataset.case),result=lastRuns[index];if(!result)return;frames=result.frames;$('timeline').max=frames.length-1;$('timeline').disabled=frames.length<2;$('replay').disabled=frames.length<2;showFrame(frames.length-1);$('scene-mode').textContent=`Caso: ${getExercise().tests[index].name}`;$('console-output').textContent=(result.output||'(Sin salida de print)')+(result.error?`\n${result.error}`:'');});
document.querySelectorAll('[data-course]').forEach(button=>button.addEventListener('click',()=>{const course=courseCatalog.find(c=>c.id===button.dataset.course);if(course.status!=='ready'){$('feedback').className='';$('feedback').textContent=`Arena ${course.title} está prevista para una siguiente etapa. Ahora puedes completar la expedición de Python.`;}}));
$('export-progress').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(progress,null,2)],{type:'application/json'}));const link=document.createElement('a');link.href=url;link.download='arena-progreso.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
$('import-progress').addEventListener('click',()=>{$('progress-file').click();});
$('progress-file').addEventListener('change',async event=>{const file=event.target.files[0];if(!file||busy)return;try{if(file.size>1_000_000)throw new Error('El archivo de progreso es demasiado grande.');progress=cleanProgress(JSON.parse(await file.text()));persist();restorePosition();renderExercise();}catch(error){$('feedback').textContent=error.message;$('feedback').className='error';}event.target.value='';});
function restorePosition(){pythonCourse.topics.forEach((t,i)=>t.exercises.forEach((e,j)=>{if(e.id===progress.position){topicIndex=i;exerciseIndex=j;}}));generated=null;}
window.addEventListener('pagehide',()=>{credentials=null;runner.stop();stopReplay();});
restorePosition();renderExercise();
fetch(new URL('./config.json',import.meta.url)).then(r=>r.json()).then(config=>{
  aiAvailable=config.generation==='server';
  for(const id of ['api-key','ai-model','ai-difficulty','connect-ai'])$(id).disabled=!aiAvailable;
  if(!aiAvailable){$('generate').textContent='✧ IA · próxima conexión';$('ai-service-status').textContent='La generación se habilitará cuando conectemos el servicio de IA del sitio. Puedes completar todas las misiones preparadas desde ahora.';}
}).catch(()=>{$('ai-service-status').textContent='No pudimos comprobar la conexión de IA. Puedes continuar con las misiones.';});
