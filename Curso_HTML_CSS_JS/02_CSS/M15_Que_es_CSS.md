---
modulo: 15
titulo: "¿Qué es CSS y cómo funciona?"
bloque: "CSS"
tiempo_estimado: "45 min"
prerrequisitos:
  - "M14 — Buenas prácticas HTML y proyecto final del bloque"
---

# M15 · ¿Qué es CSS y cómo funciona?

## Objetivos de aprendizaje

- Comprender qué es CSS y por qué es una capa independiente del HTML.
- Conocer la sintaxis básica: selector + bloque de declaraciones.
- Identificar y usar los tipos de selectores más comunes.
- Aplicar combinadores para seleccionar elementos según su contexto.
- Incluir CSS en una página mediante los tres métodos: externa, interna e inline.

## Temario

- Lenguaje de presentación, capa de estilo
- Sintaxis: selector + bloque de declaraciones
- Selectores: tipo, clase, ID, universal, atributo
- Combinadores: descendiente, `>`, `+`, `~`
- Cómo incluir CSS: externa, interna, inline

## Ejercicio

**Aplicar 3 métodos de inclusión CSS y comparar**

1. Crea un archivo `index.html` con tres párrafos, un `<h1>` y dos elementos con clase `.destacado`.
2. Aplica estilos con CSS **inline** directamente en el atributo `style` de uno de los párrafos (color de texto azul).
3. Añade una hoja **interna** dentro de `<style>` en el `<head>` para dar color al `<h1>` y a `.destacado`.
4. Crea un archivo `estilos.css` externo y enlázalo con `<link rel="stylesheet" href="estilos.css">` para dar estilos al body (fuente y margen).
5. Abre la página, inspecciona cada elemento con DevTools y anota qué regla se aplica desde cada método de inclusión.

## Recursos

- [MDN — CSS: Cascading Style Sheets](https://developer.mozilla.org/es/docs/Web/CSS)
- [MDN — Cómo funciona CSS](https://developer.mozilla.org/es/docs/Learn/CSS/First_steps/How_CSS_works)
- [MDN — Selectores CSS](https://developer.mozilla.org/es/docs/Web/CSS/CSS_Selectors)
- [MDN — Combinadores](https://developer.mozilla.org/es/docs/Web/CSS/CSS_selectors/Combinators)
- [web.dev — Learn CSS](https://web.dev/learn/css)
- [css-tricks — Getting Started with CSS](https://css-tricks.com/)