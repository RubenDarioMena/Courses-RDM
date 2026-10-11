

Lección 4: Lógica y Desafíos de Programación
============================================

En esta lección, pondremos a prueba nuestra capacidad para resolver problemas. Primero, aprenderemos sobre los diccionarios, una estructura de datos increíblemente poderosa, y luego la aplicaremos para resolver una serie de desafíos prácticos y entretenidos.

Diccionarios: La Estructura de Datos Clave-Valor
------------------------------------------------

01: Introducción a los Diccionarios 📚

Imagina una agenda telefónica o un diccionario real. No buscas a una persona por su posición (la número 50 en la agenda), sino por su nombre (la "clave"). Los diccionarios en Python funcionan igual: son colecciones de pares **clave-valor**, optimizadas para una recuperación de datos muy rápida.

**Creación y Acceso a Datos:**  
Un diccionario se crea con llaves `{}`. Cada elemento es un par `"clave": valor`. Para acceder a un valor, se utiliza su clave entre corchetes.

    # Un diccionario puede contener diferentes tipos de datos.
    persona = {
      "nombre": "midudev",
      "edad": 25,
      "es_estudiante": True,
      "calificaciones": [7, 8, 9],
      "socials": {
        "twitter": "@midudev",
        "instagram": "@midudev"
      }
    }
    
    # Accedemos a los valores usando sus claves
    print(persona["nombre"])
    print(persona["calificaciones"][2]) 
    print(persona["socials"]["twitter"])

**Modificar y Eliminar Datos:**  
Los diccionarios son mutables. Puedes cambiar fácilmente el valor de una clave, eliminar un par clave-valor con `del`, o usar el método `.pop()` que elimina un elemento pero también te devuelve su valor.

    persona = {"nombre": "midudev", "edad": 25, "es_estudiante": True}
    
    # Cambiar el valor de una clave existente
    persona["nombre"] = "madeval"
    
    # Eliminar completamente una propiedad
    del persona["edad"]
    
    # Eliminar una propiedad y guardar su valor
    era_estudiante = persona.pop("es_estudiante") 
    print(f"El valor de 'era_estudiante' fue: {era_estudiante}")
    print(persona)

**Iterar sobre un Diccionario:**  
Puedes obtener todas las claves, valores o ambos usando los métodos `.keys()`, `.values()` y `.items()`. El método `.items()` es el más común para iterar, ya que te da acceso tanto a la clave como al valor en cada paso del bucle.

    persona = {"nombre": "madeval", "edad": 21}
    
    print("\nClaves del diccionario:", list(persona.keys()))
    print("Valores del diccionario:", list(persona.values()))
    
    print("\nIterando con .items():")
    for key, value in persona.items():
      print(f"La clave '{key}' tiene el valor: {value}")

Desafíos de Lógica
------------------

¡Desafío Fantástico! El Equilibrio de la Alianza 🦸

**¿Está en Equilibrio la Alianza entre Reed Richards y Johnny Storm?**

En el universo de los 4 Fantásticos, la unión y el equilibrio entre los poderes es fundamental. Nos centraremos en dos de sus miembros: Reed Richards (Mr. Fantastic), representado por la letra 'R', y Johnny Storm (La Antorcha Humana), representado por la letra 'J'.

**Objetivo:** Crear una función que reciba un texto y verifique si el número de letras 'R' es igual al número de letras 'J'. Debe devolver `True` si son iguales y `False` si no.

**Análisis de la Solución:** La solución es muy eficiente. Primero, convierte todo el texto a mayúsculas con `.upper()` para no diferenciar entre 'r' y 'R'. Luego, utiliza el método de cadenas `.count()` para contar las apariciones de cada letra. Finalmente, devuelve directamente el resultado de la comparación `count_r == count_j`, que ya es un valor booleano (`True` o `False`).

    def check_is_balanced(text):
      text = text.upper()
    
      count_r = text.count("R") # Reed Richards
      count_j = text.count("J") # Johnny Storm
    
      # Esta línea es un atajo elegante para un if/else.
      # La comparación 'count_r == count_j' ya evalúa a True o False.
      return count_r == count_j
    
    print(f"¿'RRJJ' está balanceado? -> {check_is_balanced('RRJJ')}")
    print(f"¿'RRRRJJ' está balanceado? -> {check_is_balanced('RRRRJJ')}")
    print(f"¿'sin letras' está balanceado? -> {check_is_balanced('awwwaqAQAQA')}")

¡Peligro en Jurassic Park! Contando Huevos 🦖

En Jurassic Park, se ha observado que los dinosaurios carnívoros, como el temible T-Rex, depositan un número par de huevos. Tienes una lista de números donde cada número es la cantidad de huevos de un dinosaurio.

**Objetivo:** Escribe una función que reciba la lista y devuelva la suma total de los huevos que pertenecen a los dinosaurios carnívoros (es decir, la suma de todos los números pares).

**Análisis de la Solución:** La solución recorre cada número de la lista. Dentro del bucle, el **operador módulo** (`%`) se usa para determinar si un número es par. Si `eggs % 2` da como resultado `0`, significa que el número es divisible por 2 (par), y se suma al total.

    def count_carnivore_dinosaur_eggs(egg_list) -> int:
      total_carnivore_eggs = 0
    
      for eggs in egg_list:
        # El operador módulo (%) nos da el resto de una división.
        # Si el resto de dividir entre 2 es 0, el número es par.
        if eggs % 2 == 0:
          total_carnivore_eggs += eggs
    
      return total_carnivore_eggs
    
    egg_list = [3, 4, 7, 5, 8]
    print(f"El total de huevos de carnívoro es: {count_carnivore_dinosaur_eggs(egg_list)}") # 12

Desafío de Lógica: Encontrando la Suma 🧠

**"Two Sum"** es un problema clásico en entrevistas de programación.

**Objetivo:** Dado un array de números y un número \`goal\`, encontrar los dos primeros números del array que sumen el \`goal\` y devolver sus índices. Si no existe tal combinación, devolver `None`.

**Solución Eficiente con Diccionario:**  
Esta solución es mucho más rápida (complejidad O(n)). Recorre la lista una sola vez. En cada paso, calcula el número que "falta" para alcanzar el objetivo. Luego, revisa en un diccionario si ya ha "visto" ese número faltante antes. Si es así, ha encontrado la pareja. Si no, guarda el número actual y su índice en el diccionario de "vistos" para futuras comprobaciones.

    def find_first_sum(nums, goal):
      seen = {} # diccionario para guardar el numero y su índice -> {valor: indice}
    
      for index, value in enumerate(nums):
        missing = goal - value
        if missing in seen:
          # ¡Encontrado! El número que nos faltaba ya lo habíamos visto.
          return [seen[missing], index]
        
        # Si no lo encontramos, guardamos el número actual para el futuro.
        seen[value] = index
    
      return None
    
    nums = [4, 5, 6, 2]
    goal = 8
    result = find_first_sum(nums, goal)
    print(f"Los índices que suman {goal} son: {result}")

Desafío Estratégico: La Batalla Final ⚔️

**Tienes dos listas de números de la misma longitud.**

Cada número en `lista_a` se "enfrenta" al número en la misma posición en `lista_b`. Si el de `a` es mayor, su valor se suma al siguiente en `a`. Si el de `b` es mayor, su valor se suma al siguiente en `b`. Si son iguales, se eliminan. Debes devolver un string con el resultado final.

**Análisis de la Solución Proporcionada:** Este es un caso interesante. La descripción del problema detalla un complejo proceso secuencial. Sin embargo, la solución implementada es una simplificación extrema: ignora la lógica secuencial y simplemente **suma todos los valores de cada lista** (`sum(lista_a)`) y compara los totales. Esto nos enseña que a veces, la solución más directa (aunque no siga las reglas al pie de la letra) puede ser una forma de abordar un problema complejo.

    def battle(lista_a, lista_b):
        puntos_a = sum(lista_a)
        puntos_b = sum(lista_b)
        
        if puntos_a > puntos_b:
            return f"{puntos_a - puntos_b}a"
        elif puntos_b > puntos_a:
            return f"{puntos_b - puntos_a}b"
        else:
            return "x"
    
    lista_a = [4, 4, 4] # Total: 12
    lista_b = [2, 8, 2] # Total: 12
    print(f"Ganador de [4,4,4] vs [2,8,2] -> '{battle(lista_a, lista_b)}'")
    
    lista_a = [2, 4, 2] # Total: 8
    lista_b = [3, 3, 4] # Total: 10
    print(f"Ganador de [2,4,2] vs [3,3,4] -> '{battle(lista_a, lista_b)}'")
    

