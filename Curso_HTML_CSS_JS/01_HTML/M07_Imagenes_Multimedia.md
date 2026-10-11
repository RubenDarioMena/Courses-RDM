---
module: 7
title: "Imágenes y multimedia"
block: HTML
estimated_time: "90 min"
prerequisites: "M06 · Listas"
---

# M07 · Imágenes y multimedia

## Objetivos de aprendizaje

- Insertar imágenes con `<img>` usando atributos `src`, `alt`, `width`, `height` y `loading="lazy"`.
- Agrupar imágenes con título usando `<figure>` y `<figcaption>`.
- Embeber vídeo con `<video>` y audio con `<audio>`: `controls`, `loop`, `muted`, `<source>`, `<track>`.
- Conocer los formatos comunes: WebP, PNG, JPEG, SVG y su uso recomendado.
- Escribir texto `alt` accesible e informativo.

> **Nota:** Las imágenes responsivas (`srcset`, `sizes`, `<picture>`, `<source>` de imagen) se cubren en **M21 · Diseño responsivo**, donde ya existe contexto de viewport y media queries.

## Temas

- `<img>`: `src`, `alt`, `width`, `height`, `loading="lazy"`
- `<figure>` y `<figcaption>`
- `<video>` y `<audio>`: `controls`, `loop`, `muted`, `<source>` (de video/audio), `<track>`
- Formatos comunes: WebP, PNG, JPEG, SVG

## Ejercicio: Página splash con `<video>` de fondo + galería de `<figure>` con `<figcaption>` y `alt` correcto

1. **Crea un archivo** `splash.html` con la estructura mínima del documento y un `<h1>` con el título "Galería Mars Rover".
2. **Añade un `<video>`** con `controls`, `muted` y `loop`. Incluye 2 elementos `<source>` (mp4 y webm) y un mensaje de respaldo como contenido interno:
   ```html
   <video controls muted loop>
     <source src=" rover.mp4" type="video/mp4">
     <source src="rover.webm" type="video/webm">
     Tu navegador no soporta vídeo HTML.
   </video>
   ```
   > Si no tienes ficheros, usa las URL de muestra de Mozilla Developer Network desde `https://interactive-examples.mdn.mozilla.net/`.
3. **Crea una galería de 3 `<figure>`** con imágenes placebo (puedes servirlas desde `https://picsum.photos/400/300` o usar SVG locales). Cada `<figure>` lleva un `<img src alt width height loading="lazy">` y un `<figcaption>` descriptivo.
4. **Para cada `<img>`**, escribe un `alt` informativo que describa la imagen frases como "alt=imagen" o "alt=photo" son *inválidos*: usa "Foto del rover Curiosity en el cráter Jezero" o similar.
5. **Verifica** abriendo en el navegador: el vídeo reproduce con controles, las imágenes cargan con `loading="lazy"` (observa la pestaña Network en DevTools), `.alt` es legible al inspeccionar y los `<figcaption>` muestran bajo cada foto.

## Recursos

- [MDN — Imágenes en HTML](https://developer.mozilla.org/es/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML) (placeholder)
- [MDN — Video y audio](https://developer.mozilla.org/es/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content) (placeholder)
- [web.dev — Images](https://web.dev/learn/html/images) (placeholder)