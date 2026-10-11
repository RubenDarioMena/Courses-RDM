---
module: 3
title: "Estructura semántica del documento"
block: HTML
estimated_time: "75 min"
prerequisites: "M02 · Sintaxis y elementos"
---

# M03 · Estructura semántica del documento

## Objetivos de aprendizaje

- Identificar y usar los elementos semánticos de sección: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`.
- Decidir correctamente cuándo usar `<div>`, `<section>` o `<article>`.
- Enlazar archivos CSS externos con `<link>` y JS con `<script>` usando `defer`.
- Comprender el beneficio del atributo `defer` para el rendimiento.

## Temas

- `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`
- `<div>` vs `<section>` vs `<article>` — cuándo usar cada uno
- Enlaces a CSS (`<link>`) y JS (`<script>` con `defer`)

## Ejercicio: Estructurar un blog con header, nav, main, 2 articles y footer

1. **Crea un archivo** `blog.html` con la estructura mínima del documento (`<!DOCTYPE html>`, `<html lang="es">`, `<head>` con `charset` y `viewport`).
2. **Añade el `<header>`** con un `<h1>` que sea el título del blog, y dentro una barra de navegación `<nav>` con 3 enlaces (`<a href="#">`): "Inicio", "Artículos", "Contacto".
3. **Inserta un `<main>`** que contenga dos elementos `<article>`. Cada `<article>` debe llevar un `<h2>` con el título del post, un `<p>` con el contenido y un `<footer>` con la fecha (texto plano por ahora).
4. **Añade un `<aside>`** con una lista (`<ul>`) de 3 enlaces recomendados (pueden ser `#`).
5. **Cierra el documento con un `<footer>`** global que incluya un párrafo con tu nombre y el año. Enlaza un CSS ficticio y un JS ficticio con `defer`:
   ```html
   <link rel="stylesheet" href="styles.css">
   <script src="script.js" defer></script>
   ```
   Verifica que el navegador renderiza la estructura y que DevTools muestra el árbol semántico correctamente.

## Recursos

- [MDN — Estructura y layout con HTML](https://developer.mozilla.org/es/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure) (placeholder)
- [web.dev — Semantic HTML](https://web.dev/learn/html/semantic-html) (placeholder)
- [MDN — script defer](https://developer.mozilla.org/es/docs/Web/HTML/Element/script) (placeholder)