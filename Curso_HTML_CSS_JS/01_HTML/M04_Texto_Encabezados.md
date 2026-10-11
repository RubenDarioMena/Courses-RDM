---
module: 4
title: "Texto y encabezados"
block: HTML
estimated_time: "75 min"
prerequisites: "M03 · Estructura semántica del documento"
---

# M04 · Texto y encabezados

## Objetivos de aprendizaje

- Aplicar correctamente la jerarquía de encabezados `<h1>`–`<h6>`.
- Usar párrafos, saltos de línea (`<br>`) y separadores (`<hr>`).
- Aplicar énfasis semántico: `<em>`, `<strong>`, `<mark>`, `<small>`, `<sub>`, `<sup>`.
- Marcar citas con `<blockquote>`, `<q>`, `<cite>`, `<abbr>`, `<time>`, `<address>`.
- Representar código con `<pre>`, `<code>`, `<kbd>`, `<samp>`, `<var>`.

## Temas

- Jerarquía `<h1>`–`<h6>`
- Párrafos `<p>`, `<br>`, `<hr>`
- Énfasis semántico: `<em>`, `<strong>`, `<mark>`, `<small>`, `<sub>`, `<sup>`
- Citas: `<blockquote>`, `<q>`, `<cite>`, `<abbr>`, `<time>`, `<address>`
- Código: `<pre>`, `<code>`, `<kbd>`, `<samp>`, `<var>`

## Ejercicio: Marcar una carta con encabezados, fechas `<time>` y citas

1. **Crea un archivo** `carta.html` con la estructura mínima de documento.
2. **Escribe un `<h1>`** con el asunto de la carta (por ejemplo, "Carta al equipo"). Añade un `<address>` con el remitente (nombre y email inventados).
3. **En el `<body>`**, escribe un párrafo de apertura con `<time datetime="2026-07-05">5 de julio de 2026</time>` indicando la fecha.
4. **Inserta un `<blockquote>`** con una cita célebre atribuida con `<cite>`, y un `<q>` corto en línea dentro de un párrafo usando `<abbr title="...">` para una sigla (por ejemplo "SRL" → "Sociedad de Responsabilidad Limitada").
5. **Añade un bloque de código** rodeado por `<pre><code>` con un fragmento de HTML inventado, una tecla con `<kbd>Ctrl+C</kbd>` y un mensaje de salida `<samp>` simulando una terminal. Verifica visualmente: `<pre>` respeta los espacios, `<cite>` itálica, `<time>` permite a los buscadores entender la fecha.

## Recursos

- [MDN — Encabezados](https://developer.mozilla.org/es/docs/Web/HTML/Element/Heading_Elements) (placeholder)
- [MDN — text formatting](https://developer.mozilla.org/es/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals) (placeholder)
- [MDN — `<time>`](https://developer.mozilla.org/es/docs/Web/HTML/Element/time) (placeholder)