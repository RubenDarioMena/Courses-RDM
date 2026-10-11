

Fundamentos de Python
=====================

Esta página contiene un resumen interactivo de los conceptos básicos de Python. Haz clic en cada sección para expandir y ver la explicación detallada junto con el código de ejemplo correspondiente.

Lecciones Fundamentales
-----------------------

01: La Función print()

**La función `print()` es fundamental en Python.** Permite mostrar información en la consola, una herramienta que te acompañará durante toda tu carrera como programador. Se utiliza para depurar código, mostrar resultados y comunicarte con el usuario. Puedes imprimir texto (cadenas), números y los valores de las variables. También ofrece parámetros como `sep` para definir el separador entre elementos y `end` para controlar lo que se imprime al final.

    ###
    # 01 - print()
    # El módulo print() es el módulo que nos permite imprimir en consola
    # Sirve para mostrar información en consola y te va a acompañar
    # TODA TU VIDA. Desde hoy hasta el fin de los tiempos
    ###
    
    # Podemos importar módulos de Python para usarlos en nuestros programas.
    # En este caso, importamos el módulo "os" que nos da acceso a funciones
    # relacionadas con el sistema operativo
    from os import system
    
    # system() nos permite ejecutar un comando en la terminal.
    # En este caso, lo hacemos para limpiar la pantalla tanto
    # en MacOS/Linux usando "clear" como en Windows con "cls"
    if system("clear") != 0: system("cls")
    
    # Este es un ejemplo básico de cómo imprimir un texto en consola
    print("¡Hola, Twitch!")
    
    # También puedes usar comillas simples para imprimir texto
    print('Esto también funciona con una comilla')
    
    # Puedes imprimir múltiples elementos separados por un espacio
    print("Python", "es", "genial")
    
    # El parámetro 'sep' permite definir cómo se separan los elementos impresos
    print("Python", "es", "brutal", sep = "-")
    
    # El parámetro 'end' define lo que se imprime al final de la línea
    print("Esto se imprime", end = "\n") # Aquí, el 'end' tiene un salto de línea explícito
    print("en una línea") # Esto se imprime en la línea siguiente
    
    # También se pueden imprimir números directamente
    print(42)
    
    # Ejemplo de cómo imprimir el símbolo de pulgadas (")
    # Si usamos comillas dobles dentro de un string con comillas dobles, se produce un error:
    # print("Esto es una "pulgada"")  # ❌ Esto generaría un error de sintaxis
    
    # ✅ Solución 1: Usar comillas simples para encerrar la cadena
    print('Esto es una "pulgada" dentro de un string con comillas simples')
    
    # ✅ Solución 2: Usar el carácter de escape \ para incluir comillas dobles dentro de un string con comillas dobles
    print("Esto es una \"pulgada\" dentro de un string con comillas dobles")
    
    # ✅ Solución 3: Usar triple comillas para definir el string
    print("""Esto es una "pulgada" dentro de un string con triple comillas""")

02: Tipos de Datos (types)

**Python maneja varios tipos de datos incorporados.** Cada valor en Python tiene un tipo que determina qué operaciones se pueden realizar con él. La función `type()` es muy útil para identificar el tipo de dato de una variable u objeto. Los tipos más comunes incluyen `int` para números enteros, `float` para números con decimales, `str` para cadenas de texto, y `bool` para valores verdaderos o falsos (`True`/`False`).

    ###
    # 02 - types()
    # Python tiene varios tipos de datos
    # int, float, complex, str, bool, NoneType, list, tuple, dict, range, set...
    ###
    
    from os import system
    if system("clear") != 0: system("cls")
    
    """
    El comando `type()` devuelve el tipo de un objeto en Python
    """
    print("int:")  # Enteros (números sin parte decimal)
    print(type(10))  # Número entero positivo
    print(type(0))  # El número cero también es un entero
    print(type(-5))  # Número entero negativo
    print(type(7238424723784278934789239874))  # Python permite enteros de gran tamaño
    
    print("float:")  # Números decimales (de punto flotante)
    print(type(3.14))  # Número con punto decimal
    print(type(1.0))  # También es considerado un float, aunque sea un número entero con punto decimal
    print(type(1e3))  # Notación científica (equivalente a 1000.0)
    
    print("complex:")  # Números complejos (con parte real e imaginaria)
    print(type(1 + 2j))  # Un número complejo en Python (1 es la parte real, 2j es la parte imaginaria)
    
    print("str:")  # Cadenas de texto (strings)
    print(type("Hola"))  # Un string con texto
    print(type(""))  # Un string vacío
    print(type("123"))  # Aunque parezca un número, está entre comillas, por lo que es un string
    print(type(""" 
      Multilinea
    """))  # Un string que abarca varias líneas usando triple comillas
    
    print("bool:")  # Valores booleanos (True o False)
    print(type(True))  # Valor booleano verdadero
    print(type(False))  # Valor booleano falso
    print(type(1 < 2))  # Comparación que devuelve un booleano (True)
    
    print("NoneType:")  # Representa la ausencia de valor
    print(type(None))  # `None` es un tipo especial en Python que representa "sin valor" o "nulo"

03: Conversión de Tipos (Casting)

**El "casting" es el proceso de transformar un valor de un tipo de dato a otro.** Esto es crucial cuando necesitas realizar operaciones entre tipos incompatibles. Por ejemplo, no puedes sumar un número (`int`) a una cadena de texto (`str`) directamente. Usando funciones como `int()`, `float()`, `str()` y `bool()`, puedes convertir valores explícitamente. Ten en cuenta que algunas conversiones pueden perder información (como convertir un `float` a `int`, que trunca la parte decimal) o fallar si no son lógicas (como convertir "Hola" a un `int`).

    ###
    # 03 - casting de types
    # Transformar un tipo de un valor a otro
    ###
    
    from os import system
    if system("clear") != 0: system("cls")
    
    print("Conversión de tipos")
    
    # Convertir una cadena que contiene un número a un entero y sumarlo con otro entero
    print(2 + int("100"))  # Convierte "100" a entero y suma 2. Resultado: 102
    
    # Convertir un entero a cadena para concatenarlo con otra cadena
    print("100" + str(2))  # Convierte el número 2 a cadena y lo concatena. Resultado: "1002"
    
    # Convertir una cadena con un número decimal a tipo float
    print(type(float("3.1416")))  # Convierte "3.1416" a float y muestra su tipo. Resultado: 
    
    # Convertir un número decimal a entero (se trunca la parte decimal)
    print(int(3.1416))  # Convierte 3.1416 a 3 eliminando la parte decimal. Resultado: 3
    
    # Evaluar valores numéricos como booleanos
    print(bool(3))  # Cualquier número distinto de 0 es True. Resultado: True
    print(bool(0))  # 0 es False. Resultado: False
    print(bool(-1))  # Números negativos también son True. Resultado: True
    
    # Evaluar cadenas como booleanos
    print(bool(""))  # Una cadena vacía es False. Resultado: False
    print(bool(" "))  # Una cadena con espacios es True. Resultado: True
    print(bool("False"))  # Una cadena con texto, aunque sea "False", es True. Resultado: True
    
    # Redondear un número decimal
    print(round(2.51))  # Redondea 2.51 al entero más cercano. Resultado: 3
    
    # Este genera un error y se comenta para evitar conflicto en la ejecución
    # print(int("Hola mundo"))  # ❌ Esto generaría un ValueError porque "Hola mundo" no es un número

04: Variables

**Las variables son contenedores para almacenar datos en la memoria.** En Python, las variables tienen dos características importantes: son de **tipado dinámico** (su tipo se determina en tiempo de ejecución y puede cambiar) y de **tipado fuerte** (Python no convierte tipos automáticamente en operaciones, evitando errores inesperados). Es importante seguir las convenciones de nomenclatura, como usar `snake_case` para los nombres de variables, para que el código sea legible y mantenible.

    ##
    # 04 - Variables
    # Las variables sirven para guardar datos en memoria.
    # Python es un lenguaje de tipado dinámico y de tipado fuerte.
    ###
    
    from os import system
    if system("clear") != 0: system("cls")
    
    # Para asignar una variable solo hace falta poner el nombre de la variable y asignarle un valor
    my_name = "midudev"
    print(my_name)  # Imprime el valor de la variable my_name
    
    age = 32
    print(age)  # Imprime el valor de la variable age)
    
    # Reasignar un nuevo valor a una variable existente
    age = 39
    print(age)  # Ahora la variable age tiene el valor 39
    
    # Tipado dinámico: el tipo de dato se determine en tiempo de ejecución
    # No es necesario declarar explícitamente el tipo de variable
    name = "midudev"
    print(type(name))  # Muestra el tipo de dato de la variable name (str)
    
    name = 32
    print(type(name))  # Ahora la variable tiene un número entero (int)
    
    # Tipado fuerte: Python no realiza conversione de tipo automáticas
    # Esto generará un error porque no se puede sumar un número con una cadena
    # print(10 + "2")  # ❌ TypeError: unsupported operand type(s) for +: 'int' and 'str'
    
    # f-string (literal de cadena de formato)
    # desde la versión Python 3.6
    print(f"Hola {my_name}, tengo {age + 5} años")
    
    # No recomendada forma de asignar variables
    name, age, city = "midudev", 32, "Bogotá"
    
    # Convenciones de nombres de variables
    mi_nombre_de_variable = "ok" # snake_case
    nombre = "ok"
    
    miNombreDeVariable = "no-recomendado" # camelCase
    MiNombreDeVariable = "no-recomendado" # PascalCase
    minombredevariable = "no-recomendado" # todojunto
    
    mi_nombre_de_variable_123 = "ok"
    
    MI_CONSTANTE = 3.14 # UPPER_CASE -> constantes
    
    # Nombres NO válidos de variables (esto generaría errores)
    # 123123_variable = "ko"  # ❌ No puede comenzar con un número
    # mi-variable = "ko"  # ❌ No puede contener guiones (-), usa guion bajo (_)
    # mi variable = "ko"  # ❌ No puede contener espacios
    # True = False  # ❌ No puedes sobrescribir palabras reservadas
    
    # Palabras reservadas en Python (no se pueden usar como nombres de variables)
    
    # ['False', 'None', 'True', 'and', 'as', 'assert',
    # 'async', 'await', 'break', 'class', 'continue',
    # 'def', 'del', 'elif', 'else', 'except', 'finally',
    # 'for', 'from', 'global', 'if', 'import', 'in', 'is',
    # 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise',
    # 'return', 'try', 'while', 'with', 'yield']
    
    # Anotaciones de tipo (opcional, para mayor claridad en el código)
    is_user_logged_in: bool = True # Indica que la variable es un booleano
    print(is_user_logged_in)
    
    name: str = "midudev" # Indica que la variable es una cadena de texto
    print(name)

05: Entrada de Usuario (input)

**La función `input()` pausa la ejecución del programa y permite al usuario introducir datos desde la consola.** Muestra un mensaje (prompt) al usuario y devuelve lo que este escriba como una cadena de texto (`str`). Es muy importante recordar que siempre devuelve un string, por lo que si esperas un número, deberás convertirlo manualmente usando `int()` o `float()`.

    ###
    # 05 - Entrada de usuario (input()) - Versión simplificada
    # La función input() permite obtener datos del usuario a través de la consola.
    ###
    
    from os import system
    if system("clear") != 0: system("cls")
    
    # Para obtener datos del usuario se usa la función input()
    # La función input() recibe un mensaje que se muestra al usuario
    # y devuelve el valor introducido por el usuario
    nombre = input("Hola, ¿cómo te llamas?\n")
    print(f"Hola {nombre}, encantado de conocerte")
    
    # Ten en cuenta que la función input() devuelve un string
    # Así que si queremos obtener un número se debe convertir el string a un número
    age = input("¿Cuántos años tienes?\n")
    age = int(age)
    print(f"Tienes {age} años")
    
    # La función input() también puede devolver múltiples valores
    # Para hacerlo, el usuario debe separar los valores con una coma
    print("Obtener múltiples valores a la vez")
    country, city = input("¿En qué país y ciudad vives?\n").split()
    
    print(f"Vives en {country}, {city}")

Ejercicios Prácticos
--------------------

Enunciados de los Ejercicios

A continuación se presentan una serie de ejercicios diseñados para practicar los conceptos aprendidos en las lecciones anteriores. Intenta resolverlos por tu cuenta antes de ver las soluciones.

    ###
    # exercises.py
    # Ejercicios para practicar los conceptos aprendidos en las lecciones.
    ###
    
    from os import system
    if system("clear") != 0: system("cls")
    
    print("\nEjercicio 1: Imprimir mensajes")
    print("Escribe un programa que imprima tu nombre y tu ciudad en líneas separadas.")
    
    ### Completa aquí
    
    print("--------------")
    
    print("\nEjercicio 2: Muestra los tipos de datos de las siguientes variables:")
    print("Usa el comando 'type()' para determinar el tipo de datos de cada variable.")
    a = 15
    b = 3.14159
    c = "Hola mundo"
    d = True
    e = None
    
    ### Completa aquí
    
    print("--------------")
    
    print("\nEjercicio 3: Casting de tipos")
    print("Convierte la cadena \"12345\" a un entero y luego a un float.")
    print("Convierte el float 3.99 a un entero. ¿Qué ocurre?")
    
    ### Completa aquí
    
    print("--------------")
    
    print("\nEjercicio 4: Variables")
    print("Crea variables para tu nombre, edad y altura.")
    print("Usa f-strings para imprimir una presentación.")
    
    # "Hola! Me llamo midudev y tengo 39 años, mido 1.70 metros"
    
    ### Completa aquí
    
    print("--------------")
    
    print("\nEjercicio 5: Números")
    print("1. Crea una variable con el número PI (sin asignar una variable)")
    print("2. Redondea el número con round()")
    print("3. Haz la división entera entre el número que te salió y el número 2")
    print("4. El resultado debería ser 1")

Soluciones de los Ejercicios

Aquí puedes encontrar las soluciones a los ejercicios propuestos. Úsalas para comprobar tus respuestas o para entender cómo abordar un problema si te has atascado.

    ###
    # soluciones.py
    # Soluciones a los ejercicios del archivo exercises.py
    ###
    
    print("\nEjercicio 1: Imprimir mensajes")
    print("Escribe un programa que imprima tu nombre y tu ciudad en líneas separadas.")
    
    # Solución:
    nombre = "Carlos"  # Reemplázalo con tu nombre
    ciudad = "Buenos Aires"  # Reemplázalo con tu ciudad
    
    print(nombre)
    print(ciudad)
    
    print("--------------")
    
    print("\nEjercicio 2: Muestra los tipos de datos de las siguientes variables:")
    print("Usa el comando 'type()' para determinar el tipo de datos de cada variable.")
    
    # Variables dadas en el enunciado
    a = 15
    b = 3.14159
    c = "Hola mundo"
    d = True
    e = None
    
    # Solución:
    print("Tipo de a:", type(a))
    print("Tipo de b:", type(b))
    print("Tipo de c:", type(c))
    print("Tipo de d:", type(d))
    print("Tipo de e:", type(e))
    
    print("--------------")
    
    print("\nEjercicio 3: Casting de tipos")
    print("Convierte la cadena '12345' a un entero y luego a un float.")
    print("Convierte el float 3.99 a un entero. ¿Qué ocurre?")
    
    # Solución:
    cadena = "12345"
    numero_entero = int(cadena)  # Convertir cadena a entero
    numero_float = float(numero_entero)  # Convertir entero a float
    
    print("Número entero:", numero_entero)
    print("Número como float:", numero_float)
    
    float_num = 3.99
    entero_convertido = int(float_num)  # Se trunca el decimal
    
    print("Float original:", float_num)
    print("Float convertido a entero (se trunca la parte decimal):", entero_convertido)
    
    print("--------------")
    
    print("\nEjercicio 4: Variables")
    print("Crea variables para tu nombre, edad y altura.")
    print("Usa f-strings para imprimir una presentación.")
    
    # Solución:
    nombre = "midudev"
    edad = 18
    altura = 1.90
    
    # Imprimir presentación con f-string
    print(f"Hola! Me llamo {nombre} y tengo {edad} años, mido {altura} metros")
    
    print("--------------")
    
    print("\nEjercicio 5: Números")
    print("1. Crea una variable con el número PI (sin asignar una variable)")
    print("2. Redondea el número con round()")
    print("3. Haz la división entera entre el número que te salió y el número 2")
    print("4. El resultado debería ser 1")
    
    # Solución:
    # Redondeamos directamente el valor de pi sin almacenarlo en una variable
    resultado = int(round(3.1416) / 2)
    print("Valor de PI (aproximado):", 3.1416)
    print("PI redondeado:", round(3.1416))
    print("División entera de PI redondeado entre 2:", resultado)

