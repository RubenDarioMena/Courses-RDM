---
module: M36
title: "DOM y eventos"
block: JS
estimated_time: 150 min
prerequisites:
  - "M35 · Strings y template literals"
---

# M36 · DOM y eventos

## Objetivos de aprendizaje

- Seleccionar elementos del DOM con distintos métodos.
- Manipular contenido, clases y atributos.
- Crear e insertar nodos dinámicamente.
- Escuchar eventos con `addEventListener`.
- Aplicar delegación de eventos.

## Temas

- Selección: `getElementById`, `querySelector`, `querySelectorAll`
- Manipulación: `textContent`, `innerHTML`, `classList`, `setAttribute`, `style`
- Creación: `createElement`, `appendChild`, `insertAdjacentHTML`
- Eventos: `addEventListener`, `event`, click/input/submit/keydown/DOMContentLoaded
- Delegación de eventos

## Ejercicio integrador: Calculadora interactiva con botones del DOM

> Integra funciones (M32), arrays (M33), objetos (M34), strings (M35) y el DOM (M36).

1. Crea el HTML: una `<div>` con pantalla y una `<div>` con botones numéricos y operadores; selecciona los botones con `querySelectorAll`.
2. Implementa la lógica en un objeto `Calculadora` con métodos `agregar`, `operar`, `limpiar` y usa `addEventListener('click')` con delegación sobre el contenedor de botones.
3. Muestra el estado actual en la pantalla usando `textContent`; evita inyecciones usando `textContent` (no `innerHTML`).
4. Añade soporte de teclado: escucha `keydown` para dígitos, operadores, Enter (=) y Escape (limpiar).
5. Refactoriza los resultados en un array y usa `reduce` para encadenar operaciones; muestra el historial en una lista creada con `createElement` y `appendChild`.

## Recursos

- [MDN: DOM](https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model) *(placeholder)*
- [MDN: addEventListener](https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener) *(placeholder)*
- [javascript.info: DOM](https://javascript.info/document) *(placeholder)*
- [javascript.info: Events](https://javascript.info/events) *(placeholder)*