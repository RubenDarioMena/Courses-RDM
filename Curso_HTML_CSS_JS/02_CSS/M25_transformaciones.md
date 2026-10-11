---
modulo: 25
titulo: "Transformaciones"
bloque: "CSS"
tiempo_estimado: "60 min"
prerrequisitos:
  - "M24 — Transiciones y animaciones"
---

# M25 · Transformaciones

## Objetivos de aprendizaje

- Aplicar transformaciones 2D: `translate()`, `rotate()`, `scale()` y `skew()`.
- Usar transformaciones 3D: `translate3d()`, `rotateX/Y/Z()`, `perspective` y `transform-style: preserve-3d`.
- Ajustar el punto de origen de la transformación con `transform-origin`.
- Optimizar rendimiento con `will-change` para elementos que se animan frecuentemente.
- Combinar transformaciones con transiciones y hover para crear efectos visuales atractivos.

## Temario

- 2D: `translate()`, `rotate()`, `scale()`, `skew()`
- 3D: `translate3d()`, `rotateX/Y/Z()`, `perspective`, `transform-style: preserve-3d`
- `transform-origin`
- `will-change`

## Ejercicio

**Flip card al hover + zoom de imagen con `overflow: hidden`**

1. Crea una `.flip-card` con dos caras (`.frente` y `.atras`) y aplícale `perspective: 1000px` para habilitar el contexto 3D.
2. Configura el `.flip-card-inner` con `transform-style: preserve-3d` y `transition: transform 0.6s`; al hacer `:hover` del contenedor, rota el inner con `transform: rotateY(180deg)`.
3. Posiciona `.frente` y `.atras` con `position: absolute` y da a `.atras` un `transform: rotateY(180deg)` inicial (su parte trasera oculta) para que el flip sea limpio.
4. En otro bloque, crea un contenedor con `overflow: hidden` y dentro una `<img>`; al hacer `:hover` del contenedor, aplica `transform: scale(1.2)` a la imagen con `transition: transform 0.3s ease` para un efecto de zoom contenido.
5. Añade `will-change: transform` al `.flip-card-inner` y a la imagen para que el navegador prepare la capa en GPU; verifica con DevTools que no haya jank durante la animación.

## Recursos

- [MDN — transform](https://developer.mozilla.org/es/docs/Web/CSS/transform)
- [MDN — transform-origin](https://developer.mozilla.org/es/docs/Web/CSS/transform-origin)
- [MDN — perspective](https://developer.mozilla.org/es/docs/Web/CSS/perspective)
- [MDN — will-change](https://developer.mozilla.org/es/docs/Web/CSS/will-change)
- [web.dev — Transforms](https://web.dev/learn/css/transitions)
- [css-tricks — Flip card](https://css-tricks.com/creating-a-3d-flip-card-effect-with-css/)