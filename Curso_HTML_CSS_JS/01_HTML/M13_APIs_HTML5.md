---
module: 13
title: "APIs HTML5 (introducción)"
block: HTML
estimated_time: "60 min"
prerequisites: "M12 · Metadatos, SEO y social sharing"
---

# M13 · APIs HTML5 (introducción)

## Objetivos de aprendizaje

- Dibujar en un `<canvas>` usando `getContext('2d')` y métodos básicos (líneas, rectángulos, texto).
- Conocer conceptualmente APIs como Geolocation, Drag & Drop, Fullscreen y Visibility.
- Comprender el papel del `<canvas>` en gráficos sin JS pesado (animación simple).
- Diferenciar entre APIs con permisos (Geolocation) y sin permisos (Canvas).

> **Nota:** `localStorage`/`sessionStorage` se cubren en **M42 · localStorage** (Bloque III: JS), donde ya se dispone del lenguaje para usar la API.

## Temas

- `<canvas>`: `getContext('2d')`, dibujo básico (líneas, rectángulos, texto)
- Geolocation, Drag & Drop, Fullscreen, Visibility (visión general conceptual)

## Ejercicio: Dibujar en `<canvas>` al hacer clic

1. **Crea un archivo** `canvas-demo.html` con la estructura mínima del documento. En el `<body>` añade un `<h1>` "Galería de clicks" y un `<canvas id="lienzo" width="400" height="400"></canvas>`.
2. **Crea un `<script>`** (al final del `<body>`) que obtenga el contexto:
   ```html
   <script>
     const canvas = document.getElementById('lienzo');
     const ctx = canvas.getContext('2d');
   </script>
   ```
   (Este módulo admite un mínimo de JS para demostrar la API del canvas — solo lectura, sin lógica.)
3. **Rellena el fondo** con `ctx.fillStyle = '#09080F'; ctx.fillRect(0, 0, 400, 400);` y dibuja un rectángulo violeta de prueba: `ctx.fillStyle = '#A78BFA'; ctx.fillRect(20, 20, 100, 50);`.
4. **Añade un texto** con `ctx.font = '20px sans-serif'; ctx.fillStyle = '#00d8ff'; ctx.fillText('Click para dibujar', 130, 50);`.
5. **Configura un listener de clic** (`canvas.addEventListener('click', ...)`) que dibuje un círculo cyan (`#67E8F9`) en las coordenadas del clic usando `ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI*2); ctx.fill();`. Verifica: al abrir la página aparece el rectángulo violeta y el texto, y cada clic deja un círculo cyan en la zona pulsada. Opcional: explora (conceptualmente) las APIs `navigator.geolocation.getCurrentPosition(...)` y el evento `visibilitychange` en `document` — solo lectura.

## Recursos

- [MDN — Canvas API](https://developer.mozilla.org/es/docs/Web/API/Canvas_API) (placeholder)
- [MDN — Geolocation](https://developer.mozilla.org/es/docs/Web/API/Geolocation_API) (placeholder)
- [web.dev — Canvas](https://web.dev/learn/html/canvas) (placeholder)