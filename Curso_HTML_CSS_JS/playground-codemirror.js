/* ═══════════════════════════════════════════════════════════════════════
 *  PLAYGROUND CON CODEMIRROR 6  —  Curso HTML+CSS+JS
 *  Archivo: playground-codemirror.js
 * ═══════════════════════════════════════════════════════════════════════
 *
 *  CÓMO AÑADIRLO A UNA LECCIÓN QUE NO TIENE PLAYGROUND
 *  ─────────────────────────────────────────────────────
 *
 *  1.  Justo antes de </body>, pega una de estas líneas
 *      (ajusta la ruta según la carpeta del módulo):
 *
 *        <script type="module" src="playground-codemirror.js"></script>
 *        <script type="module" src="../playground-codemirror.js"></script>
 *
 *  2.  OPCIONAL — Pre-cargar código de ejemplo en el editor.
 *      Añade ANTES del <script> del playground:
 *
 *        <script>
 *          window.PG_DEFAULT_CODE = {
 *            html: '<h1>Hola</h1>',
 *            css:  'body { background:#09080F; color:#fff; }',
 *            js:   'console.log("hola");'
 *          };
 *        </script>
 *
 *  3.  REQUIERE internet.  CodeMirror 6 se carga desde esm.sh (CDN).
 *      Sin conexión el curso se lee sin problema, pero el editor no
 *      arranca (el FAB no aparece).
 *
 *  4.  AUTO-CONTENIDO.  No lee ningún otro archivo del proyecto.
 *      Inyecta su propio <style>, su propio HTML (FAB, backdrop, panel)
 *      y su propia lógica.  No choca con el contenido de la lección.
 *      Todas las clases y IDs van prefijadas con `pg-` para evitar
 *      colisiones con el CSS de la lección.
 *
 *  5.  Si la lección YA tiene un playground (textarea+iframe), NO
 *      enlaces este script — generaría un segundo FAB duplicado.
 *
 * ═══════════════════════════════════════════════════════════════════════ */

import { basicSetup, EditorView } from "https://esm.sh/codemirror@6.0.2";
import { EditorState } from "https://esm.sh/@codemirror/state@6";

import { html as cmHTML } from "https://esm.sh/@codemirror/lang-html@6";
import { css  as cmCSS  } from "https://esm.sh/@codemirror/lang-css@6";
import { javascript as cmJS } from "https://esm.sh/@codemirror/lang-javascript@6";

import { oneDark } from "https://esm.sh/@codemirror/theme-one-dark@6";
import { syntaxHighlighting, HighlightStyle } from "https://esm.sh/@codemirror/language@6";
import { tags as t } from "https://esm.sh/@lezer/highlight@1";

/* ── DESIGN-SYSTEM HIGHLIGHT ────────────────────────────────────────────
 * Colores de sintaxis que matchean el DESIGN_SYSTEM_SPEC.md:
 *   cyan    → tags HTML
 *   green   → selectores CSS / tipos
 *   yellow  → strings / números / booleanos
 *   purple  → keywords / operadores / llaves
 *   blue    → atributos / propiedades
 * ──────────────────────────────────────────────────────────────────── */
const dsHighlight = HighlightStyle.define([
  { tag: t.comment,            color: "#5C6A75", fontStyle: "italic" },
  { tag: t.string,              color: "#ECC48D" },
  { tag: t.number,             color: "#F5C451" },
  { tag: t.keyword,            color: "#C4B5FD" },
  { tag: t.bool,               color: "#F5C451" },
  { tag: t.null,               color: "#F5C451" },
  { tag: t.variableName,       color: "#C7CDE0" },
  { tag: t.propertyName,       color: "#93C5FD" },
  { tag: t.tagName,            color: "#7FE0F0" },
  { tag: t.attributeName,      color: "#82AAFF" },
  { tag: t.typeName,           color: "#34D399" },
  { tag: t.punctuation,        color: "#8B889C" },
  { tag: t.operator,           color: "#A78BFA" },
  { tag: t.definition(t.variableName), color: "#7FE0F0" },
]);

/* ── EDITOR THEME OVERRIDE (sobre oneDark) ──────────────────────────────
 * Fondo y gutters que matchean el design system (#0C0B13, transparent).
 */
const dsTheme = EditorView.theme({
  "&":                 { backgroundColor: "transparent", color: "#C7CDE0" },
  ".cm-scroller":      { fontFamily: "'JetBrains Mono',ui-monospace,'SF Mono',monospace",
                          fontSize: "13.5px", lineHeight: "1.75" },
  ".cm-gutters":       { backgroundColor: "transparent", border: "none", color: "#5E5C6E" },
  ".cm-activeLine":    { backgroundColor: "rgba(255,255,255,.02)" },
  ".cm-activeLineGutter": { backgroundColor: "transparent" },
  "&.cm-focused":      { outline: "none" },
  "& ::selection":     { backgroundColor: "rgba(167,139,250,.22)" },
  ".cm-cursor, .cm-dropCursor": { borderLeftColor: "#A78BFA" },
  ".cm-selectionMatch": { backgroundColor: "rgba(167,139,250,.12)" },
});

/* ── DEFAULT CODE ─────────────────────────────────────────────────────── */
const defaultCode = window.PG_DEFAULT_CODE || {
  html: '<header class="navbar">\n  <div class="logo">studio</div>\n  <nav class="menu">\n    <a href="#">Inicio</a>\n    <a href="#" class="cta">Contacto</a>\n  </nav>\n</header>\n<main class="cards">\n  <div class="card">Diseño</div>\n  <div class="card">Código</div>\n  <div class="card">Estrategia</div>\n</main>',
  css:  '* { box-sizing: border-box; margin: 0; padding: 0; }\nbody { font-family: system-ui; background: #09080F; color: #EEEBF6; padding-top: 80px; }\n.navbar { position: fixed; top: 0; left: 0; right: 0; height: 64px; padding: 0 24px;\n  background: #0E0D16; border-bottom: 1px solid #1f2937;\n  display: flex; justify-content: space-between; align-items: center; }\n.logo { color: #34D399; font-weight: 700; }\n.menu { display: flex; gap: 24px; }\n.menu a { color: #C7CDE0; text-decoration: none; }\n.menu a.cta { background: #34D399; color: #06120B; padding: 8px 18px; border-radius: 8px; font-weight: 600; }\n.cards { display: flex; gap: 16px; padding: 24px; }\n.card { flex: 1; padding: 24px; background: #1B1926; border: 1px solid #2d3748; border-radius: 12px; text-align: center; }',
  js:   'console.log("cards en pantalla:", document.querySelectorAll(".card").length);\nconsole.warn("edita el HTML o el CSS y vuelve a pulsar Ejecutar");',
};

/* ── RUNTIME STATE ─────────────────────────────────────────────────────── */
const pgState = {
  tab: "html",
  outTab: "preview",
  console: [],
  editors: null,   // se crea lazy al abrir el panel
};

/* ═══════════════════════════════════════════════════════════════════════
 *  CSS INJECTION  —  todos los estilos del playground viven aquí
 * ═══════════════════════════════════════════════════════════════════════ */
const PG_CSS = `
/* ── FAB ─────────────────────────────────────────────────────────────── */
.pg-fab{position:fixed;bottom:22px;right:22px;z-index:50;background:none;border:0;
  padding:0;cursor:pointer;transition:opacity .25s}
.pg-fab-btn{width:56px;height:56px;border-radius:16px;display:flex;align-items:center;
  justify-content:center;background:linear-gradient(145deg,#34D399,#10B981);
  box-shadow:0 8px 24px -6px rgba(52,211,153,.5);transition:transform .25s}
.pg-fab:hover .pg-fab-btn{transform:scale(1.08)}
.pg-fab-btn svg{width:24px;height:24px}

/* ── BACKDROP ─────────────────────────────────────────────────────────── */
.pg-backdrop{position:fixed;inset:0;z-index:60;background:rgba(4,3,8,.62);
  backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);
  opacity:0;pointer-events:none;transition:opacity .35s ease}
.pg-backdrop.show{opacity:1;pointer-events:auto}

/* ── PANEL ───────────────────────────────────────────────────────────── */
.pg-panel{position:fixed;z-index:70;top:0;right:0;height:100vh;width:min(660px,94vw);
  background:#110F18;border-left:1px solid rgba(255,255,255,.07);
  box-shadow:-20px 0 60px rgba(0,0,0,.5);
  transform:translateX(106%);transition:transform .4s cubic-bezier(.4,0,.2,1);
  display:flex;flex-direction:column}
.pg-panel.show{transform:translateX(0)}
@media(max-width:768px){
  .pg-panel{top:0;left:0;right:0;bottom:0;width:100%;height:100vh;
    transform:translateY(100%);border-left:none}
  .pg-panel.show{transform:translateY(0)}
}

/* ── PANEL HEAD ──────────────────────────────────────────────────────── */
.pg-panel-head{flex-shrink:0;display:flex;align-items:center;justify-content:
  space-between;gap:10px;padding:10px 12px;background:#1B1926;
  border-bottom:1px solid rgba(255,255,255,.07)}
.pg-panel-tabs{display:flex;gap:4px}
.pg-ptab{padding:6px 13px;border-radius:9px;font-size:12.5px;font-weight:600;
  cursor:pointer;font-family:'Plus Jakarta Sans',system-ui,sans-serif;
  background:transparent;color:#8B889C;border:1px solid transparent;transition:all .15s}
.pg-ptab.active{background:rgba(139,92,246,.16);color:#CBBEFB;
  border-color:rgba(167,139,250,.35)}
.pg-ptab:hover:not(.active){color:#C7CDE0}
.pg-panel-close{width:34px;height:34px;display:flex;align-items:center;
  justify-content:center;background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.07);border-radius:9px;color:#A6A3B6;
  cursor:pointer;transition:all .15s}
.pg-panel-close:hover{background:rgba(255,255,255,.1);color:#fff}
.pg-panel-close svg{width:18px;height:18px}

/* ── PANEL BODY  +  EDITOR AREA ───────────────────────────────────────── */
.pg-panel-body{flex:1;overflow:hidden;display:flex;flex-direction:column}
.pg-editor-area{flex:1;position:relative;overflow:hidden;background:#0C0B13}
.pg-cm-container{position:absolute;inset:0;display:none;overflow:hidden}
.pg-cm-container.active{display:block}
.pg-cm-container .cm-editor{height:100%;background:#0C0B13}
.pg-cm-container .cm-editor.cm-focused{outline:none}

/* ── PANEL FOOT ──────────────────────────────────────────────────────── */
.pg-panel-foot{flex-shrink:0;display:flex;align-items:center;gap:6px;
  padding:8px 12px;background:#1B1926;border-top:1px solid rgba(255,255,255,.07)}
.pg-run-btn{margin-left:auto;padding:7px 18px;border-radius:10px;border:0;
  cursor:pointer;background:linear-gradient(145deg,#34D399,#10B981);
  color:#06120B;font-family:'Plus Jakarta Sans',system-ui,sans-serif;
  font-size:13px;font-weight:600;display:flex;align-items:center;gap:6px;
  transition:transform .2s,box-shadow .2s}
.pg-run-btn:hover{transform:translateY(-1px);
  box-shadow:0 6px 16px -4px rgba(52,211,153,.5)}
.pg-run-btn svg{width:14px;height:14px}
.pg-out-tab{padding:6px 13px;border-radius:9px;font-size:12.5px;font-weight:600;
  cursor:pointer;background:transparent;color:#8B889C;
  border:1px solid transparent;font-family:'Plus Jakarta Sans',system-ui,sans-serif}
.pg-out-tab.active{background:rgba(139,92,246,.16);color:#CBBEFB;
  border-color:rgba(167,139,250,.35)}
.pg-clear-btn{padding:6px 10px;border-radius:8px;
  border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.04);
  color:#8B889C;font-size:12px;cursor:pointer}
.pg-clear-btn:hover{color:#C7CDE0}

/* ── OUTPUT PANELS ────────────────────────────────────────────────────── */
.pg-output-panel{flex:1;overflow:auto;display:none;position:relative;
  background:#0C0B13}
.pg-output-panel.active{display:block}
#pgFrame{width:100%;height:100%;border:0;background:#fff}
#pgConsole{padding:12px 16px;font-family:'JetBrains Mono',ui-monospace,monospace;
  font-size:13px;line-height:1.6;overflow:auto}
.pg-log-line{margin:3px 0;display:flex;gap:8px;align-items:flex-start}
.pg-log-tag{flex-shrink:0;font-size:10px;padding:2px 6px;border-radius:4px;
  font-weight:600}
.pg-log-tag.log{color:#93C5FD;background:rgba(147,197,253,.1)}
.pg-log-tag.warn{color:#F5C451;background:rgba(245,196,81,.1)}
.pg-log-tag.error{color:#FF8E8E;background:rgba(255,142,142,.1)}
.pg-log-text{color:#C7CDE0;word-break:break-word;white-space:pre-wrap}
.pg-log-empty{color:#5E5C6E;font-size:13px;padding:20px;text-align:center}
`;

const pgStyle = document.createElement("style");
pgStyle.textContent = PG_CSS;
document.head.appendChild(pgStyle);

/* ═══════════════════════════════════════════════════════════════════════
 *  HTML INJECTION  —  FAB + backdrop + panel con contenedores CodeMirror
 * ═══════════════════════════════════════════════════════════════════════ */
document.body.insertAdjacentHTML("beforeend", `
<button class="pg-fab" id="pgFab" aria-label="Abrir editor">
  <div class="pg-fab-btn">
    <svg viewBox="0 0 24 24" fill="none" stroke="#06120B" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <path d="M15 3h6v6"/>
      <path d="M10 14L21 3"/>
    </svg>
  </div>
</button>

<div class="pg-backdrop" id="pgBackdrop"></div>

<div class="pg-panel" id="pgPanel">
  <div class="pg-panel-head">
    <div class="pg-panel-tabs">
      <button class="pg-ptab active" data-tab="html">HTML</button>
      <button class="pg-ptab"        data-tab="css">CSS</button>
      <button class="pg-ptab"        data-tab="js">JS</button>
    </div>
    <button class="pg-panel-close" id="pgClose" aria-label="Cerrar">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </button>
  </div>
  <div class="pg-panel-body">
    <div class="pg-editor-area">
      <div class="pg-cm-container active" id="cmHtml"></div>
      <div class="pg-cm-container"        id="cmCss"></div>
      <div class="pg-cm-container"        id="cmJs"></div>
    </div>
    <div class="pg-panel-foot">
      <button class="pg-out-tab active" data-out="preview">Vista</button>
      <button class="pg-out-tab"        data-out="console">Consola</button>
      <button class="pg-clear-btn" id="pgClear">Limpiar</button>
      <button class="pg-run-btn" id="pgRun">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
             stroke-linecap="round" stroke-linejoin="round">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
        Ejecutar
      </button>
    </div>
    <div class="pg-output-panel active" id="pgPreview" style="min-height:200px">
      <iframe id="pgFrame" sandbox="allow-scripts" title="Vista previa"></iframe>
    </div>
    <div class="pg-output-panel" id="pgConsolePanel" style="min-height:200px">
      <div id="pgConsole">
        <div class="pg-log-empty">La consola está vacía.
        Pulsa Ejecutar para ver la salida.</div>
      </div>
    </div>
  </div>
</div>
`);

/* ═══════════════════════════════════════════════════════════════════════
 *  LAZY EDITOR INIT  —  se crea la primera vez que se abre el panel
 * ═══════════════════════════════════════════════════════════════════════ */
function initEditors() {
  if (pgState.editors) return;

  const makeExt = (lang) => [
    basicSetup,
    oneDark,
    dsTheme,
    syntaxHighlighting(dsHighlight),
    lang,
  ];

  pgState.editors = {
    html: new EditorView({
      parent: document.getElementById("cmHtml"),
      state:  EditorState.create({
        doc: defaultCode.html,
        extensions: makeExt(cmHTML()),
      }),
    }),
    css: new EditorView({
      parent: document.getElementById("cmCss"),
      state:  EditorState.create({
        doc: defaultCode.css,
        extensions: makeExt(cmCSS()),
      }),
    }),
    js: new EditorView({
      parent: document.getElementById("cmJs"),
      state:  EditorState.create({
        doc: defaultCode.js,
        extensions: makeExt(cmJS()),
      }),
    }),
  };
}

/* ═══════════════════════════════════════════════════════════════════════
 *  PLAYGROUND FUNCTIONS
 * ═══════════════════════════════════════════════════════════════════════ */
function openPlayground() {
  initEditors();
  document.getElementById("pgBackdrop").classList.add("show");
  document.getElementById("pgPanel").classList.add("show");
  document.getElementById("pgFab").style.opacity = "0";
  document.getElementById("pgFab").style.pointerEvents = "none";
  // refresca el editor activo (CodeMirror necesita medir tras display:none)
  requestAnimationFrame(() => {
    if (pgState.editors && pgState.editors[pgState.tab]) {
      pgState.editors[pgState.tab].requestMeasure();
    }
  });
  runPlayground();
}

function closePlayground() {
  document.getElementById("pgBackdrop").classList.remove("show");
  document.getElementById("pgPanel").classList.remove("show");
  document.getElementById("pgFab").style.opacity = "1";
  document.getElementById("pgFab").style.pointerEvents = "auto";
}

function setTab(tab) {
  pgState.tab = tab;
  document.querySelectorAll(".pg-ptab").forEach(function (b) {
    b.classList.toggle("active", b.dataset.tab === tab);
  });
  document.querySelectorAll(".pg-cm-container").forEach(function (c) {
    c.classList.remove("active");
  });
  var id = { html: "cmHtml", css: "cmCss", js: "cmJs" }[tab];
  document.getElementById(id).classList.add("active");
  if (pgState.editors && pgState.editors[tab]) {
    pgState.editors[tab].requestMeasure();
    pgState.editors[tab].focus();
  }
}

function setOutTab(tab) {
  pgState.outTab = tab;
  document.querySelectorAll(".pg-out-tab").forEach(function (b) {
    b.classList.toggle("active", b.dataset.out === tab);
  });
  document.getElementById("pgPreview").classList.toggle("active", tab === "preview");
  document.getElementById("pgConsolePanel").classList.toggle("active", tab === "console");
}

function clearConsole() {
  pgState.console = [];
  renderConsole();
}

function renderConsole() {
  var c = document.getElementById("pgConsole");
  if (!pgState.console.length) {
    c.innerHTML = '<div class="pg-log-empty">La consola está vacía. Pulsa Ejecutar para ver la salida.</div>';
    return;
  }
  c.innerHTML = "";
  pgState.console.forEach(function (l) {
    var line = document.createElement("div");
    line.className = "pg-log-line";
    var tag = document.createElement("span");
    tag.className = "pg-log-tag " + (l.level || "log");
    tag.textContent = l.level || "log";
    var txt = document.createElement("span");
    txt.className = "pg-log-text";
    txt.textContent = l.text;
    line.appendChild(tag);
    line.appendChild(txt);
    c.appendChild(line);
  });
}

function runPlayground() {
  pgState.console = [];
  var getDoc = function (k) {
    return pgState.editors
      ? pgState.editors[k].state.doc.toString()
      : defaultCode[k];
  };
  var html = getDoc("html");
  var css  = getDoc("css");
  var js   = getDoc("js");

  /* iframe sandboxed: captura console.log/warn/error vía postMessage */
  var src =
    '<!DOCTYPE html><html><head><meta charset="utf-8"><style>' +
    css +
    "</style></head><body>" +
    html +
    '<scr' +
      "ipt>(function(){var send=function(level,args){try{parent.postMessage({__pg:true,level:level,text:args.map(function(a){try{return typeof a===\"string\"?a:JSON.stringify(a)}catch(e){return String(a)}}).join(\" \")},\"*\")}catch(e){}};var _l=console.log,_w=console.warn,_e=console.error;console.log=function(){send(\"log\",[].slice.call(arguments));_l.apply(console,arguments)};console.warn=function(){send(\"warn\",[].slice.call(arguments));_w.apply(console,arguments)};console.error=function(){send(\"error\",[].slice.call(arguments));_e.apply(console,arguments)};window.onerror=function(m){send(\"error\",[m]);return false};})();</scr" +
      "ipt>" +
    '<scr' +
      "ipt>try{" +
      js +
      '}catch(e){console.error((e.name||"Error")+": "+e.message)}</scr' +
      "ipt>" +
    "</body></html>";

  document.getElementById("pgFrame").srcdoc = src;
  renderConsole();
}

/* ═══════════════════════════════════════════════════════════════════════
 *  EVENT WIRING
 * ═══════════════════════════════════════════════════════════════════════ */
document.getElementById("pgFab").addEventListener("click", openPlayground);
document.getElementById("pgBackdrop").addEventListener("click", closePlayground);
document.getElementById("pgClose").addEventListener("click", closePlayground);
document.getElementById("pgRun").addEventListener("click", runPlayground);
document.getElementById("pgClear").addEventListener("click", clearConsole);

document.querySelectorAll(".pg-ptab").forEach(function (b) {
  b.addEventListener("click", function () { setTab(b.dataset.tab); });
});
document.querySelectorAll(".pg-out-tab").forEach(function (b) {
  b.addEventListener("click", function () { setOutTab(b.dataset.out); });
});

/* consola: escuchar mensajes del iframe */
window.addEventListener("message", function (e) {
  if (e && e.data && e.data.__pg) {
    pgState.console.push({ level: e.data.level, text: e.data.text });
    renderConsole();
  }
});

/* keyboard shortcuts: Ctrl/Cmd+Enter = ejecutar, Esc = cerrar */
document.addEventListener("keydown", function (e) {
  var panelOpen = document.getElementById("pgPanel").classList.contains("show");
  if (!panelOpen) return;
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    e.preventDefault();
    runPlayground();
  }
  if (e.key === "Escape") {
    closePlayground();
  }
});