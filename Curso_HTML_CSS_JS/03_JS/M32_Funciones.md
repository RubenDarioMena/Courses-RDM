---
module: M32
title: "Funciones"
block: JS
estimated_time: 100 min
prerequisites:
  - "M31 · Flujo de control"
---

# M32 · Funciones

## Objetivos de aprendizaje

- Distinguir declaración de función de expresión de función.
- Escribir arrow functions con retorno implícito.
- Usar parámetros por defecto y rest (`...args`).
- Entender las funciones de orden superior (callbacks).

## Temas

- Declaración vs expresión de función
- Arrow functions: `() => {}`, retorno implícito, sin `this`
- Parámetros: valores por defecto, rest (`...args`)
- Funciones de orden superior (callbacks) — introducción

## Ejercicio: Función que recibe un callback (duplicar, triplicar)

1. Escribe `function aplicar(arr, fn)` que devuelva un nuevo array aplicando `fn` a cada elemento con un bucle `for`.
2. Define `duplicar = x => x * 2` y `triplicar = x => x * 3` como arrow functions.
3. Llama `aplicar([1,2,3], duplicar)` y `aplicar([1,2,3], triplicar)` y muestra los resultados.
4. Añade un parámetro por defecto: `function saludar(nombre = "invitado")` y pruébalo sin argumento.
5. Implementa `sumarTodo(...nums)` con rest y úsala con `sumarTodo(1,2,3,4,5)`.

## Recursos

- [MDN: Functions](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Functions) *(placeholder)*
- [MDN: Arrow functions](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions/Arrow_functions) *(placeholder)*
- [javascript.info: Functions](https://javascript.info/function-basics) *(placeholder)*
- [javascript.info: Arrow functions](https://javascript.info/arrow-functions-basics) *(placeholder)*