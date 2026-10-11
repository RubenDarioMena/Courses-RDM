---
module: 1
title: "Tu primera página HTML"
block: HTML
estimated_time: "45 min"
prerequisites: "M00 · Bienvenido"
---

# M01 · Tu primera página HTML

## Objetivos de aprendizaje

- Conocer la estructura mínima de un documento HTML válido.
- Entender el propósito de `<!DOCTYPE>`, `<html>`, `<head>` y `<body>`.
- Aplicar los atributos esenciales del documento: `charset` UTF-8 y `lang="es"`.
- Usar la etiqueta `<title>` y el `<meta>` viewport correctamente.
- Editar y guardar un archivo `.html` en VS Code (o editor de texto) y abrirlo en el navegador.

## Temas

- Estructura mínima: `<!DOCTYPE>`, `<html>`, `<head>`, `<body>`
- `charset` UTF-8, `lang="es"`
- `<title>` y `<meta viewport>`
- VS Code o cualquier editor de texto

## Ejercicio: Crear `index.html` con "Hola Mundo" y abrirlo en el navegador

1. **Abre tu editor** (VS Code recomendado) y crea un archivo nuevo llamado `index.html` dentro de una carpeta del proyecto.
2. **Escribe la estructura mínima** completa (puedes usar el snippet `html:5` o escribirlo a mano):
   ```html
   <!DOCTYPE html>
   <html lang="es">
     <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Mi primera página</title>
     </head>
     <body>
       <h1>¡Hola, Mundo!</h1>
       <p>Esta es mi primera página web.</p>
     </body>
   </html>
   ```
3. **Verifica** que `<html>` lleva `lang="es"` (razón: accesibilidad y motores de búsqueda).
4. **Guarda el archivo** (`Ctrl+S` / `Cmd+S`) y haz doble clic sobre él en el explorador de archivos para abrirlo en el navegador por defecto.
5. **Observa** la pestaña del navegador — el texto de la pestaña debe ser "Mi primera página" (gracias al `<title>`). El cuerpo mostrará el encabezado y el párrafo. Si no aparece, revisa la extensión `.html` y el atributo `charset`.

## Recursos

- [MDN — Documento HTML básico](https://developer.mozilla.org/es/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML) (placeholder)
- [web.dev — Document structure](https://web.dev/learn/html/document-structure) (placeholder)
- [MDN — meta viewport](https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag) (placeholder)