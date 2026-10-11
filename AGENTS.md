# Cursos y Arena

Trabaja en el proyecto de cursos; este no es FlowLife. La portada y los cursos HTML existentes deben seguir funcionando.

Decisiones aceptadas:

- Arena es una plataforma de ejercicios para Python, JavaScript/Web y SQL. Python es el primer curso implementado; los demás están planificados.
- Gráficos SVG programáticos en 2D con perspectiva isométrica. Three.js se evaluará más adelante.
- Enseñar con ejercicio guiado, práctica, reto y misión independiente. Introducir cada concepto antes de exigirlo. La escena debe representar los valores reales del programa, también cuando la solución sea incorrecta.
- IA opcional con BYOK. Las misiones curadas deben funcionar sin credenciales. No persistir claves en archivos, localStorage, exportaciones, logs ni repositorios.
- Mantener textos y feedback en español.
- Repositorio autorizado: `RubenDarioMena/Courses-RDM`. El usuario autorizó subir las fuentes y conectar el proyecto existente `rubenmena-cursos` de Netlify para publicar automáticamente cada push a la rama de producción. Conservar ese sitio y su dominio. Los pushes a producción publican la web; realizarlos dentro del alcance autorizado de la tarea.

Comandos (Node >=22, Python 3 para pruebas):

```sh
npm run dev
npm test
npm run build
```

Preview: http://localhost:4173/arena/ . El servidor local implementa el mismo endpoint BYOK que la función de Netlify. La primera ejecución de Python requiere `cdn.jsdelivr.net`.

No copiar ni modificar los contenidos de midudev. Se usa únicamente su progresión general como referencia, con ejercicios y gráficos originales.

El ejecutor Python es acotado para este currículo; no tratarlo como sandbox de seguridad. Añadir nuevas capacidades mediante una ampliación deliberada del currículo y del adaptador, con pruebas adecuadas. La IA genera datos de misiones, no HTML/JavaScript ejecutable para la página.

Ver `README.md` y `docs/CLOUD_HANDOFF.md` para arquitectura y continuidad.
