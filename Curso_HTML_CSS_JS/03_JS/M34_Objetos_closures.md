---
module: M34
title: "Objetos y closures"
block: JS
estimated_time: 120 min
prerequisites:
  - "M33 · Arrays"
---

# M34 · Objetos y closures

## Objetivos de aprendizaje

- Crear objetos literales y acceder con punto y corchetes.
- Diferenciar referencia de copia y clonar objetos.
- Definir métodos y entender `this`.
- Construir closures que recuerdan su entorno.
- Desestructurar objetos y usar propiedades computadas.

## Temas

- Literales, acceso punto vs corchetes
- Referencia vs copia: `Object.assign`, `{...obj}`, `structuredClone`
- Métodos y `this`, `.bind()/.call()/.apply()` (intro)
- **Closures:** funciones que recuerdan su entorno (contador, factory de funciones)
- Desestructuración: `const {name} = user`, renombrado, anidada
- Propiedades computadas y métodos abreviados

## Ejercicio: Objeto "libro" + contador con closure + desestructurar respuesta de API

1. Crea un objeto `libro` con propiedades `titulo`, `autor`, `año` y un método `resumen()` que use `this` para devolver una cadena.
2. Construye `crearContador()` que devuelva un objeto con `incrementar()`, `decrementar()` y `valor()` usando un closure sobre una variable privada.
3. Desestructura una respuesta simulada `const { data: { usuario: { nombre } } } = respuesta` y muestra `nombre`.
4. Clona el objeto `libro` con `{...libro}` y modifícalo; verifica que el original no cambia. Comprueba que `structuredClone` copia sub-objetos.
5. Usa propiedades computadas: `const campo = "edad"; const obj = { [campo]: 30 }` y métodos abreviados `{ saludar() {} }`.

## Recursos

- [MDN: Object](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Object) *(placeholder)*
- [MDN: this](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/this) *(placeholder)*
- [javascript.info: Closures](https://javascript.info/closure) *(placeholder)*
- [javascript.info: Object methods, "this"](https://javascript.info/object-methods) *(placeholder)*