---
module: M40
title: "Clases y POO básica"
block: JS
estimated_time: 120 min
prerequisites:
  - "M39 · Organización de código"
---

# M40 · Clases y POO básica

## Objetivos de aprendizaje

- Definir clases con `constructor`, métodos, getters/setters.
- Heredar con `extends` y `super()` y trazar la cadena de prototipos.
- Usar `static`, class fields y campos privados `#field`.
- Entender el rol de los prototipos como mecanismo subyacente.
- Comparar clases con factory functions.

## Temas

- `class`, `constructor`, métodos, getters/setters
- `extends`, `super()`, cadena de prototipos
- `static`, class fields, privados `#field`
- Prototipos (concepto subyacente)
- Clases vs factory functions

## Ejercicio: Jerarquía `Animal → Perro/Gato` + `CuentaBancaria` con `#saldo`

1. Define `class Animal` con `constructor(nombre)` y método `hablar()` genérico que devuelva "...".
2. Crea `class Perro extends Animal` y `class Gato extends Animal` sobrescribiendo `hablar()` con `super` opcional y mensajes distintos ("Guau", "Miau").
3. Instancia ambos y recorre la cadena de prototipos con `Object.getPrototypeOf()` mostrándola en consola.
4. Implementa `class CuentaBancaria` con campo privado `#saldo`, métodos `depositar()`, `retirar()` y un getter `saldo`; lanza un error si se intenta retirar más del saldo.
5. Compara la clase `CuentaBancaria` con una `crearCuenta()` factory function equivalente: escribe ambas y discute diferencias de `this` y privacidad.

## Recursos

- [MDN: Classes](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes) *(placeholder)*
- [MDN: Private properties](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes/Private_properties) *(placeholder)*
- [javascript.info: Classes](https://javascript.info/class) *(placeholder)*
- [javascript.info: Prototypes](https://javascript.info/prototype) *(placeholder)*