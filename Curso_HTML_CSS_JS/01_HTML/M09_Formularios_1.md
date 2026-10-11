---
module: 9
title: "Formularios (parte 1)"
block: HTML
estimated_time: "90 min"
prerequisites: "M08 · Tablas"
---

# M09 · Formularios (parte 1)

## Objetivos de aprendizaje

- Construir un `<form>` con `action` y `method` (GET/POST).
- Usar los tipos básicos de `<input>`: text, email, password, number, date, checkbox, radio, submit.
- Asociar campos con `<label>` (atributo `for` correspondiente al `id`).
- Usar `<textarea>`, `<select>`, `<option>` y `<button>`.
- Aplicar validación nativa: `required`, `pattern`, `min`/`max`, `minlength`/`maxlength`.
- Agrupar campos con `<fieldset>` y `<legend>`.

## Temas

- `<form>`: `action`, `method` (GET/POST)
- Tipos de `<input>`: text, email, password, number, date, checkbox, radio, submit
- `<label>`, `<textarea>`, `<select>`, `<option>`, `<button>`
- Validación nativa: `required`, `pattern`, `min`/`max`, `minlength`/`maxlength`
- `<fieldset>` y `<legend>`

## Ejercicio: Formulario de registro con validación nativa

1. **Crea un archivo** `registro.html` con la estructura mínima del documento. Añade un `<h1>` con el título "Registro de cuenta".
2. **Crea un `<form>`** con `action="#"` y `method="post"`. Cada campo debe llevar un `<label for="...">` asociado a su `<input id="...">`. Configura los siguientes campos obligatorios (`required`):
   - name="nombre" → `<input type="text" minlength="2">`
   - name="email" → `<input type="email">`
   - name="password" → `<input type="password" minlength="8" pattern="(?=.*\d)(?=.*[A-Z]).{8,}">` (mín. 8, una mayúscula y un dígito)
3. **Añade un `<fieldset>`** con un `<legend>` "Tipo de cuenta" que contenga 2 `<input type="radio" name="cuenta" value="personal|empresa" required>`. Con los radio el navegador exige seleccionar uno solo del grupo.
4. **Añade un `<select>`** "País" con 3 `<option>` y un `<textarea>` "Comentarios" con `maxlength="200"`. Añade un `<input type="checkbox" name="terminos" required>` con label "He leído los términos", y un `<button type="submit">Registrar</button>`.
5. **Prueba la validación**: intenta enviar el formulario vacío (deben aparecer mensajes nativos), introduce un email inválido, una contraseña débil y sin marcar los términos — el navegador debe bloquear el envío hasta cumplir todas las reglas.

## Recursos

- [MDN — Formularios web](https://developer.mozilla.org/es/docs/Learn/Forms) (placeholder)
- [MDN — Validación de formularios](https://developer.mozilla.org/es/docs/Learn/Forms/Form_validation) (placeholder)
- [web.dev — Forms](https://web.dev/learn/html/forms) (placeholder)