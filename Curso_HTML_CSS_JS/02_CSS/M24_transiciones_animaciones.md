---
modulo: 24
titulo: "Transiciones y animaciones"
bloque: "CSS"
tiempo_estimado: "60 min"
prerrequisitos:
  - "M23 — Tipografía"
---

# M24 · Transiciones y animaciones

## Objetivos de aprendizaje

- Escribir transiciones con `transition-property`, `-duration`, `-timing-function` y `-delay`.
- Definir animaciones con `@keyframes`, `animation-name`, `-duration`, `-iteration-count` y `-direction`.
- Aplicar curvas de timing: `ease`, `cubic-bezier()` y `steps()`.
- Animar `opacity` y `transform` en GPU y evitar animar `width`/`height` por rendimiento.
- Respetar la preferencia de usuario con `prefers-reduced-motion`.

## Temario

- `transition-property`, `-duration`, `-timing-function`, `-delay`
- `@keyframes`: `animation-name`, `-duration`, `-iteration-count`, `-direction`
- Curvas: `ease`, `cubic-bezier()`, `steps()`
- Performance: animar `opacity` y `transform` (GPU), evitar `width`/`height`
- `prefers-reduced-motion`

## Ejercicio

**Botón con hover suave + spinner con `@keyframes`**

1. Crea un `<button class="btn>` con `transition: transform 0.2s ease, background-color 0.2s ease` y añade en `:hover` un `transform: scale(1.05)` y un cambio de `background-color`.
2. Prueba a animar `width` en lugar de `transform` y observa que hay parpadeo/pixelado; revierte el cambio para entender por qué `transform` va en GPU.
3. Crea un `.spinner` (un círculo con `border` transparente y un lado color) y define `@keyframes spin { to { transform: rotate(360deg) } }`.
4. Aplica `animation: spin 1s linear infinite` al spinner y prueba distintas curvas (`ease`, `cubic-bezier(0.4, 0, 0.2, 1)` y `steps(8)`) al botón para sentir la diferencia.
5. Añade una media query `@media (prefers-reduced-motion: reduce)` que detenga el spinner (`animation: none`) y reduzca la duración de las transiciones del botón a `0.01ms`.

## Recursos

- [MDN — Transition](https://developer.mozilla.org/es/docs/Web/CSS/transition)
- [MDN — @keyframes](https://developer.mozilla.org/es/docs/Web/CSS/@keyframes)
- [MDN — animation](https://developer.mozilla.org/es/docs/Web/CSS/animation)
- [MDN — prefers-reduced-motion](https://developer.mozilla.org/es/docs/Web/CSS/@media/prefers-reduced-motion)
- [web.dev — Transitions & Animations](https://web.dev/learn/css/transitions)
- [css-tricks — rotating-spinner](https://css-tricks.com/single-element-loaders-css-only-spinners/)