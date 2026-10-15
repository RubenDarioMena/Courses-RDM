# Taller CAD · Propuesta de proyecto independiente

**BORRADOR PROVISIONAL — pendiente de revisión y decisiones del usuario.**

La separación aún no se ha ejecutado. CAD permanece en el repositorio de cursos y en el sitio Netlify existente. Este documento prepara la extracción sin convertirla en un cambio de alojamiento ya autorizado.

## Objetivo propuesto

Permitir que el editor tenga repositorio, dependencias, pruebas, documentación y publicación propios. Conservar el funcionamiento del sitio de cursos y facilitar que los archivos CAD creados hasta ahora sigan abriendo.

## Inventario para la extracción

| Material actual | Destino o adaptación por estudiar |
| --- | --- |
| `cad/` | Aplicación y sus avisos/licencias; mantener worker, documentos, planos y render separados. |
| `vite.cad.config.mjs` | Configuración propia; revisar `root`, `base`, caché, rutas y salida de compilación. |
| Dependencias npm de CAD | Manifiesto propio con versiones fijadas y archivo de bloqueo. |
| `scripts/cad-sources.mjs` | Preparación de fuentes y materiales de reproducción para la distribución independiente. |
| Pruebas `cad-*` y `tests/browser/cad.spec.mjs` | Suite propia de documento, colocación, OCCT y navegadores. |
| `playwright.cad.config.mjs` y workflow Windows | Servidor de pruebas y CI sin depender de construir Arena. |
| `docs/CAD_WEB.md` y esta carpeta | Documentación inicial del proyecto; revisar enlaces y decisiones. |

Los scripts generales de build y desarrollo sirven hoy al sitio completo. La extracción debe reemplazar esa integración, sin arrastrar Arena ni los contenidos de cursos al producto CAD.

## Decisiones pendientes antes de ejecutar

- Nombre definitivo y ubicación/visibilidad del repositorio.
- Licencia del código de la aplicación y tratamiento de sus materiales propios. Mantener las licencias y obligaciones de las bibliotecas distribuidas.
- Sitio de publicación y dominio. El sitio `rubenmena-cursos` debe seguir funcionando.
- Política del enlace `/cad/`: conservar temporalmente, redirigir o mantener una versión identificada.
- Compatibilidad y migración del formato de proyecto.
- Alcance de la primera entrega independiente y criterios de aceptación.

## Pasos propuestos

1. Acordar las decisiones anteriores y registrar el alcance.
2. Preparar una copia de la aplicación con build, preview y CI autónomos.
3. Comprobar que abre los proyectos JSON existentes e importa/exporta STEP/STL.
4. Publicar una vista previa independiente y probar los flujos en Windows.
5. Acordar el paso a publicación definitiva y la transición del enlace actual.
6. Documentar la nueva fuente de verdad y retirar únicamente la integración que deje de ser necesaria.

Cada paso deberá ser concreto y revisable antes de cambios definitivos de repositorio o alojamiento. No se propone eliminar contenido de cursos ni alterar Arena.

## Punto de atención: datos guardados en el navegador

El guardado local pertenece al origen del sitio. Un dominio nuevo no puede leer automáticamente el `localStorage` del dominio anterior. La transición debe dar al usuario una forma clara de descargar su proyecto desde el sitio actual y abrirlo en el nuevo. No basta con redirigir la URL para trasladar esos datos.

## Criterios de aceptación por revisar

- El nuevo proyecto se instala, prueba y compila sin los cursos ni Arena.
- El paquete contiene el worker, WASM, avisos y fuentes correspondientes necesarios para su distribución.
- Los archivos de ejemplo y proyectos de la etapa actual siguen abriendo con sus parámetros y apoyos.
- Creación, manipulación, croquis, intercambio y recuperación pasan en Chrome, Edge y Firefox sobre Windows.
- El sitio de cursos conserva sus rutas y se explica cómo trasladar los proyectos locales.

Estos criterios son una propuesta inicial, pendiente de acordar. No implican una migración en marcha.
