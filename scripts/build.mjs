import {cp,mkdir,rm,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
const destination=path.join(root,'dist');
await rm(destination,{recursive:true,force:true});await mkdir(destination,{recursive:true});
for(const item of ['index.html','Curso_HTML_CSS_JS','Curso_bug_tool_project','Design_System','Old_references','DESIGN_SYSTEM_SPEC.md','arena','bugtool1','bugtool1.png','bugtool2.png'])await cp(path.join(root,item),path.join(destination,item),{recursive:true,filter:source=>!source.endsWith('.DS_Store')&&!source.includes('__pycache__')});
await writeFile(path.join(destination,'arena','config.json'),JSON.stringify({generation:process.argv.includes('--static')?'unavailable':'server'}));
console.log('Sitio preparado en dist/ · Arena y cursos existentes incluidos.');
