---
module: M43
title: "Buenas prácticas y debugging"
block: JS
estimated_time: 90 min
prerequisites:
  - "M42 · localStorage"
---

# M43 · Buenas prácticas y debugging

## Objetivos de aprendizaje

- Aplicar estilo de código y usar linters (ESLint) y formateadores (Prettier).
- Usar el debugger con breakpoints, `debugger`, step over/into/out.
- Domruar `console` avanzado: `console.table`, `console.group`, `console.time`.
- Entender `"use strict"` y su efecto.
- Leer stack traces y reproducir bugs mínimos.

## Temas

- Estilo de código, linters (ESLint), formateadores (Prettier)
- Debugger: breakpoints, `debugger`, step over/into/out
- `console` avanzado: `console.table`, `console.group`, `console.time`
- `"use strict"`
- Estrategias: leer stack trace, reproducir bugs mínimos

## Ejercicio: `console.table` con array de objetos + breakpoint para encontrar bug

1. Crea un array de objetos `usuarios` con `{nombre, edad}` y muéstralo con `console.table(usuarios)` para visualizarlo en tabla.
2. Agrupa mensajes relacionados con `console.group('Carga de datos')` / `console.groupEnd()` y mide tiempos con `console.time('parse')` / `console.timeEnd('parse')`.
3. Introduce un bug intencionado (p. ej. leer de un array vacío y sumar `undefined`); pon una palabra `debugger;` y abre DevTools en Sources para pausar la ejecución.
4. Recorre step over y step into hasta localizar la línea exacta del bug; inspecciona las variables en el panel Scope.
5. Lee el stack trace que se produce al lanzar el error; compara la trama superior (la causante) con las anteriores y discute cómo este hábito te prepara para bugs más complejos.

## Recursos

- [MDN: debugger](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/debugger) *(placeholder)*
- [MDN: Console](https://developer.mozilla.org/es/docs/Web/API/console) *(placeholder)*
- [javascript.info: Debugging in browser](https://javascript.info/debugging-chrome) *(placeholder)*
- [ESLint](https://eslint.org/) *(placeholder)*
- [Prettier](https://prettier.io/) *(placeholder)*