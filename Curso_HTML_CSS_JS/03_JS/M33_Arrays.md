---
module: M33
title: "Arrays"
block: JS
estimated_time: 120 min
prerequisites:
  - "M32 · Funciones"
---

# M33 · Arrays

## Objetivos de aprendizaje

- Crear arrays y acceder a sus elementos (incluido `.at(-1)`).
- Mutar arrays con `push`, `pop`, `shift`, `unshift`, `splice`, `sort`.
- Iterar y transformar con `forEach`, `map`, `filter`, `find`, `some`, `every`, `includes`.
- Reducir un array con `reduce` y `reduceRight`.
- Desestructurar arrays y aplicar el operador spread.

## Temas

- Creación, `.length`, `.at(-1)`
- Mutación: `push`, `pop`, `shift`, `unshift`, `splice`, `sort`
- Iteración: `forEach`, `map`, `filter`, `find`, `some`, `every`, `includes`
- `reduce` y `reduceRight`
- Desestructuración + spread

## Ejercicio: Media de impares con `filter`+`reduce` + productos con IVA con `map`

1. Dado `nums = [1,2,3,4,5,6,7,8,9,10]`, usa `filter` para quedarte solo con los impares.
2. Encadena un `reduce` para sumar los impares y divide entre el `.length` para obtener la media.
3. Dado `productos = [{nombre:"Pan", precio:1.5}, {nombre:"Café", precio:3}]`, usa `map` para devolver objetos con IVA (21%) añadido.
4. Usa desestructuración: `const [primero, ...resto] = nums` y muestra ambos.
5. Usa spread para combinar dos arrays `[...a, ...b]` y verifica que no muta los originales.

## Recursos

- [MDN: Array](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array) *(placeholder)*
- [javascript.info: Array methods](https://javascript.info/array-methods) *(placeholder)*
- [MDN: reduce](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) *(placeholder)*
- [javascript.info: Destructuring](https://javascript.info/destructuring-assignment) *(placeholder)*