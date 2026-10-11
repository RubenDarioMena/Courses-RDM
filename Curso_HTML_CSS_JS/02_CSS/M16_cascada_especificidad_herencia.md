---
modulo: 16
titulo: "Cascada, especificidad y herencia"
bloque: "CSS"
tiempo_estimado: "60 min"
prerrequisitos:
  - "M15 — ¿Qué es CSS y cómo funciona?"
---

# M16 · Cascada, especificidad y herencia

## Objetivos de aprendizaje

- Entender el orden de cascada: origen, `!important` y orden de aparición.
- Calcular la especificidad de un selector (ID > clase > tipo).
- Distinguir qué propiedades se heredan (color, font) y cuáles no (margin, border).
- Usar `inherit`, `initial`, `revert` y `unset` para controlar la herencia.
- Conocer `@layer` (cascade layers) como mecanismo moderno de gestión de prioridad.

## Temario

- Orden de origen, `!important`, orden de aparición
- Cálculo de especificidad (ID > clase > tipo)
- Herencia: qué se hereda (color, font) y qué no (margin, border)
- `inherit`, `initial`, `revert`, `unset`
- Cascade layers (`@layer`) — introducción

## Ejercicio

**Predecir cuál regla gana calculando especificidad, verificar con DevTools**

1. Crea un HTML con un `<div id="caja" class="caja">` y dentro un `<p class="texto">`.
2. Escribe cinco reglas CSS que afecten al `color` del párrafo: un selector de tipo, uno de clase, dos combinaciones diferentes y un `#caja .texto`.
3. Antes de abrir el navegador, anota en papel cuál crees que ganará siguiendo la fórmula de especificidad.
4. Abre DevTools, selecciona el `<p>` y mira en la pestaña "Computed" o "Styles" qué regla se aplica y cuáles aparecen tachadas.
5. Añade `!important` a una regla perdedora y observa cómo cambia el resultado; luego reorganiza con `@layer` para ver el efecto de las capas.

## Recursos

- [MDN — La cascada](https://developer.mozilla.org/es/docs/Web/CSS/Cascade)
- [MDN — Especificidad](https://developer.mozilla.org/es/docs/Web/CSS/Specificity)
- [MDN — Herencia](https://developer.mozilla.org/es/docs/Web/CSS/Inheritance)
- [MDN — Cascade layers](https://developer.mozilla.org/es/docs/Web/CSS/@layer)
- [web.dev — Specificity](https://web.dev/learn/css/specificity)
- [css-tricks — Specificity](https://css-tricks.com/specifics-on-css-specificity/)