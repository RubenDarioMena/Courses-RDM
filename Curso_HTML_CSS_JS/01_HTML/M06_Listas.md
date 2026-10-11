---
module: 6
title: "Listas"
block: HTML
estimated_time: "45 min"
prerequisites: "M05 · Enlaces y navegación"
---

# M06 · Listas

## Objetivos de aprendizaje

- Crear listas no ordenadas (`<ul>`) y ordenadas (`<ol>`) correctamente.
- Conocer los atributos `<ol>`: `start`, `reversed`, `type`.
- Usar listas de definición (`<dl>`, `<dt>`, `<dd>`).
- Anidar listas correctamente respetando la semántica.

## Temas

- `<ul>`, `<ol>` (`start`, `reversed`, `type`), `<li>`
- `<dl>`, `<dt>`, `<dd>` (listas de definición)
- Anidamiento

## Ejercicio: Receta con ingredientes (`<ul>`) y pasos (`<ol>` anidada)

1. **Crea un archivo** `receta.html` con la estructura mínima del documento.
2. **En el `<body>`**, añade un `<h1>` con el nombre de la receta (por ejemplo, "Tortilla de patatas") y un párrafo introductorio.
3. **Crea una sección "Ingredientes"** con un `<h2>` seguido de un `<ul>` con 5 `<li>` (patatas, huevos, aceite, sal, cebolla opcional).
4. **Crea una sección "Pasos"** con un `<h2>` seguido de un `<ol>` con 4 pasos. Dentro del paso 3 ("Cuajar la tortilla"), anida un `<ul>` con 2 sub-passos: "Dar la vuelta con un plato" y "Cocer 3 minutos por el otro lado".
5. **Añade una sección "Equipo necesario"** usando una lista de definición `<dl>`: 3 entradas con `<dt>` (sartén, espátula, plato) y `<dd>` describiendo cada una. Abre el archivo y comprueba: viñetas en `<ul>`, numeración automática en `<ol>` y formato de diccionario en `<dl>`.

## Recursos

- [MDN — Listas HTML](https://developer.mozilla.org/es/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals#listas) (placeholder)
- [MDN — `<dl>`](https://developer.mozilla.org/es/docs/Web/HTML/Element/dl) (placeholder)
- [web.dev — Lists](https://web.dev/learn/html/lists) (placeholder)