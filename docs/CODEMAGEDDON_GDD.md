# Codemageddon — GDD inicial

- **Versión:** 0.1 · 13 de octubre de 2026.
- **Estado:** diseño para el siguiente prototipo; no describe funcionalidades ya implementadas.
- **Nombre:** Codemageddon es provisional; su disponibilidad no se ha verificado.
- **Base jugable actual:** [Arena en Netlify](https://rubenmena-cursos.netlify.app/arena/), documentada en [ARENA_DISENO.md](ARENA_DISENO.md).
- **Documento complementario:** [Arte, diseño paramétrico y herramientas](CODEMAGEDDON_ARTE.md).

Este documento recoge las decisiones de la conversación del 12–13 de octubre y la propuesta técnica resultante. **Acordado** significa decidido con Rubén; **propuesta** identifica recomendaciones todavía ajustables; **por probar** significa que necesitamos una experiencia jugable para decidir. Las ambiciones de largo plazo orientan el proyecto, pero no son requisitos del próximo prototipo.

## 1. Visión y público

Codemageddon es un juego de automatización industrial donde el jugador programa robots, produce circuitos electrónicos y amplía una fábrica capaz de construir nuevas máquinas y robots. La programación transforma órdenes manuales en sistemas autónomos. Sus errores tienen consecuencias visibles: viajes vacíos, carga derramada, rutas obstruidas y, más adelante, averías.

La fantasía narrativa propuesta es encarnar una inteligencia artificial creada para desarrollar fábricas. No hay un avatar único: los robots son la presencia física del jugador. Una cámara libre permite inspeccionar, construir y dar órdenes con teclado y ratón.

El público incluye principiantes en programación. La enseñanza sucede mediante microtutoriales ligados a necesidades del mundo, con funciones conocidas al principio y nuevos conceptos desbloqueados progresivamente. El objetivo es un juego que apetezca dominar; el aprendizaje es parte de ese dominio.

**Prioridad acordada:** satisfacer bien a quienes disfrutan programar. El modo sin código se conserva como idea para ampliar público, sin balancearlo ni implementarlo en esta fase. Dar órdenes manuales sigue siendo una interacción necesaria, pero no implica prometer una campaña completa sin programar.

## 2. Pilares

1. **El código tiene consecuencias físicas legibles.** Cada orden se relaciona con un robot, un objeto, una acción y un resultado observable.
2. **Pensar bien importa más que escribir rápido.** El jugador puede editar con la simulación pausada o en marcha. No se le penaliza por tiempo real de reflexión.
3. **La autonomía se construye.** Primero se controla un robot; después se copia una rutina, se reutiliza y se generaliza a grupos.
4. **Los sensores tienen una razón de existir.** El robot no corrige silenciosamente toda orden equivocada. Consultar el entorno permite evitar problemas reales.
5. **Experimentar debe ser recuperable.** Al principio predomina el desorden reparable. Los daños graves no son el resultado habitual del primer error.
6. **La web es una plataforma indispensable.** El desarrollo debe seguir siendo testeable en Netlify, con una futura edición de escritorio para Steam.

## 3. Decisiones registradas

| Tema | Dirección | Estado |
| --- | --- | --- |
| Control | Sin avatar; robots manuales al inicio y programables después | Acordado |
| Primera producción | Circuitos electrónicos; con componentes comprados permiten fabricar robots | Acordado |
| Proveedores | Existencias y precios estables al principio | Acordado |
| Recepción y entregas | Bahía de proveedores y compras inmediatas en la primera prueba | Propuesta; los plazos no se han decidido |
| Arranque | Minilínea y pocos robots incluidos, más presupuesto para personalizar | Acordado |
| Zonas | El presupuesto inicial varía según la zona | Acordado; diferencias y compensaciones pendientes |
| Construcción inicial | Instantánea durante la preparación | Acordado |
| Construcción posterior | Espera breve y automática | Acordado; duración por probar |
| Programación | Un robot primero, copia de rutinas y luego grupos; objetos con identidad estable | Acordado |
| Conceptos | Se desbloquean al progresar | Acordado; árbol y condiciones pendientes |
| Sensores | Sensor básico de movimiento incluido | Acordado; alcance y lectura exactos por probar |
| Movimiento | Comparar órdenes por destino y movimientos por pasos | Por probar; no hay ganador decidido |
| Errores | Consecuencias físicas, con daños posibles pero poco frecuentes al inicio | Acordado |
| Editor | Ayuda sobre funciones y resaltar el objeto referenciado por el cursor de texto | Acordado |
| Motor futuro | Godot es la dirección preferida tras considerar modelos 3D, mezcla de estilos y VFX | Orientación de Rubén; migración pendiente de validación |
| Lenguajes | GDScript para implementar Godot; JavaScript para el jugador | Recomendación técnica, elegida por menor esfuerzo estimado entre JS y Python |
| Modo sin código | Posibilidad futura, fuera del balance inicial | Acordado |

## 4. Inicio y ciclo de juego

### Preparación

El jugador recibe una minilínea funcional y unos pocos robots. Puede gastar presupuesto adicional en adaptar el arranque. Todo lo colocado en esta fase aparece construido: es la instalación inicial, no producción gratis durante una partida.

La selección de zona determinará el presupuesto. **Propuesta de alcance:** probar primero una zona y un presupuesto; añadir alternativas cuando sepamos qué decisiones de compra son interesantes. No se han decidido cantidad de robots, importes, tamaño de parcela ni condiciones de cada zona.

### Operación

El ciclo propuesto para el primer tramo es:

**Comprar insumos → transportarlos → fabricar circuitos → combinar circuitos con piezas compradas → fabricar otro robot → automatizar más trabajo.**

Los robots pueden mover materiales de una máquina a otra antes de que exista una línea de cintas completa. Las cintas consolidan trayectos permanentes; aún falta comprobar cuándo se introducen y cuánto transporte inicial realizan los robots.

Los proveedores empiezan siendo previsibles. «Existencias estables» no fija todavía un catálogo, cantidades infinitas ni una frecuencia de reposición. La primera prueba debe asegurar insumos suficientes para completar y repetir el aprendizaje.

Vender parte de la producción para financiar compras es una propuesta del texto original. Deben definirse margen, precios de venta y reserva de circuitos para expansión antes de balancear la economía. No se introducen fluctuaciones de mercado ni éxito comercial aleatorio en el primer tramo.

### Tiempo

Una vez iniciada la operación, construir requiere una espera breve automática. El prototipo no exige que un robot lleve materiales a cada obra. El robot sí puede transportar los insumos de producción.

Pausa y avance manual utilizan el mismo reloj de simulación que el funcionamiento normal. La preparación inicial y la pausa son estados distintos: pausar no convierte las obras posteriores en instantáneas. La duración de construcción debe explicar una transformación o dar ritmo; se ajustará si produce esperas vacías.

**Propuesta:** permitir elegir si abrir la terminal pausa automáticamente; mostrar siempre el estado del reloj. Ejecutar código mientras está pausado no debe mover objetos ni reanudar a escondidas. El comportamiento de edición, aplicación de cambios y reanudación debe quedar explícito.

## 5. Robots, órdenes y sensores

### Identidad y reutilización

Cada robot es un objeto programable con un identificador estable, visible en el mundo y en el editor. La identificación sobrevive al guardado y no debe cambiar al eliminar otra unidad. Copiar un programa y sustituir el robot es una operación válida antes de aprender abstracciones.

Sintaxis ilustrativa, todavía no implementada ni cerrada:

```js
await robots[1].recoger("recepcion");
await robots[1].entregar("ensambladora");
```

`1` representaría una identidad, no una posición que cambia al reordenar una lista. Los alias de máquinas también necesitan una identidad subyacente. La API final dependerá de la prueba de movimiento y de cómo se presenten las acciones asíncronas a principiantes.

Posteriormente una rutina podrá recibir un robot y sus destinos como parámetros; los grupos permitirán asignar la misma tarea a varias unidades. No se ha decidido aún si cada chip conserva una copia del código o referencia una rutina compartida. La primera versión debe ofrecer una duplicación comprensible, sin exigir abstracciones avanzadas.

### Control manual

Seleccionar un robot y hacer clic sobre un destino representa que alguien lo dirige manualmente. Las órdenes manuales y las programadas deben usar las mismas reglas de carga, alcance, duración y consecuencias. No habrá una versión «inteligente» por clic y otra que falle artificialmente al programarla.

Está pendiente cómo una orden manual interrumpe o sustituye una rutina activa. **Propuesta:** tomar control manual suspende el programa de ese robot y lo indica; nunca competir silenciosamente por una unidad.

### Sensores

El robot inicial incorpora un sensor básico de movimiento. Su alcance, orientación, tipos de obstáculo y forma de consultar la lectura se decidirán con las pruebas. Que exista un sensor no implica que toda orden reaccione automáticamente a él.

Sensores de carga, espacio en un destino, materiales disponibles y peligros son posibles desarrollos. Solo el sensor básico de movimiento está confirmado como equipamiento inicial. Cada sensor futuro debe permitir una decisión concreta; no añadir lecturas sin una necesidad de juego.

La información del inspector puede ayudar a entender el error aunque todavía no exista una consulta programática de ese dato. La distinción entre lo que ve el jugador y lo que sabe el robot debe ser consistente y explicable.

### Errores físicos

| Orden y situación | Consecuencia propuesta | Aprendizaje |
| --- | --- | --- |
| Recoger en un punto vacío | Movimiento de recogida sin carga; el programa puede continuar | Comprobar disponibilidad y carga |
| Viajar sin haber recogido | Viaje vacío con coste de tiempo simulado | Inspeccionar el resultado de una acción |
| Descargar en una entrada llena | Material al suelo, recuperable | Consultar capacidad antes de entregar |
| Entregar donde no corresponde | Carga depositada en un lugar inútil o rechazada físicamente | Validar destino y tipo de material |
| Encontrar un obstáculo | Resultado definido por cada variante de movimiento | Usar el sensor y decidir cómo reaccionar |
| Insistir en una situación peligrosa | Posible avería en fases posteriores | Prevención y gestión de riesgos |

Estas reglas se refieren a las acciones de los robots; no sustituyen automáticamente las reglas actuales de bloqueo de todas las máquinas y cintas.

Los materiales caídos conservan identidad, cantidad y posición. Una animación no puede crear o borrar inventario. Destruir o transformar material, si se incorpora, debe ser una regla explícita con registro, no una pérdida accidental del motor físico.

**Propuesta de equilibrio:** daños ligados a causas visibles y exposición, sin una tirada arbitraria por cada orden. Introducir primero una equivocación segura, luego su diagnóstico y finalmente cómo prevenirla. No exigir condiciones o sensores todavía bloqueados para evitar una derrota inevitable.

Los errores de sintaxis y los identificadores inexistentes son distintos del fallo físico: deben señalar el problema del programa. Un intento de recoger en un sitio vacío válido es una acción del mundo, no necesariamente una excepción que termine la rutina.

## 6. Experimento de movimiento

Se probarán ambas variantes; esto no compromete a mantener dos modos finales.

| | A: órdenes por destino | B: órdenes por pasos |
| --- | --- | --- |
| Acción del jugador | Indicar una máquina o punto | Avanzar, girar y comprobar delante |
| Navegación | El juego calcula un trayecto | El código describe el desplazamiento |
| Oportunidad | Centrarse en logística y estados | Hacer tangible la relación entre sensor y movimiento |
| Riesgo | Que la navegación resuelva todos los problemas y quite valor al sensor | Que escribir trayectos sea repetitivo y escale mal |

**Escenario común propuesto:** una fuente de insumos, una máquina receptora, un obstáculo fijo y un obstáculo introducido durante el transporte. Después se duplica la tarea en otro robot. Misma carga, velocidad, capacidad, cámara y objetivo en ambas variantes.

Para A se probará una ruta que resuelve obstáculos fijos, pero cuya reacción a un cambio requiere intervención del programa. Es una hipótesis, no una regla ya aprobada. La prueba debe dejar claro qué detecta el robot y qué resuelve la navegación.

Evaluaremos si el jugador puede predecir la acción, explicar un fallo, corregirlo, usar el sensor con intención y extender la solución a otra unidad. Registraremos también clics repetitivos, correcciones tediosas y deseo de seguir jugando. La rapidez para escribir no será la única ni la principal medida.

Un pequeño grupo de principiantes y personas con experiencia probará ambas variantes; alternar el orden evita que la segunda gane solo por aprendizaje previo. Cantidad de testers y objetivos numéricos quedan pendientes. Una combinación posterior solo se adoptará si las pruebas justifican su complejidad.

## 7. Aprendizaje y editor

### Microtutoriales y desbloqueos

La referencia de Rubén es la presentación gradual de funciones y conceptos de *The Farmer Was Replaced*. Se toma como inspiración de ritmo; no se ha realizado aquí un análisis exhaustivo ni se copiará contenido.

La siguiente secuencia es una propuesta, no un currículo cerrado:

| Necesidad visible | Herramienta que se presenta | Resultado que comprobar |
| --- | --- | --- |
| Hacer una primera entrega | Funciones de acción y secuencia | Relacionar instrucción y movimiento |
| Entender un viaje vacío | Mensajes y lectura de un dato | Explicar qué ocurrió |
| Repetir transportes | Bucle | Mantener una ruta sin nuevos clics |
| Evitar un obstáculo o entrega inválida | Sensor y condición | Cambiar de conducta según el mundo |
| Utilizar otro robot | Identificadores y copia de rutina | Reproducir la solución en otra unidad |
| Mantener varias rutinas | Funciones, parámetros y grupos | Reutilizar sin editar muchas copias |

Los conceptos se desbloquean por progreso. El criterio exacto aún está pendiente: objetivos de producción, hitos del tutorial o investigación. Se recomienda ligarlos a logros comprensibles de la fábrica, sin exigir una sintaxis única cuando varias soluciones sean válidas. Mostrar por qué una herramienta está bloqueada y cómo conseguirla.

La explicación será breve, omisible y consultable después. **Omitir la explicación no significa desbloquear automáticamente el concepto.** Una vía rápida para expertos queda por decidir. Se propone disponer de mensajes de depuración desde el inicio, aunque su tutorial aparezca después.

Para las pruebas A/B se habilitarán los conceptos necesarios: no mezclar una evaluación de navegación con un bloqueo curricular que impida resolverla. El mecanismo de restricción del lenguaje es educativo, no una frontera de seguridad contra código hostil.

### Editor conectado al mundo

- Al pasar el mouse por una función: descripción, parámetros, resultado, ejemplo breve y consecuencias cuando no se cumplen sus condiciones físicas.
- Al colocar el cursor de escritura sobre una referencia como `robots[1]` o `"ensambladora"`: contorno brillante del objeto correspondiente en el mundo.
- La identificación debe usar el contexto del código y el registro de objetos, no resaltar cualquier texto que coincida por casualidad.
- Para variables dinámicas, mostrar el objeto cuando se conozca su valor de ejecución; no adivinar ni ejecutar código solo por mover el cursor.
- La selección del editor, la instrucción ejecutándose y la selección manual del mundo deben distinguirse visualmente.
- Panel ampliable horizontal y verticalmente, con una acción para dedicar todo el panel al código; texto legible en portátil.
- Registro que conecte robot, acción, instante simulado y causa del incidente. Sensores y carga visibles al inspeccionar.

## 8. Construcción y usabilidad que ya requieren atención

El feedback del prototipo sigue vigente aunque se cambie de motor. No se considera corregido por escribir este documento.

| Problema o petición | Resultado esperado |
| --- | --- |
| Selección precisa de texto difícil al arrastrar | Selección normal en el editor sin conflicto con arrastre de panel o cámara |
| Deshacer lo colocado | Ctrl+Z, y equivalente de plataforma, actúa sobre construcción cuando el foco está en el mundo; conserva el deshacer de texto al editar |
| Construir y desmontar arrastrando | Aplicación continua con botón izquierdo; gesto predecible y sin saltos de celdas |
| Orientación de cintas | Inferir el recorrido y las esquinas del arrastre; comprobar ambigüedades antes de colocarlas |
| Cámara | Conservar un gesto claro de desplazamiento con botón derecho |
| Código demasiado pequeño | Expandir área de código dentro del panel y permitir ampliar el propio panel |

El deshacer durante una simulación activa necesita reglas propias: revertir una colocación no debe duplicar materiales o devolver un coste ya consumido. Antes de implementar, decidir el tratamiento de máquinas ocupadas y obras a medio construir. No se propone rebobinar todo el mundo con Ctrl+Z.

## 9. Progresión posterior y narrativa

### Crecimiento industrial

Después de circuitos y robots, la empresa puede desarrollar extracción y procesamiento para reducir su dependencia de proveedores, mejorar robots y diversificarse hacia otros sectores tecnológicos. La energía, mantenimiento, capacidad logística y R&D son fuentes posibles de decisiones económicas; cantidades, frecuencia y costes no están balanceados.

Los robots se conciben como inversiones significativas que requieren mantenimiento. Programarlos mediante chips ofrece un valor alto frente a su coste incremental. El precio y momento de instalar el primer chip quedan pendientes; no bloquear el primer experimento por una compra irreversible sin comprenderla.

La aspiración tardía es que la fábrica pueda ampliarse y construirse a sí misma. Eso no obliga a automatizar obras en la primera prueba ni fija todavía una estructura de campaña por salas. Fábrica persistente es la base; escenarios educativos separados y elementos roguelite son posibilidades posteriores.

### Mundo exterior

El texto original propone una IA industrial que expande su infraestructura hacia territorios naturales y finalmente interactúa con ciudades. La robótica hace jugable su crecimiento; chips, circuitos y fuentes de energía sostienen esa expansión. Las alusiones a debates contemporáneos de IA son inspiración del autor, no afirmaciones verificadas necesarias para el diseño.

Posibles ramas tardías: influencia y negociación, investigación beneficiosa para humanos, conflicto militar, ataques digitales representados como mecánicas ficticias y control de territorios. Las batallas justifican prever modelos animados y VFX, pero no forman parte de la primera experiencia industrial.

Un mapa sin niebla de guerra, resultados comerciales aleatorios y NPC representados por pequeños modelos de lenguaje siguen siendo ideas. Su diseño, costes, ejecución local o remota y calidad no están resueltos. El prototipo no dependerá de un LLM ni de una conexión a un servicio de IA para jugar.

## 10. Dirección tecnológica

### Recomendación actual

**Godot como motor objetivo; GDScript para implementar el juego; JavaScript para los programas del jugador.** Se recomienda empezar con una versión estable de Godot 4, fijada junto con las plantillas de exportación al realizar la prueba técnica. No se ha migrado el proyecto ni se ha seleccionado una versión exacta.

La nueva necesidad de modelos 3D, animación, mezcla visual y VFX cambia la comparación con el prototipo puramente 2D. Godot ofrece herramientas integradas de escenas, animación y renderizado que justifican evaluar la migración. PixiJS sigue siendo la implementación publicada y la referencia funcional; no se mantiene una segunda producción completa en paralelo. [Capacidades de Godot](https://docs.godotengine.org/en/stable/about/list_of_features.html).

**Propuesta visual:** mundo 3D con lógica principalmente sobre un plano y cámara elevada, inicialmente con orientación fija y desplazamiento/zoom. Esta presentación permite robots articulados y elementos dibujados sin comprometer una cámara orbital libre. Perspectiva, orientación, rotación y escala definitivas requieren una prueba visual.

### Navegador como límite real de diseño

Se recomienda **Compatibility** como renderizador común inicial de web y escritorio. La exportación web de Godot utiliza WebAssembly y WebGL 2; sus capacidades no son las de Forward+. Los efectos deben probarse en la web desde el comienzo. No presupuestar el arte alrededor de efectos exclusivos del renderizador de escritorio. [Exportación web](https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_web.html), [comparación de renderizadores](https://docs.godotengine.org/en/stable/tutorials/rendering/renderers.html).

Chispas, polvo, humo estilizado y destellos pueden diseñarse con recursos sencillos. El método concreto —partículas, sprites animados o mallas— se elegirá tras probarlo en Compatibility. Cualquier calidad extra en escritorio debe preservar las señales que explican el juego en navegador.

La configuración inicial preferirá exportación sin hilos cuando las integraciones lo permitan. Si una extensión exige hilos u otras capacidades, habrá que comprobar los encabezados de aislamiento y el funcionamiento real en el sitio Netlify existente, sin afectar los cursos.

### JavaScript frente a Python

Rubén puede trabajar con ambos y delegó la elección según el esfuerzo inmediato. **Se elige JavaScript como recomendación inicial** porque ya existen una API, instrumentación y una integración con el modelo que sirven de referencia. Eso reduce trabajo conceptual y de pruebas; no significa que el runtime actual se importe directamente en Godot.

Godot soporta oficialmente GDScript, C# y C++; Python y JavaScript requieren soluciones adicionales. GDScript se parece a Python, pero no es Python. Elegir GDScript para el motor no cambia automáticamente el lenguaje educativo. [Lenguajes soportados](https://docs.godotengine.org/en/stable/about/faq.html#which-programming-languages-are-supported-in-godot).

**Prueba prioritaria:** evaluar un runtime JavaScript embebido con interrupción de ejecución y una API limitada a órdenes del juego. GodotJS/QuickJS es un candidato comunitario: documenta soporte web, pero requiere evaluar compilaciones y no demuestra por sí solo que ejecutar programas arbitrarios del jugador sea adecuado. No es una dependencia aprobada. [GodotJS y QuickJS](https://godotjs.github.io/documentation/building-from-source/quick-js/).

`JavaScriptBridge` existe solo en la exportación web. Puede servir para conectar componentes del navegador durante una prueba, pero no resuelve la edición nativa ni debe confundirse con un entorno educativo aislado. [JavaScriptBridge](https://docs.godotengine.org/en/stable/classes/class_javascriptbridge.html).

Cambiar a Python implicaría también integrar ejecución web y nativa, errores, cancelación y seguimiento. No hay evidencia aquí de que resulte más sencillo. Si la prueba de JavaScript falla, se revisará la elección con resultados concretos antes de reescribir el juego o inventar un lenguaje parecido a Python.

### PostgreSQL y editor: costes de migración explícitos

PostgreSQL real se conserva como requisito heredado. PGlite está orientado a entornos JavaScript como navegador y Node.js; no es una base nativa incorporada en Godot. Una solución en navegador no garantiza la misma solución en el ejecutable. [PGlite](https://pglite.dev/docs/about).

La prueba de integración debe comprobar PGlite en la web y una vía local de PostgreSQL en escritorio. Una posibilidad a evaluar es un proceso auxiliar empaquetado con PGlite y su runtime; hay que medir tamaño, arranque, comunicación y apagado. No se decide introducir un servidor remoto ni sustituir PostgreSQL por SQLite silenciosamente. Su presencia en el tutorial puede posponerse; su viabilidad técnica no.

El editor actual es CodeMirror sobre HTML. Para una experiencia coherente web/nativa se propone probar `CodeEdit` de Godot, con documentación, resolución de referencias y resaltado propios. Este control es una base de edición; no incluye nuestro análisis de JavaScript ni el vínculo con robots. [CodeEdit](https://docs.godotengine.org/en/stable/classes/class_codeedit.html).

### Contratos que deben sobrevivir al cambio

- Simulación separada de presentación, editor y runtime del jugador.
- Órdenes serializables con robot, acción, argumentos y resultado; el programa no modifica directamente nodos gráficos.
- Un reloj de simulación para movimiento, producción, obras y consecuencias. Pausa y avance manual operan sobre ese mismo estado.
- La pérdida de un programa o su cancelación no borra materiales ni congela toda la interfaz.
- Cantidades, cargas y posiciones fiables aunque la animación tenga interpolación. La física visual no decide por accidente el inventario.
- Guardado versionado: fábrica, robots, cargas, código, desbloqueos, presupuesto y base de datos con tablas propias. No prometer serializar la pila de una máquina virtual activa.
- Al importar, restaurar en pausa y no ejecutar el código automáticamente. Definir cómo se reanuda una tarea física pendiente sin repetir una entrega.
- Separar datos del mundo y proyecciones SQL; los materiales no se duplican por editar una tabla informativa.
- El entorno del alumno no se anuncia como sandbox para código ajeno. En escritorio no se debe entregar acceso a archivos o procesos del sistema a través de la API de robots.

### Steam y Netlify

Godot abre una vía de exportación nativa. Steam exige preparar y distribuir una compilación instalable con su configuración de lanzamiento; publicar una web no completa ese proceso. Sistemas operativos iniciales, logros, nube, tienda, precio y eventual acceso anticipado quedan pendientes. Electron deja de ser la ruta recomendada si se adopta Godot. [Plataformas de Godot](https://docs.godotengine.org/en/stable/about/faq.html#which-platforms-are-supported-by-godot), [distribución en Steam](https://partner.steamgames.com/doc/sdk/uploading?l=english).

Netlify sigue siendo imprescindible para pruebas. No se cambia el sitio `rubenmena-cursos`, su dominio ni el funcionamiento de la portada y cursos. Separar el juego en una nueva carpeta/proyecto es una intención del autor; la estructura, conexión con el build y eventual repositorio deben planificarse antes de mover archivos. Las primeras pruebas Godot pueden tener una ruta de laboratorio dentro del mismo sitio hasta reemplazar Arena de forma controlada.

La web futura podría ser el juego completo, una demo o una versión de pruebas. Esa decisión comercial no está tomada. El núcleo de simulación y los programas deben comportarse igual en las plataformas que se publiquen.

## 11. Arte y localización

La mezcla deseada admite tecnología geométrica o modelada en 3D, superficies y naturaleza dibujadas y VFX estilizados. La unidad visual vendrá de cámara, escala, paleta, luz y jerarquía de estados. El piso azul y los acentos neón del prototipo son una referencia inicial, no una obligación de que todos los materiales tengan el mismo acabado.

El arte será secundario durante el diseño del tutorial. Primero se necesita que brazo vacío, carga, caída y lectura del sensor se entiendan a tamaño normal. No fijar una colección grande de assets antes de probar un robot, una máquina y su interacción.

Las herramientas recomendadas y el flujo de archivos están en [CODEMAGEDDON_ARTE.md](CODEMAGEDDON_ARTE.md), separados del diseño jugable para poder cambiarlos sin alterar las reglas del juego.

Preparar textos de interfaz, tutoriales, errores y documentación como recursos localizables con claves estables y parámetros; empezar solo en español. Los identificadores de entidades y el código guardado no deben romperse al traducir etiquetas. La traducción de nombres de API, si se desea, es una decisión distinta de traducir la interfaz.

## 12. Alcance y hoja de ruta por resultados

No se asignan fechas hasta medir la integración y probar con jugadores.

| Etapa | Entrega | Condición para continuar |
| --- | --- | --- |
| 0. Viabilidad Godot | Una escena mínima con robot, sensor, carga, editor y efecto sencillo; exportación web y nativa | JavaScript cancelable, mensajes y pausa; PostgreSQL local y guardado portable viables; carga en Netlify y rendimiento medidos |
| 1. Movimiento A/B | Mismo escenario con órdenes por destino y por pasos | Jugadores pueden explicar fallos y corregirlos; elegir dirección con observaciones |
| 2. Primer ciclo completo | Minilínea, presupuesto, proveedor estable, circuitos y fabricación de otro robot | El segundo robot aporta autonomía visible y la rutina puede copiarse |
| 3. Tutorial y usabilidad | Microtutoriales, desbloqueos, ayuda contextual, referencia al mundo y construcción cómoda | Principiantes completan el ciclo y recuperan errores sin explicación constante del desarrollador |
| 4. Progresión industrial | Sensores adicionales, R&D, expansión, recursos propios y balance económico | Varias soluciones viables y motivos para reorganizar la fábrica |
| 5. Producto comercial | Campaña, contenido, estabilidad y preparación de Steam | Alcance y oferta comercial definidos; builds y guardados verificados en plataformas objetivo |

**Fuera del siguiente prototipo:** combate completo, ciudades, LLM de NPC, mercado aleatorio, roguelite, modo sin código, programación por nodos, más lenguajes, login y sincronización remota. Arte 3D y un VFX pequeño sí pueden entrar en la prueba técnica; una campaña militar no.

## 13. Validación y preguntas pendientes

Antes de abandonar la base actual, la prueba técnica debe demostrar:

1. Ejecutar acciones y condiciones JavaScript en web y nativo; detener un bucle sin bloquear la interfaz; conservar una línea de error útil.
2. Pausar con un robot cargado, editar y avanzar sin duplicar acciones o materiales.
3. Consultar y guardar PostgreSQL real; exportar/importar una tabla propia junto con la fábrica entre entornos.
4. Seleccionar texto con precisión, consultar una función y resaltar un objeto desde el cursor del editor en ambas plataformas.
5. Importar un modelo con brazo animado y combinarlo con textura dibujada y un efecto legible en Compatibility.
6. Medir carga, memoria y respuesta en un portátil representativo. No fijar miles de robots sin medición: probar primero una unidad y luego grupos crecientes para localizar el coste de simulación, código y dibujo.
7. Publicar el experimento en el Netlify existente sin romper Arena ni cursos. No prometer progreso mientras la pestaña está suspendida ni producción offline sin diseñarlo.

Las próximas decisiones de producto son receta inicial y catálogo del proveedor; uso y obtención de dinero; capacidad del brazo y coste del robot; desbloqueo e instalación del primer chip; alcance del sensor; tratamiento del control manual; comportamiento al reiniciar programas; y condiciones concretas de los desbloqueos. Se resolverán en ese orden solo cuando sean necesarias para la primera prueba.

Las referencias a mods aportadas por Rubén se conservan como una investigación futura: Moon Logic 2, fCPU, LuaComb++, Programmable Controllers, Compact Circuits, Advanced Combinator, FicsIt-Networks y Circuitry/FicsitWiremod. No se han verificado aquí sus capacidades ni vigencia. Los nombres que el propio texto marcaba como no confirmados no son evidencia de que exista una solución técnica reutilizable.

**Siguiente trabajo recomendado:** realizar la prueba técnica mínima de Godot y cerrar el contrato de órdenes del robot. Este documento no inicia esa implementación ni cambia por sí mismo el juego publicado.
