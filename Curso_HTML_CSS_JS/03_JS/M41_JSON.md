---
module: M41
title: "JSON"
block: JS
estimated_time: 90 min
prerequisites:
  - "M40 · Clases y POO básica"
---

# M41 · JSON

## Objetivos de aprendizaje

- Leer y escribir sintaxis JSON válida.
- Serializar con `JSON.stringify()` usando spaces, replacer y `toJSON`.
- Deserializar con `JSON.parse()` usando reviver.
- Entender los usos: intercambio con APIs (simulado), configuración, localStorage.
- Conocer las limitaciones de JSON (undefined, Date, Map/Set).

## Temas

- Sintaxis: objetos, arrays, strings, números, booleanos, `null`
- `JSON.stringify()` (spaces, replacer, toJSON)
- `JSON.parse()` (reviver)
- Intercambio con APIs (concepto; en este curso se simula con JSON embebido), configuración, localStorage
- Limitaciones (undefined, Date, Map/Set)

## Ejercicio: Serializar productos a JSON, recuperar, mostrar en tabla

1. Crea un array `productos` con 3 objetos `{nombre, precio, stock}` y serialízalo con `JSON.stringify(productos, null, 2)` para imprimirlo formateado.
2. Añade un replacer que excluya la propiedad `stock` y comprueba la salida resultante.
3. Deserializa la cadena con `JSON.parse()` e itera el resultado para mostrarlo en una tabla HTML generada con DOM (M36).
4. Implementa un `reviver` que transforme fechas en formato ISO a objetos `Date` al parsear una cadena JSON con un campo `fecha`.
5. Demuestra las limitaciones: serializa un objeto con `undefined`, una `Date` y un `Map` y analiza qué se pierde o se convierte (Date→string, Map→{}).

## Recursos

- [MDN: JSON](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/JSON) *(placeholder)*
- [MDN: JSON.stringify](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) *(placeholder)*
- [MDN: JSON.parse](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) *(placeholder)*
- [javascript.info: JSON](https://javascript.info/json) *(placeholder)*