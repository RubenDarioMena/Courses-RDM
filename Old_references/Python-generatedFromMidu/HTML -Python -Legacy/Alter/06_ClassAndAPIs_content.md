# Lección 6: Clases y APIs

En esta lección aprenderemos sobre la Programación Orientada a Objetos (POO) y cómo interactuar con APIs, dos conceptos fundamentales para el desarrollo moderno.

## Programación Orientada a Objetos

### Lección 00: Introducción a las Clases y Objetos

¡Empezamos nuestro viaje! La Programación Orientada a Objetos (POO) es un paradigma que nos permite estructurar nuestro código de una manera que se asemeja al mundo real. En lugar de tener datos y funciones por separado, los agrupamos en "objetos". Una **clase** es como un plano o una plantilla para crear esos objetos. Define qué datos (llamados atributos) tendrán y qué cosas podrán hacer (llamados métodos). Un **objeto** (o instancia) es el elemento concreto que construimos a partir de ese plano.

En este primer ejemplo, crearemos la plantilla más simple posible: una clase `Coche`.

```python
# 00_Clases_y_Objetos/coche.py

# --- 1. Definición de la Clase ---
# Usamos la palabra clave 'class' seguida del nombre de la clase (por convención, en CamelCase).
class Coche:
    # --- 2. El Método Constructor: __init__ ---
    # Este método especial se ejecuta AUTOMÁTICAMENTE cada vez que creamos un nuevo objeto de esta clase.
    # 'self' es una referencia al objeto que se está creando. Siempre es el primer parámetro.
    # 'marca' y 'modelo' son los argumentos que pasaremos al crear el coche.
    def __init__(self, marca, modelo, anio):
        # --- 3. Atributos de Instancia ---
        # Estos son los datos que pertenecerán a cada objeto 'Coche' específico.
        # Asignamos los valores recibidos a los atributos del objeto usando 'self'.
        self.marca = marca
        self.modelo = modelo
        self.anio = anio
        self.encendido = False # Por defecto, un coche nuevo está apagado.

    # Un método para describir el coche
    def descripcion(self):
        return f"Coche: {self.marca} {self.modelo} del año {self.anio}"

# --- 4. Creación de Objetos (Instancias) ---
# Ahora usamos nuestra clase 'Coche' como si fuera una función para crear objetos concretos.

# Creamos nuestro primer objeto coche.
# Esto llama a __init__ con marca="Toyota", modelo="Corolla" y anio=2021
mi_coche = Coche("Toyota", "Corolla", 2021)

# Creamos otro objeto, completamente independiente del primero.
otro_coche = Coche("Ford", "Mustang", 1968)


# --- 5. Accediendo a los Atributos y Métodos ---
# Usamos la notación de punto para acceder a los datos y las funciones del objeto.

print("--- Información de mis coches ---")
# Accedemos a los atributos directamente
print(f"Mi coche es un {mi_coche.marca} {mi_coche.modelo}.") # Salida: Mi coche es un Toyota Corolla.
print(f"El otro coche es un {otro_coche.marca} fabricado en {otro_coche.anio}.") # Salida: El otro coche es un Ford fabricado en 1968.

# Llamamos al método descripcion()
print(mi_coche.descripcion()) # Salida: Coche: Toyota Corolla del año 2021
print(otro_coche.descripcion()) # Salida: Coche: Ford Mustang del año 1968
```

¡Y eso es todo por ahora! Ya has creado tu primera clase y dos objetos a partir de ella. Has aprendido a definir sus características iniciales con `__init__` y a acceder a sus datos.

### Lección 01: Atributos y Métodos

En la lección anterior, definimos los **atributos de instancia** (`marca`, `modelo`, etc.) dentro de `__init__`. Estos son datos únicos para cada objeto. Ahora, introduciremos dos conceptos clave:

1. **Atributos de Clase:** Son atributos que pertenecen a la clase en sí, no a un objeto en particular. **Todos los objetos** de esa clase compartirán el mismo valor para este atributo. Por ejemplo, todos nuestros coches tendrán 4 ruedas. Se definen directamente dentro de la clase, fuera de cualquier método.

2. **Métodos:** Son las funciones que definen el **comportamiento** de un objeto. Ya creamos el método `descripcion()`, que solo leía datos. Ahora crearemos métodos que *modifican* el estado del objeto, como `encender()`, `apagar()` o `acelerar()`. La palabra `self` es crucial aquí, ya que le permite a un método acceder y cambiar los atributos del propio objeto que lo está llamando.

Vamos a mejorar nuestra clase `Coche`.

```python
# 01_Atributos_y_Metodos/coche_mejorado.py

class Coche:
    # --- 1. Atributo de Clase ---
    # Este atributo es compartido por TODAS las instancias de la clase Coche.
    ruedas = 4

    def __init__(self, marca, modelo, anio):
        # --- Atributos de Instancia ---
        # Estos son únicos para cada objeto Coche.
        self.marca = marca
        self.modelo = modelo
        self.anio = anio
        self.encendido = False # Estado inicial
        self.velocidad = 0     # Estado inicial

    # --- 2. Métodos que modifican el estado ---

    def encender(self):
        """Cambia el estado de 'encendido' a True."""
        if not self.encendido:
            self.encendido = True
            print(f"El {self.modelo} ha sido encendido.")
        else:
            print(f"El {self.modelo} ya estaba encendido.")

    def apagar(self):
        """Cambia el estado de 'encendido' a False y resetea la velocidad."""
        if self.encendido:
            self.encendido = False
            self.velocidad = 0
            print(f"El {self.modelo} ha sido apagado.")
        else:
            print(f"El {self.modelo} ya estaba apagado.")

    def acelerar(self, kmh):
        """Aumenta la velocidad del coche si está encendido."""
        if self.encendido:
            self.velocidad += kmh
            print(f"Acelerando. Velocidad actual: {self.velocidad} km/h.")
        else:
            print("No puedes acelerar, el coche está apagado.")
    
    def frenar(self, kmh):
        """Reduce la velocidad del coche sin bajar de 0."""
        if self.velocidad > 0:
            self.velocidad -= kmh
            if self.velocidad < 0:
                self.velocidad = 0
            print(f"Frenando. Velocidad actual: {self.velocidad} km/h.")
        else:
            print("El coche ya está detenido.")

    def descripcion(self):
        """Devuelve una descripción completa del estado actual del coche."""
        estado = "encendido" if self.encendido else "apagado"
        return (f"Coche: {self.marca} {self.modelo} ({self.anio}). "
                f"Ruedas: {self.ruedas}. Estado: {estado}. "
                f"Velocidad: {self.velocidad} km/h.")


# --- Uso de la clase mejorada ---
mi_mustang = Coche("Ford", "Mustang", 2023)

# Accediendo al atributo de clase
print(f"Mi coche tiene {mi_mustang.ruedas} ruedas.") # A través de la instancia
print(f"La clase Coche define que los coches tienen {Coche.ruedas} ruedas.") # A través de la clase

print("\n--- Comportamiento del Coche ---")
print(mi_mustang.descripcion())

mi_mustang.acelerar(50) # No funciona, está apagado
mi_mustang.encender()
mi_mustang.acelerar(50)
mi_mustang.acelerar(30)
mi_mustang.frenar(20)
print(mi_mustang.descripcion())
mi_mustang.apagar()
print(mi_mustang.descripcion())
```

Como puedes ver, ahora nuestros objetos `Coche` tienen un comportamiento mucho más rico y realista. Podemos cambiar su estado interno (sus atributos) a través de sus métodos.

### Lección 02: Encapsulamiento y Abstracción

Hasta ahora, cualquiera podía modificar los atributos de nuestro coche directamente. Por ejemplo, `mi_coche.velocidad = 500` podría asignar una velocidad irreal sin que el coche esté encendido. Esto rompe la lógica que hemos construido.

El **encapsulamiento** es el principio de restringir el acceso directo a los atributos de un objeto y agruparlos con los métodos que operan sobre ellos. En Python, logramos esto por convención usando un guion bajo (`_`) al principio del nombre de un atributo (ej. `_velocidad`). Esto le dice a otros programadores: "No deberías tocar esto directamente desde fuera de la clase".

La **abstracción** consiste en ocultar la complejidad interna y exponer solo una interfaz simple. En nuestro caso, el conductor no necesita saber cómo funciona el motor; solo necesita un pedal para `acelerar()` y una llave para `encender()`. Nuestros métodos públicos (`encender`, `apagar`, etc.) son nuestra interfaz abstracta.

Para controlar cómo se leen y modifican nuestros atributos "privados", usamos una herramienta muy elegante de Python: el decorador `@property`.

```python
# 02_Encapsulamiento_y_Abstraccion/coche_protegido.py

class Coche:
    ruedas = 4

    def __init__(self, marca, modelo, anio):
        # --- 1. Atributos "Privados" ---
        # Usamos un guion bajo para indicar que estos atributos
        # no deben ser modificados directamente desde fuera de la clase.
        self.marca = marca
        self.modelo = modelo
        self.anio = anio
        self._encendido = False # Atributo protegido
        self._velocidad = 0     # Atributo protegido

    # --- 2. Getter con @property ---
    # Este método permite LEER el valor de _velocidad como si fuera un atributo normal.
    # mi_coche.velocidad -> ejecutará este código.
    @property
    def velocidad(self):
        return self._velocidad

    # --- 3. Setter para la propiedad 'velocidad' ---
    # Este método permite ASIGNAR un valor a la velocidad, pero con control.
    # mi_coche.velocidad = 100 -> ejecutará este código.
    @velocidad.setter
    def velocidad(self, nuevo_valor):
        if not self._encendido:
            print("No puedes cambiar la velocidad con el coche apagado.")
        elif nuevo_valor < 0:
            print("La velocidad no puede ser negativa. Se establecerá en 0.")
            self._velocidad = 0
        else:
            self._velocidad = nuevo_valor
            print(f"Velocidad establecida en {self._velocidad} km/h.")
    
    # --- 4. Interfaz Pública (Métodos) ---
    # Estos son los métodos que el usuario de la clase debe utilizar.
    def encender(self):
        if not self._encendido:
            self._encendido = True
            print(f"El {self.modelo} ha sido encendido.")
        else:
            print(f"El {self.modelo} ya estaba encendido.")

    def apagar(self):
        if self._encendido:
            self._encendido = False
            self._velocidad = 0 # Usamos el atributo interno directamente
            print(f"El {self.modelo} ha sido apagado.")
        else:
            print(f"El {self.modelo} ya estaba apagado.")

    def acelerar(self, kmh):
        if self._encendido:
            # Usamos el setter implícitamente al asignar un valor
            self.velocidad += kmh 
        else:
            print("No puedes acelerar, el coche está apagado.")
    
    def descripcion(self):
        estado = "encendido" if self._encendido else "apagado"
        return (f"Coche: {self.marca} {self.modelo} ({self.anio}). "
                f"Estado: {estado}. Velocidad: {self._velocidad} km/h.")


# --- Uso de la clase protegida ---
mi_tesla = Coche("Tesla", "Model 3", 2024)

print("--- Intentando modificar atributos directamente ---")
# Intentamos asignar una velocidad con el coche apagado
mi_tesla.velocidad = 50 # El setter lo impedirá
print(mi_tesla.descripcion())

print("\n--- Usando la interfaz pública ---")
mi_tesla.encender()
mi_tesla.acelerar(80)
# Leemos la velocidad a través del @property (getter)
print(f"Leyendo la velocidad: {mi_tesla.velocidad} km/h.")
print(mi_tesla.descripcion())

print("\n--- Probando la validación del setter ---")
# Intentamos asignar una velocidad negativa
mi_tesla.velocidad = -30 # El setter lo corregirá
print(f"Leyendo la velocidad después de intentar ponerla negativa: {mi_tesla.velocidad} km/h.")

# Aunque la convención es no hacerlo, Python aún permite el acceso si insistes.
# ESTO SE CONSIDERA UNA MALA PRÁCTICA.
# mi_tesla._velocidad = -100
# print(f"\nVelocidad modificada a la fuerza: {mi_tesla._velocidad}")
```

Ahora nuestro objeto `Coche` es más robusto. Protege sus datos internos y solo permite modificarlos de manera controlada a través de sus métodos y propiedades, ocultando la complejidad interna.

### Lección 03: Herencia

La **herencia** nos permite crear una nueva clase que "hereda" todas las propiedades (atributos) y comportamientos (métodos) de una clase ya existente. Esto es increíblemente útil para reutilizar código y crear una jerarquía lógica entre nuestras clases.

- La clase original se conoce como **clase padre** o **superclase**.
- La nueva clase se conoce como **clase hija** o **subclase**.

Imagina que queremos representar un coche eléctrico. Un coche eléctrico es, en esencia, un coche, por lo que comparte muchas características: tiene marca, modelo, se puede encender, apagar y acelerar. Sin embargo, tiene características únicas, como una batería en lugar de un tanque de gasolina.

En lugar de crear una clase `CocheElectrico` desde cero, podemos hacer que herede de nuestra clase `Coche` y luego añadirle sus particularidades.

En el siguiente código, haremos tres cosas clave:

1. Crearemos una clase `CocheElectrico` que hereda de `Coche`.
2. Extenderemos el constructor `__init__` para añadir atributos específicos del coche eléctrico.
3. Sobrescribiremos un método del padre para darle un comportamiento específico.

```python
# 03_Herencia/coche_electrico.py

# --- 1. Clase Padre (Superclase) ---
# Usaremos una versión ligeramente simplificada de nuestra clase Coche.
class Coche:
    def __init__(self, marca, modelo):
        self.marca = marca
        self.modelo = modelo
        self._encendido = False
        self._velocidad = 0

    def encender(self):
        self._encendido = True
        print(f"El {self.modelo} está encendido.")

    def apagar(self):
        self._encendido = False
        self._velocidad = 0
        print(f"El {self.modelo} está apagado.")

    def acelerar(self, kmh):
        if self._encendido:
            self._velocidad += kmh
            print(f"Velocidad: {self._velocidad} km/h.")
        else:
            print("El coche está apagado.")
    
    def descripcion(self):
        return f"Vehículo: {self.marca} {self.modelo}."


# --- 2. Clase Hija (Subclase) ---
# Para heredar, ponemos el nombre de la clase padre entre paréntesis.
class CocheElectrico(Coche):
    
    # --- 3. Extendiendo el constructor __init__ ---
    def __init__(self, marca, modelo, bateria_kwh):
        # --- 4. Llamando al constructor del padre con super() ---
        # Es crucial llamar al __init__ de la clase padre para que
        # inicialice sus propios atributos (marca, modelo).
        super().__init__(marca, modelo)
        
        # Atributo específico de la clase hija
        self.bateria_kwh = bateria_kwh
        self.nivel_bateria = 100 # %

    # --- 5. Nuevo método específico de la clase hija ---
    def cargar_bateria(self):
        self.nivel_bateria = 100
        print(f"El {self.modelo} ha sido cargado. Batería al {self.nivel_bateria}%.")

    # --- 6. Sobrescribiendo un método del padre ---
    # Esta clase proporciona su propia versión del método descripcion.
    def descripcion(self):
        # Llamamos al método original del padre con super() para reutilizarlo
        descripcion_padre = super().descripcion()
        # Y le añadimos la información específica de la clase hija
        return f"{descripcion_padre} Es eléctrico con {self.bateria_kwh} kWh. Batería: {self.nivel_bateria}%."


# --- Uso de las clases ---

print("--- Usando el objeto de la clase Padre ---")
coche_normal = Coche("Honda", "Civic")
print(coche_normal.descripcion())
coche_normal.encender()
coche_normal.acelerar(40)

print("\n--- Usando el objeto de la clase Hija ---")
mi_tesla = CocheElectrico("Tesla", "Model S", 100)

# El Tesla puede usar métodos heredados del Coche...
mi_tesla.encender()
mi_tesla.acelerar(120)

# ...y también sus propios métodos.
mi_tesla.cargar_bateria()

# Cuando llamamos a descripcion(), se ejecuta la versión de CocheElectrico (la sobrescrita).
print(mi_tesla.descripcion())
```

Gracias a la herencia, hemos creado una clase más especializada (`CocheElectrico`) reutilizando toda la lógica de la clase `Coche` y sin tener que repetir código. Este es un concepto fundamental para construir software escalable y bien organizado.

### Lección 04: Polimorfismo y Duck Typing

**Polimorfismo** (del griego, "muchas formas") es la capacidad que tienen objetos de diferentes clases para responder a la misma llamada de método. La herencia es una forma de lograr polimorfismo, pero no la única.

Python utiliza un concepto llamado **Duck Typing**, que encapsula esta idea de una forma muy pragmática. La frase dice:

> "Si camina como un pato (walks like a duck) y grazna como un pato (quacks like a duck), entonces debe ser un pato."

En programación, esto significa que a Python no le interesa la clase o el tipo de un objeto, sino los **métodos que tiene**. Si un objeto tiene el método que intentamos llamar, Python lo ejecutará sin problemas, sin importar si hereda de una clase específica o no.

En este ejemplo, crearemos varias clases de "vehículos". Algunas heredarán entre sí y otras no. Luego, crearemos una función que puede trabajar con una lista de cualquiera de estos vehículos, siempre y cuando tengan un método en común (`avanzar`), demostrando el polimorfismo en acción.

```python
# 04_Polimorfismo_y_Duck_Typing/vehiculos.py

class Coche:
    def __init__(self, marca):
        self.marca = marca

    def avanzar(self):
        print(f"El coche {self.marca} avanza por la carretera.")

class CocheElectrico(Coche):
    # Esta clase hereda de Coche.
    def avanzar(self):
        # Sobrescribe el método del padre para darle un comportamiento específico.
        print(f"El coche eléctrico {self.marca} se desliza silenciosamente.")

class Bicicleta:
    # Esta clase NO hereda de Coche, es completamente independiente.
    def __init__(self, tipo):
        self.tipo = tipo

    # Pero TIENE un método que se llama igual: avanzar.
    def avanzar(self):
        print(f"La bicicleta de tipo '{self.tipo}' avanza pedaleando.")

# --- Función Polimórfica ---
# A esta función no le importa el tipo de objetos que recibe.
# Solo le importa que cada objeto en la lista TENGA un método llamado .avanzar()
def mover_vehiculos(lista_vehiculos):
    print("--- Iniciando el movimiento de todos los vehículos ---")
    for vehiculo in lista_vehiculos:
        # Aquí ocurre la magia del polimorfismo y el duck typing.
        # Python simplemente llama al método .avanzar() del objeto 'vehiculo',
        # sea cual sea su clase.
        vehiculo.avanzar()
    print("--- Todos los vehículos se han movido ---")


# --- Creando los objetos ---
mi_civic = Coche("Honda Civic")
mi_tesla = CocheElectrico("Tesla Model Y")
mi_bici = Bicicleta("Montaña")

# Creamos una lista con objetos de diferentes clases.
vehiculos = [mi_civic, mi_tesla, mi_bici]


# --- Ejecutando la función ---
# Le pasamos la lista heterogénea a nuestra función.
# Ella sabrá qué hacer con cada objeto.
mover_vehiculos(vehiculos)
```

Como puedes ver, la función `mover_vehiculos` funciona perfectamente con una mezcla de objetos de clases `Coche`, `CocheElectrico` y `Bicicleta`. No necesita ninguna lógica `if` o `elif` para comprobar el tipo de cada objeto. Simplemente confía en que cada "vehículo" sabrá cómo "avanzar" a su manera. Este es un principio de diseño muy poderoso que hace que el código sea más flexible y reutilizable.

Ahora que hemos cubierto los pilares de la Programación Orientada a Objetos, ¿estás listo para dar el salto al mundo de las APIs en la **lección 05: Introducción a las APIs y HTTP**?

## APIs y Comunicación Web

### Lección 05: Introducción a las APIs y HTTP

Ahora que sabemos cómo crear y organizar nuestros propios objetos, el siguiente paso es hacer que nuestros programas se comuniquen con otros sistemas a través de internet. Aquí es donde entran las APIs.

#### ¿Qué es una API?

**API** son las siglas de **I**nterfaz de **P**rogramación de **A**plicaciones (*Application Programming Interface*). Piensa en ella como un **camarero en un restaurante**:

- **Tú (el cliente)**: Eres tu programa, que necesita datos o quiere realizar una acción.
- **La cocina (el servidor)**: Es donde están los datos o donde se ejecutan las operaciones que necesitas.
- **El camarero (la API)**: Es el intermediario que toma tu pedido, lo lleva a la cocina, y te trae de vuelta lo que solicitaste.

#### ¿Cómo funciona la comunicación HTTP?

Las APIs web utilizan el protocolo **HTTP** (*HyperText Transfer Protocol*) para comunicarse. Es el mismo protocolo que usa tu navegador para cargar páginas web, pero en lugar de devolver HTML, las APIs devuelven datos en formatos como **JSON**.

Los **métodos HTTP** más comunes son:

- **GET**: Para *obtener* datos (como leer un artículo).
- **POST**: Para *crear* nuevos datos (como publicar un comentario).
- **PUT**: Para *actualizar* datos existentes.
- **DELETE**: Para *eliminar* datos.

#### ¿Qué es JSON?

**JSON** (*JavaScript Object Notation*) es un formato de texto para intercambiar datos. Aunque su nombre incluye "JavaScript", es independiente del lenguaje y se usa en casi todas las tecnologías modernas.

JSON se parece mucho a los diccionarios de Python:

```json
{
  "nombre": "Pikachu",
  "tipo": "Eléctrico",
  "id": 25,
  "habilidades": [
    "Impactrueno",
    "Ataque Rápido"
  ]
}
```

Hemos sentado las bases teóricas. Ahora ya sabes qué es una API, cómo funciona la comunicación HTTP y en qué formato recibiremos los datos.

¿Estás listo para escribir código en la **lección 06 y realizar tu primera petición real a una API**?

### Lección 06: Realizando tu primera petición con `requests`

Para interactuar con APIs en Python, la librería `requests` es el estándar de oro. No forma parte de la biblioteca estándar de Python, por lo que si no la tienes, necesitarás instalarla abriendo tu terminal o línea de comandos y ejecutando:

`pip install requests`

Una vez instalada, usarla es increíblemente sencillo. En esta lección, haremos nuestra primera petición `GET` a **JSONPlaceholder**, una API gratuita y falsa, perfecta para practicar. Solicitaremos un único "to-do" (tarea pendiente) y mostraremos los datos que nos devuelva.

El proceso es simple:

1. Importar la librería `requests`.
2. Definir la URL del *endpoint* al que queremos acceder.
3. Usar `requests.get()` para enviar la petición.
4. Verificar el código de estado de la respuesta para asegurarnos de que todo fue bien (`200 OK`).
5. Si la respuesta es exitosa, convertir el cuerpo de la respuesta (que viene en formato JSON) a un diccionario de Python usando el método `.json()`.
6. ¡Usar los datos!

```python
# 06_Primera_Peticion_API/primera_peticion.py

import requests # 1. Importar la librería

# 2. Definir la URL del endpoint
# Este endpoint de JSONPlaceholder nos devuelve una única tarea (to-do).
url = "https://jsonplaceholder.typicode.com/todos/1"

print(f"Realizando una petición GET a: {url}")

try:
    # 3. Realizar la petición GET
    response = requests.get(url)

    # 4. Verificar el código de estado de la respuesta
    # response.raise_for_status() es una forma útil de generar un error
    # si el código de estado no es exitoso (ej. 404, 500).
    response.raise_for_status() 

    print(f"¡Éxito! Código de estado: {response.status_code}") # Debería ser 200

    # 5. Convertir la respuesta JSON a un diccionario de Python
    data = response.json()

    # 6. ¡Usar los datos!
    print("\n--- Datos recibidos de la API ---")
    print(f"ID de Usuario: {data['userId']}")
    print(f"ID de la Tarea: {data['id']}")
    print(f"Título: {data['title']}")
    print(f"¿Completada?: {'Sí' if data['completed'] else 'No'}")

except requests.exceptions.RequestException as e:
    # Este bloque se ejecutará si hay un problema de red,
    # un código de estado de error (como 404 o 500), etc.
    print(f"Ha ocurrido un error al realizar la petición: {e}")
```

¡Felicidades! Acabas de escribir un programa que se conecta a un servidor en internet, solicita datos, los recibe y los procesa. Has dado un paso gigante, pasando de programas que solo existen en tu ordenador a programas que pueden interactuar con el mundo.

Ahora que sabes cómo obtener datos, ¿te parece que unamos nuestros conocimientos de Clases y APIs en la **lección 07: Proyecto Práctico: Consulta de API de Pokémon**?

### Lección 07: Proyecto Práctico: Consulta de API de Pokémon

En las lecciones anteriores aprendimos a crear clases para modelar objetos y, por separado, a consumir APIs para obtener datos. Ahora, combinaremos ambos conceptos para crear un programa realmente dinámico.

**El objetivo:** Crearemos una clase `Pokemon`. La magia está en que, al crear un objeto de esta clase, no le pasaremos los datos directamente. En su lugar, le daremos el nombre o el número de un Pokémon. La propia clase será responsable de conectarse a la **PokéAPI** (una API pública y gratuita sobre Pokémon), buscar la información y rellenar sus propios atributos con los datos recibidos.

Esto demuestra un patrón de diseño muy potente: objetos que se "autoconstruyen" a partir de una fuente de datos externa.

```python
# 07_Proyecto_Pokemon_API/pokemon_api.py

import requests

class Pokemon:
    """
    Una clase que representa a un Pokémon.
    Al instanciarla, consulta la PokéAPI para obtener y almacenar sus datos.
    """
    # URL base de la API. Usaremos una f-string para añadir el nombre o ID.
    base_url = "https://pokeapi.co/api/v2/pokemon/"

    def __init__(self, name_or_id):
        # 1. Almacenamos el nombre o id que nos pasaron.
        self.name_or_id = str(name_or_id).lower()
        
        # 2. Inicializamos los atributos a None. Se llenarán después.
        self.name = None
        self.id = None
        self.height = None # Altura en decímetros
        self.weight = None # Peso en hectogramos
        self.types = []
        
        # 3. Llamamos al método que hará la magia.
        self._fetch_data()

    def _fetch_data(self):
        """
        Método privado para conectarse a la API y obtener los datos.
        """
        url = f"{self.base_url}{self.name_or_id}"
        print(f"Buscando datos en: {url}...")
        
        try:
            response = requests.get(url)
            response.raise_for_status() # Lanza un error si la petición falla (ej. 404)
            
            # Si todo fue bien, procesamos los datos.
            data = response.json()
            self._populate_attributes(data)
            
        except requests.exceptions.RequestException as e:
            print(f"Error al buscar el Pokémon '{self.name_or_id}': {e}")
            self.name = f"Error: '{self.name_or_id}' no encontrado."

    def _populate_attributes(self, data):
        """
        Método privado para rellenar los atributos de la instancia
        con los datos del JSON recibido.
        """
        self.name = data['name'].capitalize()
        self.id = data['id']
        self.height = data['height']
        self.weight = data['weight']
        
        # El tipo es una lista de diccionarios, extraemos solo los nombres.
        self.types = [type_info['type']['name'] for type_info in data['types']]
        print(f"¡Datos de {self.name} cargados con éxito!")

    def describe(self):
        """
        Muestra una descripción bien formateada del Pokémon.
        """
        if self.id is None: # Comprobamos si la carga de datos falló
            print(self.name)
            return

        print("\n--- Ficha de Pokémon ---")
        print(f"Nombre: {self.name}")
        print(f"ID: {self.id}")
        print(f"Altura: {self.height * 10} cm") # Convertimos a cm
        print(f"Peso: {self.weight / 10} kg")   # Convertimos a kg
        # Unimos la lista de tipos en un string legible
        print(f"Tipo(s): {', '.join(self.types)}")
        print("------------------------")

# --- ¡Vamos a probarlo! ---

# Creamos un Pokémon usando su nombre
charizard = Pokemon("charizard")
charizard.describe()

# Creamos otro Pokémon usando su número de Pokédex
bulbasaur = Pokemon(1)
bulbasaur.describe()

# Intentamos crear un Pokémon que no existe para ver el error
missingno = Pokemon("missingno")
missingno.describe()
```

¡Ahí lo tienes! Has creado una clase inteligente que sabe cómo obtener y configurar sus propios datos. Este es un paso fundamental para crear aplicaciones más complejas y desacopladas.

En el último ejemplo, vimos que el programa muestra un error cuando un Pokémon no se encuentra. Sería ideal manejar estos errores de una forma más controlada. ¿Te parece si abordamos eso en la **lección 08: Manejo de Errores y Excepciones**?

### Lección 08: Manejo de Errores y Excepciones

En la lección anterior, nuestro programa imprime un mensaje cuando un Pokémon no se encuentra. Esto funciona, pero es una práctica limitada. ¿Qué pasa si otro programador usa nuestra clase `Pokemon` y necesita *saber* mediante código si la búsqueda falló para poder reaccionar? Simplemente imprimir un texto no es suficiente.

Aquí es donde entra el manejo de **excepciones**. Una excepción es un error que ocurre durante la ejecución de un programa y que interrumpe su flujo normal. Usamos el bloque `try...except` para "intentar" ejecutar un código que podría fallar y "capturar" la excepción si ocurre, permitiéndonos manejar el error sin que el programa se detenga bruscamente.

Para hacer nuestro código más profesional, haremos dos cosas:

1. Crearemos nuestra propia **excepción personalizada** (`PokemonNotFoundException`). Esto hace que nuestro código sea más expresivo y fácil de usar.
2. Modificaremos nuestra clase `Pokemon` para que lance esta excepción cuando no encuentre un Pokémon, en lugar de simplemente imprimir un mensaje.

```python
# 08_Manejo_de_Errores/pokemon_con_excepciones.py

import requests

# 1. Definimos nuestra propia clase de Excepción.
# Es una buena práctica que herede de la clase base Exception de Python.
class PokemonNotFoundException(Exception):
    """Excepción personalizada para cuando un Pokémon no es encontrado en la API."""
    pass # No necesita lógica adicional, solo el nombre es suficiente.


class Pokemon:
    base_url = "https://pokeapi.co/api/v2/pokemon/"

    def __init__(self, name_or_id):
        self.name_or_id = str(name_or_id).lower()
        self.name = None
        self.id = None
        self.height = None
        self.weight = None
        self.types = []
        
        # El constructor ahora puede lanzar una excepción,
        # así que quien lo llame debe estar preparado.
        self._fetch_data()

    def _fetch_data(self):
        url = f"{self.base_url}{self.name_or_id}"
        print(f"Buscando datos en: {url}...")
        
        try:
            response = requests.get(url)
            response.raise_for_status()
            data = response.json()
            self._populate_attributes(data)
            
        # Capturamos la excepción de requests...
        except requests.exceptions.HTTPError as e:
            # 2. ...y lanzamos nuestra propia excepción más específica.
            # Esto le da más información a quien use nuestra clase.
            raise PokemonNotFoundException(f"El Pokémon '{self.name_or_id}' no fue encontrado en la PokéAPI.") from e

    def _populate_attributes(self, data):
        self.name = data['name'].capitalize()
        self.id = data['id']
        self.height = data['height']
        self.weight = data['weight']
        self.types = [type_info['type']['name'] for type_info in data['types']]
        print(f"¡Datos de {self.name} cargados con éxito!")

    def describe(self):
        print("\n--- Ficha de Pokémon ---")
        print(f"Nombre: {self.name}")
        print(f"ID: {self.id}")
        print(f"Altura: {self.height * 10} cm")
        print(f"Peso: {self.weight / 10} kg")
        print(f"Tipo(s): {', '.join(self.types)}")
        print("------------------------")

# --- ¡Vamos a probarlo! ---
# Ahora, el código que USA nuestra clase es responsable de manejar los errores.
pokemon_a_buscar = ["pikachu", "mewtwo", "greymon", "151"]

for p in pokemon_a_buscar:
    try:
        # 3. Intentamos crear la instancia del Pokémon.
        pokemon_obj = Pokemon(p)
        pokemon_obj.describe()
    except PokemonNotFoundException as e:
        # 4. Si se lanza nuestra excepción personalizada, la capturamos aquí.
        # Esto nos permite manejar el error de forma controlada.
        print(f"\nERROR: No se pudo crear el objeto para '{p}'.")
        print(f"Razón: {e}\n")
```

Ahora nuestro código es mucho más robusto y reutilizable. La clase `Pokemon` notifica claramente cuando ocurre un error, y el código que la utiliza puede decidir qué hacer en ese caso, en lugar de depender de un simple mensaje impreso.

Hasta ahora hemos trabajado con APIs públicas y abiertas. ¿Qué tal si en la siguiente lección aprendemos a interactuar con servicios que requieren un permiso especial? Continuemos con la **lección 09: Autenticación en APIs**.

### Lección 09: Autenticación en APIs (con API Key)

Las APIs abiertas como PokéAPI son fantásticas para aprender, pero la mayoría de las APIs que usarás en proyectos reales te pedirán que te identifiques. La forma más común de hacerlo es mediante una **API Key**.

Una **API Key** es simplemente una cadena de texto única (como una contraseña larga) que el proveedor de la API te da cuando te registras en su servicio. Tu aplicación debe incluir esta clave en cada petición que realiza. De esta manera, el servidor de la API sabe quién eres, comprueba si tienes permiso para usar el servicio y lleva la cuenta de cuántas peticiones has hecho (muchos servicios tienen límites gratuitos).

#### ¿Cómo se envía la API Key?

Hay varias formas, pero una de las más comunes y seguras es enviarla en las **cabeceras (headers)** de la petición HTTP. Las cabeceras son metadatos que viajan junto a tu petición y le dan información adicional al servidor.

En este ejemplo, usaremos la API de **OpenWeatherMap** para obtener el clima actual de una ciudad. Esta API requiere que te registres gratuitamente y obtengas una API Key.

**Nota importante sobre seguridad:** Nunca hardcodees (escribas directamente) tu API Key en tu código fuente, especialmente si planeas compartir el código o subirlo a un repositorio público. En su lugar, usa variables de entorno o archivos de configuración que no se incluyan en el control de versiones.

```python
# 09_Autenticacion_API_Key/clima_api.py

import requests
import os

# --- 1. Almacenando la API Key ---
# Es una MALA PRÁCTICA escribir la API Key directamente en el código.
# Una mejor forma es usar variables de entorno.
# Por simplicidad aquí, la pediremos al usuario o la leeremos de una variable.
# Para ejecutarlo, puedes crear una variable de entorno llamada OPENWEATHER_API_KEY
# o simplemente pegar tu clave cuando el script te lo pida.

API_KEY = os.getenv("OPENWEATHER_API_KEY")
if not API_KEY:
    API_KEY = input("Por favor, introduce tu API Key de OpenWeatherMap: ")


def get_weather(city_name, api_key):
    """
    Obtiene el clima actual para una ciudad usando la API de OpenWeatherMap.
    """
    base_url = "https://api.openweathermap.org/data/2.5/weather"
    
    # 2. Parámetros de la Petición
    # Estos se añadirán a la URL como ?q=city_name&appid=api_key&...
    params = {
        'q': city_name,
        'appid': api_key,
        'units': 'metric', # Para obtener la temperatura en Celsius
        'lang': 'es'      # Para obtener la descripción en español
    }
    
    print(f"\nObteniendo el clima para '{city_name}'...")
    
    try:
        # 3. Realizando la petición con los parámetros
        response = requests.get(base_url, params=params)
        
        # Lanza una excepción para errores HTTP (ej. 401 Unauthorized, 404 Not Found)
        response.raise_for_status() 
        
        data = response.json()
        return data
        
    except requests.exceptions.HTTPError as e:
        # Manejo específico para errores de autenticación o ciudad no encontrada
        if e.response.status_code == 401:
            print("Error de autenticación: Tu API Key es inválida o no tiene permisos.")
        elif e.response.status_code == 404:
            print(f"Error: La ciudad '{city_name}' no fue encontrada.")
        else:
            print(f"Error HTTP: {e}")
        return None
    except requests.exceptions.RequestException as e:
        print(f"Error de conexión: {e}")
        return None

def display_weather(weather_data):
    """Muestra los datos del clima de forma legible."""
    if not weather_data:
        return

    main_weather = weather_data['weather'][0]['description'].capitalize()
    temp = weather_data['main']['temp']
    feels_like = weather_data['main']['feels_like']
    humidity = weather_data['main']['humidity']
    
    print("--- Clima Actual ---")
    print(f"Descripción: {main_weather}")
    print(f"Temperatura: {temp}°C")
    print(f"Sensación térmica: {feels_like}°C")
    print(f"Humedad: {humidity}%")
    print("--------------------")


# --- ¡Vamos a probarlo! ---
ciudad = "Mexico City"
datos_clima = get_weather(ciudad, API_KEY)
if datos_clima:
    display_weather(datos_clima)

ciudad_invalida = "Ciudad Inventada"
datos_clima_invalidos = get_weather(ciudad_invalida, API_KEY)
# No se mostrará nada porque get_weather devolverá None y manejará el error.
```

En este ejemplo, por simplicidad, pasamos la API key como un **parámetro en la URL** (`appid`), que es un método que OpenWeatherMap permite. Sin embargo, el principio es el mismo que enviarla en las cabeceras, lo cual es a menudo la práctica recomendada para mayor seguridad y es algo que `requests` también facilita enormemente.

Hemos aprendido a autenticarnos. Hasta ahora solo hemos *leído* datos. ¿Te gustaría ver cómo *enviarlos* en la **lección 10: Enviando datos con Peticiones POST**?

### Lección 10: Enviando datos con Peticiones POST

Hasta ahora, todas nuestras interacciones con las APIs han sido para *solicitar* datos usando el método `GET`. Ahora, aprenderemos a *enviar* datos para crear un nuevo recurso en un servidor. Para esto, se utiliza el método `POST`.

Piensa en `GET` como "leer" y en `POST` como "escribir" o "crear".

Cuando envías una petición `POST`, incluyes los datos del nuevo recurso en el **cuerpo (body)** de la petición. Normalmente, estos datos se envían en formato JSON. La librería `requests` nos lo pone muy fácil: simplemente creamos un diccionario de Python con los datos y se lo pasamos al parámetro `json` de la función `requests.post()`. La librería se encargará de convertirlo a JSON y de poner las cabeceras correctas.

En este ejemplo, usaremos de nuevo **JSONPlaceholder** para crear un nuevo "post" (publicación). Aunque es una API de prueba y no guardará realmente nuestros datos, nos devolverá una respuesta como si lo hubiera hecho, perfecta para aprender.

```python
# 10_Peticiones_POST/crear_post.py

import requests

def create_new_post(title, body, user_id):
    """
    Envía una petición POST a JSONPlaceholder para crear un nuevo post.
    """
    api_url = "https://jsonplaceholder.typicode.com/posts"
    
    # 1. Preparamos los datos en un diccionario de Python.
    # La estructura debe coincidir con lo que la API espera.
    post_data = {
        'title': title,
        'body': body,
        'userId': user_id,
    }
    
    print(f"\nEnviando datos para crear un nuevo post titulado: '{title}'")
    
    try:
        # 2. Realizamos la petición POST.
        # Pasamos los datos a través del parámetro 'json'.
        # requests se encarga de la serialización y las cabeceras.
        response = requests.post(api_url, json=post_data)
        
        # 3. Verificamos la respuesta.
        # Un POST exitoso para crear suele devolver 201.
        response.raise_for_status()
        
        # 4. Obtenemos el recurso recién creado de la respuesta.
        newly_created_post = response.json()
        
        print(f"¡Éxito! El post fue creado con el código de estado: {response.status_code}")
        return newly_created_post
        
    except requests.exceptions.RequestException as e:
        print(f"Ha ocurrido un error al crear el post: {e}")
        return None

# --- ¡Vamos a probarlo! ---
nuevo_titulo = "Mi Aventura con Python y APIs"
nuevo_cuerpo = "Aprender a usar requests ha sido una experiencia increíble para interactuar con la web."
id_usuario = 101 # Un ID de usuario de ejemplo

# Llamamos a nuestra función para crear el post
post_creado = create_new_post(nuevo_titulo, nuevo_cuerpo, id_usuario)

# Si se creó correctamente, mostramos la respuesta del servidor.
if post_creado:
    print("\n--- Respuesta del Servidor (Post Creado) ---")
    print(f"ID del nuevo post (asignado por la API): {post_creado['id']}")
    print(f"Título: {post_creado['title']}")
    print(f"Cuerpo: {post_creado['body']}")
    print(f"ID de Usuario: {post_creado['userId']}")
    print("------------------------------------------")
```

¡Y con esto concluimos el curso!

Has completado un viaje increíble, desde los fundamentos de la Programación Orientada a Objetos (Clases, Herencia, Polimorfismo) hasta convertirte en un usuario competente de APIs web, capaz de leer datos (`GET`), manejar errores, autenticarte (`API Keys`) y ahora, crear recursos (`POST`).

Estas habilidades son la base para construir aplicaciones mucho más complejas, como bots de redes sociales, paneles de datos en tiempo real, scripts de automatización y mucho más. ¡El siguiente paso es empezar a construir tus propios proyectos!

## Ejercicios Prácticos

### Tema 1: Clases, Objetos, Atributos y Métodos (Lecciones 0-1)

**Fácil: Clase `Libro`**
Crea una clase `Libro` con un constructor `__init__` que reciba `titulo`, `autor` y `paginas`. La clase debe tener un método `descripcion()` que imprima una frase como: "El libro 'El Quijote' por Miguel de Cervantes tiene 300 páginas."

**Intermedio: Clase `Estudiante`**
Crea una clase `Estudiante` con atributos `nombre`, `edad` y una lista vacía `calificaciones`. Añade métodos para:
- `agregar_calificacion(nota)`: Añade una nota a la lista.
- `promedio()`: Calcula y devuelve el promedio de las calificaciones.
- `estado()`: Devuelve "Aprobado" si el promedio es >= 6, "Reprobado" en caso contrario.

**Difícil: Clase `CuentaBancaria`**
Diseña una clase `CuentaBancaria` con atributos `titular`, `saldo` (inicial = 0). Implementa métodos:
- `depositar(cantidad)`: Suma al saldo si la cantidad es positiva.
- `retirar(cantidad)`: Resta del saldo solo si hay fondos suficientes.
- `consultar_saldo()`: Muestra el saldo actual.
- `historial`: Una lista que registre todas las operaciones realizadas.

### Tema 2: Encapsulamiento y Abstracción (Lección 2)

**Fácil: Clase `Termometro`**
Crea una clase `Termometro` con un atributo privado `_temperatura`. Usa `@property` para leer la temperatura y un setter que solo permita valores entre -50 y 50 grados.

**Intermedio: Clase `Producto`**
Diseña una clase `Producto` con atributos privados `_nombre`, `_precio` y `_stock`. Usa properties para:
- Leer todos los atributos.
- El precio solo puede ser positivo.
- El stock no puede ser negativo.
- Método `vender(cantidad)` que reduzca el stock si hay suficiente.

### Tema 3: Herencia (Lección 3)

**Fácil: Jerarquía de Animales**
Crea una clase base `Animal` con `nombre` y método `hacer_sonido()`. Luego crea clases `Perro` y `Gato` que hereden de `Animal` y sobrescriban `hacer_sonido()`.

**Intermedio: Vehículos Especializados**
Extiende el ejemplo del curso. Crea una clase `Motocicleta` que herede de `Vehiculo` y añade atributos específicos como `cilindrada` y método `hacer_caballito()`.

### Tema 4: APIs (Lecciones 5-10)

**Fácil: Consulta de Chistes**
Usa la API gratuita de chistes (https://api.chucknorris.io/jokes/random) para crear un programa que obtenga y muestre un chiste aleatorio.

**Intermedio: Clase `ClimaConsultor`**
Crea una clase que encapsule la funcionalidad de consulta del clima. Debe poder consultar múltiples ciudades y mantener un historial de consultas.

**Difícil: Sistema de Gestión de Tareas**
Combina POO y APIs para crear un sistema que:
- Use la clase `Tarea` para modelar tareas localmente.
- Se sincronice con JSONPlaceholder para obtener/crear/actualizar tareas.
- Maneje errores de conexión y datos inválidos.
- Mantenga una caché local de las tareas.

## Parte 2: Mini-Proyectos Finales

Estos proyectos integran todo lo que hemos aprendido, desde las clases hasta el consumo de APIs y el manejo de errores.

### Proyecto 1: Tu Pokédex Personal

**Descripción:** Crear una aplicación de consola interactiva que permita a los usuarios buscar información sobre Pokémon y crear su propio equipo.

**Requisitos:**

**Clase Pokemon:** Utiliza y mejora la clase Pokemon que creamos en las lecciones, asegurándote de que maneje correctamente la excepción `PokemonNotFoundException`.

**Menú Interactivo:** El programa debe mostrar un menú con opciones como:
- "1. Buscar Pokémon"
- "2. Ver mi equipo"
- "3. Salir"

**Buscar Pokémon:**
- El usuario introduce un nombre o número de Pokémon.
- El programa crea una instancia de la clase Pokemon. Si el Pokémon no se encuentra, captura la excepción y se lo informa al usuario.
- Si se encuentra, muestra su descripción (usando el método `.describe()`) y pregunta al usuario si desea "capturarlo" (agregarlo a su equipo).

**Equipo Pokémon:**
- Mantén una lista que funcione como el "equipo" del usuario.
- Si el usuario decide capturar un Pokémon, el objeto Pokemon se añade a esta lista.
- La opción "Ver mi equipo" debe iterar sobre la lista y mostrar de forma resumida cada Pokémon del equipo (ej. "Pikachu (Eléctrico)").

**Bucle Principal:** El programa debe seguir funcionando y mostrando el menú hasta que el usuario elija la opción de salir.

### Proyecto 2: Gestor de Tareas Conectado a la Nube

**Descripción:** Crear un gestor de tareas pendientes (To-Do list) que permita al usuario crear nuevas tareas y enviarlas a un servidor usando la API de JSONPlaceholder.

**Requisitos:**

**Clase Tarea:** Crea una clase `Tarea` con atributos `titulo`, `completada` (un booleano) y `id_usuario`.

**Interfaz de Usuario:** Una aplicación de consola que permita:
- "1. Crear nueva tarea"
- "2. Ver mis tareas enviadas"
- "3. Salir"

**Crear Tarea:**
- Pide al usuario que introduzca el título de la tarea.
- Utiliza la función que creaste en la lección 10 para hacer una petición POST a `https://jsonplaceholder.typicode.com/todos` con el título, un `userId` fijo (puedes usar 1) y `completed: false`.

**Tareas Enviadas:**
- Mantén una lista local con las tareas que el programa ha enviado con éxito.
- Cuando una tarea se crea correctamente vía POST, la API devuelve el objeto creado con un nuevo `id`. Almacena este objeto completo en tu lista.
- La opción "Ver mis tareas enviadas" debe mostrar todas las tareas de la lista, incluyendo el `id` asignado por el servidor.

**Manejo de Errores:** Asegúrate de que tu función de POST maneje correctamente los posibles errores de red o del servidor e informe al usuario si una tarea no pudo ser creada.
