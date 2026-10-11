
Lección 5: Expresiones Regulares (Regex) 🔎
===========================================

Las Expresiones Regulares (o Regex) son una herramienta increíblemente poderosa para buscar, validar y manipular texto. Son como un "mini-lenguaje" de programación diseñado específicamente para trabajar con patrones en cadenas de texto.

Conceptos Básicos de Regex
--------------------------

01: Fundamentos del Módulo \`re\`

Para usar Regex en Python, lo primero es importar el módulo `re`. Las operaciones básicas consisten en definir un patrón de búsqueda y aplicarlo a un texto.

**Encontrando la Primera Coincidencia con `re.search()`:**  
Esta función busca un patrón en un texto y se detiene en la primera coincidencia que encuentra. Si tiene éxito, devuelve un objeto "match" con información sobre el hallazgo; de lo contrario, devuelve `None`.

    import re
    
    pattern = "IA"
    text = "Todo el mundo dice que la IA nos va a quitar el trabajo."
    result = re.search(pattern, text)
    
    if result:
      print("Patrón encontrado:")
      print(f"Texto coincidente: {result.group()}")
      print(f"Posición inicial: {result.start()}")
      print(f"Posición final: {result.end()}")
    else:
      print("No se encontró el patrón.")

**Encontrando Todas las Coincidencias:**  
Si necesitas todas las ocurrencias de un patrón, tienes dos opciones principales:

*   `re.findall()`: Devuelve una lista con todas las cadenas que coinciden.
*   `re.finditer()`: Es más eficiente para muchas coincidencias, ya que devuelve un "iterador" que puedes recorrer en un bucle `for`.

    text = "Me gusta Python. Python es genial. ¡Amo Python!"
    pattern = "Python"
    
    # Con findall()
    matches_list = re.findall(pattern, text)
    print(f"findall() encontró {len(matches_list)} coincidencias: {matches_list}")
    
    # Con finditer()
    print("\nfinditer() encontró:")
    matches_iter = re.finditer(pattern, text)
    for match in matches_iter:
      print(f"- '{match.group()}' en la posición {match.start()}")

**Modificadores y Reemplazo de Texto:**  
Puedes alterar el comportamiento de una búsqueda con "flags", como `re.IGNORECASE` para que no distinga mayúsculas de minúsculas. Para reemplazar texto, `re.sub()` busca todas las coincidencias y las sustituye por una nueva cadena.

    # Ignorando mayúsculas/minúsculas
    text = "Python, python, PYTHON"
    matches = re.findall("python", text, re.IGNORECASE)
    print(f"Coincidencias ignorando mayúsculas: {matches}")
    
    # Reemplazando texto
    text = "Hola, mundo! Hola de nuevo."
    new_text = re.sub("hola", "Adiós", text, flags=re.IGNORECASE)
    print(f"Texto reemplazado: {new_text}")

Metacaracteres: Los Símbolos Especiales
---------------------------------------

02: Metacaracteres Esenciales

Los metacaracteres son el corazón de Regex. Son símbolos que no se representan a sí mismos, sino que tienen un significado especial.

**El Comodín `.` y la Secuencia de Escape `\`:**  
El punto `.` es un comodín que coincide con cualquier carácter (excepto salto de línea). Si quieres buscar un punto literal, debes "escaparlo" con una barra invertida `\` para anular su significado especial.

    text = "casa caasa cosa cisa cesa"
    pattern = r"c.sa" # Coincide con 'casa', 'cosa', 'cisa', 'cesa'
    print(re.findall(pattern, text))
    
    text_con_punto = "El archivo se llama main.py."
    pattern_punto = r"\." # Busca el punto literal
    print(re.findall(pattern_punto, text_con_punto))

**Clases de Caracteres (`\d`, `\w`, `\s`):**  
Son atajos para grupos comunes de caracteres:

*   `\d`: Coincide con cualquier **dígito** (0-9).
*   `\w`: Coincide con cualquier carácter **alfanumérico** (a-z, A-Z, 0-9, y el guion bajo `_`).
*   `\s`: Coincide con cualquier carácter de **espacio en blanco** (espacio, tab, salto de línea).

    text = "Mi número es +34 688999999 y mi usuario es midu_dev"
    # Buscar un número de teléfono de España
    phone_pattern = r"\+34\s\d\d\d\d\d\d\d\d\d"
    print(re.search(phone_pattern, text).group())
    
    # Buscar el nombre de usuario
    user_pattern = r"midu_dev"
    print(re.search(user_pattern, text).group())

**Anclas (`^`, `$`) y Límites de Palabra (`\b`):**  
Las "anclas" no coinciden con caracteres, sino con posiciones. `^` coincide con el inicio de la cadena y `$` con el final. `\b` es un "límite de palabra", ideal para buscar palabras completas y no subcadenas.

    text = "casa casada cosa cosas casado casa"
    pattern = r"\bcasa\b" # Busca solo la palabra exacta "casa"
    print(re.findall(pattern, text)) # -> ['casa', 'casa']
    
    email = "midu@gmail.com"
    pattern_gmail = r"@gmail\.com$" # Verifica si el email TERMINA en @gmail.com
    if re.search(pattern_gmail, email):
        print("El correo es de Gmail.")

Cuantificadores: Especificando Repeticiones
-------------------------------------------

03: Cuantificadores (`*`, `+`, `?`, `{}`)

Los cuantificadores te permiten especificar cuántas veces debe aparecer un carácter o grupo para que haya una coincidencia.

**`*`, `+`, `?`:**  

*   `*`: Coincide **cero o más** veces.
*   `+`: Coincide **una o más** veces.
*   `?`: Coincide **cero o una** vez (hace que el carácter sea opcional).

    text = "aaabacb"
    print(re.findall("a*b", text)) # -> ['aaab', 'ab', 'b']
    print(re.findall("a+b", text)) # -> ['aaab', 'ab']
    print(re.findall("a?b", text)) # -> ['ab', 'ab', 'b']

**Llaves `{}` para Cantidades Específicas:**  
Para un control preciso, usamos llaves:

*   `{n}`: Exactamente 'n' veces.
*   `{n,m}`: Un rango de 'n' a 'm' veces.
*   `{n,}`: 'n' o más veces.

    # Buscar un número de teléfono español, con prefijo opcional
    phone1 = "+34 688999999"
    phone2 = "611222333"
    pattern = r"(\+34\s)?\d{9}" # El prefijo es opcional, el número debe tener 9 dígitos
    print(re.search(pattern, phone1).group())
    print(re.search(pattern, phone2).group())
    
    # Encontrar palabras de 4 a 6 letras
    words = "ala casa árbol león cinco murcielago"
    pattern_words = r"\b\w{4,6}\b"
    print(re.findall(pattern_words, words))

Conjuntos (Sets): Definiendo Grupos de Caracteres
-------------------------------------------------

04: Conjuntos de Caracteres \`\[\]\`

Los conjuntos (o clases de caracteres), definidos con corchetes `[]`, te permiten crear tu propio grupo de caracteres válidos para una posición.

**Conjuntos Básicos, Rangos y Negación:**  

*   `[aeiou]`: Coincide con cualquier vocal.
*   `[a-z]`: Coincide con cualquier letra minúscula (rango).
*   `[0-9]`: Coincide con cualquier dígito (es igual a `\d`).
*   `[^aeiou]`: El `^` al inicio **niega** el conjunto, coincidiendo con cualquier carácter que NO sea una vocal.

    # Buscar las palabras "man", "fan" y "ban"
    text = "man ran fan ñan ban"
    pattern = r"[mfb]an"
    print(re.findall(pattern, text)) # -> ['man', 'fan', 'ban']
    
    # Buscar todas las consonantes
    text = "Hola mundo"
    pattern_consonants = r"[^aeiou\s]"
    print(re.findall(pattern_consonants, text)) # -> ['H', 'l', 'm', 'n', 'd']

**Desafío Final: Validación de Emails**  
Un uso clásico de Regex es validar formatos complejos como los correos electrónicos. Combinando todo lo aprendido (conjuntos, cuantificadores, metacaracteres), podemos construir patrones robustos para esta tarea. La siguiente imagen desglosa un ejemplo común.

Aquí tienes un patrón mejorado que intenta resolver algunos casos borde, como subdominios (ej: `.co.uk`):

    # Este patrón es más avanzado y cubre más casos
    email_pattern = r"^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}$"
    
    test_emails = ["test@example.com", "mi.nombre+alias@shopping.online", "michael@gov.co.uk", "invalido@.com"]
    
    for email in test_emails:
        if re.search(email_pattern, email):
            print(f"✔️ {email} es un email válido.")
        else:
            print(f"❌ {email} no es un email válido.")

**Imagen de referencia**  
![Example of regex pattern](https://www.computerhope.com/jargon/r/regular-expression.png)

