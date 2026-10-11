---
modulo: 19
titulo: "Flexbox"
bloque: "CSS"
tiempo_estimado: "75 min"
prerrequisitos:
  - "M18 — Flujo normal y posicionamiento"
---

# M19 · Flexbox

## Objetivos de aprendizaje

- Entender Flexbox como modelo unidimensional de layout.
- Usar `display: flex`, `flex-direction`, `justify-content` y `align-items`.
- Controlar el reparto de espacio con `flex-wrap`, `gap` y las propiedades `flex-grow`/`shrink`/`basis`.
- Alinear items individuales con `align-self` y reordenar con `order`.
- Resolver patrones típicos: barras de navegación, tarjetas centradas y columnas iguales.

## Temario

- Modelo unidimensional
- `display: flex`, `flex-direction`, `justify-content`, `align-items`
- `flex-wrap`, `gap`, `flex-grow`/`shrink`/`basis`
- Alineación de items individuales (`align-self`, `order`)

## Ejercicio

**Barra de navegación centrada (logo izq, enlaces der) con Flexbox**

1. Crea un `<header class="navbar">` que contenga un `<div class="logo">` y un `<nav class="menu">` con varios enlaces.
2. Aplica `display: flex` al `.navbar` y usa `justify-content: space-between` para empujar el logo a la izquierda y el menú a la derecha.
3. Centra verticalmente ambos hijos con `align-items: center` y dale al `.navbar` una `min-height` y un `padding` adecuados.
4. Al `.menu` dale también `display: flex` y un `gap` entre enlaces; añade `flex-wrap: wrap` para que en pantallas pequeñas los enlaces se reordenen sin romper el layout.
5. Cambia el `flex-grow` de `.logo` y `.menu` y observa cómo afecta al reparto de espacio; con DevTools activa/desactiva el gap para ver el efecto.

## Recursos

- [MDN — Flexbox](https://developer.mozilla.org/es/docs/Learn/CSS/CSS_layout/Flexbox)
- [MDN — Guía completa de Flexbox](https://developer.mozilla.org/es/docs/Web/CSS/CSS_flexible_box_layout)
- [MDN — align-items](https://developer.mozilla.org/es/docs/Web/CSS/align-items)
- [web.dev — Flexbox](https://web.dev/learn/css/flexbox)
- [css-tricks — A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)