

Lección 2: Control de Flujo (Flow Control)
==========================================

En esta sección aprenderás a controlar el flujo de ejecución de tus programas. Veremos cómo tomar decisiones con condicionales y cómo organizar datos en colecciones como las listas.

Condicionales y Lógica Booleana
-------------------------------

01: Booleanos y Operadores Lógicos

**Los booleanos son la base de la toma de decisiones en programación.** Representan los valores lógicos de verdadero (`True`) o falso (`False`). Se obtienen principalmente a través de **operadores de comparación** (como `>`, `<`, `==`) que comparan dos valores, y se combinan mediante **operadores lógicos** (`and`, `or`, `not`) para crear expresiones complejas.

    ###
    # 02 - Booleanos
    # Valores lógicos: True (verdadero) y False (falso).
    # Fundamentales para el control de flujo y la lógica en programación.
    ###
    
    from os import system
    if system("clear") != 0: system("cls")
    
    # Los booleanos representan valores de verdad: True o False.
    print("\nValores booleanos básicos:")
    print(True)
    print(False)
    
    # Operadores de comparación: devuelven un valor booleano.
    print("\nOperadores de comparación:")
    print("5 > 3:", 5 > 3)        # True
    print("5 < 3:", 5 < 3)        # False
    print("5 == 5:", 5 == 5)      # True (igualdad)
    print("5 != 3:", 5 != 3)      # True (desigualdad)
    print("5 >= 5:", 5 >= 5)      # True (mayor o igual que)
    print("5 <= 3:", 5 <= 3)      # False (menor o igual que)
    
    print("\nComparación de cadenas:")
    print("'manzana' < 'pera':", "manzana" < "pera") # True
    print("'Hola' == 'hola'", "Hola" == "hola") # False
    
    # Operadores lógicos: and, or, not
    print("\nOperadores lógicos:")
    print("True and True:", True and True)   # True
    print("True and False:", True and False)  # False
    print("True or False:", True or False)    # True
    print("False or False:", False or False)  # False
    print("not True:", not True)             # False
    print("not False:", not False)            # True
    
    # Tablas de verdad (para referencia):
    print("\nTablas de verdad:")
    print("\nand:")
    print("A     B     A and B")
    print("True  True ", True and True)
    print("True  False", True and False)
    print("False True ", False and True)
    print("False False", False and False)
    
    print("\n or:")
    print("A     B     A or B")
    print("True  True ", True or True)
    print("True  False", True or False)
    print("False True ", False or True)
    print("False False", False or False)
    
    print("\n not:") 
    print("A     not A")
    print("True ", not True)
    print("False", not False)

02: Sentencias Condicionales (if, elif, else)

**Las sentencias condicionales permiten que tu programa tome diferentes caminos según se cumplan o no ciertas condiciones.** La estructura básica es `if`, que ejecuta un bloque de código solo si su condición es `True`. Se puede complementar con `else` para ejecutar otro bloque si la condición es `False`, y con `elif` (else if) para anidar múltiples condiciones en secuencia. El programa evaluará las condiciones en orden y ejecutará únicamente el primer bloque cuya condición sea verdadera.

    ###
    # 01 - Sentencias condicionales (if, elif, else)
    # Permiten ejecutar bloques de código solo si se cumplen ciertas condiciones.
    ###
    
    from os import system
    if system("clear") != 0: system("cls")
    
    print("\n Sentencia simple condicional")
    # Podemos usar la palabra clave "if" para ejecutar un bloque de código
    # solo si se cumple una condición.
    edad = 18
    if edad >= 18:
      print("Eres mayor de edad")
      print("¡Felicidades!")
    
    # Si no se cumple la condición, no se ejecuta el bloque de código
    edad = 15
    if edad >= 18:
      print("Eres mayor de edad")
      print("¡Felicidades!")
    
    # Podemos usar el comando "else" para ejecutar un bloque de código
    # si no se cumple la condición anterior del if
    print("\n Sentencia condicional con else")
    edad = 15
    if edad >= 18:
      print("Eres mayor de edad")
    else:
      print("Eres menor de edad")
    
    print("\n Sentencia condicional con elif")
    nota = 5
    
    # Además de usar "if" y "else", podemos usar "elif" para determinar
    # múltiples condiciones, ten en cuenta que sólo se ejecutará el primer bloque
    # de código que cumpla la condición (o la del else, si está presente)
    if nota >= 9:
      print("¡Sobresaliente!")
    elif nota >= 7:
      print("Notable!")
    elif nota >= 5:
      print("¡Aprobado!")
    else:
      print("¡No está calificado!")
    
    print("\n Condiciones múltiples")
    edad = 16
    tiene_carnet = True
    
    # Los operadores lógicos en Python son:
    # and: True si ambos operandos son verdaderos
    # or: True si al menos uno de los operandos es verdadero
    # En JavaScript: 
    # && sería and
    # || sería or
    
    # En el caso que seas mayor de edad y tengas carnet...
    # entonces podrás conducir
    if edad >= 18 and tiene_carnet:
      print("Puedes conducir 🚗")
    else:
      print("POLICIA 🚔!!!1!!!")
    
    # En un pueblo de Isla Margarita son más laxos y
    # te dejan conducir si eres mayor de edad O tienes carnet
    if edad >= 18 or tiene_carnet:
      print("Puedes conducir en la Isla Margarita 🚗")
    else:
      print("Paga al policía y te deja conducir!!!")
    
    # También tenemos el operador lógico "not"
    # que nos permite negar una condición
    es_fin_de_semana = False
    # JavaScript -> !
    if not es_fin_de_semana:
      print("¡midu, venga que hay que streamear!")
    
    # Podemos anidar condicionales, uno dentro del otro
    # para determinar múltiples condiciones aunque
    # siempre intentaremos evitar esto para simplificar
    print("\n Anidar condicionales")
    edad = 20
    tiene_dinero = True
    
    if edad >= 18:
      if tiene_dinero:
        print("Puedes ir a la discoteca")
      else:
        print("Quédate en casa")
    else:
      print("No puedes entrar a la disco")
    
    # Ten en cuenta que hay valores que al usarlos como condiciones
    # en Python son evaluados como verdaderos o falsos
    # por ejemplo, el número 5, es True
    numero = 5
    if numero: # True
      print("El número no es cero")
    
    # Pero el número 0 se evalúa como False
    numero = 0
    if numero: # False
      print("Aquí no entrará nunca")
    
    # ¡Ten cuidado con no confundir la asignación = con la comparación ==!
    numero = 3 # asignación
    es_el_tres = numero == 3 # comparación
    
    if es_el_tres:
      print("El número es 3")
    
    # A veces podemos crear condicionales en una sola línea usando
    # las ternarias, es una forma concisa de un if-else en una línea de código
    print("\nLa condición ternaria:")
    # [código si cumple la condición] if [condicion] else [codigo si no cumple]
    
    edad = 17
    mensaje = "Es mayor de edad" if edad >= 18 else "Es menor de edad"
    print(mensaje)

Ejercicios de Condicionales

Pon a prueba tus conocimientos sobre lógica condicional con estos ejercicios. Intenta resolverlos antes de mirar las soluciones.

    # Ejercicio 1: Determinar el mayor de dos números
    # Pide al usuario que introduzca dos números y muestra un mensaje
    # indicando cuál es mayor o si son iguales
    
    # Ejercicio 2: Calculadora simple
    # Pide al usuario dos números y una operación (+, -, *, /)
    # Realiza la operación y muestra el resultado (maneja la división entre cero)
    
    # Ejercicio 3: Año bisiesto
    # Pide al usuario que introduzca un año y determina si es bisiesto.
    # Un año es bisiesto si es divisible por 4, excepto si es divisible por 100 pero no por 400.
    
    # Ejercicio 4: Categorizar edades
    # Pide al usuario que introduzca una edad y la clasifique en:
    # - Bebé (0-2 años)
    # - Niño (3-12 años)
    # - Adolescente (13-17 años)
    # - Adulto (18-64 años)
    # - Adulto mayor (65 años o más)

Soluciones a Ejercicios de Condicionales

Aquí puedes comprobar tus respuestas a los ejercicios sobre sentencias condicionales.

    # Ejercicio 1: Determinar el mayor de dos números
    print("\nEjercicio 1:")
    num1 = int(input("Introduce el primer número: "))
    num2 = int(input("Introduce el segundo número: "))
    
    if num1 > num2:
        print(f"{num1} es mayor que {num2}")
    elif num2 > num1:
        print(f"{num2} es mayor que {num1}")
    else:
        print("Los números son iguales")
    
    # Ejercicio 2: Calculadora simple
    print("\nEjercicio 2:")
    num1 = float(input("Introduce el primer número: "))
    num2 = float(input("Introduce el segundo número: "))
    operacion = input("Introduce la operación (+, -, *, /): ")
    
    if operacion == "+":
        resultado = num1 + num2
    elif operacion == "-":
        resultado = num1 - num2
    elif operacion == "*":
        resultado = num1 * num2
    elif operacion == "/":
        if num2 == 0:
            print("Error: No se puede dividir por cero.")
        else:
            resultado = num1 / num2
    else:
        print("Operación no válida.")
    
    if 'resultado' in locals(): #Comprueba si la variable resultado existe.
        print(f"El resultado es: {resultado}")
    
    # Ejercicio 3: Año bisiesto
    print("\nEjercicio 3:")
    anio = int(input("Introduce un año: "))
    
    if (anio % 4 == 0 and anio % 100 != 0) or anio % 400 == 0:
        print(f"{anio} es un año bisiesto.")
    else:
        print(f"{anio} no es un año bisiesto.")
    
    # Ejercicio 4: Categorizar edades
    print("\nEjercicio 4:")
    edad = int(input("Introduce una edad: "))
    
    if 0 <= edad <= 2:
        print("Bebé")
    elif 3 <= edad <= 12:
        print("Niño")
    elif 13 <= edad <= 17:
        print("Adolescente")
    elif 18 <= edad <= 64:
        print("Adulto")
    elif edad >= 65:
        print("Adulto mayor")
    else:
        print("Edad no válida.")

Introducción a las Listas
-------------------------

03: Listas - Creación y Acceso

**Las listas son una de las estructuras de datos más versátiles de Python.** Son secuencias ordenadas y **mutables**, lo que significa que puedes cambiar su contenido. Pueden contener elementos de diferentes tipos (números, texto, otras listas, etc.). Se accede a sus elementos mediante un **índice** (empezando en 0) y se pueden extraer sub-secciones de ellas usando la técnica de **slicing**.

    ###
    # 03 - Listas
    # Secuencias mutables de elementos.
    # Pueden contener elementos de diferentes tipos.
    ###
    
    from os import system
    if system("clear") != 0: system("cls")
    
    # Creación de listas
    print("\nCrear listas")
    lista1 = [1, 2, 3, 4, 5] # lista de enteros
    lista2 = ["manzanas", "peras", "plátanos"] # lista de cadenas
    lista3 = [1, "hola", 3.14, True] # lista de tipos mixtos
    
    lista_vacia = []
    lista_de_listas = [[1, 2], ['calcetin', 4]]
    matrix = [[1, 2], [2, 3], [4, 5]]
    
    print(lista1)
    print(lista2)
    print(lista3)
    print(lista_vacia)
    print(lista_de_listas)
    print(matrix)
    
    # Acceso a elementos por índice
    print("\nAcceso a elementos por índice")
    print(lista2[0])  # manzanas
    print(lista2[1])  # peras
    print(lista2[-1]) # plátanos
    print(lista2[-2]) # peras
    
    print(lista_de_listas[1][0])
    
    # Slicing (rebanado) de listas
    lista1 = [1, 2, 3, 4, 5]
    print(lista1[1:4]) # [2, 3, 4]
    print(lista1[:3]) # [1, 2, 3]
    print(lista1[3:]) # [4, 5]
    print(lista1[:]) # [1, 2, 3, 4, 5]
    
    # El tercer parámetro es el paso (step)
    lista1 = [1, 2, 3, 4, 5, 6, 7, 8]
    print(lista1[::2]) # para devolver índices pares
    print(lista1[::-1]) # para devolver índices inversos
    
    # Modificar una lista
    lista1[0] = 20
    print(lista1)
    
    # Añadir elementos a una lista
    lista1 = [1, 2, 3]
    
    # forma larga y menos eficiente
    lista1 = lista1 + [4, 5, 6]
    print(lista1)
    
    # forma corta y más eficiente
    lista1 += [7, 8, 9]
    print(lista1)
    
    # Recuperar longitud de una lista
    print("Longitud de la lista", len(lista1))

Ejercicios de Listas (Slicing y Concatenación)

Practica la manipulación básica de listas, el acceso por índice y el rebanado.

    # Ejercicio 1: El mensaje secreto
    # Dada la siguiente lista:
    # mensaje = ["C", "o", "d", "i", "g", "o", " ", "s", "e", "c", "r", "e", "t", "o"]
    # Utilizando slicing y concatenación, crea una nueva lista que contenga solo el mensaje "secreto".
    
    # Ejercicio 2: Intercambio de posiciones
    # Dada la siguiente lista:
    # numeros = [10, 20, 30, 40, 50]
    # Intercambia la primera y la última posición utilizando solo asignación por índice.
    
    # Ejercicio 3: El sándwich de listas
    # Dadas las siguientes listas:
    # pan = ["pan arriba"]
    # ingredientes = ["jamón", "queso", "tomate"]
    # pan_abajo = ["pan abajo"]
    # Crea una lista llamada sandwich que contenga el pan de arriba, los ingredientes y el pan de abajo, en ese orden.
    
    # Ejercicio 4: Duplicando la lista
    # Dada una lista:
    # lista = [1, 2, 3]
    # Crea una nueva lista que contenga los elementos de la lista original duplicados.
    # Ejemplo: [1, 2, 3] -> [1, 2, 3, 1, 2, 3]
    
    # Ejercicio 5: Extrayendo el centro
    # Dada una lista con un número impar de elementos, extrae el elemento que se encuentra en el centro de la lista.
    # Ejemplo: lista = [10, 20, 30, 40, 50] -> El centro es 30
    
    # Ejercicio 6: Reversa parcial
    # Dada una lista, invierte solo la primera mitad de la lista (utilizando slicing y concatenación).
    # Ejemplo: lista = [1, 2, 3, 4, 5, 6] -> Resultado: [3, 2, 1, 4, 5, 6]

Soluciones a Ejercicios de Listas

Aquí están las soluciones para los ejercicios de manipulación básica de listas.

    # Ejercicio 1: El mensaje secreto
    print("\nEjercicio 1:")
    mensaje = ["C", "o", "d", "i", "g", "o", " ", "s", "e", "c", "r", "e", "t", "o"]
    secreto = mensaje[7:]
    print(secreto)
    
    # Ejercicio 2: Intercambio de posiciones
    print("\nEjercicio 2:")
    numeros = [10, 20, 30, 40, 50]
    numeros[0], numeros[-1] = numeros[-1], numeros[0] # Intercambio en una sola línea.
    print(numeros)
    
    # Ejercicio 3: El sándwich de listas
    print("\nEjercicio 3:")
    pan = ["pan arriba"]
    ingredientes = ["jamón", "queso", "tomate"]
    pan_abajo = ["pan abajo"]
    sandwich = pan + ingredientes + pan_abajo
    print(sandwich)
    
    # Ejercicio 4: Duplicando la lista
    print("\nEjercicio 4:")
    lista = [1, 2, 3]
    lista_duplicada = lista + lista
    print(lista_duplicada)
    
    # Ejercicio 5: Extrayendo el centro
    print("\nEjercicio 5:")
    lista = [10, 20, 30, 40, 50]
    centro = len(lista) // 2
    print(lista[centro])
    
    # Ejercicio 6: Reversa parcial
    print("\nEjercicio 6:")
    lista = [1, 2, 3, 4, 5, 6]
    mitad = len(lista) // 2
    lista_invertida = lista[:mitad][::-1] + lista[mitad:]
    print(lista_invertida)

Métodos de Listas
-----------------

04: Métodos Útiles para Listas

Las listas vienen con una serie de **métodos** (funciones incorporadas) que nos permiten manipularlas de forma eficiente. Con ellos podemos añadir elementos (`append`, `insert`), eliminarlos (`remove`, `pop`, `clear`), ordenarlos (`sort`), contar ocurrencias (`count`) y mucho más, haciendo el trabajo con colecciones de datos mucho más sencillo.

    ###
    # 04 - Listas Métodos
    # Los métodos más importantes para trabajar con listas
    ###
    
    from os import system
    if system("clear") != 0: system("cls")
    
    # Creamos una lista con valores
    lista1 = ['a', 'b', 'c', 'd']
    
    # Añadir o insertar elementos a la lista
    lista1.append('e') # Añade un elemento al final
    print(lista1)
    
    lista1.insert(1, '@') # Inserta un elemento en la posición que le indiquemos como primer argumento
    print(lista1)
    
    lista1.extend(['😃', '😍']) # Agrega elementos al final de la lista
    print(lista1)
    
    # Eliminar elementos de la lista
    lista1.remove('@') # Eliminar la primera aparición de la cadena de texto @
    print(lista1)
    
    ultimo = lista1.pop() # Eliminar el último elemento de la lista y además te lo devuelve
    print(ultimo)
    print(lista1)
    
    lista1.pop(1) # Eliminar el segundo elemento de la lista (es el índice 1)
    print(lista1)
    
    # Eliminar por lo bestia un índice
    del lista1[-1]
    print(lista1)
    
    lista1.clear() # Eliminar todos los elementos de la lista
    print(lista1)
    
    # Eliminar un rango de elementos
    lista1 = ['🐼', '🐨', '🐶', '😿', '🐹']
    del lista1[1:3] # eliminamos los elementos del índice 1 al 3 (no incluye el índice 3)
    print(lista1)
    
    # Más métodos útiles
    print('Ordenar listas modificando la original')
    numbers = [3, 10, 2, 8, 99, 101]
    numbers.sort()
    print(numbers)
    
    print('Ordenar listas creando una nueva lista')
    numbers = [3, 10, 2, 8, 99, 101]
    sorted_numbers = sorted(numbers)
    print(sorted_numbers)
    
    print("Ordenar una lista de cadenas de texto (mezclas mayúscula y minúscula)")
    frutas = ['manzana', 'Pera', 'Limón', 'manzana', 'pera', 'limón']
    frutas.sort(key=str.lower)
    print(frutas)
    
    # Más cositas útiles
    animals = ['🐶', '🐼', '🐨', '🐶']
    print(len(animals)) # Tamaño de la listas -> 4
    print(animals.count('🐶')) # Cuantas veces aparece el elemento '🐶' -> 2
    print('🐼' in animals) # Comprueba si hay un '🐼' en la lista -> True
    print('🐹' in animals) # -> False

Ejercicios de Métodos de Listas

Aplica los métodos de listas que has aprendido para resolver los siguientes problemas.

    # Ejercicio 1: Añadir y modificar elementos
    # Crea una lista con los números del 1 al 5.
    # Añade el número 6 al final usando append().
    # Inserta el número 10 en la posición 2 usando insert().
    # Modifica el primer elemento de la lista para que sea 0.
    
    # Ejercicio 2: Combinar y limpiar listas
    # Crea dos listas:
    # lista_a = [1, 2, 3]
    # lista_b = [4, 5, 6, 1, 2]
    # Extiende lista_a con lista_b usando extend().
    # Elimina la primera aparición del número 1 en lista_a usando remove().
    # Elimina el elemento en el índice 3 de lista_a usando pop(). Imprime el elemento eliminado.
    # Limpia completamente lista_b usando clear().
    
    # Ejercicio 3: Slicing y eliminación con del
    # Crea una lista con los números del 1 al 10.
    # Utiliza slicing y del para eliminar los elementos desde el índice 2 hasta el 5 (sin incluir el 5).
    # Imprime la lista resultante.
    
    # Ejercicio 4: Ordenar y contar
    # Crea una lista con los siguientes números: [5, 2, 8, 1, 9, 4, 2].
    # Ordena la lista de forma ascendente usando sort().
    # Cuenta cuántas veces aparece el número 2 en la lista usando count().
    # Comprueba si el número 7 está en la lista usando in.
    
    # Ejercicio 5: Copia vs. Referencia
    # Crea una lista llamada original con los números [1, 2, 3].
    # Crea una copia de la lista original llamada copia_1 usando slicing.
    # Crea otra copia llamada copia_2 usando copy().
    # Crea una referencia a la lista original llamada referencia.
    # Modifica el primer elemento de la lista referencia a 10.
    # Imprime las cuatro listas y observa los cambios.
    
    # Ejercicio 6: Ordenar strings sin diferenciar mayúsculas y minúsculas.
    # Crea una lista con las siguientes cadenas: ["Manzana", "pera", "BANANA", "naranja"].
    # Ordena la lista sin diferenciar entre mayúsculas y minúsculas.

Soluciones a Ejercicios de Métodos de Listas

Comprueba tus soluciones para los ejercicios de métodos de listas.

    # Ejercicio 1: Añadir y modificar elementos
    print("\nEjercicio 1:")
    lista = [1, 2, 3, 4, 5]
    lista.append(6)
    lista.insert(2, 10)
    lista[0] = 0
    print(lista)  # Output: [0, 2, 10, 3, 4, 5, 6]
    
    # Ejercicio 2: Combinar y limpiar listas
    print("\nEjercicio 2:")
    lista_a = [1, 2, 3]
    lista_b = [4, 5, 6, 1, 2]
    lista_a.extend(lista_b)
    lista_a.remove(1)
    elemento_eliminado = lista_a.pop(3)
    print(f"Elemento eliminado: {elemento_eliminado}") #Output: Elemento eliminado: 5
    lista_b.clear()
    print("Lista a:", lista_a) #Output: Lista a: [2, 3, 4, 6, 1, 2]
    print("Lista b:", lista_b) #Output: Lista b: []
    
    # Ejercicio 3: Slicing y eliminación con del
    print("\nEjercicio 3:")
    lista = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    del lista[2:5]
    print(lista)  # Output: [1, 2, 6, 7, 8, 9, 10]
    
    # Ejercicio 4: Ordenar y contar
    print("\nEjercicio 4:")
    lista = [5, 2, 8, 1, 9, 4, 2]
    lista.sort()
    cantidad_dos = lista.count(2)
    esta_el_siete = 7 in lista
    print(f"Lista ordenada: {lista}") #Output: Lista ordenada: [1, 2, 2, 4, 5, 8, 9]
    print(f"Cantidad de 2: {cantidad_dos}") #Output: Cantidad de 2: 2
    print(f"¿Está el 7?: {esta_el_siete}") #Output: ¿Está el 7?: False
    
    # Ejercicio 5: Copia vs. Referencia
    print("\nEjercicio 5:")
    original = [1, 2, 3]
    copia_1 = original[:]
    copia_2 = original.copy()
    referencia = original
    referencia[0] = 10
    print(f"Original: {original}")       # Output: Original: [10, 2, 3]
    print(f"Copia 1 (slicing): {copia_1}") # Output: Copia 1 (slicing): [1, 2, 3]
    print(f"Copia 2 (copy()): {copia_2}") # Output: Copia 2 (copy()): [1, 2, 3]
    print(f"Referencia: {referencia}")     # Output: Referencia: [10, 2, 3]
    
    # Ejercicio 6: Ordenar strings sin diferenciar mayúsculas y minúsculas.
    print("\nEjercicio 6:")
    strings = ["Manzana", "pera", "BANANA", "naranja"]
    strings.sort(key=str.lower)
    print(strings) # Output: ['BANANA', 'Manzana', 'naranja', 'pera']

