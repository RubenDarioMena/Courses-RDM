# Curso HTML + CSS + JavaScript — Temario v2

> **Estructura:** 3 bloques secuenciales. HTML → CSS → JavaScript.
> **Audiencia:** Principiante absoluto, sin experiencia en programación.
> **Formato:** Cada módulo = un archivo HTML autocontenido (vanilla, sin red, sin install).
> **Fuentes:** MDN, web.dev, css-tricks, javascript.info, TC39.
> **Estado:** v2 — refinado via loop adversarial variante 1, 3 ciclos.
> **Build:** v1.0 (2026-07-05) — **45/45 HTMLs construidos y validados.**

## ✅ Estado de construcción

| Bloque | Módulos | HTMLs | Tamaño |
|---|---|---|---|
| I · HTML | M00–M14 (15) | ✅ 15/15 | 426 KB |
| II · CSS | M15–M27 (13) | ✅ 13/13 | 488 KB |
| III · JS | M28–M44 (17) | ✅ 17/17 | 520 KB |
| **Total** | **45** | **✅ 45/45** | **1.43 MB** |

Cada módulo tiene su archivo `.html` listo para abrir con doble clic. Ver `README.md` para detalles de uso y restricciones técnicas.

---

## BLOQUE I — HTML (M00–M14)

### M00 · Bienvenido: ¿ qué es la web y cómo se construye?
- ¿Qué es una página web? Navegador como intérprete
- Las 3 capas: HTML (estructura), CSS (estilo), JS (comportamiento)
- Metáfora visual: "construir una web es como construir una casa"
- Tu primer momento: abre DevTools → Console
- Editar HTML con DevTools live edit (inspector → doble clic → editar texto)
- **Ejercicio:** Escribir "¡Hola Mundo!" en la consola del navegador + editar un `<h1>` live en DevTools
- **Recursos:** MDN, web.dev, freeCodeCamp

### M01 · Tu primera página HTML
- Estructura mínima: `<!DOCTYPE>`, `<html>`, `<head>`, `<body>`
- `charset` UTF-8, `lang="es"`
- `<title>` y `<meta viewport>`
- VS Code o cualquier editor de texto
- **Ejercicio:** Crear `index.html` con "Hola Mundo" y abrirlo en el navegador

### M02 · Sintaxis y elementos
- Estructura de un elemento: etiqueta apertura/cierre, atributos, anidamiento
- Elementos de bloque vs. en línea (content categories)
- Void elements: `<img>`, `<br>`, `<hr>`, `<input>`
- Comentarios `<!-- -->` y entidades (`&lt;`, `&amp;`, `&nbsp;`)
- **Ejercicio:** Marcar un párrafo con `<em>`, `<strong>`, `<cite>`

### M03 · Estructura semántica del documento
- `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`
- `<div>` vs `<section>` vs `<article>` — cuándo usar cada uno
- Enlaces a CSS (`<link>`) y JS (`<script>` con `defer`)
- **Ejercicio:** Estructurar un blog con header, nav, main, 2 articles y footer

### M04 · Texto y encabezados
- Jerarquía `<h1>`–`<h6>`
- Párrafos `<p>`, `<br>`, `<hr>`
- Énfasis semántico: `<em>`, `<strong>`, `<mark>`, `<small>`, `<sub>`, `<sup>`
- Citas: `<blockquote>`, `<q>`, `<cite>`, `<abbr>`, `<time>`, `<address>`
- Código: `<pre>`, `<code>`, `<kbd>`, `<samp>`, `<var>`
- **Ejercicio:** Marcar una carta con encabezados, fechas `<time>` y citas

### M05 · Enlaces y navegación
- `<a href>`, URLs absolutas vs relativas
- Anclas `#id` (navegación interna)
- `target="_blank"`, `rel="noopener noreferrer"`
- `mailto:`, `tel:`, `download`
- **Ejercicio:** Índice de página con enlaces internos y externos seguros

### M06 · Listas
- `<ul>`, `<ol>` (`start`, `reversed`, `type`), `<li>`
- `<dl>`, `<dt>`, `<dd>` (listas de definición)
- Anidamiento
- **Ejercicio:** Receta con ingredientes (`<ul>`) y pasos (`<ol>` anidada)

### M07 · Imágenes y multimedia
- `<img>`: `src`, `alt`, `width`, `height`, `loading="lazy"`
- `<figure>` y `<figcaption>`
- `<video>` y `<audio>`: `controls`, `loop`, `muted`, `<source>` (de video/audio), `<track>`
- Formatos comunes: WebP, PNG, JPEG, SVG
- **Ejercicio:** Página splash con `<video>` de fondo + galería de `<figure>` con `<figcaption>` y `alt` correcto

> **Nota:** Las imágenes responsivas (`srcset`, `sizes`, `<picture>`, `<source>` de imagen) se cubren en **M21 · Diseño responsivo**, donde ya existe contexto de viewport y media queries.

### M08 · Tablas
- `<table>`, `<tr>`, `<td>`, `<th>`
- `<thead>`, `<tbody>`, `<tfoot>`, `<caption>`
- `scope`, `colspan`, `rowspan`
- Cuándo NO usar tablas (layout)
- **Ejercicio:** Tabla de planetas con caption, thead, scope y colspan

### M09 · Formularios (parte 1)
- `<form>`: `action`, `method` (GET/POST)
- Tipos de `<input>`: text, email, password, number, date, checkbox, radio, submit
- `<label>`, `<textarea>`, `<select>`, `<option>`, `<button>`
- Validación nativa: `required`, `pattern`, `min`/`max`, `minlength`/`maxlength`
- `<fieldset>` y `<legend>`
- **Ejercicio:** Formulario de registro con validación nativa

### M10 · Formularios (parte 2) y interactividad sin JS
- Tipos avanzados: `color`, `range`, `file`, `hidden`, `search`, `tel`, `url`
- `<datalist>`, `<output>`, `<progress>`, `<meter>`
- `<details>` y `<summary>` (acordeones nativos)
- `<dialog>` (modal nativo)
- `setCustomValidity` (introducción mínima)
- **Ejercicio:** FAQ con `<details>`/`<summary>` y formulario con `<datalist>`

### M11 · Accesibilidad (a11y)
- HTML semántico como base de a11y
- Roles landmark, `tabindex`, navegación por teclado
- ARIA: `role`, `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-live`
- `alt` correcto: decorativa vs informativa
- Lighthouse + axe
- La pestaña Red de DevTools se cubre de forma conceptual (el curso no usa red real)
- **Ejercicio:** Auditar una página con Lighthouse y corregir 3 problemas

### M12 · Metadatos, SEO y social sharing
- `<title>`, `<meta name="description">`
- Open Graph (`og:title`, `og:description`, `og:image`), Twitter Cards
- `<link rel="canonical">`, `robots`
- JSON-LD / Schema.org (introducción)
- Favicon, `theme-color`, manifest PWA
- **Ejercicio:** Añadir metadatos OG + description a una página

### M13 · APIs HTML5 (introducción)
- `<canvas>`: `getContext('2d')`, dibujo básico (líneas, rectángulos, texto)
- Geolocation, Drag & Drop, Fullscreen, Visibility (visión general conceptual)
- **Ejercicio:** Dibujar en `<canvas>` al hacer clic

> **Nota:** `localStorage`/`sessionStorage` se cubren en **M42 · localStorage** (Bloque III: JS), donde ya se dispone del lenguaje para usar la API.

### M14 · Buenas prácticas HTML y proyecto final del bloque
- W3C Validator (validator.w3.org)
- Separación de capas: HTML semántico, CSS estilo, JS comportamiento
- `defer` para scripts, `loading="lazy"` para imágenes
- DevTools: Inspector, pestaña Accesibilidad, pestaña Red (conceptual)
- **Proyecto:** Página web completa (portfolio o negocio local) con estructura semántica, imágenes con `<img>` (`alt`, `width`/`height`, `loading="lazy"`), tabla de productos, formulario de contacto y metadatos SEO — que pase el validador W3C y Lighthouse a11y ≥ 90

> **Nota:** Las imágenes responsivas con `srcset`/`<picture>` se añaden en el proyecto CSS (M27), tras M21.

---

## BLOQUE II — CSS (M15–M27)

### M15 · ¿Qué es CSS y cómo funciona?
- Lenguaje de presentación, capa de estilo
- Sintaxis: selector + bloque de declaraciones
- Selectores: tipo, clase, ID, universal, atributo
- Combinadores: descendiente, `>`, `+`, `~`
- Cómo incluir CSS: externa, interna, inline
- **Ejercicio:** Aplicar 3 métodos de inclusión CSS y comparar

### M16 · Cascada, especificidad y herencia
- Orden de origen, `!important`, orden de aparición
- Cálculo de especificidad (ID > clase > tipo)
- Herencia: qué se hereda (color, font) y qué no (margin, border)
- `inherit`, `initial`, `revert`, `unset`
- Cascade layers (`@layer`) — introducción
- **Ejercicio:** Predecir cuál regla gana calculando especificidad, verificar con DevTools

### M17 · El modelo de caja
- Content, padding, border, margin
- `box-sizing`: `content-box` vs `border-box`
- Unidades: `px`, `%`, `em`, `rem`, `vw`/`vh`, `ch`
- Shorthands `margin`/`padding`/`border`
- Colapso de márgenes verticales
- `overflow`
- **Ejercicio:** Tarjeta de perfil — inspeccionar box model con DevTools

### M18 · Flujo normal y posicionamiento
- Block vs inline vs inline-block
- `position`: `static`, `relative`, `absolute`, `fixed`, `sticky`
- Contextos de apilamiento (`z-index`)
- `float` (histórico) y `clear`
- **Ejercicio:** Barra de navegación fixed + hero con overlay

### M19 · Flexbox
- Modelo unidimensional
- `display: flex`, `flex-direction`, `justify-content`, `align-items`
- `flex-wrap`, `gap`, `flex-grow`/`shrink`/`basis`
- Alineación de items individuales (`align-self`, `order`)
- **Ejercicio:** Barra de navegación centrada (logo izq, enlaces der) con Flexbox

### M20 · CSS Grid
- Modelo bidimensional
- `display: grid`, `grid-template-columns/rows`, `gap`
- `grid-template-areas`
- `grid-column`/`grid-row`, `subgrid`
- `justify-items`, `align-items`
- **Ejercicio:** Layout "Santo Grial" con Grid y `grid-template-areas`

### M21 · Diseño responsivo
- `<meta viewport>` (repaso desde HTML)
- `@media`: breakpoints, mobile-first
- `vw`/`vh`/`vmin`/`vmax`
- **Imágenes responsivas (introducción):** `srcset`, `sizes`, `<picture>`, `<source>` (de imagen), `object-fit`, `aspect-ratio`
- Tipografía fluida: `clamp()`, `min()`, `max()`
- **Ejercicio:** Tarjeta de producto vertical (móvil) → horizontal (desktop) + imagen que cambia de fuente con `<picture>` (móvil retina vs desktop)

### M22 · Colores y fondos
- Formatos: hex, `rgb()`, `hsl()`, `oklch()`, `color()`
- `color`, `background-color`, `currentColor`
- `background-image`, `-size` (`cover`/`contain`), `-position`, shorthand
- Gradientes: `linear-gradient()`, `radial-gradient()`, `conic-gradient()`
- `border-radius`, `border-image`
- **Ejercicio:** Botón con gradiente + hero section con overlay de gradiente

### M23 · Tipografía
- `font-family`, `font-size`, `font-weight`, `font-style`, shorthand `font`
- `@font-face`, `font-display`
- `line-height`, `letter-spacing`, `word-spacing`
- `text-align`, `text-decoration`, `text-transform`
- `text-wrap: balance`/`pretty` (moderno)
- **Ejercicio:** Jerarquía tipográfica (h1-h6, p, caption) con `rem`

### M24 · Transiciones y animaciones
- `transition-property`, `-duration`, `-timing-function`, `-delay`
- `@keyframes`: `animation-name`, `-duration`, `-iteration-count`, `-direction`
- Curvas: `ease`, `cubic-bezier()`, `steps()`
- Performance: animar `opacity` y `transform` (GPU), evitar `width`/`height`
- `prefers-reduced-motion`
- **Ejercicio:** Botón con hover suave + spinner con `@keyframes`

### M25 · Transformaciones
- 2D: `translate()`, `rotate()`, `scale()`, `skew()`
- 3D: `translate3d()`, `rotateX/Y/Z()`, `perspective`, `transform-style: preserve-3d`
- `transform-origin`
- `will-change`
- **Ejercicio:** Flip card al hover + zoom de imagen con `overflow: hidden`

### M26 · Variables CSS, pseudo-clases y pseudo-elementos
- Custom properties: `--nombre`, `var()`, `:root`, fallback
- Actualización dinámica con JS (`setProperty`)
- Pseudo-clases: `:hover`, `:focus`, `:nth-child()`, `:not()`, `:is()`, `:where()`, `:has()`
- Pseudo-elementos: `::before`, `::after`, `::first-letter`, `::selection`, `::placeholder`
- **Ejercicio:** Toggle claro/oscuro con custom properties + lista con `:nth-child(even)`

### M27 · CSS moderno, arquitectura y proyecto CSS final
- Container queries (`@container`), propiedades lógicas (`margin-inline`)
- CSS Nesting nativo (`&`)
- BEM: `bloque__elemento--modificador`
- `@layer` para arquitectura: reset, base, components, utilities
- Reducir especificidad: `:where()`, preferir clases sobre IDs
- **Proyecto:** Refactorizar el proyecto del bloque HTML con BEM, `@layer`, container queries, tema claro/oscuro con custom properties **y imágenes responsivas con `srcset`/`<picture>`**

---

## BLOQUE III — JavaScript (M28–M44)

### M28 · ¿Qué es JavaScript y dónde se ejecuta?
- Lenguaje interpretado, JIT compilado, funciones de primera clase
- Navegador vs Node.js
- ECMAScript (ECMA-262), TC39 (Stages 0-4)
- `alert()`, `console.log()`, DevTools
- Tu primer momento JS: ejecutar código en la consola
- **Ejercicio:** "¡Hola, Mundo!" con `alert()` y `console.log()`

### M29 · Variables: let, const y var
- `var` (legacy, función-scoped), `let` (bloque-scoped), `const` (no reasignable)
- Reglas de nombrado, camelCase
- Scope: global, función, bloque
- Hoisting y zona muerta temporal (TDZ)
- Buenas prácticas: `const` por defecto
- **Ejercicio:** Variables para un perfil de usuario

### M30 · Tipos de datos y operadores
- Primitivos: String, Number, Boolean, null, undefined, Symbol, BigInt
- Operadores: aritméticos, asignación, comparación (`==` vs `===`), lógicos
- Modernos: `??`, `?.`, `...`
- Conversión de tipos (coerción) implícita vs explícita
- `typeof`
- **Ejercicio:** Comparar `==` vs `===`, convertir tipos

### M31 · Flujo de control
- `if...else`, operador ternario
- `switch` (comparación estricta)
- Bucles: `for`, `while`, `do...while`
- `for...of` (arrays, strings) vs `for...in` (objetos)
- `break`, `continue`
- **Ejercicio:** Calculadora con `switch` + filtrar palabras con `for...of`

### M32 · Funciones
- Declaración vs expresión de función
- Arrow functions: `() => {}`, retorno implícito, sin `this`
- Parámetros: valores por defecto, rest (`...args`)
- Funciones de orden superior (callbacks) — introducción
- **Ejercicio:** Función que recibe un callback (duplicar, triplicar)

### M33 · Arrays
- Creación, `.length`, `.at(-1)`
- Mutación: `push`, `pop`, `shift`, `unshift`, `splice`, `sort`
- Iteración: `forEach`, `map`, `filter`, `find`, `some`, `every`, `includes`
- `reduce` y `reduceRight`
- Desestructuración + spread
- **Ejercicio:** Media de impares con `filter`+`reduce` + productos con IVA con `map`

### M34 · Objetos y closures
- Literales, acceso punto vs corchetes
- Referencia vs copia: `Object.assign`, `{...obj}`, `structuredClone`
- Métodos y `this`, `.bind()/.call()/.apply()` (intro)
- **Closures:** funciones que recuerdan su entorno (contador, factory de funciones)
- Desestructuración: `const {name} = user`, renombrado, anidada
- Propiedades computadas y métodos abreviados
- **Ejercicio:** Objeto "libro" con método + contador con closure + desestructurar respuesta de API

### M35 · Strings y template literals
- Inmutabilidad, `.length`, indexación
- Métodos: `slice`, `indexOf`, `includes`, `startsWith`, `replace`, `trim`, `split`
- Template literals: `` `${}` ``, multi-línea
- Caracteres especiales: `\n`, `\t`, `\uXXXX`
- Tagged templates (intro)
- **Ejercicio:** Plantilla de email con template literals

### M36 · DOM y eventos
- Selección: `getElementById`, `querySelector`, `querySelectorAll`
- Manipulación: `textContent`, `innerHTML`, `classList`, `setAttribute`, `style`
- Creación: `createElement`, `appendChild`, `insertAdjacentHTML`
- Eventos: `addEventListener`, `event`, click/input/submit/keydown/DOMContentLoaded
- Delegación de eventos
- **Ejercicio integrador:** Calculadora interactiva con botones del DOM (integra funciones M32, arrays M33, objetos M34, strings M35, DOM)

### M37 · Manejo de errores
- `try...catch...finally`, objeto `Error`
- Tipos nativos: `TypeError`, `RangeError`, `SyntaxError`
- `throw new Error(...)`
- Errores asíncronos (intro a promesas rechazadas)
- Lectura de stack trace (progesión hacia M43)
- Estrategias: validación temprana, no capturar sin manejar
- **Ejercicio:** Función que divide con validación de cero + `parsearEdad()`

### M38 · Async JS: promesas, async/await y fetch
- Event loop (intro), callback queue vs microtask queue
- Promesas: estados, `new Promise`, `.then()`, `.catch()`, `.finally()`
- `async`/`await`
- `fetch()`: Response, `json()`, `text()`, cabeceras, POST
- `Promise.all`, `Promise.race`, `Promise.allSettled`
- **Restricción no-red:** Se usa un `fakeFetch(url)` que devuelve `Promise.resolve({ ok, json, status, headers })` leyendo JSON embebido en `<script type="application/json">`. El alumno escribe el patrón real `const res = await fetch('/api/users'); const data = await res.json();`. El mock modela **tanto éxito como fallo** (`ok:false`, error de red, timeout) para que `try/catch` e `if(!res.ok)` tengan sentido.
- **En la vida real (caja teórica):** CORS, cabeceras `Authorization`/`Content-Type`, `OPTIONS` preflight, `Response.status` (404/500). Lectura conceptual — el curso usa mock por la restricción sin-red.
- **Ejercicio:** Consumir datos locales (embebidos en JSON) con `fetch` mock + `async/await`, manejar caso de error (`ok:false`)

### M39 · Organización de código: namespaces y ES Modules
- El problema de variables globales en un único `<script>` grande
- Namespacing por objeto literal: `const App = { state: {}, init() {} }`
- IIFE y revealing module pattern (closures para privados)
- **Demo funcional ESM via blob:** `<script type="module">` con `import`/`export` vía `URL.createObjectURL(blob)` — funciona offline en `file://`
- `import()` dinámico funcional (también via blob)
- CommonJS vs ESM y bundlers (Vite, esbuild) — lectura teórica
- **Ejercicio:** (1) Reorganizar un `<script>` monolítico en namespaces con IIFE + objeto `App`. (2) Escribir `export function suma(){}` y `import { suma } from './modulo'` vía blob URL — ambos funcionando offline.

### M40 · Clases y POO básica
- `class`, `constructor`, métodos, getters/setters
- `extends`, `super()`, cadena de prototipos
- `static`, class fields, privados `#field`
- Prototipos (concepto subyacente)
- Clases vs factory functions
- **Ejercicio:** Jerarquía `Animal → Perro/Gato` + `CuentaBancaria` con `#saldo`

### M41 · JSON
- Sintaxis: objetos, arrays, strings, números, booleanos, `null`
- `JSON.stringify()` (spaces, replacer, toJSON)
- `JSON.parse()` (reviver)
- Intercambio con APIs (concepto; en este curso se simula con JSON embebido), configuración, localStorage
- Limitaciones (undefined, Date, Map/Set)
- **Ejercicio:** Serializar productos a JSON, recuperar, mostrar en tabla

### M42 · localStorage
- `localStorage` vs `sessionStorage`
- `setItem`, `getItem`, `removeItem`, `clear`, `key()`
- Combinar con `JSON.stringify`/`parse`
- Evento `storage` (sincronización entre pestañas)
- Límites y seguridad (~5-10 MB, síncrono, no datos sensibles)
- **Ejercicio:** Persistir todo-list + tema claro/oscuro en localStorage

### M43 · Buenas prácticas y debugging
- Estilo de código, linters (ESLint), formateadores (Prettier)
- Debugger: breakpoints, `debugger`, step over/into/out
- `console` avanzado: `console.table`, `console.group`, `console.time`
- `"use strict"`
- Estrategias: leer stack trace, reproducir bugs mínimos
- **Ejercicio:** `console.table` con array de objetos + breakpoint para encontrar bug

### M44 · Proyecto final integrador
Construir una web app completa que integre HTML + CSS + JS:
- Estructura semántica HTML
- Diseño responsivo con CSS (Flexbox/Grid, custom properties, tema claro/oscuro)
- Interactividad JS: DOM, eventos, `fetch` mock (datos locales embebidos)
- Organización del JS en al menos 2 namespaces o 1 module-blob (M39)
- Persistencia con localStorage
- Manejo de errores (incluye `ok:false` del mock)
- Accesibilidad y SEO
- **Opción:** Todo-app avanzada, buscador de películas con API, dashboard de clima, etc.

---

## Resumen

| Bloque | Módulos | Total |
|---|---|---|
| HTML | M00–M14 | 15 |
| CSS | M15–M27 | 13 |
| JS | M28–M44 | 17 |
| **Total** | | **45 módulos** |

## Historial del loop adversarial (variante 1, 3 ciclos)

### Ciclo 1 (Proponent A → Reviewer B)
- P1: `fakeFetch` en M38/M44 (RISKY→APPROVE con ajustes: ok:false, CORS, M41 renaming, M11 Red conceptual)
- P2: Mover imágenes responsivas M07→M21 (BLOCKER→APPROVE tras fix M14+M27+repaso→introducción)
- P3: Reformular M39 ES Modules → namespaces/IIFE + ESM-blob (MAJOR→APPROVE)
- P1 abiertas: mantener 45 módulos, no mover debugging, quitar localStorage de M13
- Bug-hunt: CLEAN. 9 cambios aplicados.

### Ciclo 2 (Proponent B → Reviewer A, role swap)
- P1: Mover closures de M32 a M34 (SAFE → APPROVE)
- P2: Mini-proyecto calculadora como ejercicio integrador de M36 (CAREFUL → APPROVE con ajuste: ejercicio de M36, no fusionar M37)
- P3: Fusionar M00+M01 → 44 módulos (CAREFUL → BLOCKER: renumeración rompe referencias cruzadas. Añadir contenido a M00 en su lugar)
- Bug-hunt: CLEAN. 3 cambios aplicados.

### Ciclo 3 (Proponent A → Reviewer B, role swap)
- Cambios menor: M00 ampliado con DevTools live edit, M37 añade "lectura de stack trace" como progresión hacia M43
- Bug-hunt: CLEAN.