---
modulo: 20
titulo: "CSS Grid"
bloque: "CSS"
tiempo_estimado: "90 min"
prerrequisitos:
  - "M19 — Flexbox"
---

# M20 · CSS Grid

## Objetivos de aprendizaje

- Entender CSS Grid como modelo bidimensional de layout.
- Crear rejillas con `display: grid`, `grid-template-columns/rows` y `gap`.
- Usar `grid-template-areas` para definir layouts con nombres semánticos.
- Posicionar items con `grid-column`/`grid-row` y conocer `subgrid`.
- Alinear items con `justify-items` y `align-items`.

## Temario

- Modelo bidimensional
- `display: grid`, `grid-template-columns/rows`, `gap`
- `grid-template-areas`
- `grid-column`/`grid-row`, `subgrid`
- `justify-items`, `align-items`

## Ejercicio

**Layout "Santo Grial" con Grid y `grid-template-areas`**

1. Crea la estructura HTML: `<header>`, `<aside>` (izquierda), `<main>`, `<aside>` (derecha) y `<footer>`, todos dentro de un `<div class="contenedor">`.
2. Aplica `display: grid` al `.contenedor` y define `grid-template-areas` con las filas `"header header header"`, `"aside-1 main aside-2"` y `"footer footer footer"`.
3. Asocia cada área con `grid-area: header`, `grid-area: main`, etc., en cada elemento hijo y añade un `gap` de `1rem` entre celdas.
4. Define `grid-template-columns: 200px 1fr 200px` para que el centro sea fluido y los laterales fijos; añade `min-height: 100vh` al contenedor.
5. Inspecciona con DevTools el overlay de la rejilla (la línea punteada que muestra Grid) y prueba a mover un elemento cambiando su `grid-area` sin tocar el HTML.

## Recursos

- [MDN — CSS Grid Layout](https://developer.mozilla.org/es/docs/Web/CSS/CSS_grid_layout)
- [MDN — grid-template-areas](https://developer.mozilla.org/es/docs/Web/CSS/grid-template-areas)
- [MDN — grid-template-columns](https://developer.mozilla.org/es/docs/Web/CSS/grid-template-columns)
- [web.dev — CSS Grid](https://web.dev/learn/css/grid)
- [css-tricks — A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)