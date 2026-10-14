# Codemageddon — arte y diseño paramétrico

- **Fecha:** 13 de octubre de 2026.
- **Base de diseño:** [GDD inicial](CODEMAGEDDON_GDD.md).
- **Dirección técnica:** Godot como motor objetivo, sujeta a la prueba de integración web y escritorio. El juego actual sigue usando PixiJS.

Esta guía responde a las condiciones de Rubén: experiencia en CAD/diseño paramétrico, trabajo frecuente desde un Samsung S24 Ultra y un ordenador donde no puede instalar aplicaciones ni iniciar sesión. Las recomendaciones principales son herramientas gratuitas de navegador y código abierto. Se comprobó que sus editores abren sin cuenta en el navegador de escritorio; no se ha probado físicamente el S24 Ultra ni su lápiz.

## 1. Recomendación concreta

**Empezaría con Blockbench para el primer robot, JSCAD para familias paramétricas de piezas y Kleki para bocetos y texturas.** SVG-edit es un complemento para iconos y diagramas. No hace falta aprender las cuatro herramientas a la vez.

| Herramienta | Qué harías tú | Encaje con Godot | Dónde la priorizaría |
| --- | --- | --- | --- |
| [Blockbench web](https://web.blockbench.net/) | Modelar chasis, ruedas, brazo y pinza; poner pivotes y animar | Exportar GLB/glTF con jerarquía y animaciones; conservar `.bbmodel` editable | PC con ratón; uso móvil secundario por comprobar |
| [JSCAD](https://jscad.app/) | Diseñar familias por medidas: anchura, longitud, grosor, número de piezas y separación | Conservar código y parámetros; convertir las mallas a GLB en el proceso de preparación | PC para definir modelos; ajustes de parámetros en móvil por probar |
| [Kleki](https://kleki.com/) | Bocetar con el lápiz, pintar naturaleza, superficies, humo y marcas | PNG para texturas; PSD como fuente con capas | Primera opción para explorar en el S24 Ultra |
| [SVG-edit](https://svgedit.netlify.app/) | Iconos, emblemas, paneles, flechas y perfiles planos | SVG para interfaz o conversión controlada a textura | PC; precisión táctil por comprobar |

Blockbench ofrece modelado de baja complejidad, pintura y animación; no obliga a adoptar estética de Minecraft. Para el robot se usaría un proyecto **Generic Model**. Es gratuito y de código abierto. [Descripción oficial](https://blockbench.net/), [formatos de exportación](https://blockbench.net/wiki/guides/export-formats/).

JSCAD permite diseño paramétrico 2D/3D con JavaScript. Encaja con una mentalidad CAD, pero no es un CAD de croquis y restricciones con historial como los programas industriales: la definición es código. Yo puedo escribir la plantilla y exponer parámetros para que tú explores proporciones. [Documentación](https://jscad.app/docs/), [parámetros y comienzo](https://jscad.app/docs/tutorial-01_gettingStarted.html).

Kleki documenta gestos táctiles, capas y sensibilidad de lápiz, además de uso en Android. Eso lo convierte en un buen candidato para el teléfono; la presión concreta del S Pen depende de la combinación dispositivo/navegador y no está validada aquí. Exporta PNG, PSD y capas como PNG separados. [Funciones](https://www.kleki.com/home/), [ayuda y guardado](https://www.kleki.com/help/).

SVG-edit es un editor vectorial abierto que funciona en navegador. Sirve para formas limpias y proporciones, pero no sustituye el ensamblaje mecánico ni la animación de un robot. [Proyecto y acceso al editor](https://svg-edit.github.io/svgedit/).

El trabajo se transfiere mediante archivos descargados, sin depender de una cuenta o de que otro navegador conserve el almacenamiento local. En la PC de trabajo habría que poder descargar y abrir esos archivos; si eso tampoco está permitido, el teléfono sería el equipo de creación y transferencia.

## 2. Qué cambia con Godot

Con PixiJS, el flujo más directo para tus modelos sería renderizarlos previamente a sprites. Con la dirección Godot, **podemos usar robots 3D articulados directamente** y reservar las imágenes dibujadas para texturas, interfaces, efectos o elementos planos dentro de la escena.

El formato de intercambio recomendado es **GLB/glTF 2.0**. Godot soporta importación de escenas 3D; usar un archivo exportado evita depender de que cada equipo tenga la herramienta original instalada. Los `.blend` son útiles como fuente, pero su importación directa requiere Blender disponible en el equipo de importación. [Formatos de Godot](https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/importing_3d_scenes/available_formats.html).

Mi propuesta es una escena 3D de cámara elevada y movimiento sobre un plano, no una fábrica que requiera navegación tridimensional. Así un brazo puede girar, una carga caer y una explosión tener volumen sin complicar el control del jugador. La cámara definitiva todavía no está elegida.

Los materiales, sombras y efectos se ajustarán en Godot. Los materiales de un archivo GLB no incluyen automáticamente cualquier shader especial creado en otro programa. La exportación es un punto de intercambio, no una garantía de apariencia idéntica.

## 3. Tres flujos de trabajo posibles

### A. Primer robot: modelado modular

1. En Blockbench, crear un chasis, ruedas, base del brazo, dos segmentos y pinza como piezas separadas.
2. Nombrar las piezas y colocar cada pivote donde debe girar. El objeto cargado será independiente del robot.
3. Diseñar una pose de reposo y una recogida corta; exportar una primera prueba antes de producir muchas animaciones.
4. Guardar `.bbmodel` como fuente y exportar `.glb` o `.gltf` con sus recursos.
5. En Godot, preparar la escena de robot: material, animaciones, punto de agarre, sensor y formas simples de colisión.

Mi recomendación de animación inicial es **articulación rígida por piezas**, suficiente para un brazo mecánico. No hace falta empezar con piel deformable ni un sistema complejo de personajes.

Tu experiencia en mecanismos sirve especialmente para diseñar siluetas funcionales, articulaciones creíbles y familias de máquinas. El criterio de juego es que la pinza y la carga se distingan a distancia; tolerancias reales de fabricación y tornillería minúscula no aportan necesariamente legibilidad.

### B. Familias paramétricas: tu especialidad

Ejemplo de familia: un chasis con anchura, longitud, diámetro de rueda, separación de ejes y altura del sensor configurables. O una cinta con módulos rectos, curvas, soportes y conexiones repetibles.

Podemos crear una definición en JSCAD y conservar tanto el código como conjuntos de parámetros. Tú ajustas proporciones; yo puedo convertir variantes en mallas, simplificarlas y preparar su integración. JSCAD permite exponer parámetros mediante su API de diseño. [Guía de inicio](https://jscad.app/docs/tutorial-01_gettingStarted.html).

La exportación concreta depende del editor y formato elegidos. **No se presupone una salida GLB directa de JSCAD.** Una malla intermedia, por ejemplo STL, necesita conversión, materiales y organización por piezas antes de entrar en el juego. Conservar el script evita perder el carácter paramétrico al exportar.

Para ensamblajes animados conviene entregar cada pieza o conjunto identificable, no una única malla unida. Un STL sirve para geometría, pero no conserva materiales, texturas o animación. [Limitaciones de formatos de intercambio](https://blockbench.net/wiki/guides/export-formats/).

Si más adelante quieres variar edificios dentro del juego, podemos implementar generadores en GDScript con parámetros semejantes. El modelo CAD funciona como especificación; no implica introducir un motor CAD completo en cada partida.

### C. Dibujo en el teléfono y mezcla de estilos

En Kleki puedes preparar siluetas, paletas, vegetación, texturas de suelo, manchas, humo o dibujos sobre capturas del robot. Guardar PSD conserva capas para retomar; exportar PNG proporciona una imagen lista para preparar como textura.

En Godot podemos combinar esos dibujos con modelos: una textura pintada sobre un chasis geométrico, árboles como planos orientados a cámara, vegetación modular y efectos dibujados sobre una escena 3D. Si los árboles son imágenes planas, la libertad de rotar la cámara debe evaluarse antes de producirlos en cantidad.

La unidad del conjunto debe venir de decisiones compartidas: escala, perspectiva, luz, paleta y densidad de detalle. Una regla visual inicial propuesta es **tecnología de formas claras, naturaleza de trazo orgánico y efectos de contraste alto solo para información relevante**.

## 4. Archivos que puedes entregar

| Formato | Para qué resulta útil | Qué acompaña al archivo |
| --- | --- | --- |
| `.glb` / `.gltf` | Modelo, jerarquía, materiales y animaciones de intercambio | Fuente editable; con glTF, incluir `.bin` y texturas referenciadas |
| `.bbmodel` | Retomar y modificar el robot en Blockbench | Exportación GLB y una imagen de referencia |
| Script JSCAD `.js` y parámetros | Mantener proporciones y generar variantes | Nombres de piezas, dimensiones y una vista esperada |
| `.svg` | Iconos, formas vectoriales, esquemas y perfiles | Medida prevista, colores y grupos identificables |
| `.png` | Texturas, elementos dibujados, sprites y fotogramas | Transparencia cuando proceda, tamaño y orientación |
| `.psd` | Fuente de pintura con capas | PNG de referencia o capas exportadas para integrar |
| `.obj` con materiales / `.stl` | Geometría estática de intercambio | Escala, orientación y piezas; habrá trabajo de conversión |
| `.step` / `.stp` | Geometría CAD fuente, si ya la tienes | Exportación de malla adicional; Godot no lo usa directamente |
| `.blend` | Fuente completa para un flujo de Blender posterior | GLB para la integración reproducible |

Puedo trabajar con estos archivos mediante las herramientas de conversión disponibles y preparar vistas para inspeccionarlos; no todos se pueden integrar directamente ni preservan los mismos datos. Es mejor conservar el original que depender de una única exportación final.

Godot admite imágenes PNG y SVG, entre otros formatos; los SVG se rasterizan al importar y tienen limitaciones. Evitar basar la interfaz en filtros SVG complejos sin una prueba previa. No diseñar un texto de interfaz como parte de una imagen si después deberá traducirse. [Importación de imágenes](https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/importing_images.html).

## 5. Diseño procedural que sí tiene sentido

| Elemento | Aportación tuya | Aportación de código propuesta |
| --- | --- | --- |
| Diálogos que crecen con el texto | Bordes, esquinas y ornamentación | Contenedores de UI, ajuste de texto y fondo de nueve secciones |
| Muros, torres y tuberías | Módulos rectos, esquinas, uniones y remates | Reglas de conexión y colocación sobre una cuadrícula |
| Pasto y conjuntos de árboles | Un pequeño catálogo de formas y materiales | Distribución con semilla, separación y variaciones limitadas |
| Robots de una familia | Chasis, brazos y sensores compatibles | Selección de módulos, colores y medidas dentro de límites |
| Cintas | Piezas y direcciones coherentes | Construcción por arrastre y elección automática de esquinas |
| Daños y suciedad | Texturas y estados reconocibles | Activación por eventos, intensidad y limpieza |

Godot dispone de `NinePatchRect` para fondos que cambian de tamaño conservando bordes. El dimensionado del texto y el contenedor se resuelve en la interfaz, no pintando un cuadro distinto para cada diálogo. [NinePatchRect](https://docs.godotengine.org/en/stable/classes/class_ninepatchrect.html).

La geometría visible y la ocupación física tendrán contratos separados. Por ejemplo, cambiar ligeramente la altura de un árbol no debería abrir o cerrar una ruta por accidente. Toda variación que afecte a colisiones o sensores debe actualizar el modelo de juego de manera deliberada.

## 6. VFX y batallas futuras

Para la primera prueba bastan tres efectos: **contacto del sensor, material que cae y una chispa de avería**. Con ellos comprobamos integración y legibilidad; no necesitamos diseñar combate completo para validar el flujo de arte.

Puedes dibujar el aspecto del humo, el destello o la onda, y definir su intención y secuencia. Yo puedo preparar materiales, partículas, sprites animados o mallas simples y conectarlos a eventos de la simulación. Las animaciones exactas de una máquina deben responder a su estado real.

La restricción principal es la versión web. Compatibility tiene menos funciones que Forward+: por ejemplo, no ofrece compute shaders ni todas las opciones de partículas y decals. Diseñaremos efectos con recursos disponibles en ese renderizador y los comprobaremos en navegador. Un halo dibujado o geometría luminosa puede comunicar neón sin depender de un posprocesado avanzado. [Comparación oficial de renderizadores](https://docs.godotengine.org/en/stable/tutorials/rendering/renderers.html).

La forma de un efecto puede mezclar estilos; su significado debe ser consistente. Un golpe visual grande no debería ocultar la carga que el jugador necesita diagnosticar. Las piezas decorativas que saltan no se cuentan como materiales recuperables salvo que el diseño lo establezca.

## 7. En qué puedo ayudarte

- Convertir bocetos, medidas y reglas de proporción en plantillas paramétricas editables.
- Preparar estructura de piezas, pivotes, nombres y estados de animación.
- Convertir formatos cuando existan herramientas compatibles, optimizar mallas y revisar importaciones.
- Crear escenas y materiales de Godot, generadores modulares y efectos vinculados al juego.
- Generar conceptos y variantes visuales cuando los pidas; usar tus diseños como referencia y mantener las piezas finales controlables.
- Preparar hojas de estilo, paletas y comparaciones sobre el mismo escenario.
- Construir más adelante una pequeña herramienta propia de navegador con controles de parámetros si descubrimos un trabajo repetitivo que la justifique.

Los conceptos generados por IA pueden ayudar a explorar, pero una imagen no entrega por sí sola un robot articulado consistente en todas las poses. El modelo modular y las reglas de construcción son una mejor base para los assets técnicos repetibles.

## 8. Primer ejercicio recomendado

Diseñar **un solo carrito con brazo**, sin producción masiva de assets:

1. Boceto de silueta en el S24 Ultra y selección de dos o tres colores.
2. Modelo modular sencillo en Blockbench, usando medidas razonadas desde tu experiencia CAD.
3. Piezas separadas: chasis, ruedas, articulaciones, pinza y sensor visible.
4. Una pose vacía, otra cargada y una animación de recogida.
5. Importación de prueba en Godot, colocándolo junto a una máquina y un suelo con textura dibujada.
6. Verlo en navegador a la escala real de juego y comprobar carga, sensor y contorno de selección.

No hace falta fijar todavía polígonos, resolución de texturas o número definitivo de direcciones. Esa escena permitirá establecer límites basados en visibilidad, rendimiento y tiempo de creación. Después convertimos el diseño en una familia paramétrica.

Para una etapa posterior en un equipo propio, Blender puede ampliar modelado, animación, render y procedimientos. No es un requisito para empezar ni una solución a la restricción de no instalar en el trabajo; el flujo principal se apoya en archivos y herramientas web. [Intercambio Blender/Godot](https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/importing_3d_scenes/available_formats.html).
