# CAD Web sobre Open CASCADE

Inicio del proyecto: 14 de octubre de 2026. Aplicación independiente en `/cad/`, dentro del sitio actual de cursos. La portada, los cursos HTML y Arena conservan sus rutas y su implementación. No hay login ni servicio de geometría en el servidor.

## Dirección técnica

El editor utiliza geometría B-rep real de Open CASCADE Technology, compilada a WebAssembly mediante `opencascade.js@2.0.0-beta.b5ff984`. El paquete contiene OCCT 7.6.2. Se carga su distribución `opencascade.full`, sin fabricar un kernel que solo contenga las operaciones del prototipo. El binario original mide 50.305.130 bytes; el navegador descarga ese motor desde el mismo sitio, sin CDN.

«Full» es el nombre de la distribución de OpenCascade.js: incluye las clases que el generador upstream puede exponer con sus filtros. No equivale a toda la API C++ de OCCT ni a todos sus módulos. Tampoco incluye la aplicación FreeCAD, sus bancos de trabajo, interfaz Qt, Python, solver de croquis o formato FCStd. La experiencia CAD se construye alrededor del kernel.

El objetivo de uso es un ordenador Windows con teclado y ratón en versiones actuales de Chrome, Edge o Firefox. Se necesitan WebAssembly, Web Workers y WebGL2, además de suficiente memoria para el modelo. La compatibilidad objetivo no sustituye pruebas en Windows: cada entrega debe registrar los navegadores y equipos realmente comprobados. El motor inicial es de un solo hilo; no necesita SharedArrayBuffer ni encabezados de aislamiento de origen.

## Arquitectura

| Capa | Responsabilidad |
| --- | --- |
| Documento JSON | Operaciones, parámetros en milímetros, referencias, nombres, visibilidad y colores. Validación independiente de OCCT y del renderizado. |
| Historial | Instantáneas de documentos para deshacer y rehacer. Un cambio de parámetros reconstruye las operaciones que dependen de él. |
| Worker CAD | Carga WASM, construye los sólidos OCCT, valida resultados, tesela y procesa archivos de intercambio. Las operaciones costosas se apartan del hilo de interfaz. |
| Three.js | Cámara, selección y representación de mallas. La triangulación sirve para mostrar; las operaciones y el intercambio STEP utilizan los sólidos exactos. |
| Interfaz | Herramientas de pieza, parámetros, árbol de operaciones, errores en español y acciones de archivo. |
| Vite y hosting estático | Publican módulos, worker y WASM bajo `/cad/`. Netlify continúa siendo el alojamiento actual. |

Los archivos del usuario se leen en el navegador y viajan al worker local. El documento portable contiene datos declarativos; no ejecuta JavaScript importado. No hay autenticación, cuenta, subida de piezas a un backend ni colaboración remota. El servidor solo entrega los recursos de la aplicación. El guardado en el navegador pertenece a ese origen y puede perderse al borrar sus datos; exportar el proyecto conserva una copia independiente.

## Primera base funcional

El documento inicial contempla cajas, cilindros, esferas, extrusiones de perfiles poligonales, unión, diferencia e intersección, redondeo y transformaciones. Las operaciones referencian piezas anteriores, de modo que editar una dimensión mantiene la intención de sus operaciones posteriores. Hay intercambio STEP/STL y un archivo de proyecto con el historial paramétrico declarativo.

Límites iniciales del documento: 100 operaciones, perfiles de hasta 1.024 puntos y archivos de proyecto de hasta 40 MB. Son límites de esta aplicación para mantener controlada la carga; no describen los límites de OCCT. Un archivo STL representa una triangulación y no recupera por sí mismo croquis ni historial de diseño. Una importación STEP tampoco reconstruye automáticamente las operaciones con las que otra aplicación creó la pieza.

Los resultados de una operación CAD dependen de la geometría y las tolerancias. Un radio de redondeo incompatible o un perfil inválido deben producir un error legible y preservar el último proyecto válido. La base de operaciones no sustituye todavía a un croquis con cotas, restricciones y grados de libertad.

## Desarrollo y despliegue

Requisitos de la aplicación: Node.js 22 o superior.

```sh
npm ci
npm run dev
```

Abrir `http://localhost:4173/cad/`. Arena sigue en `http://localhost:4173/arena/`. `PORT=4180 npm run dev` permite elegir otro puerto. El servidor mantiene dos instancias Vite con bases, cachés y endpoints HMR separados; las rutas de cursos se sirven como antes.

```sh
npm test
npm run build
npm run preview
```

La compilación existente copia los cursos, construye Arena con `vite.config.mjs` y CAD con `vite.cad.config.mjs`. El resultado está en `dist/cad/`. `cad/public/` aporta la página de licencias y los textos legales. El WASM se emite como archivo independiente; no se convierte en base64 dentro de un bundle. Preview debe servirlo con `Content-Type: application/wasm`.

El sitio conserva la configuración y el dominio Netlify existentes. `/cad/*` recibe encabezados de seguridad básicos independientes de `/arena/*`. No se exige aislamiento entre orígenes en esta base porque el módulo de un solo hilo no lo necesita.

## Fuentes, licencias y reproducción

Las copias de licencias y la procedencia están en `/cad/legal.html` y `/cad/licenses/SOURCES.txt`.

`scripts/cad-sources.mjs` descarga los archivos fuente de revisiones inmutables, comprueba sus SHA-256 y los publica junto al WASM en `/cad/licenses/source/`. Una caché local `.cad-source-cache/` evita repetir la descarga de unos 50 MB; está excluida de Git. El primer build requiere acceso a GitHub para preparar estos materiales. Un cambio del archivo upstream que no coincida con el hash fijado hace fallar la compilación, en vez de publicar fuentes sin verificar. El build incluye también `cad-application.tar.gz` con los archivos de integración, las dependencias fijadas y las instrucciones de reenlace de esa entrega. La creación de ese archivo utiliza `tar`, disponible en el entorno de Netlify y en macOS; no añade un requisito al navegador del alumno.

| Componente | Versión / revisión | Licencia |
| --- | --- | --- |
| OpenCascade.js | `2.0.0-beta.b5ff984` | LGPL-2.1-only, según el manifiesto npm |
| OCCT | `bb368e271e24f63078129283148ce83db6b9670a`, línea 7.6.2 | LGPL 2.1 con excepción Open CASCADE |
| Three.js | `0.186.1` | MIT |
| Emscripten/emsdk del port | `3.1.14` | Avisos upstream incluidos |

Artefacto npm exacto: [opencascade.js-2.0.0-beta.b5ff984.tgz](https://registry.npmjs.org/opencascade.js/-/opencascade.js-2.0.0-beta.b5ff984.tgz). Su integridad declarada es `sha512-4ZIrYrfrCV7SXvQFSmbHlfueSYngQNWGVrRVloVaAEZHDSY+R1k2htdY4AU5axbIGkbWVmrj+M8nmyeMLAelwA==`, conservada en `package-lock.json`. La compilación de este sitio no recompila OCCT: usa ese artefacto y empaqueta el envoltorio JavaScript en el worker.

Fuentes de OpenCascade.js del [commit correspondiente al sufijo de versión](https://github.com/donalffons/opencascade.js/tree/b5ff9847200016dce0d92fe747fc38a945771dc5). npm declara además [gitHead `15445938357138fd30f07a126a9bd874054af7d8`](https://github.com/donalffons/opencascade.js/tree/15445938357138fd30f07a126a9bd874054af7d8). Se registran ambos identificadores para no confundir el commit que da nombre al build con el registrado durante su publicación.

El [Dockerfile de esa revisión](https://github.com/donalffons/opencascade.js/blob/b5ff9847200016dce0d92fe747fc38a945771dc5/Dockerfile) fija Emscripten 3.1.14 y las [fuentes OCCT exactas](https://github.com/Open-Cascade-SAS/OCCT/tree/bb368e271e24f63078129283148ce83db6b9670a). Los scripts y parches de generación están en el mismo repositorio. `builds/opencascade.full.yml` define el módulo completo. El Dockerfile upstream clona RapidJSON y FreeType sin fijar revisión, por lo que repetirlo hoy no promete un binario idéntico byte a byte.

Para reconstruir el kernel completo, en una copia de las fuentes upstream de esa revisión y con Docker instalado:

```sh
docker build --target custom-build-image --build-arg threading=single-threaded -t cad-ocjs-local .
docker run --rm -v "$(pwd):/src" -u "$(id -u):$(id -g)" cad-ocjs-local /src/builds/opencascade.full.yml
```

El proceso upstream genera `opencascade.full.js`, `.wasm` y `.d.ts`. Para probar una biblioteca compatible modificada, sustituir en una copia local los artefactos del paquete instalado en `node_modules/opencascade.js/dist/`, conservar sus licencias, y reconstruir con `npm run build`. La aplicación y el motor quedan disponibles en un servidor estático propio. Registrar el cambio de biblioteca y sus fuentes al redistribuirlo; no presentar el hash del artefacto original como si validara ese build modificado.

La LGPL exige conservar avisos y licencia, facilitar el código fuente correspondiente de las bibliotecas y sus cambios, y respetar las condiciones de modificación y reenlace de la sección 6. Sus textos completos y la excepción de OCCT son la referencia. La excepción de OCCT concierne al uso de material de sus cabeceras; no elimina todas las obligaciones de LGPL. No se redefine la licencia de los contenidos del sitio o de cursos.

## Siguientes etapas

1. Probar la base en Windows con Chrome, Edge y Firefox: creación, edición, deshacer, intercambio, persistencia, modelos grandes y recuperación de errores. Medir carga del kernel, memoria, teselación y duración de las operaciones.
2. Añadir croquis con planos de trabajo, cotas y un solver de restricciones. Resolver referencias estables a caras y aristas antes de construir una cadena amplia de funciones paramétricas.
3. Ampliar herramientas con revolución, barrido, loft, vaciado, patrones y selección de aristas para redondeos/chaflanes.
4. Incorporar cuerpos y ensamblajes, transformaciones de componentes y estructuras STEP/XDE con nombres, colores y metadatos.
5. Incorporar diagnóstico de geometría, tolerancias y reparación de importaciones; después planos 2D y documentación de fabricación.

Cada etapa debe entregar herramientas utilizables y archivos compatibles, con pruebas del kernel real. Reutilizar OCCT evita implementar las operaciones geométricas desde cero; construir un editor CAD completo sigue requiriendo la capa paramétrica, las herramientas y la interacción.
