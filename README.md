# Cursos y Arena

Sitio existente: https://rubenmena-cursos.netlify.app

El prototipo de Arena está implementado en `Cursos-templates`, con 40 misiones de Python. Repositorio: https://github.com/RubenDarioMena/Courses-RDM . El usuario autorizó subir las fuentes y conectar el sitio existente de Netlify para publicar automáticamente cada push a `main`.

## Desarrollo local

Requisitos: Node.js 22 o posterior. Las pruebas del ejecutor también necesitan Python 3.

```sh
npm run dev
```

Abre http://localhost:4173/arena/ . El servidor local también permite consultar la portada y los cursos existentes. No hay dependencias npm que instalar para ejecutar la aplicación.

```sh
npm test
npm run build
```

La compilación copia el sitio público a `dist/`, incluyendo los cursos actuales, sus referencias existentes y Arena. No publica pruebas, documentación interna nueva ni funciones del servidor como archivos estáticos.

## Primera expedición

Base Aurora contiene 40 misiones originales en 10 temas. Cada tema tiene un ejercicio guiado, práctica, reto y misión independiente:

1. `print` y orden de ejecución.
2. Variables y tipos básicos.
3. Operadores y cálculos.
4. Entradas y conversiones.
5. Cadenas de texto.
6. Comparaciones y booleanos.
7. Condicionales.
8. Listas y métodos.
9. `while`.
10. `for`, `range` y una misión combinada.

La progresión general se inspira en https://github.com/midudev/curso-python. Los textos, ejercicios y gráficos son originales. Funciones y diccionarios quedan para la siguiente ampliación de Python.

Python se ejecuta realmente mediante Pyodide 314.0.7 en un worker de tipo módulo. La primera ejecución descarga el runtime desde `cdn.jsdelivr.net`; necesita conexión. La interfaz y el ejecutor están separados. Los cambios en las variables observadas actualizan la escena SVG y quedan registrados para explorar la ejecución paso a paso.

Las pruebas comprueban valores, tipos y salida; aceptan distintas soluciones correctas. Cuando el concepto es un bucle o un condicional, se comprueba también que se practique esa estructura. Cada caso recibe un contexto nuevo. El ejecutor limita instrucciones, salida y tiempo; es un entorno educativo acotado y no una sandbox de seguridad para ejecutar Python arbitrario.

El progreso y los borradores se guardan en el navegador. Se pueden exportar e importar como JSON. Las variantes generadas son temporales durante la sesión y no cuentan entre las 40 misiones originales.

## IA opcional con BYOK

Las misiones preparadas funcionan sin IA. El diálogo permite introducir la API key y el ID de un modelo de la cuenta del alumno que admita Structured Outputs de OpenAI.

- La clave se mantiene en memoria de la pestaña, no en localStorage ni en archivos.
- Al generar, la pestaña envía la clave a `/.netlify/functions/generate-exercise` del mismo sitio.
- La función la reenvía exclusivamente a `https://api.openai.com/v1/responses`; no hay una clave compartida del propietario ni persistencia de claves en la aplicación.
- Las llamadas usan `store: false`. El proveedor aplica sus propias políticas de datos y facturación. Una generación consume saldo del alumno y la función consume recursos de Netlify.
- El cliente comprueba el formato y ejecuta la solución de referencia contra las pruebas propuestas antes de aceptar una variante. También rechaza estructuras y funciones aún no presentadas en ese tema.
- Esta comprobación verifica la coherencia ejecutable de la variante, no garantiza por sí sola la calidad pedagógica de un enunciado generado.

Se probó el contrato y la función con respuestas simuladas; todavía no se ha hecho una llamada real con una API key. En esta primera versión el proveedor es OpenAI. Otros proveedores pueden añadirse mediante adaptadores posteriores.

## Estructura

```text
arena/
  index.html                 Interfaz de Arena
  app.js                     Navegación, editor, progreso y generación
  assets/arena.css           Diseño responsive
  courses/python.js          Catálogo y 40 misiones
  core/grading.js            Evaluación independiente de la escena
  core/generation.js         Contrato para variantes
  core/storage.js            Progreso portable sin credenciales
  runtimes/python.js         Adaptador del runtime
  runtimes/python-worker.js  Pyodide en worker
  runtimes/harness.py        Ejecutor compartido con las pruebas CPython
  scenes/base.js             Mundo SVG programático
netlify/functions/           Generación BYOK
scripts/                    Servidor local y empaquetado
tests/                      Comprobaciones del currículo y runtime
docs/CLOUD_HANDOFF.md         Continuidad en Codex Cloud
```

El catálogo reserva JavaScript/Web y SQL como próximos cursos. Para implementarlos, añadir sus datos, su adaptador de ejecución y sus escenas; conservar los contratos de pruebas y progreso. El curso de Python es el primero.

## Netlify

El `netlify.toml` usa `npm run build`, publica `dist/` y despliega `netlify/functions/`. Conectar el repositorio al sitio existente permite publicar ambos. Arrastrar solo `dist/` como sitio estático permite los ejercicios originales; la generación BYOK requiere desplegar también la función.

Para preparar la subida manual, ejecutar `npm run build:static`. Esta variante indica a la interfaz que la IA aún no está conectada y desactiva la entrada de claves; todas las misiones originales siguen funcionando. `npm run preview` permite revisar ese paquete.

El ZIP de subida debe contener los archivos de `dist/` directamente en su raíz. Se sube desde **choose a file** dentro del proyecto existente `rubenmena-cursos`. No subir la carpeta de fuentes completa como sitio estático. La subida manual conserva los cursos existentes, pero no despliega la función BYOK.

No introducir claves en Git, archivos del sitio, pruebas, documentación ni conversaciones. Para continuidad en la nube, consultar `docs/CLOUD_HANDOFF.md`.
