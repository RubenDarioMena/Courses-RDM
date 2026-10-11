---
module: 12
title: "Metadatos, SEO y social sharing"
block: HTML
estimated_time: "60 min"
prerequisites: "M11 · Accesibilidad"
---

# M12 · Metadatos, SEO y social sharing

## Objetivos de aprendizaje

- Optimizar los metadatos básicos: `<title>` y `<meta name="description">`.
- Configurar Open Graph (`og:title`, `og:description`, `og:image`, `og:url`) para compartir en Facebook/LinkedIn.
- Configurar Twitter Cards (`twitter:card`, `twitter:image`).
- Añadir `<link rel="canonical">` y directivas `robots`.
- Conocer JSON-LD / Schema.org mediante un ejemplo introductorio.
- Añadir favicon, `theme-color` y un manifest básico PWA.

## Temas

- `<title>`, `<meta name="description">`
- Open Graph (`og:title`, `og:description`, `og:image`), Twitter Cards
- `<link rel="canonical">`, `robots`
- JSON-LD / Schema.org (introducción)
- Favicon, `theme-color`, manifest PWA

## Ejercicio: Añadir metadatos OG + description a una página

1. **Crea un archivo** `seo-meta.html` con un `<head>` vacío (solo charset y viewport). El `<body>` llevará un `<h1>` y un `<p>` breves sobre una cafetería ficticia "Café Andante".
2. **Añade en el `<head>`** los metadatos básicos de SEO:
   ```html
   <title>Café Andante — Cafetería de especialidad en Madrid</title>
   <meta name="description" content="Café Andante: cafetería de especialidad en Madrid. Espresso, V60 y repostería casera desde 2015.">
   <link rel="canonical" href="https://cafeandante.example.com/">
   <meta name="robots" content="index, follow">
   ```
3. **Añade las etiquetas Open Graph** para compartir en redes:
   ```html
   <meta property="og:title" content="Café Andante">
   <meta property="og:description" content="Cafetería de especialidad en Madrid.">
   <meta property="og:image" content="https://cafeandante.example.com/og-image.jpg">
   <meta property="og:url" content="https://cafeandante.example.com/">
   <meta property="og:type" content="website">
   ```
4. **Añade Twitter Cards**:
   ```html
   <meta name="twitter:card" content="summary_large_image">
   <meta name="twitter:title" content="Café Andante">
   <meta name="twitter:image" content="https://cafeandante.example.com/og-image.jpg">
   ```
5. **Añade JSON-LD** para una empresa local (Schema.org) en un `<script type="application/ld+json">` con `@type: "CafeOrCoffeeShop"`, `name`, `address`, `telephone`. Incluye también `<link rel="icon">` favicon y `<meta name="theme-color" content="#A78BFA">`. Verifica abriendo la página y, con la extensión "Open Graph Preview" o Facebook Debugger (https://developers.facebook.com/tools/debug/), confirma que las tarjetas se ven correctamente. Aunque la URL es ficticia, la estructura debe pasar el validador de Schema.org (https://validator.schema.org/).

## Recursos

- [MDN — meta](https://developer.mozilla.org/es/docs/Web/HTML/Element/meta) (placeholder)
- [web.dev — Discoverable](https://web.dev/learn/html/metadata) (placeholder)
- [OGP — The Open Graph protocol](https://ogp.me/) (placeholder)
- [Schema.org](https://schema.org/) (placeholder)