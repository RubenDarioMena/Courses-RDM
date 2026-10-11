---
module: M42
title: "localStorage"
block: JS
estimated_time: 90 min
prerequisites:
  - "M41 · JSON"
---

# M42 · localStorage

## Objetivos de aprendizaje

- Diferenciar `localStorage` de `sessionStorage`.
- Usar `setItem`, `getItem`, `removeItem`, `clear` y `key()`.
- Combinar localStorage con `JSON.stringify`/`parse`.
- Escuchar el evento `storage` para sincronizar pestañas.
- Conocer límites y seguridad (~5–10 MB, síncrono, no datos sensibles).

## Temas

- `localStorage` vs `sessionStorage`
- `setItem`, `getItem`, `removeItem`, `clear`, `key()`
- Combinar con `JSON.stringify`/`parse`
- Evento `storage` (sincronización entre pestañas)
- Límites y seguridad (~5-10 MB, síncrono, no datos sensibles)

## Ejercicio: Persistir todo-list + tema claro/oscuro en localStorage

1. Crea una todo-list en el DOM; al añadir una tarea, guarda el array completo en `localStorage.setItem('todos', JSON.stringify(todos))`.
2. Al cargar la página, lee `localStorage.getItem('todos')`, haz `JSON.parse` y renderiza las tareas existentes; maneja el caso `null` (sin datos previos).
3. Añade un botón de tema claro/oscuro que guarde la preferencia en `localStorage.setItem('tema', 'oscuro')` y restáurala al recargar usando `prefers-color-scheme` como fallback.
4. Abre dos pestañas con la misma app, escucha el evento `storage` en `window` y actualiza la lista cuando cambie en la otra pestaña.
5. Comprueba el límite de almacenamiento rellenando localStorage con datos grandes hasta lanzar `QuotaExceededError` y discute por qué no se guardan contraseñas aquí.

## Recursos

- [MDN: localStorage](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage) *(placeholder)*
- [MDN: Window: storage event](https://developer.mozilla.org/es/docs/Web/API/Window/storage_event) *(placeholder)*
- [javascript.info: LocalStorage](https://javascript.info/localstorage) *(placeholder)*
- [MDN: Storage API](https://developer.mozilla.org/es/docs/Web/API/Web_Storage_API) *(placeholder)*