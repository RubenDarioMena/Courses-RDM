# Clases y APIs

Aprende Programación Orientada a Objetos y cómo interactuar con APIs web
usando Python

## \[Accordion\] Lección 00: Introducción a las Clases y Objetos

¿Qué es la Programación Orientada a Objetos? La Programación Orientada a
Objetos (POO) es un paradigma de programación que organiza el código en
torno a objetos en lugar de funciones y lógica. Un objeto es una entidad
que combina datos (llamados atributos ) y comportamientos (llamados
métodos ). Imagina que quieres modelar un coche en tu programa. En lugar
de tener variables sueltas como marca_coche , modelo_coche ,
velocidad_coche y funciones separadas como acelerar_coche() ,
frenar_coche() , la POO te permite agrupar todo esto en una sola
entidad: un objeto Coche . ¿Qué es una Clase? Una clase es como un
“molde” o “plantilla” que define qué atributos y métodos tendrán los
objetos de ese tipo. Es la receta, no el pastel en sí. Por ejemplo, la
clase Coche podría definir que todos los coches tienen: Atributos:
marca, modelo, velocidad Métodos: acelerar(), frenar(), encender() ¿Qué
es un Objeto? Un objeto (también llamado instancia ) es una creación
específica basada en una clase. Es el pastel hecho con la receta. Por
ejemplo, mi_honda = Coche(“Honda”, “Civic”) crearía un objeto específico
con esos valores. Tu Primera Clase en Python Vamos a crear nuestra
primera clase. En Python, definimos una clase usando la palabra clave
class : \# 00_Primera_Clase/coche_basico.py

class Coche: \# El método **init** es el “constructor” de la clase. \#
Se ejecuta automáticamente cuando creamos un nuevo objeto. def
**init**(self, marca, modelo): \# Los atributos se definen con
self.nombre_atributo self.marca = marca self.modelo = modelo
self.velocidad = 0 \# Todos los coches empiezan parados

    # Los métodos son funciones que pertenecen a la clase
    def acelerar(self, incremento):
        self.velocidad += incremento
        print(f"El {self.modelo} acelera. Velocidad actual: {self.velocidad} km/h")

    def frenar(self, decremento):
        self.velocidad -= decremento
        if self.velocidad < 0:
            self.velocidad = 0
        print(f"El {self.modelo} frena. Velocidad actual: {self.velocidad} km/h")

    def descripcion(self):
        return f"Coche {self.marca} {self.modelo}, velocidad: {self.velocidad} km/h"

# — Creando y usando objetos —

# Crear dos objetos de la clase Coche

mi_coche = Coche(“Toyota”, “Corolla”) tu_coche = Coche(“Honda”, “Civic”)

# Usar los métodos de los objetos

print(mi_coche.descripcion()) mi_coche.acelerar(50) mi_coche.frenar(20)

print(“” + “=”\*40 + “”)

print(tu_coche.descripcion()) tu_coche.acelerar(80)
tu_coche.acelerar(20) \# Acelerar más

# Acceder directamente a los atributos

print(f”del mi_coche: {mi_coche.marca}“) print(f”Velocidad del tu_coche:
{tu_coche.velocidad}“) En este ejemplo, hemos creado dos objetos
diferentes ( mi_coche y tu_coche ) a partir de la misma clase Coche .
Cada uno tiene sus propios valores para los atributos, pero comparten
los mismos métodos. ¿Notas cómo cada objeto mantiene su propio estado?
Cuando mi_coche acelera, no afecta la velocidad de tu_coche . ¡Esa es la
magia de la POO!

## \[End Accordion\]

## \[Accordion\] Lección 01: Métodos y Atributos más Avanzados

Ahora que entiendes los conceptos básicos, vamos a hacer nuestra clase
Coche más realista y funcional. Añadiremos más atributos, métodos más
inteligentes y algunas validaciones. Mejorando nuestra Clase Coche En
esta versión, nuestro coche tendrá: Un estado de encendido/apagado Un
nivel de combustible Métodos que interactúan entre sí de forma lógica
Validaciones para evitar comportamientos imposibles \#
01_Coche_Avanzado/coche_mejorado.py

class Coche: def **init**(self, marca, modelo, combustible_inicial=50):
self.marca = marca self.modelo = modelo self.velocidad = 0
self.encendido = False \# El coche empieza apagado self.combustible =
combustible_inicial \# Litros de combustible self.kilometraje = 0 \#
Kilómetros recorridos

    def encender(self):
        if self.combustible > 0:
            self.encendido = True
            print(f"El {self.modelo} se ha encendido. ¡Vroom!")
        else:
            print(f"No se puede encender el {self.modelo}. Sin combustible.")

    def apagar(self):
        if self.encendido:
            self.encendido = False
            self.velocidad = 0  # Al apagar, se detiene
            print(f"El {self.modelo} se ha apagado.")
        else:
            print(f"El {self.modelo} ya estaba apagado.")

    def acelerar(self, incremento):
        if not self.encendido:
            print(f"¡No puedes acelerar! El {self.modelo} está apagado.")
            return
        
        if self.combustible <= 0:
            print(f"¡Sin combustible! El {self.modelo} se detiene.")
            self.apagar()
            return
        
        # Acelerar consume combustible
        self.velocidad += incremento
        consumo = incremento * 0.1  # 0.1 litros por cada km/h de incremento
        self.combustible -= consumo
        
        # Asegurar que el combustible no sea negativo
        if self.combustible < 0:
            self.combustible = 0
        
        print(f"El {self.modelo} acelera a {self.velocidad} km/h. Combustible: {self.combustible:.1f}L")

    def frenar(self, decremento):
        if not self.encendido:
            print(f"El {self.modelo} ya está detenido (apagado).")
            return
        
        self.velocidad -= decremento
        if self.velocidad < 0:
            self.velocidad = 0
        
        print(f"El {self.modelo} reduce la velocidad a {self.velocidad} km/h")

    def conducir(self, distancia_km):
        """Simula conducir una cierta distancia"""
        if not self.encendido:
            print(f"Primero enciende el {self.modelo}.")
            return
        
        if self.velocidad == 0:
            print(f"Acelera primero. El {self.modelo} está parado.")
            return
        
        # Calcular tiempo y consumo
        tiempo_horas = distancia_km / self.velocidad
        consumo = distancia_km * 0.08  # 8 litros por cada 100 km
        
        if consumo > self.combustible:
            distancia_posible = self.combustible / 0.08
            print(f"Solo puedes conducir {distancia_posible:.1f} km con el combustible restante.")
            self.combustible = 0
            self.kilometraje += distancia_posible
            self.apagar()
        else:
            self.combustible -= consumo
            self.kilometraje += distancia_km
            print(f"Has conducido {distancia_km} km en {tiempo_horas:.1f} horas.")
            print(f"Combustible restante: {self.combustible:.1f}L, Kilometraje total: {self.kilometraje:.1f} km")

    def repostar(self, litros):
        """Añade combustible al tanque"""
        capacidad_maxima = 60
        if self.combustible + litros > capacidad_maxima:
            litros_añadidos = capacidad_maxima - self.combustible
            self.combustible = capacidad_maxima
            print(f"Tanque lleno. Se añadieron {litros_añadidos:.1f} litros.")
        else:
            self.combustible += litros
            print(f"Repostado: +{litros}L. Combustible actual: {self.combustible:.1f}L")

    def estado_completo(self):
        """Muestra toda la información del coche"""
        estado = "encendido" if self.encendido else "apagado"
        print(f"\n--- Estado del {self.marca} {self.modelo} ---")
        print(f"Estado: {estado}")
        print(f"Velocidad: {self.velocidad} km/h")
        print(f"Combustible: {self.combustible:.1f}L")
        print(f"Kilometraje: {self.kilometraje:.1f} km")
        print("=" * 40)

# — ¡Vamos a probarlo! —

mi_coche = Coche(“Mazda”, “CX-5”, 40) \# Empezamos con 40L

mi_coche.estado_completo()

# Intentar acelerar sin encender (debería fallar)

mi_coche.acelerar(50)

# Encender y acelerar

mi_coche.encender() mi_coche.acelerar(60) mi_coche.acelerar(20) \#
Acelerar más

# Conducir una distancia

mi_coche.conducir(100)

mi_coche.estado_completo()

# Repostar

mi_coche.repostar(20)

# Conducir hasta quedarse sin combustible

mi_coche.conducir(500) \# Intentar una distancia larga

mi_coche.estado_completo() Esta versión es mucho más realista. Los
métodos interactúan entre sí: no puedes acelerar si el coche está
apagado, el combustible se consume al acelerar y conducir, y el coche se
apaga automáticamente si se queda sin combustible. ¿Notas cómo los
objetos ahora tienen un comportamiento coherente ? Esto es lo que hace
poderosa a la POO: los objetos no son solo contenedores de datos, sino
entidades que saben cómo comportarse .

## \[End Accordion\]

## \[Accordion\] Lección 02: Encapsulamiento y Abstracción

Hasta ahora, cualquiera puede acceder y modificar directamente los
atributos de nuestros objetos. Por ejemplo, alguien podría escribir
mi_coche.velocidad = -100 y romper la lógica de nuestro programa. El
encapsulamiento nos ayuda a proteger los datos internos de nuestros
objetos. ¿Qué es el Encapsulamiento? El encapsulamiento es el principio
de ocultar los detalles internos de un objeto y solo exponer lo que es
necesario. Es como el tablero de un coche: puedes ver la velocidad y
usar el volante, pero no puedes tocar directamente el motor. Atributos
Privados en Python En Python, indicamos que un atributo es “privado”
(interno) añadiendo un guión bajo \_ al principio de su nombre. Aunque
técnicamente aún se puede acceder, es una convención que indica “no
toques esto desde fuera de la clase”. Properties: Controlando el Acceso
Las properties nos permiten crear métodos que se comportan como
atributos, pero con lógica de validación incluida. \#
02_Encapsulamiento/coche_encapsulado.py

class Coche: def **init**(self, marca, modelo): self.marca = marca
self.modelo = modelo \# Atributos “privados” (por convención)
self.\_velocidad = 0 self.\_encendido = False self.\_combustible = 50.0

    # --- PROPERTIES PARA VELOCIDAD ---
    @property
    def velocidad(self):
        """Getter: permite leer la velocidad"""
        return self._velocidad

    @velocidad.setter
    def velocidad(self, nueva_velocidad):
        """Setter: controla cómo se modifica la velocidad"""
        if nueva_velocidad < 0:
            print("La velocidad no puede ser negativa. Se establece en 0.")
            self._velocidad = 0
        elif nueva_velocidad > 200:
            print("Velocidad máxima es 200 km/h. Se establece en 200.")
            self._velocidad = 200
        else:
            self._velocidad = nueva_velocidad

    # --- PROPERTIES PARA COMBUSTIBLE ---
    @property
    def combustible(self):
        """Getter: permite leer el nivel de combustible"""
        return self._combustible

    @combustible.setter
    def combustible(self, nuevo_combustible):
        """Setter: controla cómo se modifica el combustible"""
        if nuevo_combustible < 0:
            print("El combustible no puede ser negativo. Se establece en 0.")
            self._combustible = 0
        elif nuevo_combustible > 60:
            print("Capacidad máxima del tanque: 60L. Se establece en 60.")
            self._combustible = 60
        else:
            self._combustible = nuevo_combustible

    # --- PROPERTIES PARA ESTADO DE ENCENDIDO ---
    @property
    def encendido(self):
        """Getter: permite leer si el coche está encendido"""
        return self._encendido

    # No definimos un setter para 'encendido' porque queremos que solo
    # se pueda cambiar a través de los métodos encender() y apagar()

    def encender(self):
        if self._combustible > 0:
            self._encendido = True
            print(f"El {self.modelo} se ha encendido.")
        else:
            print("No se puede encender. Sin combustible.")

    def apagar(self):
        self._encendido = False
        self._velocidad = 0
        print(f"El {self.modelo} se ha apagado.")

    def acelerar(self, incremento):
        if not self._encendido:
            print("El coche debe estar encendido para acelerar.")
            return
        
        # Usamos la property, que aplicará las validaciones automáticamente
        self.velocidad = self._velocidad + incremento
        
        # Consumir combustible
        consumo = incremento * 0.05
        self.combustible = self._combustible - consumo
        
        print(f"Acelerando. Velocidad: {self._velocidad} km/h, Combustible: {self._combustible:.1f}L")

    def descripcion(self):
        estado = "encendido" if self._encendido else "apagado"
        return f"{self.marca} {self.modelo} - {estado}, {self._velocidad} km/h, {self._combustible:.1f}L"

# — ¡Vamos a probarlo! —

mi_tesla = Coche(“Tesla”, “Model 3”)

print(“=== Prueba 1: Uso normal ===”) mi_tesla.encender()
mi_tesla.acelerar(50) print(mi_tesla.descripcion())

print(“=== Prueba 2: Intentando valores inválidos ===”) \# Estas
asignaciones activarán las validaciones de los setters
mi_tesla.velocidad = 250 \# Demasiado rápido, se limitará a 200
print(f”Velocidad después de intentar 250: {mi_tesla.velocidad} km/h”)

mi_tesla.velocidad = -30 \# El setter lo corregirá print(f”Leyendo la
velocidad después de intentar ponerla negativa: {mi_tesla.velocidad}
km/h.”)

# Aunque la convención es no hacerlo, Python aún permite el acceso si insistes.

# ESTO SE CONSIDERA UNA MALA PRÁCTICA.

# mi_tesla.\_velocidad = -100

# print(f”modificada a la fuerza: {mi_tesla.\_velocidad}“)

Ahora nuestro objeto Coche es más robusto. Protege sus datos internos y
solo permite modificarlos de manera controlada a través de sus métodos y
propiedades, ocultando la complejidad interna.

## \[End Accordion\]

## \[Accordion\] Lección 03: Herencia

La herencia nos permite crear una nueva clase que “hereda” todas las
propiedades (atributos) y comportamientos (métodos) de una clase ya
existente. Esto es increíblemente útil para reutilizar código y crear
una jerarquía lógica entre nuestras clases. La clase original se conoce
como clase padre o superclase . La nueva clase se conoce como clase hija
o subclase . Imagina que queremos representar un coche eléctrico. Un
coche eléctrico es, en esencia, un coche, por lo que comparte muchas
características: tiene marca, modelo, se puede encender, apagar y
acelerar. Sin embargo, tiene características únicas, como una batería en
lugar de un tanque de gasolina. En lugar de crear una clase
CocheElectrico desde cero, podemos hacer que herede de nuestra clase
Coche y luego añadirle sus particularidades. En el siguiente código,
haremos tres cosas clave: Crearemos una clase CocheElectrico que hereda
de Coche . Extenderemos el constructor **init** para añadir atributos
específicos del coche eléctrico. Sobrescribiremos un método del padre
para darle un comportamiento específico. \#
03_Herencia/coche_electrico.py

# — 1. Clase Padre (Superclase) —

# Usaremos una versión ligeramente simplificada de nuestra clase Coche.

class Coche: def **init**(self, marca, modelo): self.marca = marca
self.modelo = modelo self.\_encendido = False self.\_velocidad = 0

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

# — 2. Clase Hija (Subclase) —

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

# — Uso de las clases —

print(“— Usando el objeto de la clase Padre —”) coche_normal =
Coche(“Honda”, “Civic”) print(coche_normal.descripcion())
coche_normal.encender() coche_normal.acelerar(40)

print(“— Usando el objeto de la clase Hija —”) mi_tesla =
CocheElectrico(“Tesla”, “Model S”, 100)

# El Tesla puede usar métodos heredados del Coche…

mi_tesla.encender() mi_tesla.acelerar(120)

# …y también sus propios métodos.

mi_tesla.cargar_bateria()

# Cuando llamamos a descripcion(), se ejecuta la versión de CocheElectrico (la sobrescrita).

print(mi_tesla.descripcion()) Gracias a la herencia, hemos creado una
clase más especializada ( CocheElectrico ) reutilizando toda la lógica
de la clase Coche y sin tener que repetir código. Este es un concepto
fundamental para construir software escalable y bien organizado.

## \[End Accordion\]

## \[Accordion\] Lección 04: Polimorfismo y Duck Typing

Polimorfismo (del griego, “muchas formas”) es la capacidad que tienen
objetos de diferentes clases para responder a la misma llamada de
método. La herencia es una forma de lograr polimorfismo, pero no la
única. Python utiliza un concepto llamado Duck Typing , que encapsula
esta idea de una forma muy pragmática. La frase dice: “Si camina como un
pato (walks like a duck) y grazna como un pato (quacks like a duck),
entonces debe ser un pato.” En programación, esto significa que a Python
no le interesa la clase o el tipo de un objeto, sino los métodos que
tiene . Si un objeto tiene el método que intentamos llamar, Python lo
ejecutará sin problemas, sin importar si hereda de una clase específica
o no. En este ejemplo, crearemos varias clases de “vehículos”. Algunas
heredarán entre sí y otras no. Luego, crearemos una función que puede
trabajar con una lista de cualquiera de estos vehículos, siempre y
cuando tengan un método en común ( avanzar ), demostrando el
polimorfismo en acción. \# 04_Polimorfismo_y_Duck_Typing/vehiculos.py

class Coche: def **init**(self, marca): self.marca = marca

    def avanzar(self):
        print(f"El coche {self.marca} avanza por la carretera.")

class CocheElectrico(Coche): \# Esta clase hereda de Coche. def
avanzar(self): \# Sobrescribe el método del padre para darle un
comportamiento específico. print(f”El coche eléctrico {self.marca} se
desliza silenciosamente.”)

class Bicicleta: \# Esta clase NO hereda de Coche, es completamente
independiente. def **init**(self, tipo): self.tipo = tipo

    # Pero TIENE un método que se llama igual: avanzar.
    def avanzar(self):
        print(f"La bicicleta de tipo '{self.tipo}' avanza pedaleando.")

# — Función Polimórfica —

# A esta función no le importa el tipo de objetos que recibe.

# Solo le importa que cada objeto en la lista TENGA un método llamado .avanzar()

def mover_vehiculos(lista_vehiculos): print(“— Iniciando el movimiento
de todos los vehículos —”) for vehiculo in lista_vehiculos: \# Aquí
ocurre la magia del polimorfismo y el duck typing. \# Python simplemente
llama al método .avanzar() del objeto ‘vehiculo’, \# sea cual sea su
clase. vehiculo.avanzar() print(“— Todos los vehículos se han movido —”)

# — Creando los objetos —

mi_civic = Coche(“Honda Civic”) mi_tesla = CocheElectrico(“Tesla Model
Y”) mi_bici = Bicicleta(“Montaña”)

# Creamos una lista con objetos de diferentes clases.

vehiculos = \[mi_civic, mi_tesla, mi_bici\]

# — Ejecutando la función —

# Le pasamos la lista heterogénea a nuestra función.

# Ella sabrá qué hacer con cada objeto.

mover_vehiculos(vehiculos) Como puedes ver, la función mover_vehiculos
funciona perfectamente con una mezcla de objetos de clases Coche ,
CocheElectrico y Bicicleta . No necesita ninguna lógica if o elif para
comprobar el tipo de cada objeto. Simplemente confía en que cada
“vehículo” sabrá cómo “avanzar” a su manera. Este es un principio de
diseño muy poderoso que hace que el código sea más flexible y
reutilizable. Ahora que hemos cubierto los pilares de la Programación
Orientada a Objetos, ¿estás listo para dar el salto al mundo de las APIs
en la lección 05: Introducción a las APIs y HTTP ?

## \[End Accordion\]

## \[Accordion\] Lección 05: Introducción a las APIs y HTTP

Ahora que sabemos cómo crear y organizar nuestros propios objetos, el
siguiente paso es hacer que nuestros programas se comuniquen con otros
sistemas a través de internet. Aquí es donde entran las APIs. ¿Qué es
una API? API son las siglas de I nterfaz de P rogramación de A
plicaciones ( Application Programming Interface ). Piensa en ella como
un camarero en un restaurante : Tú (el cliente): Eres tu programa, que
necesita datos o quiere realizar una acción. La cocina (el servidor): Es
donde están los datos o donde se ejecutan las operaciones que necesitas.
El camarero (la API): Es el intermediario que toma tu pedido, lo lleva a
la cocina, y te trae de vuelta lo que solicitaste. ¿Cómo funciona la
comunicación HTTP? Las APIs web utilizan el protocolo HTTP ( HyperText
Transfer Protocol ) para comunicarse. Es el mismo protocolo que usa tu
navegador para cargar páginas web, pero en lugar de devolver HTML, las
APIs devuelven datos en formatos como JSON . Los métodos HTTP más
comunes son: GET: Para obtener datos (como leer un artículo). POST: Para
crear nuevos datos (como publicar un comentario). PUT: Para actualizar
datos existentes. DELETE: Para eliminar datos. ¿Qué es JSON? JSON (
JavaScript Object Notation ) es un formato de texto para intercambiar
datos. Aunque su nombre incluye “JavaScript”, es independiente del
lenguaje y se usa en casi todas las tecnologías modernas. JSON se parece
mucho a los diccionarios de Python: { “nombre”: “Pikachu”, “tipo”:
“Eléctrico”, “id”: 25, “habilidades”: \[ “Impactrueno”, “Ataque Rápido”
\] } Hemos sentado las bases teóricas. Ahora ya sabes qué es una API,
cómo funciona la comunicación HTTP y en qué formato recibiremos los
datos. ¿Estás listo para escribir código en la lección 06 y realizar tu
primera petición real a una API ?

## \[End Accordion\]

## \[Accordion\] Lección 06: Realizando tu primera petición con `requests`

Para interactuar con APIs en Python, la librería requests es el estándar
de oro. No forma parte de la biblioteca estándar de Python, por lo que
si no la tienes, necesitarás instalarla abriendo tu terminal o línea de
comandos y ejecutando: pip install requests Una vez instalada, usarla es
increíblemente sencillo. En esta lección, haremos nuestra primera
petición GET a JSONPlaceholder , una API gratuita y falsa, perfecta para
practicar. Solicitaremos un único “to-do” (tarea pendiente) y
mostraremos los datos que nos devuelva. El proceso es simple: Importar
la librería requests . Definir la URL del endpoint al que queremos
acceder. Usar requests.get() para enviar la petición. Verificar el
código de estado de la respuesta para asegurarnos de que todo fue bien (
200 OK ). Si la respuesta es exitosa, convertir el cuerpo de la
respuesta (que viene en formato JSON) a un diccionario de Python usando
el método .json() . ¡Usar los datos! \#
06_Primera_Peticion_API/primera_peticion.py

import requests \# 1. Importar la librería

# 2. Definir la URL del endpoint

# Este endpoint de JSONPlaceholder nos devuelve una única tarea (to-do).

url = “https://jsonplaceholder.typicode.com/todos/1”

print(f”Realizando una petición GET a: {url}“)

try: \# 3. Realizar la petición GET response = requests.get(url)

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

except requests.exceptions.RequestException as e: \# Este bloque se
ejecutará si hay un problema de red, \# un código de estado de error
(como 404 o 500), etc. print(f”Ha ocurrido un error al realizar la
petición: {e}“) ¡Felicidades! Acabas de escribir un programa que se
conecta a un servidor en internet, solicita datos, los recibe y los
procesa. Has dado un paso gigante, pasando de programas que solo existen
en tu ordenador a programas que pueden interactuar con el mundo. Ahora
que sabes cómo obtener datos, ¿te parece que unamos nuestros
conocimientos de Clases y APIs en la lección 07: Proyecto Práctico:
Consulta de API de Pokémon ?

## \[End Accordion\]

## \[Accordion\] Lección 07: Proyecto Práctico: Consulta de API de Pokémon

En las lecciones anteriores aprendimos a crear clases para modelar
objetos y, por separado, a consumir APIs para obtener datos. Ahora,
combinaremos ambos conceptos para crear un programa realmente dinámico.
El objetivo: Crearemos una clase Pokemon . La magia está en que, al
crear un objeto de esta clase, no le pasaremos los datos directamente.
En su lugar, le daremos el nombre o el número de un Pokémon. La propia
clase será responsable de conectarse a la PokéAPI (una API pública y
gratuita sobre Pokémon), buscar la información y rellenar sus propios
atributos con los datos recibidos. Esto demuestra un patrón de diseño
muy potente: objetos que se “autoconstruyen” a partir de una fuente de
datos externa. \# 07_Proyecto_Pokemon_API/pokemon_api.py

import requests

class Pokemon: ““” Una clase que representa a un Pokémon. Al
instanciarla, consulta la PokéAPI para obtener y almacenar sus datos.
““” \# URL base de la API. Usaremos una f-string para añadir el nombre o
ID. base_url = “https://pokeapi.co/api/v2/pokemon/”

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

# — ¡Vamos a probarlo! —

# Creamos un Pokémon usando su nombre

charizard = Pokemon(“charizard”) charizard.describe()

# Creamos otro Pokémon usando su número de Pokédex

bulbasaur = Pokemon(1) bulbasaur.describe()

# Intentamos crear un Pokémon que no existe para ver el error

missingno = Pokemon(“missingno”) missingno.describe() ¡Ahí lo tienes!
Has creado una clase inteligente que sabe cómo obtener y configurar sus
propios datos. Este es un paso fundamental para crear aplicaciones más
complejas y desacopladas. En el último ejemplo, vimos que el programa
muestra un error cuando un Pokémon no se encuentra. Sería ideal manejar
estos errores de una forma más controlada. ¿Te parece si abordamos eso
en la lección 08: Manejo de Errores y Excepciones ?

## \[End Accordion\]

## \[Accordion\] Lección 08: Manejo de Errores y Excepciones

En la lección anterior, nuestro programa imprime un mensaje cuando un
Pokémon no se encuentra. Esto funciona, pero es una práctica limitada.
¿Qué pasa si otro programador usa nuestra clase Pokemon y necesita saber
mediante código si la búsqueda falló para poder reaccionar? Simplemente
imprimir un texto no es suficiente. Aquí es donde entra el manejo de
excepciones . Una excepción es un error que ocurre durante la ejecución
de un programa y que interrumpe su flujo normal. Usamos el bloque
try…except para “intentar” ejecutar un código que podría fallar y
“capturar” la excepción si ocurre, permitiéndonos manejar el error sin
que el programa se detenga bruscamente. Para hacer nuestro código más
profesional, haremos dos cosas: Crearemos nuestra propia excepción
personalizada ( PokemonNotFoundException ). Esto hace que nuestro código
sea más expresivo y fácil de usar. Modificaremos nuestra clase Pokemon
para que lance esta excepción cuando no encuentre un Pokémon, en lugar
de simplemente imprimir un mensaje. \#
08_Manejo_de_Errores/pokemon_con_excepciones.py

import requests

# 1. Definimos nuestra propia clase de Excepción.

# Es una buena práctica que herede de la clase base Exception de Python.

class PokemonNotFoundException(Exception): “““Excepción personalizada
para cuando un Pokémon no es encontrado en la API.”“” pass \# No
necesita lógica adicional, solo el nombre es suficiente.

class Pokemon: base_url = “https://pokeapi.co/api/v2/pokemon/”

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

# — ¡Vamos a probarlo! —

# Ahora, el código que USA nuestra clase es responsable de manejar los errores.

pokemon_a_buscar = \[“pikachu”, “mewtwo”, “greymon”, “151”\]

for p in pokemon_a_buscar: try: \# 3. Intentamos crear la instancia del
Pokémon. pokemon_obj = Pokemon(p) pokemon_obj.describe() except
PokemonNotFoundException as e: \# 4. Si se lanza nuestra excepción
personalizada, la capturamos aquí. \# Esto nos permite manejar el error
de forma controlada. print(f”: No se pudo crear el objeto para ‘{p}’.”)
print(f”Razón: {e}“) Ahora nuestro código es mucho más robusto y
reutilizable. La clase Pokemon notifica claramente cuando ocurre un
error, y el código que la utiliza puede decidir qué hacer en ese caso,
en lugar de depender de un simple mensaje impreso. Hasta ahora hemos
trabajado con APIs públicas y abiertas. ¿Qué tal si en la siguiente
lección aprendemos a interactuar con servicios que requieren un permiso
especial? Continuemos con la lección 09: Autenticación en APIs .

## \[End Accordion\]

## \[Accordion\] Lección 09: Autenticación en APIs (con API Key)

Las APIs abiertas como PokéAPI son fantásticas para aprender, pero la
mayoría de las APIs que usarás en proyectos reales te pedirán que te
identifiques. La forma más común de hacerlo es mediante una API Key .
Una API Key es simplemente una cadena de texto única (como una
contraseña larga) que el proveedor de la API te da cuando te registras
en su servicio. Tu aplicación debe incluir esta clave en cada petición
que realiza. De esta manera, el servidor de la API sabe quién eres,
comprueba si tienes permiso para usar el servicio y lleva la cuenta de
cuántas peticiones has hecho (muchos servicios tienen límites
gratuitos). ¿Cómo se envía la API Key? Hay varias formas, pero una de
las más comunes y seguras es enviarla en las cabeceras (headers) de la
petición HTTP. Las cabeceras son metadatos que viajan junto a tu
petición y le dan información adicional al servidor. En este ejemplo,
usaremos la API de OpenWeatherMap para obtener el clima actual de una
ciudad. Esta API requiere que te registres gratuitamente y obtengas una
API Key. Nota importante sobre seguridad: Nunca hardcodees (escribas
directamente) tu API Key en tu código fuente, especialmente si planeas
compartir el código o subirlo a un repositorio público. En su lugar, usa
variables de entorno o archivos de configuración que no se incluyan en
el control de versiones. \# 09_Autenticacion_API_Key/clima_api.py

import requests import os

# — 1. Almacenando la API Key —

# Es una MALA PRÁCTICA escribir la API Key directamente en el código.

# Una mejor forma es usar variables de entorno.

# Por simplicidad aquí, la pediremos al usuario o la leeremos de una variable.

# Para ejecutarlo, puedes crear una variable de entorno llamada OPENWEATHER_API_KEY

# o simplemente pegar tu clave cuando el script te lo pida.

API_KEY = os.getenv(“OPENWEATHER_API_KEY”) if not API_KEY: API_KEY =
input(“Por favor, introduce tu API Key de OpenWeatherMap:”)

def get_weather(city_name, api_key): ““” Obtiene el clima actual para
una ciudad usando la API de OpenWeatherMap. ““” base_url =
“https://api.openweathermap.org/data/2.5/weather”

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

def display_weather(weather_data): “““Muestra los datos del clima de
forma legible.”“” if not weather_data: return

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

# — ¡Vamos a probarlo! —

ciudad = “Mexico City” datos_clima = get_weather(ciudad, API_KEY) if
datos_clima: display_weather(datos_clima)

ciudad_invalida = “Ciudad Inventada” datos_clima_invalidos =
get_weather(ciudad_invalida, API_KEY) \# No se mostrará nada porque
get_weather devolverá None y manejará el error. En este ejemplo, por
simplicidad, pasamos la API key como un parámetro en la URL ( appid ),
que es un método que OpenWeatherMap permite. Sin embargo, el principio
es el mismo que enviarla en las cabeceras, lo cual es a menudo la
práctica recomendada para mayor seguridad y es algo que requests también
facilita enormemente. Hemos aprendido a autenticarnos. Hasta ahora solo
hemos leído datos. ¿Te gustaría ver cómo enviarlos en la lección 10:
Enviando datos con Peticiones POST ?

## \[End Accordion\]

## \[Accordion\] Lección 10: Enviando datos con Peticiones POST

Hasta ahora, todas nuestras interacciones con las APIs han sido para
solicitar datos usando el método GET . Ahora, aprenderemos a enviar
datos para crear un nuevo recurso en un servidor. Para esto, se utiliza
el método POST . Piensa en GET como “leer” y en POST como “escribir” o
“crear”. Cuando envías una petición POST , incluyes los datos del nuevo
recurso en el cuerpo (body) de la petición. Normalmente, estos datos se
envían en formato JSON. La librería requests nos lo pone muy fácil:
simplemente creamos un diccionario de Python con los datos y se lo
pasamos al parámetro json de la función requests.post() . La librería se
encargará de convertirlo a JSON y de poner las cabeceras correctas. En
este ejemplo, usaremos de nuevo JSONPlaceholder para crear un nuevo
“post” (publicación). Aunque es una API de prueba y no guardará
realmente nuestros datos, nos devolverá una respuesta como si lo hubiera
hecho, perfecta para aprender. \# 10_Peticiones_POST/crear_post.py

import requests

def create_new_post(title, body, user_id): ““” Envía una petición POST a
JSONPlaceholder para crear un nuevo post. ““” api_url =
“https://jsonplaceholder.typicode.com/posts”

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

# — ¡Vamos a probarlo! —

nuevo_titulo = “Mi Aventura con Python y APIs” nuevo_cuerpo = “Aprender
a usar requests ha sido una experiencia increíble para interactuar con
la web.” id_usuario = 101 \# Un ID de usuario de ejemplo

# Llamamos a nuestra función para crear el post

post_creado = create_new_post(nuevo_titulo, nuevo_cuerpo, id_usuario)

# Si se creó correctamente, mostramos la respuesta del servidor.

if post_creado: print(“— Respuesta del Servidor (Post Creado) —”)
print(f”ID del nuevo post (asignado por la API): {post_creado\[‘id’\]}“)
print(f”Título: {post_creado\[‘title’\]}“) print(f”Cuerpo:
{post_creado\[‘body’\]}“) print(f”ID de Usuario:
{post_creado\[‘userId’\]}“) print(”——————————————“) ¡Y con esto
concluimos el curso! Has completado un viaje increíble, desde los
fundamentos de la Programación Orientada a Objetos (Clases, Herencia,
Polimorfismo) hasta convertirte en un usuario competente de APIs web,
capaz de leer datos ( GET ), manejar errores, autenticarte ( API Keys )
y ahora, crear recursos ( POST ). Estas habilidades son la base para
construir aplicaciones mucho más complejas, como bots de redes sociales,
paneles de datos en tiempo real, scripts de automatización y mucho más.
¡El siguiente paso es empezar a construir tus propios proyectos!

## \[End Accordion\]

## \[Accordion\] Parte 1: Ejercicios Prácticos

Ejercicio 1: Clase Biblioteca Crea una clase Libro con atributos como
título, autor, año de publicación y disponibilidad. Luego, crea una
clase Biblioteca que pueda: Agregar libros Buscar libros por título o
autor Prestar un libro (cambiar disponibilidad) Devolver un libro
Mostrar todos los libros disponibles Ejercicio 2: Sistema de Empleados
con Herencia Diseña un sistema de empleados usando herencia: Clase base
Empleado con nombre, ID y salario base Clase Desarrollador que herede de
Empleado y tenga un lenguaje de programación favorito Clase Gerente que
herede de Empleado y tenga una lista de empleados a cargo Implementa
polimorfismo con un método calcular_salario() que se comporte diferente
para cada tipo Ejercicio 3: API de Noticias Usa una API de noticias
gratuita (como NewsAPI) para: Obtener las noticias más recientes de una
categoría específica Filtrar noticias por palabras clave Crear una clase
NoticiaManager que encapsule toda la lógica de la API Implementar manejo
de errores robusto Ejercicio 4: Conversor de Monedas Crea un conversor
de monedas que: Use una API de tipos de cambio (como ExchangeRate-API)
Permita convertir entre diferentes monedas Mantenga un historial de
conversiones realizadas Implemente caché para evitar llamadas
innecesarias a la API

## \[End Accordion\]

## \[Accordion\] Parte 2: Mini-Proyectos Finales

Proyecto 1: Gestor de Tareas con API Descripción: Crea un sistema
completo de gestión de tareas que combine programación orientada a
objetos con consumo de APIs. Características principales: Clases
principales: Tarea : Representa una tarea individual con título,
descripción, fecha límite, prioridad y estado Usuario : Maneja la
información del usuario y sus tareas GestorTareas : Coordina todas las
operaciones y se conecta con APIs externas Funcionalidades: CRUD
completo de tareas (Crear, Leer, Actualizar, Eliminar) Filtrado por
estado, prioridad y fecha Notificaciones automáticas para tareas
próximas a vencer Sincronización con una API externa (como
JSONPlaceholder para simular) Exportación de tareas a diferentes
formatos APIs a integrar: API de clima para sugerir tareas según el
tiempo API de citas motivacionales para mostrar al usuario API de envío
de emails para recordatorios Desafíos técnicos: Implementar persistencia
de datos (guardar en archivos JSON) Manejo robusto de errores de red y
API Interfaz de línea de comandos intuitiva Sistema de logging para
debugging Proyecto 2: Analizador de Redes Sociales Descripción:
Desarrolla una herramienta que analice datos de redes sociales usando
APIs públicas y técnicas de OOP. Características principales: Clases
principales: Post : Representa una publicación con metadatos Usuario :
Información del usuario y sus estadísticas AnalizadorSentimientos :
Analiza el tono de las publicaciones GeneradorReportes : Crea reportes
visuales y estadísticos Funcionalidades: Recopilación de datos de
múltiples fuentes Análisis de tendencias y hashtags populares Detección
de patrones de actividad Generación de gráficos y estadísticas Sistema
de alertas para contenido relevante APIs a integrar: Twitter API (o
alternativas como Mastodon) Reddit API para análisis de comunidades APIs
de análisis de sentimientos APIs de generación de gráficos Desafíos
técnicos: Manejo de rate limits de APIs Procesamiento eficiente de
grandes volúmenes de datos Implementación de caché inteligente Creación
de visualizaciones atractivas Proyecto 3: Sistema de Monitoreo de
Precios Descripción: Construye un sistema que monitoree precios de
productos en línea y notifique cuando haya ofertas. Características
principales: Clases principales: Producto : Información del producto y
historial de precios Tienda : Representa diferentes tiendas online
Monitor : Coordina el seguimiento de precios Notificador : Maneja
alertas por email, SMS, etc. Funcionalidades: Seguimiento automático de
precios Alertas personalizables por umbral de precio Comparación entre
múltiples tiendas Historial de precios con gráficos Predicción de
tendencias de precios APIs a integrar: APIs de e-commerce (Amazon, eBay,
etc.) APIs de notificaciones (SendGrid, Twilio) APIs de análisis de
datos APIs de web scraping (cuando sea necesario) Desafíos técnicos:
Manejo de diferentes formatos de datos de tiendas Implementación de
scheduling para monitoreo continuo Detección y manejo de cambios en las
APIs Optimización para minimizar el uso de recursos Consejos para el
Desarrollo Planificación: Antes de codificar, diseña la arquitectura de
clases y las interacciones entre componentes Desarrollo incremental:
Implementa funcionalidades básicas primero y añade complejidad
gradualmente Testing: Prueba cada componente por separado antes de
integrar Documentación: Documenta tu código y crea un README detallado
Manejo de errores: Implementa logging y manejo robusto de excepciones
desde el inicio Seguridad: Nunca hardcodees API keys; usa variables de
entorno Performance: Considera el uso de caché y optimizaciones cuando
manejes grandes volúmenes de datos ¡Recursos adicionales recomendados:
Documentación oficial de las APIs que uses Librerías útiles: pandas para
análisis de datos, matplotlib para gráficos, schedule para tareas
programadas Herramientas de testing: pytest para pruebas unitarias
Control de versiones: Git y GitHub para gestionar tu código

## \[End Accordion\]
