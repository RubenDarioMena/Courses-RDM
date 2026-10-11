---
module: 10
title: "Formularios (parte 2) y interactividad sin JS"
block: HTML
estimated_time: "75 min"
prerequisites: "M09 · Formularios (parte 1)"
---

# M10 · Formularios (parte 2) y interactividad sin JS

## Objetivos de aprendizaje

- Usar tipos avanzados de `<input>`: `color`, `range`, `file`, `hidden`, `search`, `tel`, `url`.
- Implementar `<datalist>`, `<output>`, `<progress>` y `<meter>`.
- Crear acordeones nativos con `<details>`/`<summary>`.
- Crear modales nativos con `<dialog>` (`show()`/`showModal()`).
- Conocer `setCustomValidity` para mensajes de validación personalizados.

## Temas

- Tipos avanzados: `color`, `range`, `file`, `hidden`, `search`, `tel`, `url`
- `<datalist>`, `<output>`, `<progress>`, `<meter>`
- `<details>` y `<summary>` (acordeones nativos)
- `<dialog>` (modal nativo)
- `setCustomValidity` (introducción mínima)

## Ejercicio: FAQ con `<details>`/`<summary>` y formulario con `<datalist>`

1. **Crea un archivo** `faq-form.html` con la estructura mínima del documento y un `<h1>` "Centro de ayuda".
2. **Añade una sección FAQ** con 3 elementos `<details>`. Cada uno lleva un `<summary>` con la pregunta y un `<p>` con la respuesta. Marca el primero con el atributo `open` para que aparezca abierto por defecto:
   ```html
   <details open>
     <summary>¿Cómo restablezco mi contraseña?</summary>
     <p>Haz clic en "Olvidé mi contraseña" en la pantalla de login…</p>
   </details>
   ```
3. **Crea un formulario** "Búsqueda rápida" con un `<input type="search" list="sugerencias">` y un `<datalist id="sugerencias">` con 5 `<option value="...">` (ej: "factura", "envío", "devolución", etc.). El usuario puede escribir o elegir una sugerencia del listado.
4. **Añade un modal nativo** `<dialog>` con un `<p>` y un `<button type="button" onclick="dialog.close()">Cerrar</button>`. Fuera del diálogo, coloca un `<button onclick="dialog.showModal()">Abrir modal</button>` (solo para esta demo usaremos un mínimo de JS para activar el modal nativo HTML).
5. **Añade `<progress value="7" max="10">`** y un `<meter value="0.6" min="0" max="1" low="0.3" high="0.7" optimum="0.9">` para mostrar estados. Verifica en el navegador: los acordeones se expanden/contraen sin JS, el datalist sugiere opciones, el modal se abre como ventana flotante y `progress`/`meter` muestran barras visuales.

## Recursos

- [MDN — `<details>`](https://developer.mozilla.org/es/docs/Web/HTML/Element/details) (placeholder)
- [MDN — `<dialog>`](https://developer.mozilla.org/es/docs/Web/HTML/Element/dialog) (placeholder)
- [MDN — `<datalist>`](https://developer.mozilla.org/es/docs/Web/HTML/Element/datalist) (placeholder)