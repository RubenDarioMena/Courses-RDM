# Curso HTML + CSS + JavaScript

> **Curso completo para principiantes absolutos.** Sin experiencia previa en programación.
> **45 módulos** en 3 bloques secuenciales: HTML → CSS → JavaScript.
> **Cada módulo = un archivo `.html` autocontenido** que se abre con doble clic, sin internet, sin instalar nada.

---

## 📦 ¿Qué hay en esta carpeta?

```
Curso_HTML_CSS_JS/
├── README.md                       # Este archivo
├── 00_TEMARIO_v2.md                # Temario refinado (loop adversarial 3 ciclos)
├── DESIGN_SYSTEM_SPEC.md           # Spec visual del Design System
│
├── 01_HTML/                        # M00–M14 (15 módulos)
│   ├── M00_Bienvenido.html
│   ├── M01_Primera_Pagina.html
│   ├── M02_Sintaxis_Elementos.html
│   ├── M03_Estructura_Semantica.html
│   ├── M04_Texto_Encabezados.html
│   ├── M05_Enlaces_Navegacion.html
│   ├── M06_Listas.html
│   ├── M07_Imagenes_Multimedia.html
│   ├── M08_Tablas.html
│   ├── M09_Formularios_1.html
│   ├── M10_Formularios_2_Interactividad.html
│   ├── M11_Accesibilidad.html
│   ├── M12_Metadatos_SEO_Social.html
│   ├── M13_APIs_HTML5.html
│   └── M14_Buenas_practicas.html
│
├── 02_CSS/                         # M15–M27 (13 módulos)
│   ├── M15_Que_es_CSS.html
│   ├── M16_cascada_especificidad_herencia.html
│   ├── M17_modelo_caja.html
│   ├── M18_flujo_posicionamiento.html
│   ├── M19_flexbox.html
│   ├── M20_grid.html
│   ├── M21_diseno_responsivo.html
│   ├── M22_colores_fondos.html
│   ├── M23_tipografia.html
│   ├── M24_transiciones_animaciones.html
│   ├── M25_transformaciones.html
│   ├── M26_variables_pseudo.html
│   └── M27_CSS_moderno_arquitectura.html
│
└── 03_JS/                          # M28–M44 (17 módulos)
    ├── M28_Que_es_JS.html
    ├── M29_Variables.html
    ├── M30_Tipos_operadores.html
    ├── M31_Flujo_control.html
    ├── M32_Funciones.html
    ├── M33_Arrays.html
    ├── M34_Objetos_closures.html
    ├── M35_Strings_templates.html
    ├── M36_DOM_eventos.html
    ├── M37_Manejo_errores.html
    ├── M38_Async_fetch.html
    ├── M39_Organizacion_codigo.html
    ├── M40_Clases_POO.html
    ├── M41_JSON.html
    ├── M42_localStorage.html
    ├── M43_Buenas_practicas_debug.html
    └── M44_Proyecto_final.html
```

**Total: 45 archivos HTML · 1.43 MB · 0 dependencias externas.**

---

## 🚀 Cómo usar el curso

### Para el alumno

1. **Empieza por `01_HTML/M00_Bienvenido.html`** y sigue en orden. Cada módulo asume los anteriores.
2. **Doble clic en cualquier `.html`** → se abre en tu navegador. Funciona sin internet, sin instalar nada, sin servidor.
3. **En cada módulo**:
   - Lee las secciones numeradas (`01 ·`, `02 ·`, `03 ·`...).
   - **"LA IDEA EN UNA IMAGEN"** → la metáfora visual que abre el módulo.
   - **"TU PRIMER MOMENTO"** → editor interactivo. Pulsa **Ejecutar** y mira el resultado.
   - En módulos de CSS/JS verás un **FAB verde "Probar código"** abajo a la derecha → abre un playground completo con tabs HTML/CSS/JS.
   - **"RECURSOS PARA PROFUNDIZAR"** → 3 enlaces a MDN, web.dev o javascript.info.
   - **"¿Listo para el siguiente módulo?"** → botón CTA al siguiente módulo. Sigue el orden.
4. **En M14, M27, M44** (cierre de cada bloque) hay un **proyecto final** integrador. Hazlo: ahí se junta todo.

### Para quien comparte la carpeta

- Distribuye la carpeta completa tal cual: ZIP, USB, share de red, lo que sea.
- Los alumnos **no necesitan instalar nada** (ni VSCode, ni Node, ni Python). Solo un navegador moderno (Chrome, Firefox, Safari, Edge actuales).
- **Si tu equipo no puede instalar nada** (política de seguridad, equipo compartido): este curso es exactamente lo que necesitas. Doble clic y listo.

---

## 🔒 Restricciones técnicas (no negociables)

| Restricción | Por qué |
|---|---|
| **Cero red** | Sin CDN, sin Google Fonts, sin fetch a APIs externas, sin telemetría. Funciona offline total. |
| **Cero install** | Un solo archivo `.html` por módulo. Doble clic → abre. |
| **Cero dependencias** | Sin React, sin Babel, sin Tailwind, sin bundler, sin frameworks. HTML/CSS/JS vanilla. |
| **`file://` compatible** | Todo funciona abriendo el archivo directamente desde el sistema de archivos (CORS no bloquea). |
| **Sin eval malicioso** | El único `eval`/`new Function` se usa en playgrounds internos con código controlado (del propio alumno). |
| **Sin telemetría** | Cero tracking, cero analytics, cero cookies. |

**Por qué importa:** el equipo de la base de datos (testers, QA, gente de soporte) **no puede instalar nada** en sus equipos. Este curso respeta eso al 100%.

---

## 🎨 Design System

El sistema visual está inspirado en el Design System original del curso (ver `DESIGN_SYSTEM_SPEC.md`) y reproducido en HTML/CSS vanilla. Cada bloque tiene su color de marca:

| Token | Color | Bloque | Uso |
|---|---|---|---|
| **Base** | `#09080F` | Todos | Background del body |
| **Accent** | `#A78BFA` | Todos | Botones primarios, links (púrpura) |
| **HTML** | `#67E8F9` | Bloque I | Chip módulo, hl, num-tag (cyan) |
| **CSS** | `#34D399` | Bloque II | Chip módulo, hl, num-tag (verde) |
| **JS** | `#F5C451` | Bloque III | Chip módulo, hl, num-tag (amarillo) |
| **Pink** | `#F9A8D4` | Recursos | Editar/recursos |
| **Red** | `#FB7185` | — | Errores, debilidades |

**Tipografía:**
- `Space Grotesk` → headings, números de paso
- `Plus Jakarta Sans` → body, UI
- `JetBrains Mono` → código, números de módulo

Como las fuentes no se cargan de Google Fonts (restricción cero red), los HTMLs usan **system fonts** como fallback: `system-ui`, `sans-serif`, `ui-monospace`. Si tienes las originales instaladas localmente, el navegador las usará automáticamente.

---

## 📐 Estructura de cada módulo

Todos los HTMLs siguen la misma jerarquía pedagógica:

```
MÓDULO XX · <TEMA>
<h1> Título grande
<p>  Intro del módulo
meta: "Sin experiencia previa" · "~X min de lectura"

SECCIÓN: LA IDEA EN UNA IMAGEN (en algunos)
  <h2> Metáfora visual

01 · <SUBTÍTULO>
  <h2> Contenido
  Ejemplos de código

02 · <SUBTÍTULO>
  ...

TU PRIMER MOMENTO <TEMA>
  Editor de código interactivo inline (o canvas, o playground)
  Botón: Ejecutar
  Output: preview o consola

N · RECURSOS PARA PROFUNDIZAR
  3-4 enlaces a MDN, web.dev, javascript.info

CTA: ¿Listo para el siguiente módulo?
  Botón que enlaza al siguiente HTML
```

---

## 📚 Bloques del curso

### Bloque I — HTML (M00-M14, 15 módulos)

Estructura del documento, semántica, texto, listas, imágenes, tablas, formularios, accesibilidad, metadatos, APIs nativas. Cierra con un proyecto web completo que pasa W3C Validator y Lighthouse ≥90 en a11y.

**Tiempo estimado total:** ~10-15 horas de lectura activa.

### Bloque II — CSS (M15-M27, 13 módulos)

Cascada y especificidad, modelo de caja, flujo y posicionamiento, Flexbox, Grid, diseño responsivo, colores, tipografía, transiciones, transformaciones, variables/pseudo-clases. Cierra con un proyecto que refactoriza el del bloque HTML aplicando BEM, @layer, container queries y tema claro/oscuro.

**Tiempo estimado total:** ~10-15 horas de lectura activa.

### Bloque III — JavaScript (M28-M44, 17 módulos)

Variables, tipos, control de flujo, funciones, arrays, objetos/closures, strings/templates, DOM/eventos, errores, async/fetch (con `fakeFetch` mock que modela éxito, 404 y error de red), organización (con ES Modules via blob URL que funciona offline), clases, JSON, localStorage, debugging, proyecto final integrador.

**Tiempo estimado total:** ~15-20 horas de lectura activa.

---

## 🧪 Validación realizada

Todos los HTMLs han sido validados con:

- ✅ **Aserciones de estructura:** `<!DOCTYPE html>` + `lang="es"` en los 45 archivos
- ✅ **Cero scripts externos:** ningún `<script src="http...">` ni CDN
- ✅ **Cero fetch a URLs:** ningún `fetch("http...")` ni `XMLHttpRequest`
- ✅ **JS lint con `node --check`:** 0 errores de sintaxis en los 41 scripts inline
- ✅ **Auditor `audit_offline_tool.py`:** pasa en todos los que no usan playground
- ✅ **Render visual verificado:** M13 (canvas en vivo), M14 (checklist), M36 (calculadora)
- ✅ **`"use strict"`** añadido en los 41 archivos con script
- ✅ **CTAs encadenados:** M00→M01→...→M44 (sin huérfanos)

> **Nota sobre el auditor:** los playgrounds de los módulos CSS/JS usan `postMessage` (captura de console del iframe) y `new Function()` (ejecución del código del alumno). El auditor lo marca como warning, pero es el patrón canónico aprobado y usado por M15/M28 (los templates base). No es un riesgo de seguridad: el código solo viene del propio alumno, no de la red.

---

## 🛠️ Stack técnico

- **HTML5** semántico, accesible (Lighthouse ≥90 a11y en los proyectos finales).
- **CSS3** vanilla con custom properties, Flexbox, Grid, container queries.
- **JavaScript ES2020+** vanilla, sin TypeScript, sin frameworks.
- **Sin bundler:** cada HTML es un fichero independiente.

---

## 📖 Fuentes y referencias

- **MDN Web Docs** — referencia oficial de HTML, CSS, JS.
- **web.dev** — guías modernas de Google (rendimiento, accesibilidad, PWA).
- **javascript.info** — tutorial moderno de JavaScript.
- **css-tricks.com** — trucos y patrones CSS.
- **W3C** (W3C Validator, Schema.org) — validación y datos estructurados.

---

## 🤝 Contribuir

Si encuentras un error tipográfico, un ejemplo que no compila, o un enlace roto:

1. Abre el HTML afectado en un editor de texto.
2. Arregla la línea exacta.
3. Verifica que sigue funcionando con doble clic.
4. Comparte el fix con quien te pasó la carpeta.

Todo el contenido es HTML/CSS/JS plano: cualquier editor de texto sirve (incluso el Bloc de Notas).

---

## 📜 Licencia y atribución

Material didáctico原创 del autor del curso. Diseño visual inspirado en un Design System original referenciado en `DESIGN_SYSTEM_SPEC.md`. Recursos enlazados pertenecen a sus respectivos autores (MDN, web.dev, javascript.info, etc.) y se citan únicamente con fines educativos.

**Última actualización:** 2026-07-05 · **Versión del curso:** 1.0
