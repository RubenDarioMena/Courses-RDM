---
module: M30
title: "Tipos de datos y operadores"
block: JS
estimated_time: 100 min
prerequisites:
  - "M29 · Variables"
---

# M30 · Tipos de datos y operadores

## Objetivos de aprendizaje

- Identificar los tipos primitivos de JavaScript.
- Usar operadores aritméticos, de comparación y lógicos.
- Distinguir `==` (coerción) de `===` (estricta).
- Aplicar operadores modernos: `??`, `?.`, `...`.
- Comprender la conversión de tipos (coerción) implícita vs explícita.

## Temas

- Primitivos: String, Number, Boolean, null, undefined, Symbol, BigInt
- Operadores: aritméticos, asignación, comparación (`==` vs `===`), lógicos
- Modernos: `??`, `?.`, `...`
- Conversión de tipos (coerción) implícita vs explícita
- `typeof`

## Ejercicio: Comparar `==` vs `===` y convertir tipos

1. Declara variables `a = "5"` y `b = 5`; compara con `==` y con `===` y anota las diferencias.
2. Usa `typeof` sobre `null`, `undefined`, `NaN`, una función y un array; observa los resultados sorprendentes.
3. Convierte explícitamente un string numérico a `Number` y un número a `String` con `String()`/`Number()`.
4. Prueba `??` (nullish): `null ?? "default"` vs `0 ?? "default"` y compáralo con `||`.
5. Usa `?.` para acceder a una propiedad profunda de un objeto que puede ser `null` sin que se lance error.

## Recursos

- [MDN: Data types](https://developer.mozilla.org/es/docs/Web/JavaScript/Data_structures) *(placeholder)*
- [MDN: Operadores](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators) *(placeholder)*
- [javascript.info: Types](https://javascript.info/types) *(placeholder)*
- [javascript.info: Nullish coalescing](https://javascript.info/nullish-coalescing-operator) *(placeholder)*