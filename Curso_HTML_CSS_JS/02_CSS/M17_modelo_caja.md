---
modulo: 17
titulo: "El modelo de caja"
bloque: "CSS"
tiempo_estimado: "60 min"
prerrequisitos:
  - "M16 — Cascada, especificidad y herencia"
---

# M17 · El modelo de caja

## Objetivos de aprendizaje

- Comprender las cuatro capas del modelo de caja: content, padding, border y margin.
- Diferenciar `content-box` de `border-box` y aplicar `box-sizing: border-box` globalmente.
- Usar unidades adecuadas: `px`, `%`, `em`, `rem`, `vw`/`vh`, `ch`.
- Escribir shorthands de `margin`, `padding` y `border` correctamente.
- Explicar el colapso de márgenes verticales y controlar `overflow`.

## Temario

- Content, padding, border, margin
- `box-sizing`: `content-box` vs `border-box`
- Unidades: `px`, `%`, `em`, `rem`, `vw`/`vh`, `ch`
- Shorthands `margin`/`padding`/`border`
- Colapso de márgenes verticales
- `overflow`

## Ejercicio

**Tarjeta de perfil — inspeccionar box model con DevTools**

1. Crea una tarjeta `.tarjeta-perfil` con un avatar (img), un nombre (`<h3>`), una breve bio (`<p>`) y un botón "Seguir".
2. Aplica `padding`, `border` y `margin` a la tarjeta y comprueba si usas `content-box` (por defecto) cómo la caja se hace más grande de lo esperado.
3. Cambia a `box-sizing: border-box` y observa la diferencia midiendo con DevTools el ancho total.
4. Usa `rem` para `padding` interno, `px` para el `border`, y un `margin` inferior en `em` para ver cómo escala con la fuente.
5. Crea dos tarjetas adyacentes con `margin-bottom` grande y verifica el colapso de márgenes verticales entre ellas.

## Recursos

- [MDN — Modelo de caja](https://developer.mozilla.org/es/docs/Web/CSS/box_model)
- [MDN — box-sizing](https://developer.mozilla.org/es/docs/Web/CSS/box-sizing)
- [MDN — Unidades CSS](https://developer.mozilla.org/es/docs/Learn/CSS/Building_blocks/Values_and_units)
- [MDN — Colapso de márgenes](https://developer.mozilla.org/es/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing)
- [MDN — overflow](https://developer.mozilla.org/es/docs/Web/CSS/overflow)
- [css-tricks — box-sizing](https://css-tricks.com/box-sizing/)