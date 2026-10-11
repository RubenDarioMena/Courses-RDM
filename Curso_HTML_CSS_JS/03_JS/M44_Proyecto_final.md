---
module: M44
title: "Proyecto final integrador"
block: JS
estimated_time: 300 min
prerequisites:
  - "M28–M43 (todo el bloque JS)"
  - "M00–M27 (HTML y CSS)"
---

# M44 · Proyecto final integrador

Construir una web app completa que integre HTML + CSS + JS.

## Objetivos de aprendizaje

- Integrar los tres bloques del curso en una aplicación funcional.
- Aplicar diseño responsivo y tema claro/oscuro con CSS moderno.
- Implementar interactividad JS con DOM, eventos y `fetch` mock.
- Organizar el JS en namespaces o módulos vía blob (M39).
- Persistir datos con localStorage y manejar errores (incluido `ok:false` del mock).

## Temas (requisitos del proyecto)

- Estructura semántica HTML
- Diseño responsivo con CSS (Flexbox/Grid, custom properties, tema claro/oscuro)
- Interactividad JS: DOM, eventos, `fetch` mock (datos locales embebidos)
- Organización del JS en al menos 2 namespaces o 1 module-blob (M39)
- Persistencia con localStorage
- Manejo de errores (incluye `ok:false` del mock)
- Accesibilidad y SEO
- **Opción:** Todo-app avanzada, buscador de películas con API, dashboard de clima, etc.

## Ejercicio: Construir la web app final

1. Elige una opción (todo-app avanzada, buscador de películas simulado, dashboard de clima) y define la estructura semántica HTML (header, main, sections, footer) con metadatos SEO.
2. Implementa el CSS responsivo con Flexbox/Grid, custom properties y un toggle de tema claro/oscuro persistente (recuerda M26 y M42).
3. Incrusta tus datos en `<script type="application/json">` y accede a ellos con el `fakeFetch` de M38; cubre el caso `ok:false` con un mensaje visible en el DOM.
4. Organiza el JavaScript en al menos 2 namespaces `App` y `Api` (o en 1 module-blob de M39) y persiste el estado crítico en localStorage con `JSON.stringify`/`parse`.
5. Verifica accesibilidad con Lighthouse (a11y ≥ 90), valida el HTML con el W3C Validator y comprueba el `console` sin errores antes de entregar.

## Recursos

- [MDN: Web APIs](https://developer.mozilla.org/es/docs/Web/API) *(placeholder)*
- [MDN: Accessibility](https://developer.mozilla.org/es/docs/Web/Accessibility) *(placeholder)*
- [web.dev: Performance](https://web.dev/performance/) *(placeholder)*
- [javascript.info: Project structure](https://javascript.info/modules) *(placeholder)*
- [W3C Validator](https://validator.w3.org/) *(placeholder)*