# Nota de Astra para la próxima sesión: campaña de Arena

Escrita el 12 de octubre de 2026, a petición de Rubén. Leer junto con [el documento de diseño](ARENA_DISENO.md) al retomar el trabajo de campaña.

Esta nota expresa una evaluación y una propuesta de trabajo. Las ideas nuevas de campaña todavía no son decisiones aprobadas ni funcionalidades implementadas. Rubén pidió dejar la continuidad preparada para cuando tenga tiempo; esta nota no inicia una automatización ni autoriza trabajo en segundo plano.

## Mensaje para mí al retomar

Astra: empieza por la experiencia de aprender. Ya existe una fábrica que se mueve, se puede construir, ejecuta JavaScript y consulta PostgreSQL. La siguiente sesión debe demostrar que una persona puede descubrir una idea de programación, usarla por iniciativa propia y reconocer por qué su solución funciona.

La primera Arena decepcionó porque sus gráficos eran poco explicativos, los cambios sucedían de golpe, los mensajes eran pequeños y los retos seguían demasiado guiados. El reinicio resolvió parte de la infraestructura y cambió la dirección visual. La calidad pedagógica sigue pendiente de demostrarse. Los tests de la simulación no demuestran que un jugador esté aprendiendo.

Hoy el código inicial activa tres máquinas y permite cumplir el objetivo de ocho circuitos. Eso sirve como demostración de controles. Como experiencia de aprendizaje, todavía permite avanzar siguiendo una receta sin comprender variables, decisiones o repetición. Recuerda esta diferencia al diseñar la campaña.

## Mi criterio de diseño

**Cada nueva herramienta de programación debe resolver una necesidad que el jugador pueda percibir en su fábrica.** Antes de introducir un bucle, debe entender qué trabajo está repitiendo. Antes de una condición, debe existir una decisión cuyo resultado pueda observar. Antes de una consulta SQL, debe haber una pregunta sobre sus datos que le interese responder.

La propuesta es una campaña de encargos y situaciones conectadas dentro de la fábrica persistente. El alumno escoge cómo construir y programar; los encargos le dan una razón para probar una idea nueva. La introducción sigue siendo mínima y omisible. Los escenarios preparados se reservan para aprender una mecánica o investigar un fallo concreto.

Un encargo debe especificar un resultado y las restricciones relevantes. Por ejemplo: «Entrega este pedido y conserva suficiente material para el siguiente». La ayuda debe estar disponible junto al editor: ejemplo breve consultable, referencia de herramientas conocidas y pistas graduales bajo petición. Ser capaz de investigar no significa tener que adivinar una API.

Conviene que el mundo conserve consecuencias reconocibles: una línea que construiste sigue siendo útil; una función que escribiste se puede reutilizar; tus registros permiten explicar un atasco posterior. Esa continuidad puede hacer que la campaña tenga identidad y que el conocimiento se acumule.

## Tensiones que hay que resolver con intención

1. **Construir y programar deben aportar decisiones propias.** Ahora se pueden activar máquinas desde el inspector. Eso es útil para experimentar, pero puede resolver objetivos sin escribir código. Los encargos de automatización necesitan cambios de situación que hagan útil un programa. Evitar prohibiciones arbitrarias de los controles manuales para forzar sintaxis.
2. **Aprender una API del juego no equivale a aprender JavaScript.** Hacer explícitos los conceptos transferibles: valores, expresiones, estado, condiciones, colecciones, repetición y funciones. Enseñar lo mínimo sobre `await` para ordenar acciones al principio; desarrollar las promesas cuando hagan falta, sin convertir la primera misión en una explicación completa de concurrencia.
3. **El tiempo de espera no debe ser la dificultad.** Usar lotes pequeños y controles de tiempo comprensibles. El movimiento tiene valor cuando permite observar; varios minutos mirando una cinta no prueban comprensión.
4. **La libertad necesita información.** En objetivos abiertos, mostrar herramientas disponibles, estado y criterios de éxito. Mantener las pistas opcionales y permitir estrategias distintas.
5. **SQL debe ayudar a operar o comprender la fábrica.** Consultar existencias, encontrar un cuello de botella o preparar pedidos tiene sentido. Copiar una consulta para marcar una casilla aporta poco.
6. **El sistema de ayuda y el de evaluación deben respetar la verdad del mundo.** Un error de sintaxis, una máquina detenida, una salida bloqueada y un pedido incompleto necesitan explicaciones distintas.

## Primer arco que propongo explorar

Nombre provisional: **«Tu primer contrato»**. Tres situaciones bastan para evaluar la dirección; todavía no es una lista de niveles comprometida.

| Situación | Necesidad del jugador | Idea que puede aprender | Qué debe observarse |
| --- | --- | --- | --- |
| Un pedido cambia | Adaptar una pequeña producción a una cantidad distinta | Valores, variables y expresiones | El valor elegido tiene una consecuencia visible y explicable |
| El trabajo se repite | Atender un lote o varios pedidos sin repetir manualmente todas las órdenes | Repetición, condición de salida y estado | El programa responde al progreso real y termina por una razón que el jugador entiende |
| Algo no cuadra | Explicar un retraso o faltante y corregir su causa | Inspección, comparación y una primera consulta SQL | La evidencia identifica la causa; la corrección mejora el mismo sistema |

Para cada situación, escribir antes de implementar: estado inicial, objetivo del jugador, concepto nuevo, conceptos previos, información disponible, dos estrategias válidas, errores previsibles, feedback y criterio de logro. Señalar cualquier capacidad que el motor todavía no tenga. Si una situación necesita demasiadas mecánicas nuevas para enseñar una sola idea, reducirla.

La historia puede ser ligera: encargos con contexto y consecuencias materiales. No hace falta redactar una campaña extensa antes de saber si estas tres situaciones resultan interesantes.

## Precauciones concretas al diseñar los objetivos

- **Producir, almacenar y entregar son acciones distintas.** Definir cuál completa el contrato. Evitar que el alumno vea progreso de producción cuando se le pidió una entrega.
- **Hay material en tránsito.** Detener el extractor cuando el almacén llega a ocho piezas no elimina las piezas que siguen en cintas y máquinas. Si se exige una cantidad exacta, explicar la restricción y proporcionar controles e información suficientes. Esa complejidad puede ser una lección posterior; no un fallo oculto en el primer ejercicio.
- **Los pedidos SQL son editables.** Un futuro evaluador no puede confiar sólo en `pedidos.entregado = true` como prueba de una entrega física. Necesitará evidencia de la operación real y de los materiales descontados. El sistema actual no tiene ese evaluador de campaña.
- **Un programa correcto debe resistir el cambio relevante.** Cuando el concepto sea generalizar una solución, usar más de un tamaño de pedido o estado inicial y comunicar esa expectativa. Aceptar soluciones distintas; no convertir el evaluador en una búsqueda de cadenas en el código.
- **La fábrica persistente pertenece al jugador.** Preparar prácticas y repeticiones sin borrar ni reorganizar silenciosamente lo que ha construido. Definir cómo se guardan la campaña, sus versiones y sus escenarios junto con la sesión portable.
- **Un logro anterior no valida el código editado ahora.** Distinguir historial de logros, última ejecución y estado actual para no repetir el feedback contradictorio de la primera Arena.

## Qué capacidades conviene evaluar antes de ampliar el contenido

La API actual se concentra en activar/desactivar, esperar, inspeccionar existencias, listar máquinas, cambiar velocidad y entregar pedidos. Para enseñar más conceptos con naturalidad quizá hagan falta parámetros de producción, sensores, decisiones de enrutamiento o control de lotes. Elegir sólo lo necesario para el primer arco; esas funciones aún no están implementadas.

También conviene estudiar una conexión más clara entre línea de código, valores y máquina afectada. Hoy existe resaltado parcial y avance del reloj de la simulación; no hay un depurador completo. El diseño debe partir de esas capacidades reales.

Mi prioridad sería comprobar el primer arco antes de invertir en una campaña larga, más lenguajes o una gran biblioteca de assets. La dirección visual ya tiene una base utilizable; las siguientes mejoras gráficas deberían ayudar a seguir objetos, leer estados y localizar causas.

## Cómo iniciar la próxima sesión

1. Leer esta nota, `ARENA_DISENO.md` y el estado actual del repositorio. Las decisiones más recientes de Rubén prevalecen.
2. Retomar con el diseño de «Tu primer contrato»: presentar las tres situaciones y sus decisiones de aprendizaje, dejando claro qué es propuesta.
3. Concretar un recorrido pequeño y sus cambios mínimos de simulación, API e interfaz. Identificar dónde podría resolverse todo copiando o esperando.
4. Al implementar, probar el recorrido como jugador: equivocarse, pedir ayuda, pausar, editar, guardar y volver. Comprobar si se entiende la causa de cada resultado.
5. Ajustar la experiencia con Rubén antes de multiplicar el contenido.

El resultado que buscamos en esa sesión es un primer tramo que merezca ampliarse. La pregunta que debe guiarlo es: **¿qué comprendió el jugador y qué decisión puede tomar ahora que antes no podía tomar?**
