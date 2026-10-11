---
module: M28
title: "¿Qué es JavaScript y dónde se ejecuta?"
block: JS
estimated_time: 90 min
prerequisites:
  - "M00–M14 (HTML)"
  - "M15–M27 (CSS)"
---

# M28 · ¿Qué es JavaScript y dónde se ejecuta?

## Objetivos de aprendizaje

- Comprender qué es JavaScript y por qué es el lenguaje de la web.
- Diferenciar dónde se ejecuta JS (navegador vs Node.js).
- Identificar la especificación ECMAScript y el proceso TC39.
- Escribir y ejecutar primer código JS en la consola del navegador.

## Temas

- Lenguaje interpretado, JIT compilado, funciones de primera clase
- Navegador vs Node.js
- ECMAScript (ECMA-262), TC39 (Stages 0–4)
- `alert()`, `console.log()`, DevTools
- Tu primer momento JS: ejecutar código en la consola

## Ejercicio: "¡Hola, Mundo!" con `alert()` y `console.log()`

1. Abre DevTools (F12 o Cmd+Opt+I) y ve a la pestaña **Console**.
2. Escribe `console.log("¡Hola, Mundo!")` y pulsa Enter; observa la salida en consola.
3. Ahora escribe `alert("¡Hola, Mundo!")` y pulsa Enter; observa la ventana modal.
4. Crea un archivo `index.html` con un `<script>` embebido que ejecute ambas instrucciones al cargar la página.
5. Recarga el navegador y verifica que la consola muestra el mensaje antes de que el `alert` bloquee la pestaña.

## Recursos

- [MDN: JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript) *(placeholder — verificar URL)*
- [javascript.info: Introduction](https://javascript.info/intro) *(placeholder)*
- [TC39 Process](https://tc39.es/process-documentation/) *(placeholder)*
- [MDN: Console API](https://developer.mozilla.org/es/docs/Web/API/console) *(placeholder)*