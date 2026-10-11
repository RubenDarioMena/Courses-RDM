---
modulo: 18
titulo: "Flujo normal y posicionamiento"
bloque: "CSS"
tiempo_estimado: "75 min"
prerrequisitos:
  - "M17 — El modelo de caja"
---

# M18 · Flujo normal y posicionamiento

## Objetivos de aprendizaje

- Diferenciar elementos de bloque, en línea e inline-block y su comportamiento.
- Aplicar `position` con los cinco valores: `static`, `relative`, `absolute`, `fixed` y `sticky`.
- Entender y crear contextos de apilamiento con `z-index`.
- Conocer el histórico `float` y `clear` y por qué hoy se evita para layout.
- Resolver un layout típico combinando posicionamiento.

## Temario

- Block vs inline vs inline-block
- `position`: `static`, `relative`, `absolute`, `fixed`, `sticky`
- Contextos de apilamiento (`z-index`)
- `float` (histórico) y `clear`

## Ejercicio

**Barra de navegación fixed + hero con overlay**

1. Crea un `<header class="navbar">` con un logo y tres enlaces; dale `position: fixed` en la parte superior para que no se desplace al hacer scroll.
2. Añade un `padding-top` al `<body>` o un `min-height` equivalente a la altura del navbar para que el contenido no quede oculto detrás.
3. Crea una sección `.hero` con una imagen de fondo (o gradiente) que ocupe el 100% del viewport (`min-height: 100vh`).
4. Superpone un `<div class="overlay">` dentro del `.hero` con `position: absolute` para aplicar un degradado oscuro sobre la imagen de fondo.
5. Usa `z-index` para asegurar que el navbar quede por encima del overlay y prueba el resultado al hacer scroll: el navbar debe permanecer visible en todo momento.

## Recursos

- [MDN — Flujo normal](https://developer.mozilla.org/es/docs/Learn/CSS/CSS_layout/Normal_Flow)
- [MDN — position](https://developer.mozilla.org/es/docs/Web/CSS/position)
- [MDN — z-index](https://developer.mozilla.org/es/docs/Web/CSS/z-index)
- [MDN — float](https://developer.mozilla.org/es/docs/Web/CSS/float)
- [web.dev — Positioning](https://web.dev/learn/css/positioning)
- [css-tricks — position](https://css-tricks.com/almanac/properties/p/position/)