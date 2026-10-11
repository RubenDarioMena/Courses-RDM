
Lección 07: Tópicos Adicionales y Proyecto Práctico con IA
==========================================================

En esta lección final, exploraremos un nuevo módulo esencial para cualquier programador y luego consolidaremos todo nuestro conocimiento sobre Clases y APIs en un proyecto práctico y moderno utilizando Inteligencia Artificial.

Parte 1: Trabajando con Fechas y Horas 🗓️
------------------------------------------

01: El Módulo \`datetime\`

Saber manejar fechas y horas es fundamental en programación, ya sea para registrar eventos, calcular duraciones o filtrar datos. Python nos facilita esta tarea con su módulo incorporado `datetime`.

**Obtener la Fecha Actual y Crear Fechas Específicas:**  
Podemos obtener el momento exacto actual con `datetime.now()` o construir un objeto de fecha y hora específico proporcionando año, mes, día, hora, etc.

    from datetime import datetime
    
    # 1. Obtener la fecha y hora actual
    now = datetime.now()
    print(f"Fecha y hora actual: {now}")
    
    # 2. Crear una fecha y hora específica (año, mes, día, hora, minuto, segundo)
    specific_date = datetime(2025, 2, 12, 15, 30, 0)
    print(f"Fecha y hora específica: {specific_date}")

**Formateando Fechas con `strftime()`:**  
A menudo, no queremos mostrar la fecha en su formato por defecto. El método `strftime()` (string format time) nos permite convertir un objeto `datetime` a una cadena de texto con el formato exacto que queramos, usando códigos especiales (`%A` para el día de la semana completo, `%B` para el mes, etc.).

    from datetime import datetime
    import locale
    
    # Establecemos la configuración regional a español para nombres de días/meses
    locale.setlocale(locale.LC_TIME, 'es_ES.UTF-8')
    
    now = datetime.now()
    format_date = now.strftime("%A, %d de %B de %Y - %H:%M:%S")
    print(f"Fecha formateada: {format_date}")

**Operaciones con Fechas usando `timedelta`:**  
Para sumar o restar tiempo, usamos la clase `timedelta`, que representa una duración. Simplemente creas un objeto `timedelta` con la cantidad de días, horas, etc., y lo sumas o restas a un objeto `datetime`.

    from datetime import datetime, timedelta
    
    now = datetime.now()
    # Restamos un día a la fecha actual
    yesterday = now - timedelta(days=1)
    print(f"Ayer fue: {yesterday.strftime('%A, %d de %B')}")
    
    # Sumamos una hora y 30 minutos
    in_a_bit = now + timedelta(hours=1, minutes=30)
    print(f"Dentro de una hora y media será: {in_a_bit.strftime('%H:%M:%S')}")

**Calculando Diferencias entre Fechas:**  
Restar dos objetos `datetime` nos da como resultado un objeto `timedelta`, que representa el tiempo exacto que ha transcurrido entre esos dos momentos.

    from datetime import datetime
    
    date1 = datetime.now()
    date2 = datetime(2025, 1, 1) # Año Nuevo 2025
    difference = date2 - date1
    
    print(f"Diferencia entre las fechas: {difference}")
    print(f"Faltan {difference.days} días para Año Nuevo 2025.")

Parte 2: Proyecto Final - Creando un Cliente de IA Reutilizable 🤖
------------------------------------------------------------------

02: Aplicando Clases a Peticiones de API

¡Es hora de conectar todo lo que hemos aprendido! En la Lección 06 viste en profundidad cómo crear Clases y consumir APIs. Ahora, vamos a aplicar esos principios para construir una herramienta profesional y reutilizable para interactuar con APIs de Inteligencia Artificial.

**El Problema: Código Repetitivo**  
Imagina que queremos llamar a varias APIs de IA. Una primera aproximación sería crear una función para cada una, como vimos en los archivos base. Funciona, pero observa el código repetido (la estructura de los headers, el formato de los datos, el \`requests.post\`...):

    # Esta es la aproximación funcional. ¡Funciona, pero podemos mejorarla!
    def call_openai_gpt(api_key, prompt):
      url = "https://api.openai.com/v1/chat/completions"
      headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
      }
      data = {
        "model": "gpt-4o-mini",
        "messages": [{"role": "user", "content": prompt}]
      }
      response = requests.post(url, json=data, headers=headers)
      return response.json()

**La Solución Profesional: Programación Orientada a Objetos**  
Aquí es donde las Clases demuestran su poder. Crearemos una única clase `AI_API` que actuará como una plantilla. Esta clase encapsulará la lógica común y nos permitirá crear "clientes" específicos para cada servicio de IA de forma limpia y organizada.

    import requests
    
    # Esta clase es una plantilla para cualquier API de IA similar.
    class AI_API:
      # El constructor guarda los datos específicos de cada API.
      def __init__(self, api_key, url, model):
        self.api_key = api_key
        self.url = url
        self.model = model
    
      # El método .call() encapsula la lógica de la petición.
      def call(self, prompt):
        headers = {
          "Content-Type": "application/json",
          "Authorization": f"Bearer {self.api_key}"
        }
        data = {
          "model": self.model,
          "messages": [{"role": "user", "content": prompt}]
        }
        try:
          response = requests.post(self.url, json=data, headers=headers)
          response.raise_for_status() # Buena práctica para capturar errores
          res_json = response.json()
          # Devolvemos directamente el contenido del mensaje
          return res_json["choices"][0]["message"]["content"]
        except requests.exceptions.RequestException as e:
          print(f"Error en la solicitud: {e}")
          return "Hubo un error al contactar la API."

**Creando y Usando los Clientes de API:**  
Ahora, en lugar de llamar a funciones dispersas, simplemente creamos "instancias" de nuestra clase, una para cada servicio. ¡Mira qué limpio y escalable es! Si mañana queremos añadir una nueva IA, solo tenemos que crear una nueva instancia con sus datos.

    # (Necesitarías tus propias API Keys para que esto funcione)
    OPENAI_KEY = "TU_API_KEY_DE_OPENAI"
    DEEPSEEK_API_KEY = "TU_API_KEY_DE_DEEPSEEK"
    
    # Creamos una instancia para OpenAI
    openai_client = AI_API(
        OPENAI_KEY, 
        "https://api.openai.com/v1/chat/completions", 
        "gpt-4o-mini"
    )
    
    # Creamos otra instancia para DeepSeek
    deepseek_client = AI_API(
        DEEPSEEK_API_KEY, 
        "https://api.deepseek.com/chat/completions", 
        "deepseek-chat"
    )
    
    # Usar los clientes es increíblemente sencillo
    poema_con_openai = openai_client.call("Escribe un breve poema sobre la programación")
    print(f"Respuesta de OpenAI:\n{poema_con_openai}")
    
    print("\n" + "="*30 + "\n")
    
    poema_con_deepseek = deepseek_client.call("Escribe un breve poema sobre la programación")
    print(f"Respuesta de DeepSeek:\n{poema_con_deepseek}")

