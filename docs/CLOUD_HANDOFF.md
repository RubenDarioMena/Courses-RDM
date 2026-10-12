# Continuar Arena Factory

Decisiones del usuario al 11 de octubre de 2026: reiniciar únicamente Arena como fábrica 2D limpia con PixiJS, JavaScript principal y PostgreSQL para datos. Ordenador con teclado y ratón, cámara sin personaje, construcción y programación, mundo persistente e introducción mínima omisible. Python y el antiguo SVG ya no son requisitos. No tocar el diseño de la portada ni los cursos existentes.

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
