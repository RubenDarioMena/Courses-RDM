---
module: M29
title: "Variables: let, const y var"
block: JS
estimated_time: 90 min
prerequisites:
  - "M28 · ¿Qué es JavaScript?"
---

# M29 · Variables: let, const y var

## Objetivos de aprendizaje

- Declarar variables con `var`, `let` y `const` y entender sus diferencias.
- Aplicar reglas de nombrado y la convención camelCase.
- Comprender el alcance (scope) y el hoisting con la zona muerta temporal (TDZ).
- Adoptar la buena práctica de `const` por defecto.

## Temas

- `var` (legacy, función-scoped), `let` (bloque-scoped), `const` (no reasignable)
- Reglas de nombrado, camelCase
- Scope: global, función, bloque
- Hoisting y zona muerta temporal (TDZ)
- Buenas prácticas: `const` por defecto

## Ejercicio: Variables para un perfil de usuario

1. Declara con `const` un objeto `usuario` con campos `nombre`, `edad` y `activo`.
2. Intenta reasignar la constante `usuario` y observa el `TypeError` en la consola.
3. Declara con `let` una variable `edadNueva` y reasígnala sumando 1 año.
4. Demuestra hoisting: llama a una función declarada más abajo (funciona) y usa una variable `let` antes de su declaración (error TDZ).
5. Escribe un bloque `{ }` interno con una variable `let` del mismo nombre y verifica que no filtra al exterior (block scope).

## Recursos

- [MDN: let](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/let) *(placeholder)*
- [MDN: const](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/const) *(placeholder)*
- [javascript.info: Variables](https://javascript.info/variables) *(placeholder)*
- [MDN: Grammar and types](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Grammar_and_types) *(placeholder)*