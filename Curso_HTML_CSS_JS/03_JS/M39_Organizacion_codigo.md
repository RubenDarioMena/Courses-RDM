---
module: M39
title: "Organización de código: namespaces y ES Modules"
block: JS
estimated_time: 120 min
prerequisites:
  - "M38 · Async JS: promesas, async/await y fetch"
---

# M39 · Organización de código: namespaces y ES Modules

## Objetivos de aprendizaje

- Entender el problema de las variables globales en un único `<script>` grande.
- Organizar código con namespaces por objeto literal.
- Aislar privados con IIFE y el revealing module pattern.
- Demostrar ES Modules funcionales vía blob URL (offline, `file://`).
- Conocer CommonJS vs ESM y bundlers (lectura teórica).

## Temas

- El problema de variables globales en un único `<script>` grande
- Namespacing por objeto literal: `const App = { state: {}, init() {} }`
- IIFE y revealing module pattern (closures para privados)
- **Demo funcional ESM via blob:** `<script type="module">` con `import`/`export` vía `URL.createObjectURL(blob)` — funciona offline en `file://`
- `import()` dinámico funcional (también via blob)
- CommonJS vs ESM y bundlers (Vite, esbuild) — lectura teórica

## Ejercicio: Reorganizar monolito + ESM vía blob URL

> Ambos ejercicios funcionan offline en `file://` usando blob URLs.

1. Toma un `<script>` monolítico de 60 líneas con variables sueltas y reorganízalo en un namespace `const App = { estado: {}, init() {}, render() {} }` envuelto en una IIFE que exponga solo lo público (revealing module pattern).
2. Convierte parte de la lógica en un módulo ESM: escribe `export function suma(a, b) { return a + b; }` dentro de un Blob y crea su URL con `URL.createObjectURL(new Blob([codigo], { type: 'application/javascript' }))`.
3. En un `<script type="module">`, haz `import { suma } from './modulo'` apuntando a la blob URL y comprueba que `suma(2, 3)` devuelve 5 sin red ni servidor.
4. Prueba `import()` dinámico sobre otra blob URL con un módulo que exporte `default` y muéstralo en el DOM.
5. Caja teórica: compara mentalmente este flujo con el trabajo real de un bundler como Vite/esbuild y con `require()` de CommonJS en Node.

## Recursos

- [MDN: ES Modules](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Modules) *(placeholder)*
- [MDN: URL.createObjectURL](https://developer.mozilla.org/es/docs/Web/API/URL/createObjectURL) *(placeholder)*
- [javascript.info: Modules](https://javascript.info/modules) *(placeholder)*
- [MDN: IIFE](https://developer.mozilla.org/es/docs/Glossary/IIFE) *(placeholder)*