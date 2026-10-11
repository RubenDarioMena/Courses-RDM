---
module: 5
title: "Enlaces y navegación"
block: HTML
estimated_time: "60 min"
prerequisites: "M04 · Texto y encabezados"
---

# M05 · Enlaces y navegación

## Objetivos de aprendizaje

- Crear enlaces con `<a href>` y distinguir URLs absolutas de relativas.
- Implementar navegación interna mediante anclas `#id`.
- Usar `target="_blank"` de forma segura con `rel="noopener noreferrer"`.
- Conocer los esqu especiales: `mailto:`, `tel:`, `download`.
- Comprender la importancia semántica y de accesibilidad del texto de los enlaces.

## Temas

- `<a href>`, URLs absolutas vs relativas
- Anclas `#id` (navegación interna)
- `target="_blank"`, `rel="noopener noreferrer"`
- `mailto:`, `tel:`, `download`

## Ejercicio: Índice de página con enlaces internos y externos seguros

1. **Crea un archivo** `enlaces.html` con la estructura mínima de documento (`<!DOCTYPE html>`, `<html lang="es">`, `<head>`, `<body>`).
2. **En el `<body>`**, escribe un `<nav>` con un índice de 3 elementos. Cada elemento es un `<a href="#seccion-1">`, `#seccion-2`, `#seccion-3` que enlaza a las secciones internas de la misma página.
3. **Añade 3 secciones** (`<section id="seccion-1">`, `id="seccion-2"`, `id="seccion-3"`) cada una con un `<h2>` y un párrafo explicativo. Verifica que al pulsar los enlaces del índice el navegador salta a la sección correspondiente.
4. **Añade un enlace externo** hacia MDN con `target="_blank"` y `rel="noopener noreferrer"`:
   ```html
   <a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">
     Documentación MDN
   </a>
   ```
   Comprueba que se abre en una pestaña nueva.
5. **Añade un enlace de contacto** `mailto:tucorreo@ejemplo.com` y otro `tel:+34123456789`. Comprueba que el navegador abre la app de correo o teléfono al hacer clic (o muestra el diálogo correspondiente). Verifica la carga: índice + secciones + enlaces externos/ internos/ mailto/ tel.

## Recursos

- [MDN — Creando enlaces](https://developer.mozilla.org/es/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks) (placeholder)
- [web.dev — Links](https://web.dev/learn/html/links) (placeholder)
- [MDN — `<a>`](https://developer.mozilla.org/es/docs/Web/HTML/Element/a) (placeholder)