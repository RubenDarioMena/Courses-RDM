---
module: 2
title: "Sintaxis y elementos"
block: HTML
estimated_time: "60 min"
prerequisites: "M01 · Tu primera página HTML"
---

# M02 · Sintaxis y elementos

## Objetivos de aprendizaje

- Identificar la estructura de un elemento HTML: etiqueta de apertura, etiqueta de cierre, contenido y atributos.
- Distinguir elementos de bloque de elementos en línea (content categories).
- Reconocer y usar elementos void (sin cierre) como `<img>`, `<br>`, `<hr>`, `<input>`.
- Escribir comentarios y entidades HTML correctamente (`&lt;`, `&amp;`, `&nbsp;`).
- Anidar elementos correctamente respetando las reglas semánticas.

## Temas

- Estructura de un elemento: etiqueta apertura/cierre, atributos, anidamiento
- Elementos de bloque vs. en línea (content categories)
- Void elements: `<img>`, `<br>`, `<hr>`, `<input>`
- Comentarios `<!-- -->` y entidades (`&lt;`, `&amp;`, `&nbsp;`)

## Ejercicio: Marcar un párrafo con `<em>`, `<strong>`, `<cite>`

1. **Crea un archivo nuevo** llamado `sintaxis.html` con la estructura mínima (`<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`).
2. **Escribe un párrafo** (`<p>`) sobre tu libro favorito. Dentro del párrafo:
   - Usa `<cite>` para el título del libro.
   - Usa `<em>` para énfasis en una palabra clave.
   - Usa `<strong>` para resaltar el nombre del autor.
   ```html
   <p>Mi libro favorito es <cite>El Principito</cite>
     de <strong>Antoine de Saint-Exupéry</strong>,
     porque nos recuerda que <em>lo esencial es invisible a los ojos</em>.</p>
   ```
3. **Añade un comentario HTML** antes del párrafo explicando de qué trata:
   ```html
   <!-- Este párrafo muestra el uso de em, strong y cite -->
   ```
4. **Agrega una línea separadora** (`<hr>`) y debajo un párrafo con la entidad `&amp;` y `&nbsp;`:
   ```html
   <p>Arte &amp; Ciencia&nbsp;&nbsp;(con dos espacios)</p>
   ```
5. **Guarda el archivo** y ábrelo en el navegador. Verifica: `<cite>` en cursiva, `<strong>` en negrita, `<em>` en cursiva, `&amp;` mostrando "&" y los dos espacios representados por `&nbsp;`.

## Recursos

- [MDN — Elementos HTML](https://developer.mozilla.org/es/docs/Web/HTML/Element) (placeholder)
- [MDN — Contenido de bloque vs en línea](https://developer.mozilla.org/es/docs/Web/HTML/Block-level_elements) (placeholder)
- [MDN — Entidades HTML](https://developer.mozilla.org/es/docs/Glossary/Entity) (placeholder)