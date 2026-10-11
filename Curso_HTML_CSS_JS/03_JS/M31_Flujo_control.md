---
module: M31
title: "Flujo de control"
block: JS
estimated_time: 100 min
prerequisites:
  - "M30 · Tipos de datos y operadores"
---

# M31 · Flujo de control

## Objetivos de aprendizaje

- Escribir condicionales con `if...else` y el operador ternario.
- Usar `switch` con comparación estricta.
- Iterar con `for`, `while`, `do...while`.
- Diferenciar `for...of` (iterables) de `for...in` (objetos).
- Controlar bucles con `break` y `continue`.

## Temas

- `if...else`, operador ternario
- `switch` (comparación estricta)
- Bucles: `for`, `while`, `do...while`
- `for...of` (arrays, strings) vs `for...in` (objetos)
- `break`, `continue`

## Ejercicio: Calculadora con `switch` + filtrar palabras con `for...of`

1. Escribe una función `calcular(a, op, b)` que use un `switch` con `+`, `-`, `*`, `/` y devuelva el resultado.
2. Añade un caso `default` que lance un `Error` con mensaje "Operación no válida".
3. Dado un array `palabras = ["sol", "luna", "estrella", "mar"]`, usa `for...of` para imprimir solo las palabras con más de 3 letras.
4. Sustituye el `for...of` por un `while` que use `continue` para saltar las palabras ≤ 3 letras.
5. Comprueba con `console.log` que `for...in` sobre un array itera índices (strings), no valores — y discute por qué no se recomienda.

## Recursos

- [MDN: if...else](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/if...else) *(placeholder)*
- [MDN: switch](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/switch) *(placeholder)*
- [javascript.info: Loops](https://javascript.info/while-for) *(placeholder)*
- [MDN: for...of](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/for...of) *(placeholder)*