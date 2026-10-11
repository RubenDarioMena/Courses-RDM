

Lección 08: Extracción de Datos Web (Web Scraping)
==================================================

¡Bienvenido a una de las habilidades más poderosas de Python! En esta lección, aprenderás a navegar y extraer información de sitios web de forma automática.

Parte 1: Los Fundamentos 🕸️
----------------------------

01: ¿Qué es el Web Scraping y por qué es útil?

El **Web Scraping** (a veces llamado "raspado web") es el proceso de usar un programa o "bot" para descargar el contenido de páginas web y extraer de ellas la información específica que nos interesa. Es como tener un asistente súper rápido que puede visitar miles de páginas, leerlas y copiar los datos que le pidas en una tabla.

**Algunos usos comunes:**

*   **Monitorización de precios:** Seguir el precio de un producto en varias tiendas online.
*   **Generación de leads:** Recopilar información de contacto de directorios de empresas.
*   **Análisis de sentimiento:** Extraer opiniones de productos o noticias para analizarlas.
*   **Investigación de mercado:** Recopilar datos sobre competidores o tendencias.

02: Ética y Legalidad: El archivo \`robots.txt\`

**¡MUY IMPORTANTE!** No todos los sitios web permiten el scraping. Hacerlo sin permiso puede ir en contra de sus términos de servicio e incluso ser ilegal. Antes de extraer datos, siempre debes ser un buen ciudadano de la web.

La primera regla del web scraping es revisar el archivo `robots.txt`. Es un fichero de texto que los sitios web colocan en su servidor para dar instrucciones a los bots.

Para verlo, simplemente añade `/robots.txt` al final del dominio principal del sitio. Por ejemplo: `https://github.com/robots.txt`.

En este archivo, verás directivas como `User-agent` (a qué bot se aplica la regla) y `Disallow` (qué URLs no se deben visitar). Si una página que te interesa está en una ruta "Disallowed", **no debes hacer scraping en ella**.

03: Nuestras Herramientas: \`requests\` y \`BeautifulSoup\`

Para nuestra aventura de scraping, usaremos dos librerías fantásticas:

1.  **Requests:** Es como nuestro navegador. Se encarga de conectarse a la URL y descargar todo el código HTML de la página, como si fuera un documento de texto.
2.  **BeautifulSoup:** Es nuestro intérprete y buscador. Una vez que \`requests\` nos trae el HTML, \`BeautifulSoup\` lo "entiende", lo convierte en una estructura organizada (un árbol de objetos) y nos da herramientas súper sencillas para encontrar y extraer exactamente lo que buscamos.

Antes de empezar, necesitamos instalarlas. Abre tu terminal y ejecuta:

    pip install requests beautifulsoup4

Usaremos el sitio [quotes.toscrape.com](http://quotes.toscrape.com/) para nuestros ejemplos. ¡Está diseñado específicamente para que la gente practique scraping de forma segura!

Parte 2: Manos a la Obra 🛠️
----------------------------

04: Paso 1 - Obtener el HTML con \`requests\`

Nuestro primer paso es pedirle a \`requests\` que visite la página y nos traiga su contenido.

    import requests
    
    # La URL del sitio que queremos visitar
    URL = "http://quotes.toscrape.com/"
    
    # Hacemos la petición GET. Es como escribir la URL en el navegador y pulsar Enter.
    print("Realizando petición a la URL...")
    response = requests.get(URL)
    
    # requests nos da un objeto 'response' con mucha información.
    # El atributo .status_code nos dice si todo fue bien. 200 significa "OK".
    print(f"Código de estado: {response.status_code}")
    
    # El atributo .text contiene todo el HTML de la página como una gran cadena de texto.
    print("\nPrimeros 500 caracteres del HTML recibido:")
    print(response.text[:500])

Si ejecutas esto, verás un código de estado 200 y el inicio del código HTML de la página. ¡Ya tenemos el material en bruto!

05: Paso 2 - "Cocinar la sopa" con \`BeautifulSoup\`

El HTML que nos dio \`requests\` es solo texto. Para poder buscar en él, necesitamos que \`BeautifulSoup\` lo analice y lo convierta en un objeto navegable, al que cariñosamente llamamos "sopa" (soup).

    import requests
    from bs4 import BeautifulSoup # Importamos la clase
    
    URL = "http://quotes.toscrape.com/"
    response = requests.get(URL)
    
    # Creamos la "sopa" a partir del texto HTML.
    # Le pasamos el HTML (response.text) y el 'parser' que debe usar.
    # 'html.parser' es el que viene integrado con Python.
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Ahora 'soup' es un objeto especial de BeautifulSoup.
    # Podemos pedirle que nos muestre el HTML de forma bonita e indentada.
    print(soup.prettify()[:500])

La salida es similar, pero ahora no es solo texto. Es un objeto inteligente que entiende la estructura del documento.

06: Paso 3 - Encontrando Elementos (La Magia del Scraping)

Aquí es donde empieza la diversión. Para saber qué buscar, necesitamos **inspeccionar la página**. En tu navegador, ve a [quotes.toscrape.com](http://quotes.toscrape.com/), haz clic derecho sobre una de las citas y selecciona "Inspeccionar".

Verás que cada cita completa está dentro de una etiqueta `<div>` que tiene el atributo `class="quote"`. ¡Esa es nuestra pista!

BeautifulSoup nos da dos métodos principales:

*   `find('etiqueta')`: Devuelve el **primer** elemento que coincide.
*   `find_all('etiqueta')`: Devuelve una **lista** con todos los elementos que coinciden.

Podemos pasarle más argumentos para ser más específicos, como la clase.

    # ... (código anterior para crear la 'soup') ...
    
    # Buscamos TODOS los divs que tengan la clase 'quote'
    all_quotes_divs = soup.find_all('div', class_='quote')
    
    print(f"Se encontraron {len(all_quotes_divs)} citas en la página.")
    
    # all_quotes_divs es una lista. Vamos a ver el primer elemento.
    first_quote_div = all_quotes_divs[0]
    # print(first_quote_div.prettify()) # Descomenta para ver el HTML de la primera cita
    
    # Ahora, dentro de ese div, buscamos el texto de la cita.
    # Inspeccionando, vemos que está en un  con class="text".
    quote_text_span = first_quote_div.find('span', class_='text')
    
    # Para obtener solo el texto de una etiqueta, usamos .get_text()
    quote_text = quote_text_span.get_text()
    print(f"\nTexto de la primera cita: {quote_text}")
    
    # Hacemos lo mismo para el autor. Está en una etiqueta  con class="author".
    author_small = first_quote_div.find('small', class_='author')
    author_name = author_small.get_text()
    print(f"Autor: {author_name}")

07: Paso 4 - Poniéndolo Todo Junto: Un Script Completo

Ahora que sabemos cómo extraer los datos de una cita, podemos hacer un bucle para extraerlos de todas las citas de la página y guardarlos en una estructura de datos limpia, como una lista de diccionarios.

    import requests
    from bs4 import BeautifulSoup
    
    URL = "http://quotes.toscrape.com/"
    response = requests.get(URL)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Lista para guardar nuestros resultados
    scraped_quotes = []
    
    all_quotes_divs = soup.find_all('div', class_='quote')
    
    # Iteramos sobre cada div de cita que encontramos
    for quote_div in all_quotes_divs:
        text = quote_div.find('span', class_='text').get_text()
        author = quote_div.find('small', class_='author').get_text()
        
        # Extraemos las etiquetas (tags)
        tags_div = quote_div.find('div', class_='tags')
        # .find_all dentro de un elemento busca solo dentro de ese elemento
        tags_a = tags_div.find_all('a', class_='tag')
        tags = [tag.get_text() for tag in tags_a]
        
        # Creamos un diccionario para esta cita
        quote_data = {
            "texto": text,
            "autor": author,
            "etiquetas": tags
        }
        # Y lo añadimos a nuestra lista
        scraped_quotes.append(quote_data)
    
    # ¡Imprimimos el resultado final!
    import json
    print(json.dumps(scraped_quotes, indent=2, ensure_ascii=False))

