import {pythonCourse} from '../../arena/courses/python.js';

const text={type:'string'};
const stringList={type:'array',items:text};
const schema={type:'object',additionalProperties:false,required:['title','description','starter','solution','hints','watch','inputs','tests'],properties:{title:text,description:text,starter:text,solution:text,hints:stringList,watch:stringList,inputs:stringList,tests:{type:'array',items:{type:'object',additionalProperties:false,required:['name','context_json','expect_json','inputs'],properties:{name:text,context_json:text,expect_json:text,inputs:stringList}}}}};
const reply=(status,data)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});

export default async function generate(request) {
  if(request.method!=='POST')return reply(405,{error:'Usa POST para generar un ejercicio.'});
  const origin=request.headers.get('origin');
  if(origin&&origin!==new URL(request.url).origin)return reply(403,{error:'La generación debe iniciarse desde este sitio.'});
  const auth=request.headers.get('authorization');
  if(!auth?.startsWith('Bearer ')||auth.length<20||auth.length>1000)return reply(401,{error:'Conecta tu propia API key para generar.'});
  try {
    const body=await request.text();
    if(body.length>4000)return reply(413,{error:'La solicitud es demasiado grande.'});
    const {model,topicId,difficulty,previousTitle}=JSON.parse(body);
    const index=pythonCourse.topics.findIndex(t=>t.id===topicId);
    if(index<0||typeof model!=='string'||!/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,100}$/.test(model)||!['same','harder'].includes(difficulty))return reply(400,{error:'Revisa el tema, modelo y dificultad.'});
    const topic=pythonCourse.topics[index];
    const instructions=`Eres autor de Arena Python en español, para principiantes absolutos. Genera UNA misión original y autocontenida de Base Aurora. Usa únicamente estos conceptos ya introducidos: ${pythonCourse.topics.slice(0,index+1).map(t=>t.concept).join(' ')}. El foco es ${topic.title}. No uses imports, funciones propias, clases, archivos, red, comprehensions, ni métodos o conceptos no introducidos. La escena observa estas variables opcionales: energia/restante (batería), puerta_abierta (booleano), nombre (credencial), mensaje o print (radio), carga/listos (paquetes), paquetes (cantidad), peso, recargas, encendidas (lista de índices de balizas), total (balizas). El enunciado debe decir qué variables recibe y cuáles debe producir. No sobreescribas datos del contexto con constantes. Incluye código inicial incompleto, una solución correcta y exactamente 3 pistas graduales. Incluye de 2 a 5 pruebas con casos límite. context_json contiene un objeto JSON con variables iniciales. expect_json contiene {"vars":{...}} y opcionalmente "output" con salida exacta incluyendo saltos de línea. Para el tema print utiliza pruebas de salida, context_json {} y explica los mensajes exactos. inputs contiene respuestas como textos; cada input() consume una respuesta. Para while/for/conditionals la solución debe usar respectivamente while/for/if. watch contiene nombres de variables a observar. Todos los textos son texto plano, sin HTML ni Markdown. La dificultad es ${difficulty==='harder'?'más exigente, combinando exclusivamente conceptos conocidos':'similar al nivel de la misión de referencia'}.`;
    const upstream=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{Authorization:auth,'Content-Type':'application/json'},body:JSON.stringify({model,instructions,input:JSON.stringify({reference:topic.exercises[3],avoidTitle:typeof previousTitle==='string'?previousTitle.slice(0,150):''}),text:{format:{type:'json_schema',name:'arena_exercise',strict:true,schema}},max_output_tokens:4500,store:false}),signal:AbortSignal.timeout(55000)});
    if(!upstream.ok){const status=upstream.status;return reply(status===401?401:status===429?429:502,{error:status===401?'La API key no fue aceptada por OpenAI.':status===429?'Tu cuenta alcanzó su límite de uso o saldo. Revisa tu cuenta de API.':'OpenAI no pudo generar la variante. Revisa que el modelo de tu cuenta admita Structured Outputs.'});}
    const response=await upstream.json();
    if(response.status!=='completed')return reply(502,{error:'La generación quedó incompleta. Puedes volver a intentarlo.'});
    const content=(response.output??[]).filter(item=>item.type==='message').flatMap(item=>item.content??[]);
    if(content.some(item=>item.type==='refusal'))return reply(422,{error:'El modelo no generó esta variante. Intenta otra solicitud.'});
    const result=content.filter(item=>item.type==='output_text').map(item=>item.text).join('');
    return reply(200,JSON.parse(result));
  } catch(error) {return reply(error.name==='TimeoutError'?504:400,{error:error.name==='TimeoutError'?'La generación tardó demasiado. Puedes volver a intentarlo.':'No se pudo completar la generación. Revisa la configuración y vuelve a intentarlo.'});}
}
