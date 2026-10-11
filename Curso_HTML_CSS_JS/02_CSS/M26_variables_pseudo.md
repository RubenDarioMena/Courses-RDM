---
modulo: 26
titulo: "Variables CSS, pseudo-clases y pseudo-elementos"
bloque: "CSS"
tiempo_estimado: "75 min"
prerrequisitos:
  - "M25 — Transformaciones"
---

# M26 · Variables CSS, pseudo-clases y pseudo-elementos

## Objetivos de aprendizaje

- Definir y usar custom properties: `--nombre`, `var()`, declaración en `:root` y valor fallback.
- Actualizar custom properties dinámicamente con JS usando `setProperty`.
- Aplicar pseudo-clases modernas: `:hover`, `:focus`, `:nth-child()`, `:not()`, `:is()`, `:where()` y `:has()`.
- Generar contenido con pseudo-elementos: `::before`, `::after`, `::first-letter`, `::selection` y `::placeholder`.
- Construir un mini sistema de temas reutilizable con variables CSS.

## Temario

- Custom properties: `--nombre`, `var()`, `:root`, fallback
- Actualización dinámica con JS (`setProperty`)
- Pseudo-clases: `:hover`, `:focus`, `:nth-child()`, `:not()`, `:is()`, `:where()`, `:has()`
- Pseudo-elementos: `::before`, `::after`, `::first-letter`, `::selection`, `::placeholder`

## Ejercicio

**Toggle claro/oscuro con custom properties + lista con `:nth-child(even)`**

1. Define en `:root` un set de variables (`--color-fondo`, `--color-texto`, `--color-acento`) y asígnalas a `body`, `<p>` y enlaces.
2. Crea una clase `.tema-oscuro` en `:root` (o `body`) que sobrescriba las mismas variables con colores para modo oscuro.
3. Añade un `<button class="toggle">` y, con un inline `onclick`, una sola línea de JS: `document.documentElement.classList.toggle('tema-oscuro')` (sin JS adicional en este módulo).
4. Crea una `<ul class="lista>` con varios `<li>` y aplica `background-color` con `:nth-child(even)` para hacer un efecto cebra; luego prueba `:nth-child(odd)` y `:nth-child(3n)`.
5. Usa `::before` con `content` para añadir un emoji o prefijo a cada `<li>` y `::selection` para colorear el texto seleccionado; refina con `:has(.tema-oscuro)` para detectar el tema sin clase adicional.

## Recursos

- [MDN — Custom properties](https://developer.mozilla.org/es/docs/Web/CSS/--*)
- [MDN — var()](https://developer.mozilla.org/es/docs/Web/CSS/var)
- [MDN — Pseudo-clases](https://developer.mozilla.org/es/docs/Web/CSS/Pseudo-classes)
- [MDN — Pseudo-elementos](https://developer.mozilla.org/es/docs/Web/CSS/Pseudo-elements)
- [web.dev — CSS Variables](https://web.dev/learn/css/variables)
- [css-tricks — :has()](https://css-tricks.com/the-css-has-selector/)