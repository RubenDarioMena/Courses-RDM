# Design System Spec — Cursos HTML/CSS/JS

Extraído de `Design_System/00-Introduccion.html` y `01-Fundamentos.html`.
Reproducir en HTML/CSS/JS vanilla (sin React, sin Babel, sin bundler, sin red).

## Paleta

### Backgrounds (oscuro → menos oscuro)
| Token | Hex | Uso |
|---|---|---|
| `--bg-base` | `#09080F` | Background del body |
| `--bg-surface-1` | `#0C0B13` | Code blocks, surfaces profundas |
| `--bg-surface-2` | `#0E0D16` | Editor panel, modal |
| `--bg-surface-3` | `#110F18` | Cards |
| `--bg-surface-4` | `#13111D` | Header bar del editor |
| `--bg-surface-5` | `#15131F` | ...
| `--bg-surface-6` | `#1B1926` | Hover states |

### Texto
| Token | Hex | Uso |
|---|---|---|
| `--text-primary` | `#EEEBF6` | Headings, texto principal |
| `--text-secondary` | `#C7CDE0` | Body text |
| `--text-muted` | `#8B889C` | Labels, meta |
| `--text-subtle` | `#5E5C6E` | Placeholders |
| `--white` | `#FFFFFF` | Highlight text |

### Acento principal (púrpura/violeta)
| Token | Hex | Uso |
|---|---|---|
| `--accent` | `#8B5CF6` | Botones, links |
| `--accent-hover` | `#A78BFA` | Hover |
| `--accent-soft` | `rgba(139,92,246,0.16)` | Background hover de tabs |
| `--accent-border` | `rgba(167,139,250,0.35)` | Border de tab activo |

### Acentos secundarios (categorías)
| Color | Hex | Categoría |
|---|---|---|
| Cyan | `#67E8F9` / `#5FD0E0` | HTML / estructura |
| Verde | `#34D399` / `#4ADE80` | CSS / estilos (buenas prácticas) |
| Rosa | `#F9A8D4` | Recursos / editar |
| Amarillo | `#F5C451` | JS / alertas / warnings |
| Rojo | `#FB7185` / `#FF8E8E` | Errores / debilidades |
| Morado claro | `#C4B5FD` / `#CBBEFB` | Alert output |

### Sintaxis del código (code highlighting)
| Token | Hex | Uso |
|---|---|---|
| Comment | `#5C6A75` italic | `// comentarios` |
| Function | `#82AAFF` | `alert(`, `console.log(` |
| String | `#ECC48D` | `'strings'` |
| Keyword | `#C4B5FD` | `function`, `var` |
| Property | `#93C5FD` | log level "log" tag |
| Plain code | `#C7CDE0` | default |

## Tipografía

| Token | Font | Uso |
|---|---|---|
| `--font-body` | `'Plus Jakarta Sans', sans-serif` | Body text, UI |
| `--font-heading` | `'Space Grotesk', sans-serif` | Headings, números de paso |
| `--font-mono` | `'JetBrains Mono', monospace` | Code, snippets, números de módulo |

### Pesos
- Body: 400/500/600
- Headings: 700
- Mono: 400/500/700

### Tamaños
- h1: ~32px
- h2: ~22-24px
- body: 16px
- small/meta: 12.5-13.5px
- code: 13.5px, line-height 1.75

## Radios
- xs: 6px
- sm: 8-9px
- md: 10-11px
- lg: 12-13px
- xl: 14-16px
- 2xl: 18-20px
- pill: 999px

## Estructura de cada módulo

```
MÓDULO XX · <TEMA>
<h1> Título grande
<p> Intro del módulo
meta: "Sin experiencia previa" · "~10 min de lectura"

SECCIÓN: LA IDEA EN UNA IMAGEN
  <h2> Metáfora visual
  Metáfora con 3 tarjetas (HTML/CSS/JS como partes de la metáfora)

01 · <SUBTÍTULO>
  <h2> Contenido
  Concepto con ejemplos

02 · <SUBTÍTULO>
  ...

TU PRIMER MOMENTO <TEMA>
  Editor de código interactivo inline
  Botones: Editar, Ejecutar
  Output console

N · RECURSOS PARA PROFUNDIZAR
  Links a MDN, javascript.info, freeCodeCamp

CTA: ¿Listo para el siguiente módulo?
  Link a MÓDULO XX+1
```

## Playground (editor embebido)

Panel deslizable desde la derecha (desktop) o abajo (mobile):
- Tabs: HTML / CSS / JS
- Panel de output: Vista previa (iframe srcdoc) / Consola
- Botón flotante "Probar código" (FAB) abajo derecha
- Console levels con colores: log=#93C5FD, warn=#F5C451, error=#FF8E8E, alert=#C4B5FD
- iframe sandboxed con postMessage para capturar console.log del iframe al parent

## Iconos
SVG inline stroke 2px, estilo line-outlined (Lucide-like), `aria-hidden="true"`.
Tamaños: 18-22px dentro de chips de 34-44px.