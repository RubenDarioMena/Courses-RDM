# Continuar Arena Factory

## Dirección vigente del diseño — 13 de octubre de 2026

Leer primero [Codemageddon — GDD inicial](CODEMAGEDDON_GDD.md) y su [guía de arte y diseño paramétrico](CODEMAGEDDON_ARTE.md). Recogen la conversación más reciente y distinguen acuerdos, propuestas y pruebas pendientes. Este trabajo produjo documentación; no migró ni modificó el juego.

- Programar es el núcleo; modo sin código aplazado. Público principiante, microtutoriales y conceptos desbloqueables.
- Inicio con minilínea, pocos robots y presupuesto adicional; circuitos y piezas compradas permiten construir más robots. Proveedores con existencias y precios estables.
- Robots inicialmente manuales; un robot programable primero, copia de rutinas y luego grupos. Sensor básico de movimiento incluido.
- Errores físicos visibles: viajes vacíos, materiales caídos y posibles daños, poco frecuentes al principio. No corregir automáticamente toda orden del jugador.
- Comparar navegación por destino y movimiento por pasos antes de elegir. Construcción instantánea en preparación y breve espera automática durante la partida. Pausa para pensar y programar.
- Ayuda al pasar el mouse por funciones y resaltar en el mundo la entidad referenciada por el cursor de texto.
- Godot es la dirección preferida al considerar 3D, mezcla de estilos y VFX. Recomendación: GDScript interno y JavaScript del jugador, elegido frente a Python por menor esfuerzo estimado. Integración, versión y migración no están validadas.
- Próximo paso recomendado: prueba mínima Godot web/nativa con ejecución cancelable de JavaScript, PostgreSQL real, persistencia y un modelo animado. El arte se diseña para Compatibility y se prueba en navegador.

## Base implementada

Decisiones que dieron lugar al prototipo actual: Arena como fábrica 2D limpia con PixiJS, JavaScript principal y PostgreSQL para datos. Ordenador con teclado y ratón, cámara sin personaje, construcción y programación, mundo persistente e introducción mínima omisible. Python y el antiguo SVG no son requisitos. No tocar el diseño de la portada ni los cursos existentes.

## Antecedente de campaña

La [Nota de Astra para la campaña](NOTA_ASTRA_CAMPANA.md) conserva una evaluación del prototipo y una propuesta anterior de primer arco. Es antecedente; no reemplaza el GDD reciente ni sus decisiones sobre robots y aprendizaje.

## Estado

Primera versión jugable implementada: línea cobre/placas/circuitos, cinco componentes construibles, transporte continuo, inspector, editores, control de tiempo, seguimiento básico de JavaScript y PostgreSQL real en worker. Pedidos SQL entregables desde JavaScript con materiales reales. Guardado local, exportación e importación con copia de PostgreSQL y tablas propias. Sin login, IA, energía, economía, campaña extensa ni soporte móvil.

## Entorno

Repositorio: RubenDarioMena/Courses-RDM. Node 22+. Ejecutar `npm ci`, `npm test`, `npm run build`. Preview con `npm run dev` en 4173; paquete con `PORT=4174 npm run preview`. La interfaz está en /arena/. PixiJS, PGlite y sus binarios se empaquetan con Vite. Google Fonts es opcional y tiene fallback.

## Publicación

Conservar Netlify `rubenmena-cursos` y https://rubenmena-cursos.netlify.app/arena/. Los pushes a main publican automáticamente. El usuario autorizó subir fuentes y publicar dentro del alcance del trabajo. No crear otro sitio ni cambiar dominio. La portada y todos los cursos anteriores se copian al build.

## Puntos a cuidar

- Separar reglas del mundo, ejecución y dibujo. Comprobar conservación de materiales y continuidad al guardar durante una entrega.
- Los avances manuales son pasos del reloj de simulación, no un depurador completo. Las funciones síncronas no se instrumentan por línea; un worker bloqueado se termina.
- El worker ejecuta código del propio alumno; no garantiza aislamiento de seguridad para programas ajenos. Nunca ejecutar automáticamente código importado.
- Las tablas inventario, maquinas y produccion reflejan el mundo; las consultas refrescan esas proyecciones. Pedidos y tablas del alumno se conservan.
- Mantener texto legible, errores con contexto e instrucciones consultables. Los retos futuros deben admitir estrategias distintas.
- Las sesiones antiguas de Python no son compatibles con este mundo. Se mantiene la versión anterior recuperable en Git: e66c3ad.
- La autenticación y sincronización remota quedan para una decisión posterior; no inventar límites de planes gratuitos sin verificarlos.
