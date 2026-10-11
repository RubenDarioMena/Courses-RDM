---
module: M38
title: "Async JS: promesas, async/await y fetch"
block: JS
estimated_time: 150 min
prerequisites:
  - "M37 · Manejo de errores"
---

# M38 · Async JS: promesas, async/await y fetch

## Objetivos de aprendizaje

- Entender el event loop, la callback queue y la microtask queue.
- Crear y consumir promesas con `.then()`, `.catch()`, `.finally()`.
- Escribir código asíncrono legible con `async`/`await`.
- Usar el patrón `fetch()` real (Response, `json()`, `text()`, cabeceras, POST).
- Combinar promesas con `Promise.all`, `Promise.race`, `Promise.allSettled`.

## Temas

- Event loop (intro), callback queue vs microtask queue
- Promesas: estados, `new Promise`, `.then()`, `.catch()`, `.finally()`
- `async`/`await`
- `fetch()`: Response, `json()`, `text()`, cabeceras, POST
- `Promise.all`, `Promise.race`, `Promise.allSettled`
- **Restricción no-red:** Se usa un `fakeFetch(url)` que devuelve `Promise.resolve({ ok, json, status, headers })` leyendo JSON embebido en `<script type="application/json">`. El alumno escribe el patrón real `const res = await fetch('/api/users'); const data = await res.json();`. El mock modela **tanto éxito como fallo** (`ok:false`, error de red, timeout) para que `try/catch` e `if(!res.ok)` tengan sentido.
- **En la vida real (caja teórica):** CORS, cabeceras `Authorization`/`Content-Type`, `OPTIONS` preflight, `Response.status` (404/500). Lectura conceptual — el curso usa mock por la restricción sin-red.

## Ejercicio: Consumir datos locales con `fetch` mock + `async/await`

> El módulo usa un `fakeFetch(url)` mock — no hay red real. El JSON se incrusta con `<script type="application/json">` dentro del HTML.

1. Construye un `fakeFetch(url)` que devuelva `Promise.resolve({ ok: true, status: 200, json: async () => datos })` leyendo el JSON embebido; simula también `ok:false` (404) y un error de red (`Promise.reject(new Error("Network error"))`).
2. Escribir una función `async function cargarUsuarios()` que use el patrón real: `const res = await fakeFetch('/api/users'); if (!res.ok) throw new Error('HTTP ' + res.status); const data = await res.json();`.
3. Llama `cargarUsuarios()` con un `try/catch` que muestre el error en el DOM.
4. Prueba `Promise.all([cargarUsuarios(), cargarPosts()])` para cargar dos recursos en paralelo y `Promise.allSettled` para tolerar fallos parciales.
5. Caja teórica: debate en grupo qué cambiaría el patrón con una API real (CORS, `Authorization`, `OPTIONS` preflight) y por qué el `if (!res.ok)` sigue siendo necesario.

## Recursos

- [MDN: Promises](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise) *(placeholder)*
- [MDN: async function](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function) *(placeholder)*
- [MDN: Fetch API](https://developer.mozilla.org/es/docs/Web/API/Fetch_API) *(placeholder)*
- [javascript.info: Promise](https://javascript.info/promise) *(placeholder)*
- [javascript.info: Fetch](https://javascript.info/fetch) *(placeholder)*