---
module: 8
title: "Tablas"
block: HTML
estimated_time: "60 min"
prerequisites: "M07 · Imágenes y multimedia"
---

# M08 · Tablas

## Objetivos de aprendizaje

- Estructurar una tabla semántica con `<table>`, `<tr>`, `<td>`, `<th>`.
- Agrupar filas con `<thead>`, `<tbody>`, `<tfoot>` y añadir un título con `<caption>`.
- Usar `scope` (row/col) correctamente para encabezados accesibles.
- Aplicar `colspan` y `rowspan` para combinar celdas.
- Reconocer cuándo NO usar tablas (para layout — es un antipatrón).

## Temas

- `<table>`, `<tr>`, `<td>`, `<th>`
- `<thead>`, `<tbody>`, `<tfoot>`, `<caption>`
- `scope`, `colspan`, `rowspan`
- Cuándo NO usar tablas (layout)

## Ejercicio: Tabla de planetas con caption, thead, scope y colspan

1. **Crea un archivo** `planetas.html` con la estructura mínima del documento.
2. **Añade un `<table>`** con un `<caption>` descriptivo: "Datos comparativos de los planetas del Sistema Solar".
3. **Dentro del `<table>`**, estructura con `<thead>`, `<tbody>` y `<tfoot>`. El `<thead>` lleva una fila (`<tr>`) con los encabezados: "Planeta", "Diámetro (km)", "Distancia al Sol (UA)"; cada `<th>` debe llevar `scope="col"`.
4. **En el `<tbody>`** añade 3 filas (Mercurio, Venus, Tierra) con sus datos aproximados. En la última fila del `<tbody>`, combina la primera y segunda columna usando `colspan="2"` para indicar "Planeta rocoso" ocupando ambas columnas (o usa `rowspan` para agrupar categorías).
5. **En el `<tfoot>`** añade una fila de totales o resumen (por ejemplo, "3 planetas rocosos") con `<th scope="row">` y `<td>`. Verifica: el caption aparece centrado sobre la tabla, los encabezados de columna son reconocidos por lectores de pantalla gracias a `scope`, y `colspan` combina las celdas correctamente.

## Recursos

- [MDN — Tablas HTML](https://developer.mozilla.org/es/docs/Learn/HTML/Tables) (placeholder)
- [MDN — `<th scope>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th) (placeholder)
- [web.dev — Tables](https://web.dev/learn/html/tables) (placeholder)