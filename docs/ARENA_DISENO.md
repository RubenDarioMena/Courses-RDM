# Documento de diseño — Arena Factory

**Estado:** primera versión jugable, publicada.  
**Repositorio:** `RubenDarioMena/Courses-RDM`.  
**Versión de referencia:** `720ec1d`, publicada en [Arena Factory](https://rubenmena-cursos.netlify.app/arena/).  
**Audiencia inicial:** personas curiosas que aprenden con rapidez, pueden investigar y quieren entender programación construyendo sistemas.

Este documento reúne la motivación del reinicio, las decisiones de producto, el diseño actual y las ideas futuras planteadas en la conversación. Las secciones de futuro describen posibilidades, no compromisos de implementación.

## Visión

Arena es un juego de navegador sobre programar y ampliar una fábrica persistente. El jugador construye máquinas y cintas con cámara y ratón, las controla con código y observa cómo sus instrucciones transforman el mundo. La fábrica es el problema que se puede explorar, probar, consultar y optimizar. El objetivo del producto es competir por el tiempo de aprendizaje de quien hoy puede elegir plataformas interactivas como Brilliant o boot.dev. La apuesta de Arena es conectar cada concepto con un sistema visible y manipulable, con código real y margen para investigar.

La primera versión prioriza JavaScript como lenguaje principal de la fábrica y PostgreSQL como herramienta para trabajar con sus datos. La pantalla se centra en el mundo de juego: el objetivo, el código, la referencia y los mensajes están agrupados en un panel que se puede plegar, desplazar plegado y redimensionar abierto.

## Por qué se reinició

El prototipo anterior enseñaba Python mediante ejercicios organizados como práctica guiada, reto y misión, con una escena SVG. Al probarlo como estudiante aparecieron problemas de experiencia:

- La escena cambiaba en saltos. No mostraba claramente el trayecto entre una instrucción y sus consecuencias.
- Los cambios visuales no siempre explicaban la relación entre los valores del programa y el mundo.
- La salida de comunicaciones y los errores eran pequeños y, a veces, poco claros.
- Algunos ejercicios se repetían y hasta los retos dejaban poco espacio para elegir una estrategia.
- La interfaz, la salida de código y el ritmo de la misión competían por la atención.

El aprendizaje principal es que el dibujo debe representar una simulación que avanza con continuidad, no limitarse a cambiar de aspecto cuando termina el programa. Un error también tiene que producir un estado legible: una máquina puede esperar, bloquear una salida o quedarse sin insumos, y el alumno debe poder averiguar por qué.

Por eso se decidió reconstruir Arena como fábrica persistente, separando las reglas del mundo de su representación visual. La versión anterior queda en el historial Git (`e66c3ad`); no define los requisitos ni el currículo de esta nueva etapa.

## Personas y alcance

La experiencia actual está diseñada primero para ordenador con teclado y ratón, sin personaje controlable. El tutorial es breve y se puede omitir. Después de la introducción, la fábrica queda abierta para construir e investigar; los escenarios cerrados se pueden reservar para enseñar una mecánica concreta.

La primera versión no presupone un sistema de cuentas. Conserva datos en el navegador y permite exportar e importar una sesión portátil. El usuario puede continuar en otro navegador u ordenador al transferir ese archivo.

## Pilares de diseño

### El programa y la fábrica cuentan la misma historia

La simulación es la fuente del estado. El dibujo lee ese estado; no inventa uno propio. Materiales, entradas, salidas, existencias, producción y entregas deben concordar con el código, incluso cuando hay un error o un atasco.

La ejecución es observable y controlable: pausa, reanudación, varias velocidades, avance manual del reloj de simulación y resaltado de las instrucciones instrumentadas. Los materiales siguen trayectos y cambian de máquina gradualmente. Un mensaje de error debe indicar qué ocurrió, dónde ocurrió y qué dato de la fábrica ayuda a entenderlo.

### Orientar sin resolver cada problema

La audiencia inicial puede investigar. Las instrucciones y pistas sirven para descubrir los controles, los identificadores y los conceptos disponibles; no deben prescribir toda la solución. Una introducción breve puede mostrar un primer ciclo completo y dejar al jugador decidir cómo lograr sus objetivos posteriores.

El contenido futuro debe cambiar el tipo de razonamiento: predecir el estado, construir un flujo, reparar una condición, reducir un cuello de botella o automatizar un pedido. Los retos deberían admitir soluciones y estrategias diferentes, con restricciones comprensibles.

### Legibilidad antes que espectáculo

Los mensajes, el código y los resultados SQL tienen que poder leerse en un portátil a escala normal. El color y el resplandor destacan actividad y selección; el contraste entre máquinas y cintas mantiene legible la fábrica. Cada animación debe explicar movimiento o estado.

## Dirección visual e interacción

Las imágenes compartidas de «Byte Factory» sirven como referencia de composición y tono, no como una plantilla literal. De ellas se retienen la vista amplia de la línea industrial, el movimiento de los materiales, el color neón y el panel flotante de control. Arena se inclina hacia una versión más limpia y legible:

- Terreno superior ligeramente inclinado, con baldosas azules grandes y poco ruido.
- Máquinas de volúmenes geométricos simples y siluetas distintas.
- Neón en los estados activos, las rutas, las selecciones y los avisos. El brillo se reserva para aquello que debe captar atención.
- Panel de control reubicable y plegable, superpuesto al mundo; herramientas de construcción en una barra inferior.
- Cámara manejada con ratón: arrastrar para mover, rueda para acercar y alejar. Sin avatar.

PixiJS dibuja el mundo con objetos 2D modulares. Las máquinas se construyen por partes programáticas y se animan por estado. Los assets generados por imagen son una posibilidad futura para añadir material, iluminación o piezas ilustradas; primero deben respetar una guía común de escala, paleta, perspectiva y capas. No se depende hoy de sprites generados: la primera versión usa gráficos hechos por código.

## Modelo de juego actual

El terreno mide 30 × 20 celdas. Se puede construir, girar, seleccionar e inspeccionar:

- **Extractor:** produce cobre.
- **Cinta:** transporta una pieza hacia su flecha de salida.
- **Fundidor:** convierte cobre en placas.
- **Ensamblador:** consume dos placas para fabricar un circuito.
- **Almacén:** guarda los materiales recibidos.

La fábrica inicial trae una línea para observar. Las cintas y almacenes funcionan al colocarlos; las demás máquinas requieren activación. Las salidas bloqueadas y la falta de insumos se reflejan en su estado. El objetivo abierto de introducción es producir ocho circuitos; una vez logrado, el jugador puede seguir ampliando la fábrica.

La cámara puede ampliarse y reubicarse. Los atajos actuales son `1–6` para herramientas, `R` para girar y `Esc` para seleccionar. La barra inferior controla la construcción; el panel contiene editores de JavaScript y SQL, guía y registro de actividad.

## Progresión de aprendizaje

El punto de partida es enseñar conceptos que aparecen en muchos lenguajes con JavaScript como primera sintaxis concreta. La progresión debe introducir cada idea antes de pedirla y conectarla con una necesidad de la fábrica, no limitarse a repetir el mismo formato de ejercicio. Una secuencia inicial posible es estado y valores, expresiones y cálculos, condiciones, colecciones y bucles, funciones y reutilización, y después combinar esas herramientas para automatizar objetivos. SQL abre un camino paralelo de consultas y relaciones sobre datos del mundo. Esta secuencia es una orientación curricular, no una lista de misiones implementadas.

La cantidad de guía puede bajar a medida que el jugador adquiere herramientas. Conviene alternar preguntas de predicción, construcción, diagnóstico, investigación con SQL y optimización. La evaluación futura debe comprobar el resultado y la capacidad que se quería aprender, aceptando soluciones diferentes y evitando requisitos de sintaxis innecesarios. El prototipo actual tiene una introducción y un objetivo abierto; todavía no implementa esta ruta curricular.

## Lenguajes y PostgreSQL

### JavaScript

JavaScript es el primer lenguaje de control de las máquinas. Su API educativa permite activarlas, detenerlas, consultar existencias y el estado de las máquinas, esperar tiempo simulado, ajustar la velocidad y entregar pedidos:

```js
await fabrica.activar("extractor_1");
await fabrica.activar("fundidor_1");
await fabrica.activar("ensamblador_1");

while (await fabrica.inventario("circuito") < 8) {
  await fabrica.esperar(1);
}

await fabrica.desactivar("extractor_1");
await fabrica.entregar(1);
```

El código se ejecuta en un Web Worker para que los bucles o errores no congelen la interfaz. El seguimiento señala instrucciones de nivel superior y funciones `async`; las funciones síncronas conservan su semántica, pero no muestran cada paso interno. El avance manual mueve el reloj de la fábrica medio segundo: no es un depurador completo de JavaScript.

El worker y los límites de instrucciones son recursos educativos para código escrito por el jugador. No constituyen un entorno seguro para ejecutar código arbitrario de terceros. La importación restaura el borrador, pero nunca ejecuta automáticamente el código.

### PostgreSQL

PostgreSQL corre localmente en el navegador con PGlite, una implementación real de PostgreSQL compilada a WebAssembly. No hace falta una instancia remota para aprender consultas o gestionar el estado local de la fábrica.

Arena presenta cuatro tablas iniciales:

- `inventario(almacen, material, cantidad)`
- `maquinas(id, tipo, activa, producidas)`
- `produccion(id, segundo, maquina, material, cantidad)`
- `pedidos(id, material, cantidad, entregado)`

Inventario, máquinas e historial reflejan el mundo y se actualizan antes de cada consulta. Pedidos y tablas propias del alumno se guardan en la base. Una consulta puede añadir un pedido; `await fabrica.entregar(id)` comprueba que los materiales existan, los descuenta de almacenes y marca el pedido como entregado. Cambiar la columna `entregado` directamente en SQL no equivale a completar una entrega en la simulación.

Así, JavaScript enseña secuencias, decisiones y automatización; SQL explora el estado, filtra y agrupa registros, administra pedidos y prepara el terreno para un módulo de datos. En una consulta se muestran hasta 200 filas y se conserva un historial de hasta 2.000 eventos de producción.

## Persistencia, cuentas y alojamiento

El guardado local conserva la fábrica y los borradores cada pocos segundos. PostgreSQL conserva en IndexedDB los cambios de consultas y entregas. **Descargar sesión** genera un archivo JSON con el mundo, los editores, el progreso y una copia comprimida de la base de datos, incluidas las tablas creadas por el jugador. Importar comprueba el formato, prepara la base y abre la fábrica en pausa.

Los datos no se sincronizan entre dispositivos por sí solos. Sin una cuenta, el archivo descargado es la forma de trasladar o respaldar el progreso. La autenticación y sincronización en la nube quedan como decisiones futuras; no se ha elegido proveedor ni se debe prometer un plan gratuito concreto.

La web se publica en el proyecto Netlify existente `rubenmena-cursos`, conectado al repositorio `RubenDarioMena/Courses-RDM`. Los pushes a `main` despliegan el sitio en el dominio existente. En esta etapa Arena se sirve como web estática: la ejecución de JavaScript y PostgreSQL sucede en el navegador, y no hay backend requerido para el juego. Vercel se mencionó como alternativa, pero no hay razón decidida para migrar desde Netlify.

## Arquitectura actual

```text
Interfaz HTML/CSS ───────┐
                         ├─ modelo de fábrica ── eventos, materiales y pedidos
Mundo PixiJS ────────────┘                       │
                                                 ├─ runtime JavaScript en Worker
Editor SQL ─── PostgreSQL PGlite en Worker ─────┘
                    │
       IndexedDB y archivo portable
```

Archivos principales:

- `arena/factory/model.js`: reglas de la simulación, inventario y validación de sesiones.
- `arena/factory/world.js`: terreno PixiJS, máquinas, cámara, animaciones e interacción.
- `arena/factory/runtime-worker.js`: instrumentación y ejecución del código JavaScript.
- `arena/factory/database.js` y `database-worker.js`: esquema, sincronización del mundo y consultas SQL.
- `arena/factory/storage.js`: progreso local e importación/exportación.
- `arena/app.js`, `index.html` y `assets/arena.css`: composición, editores, paneles y controles.

## Lo implementado y comprobado

El commit de referencia reconstruyó Arena, retiró del producto nuevo el currículo anterior de Python/SVG e incorporó PixiJS, JavaScript, PGlite y editores de código. Mantiene intacta la portada y los cursos HTML en el alcance de esta etapa.

La primera versión comprobó la producción y conservación de materiales, atascos, construcción, giros, persistencia a mitad de un transporte, ejecución de JavaScript, PostgreSQL, consultas, pedidos y transferencia de tablas propias mediante el archivo portable. La comprobación automatizada terminó con nueve pruebas exitosas y compilación de producción. Después del push también se abrió el sitio publicado para comprobar que cargan JavaScript, PostgreSQL y las consultas en Netlify.

## Límites presentes

Esta versión prueba la dirección del producto; todavía no es una campaña completa de aprendizaje ni una fábrica económica de gran escala. Tiene un objetivo abierto, una receta principal y cinco tipos de elementos. No simula energía, costes, investigación, fabricación configurable, enemigos, logística avanzada ni múltiples sectores.

No hay login, sincronización remota, IA en el juego, lenguaje alternativo ni editor HTML/CSS. No se ha hecho una auditoría de accesibilidad completa, ni un sistema de depuración a nivel de expresión. La primera carga de PostgreSQL descarga y prepara varios megabytes de recursos incluidos en el sitio; conviene medir esa experiencia antes de ampliarlos.

## Posibilidades a futuro

Para retomar específicamente la campaña, consultar la [nota de Astra para la próxima sesión](NOTA_ASTRA_CAMPANA.md), que desarrolla una propuesta pedagógica a partir de este diseño.

Estas son extensiones propuestas durante la conversación o derivadas directamente de las decisiones aceptadas. Deben evaluarse con un prototipo y no se consideran alcance comprometido:

### Próxima etapa: que programar explique y cambie más

- Ampliar la API y las recetas de la fábrica: más materiales, divisores, combinadores, buffers, rutas alternativas y reglas de aceptación.
- Mostrar cada paso relevante con su instrucción y los valores observados; distinguir avance del reloj de juego y avance del programa.
- Convertir errores en diagnósticos que conecten línea, máquina, material, salida y solución investigable. Añadir controles para inspeccionar un paquete y seguir su ruta.
- Probar retos menos guiados que acepten distintas soluciones, con metas de producción y restricciones, y más variedad entre construir, reparar, predecir, consultar y optimizar.
- Incorporar escenarios prefabricados cuando enseñen una mecánica específica; conservar la fábrica principal persistente y de construcción libre.

### Lenguajes y datos

- Añadir otros lenguajes como adaptadores a un mismo mundo, con sintaxis y ejecución propias. No se decidió una lista ni se quiere traducir automáticamente un programa de un lenguaje a otro. La fábrica debe seguir siendo reconocible cuando se intercambia el lenguaje, mientras que cada lenguaje recibe su propia guía y ejercicios.
- Extender PostgreSQL con relaciones, reportes, colas de pedidos y análisis de eficiencia. Más adelante, enlazar SQL con máquinas que tomen decisiones a partir de consultas.
- Explorar HTML y CSS cuando haya terminales, paneles y pantallas de control que el jugador pueda diseñar. Sería un camino enfocado en interfaces, no otro control de las máquinas por defecto.

### Arte y presentación

- Generar conceptos y assets ilustrados con el generador de imágenes para máquinas, materiales, iconos y efectos, manteniendo las piezas animables separadas cuando corresponda.
- Preparar una guía de sprite y de animación para que materiales visuales programáticos e ilustrados conserven paleta, luz, cámara, escala y siluetas.
- Añadir variedad de sectores, materiales y edificios al mapa sin llenar el terreno de detalles que resten legibilidad.
- Considerar Three.js sólo si aparece una necesidad 3D concreta que mejore la comprensión o el juego. La base acordada hoy es 2D con PixiJS.

### Continuidad y publicación

- Evaluar identidad y sincronización en la nube si los jugadores quieren retomar la fábrica en distintos dispositivos. Elegir antes el proveedor, permisos, políticas de retención y costes; mientras tanto, conservar y probar el archivo portable.
- Estudiar los costes de backend o alojamiento sólo cuando se defina qué dato sale del navegador y por qué. Netlify sigue siendo la publicación elegida para la web estática.
- Añadir tablet o móvil únicamente tras consolidar la experiencia de escritorio de teclado y ratón.
- Considerar IA opcional para generar datos o variantes de misión, manteniendo misiones curadas que funcionan sin credenciales. Si vuelve a plantearse, aplicar BYOK sin guardar claves en archivos, almacenamiento local, exportaciones ni logs; no permitir que la IA escriba HTML o JavaScript ejecutable para la página.

## Criterios para decidir la próxima inversión

1. ¿El jugador ve qué instrucción produjo la acción y puede seguir el objeto hasta su destino?
2. ¿Puede encontrar y corregir una causa con mensajes claros, aun sin IA?
3. ¿La fábrica muestra el estado real después de un error, una salida bloqueada y una importación?
4. ¿El reto deja margen para pensar, probar estrategias y explicar el resultado?
5. ¿El cambio añade una idea de programación o datos que el jugador puede usar más adelante?
6. ¿La interacción y los mensajes siguen siendo legibles en una pantalla de portátil?
7. ¿Se conserva el progreso portable y funciona la publicación en el Netlify existente?
