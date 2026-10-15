# Cursos y Arena Factory

Sitio: https://rubenmena-cursos.netlify.app · Juego: https://rubenmena-cursos.netlify.app/arena/
Repositorio: https://github.com/RubenDarioMena/Courses-RDM

Arena es una fábrica 2D persistente para aprender programación investigando. JavaScript controla las máquinas; PostgreSQL consulta la producción y administra pedidos. La portada y los cursos HTML anteriores se conservan.

Taller CAD está disponible en [rubenmena-cursos.netlify.app/cad/](https://rubenmena-cursos.netlify.app/cad/): editor independiente de piezas 3D, sin login, basado en la distribución completa de OpenCascade.js en un worker. Permite crear sólidos, extruir perfiles, combinar, redondear, transformar y abrir/exportar STEP y STL. Conserva el documento paramétrico localmente y en un archivo JSON portable. [Arquitectura, alcance y continuidad de CAD](docs/CAD_WEB.md).

Interacción CAD: G activa movimiento libre y por ejes; R muestra anillos de giro. Dibujar perfil permite elegir XY/XZ/YZ o una cara plana y crear rectángulos/cuadrados, círculos y contornos de líneas para extruir, añadir o cortar. Los vértices y radios se ajustan con el ratón; cada gesto conserva deshacer/rehacer.

[Documentos CAD de progreso y planificación](docs/cad/README.md): informe de entrega, base de producto/desarrollo y propuesta de separación a un proyecto independiente. Los documentos de planificación son provisionales y están pendientes de revisión con el usuario.

## Diseño del producto

Diseño de la siguiente etapa: [GDD inicial de Codemageddon](docs/CODEMAGEDDON_GDD.md), con robots programables, sensores, pruebas de movimiento y Godot como dirección objetivo pendiente de validación. [Guía de arte y diseño paramétrico](docs/CODEMAGEDDON_ARTE.md).

El juego implementado sigue siendo Arena con PixiJS: [diseño y arquitectura del prototipo actual](docs/ARENA_DISENO.md). El nuevo GDD no implica que se haya realizado una migración.

## Desarrollo

Node.js 22 o posterior:

```sh
npm ci
npm run dev
npm test
npm run build
```

Preview: http://localhost:4173/arena/ . `npm run preview` sirve el paquete dist; usa `PORT=4174 npm run preview` si el puerto de desarrollo está ocupado.

Taller CAD: http://localhost:4173/cad/ . Las pruebas de navegador se ejecutan con `npm run test:cad:browser` después de compilar; en Windows requieren Chrome, Edge y `npx playwright install firefox`. GitHub Actions verifica los tres navegadores en trabajos independientes.

Vite compila Arena y empaqueta PixiJS, CodeMirror, el runtime JavaScript y PGlite. PostgreSQL se carga al abrir Datos, entregar un pedido o descargar una sesión; no hay CDN de ejecución ni backend obligatorio. Las fuentes tipográficas usan Google Fonts con fallback local.

## Primera experiencia jugable

- Terreno de 30 × 20 celdas. Construir extractores, cintas, fundidores, ensambladores y almacenes. R gira la salida; Esc vuelve a selección. Arrastra el terreno y usa rueda para acercar/alejar.
- Línea inicial de cobre → placas → circuitos. El alumno activa máquinas desde el código o el inspector y puede extender la fábrica.
- Máquinas independientes, transporte continuo, buffers, bloqueo de salidas y conservación de materiales. No se simula energía ni economía todavía.
- Pausa, velocidades 0.5×/1×/2× y avance manual de medio segundo de simulación. Este avance no es un depurador de JavaScript por instrucción.
- Panel plegable que puede arrastrarse plegado y redimensionarse abierto. Editores JavaScript/SQL, referencia y registro de actividad.
- Introducción omisible y objetivo inicial abierto: producir ocho circuitos. Después continúa la construcción libre; todavía no hay campaña extensa ni evaluación curricular.

## API JavaScript

```js
await fabrica.activar("extractor_1");
await fabrica.activar("fundidor_1");
await fabrica.activar("ensamblador_1");

while (await fabrica.inventario("circuito") < 8) {
  await fabrica.esperar(1);
}
await fabrica.desactivar("extractor_1");
await fabrica.entregar(1);
console.log("Pedido completado");
```

También están disponibles `maquinas()` y `velocidad(0.5 | 1 | 2)`. Las órdenes requieren await. Las instrucciones del nivel superior y funciones async se señalan en el editor; las funciones síncronas conservan su semántica pero no tienen seguimiento interno. El worker se termina si permanece cinco segundos sin comunicarse y admite hasta 20.000 llamadas por programa. Detener el programa conserva las máquinas activadas; pausa detiene el reloj de la fábrica. Una operación SQL que ya empezó puede terminar aunque se detenga el programa.

El código se ejecuta en un Web Worker separado de la interfaz. No se presenta como sandbox de seguridad: es código escrito por el propio alumno. Los archivos importados no se ejecutan automáticamente. No hay claves de IA, login ni código generado por terceros en esta primera versión.

## PostgreSQL

PGlite corre en otro worker. Tablas:

- `inventario(almacen, material, cantidad)`
- `maquinas(id, tipo, activa, producidas)`
- `produccion(id, segundo, maquina, material, cantidad)`
- `pedidos(id, material, cantidad, entregado)`

Las tres primeras son proyecciones del mundo, refrescadas antes de consultar/exportar; no deben alterarse de estructura. Los últimos 2.000 eventos de producción están disponibles. Pedidos y las tablas propias sí se conservan. Las consultas usan PostgreSQL real y se ejecutan en una transacción; se muestran hasta 200 filas. `await fabrica.entregar(id)` valida las existencias, descuenta el material y marca el pedido como entregado. Actualizar manualmente `entregado` con SQL no descuenta material; usar la API para una entrega física.

## Sesiones

La fábrica y los editores se guardan cada tres segundos en localStorage. La base de datos se guarda en IndexedDB después de consultas y entregas. Descargar sesión genera JSON con una instantánea del mundo, los editores, el progreso y una copia comprimida de PostgreSQL (incluye tablas propias). Importar valida los datos y prepara la base antes de sustituir el estado; entra en pausa y no ejecuta código. Se admiten archivos de hasta 40 MB.

Sin sincronización entre dispositivos ni cuentas. Si el navegador borra sus datos se pierde el guardado local; el archivo descargado permite recuperarlo. Se necesita el mismo origen para recuperar un guardado local (localhost y producción tienen guardados independientes).

## Arquitectura

```text
arena/
  index.html, app.js, assets/arena.css   Interfaz y coordinación
  factory/model.js                    Simulación determinista y validación
  factory/world.js                    Mundo PixiJS, cámara, piezas móviles
  factory/runtime-worker.js           JavaScript, seguimiento y mensajes
  factory/database.js                 Esquema y proyecciones PostgreSQL
  factory/database-worker.js          Ejecución SQL y copias de base de datos
  factory/storage.js                  Sesiones locales y portables
scripts/                              Desarrollo y build conservando los cursos
 tests/                               Simulación, runtime y persistencia SQL
```

## Netlify

El sitio existente `rubenmena-cursos` compila con Node.js 22 y `npm run build`; publica dist. Cada push a main despliega automáticamente. Arena es estática: no necesita funciones para ejecutar JavaScript o PostgreSQL. No incluye autenticación. La versión Python/SVG anterior se puede recuperar desde Git en `e66c3ad`.
