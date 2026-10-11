# Continuar Arena en Codex Cloud

Estado al 11 de octubre de 2026: fuentes subidas a https://github.com/RubenDarioMena/Courses-RDM y proyecto existente `rubenmena-cursos` de Netlify conectado. El primer despliegue desde GitHub fue publicado correctamente (commit `d39a550`). URL: https://rubenmena-cursos.netlify.app/arena/ . Cada push a `main` compila y publica el sitio y la función BYOK. Las 12 pruebas comprueban, entre otros casos, las 40 soluciones del currículo; se comprobó también una compilación desde las fuentes versionadas, sin metadatos Git en los archivos públicos.

## Lo que hay que conectar

1. Usar el repositorio `RubenDarioMena/Courses-RDM`. Excluir `dist/`, `.env*`, dependencias y credenciales. Los cambios locales no llegan a la nube automáticamente: deben subirse con Git.
2. Conectar GitHub con la cuenta que se use en Codex Cloud y dar acceso a ese repositorio concreto.
3. En ChatGPT web o desktop, elegir **Work in → Cloud → Select environment → Create environment**, seleccionar el repositorio y **Get started**. Revisar la preparación y publicar el entorno. También está disponible desde **Settings → Codex Cloud → Environments**.
4. Pedir Node.js 22+ y Python 3. Comprobar `npm test` y `npm run build`. El preview se inicia con `npm run dev`; si se necesita acceso desde un navegador remoto, usar el mecanismo de preview/forwarding del entorno, no asumir que localhost de la VM es localhost del portátil.
5. Habilitar los destinos de red que correspondan. Para el runtime de Python: `cdn.jsdelivr.net`. Para consultar fuentes: GitHub y documentación oficial. Para probar BYOK: `api.openai.com` y un modelo/clave de pruebas propios. Estas últimas credenciales son opcionales para desarrollar el resto del curso.
6. Netlify ya está conectado al repositorio y conserva el dominio actual. La configuración está en `netlify.toml`: Node.js 22, `npm run build`, carpeta pública `dist` y funciones `netlify/functions`. Un push a `main` publica automáticamente.

Las tareas del entorno publicado pueden seguir trabajando con el portátil dormido. Cada tarea tiene su propio espacio; conservar los cambios importantes en Git. El usuario autorizó publicación automática de `main`: un push a esa rama puede cambiar el sitio público.

## Accesos opcionales

- **Netlify:** conexión del repositorio o acceso de despliegue cuando se vaya a publicar. No hace falta para editar y probar localmente. No poner tokens de Netlify en el repositorio.
- **API de IA:** BYOK del alumno es independiente del acceso del agente para desarrollar. Una clave de pruebas solo hace falta para verificar una generación real. Si se facilita al entorno cloud, usar sus controles de secretos para el destino autorizado, nunca el chat o el código.
- **Base de datos:** no se necesita para este prototipo. El futuro curso SQL puede usar un motor dentro del navegador con datos de ejercicios.

## Prompt para retomar

> Continúa Arena en este repositorio. Lee AGENTS.md, README.md y docs/CLOUD_HANDOFF.md. Tenemos Python como primer curso, con 40 misiones, Pyodide real y SVG isométrico. JavaScript/Web y SQL son próximos cursos. La IA es opcional con BYOK. Revisa los tests y el preview antes de ampliar. Prioriza mejorar la enseñanza guiada y añadir funciones/diccionarios con retos visuales. Mantén las claves fuera de archivos y progreso. Ten en cuenta que los pushes a main publican automáticamente en Netlify.

## Pendientes conocidos

- Probar generación con una API key real; el contrato del endpoint se prueba sin consumo de API.
- Ampliar Python con funciones y diccionarios.
- Añadir runtimes, currículo y escenas de JavaScript/Web y SQL.
- Evaluar nuevos escenarios SVG (taller y mensajes) y, posteriormente, Three.js si aporta al aprendizaje.
- Decidir si las variantes de IA y el progreso necesitan sincronización entre dispositivos.

Fuentes oficiales consultadas:

- https://learn.chatgpt.com/docs/cloud
- https://learn.chatgpt.com/docs/environments/cloud-environments
- https://developers.openai.com/api/docs/guides/structured-outputs
- https://docs.netlify.com/build/functions/api
- https://pyodide.org/en/stable/usage/webworker.html
