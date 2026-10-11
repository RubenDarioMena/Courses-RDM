---
module: M37
title: "Manejo de errores"
block: JS
estimated_time: 90 min
prerequisites:
  - "M36 · DOM y eventos"
---

# M37 · Manejo de errores

## Objetivos de aprendizaje

- Usar `try...catch...finally` para capturar excepciones.
- Identificar tipos nativos de error y lanzar errores con `throw`.
- Reconocer errores asíncronos (intro a promesas rechazadas).
- Leer un stack trace y trazarlo hacia M43.
- Aplicar estrategias: validación temprana y no capturar sin manejar.

## Temas

- `try...catch...finally`, objeto `Error`
- Tipos nativos: `TypeError`, `RangeError`, `SyntaxError`
- `throw new Error(...)`
- Errores asíncronos (intro a promesas rechazadas)
- Lectura de stack trace (progresión hacia M43)
- Estrategias: validación temprana, no capturar sin manejar

## Ejercicio: Función que divide con validación de cero + `parsearEdad()`

1. Escribe `dividir(a, b)` que lance `throw new RangeError("División por cero")` si `b === 0`; llama a la función dentro de un `try...catch` y muestra el mensaje.
2. Añade un bloque `finally` que imprima "Operación finalizada" se produzca o no el error.
3. Implementa `parsearEdad(input)` que lance `TypeError` si el argumento no es string y `SyntaxError` si no es numérico tras `parseInt`.
4. Provoca intencionadamente un `TypeError` accediendo a `null.foo` dentro de un `try...catch` y analiza el stack trace en la consola.
5. Discute por qué un `catch` vacío `catch(e) {}` es mala práctica y refactorízalo para re-lanzar o para mostrar un mensaje al usuario en el DOM.

## Recursos

- [MDN: try...catch](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/try...catch) *(placeholder)*
- [MDN: Error](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Error) *(placeholder)*
- [javascript.info: Error handling](https://javascript.info/try-catch) *(placeholder)*
- [MDN: throw](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/throw) *(placeholder)*