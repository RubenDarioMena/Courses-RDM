const key = 'arena.progress.v1';
export function cleanProgress(value) {
  if (!value || value.version !== 1 || typeof value.drafts !== 'object' || !Array.isArray(value.completed)) throw new Error('Ese archivo no contiene un progreso de Arena válido.');
  const drafts = {};
  for (const [id, code] of Object.entries(value.drafts ?? {})) if (/^[a-z0-9-]{1,100}$/.test(id) && typeof code === 'string' && code.length <= 12000) drafts[id] = code;
  return {version:1,completed:[...new Set(value.completed.filter(id => typeof id === 'string' && /^[a-z0-9-]{1,100}$/.test(id)))],drafts,position:typeof value.position === 'string' ? value.position.slice(0,100) : 'print-1'};
}
export function loadProgress() {
  try {return cleanProgress(JSON.parse(localStorage.getItem(key)));} catch {return {version:1,completed:[],drafts:{},position:'print-1'};}
}
export function saveProgress(progress) {
  try {localStorage.setItem(key,JSON.stringify(progress));return true;} catch {return false;}
}
