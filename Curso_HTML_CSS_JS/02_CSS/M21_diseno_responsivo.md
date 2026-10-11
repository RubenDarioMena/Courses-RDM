---
modulo: 21
titulo: "Diseño responsivo"
bloque: "CSS"
tiempo_estimado: "90 min"
prerrequisitos:
  - "M20 — CSS Grid"
---

# M21 · Diseño responsivo

## Objetivos de aprendizaje

- Recordar el papel del `<meta viewport>` en HTML para el diseño responsivo.
- Escribir reglas `@media` con breakpoints siguiendo el enfoque mobile-first.
- Usar unidades relativas a viewport: `vw`, `vh`, `vmin`, `vmax`.
- Implementar imágenes responsivas con `srcset`, `sizes`, `<picture>` y `<source>`.
- Aplicar tipografía fluida con `clamp()`, `min()` y `max()`.

## Temario

- `<meta viewport>` (repaso desde HTML)
- `@media`: breakpoints, mobile-first
- `vw`/`vh`/`vmin`/`vmax`
- **Imágenes responsivas (introducción):** `srcset`, `sizes`, `<picture>`, `<source>` (de imagen), `object-fit`, `aspect-ratio`
- Tipografía fluida: `clamp()`, `min()`, `max()`

## Ejercicio

**Tarjeta de producto vertical (móvil) → horizontal (desktop) + imagen que cambia de fuente con `<picture>` (móvil retina vs desktop)**

1. Crea una `.tarjeta-producto` con una imagen, un título, precio y descripción; en móvil la tarjeta debe apilarse verticalmente (imagen arriba, texto abajo).
2. Usa `@media (min-width: 768px)` (mobile-first) para cambiar el layout a horizontal con Flexbox: imagen a la izquierda y texto a la derecha.
3. Implementa la imagen con `<picture>` y dos `<source>`: uno `media="(max-width: 767px)"` con `srcset="movil-retina.jpg 2x"` y otro para desktop con `srcset="desktop.jpg"`.
4. Aplica `object-fit: cover` y `aspect-ratio: 4/3` para que la imagen mantenga proporciones sin deformarse en ambos tamaños.
5. Usa `clamp()` para el `font-size` del título de forma que sea fluido entre 1.25rem (móvil) y 2rem (desktop), y reduce el viewport para ver el ajuste en tiempo real.

## Recursos

- [MDN — Diseño web responsivo](https://developer.mozilla.org/es/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [MDN — @media](https://developer.mozilla.org/es/docs/Web/CSS/@media)
- [MDN — Imágenes responsivas](https://developer.mozilla.org/es/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [MDN — clamp()](https://developer.mozilla.org/es/docs/Web/CSS/clamp)
- [web.dev — Learn Responsive Design](https://web.dev/learn/design)
- [css-tricks — Responsive Images](https://css-tricks.com/a-guide-to-the-responsive-images-specification/)