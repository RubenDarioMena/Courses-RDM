---
module: M35
title: "Strings y template literals"
block: JS
estimated_time: 90 min
prerequisites:
  - "M34 · Objetos y closures"
---

# M35 · Strings y template literals

## Objetivos de aprendizaje

- Comprender la inmutabilidad de los strings y acceder por índice.
- Usar métodos comunes: `slice`, `indexOf`, `includes`, `replace`, `trim`, `split`.
- Construir cadenas con template literals y multi-línea.
- Manejar caracteres especiales.
- Conocer las tagged templates (intro).

## Temas

- Inmutabilidad, `.length`, indexación
- Métodos: `slice`, `indexOf`, `includes`, `startsWith`, `replace`, `trim`, `split`
- Template literals: `` `${}` ``, multi-línea
- Caracteres especiales: `\n`, `\t`, `\uXXXX`
- Tagged templates (intro)

## Ejercicio: Plantilla de email con template literals

1. Define variables `destinatario`, `asunto`, `cuerpo` y construye un email multi-línea con template literals.
2. Usa métodos de string: `trim()` para limpiar espacios, `split("\n")` para dividir en líneas, y `includes("urgente")` para detectar palabras clave.
3. Sustituye una palabra con `replace("señor", "estimado")` y muestra el resultado.
4. Convierte una cadena a mayúsculas y cuenta sus letras con `.length`.
5. Demuestra inmutabilidad: aplica `toUpperCase()` y comprueba que el string original no cambia.

## Recursos

- [MDN: String](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String) *(placeholder)*
- [javascript.info: String methods](https://javascript.info/string-methods) *(placeholder)*
- [MDN: Template literals](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Template_literals) *(placeholder)*
- [javascript.info: Tagged templates](https://javascript.info/template-strings) *(placeholder)*