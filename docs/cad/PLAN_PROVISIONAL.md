# Taller CAD · Base de planificación

**BORRADOR PROVISIONAL — pendiente de conversar, priorizar y pulir con el usuario.**

Este documento es una base de trabajo para siguientes documentos de producto, interacción, arquitectura y pruebas. No fija fechas, estimaciones ni una lista de funciones aprobada.

## Punto de partida confirmado

Se busca un editor de piezas 3D usable desde navegadores de Windows, sin login, con una interfaz más directa y reducida. La base actual utiliza OpenCascade para geometría real y ya permite manipular piezas, dibujar perfiles sobre planos/caras y extruir o cortar. Ver [el informe de progreso](PROGRESO.md).

La intención de convertir la herramienta en un proyecto propio se ha planteado. Su nombre definitivo, repositorio, dominio y alcance todavía se discutirán.

## Hipótesis de producto por validar

- Priorizar modelado de piezas individuales con medidas y archivos útiles para fabricación o impresión 3D.
- Favorecer acciones directas con el ratón y propiedades numéricas accesibles.
- Mantener documentos locales y portables como flujo principal.
- Mostrar las funciones según la tarea activa, evitando una interfaz extensa de bancos de trabajo.

Pendiente: público principal, experiencia previa, casos reales, tamaños habituales de las piezas y nivel de precisión/tolerancia esperado. Estas hipótesis no sustituyen esa conversación.

## Etapas propuestas, sin calendario acordado

| Etapa | Problema que resolvería | Resultado verificable propuesto |
| --- | --- | --- |
| Consolidar la interacción actual | Confirmar que el flujo mínimo resulta cómodo con piezas reales. | Crear y modificar varias piezas acordadas sin depender de cambios de código. |
| Separar el proyecto | Darle identidad, publicación y desarrollo independientes de los cursos. | Repositorio y despliegue propios con proyectos antiguos que sigan abriendo. |
| Mejorar croquis | Dar control preciso a la forma y a sus cambios. | Cotas/restricciones priorizadas y edición predecible del perfil. |
| Robustecer referencias | Evitar que cambiar geometría invalide apoyos o selecciones posteriores. | Casos definidos de cambios de topología con resultados estables o reparación explícita. |
| Ampliar modelado | Incorporar las operaciones que demanden los casos de uso. | Seleccionar entre revolución, barrido, loft, vaciado, patrones o chaflanes según necesidad. |
| Preparar una versión de uso continuado | Reducir pérdida de trabajo y documentar límites reales. | Recuperación, compatibilidad de archivos y rendimiento comprobados con modelos acordados. |

El orden puede cambiar después de usar la aplicación. Ensamblajes, planos 2D y colaboración requieren decidir si forman parte del producto; no se consideran compromisos de esta planificación.

## Temas para futuros documentos

1. Visión y alcance: usuarios, problemas, tareas esenciales y exclusiones explícitas.
2. Especificación de interacción: selección, cámara, gizmos, croquis, cotas, errores y accesibilidad.
3. Arquitectura: documento paramétrico, referencias, worker, persistencia, versiones y licencias.
4. Hoja de ruta: entregas pequeñas con criterios de aceptación y dependencias.
5. Plan de calidad: casos de piezas reales, matriz Windows, modelos grandes y presupuesto de rendimiento.
6. Identidad y publicación: nombre, repositorio, dominio y estrategia para enlaces/proyectos existentes.

Estos apartados pueden convertirse en documentos separados cuando se acuerde el contenido. Evitar multiplicar documentos antes de tener decisiones que registrar.

## Preguntas pendientes para la siguiente conversación

- ¿Quién lo utilizará primero y qué tres piezas concretas debería poder hacer cómodamente?
- ¿Qué tiene más prioridad: precisión del croquis, más operaciones o facilidad de interacción?
- ¿Debe mantenerse completamente local? ¿Se desea funcionamiento offline o instalación como PWA?
- ¿Qué formatos y compatibilidad de proyectos son imprescindibles para los usuarios previstos?
- ¿Qué nombre, repositorio, dominio y licencia tendrá el proyecto independiente?
- ¿Qué límites de complejidad son aceptables en la primera versión?

## Registro de decisiones por completar

| Tema | Estado | Decisión / evidencia |
| --- | --- | --- |
| Navegadores Windows y ausencia de login | Confirmado | Solicitud del usuario; implementación actual. |
| Manipulación directa y croquis básicos | Implementado | Ver informe y pruebas de la entrega. |
| Producto independiente | Intención planteada | Falta definir y ejecutar la separación. |
| Cotas, restricciones y nuevas operaciones | Pendiente | Priorizar con casos de uso. |
| Nombre, dominio, licencia y modelo de publicación | Pendiente | No asumir una elección. |
