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

### Taller CAD

Se inició un editor independiente de piezas 3D en `/cad/`, con OpenCascade.js `opencascade.full` en un worker y Three.js para representar los resultados. El objetivo son los navegadores de Windows, sin login ni servidor de geometría. Leer `docs/CAD_WEB.md` antes de continuar este módulo. No dedicar esta etapa a controles específicos de macOS.

La primera base incluye primitivas, extrusiones de perfiles poligonales, booleanas, redondeos, transformaciones, proyectos JSON portables e intercambio STEP/STL. Mantener la geometría BRep separada del render, recuperar el último estado válido ante errores y conservar fuentes/avisos de las bibliotecas al distribuir WASM. STL se conserva como malla; las operaciones sobre sólidos requieren BRep. La distribución `full` no equivale a toda la API C++ de OCCT ni a la aplicación FreeCAD.

Conservar las rutas y el funcionamiento de Arena, portada y cursos. Las pruebas Windows usan Chrome, Edge y Firefox en `.github/workflows/cad-windows.yml`; `npm run test:cad:browser` comprueba el paquete compilado.

La manipulación directa usa previsualización Three.js y un único commit OCCT al terminar el gesto. Conservar identidad y dependencias al transformar piezas. Los croquis aceptan planos de origen y caras BRep planas; círculos exactos, polígonos y operaciones de añadir/cortar. El apoyo por índice de cara aún no resuelve la identificación topológica general; documentar ese límite y preservar el último estado válido. La caché Vite de CAD está separada en `node_modules/.vite-cad`.

### Continuidad del diseño

Las decisiones anteriores describen la base implementada en PixiJS. Para la evolución de Arena, leer `docs/CODEMAGEDDON_GDD.md` y `docs/CODEMAGEDDON_ARTE.md` (13 de octubre de 2026): robots y sensores, principiantes con microtutoriales y conceptos desbloqueables, y Godot como dirección objetivo pendiente de prueba técnica. La recomendación es GDScript interno y JavaScript del jugador. No confundir esta documentación con una migración ya realizada ni recuperar propuestas anteriores que contradigan las decisiones recientes. Se mantienen los límites de conservación de materiales, importación sin autoejecución y continuidad del sitio/cursos.

### Comandos de la base actual

Node.js >=22; `npm ci`, `npm run dev`, `npm test`, `npm run build`.
Preview: http://localhost:4173/arena/ . Para comprobar el paquete: `npm run preview` después de compilar (con otro PORT si está activo el servidor de desarrollo).

Repositorio autorizado: `RubenDarioMena/Courses-RDM`. Conservar el sitio Netlify `rubenmena-cursos` y su dominio. Los pushes a `main` compilan y publican automáticamente; el usuario autorizó esa publicación dentro del alcance de la tarea. No migrar a otro alojamiento sin necesidad.

Ver README.md, docs/ARENA_DISENO.md y docs/CLOUD_HANDOFF.md para diseño, arquitectura, límites y continuidad.
