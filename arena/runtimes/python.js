export class PythonRunner {
  constructor(onStatus = () => {}) {this.onStatus=onStatus;this.worker=null;this.pending=new Map();this.serial=0;this.ready=null;}
  spawn() {
    this.worker=new Worker(new URL('./python-worker.js',import.meta.url),{type:'module'});
    this.worker.onmessage=({data})=>{const request=this.pending.get(data.id);if(!request)return;clearTimeout(request.timer);this.pending.delete(data.id);data.error ? request.reject(new Error(data.error)) : request.resolve(data);};
    this.worker.onerror=()=>this.stop('No se pudo cargar Python. Revisa la conexión y vuelve a ejecutar.');
  }
  request(message, timeout) {
    const id=++this.serial;
    return new Promise((resolve,reject)=>{const timer=setTimeout(()=>this.stop('El programa tardó demasiado. Revisa el bucle y vuelve a ejecutar.'),timeout);this.pending.set(id,{resolve,reject,timer});this.worker.postMessage({...message,id});});
  }
  async initialize() {
    if(!this.ready) {
      this.spawn();this.onStatus('Cargando Python…');
      this.ready=this.request({type:'initialize'},90000).then(()=>this.onStatus('Python listo')).catch(error=>{this.ready=null;throw error;});
    }
    await this.ready;
  }
  async run(requests) {await this.initialize();const result=await this.request({type:'execute',requests},7000);return result.results;}
  stop(message='Ejecución cancelada.') {this.worker?.terminate();this.worker=null;this.ready=null;for(const request of this.pending.values()){clearTimeout(request.timer);request.reject(new Error(message));}this.pending.clear();this.onStatus('Python pausado · vuelve a ejecutar');}
}
