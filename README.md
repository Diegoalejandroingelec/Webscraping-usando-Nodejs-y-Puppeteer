# Webscraping-usando-Nodejs-y-Puppeteer
# Para ejecutar el web scraping
1- Ejecutar el comando npm i para instalar las dependencias

2- Agregar un archivo .env con las credenciales de gmail para ingresar a Dialogflow

EMAIL="example_email@gmail.com"
PASSWORD="password"

3- Ejecutar el comando npm run dev para empezar la ejecución 

# Para modificar los parametros del Web scraping
 
1- Si se desea cambiar el intervalo de fechas entre las cuales se van a obtener los No match se debe ir al archivo historyNoMatchScraping.js ubicado en la carpeta modules y modificar en la función adaptPageForScraping las constantes dateStart y dateEnd. 

Por ejemplo:
const dateStart='Jan 9, 2020';
const dateEnd='Feb 16, 2021';

2- Si se desea cambiar el nombre del bot al cual se va a analizar debe ir al archivo historyNoMatchScraping.js ubicado en la carpeta modules y modificar en la función navigateUpToHistory la constante nameBotScraping con el nombre del bot requerido.

