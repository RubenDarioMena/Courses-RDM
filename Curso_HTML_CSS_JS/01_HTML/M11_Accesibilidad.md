---
module: 11
title: "Accesibilidad (a11y)"
block: HTML
estimated_time: "75 min"
prerequisites: "M10 · Formularios (parte 2)"
---

# M11 · Accesibilidad (a11y)

## Objetivos de aprendizaje

- Comprender el HTML semántico como base de la accesibilidad.
- Conocer los roles landmark implícitos de cada elemento semántico.
- Usar `tabindex` correctamente y respetar el orden de navegación por teclado.
- Aplicar ARIA: `role`, `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-live`.
- Escribir `alt` correcto: decorativa (vacío) vs informativa.
- Auditar una página con Lighthouse y ax en DevTools.

> **Nota:** La pestaña "Red" de DevTools se cubre de forma conceptual (el curso no usa red real).

## Temas

- HTML semántico como base de a11y
- Roles landmark, `tabindex`, navegación por teclado
- ARIA: `role`, `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-live`
- `alt` correcto: decorativa vs informativa
- Lighthouse + axe
- La pestaña Red de DevTools se cubre de forma conceptual (el curso no usa red real)

## Ejercicio: Auditar una página con Lighthouse y corregir 3 problemas

1. **Crea una página** `a11y-audit.html` con una estructura mínima: un `<header>` sin `<nav>`, 2 imágenes sin `alt`, un `<button>` con texto "Clic aquí" no descriptivo, un `<div>` que actúa como botón (con `onclick`) sin `role="button"` ni `tabindex`.
2. **Abre DevTools** y ve a la pestaña "Lighthouse". Lanza una auditoría de Accessibility (puedes desmarcar SEO y Rendimiento). Espera a que termine y revisa el informe listando los fallos detectados.
3. **Corrige los 3 problemas** más relevantes en el HTML:
   - Añade `alt=""` a una imagen decorativa y `alt="..."` descriptivo a la informativa.
   - Cambia el texto del botón por uno descriptivo: "Guardar cambios" en vez de "Clic aquí".
   - Sustituye el `<div onclick>` por un `<button>` nativo (o añade `role="button"` y `tabindex="0"` si debe seguir siendo div).
4. **Vuelve a lanzar Lighthouse**. Compara la puntuación anterior con la nueva — debe subir. Revisa también la pestaña "Issues" o "Accesibility" de DevTools.
5. **Prueba la navegación por teclado**: sin usar el ratón, pulsa `Tab` repetidamente y verifica que el foco recorre todos los controles interactivos en orden lógico y visible. Añade `:focus-visible { outline: 3px solid #A78BFA; }` si el outline no se distingue.

## Recursos

- [MDN — Accesibilidad](https://developer.mozilla.org/es/docs/Learn/Accessibility) (placeholder)
- [web.dev — Learn Accessibility](https://web.dev/learn/accessibility) (placeholder)
- [Chrome Docs — Lighthouse a11y](https://developer.chrome.com/docs/lighthouse/accessibility/scoring) (placeholder)