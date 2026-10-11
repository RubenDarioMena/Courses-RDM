---
module: 14
title: "Buenas prácticas HTML y proyecto final del bloque"
block: HTML
estimated_time: "120 min"
prerequisites: "M13 · APIs HTML5 (introducción)"
---

# M14 · Buenas prácticas HTML y proyecto final del bloque

## Objetivos de aprendizaje

- Validar HTML con el validador W3C (validator.w3.org).
- Aplicar la separación de capas: estructura (HTML), estilo (CSS), comportamiento (JS).
- Usar `defer` en todos los `<script>` y `loading="lazy"` en imágenes no críticas.
- Revisar páginas con DevTools: Inspector, pestaña Accesibilidad y pestaña Red (conceptual).
- Integrar todo lo aprendido en un proyecto final del bloque HTML.

## Temas

- W3C Validator (validator.w3.org)
- Separación de capas: HTML semántico, CSS estilo, JS comportamiento
- `defer` para scripts, `loading="lazy"` para imágenes
- DevTools: Inspector, pestaña Accesibilidad, pestaña Red (conceptual)

## Proyecto final del bloque HTML

Construir una **página web completa** (tema: portfolio personal o negocio local) que cumpla los siguientes requisitos:

1. **Estructura semántica completa**: `<header>` con `<nav>`, `<main>` con al menos 2 `<section>` y 1 `<aside>`, `<footer>` con datos de contacto (`<address>`). Usa `<article>` para entradas de contenido. Añade un `<h1>` único y una jerarquía `<h2>`–`<h3>` correcta.
2. **Imágenes accesibles**: al menos 3 `<img>` con `alt` informativo, `width`/`height` explícitos y `loading="lazy"`. Usa `<figure>` + `<figcaption>` en al menos una.
3. **Tabla de productos/servicios**: un `<table>` con `<caption>`, `<thead>`, `<tbody>`, `<tfoot>`, `<th scope>` y un `<td colspan>` o `rowspan`.
4. **Formulario de contacto**: `<form>` con `<label>` asociado a cada campo, tipos variados (`text`, `email`, `tel`, `<select>`, `<textarea>`), `<fieldset>`/`<legend>` y validación nativa (`required`, `pattern`, `minlength`). Incluye un `<button type="submit">`.
5. **Metadatos SEO y social**: `<title>`, `<meta name="description">`, Open Graph completo (`og:title`, `og:description`, `og:image`), Twitter Card, `<link rel="canonical">`, JSON-LD con `@type` adecuado (p.ej. `LocalBusiness` o `Person`), favicon y `<meta name="theme-color" content="#A78BFA">`.

### Verificación final

- [ ] Pasa el validador W3C sin errores (https://validator.w3.org/).
- [ ] Lighthouse Accessibility ≥ 90.
- [ ] Todas las imágenes llevan `alt` (decorativa → vacío, informativa → descriptivo).
- [ ] Todos los `<script>` llevan `defer`.
- [ ] Todos los `<img>` no críticos llevan `loading="lazy"`.

> **Nota:** Las imágenes responsivas con `srcset`/`<picture>` se añaden en el proyecto CSS (M27), tras M21.

## Recursos

- [W3C Markup Validator](https://validator.w3.org/) (placeholder)
- [MDN — HTML best practices](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Writing_style_guide) (placeholder)
- [web.dev — Measure (Lighthouse)](https://web.dev/measure) (placeholder)