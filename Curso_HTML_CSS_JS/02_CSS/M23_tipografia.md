---
modulo: 23
titulo: "Tipografía"
bloque: "CSS"
tiempo_estimado: "60 min"
prerrequisitos:
  - "M22 — Colores y fondos"
---

# M23 · Tipografía

## Objetivos de aprendizaje

- Controlar fuente y tamaño con `font-family`, `font-size`, `font-weight`, `font-style` y el shorthand `font`.
- Definir tipografías propias con `@font-face` y entender `font-display`.
- Ajustar interlínea con `line-height`, `letter-spacing` y `word-spacing`.
- Transformar texto con `text-align`, `text-decoration` y `text-transform`.
- Usar `text-wrap: balance`/`pretty` para un equilibrio moderno de líneas.

## Temario

- `font-family`, `font-size`, `font-weight`, `font-style`, shorthand `font`
- `@font-face`, `font-display`
- `line-height`, `letter-spacing`, `word-spacing`
- `text-align`, `text-decoration`, `text-transform`
- `text-wrap: balance`/`pretty` (moderno)

## Ejercicio

**Jerarquía tipográfica (h1-h6, p, caption) con `rem`**

1. Define en `:root` un `font-size` base en `html { font-size: 100% }` y una escala modular con `clamp()` para los encabezados `h1`-`h6` (usando `rem`).
2. Asigna un `line-height` generoso (1.6-1.8) al `<p>` de cuerpo y un `line-height` ajustado (1.1-1.2) a los encabezados para mejorar la legibilidad.
3. Aplica `letter-spacing` positivo en mayúsculas (`text-transform: uppercase`) para títulos tipo "kicker" o etiquetas de sección.
4. Crea un `.caption` para textos pequeños en `font-size: 0.85rem`, `font-style: italic` y `text-decoration: underline` suave.
5. Aplica `text-wrap: balance` a los encabezados y `text-wrap: pretty` al cuerpo y compara antes/después el ajuste de líneas en bloques estrechos.

## Recursos

- [MDN — Tipografía](https://developer.mozilla.org/es/docs/Learn/CSS/Styling_text)
- [MDN — font shorthand](https://developer.mozilla.org/es/docs/Web/CSS/font)
- [MDN — @font-face](https://developer.mozilla.org/es/docs/Web/CSS/@font-face)
- [MDN — line-height](https://developer.mozilla.org/es/docs/Web/CSS/line-height)
- [web.dev — Typography](https://web.dev/learn/css/typography)
- [css-tricks — Text wrap balance](https://css-tricks.com/css-text-wrap-pretty-balancing-is-sweet/)