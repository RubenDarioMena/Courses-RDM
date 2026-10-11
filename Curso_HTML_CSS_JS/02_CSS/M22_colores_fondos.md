---
modulo: 22
titulo: "Colores y fondos"
bloque: "CSS"
tiempo_estimado: "60 min"
prerrequisitos:
  - "M21 — Diseño responsivo"
---

# M22 · Colores y fondos

## Objetivos de aprendizaje

- Usar los formatos de color: hex, `rgb()`, `hsl()`, `oklch()` y `color()`.
- Aplicar `color`, `background-color` y entender `currentColor`.
- Trabajajar con `background-image`, `-size` (`cover`/`contain`), `-position` y el shorthand `background`.
- Crear gradientes: `linear-gradient()`, `radial-gradient()` y `conic-gradient()`.
- Redondear esquinas con `border-radius` y usar `border-image`.

## Temario

- Formatos: hex, `rgb()`, `hsl()`, `oklch()`, `color()`
- `color`, `background-color`, `currentColor`
- `background-image`, `-size` (`cover`/`contain`), `-position`, shorthand
- Gradientes: `linear-gradient()`, `radial-gradient()`, `conic-gradient()`
- `border-radius`, `border-image`

## Ejercicio

**Botón con gradiente + hero section con overlay de gradiente**

1. Crea un `<button class="btn-gradiente">` con `background: linear-gradient(135deg, #A78BFA, #34D399)` y texto blanco; redondea las esquinas con `border-radius`.
2. Al hacer `:hover`, intercambia los colores del gradiente manteniendo el mismo ángulo (`135deg`) para un efecto de inversión.
3. Crea un `.hero` con `min-height: 80vh` y un `background` que combine una `background-image` (foto o textura) con un `linear-gradient()` superpuesto para oscurecerla.
4. Ajusta `background-size: cover` y `background-position: center` para que la imagen recorte correctamente en distintos tamaños de pantalla.
5. Experimenta con `radial-gradient()` para crear un "spotlight" en una esquina del `.hero` y prueba `conic-gradient()` para colorear el botón con un anillo de colores.

## Recursos

- [MDN — color](https://developer.mozilla.org/es/docs/Web/CSS/color)
- [MDN — background](https://developer.mozilla.org/es/docs/Web/CSS/background)
- [MDN — linear-gradient()](https://developer.mozilla.org/es/docs/Web/CSS/gradient/linear-gradient)
- [MDN — border-radius](https://developer.mozilla.org/es/docs/Web/CSS/border-radius)
- [web.dev — Color](https://web.dev/learn/css/color)
- [css-tricks — Gradients](https://css-tricks.com/css3-gradients/)