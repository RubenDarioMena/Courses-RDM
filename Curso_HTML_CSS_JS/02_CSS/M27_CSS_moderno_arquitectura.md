---
modulo: 27
titulo: "CSS moderno, arquitectura y proyecto CSS final"
bloque: "CSS"
tiempo_estimado: "120 min"
prerrequisitos:
  - "M26 — Variables CSS, pseudo-clases y pseudo-elementos"
---

# M27 · CSS moderno, arquitectura y proyecto CSS final

## Objetivos de aprendizaje

- Usar container queries (`@container`) y propiedades lógicas (`margin-inline`, `padding-block`).
- Aplicar CSS Nesting nativo con `&` para anidar selectores.
- Nombrar clases con la metodología BEM: `bloque__elemento--modificador`.
- Organizar el CSS en `@layer`: reset, base, components, utilities.
- Reducir especificidad con `:where()` y preferir clases sobre IDs.

## Temario

- Container queries (`@container`), propiedades lógicas (`margin-inline`)
- CSS Nesting nativo (`&`)
- BEM: `bloque__elemento--modificador`
- `@layer` para arquitectura: reset, base, components, utilities
- Reducir especificidad: `:where()`, preferir clases sobre IDs

## Ejercicio (Proyecto)

**Refactorizar el proyecto del bloque HTML con BEM, `@layer`, container queries, tema claro/oscuro con custom properties y imágenes responsivas con `srcset`/`<picture>`**

1. Toma el proyecto final del bloque HTML (M14) y renombra todas las clases siguiendo BEM: por ejemplo, `.tarjeta`, `.tarjeta__titulo`, `.tarjeta__boton--destacado`.
2. Divide tu CSS en cuatro `@layer`: `reset` (reset mínimo), `base` (tipografía, body, headings), `components` (tarjetas, formulario, navbar) y `utilities` (clases como `.sr-only`, `.mb-2`). Comprueba con DevTools que las utilities ganan sobre los components por estar en una capa posterior.
3. Convierte el layout de la tarjeta o galería a container queries: define `container-type: inline-size` en un contenedor y usa `@container (min-width: 400px)` para reorganizar su contenido independientemente del viewport.
4. Migra las imágenes del proyecto a `srcset` con resolvedores `1x`/`2x` y usa `<picture>` con `<source>` para servir versiones recortadas en móvil (por ejemplo, cuadrado en móvil, panorámico en desktop).
5. Implementa el tema claro/oscuro con custom properties CSS expuestas en `:root` y sobrescritas en `.tema-oscuro`; usa CSS Nesting nativo (`&`) para anidar `:hover`, `:focus` y variantes con `--modificador` dentro del bloque BEM.

## Recursos

- [MDN — Container queries](https://developer.mozilla.org/es/docs/Web/CSS/CSS_container_queries)
- [MDN — Propiedades lógicas](https://developer.mozilla.org/es/docs/Web/CSS/CSS_logical_properties_and_values)
- [MDN — CSS Nesting](https://developer.mozilla.org/es/docs/Web/CSS/CSS_nesting)
- [MDN — @layer](https://developer.mozilla.org/es/docs/Web/CSS/@layer)
- [MDN — :where()](https://developer.mozilla.org/es/docs/Web/CSS/:where)
- [web.dev — Learn CSS BEM](https://web.dev/learn/css/architecture)
- [css-tricks — BEM 101](https://css-tricks.com/bem-101/)
- [css-tricks — Container Queries](https://css-tricks.com/complete-guide-to-container-queries/)