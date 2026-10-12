# Cursos y Arena Factory

Trabaja en Arena dentro del proyecto de cursos. La portada y los cursos HTML existentes deben seguir funcionando; su rediseño queda fuera del alcance actual.

## Decisiones aceptadas

- Arena se reinició como un juego de fábrica 2D para ordenador, teclado y ratón. Cámara libre, sin personaje.
- PixiJS para el mundo; gráficos programáticos modulares, estilo limpio, piso azul y acentos de neón. Assets ilustrados opcionales más adelante.
- JavaScript es el lenguaje de control inicial. PostgreSQL real, mediante PGlite en un worker, administra datos y pedidos. Otros lenguajes y HTML/CSS se consideran después.
- Fábrica persistente, construcción libre y programación. Introducción mínima y omisible para estudiantes capaces de investigar.
- La simulación es independiente del renderizado. Los materiales deben conservarse y moverse de forma continua, también con programas incorrectos. Pausa y avance manual actúan sobre el mismo estado.
- Textos, documentación y errores en español; mensajes y código legibles en un portátil.
- Sin login por ahora. Guardado local y archivo de sesión portable que incluye fábrica, código, progreso y base de datos con tablas propias.
- No ejecutar automáticamente el JavaScript importado. El worker es un entorno educativo para código del propio alumno, no un sandbox de seguridad para código de terceros.
- La versión anterior de Python/SVG permanece en el historial Git (commit e66c3ad). No recuperar su currículo como requisito de la nueva Arena.
- No copiar ni modificar los contenidos de midudev.

## Desarrollo y publicación

Node.js >=22; `npm ci`, `npm run dev`, `npm test`, `npm run build`.
Preview: http://localhost:4173/arena/ . Para comprobar el paquete: `npm run preview` después de compilar (con otro PORT si está activo el servidor de desarrollo).

Repositorio autorizado: `RubenDarioMena/Courses-RDM`. Conservar el sitio Netlify `rubenmena-cursos` y su dominio. Los pushes a `main` compilan y publican automáticamente; el usuario autorizó esa publicación dentro del alcance de la tarea. No migrar a otro alojamiento sin necesidad.

Ver README.md y docs/CLOUD_HANDOFF.md para arquitectura, límites y continuidad.
