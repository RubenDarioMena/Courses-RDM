---
module: 0
title: "Bienvenido: ¿Qué es la web y cómo se construye?"
block: HTML
estimated_time: "60 min"
prerequisites: "Ninguno — principiante absoluto"
---

# M00 · Bienvenido: ¿Qué es la web y cómo se construye?

## Objetivos de aprendizaje

- Comprender qué es una página web y cómo el navegador la interpreta.
- Identificar las tres capas de la web: HTML (estructura), CSS (estilo) y JS (comportamiento).
- Entender la metáfora visual de "construir una web es como construir una casa".
- Abrir DevTools y familiarizarse con la consola del navegador.
- Realizar una edición en vivo con DevTools (inspector → doble clic → editar texto).
- Escribir tu primer mensaje "¡Hola Mundo!" en la consola.

## Temas

- ¿Qué es una página web? El navegador como intérprete
- Las 3 capas: HTML (estructura), CSS (estilo), JS (comportamiento)
- Metáfora visual: "construir una web es como construir una casa"
- Tu primer momento: abre DevTools → Console
- Editar HTML con DevTools live edit (inspector → doble clic → editar texto)

## Ejercicio: "¡Hola Mundo!" + edición en vivo con DevTools

1. **Abre el navegador** (Chrome, Firefox o Edge) y navega a cualquier página web (por ejemplo, `https://example.com`).
2. **Abre DevTools** pulsando `F12` o clic derecho → "Inspeccionar" (también `Ctrl+Shift+I` / `Cmd+Option+I`).
3. **Ve a la pestaña Console** y teclea lo siguiente, pulsando Enter:
   ```js
   console.log("¡Hola, Mundo!");
   ```
   Verás el mensaje impreso bajo la línea de comando.
4. **Cambia a la pestaña Elements** (Inspector en Firefox). Busca la etiqueta `<h1>` en el árbol DOM.
5. **Haz doble clic** sobre el texto del `<h1>` en el panel de DevTools y cámbialo por "Edité esta web en vivo". Verás el cambio reflejado en la página al instante — pulsa Enter para aplicarlo.
   > Nota: los cambios se pierden al recargar. Es una edición temporal, solo para experimentar.

## Recursos

- [MDN Web Docs — Getting started with the web](https://developer.mozilla.org/es/docs/Learn/Getting_started_with_the_web) (placeholder)
- [web.dev — Learn HTML](https://web.dev/learn/html) (placeholder)
- [MDN — Firefox DevTools](https://firefox-source-docs.mozilla.org/devtools-user/) (placeholder)
- [freeCodeCamp — Responsive Web Design](https://www.freecodecamp.org/espanol/) (placeholder)