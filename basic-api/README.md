# basic-api

Una API REST básica construida con Node.js y Express para servir datos simulados de noticias, compatible con aplicaciones frontend como el News App.

## Descripción
Este proyecto implementa un servidor Express que expone un endpoint (`/`) que retorna un conjunto de artículos de noticias en formato JSON, imitando la respuesta de la API de NewsAPI. Es útil para pruebas locales y desarrollo frontend sin depender de servicios externos.

## Estructura de Archivos
- `app.js`: Código fuente principal del servidor. Define la API, los datos simulados y la configuración de CORS.
- `package.json`: Archivo de configuración de Node.js con las dependencias necesarias (`express` y `cors`).

## Instalación y Ejecución
1. Asegúrate de tener Node.js instalado.
2. Instala las dependencias ejecutando en la carpeta `basic-api`:
   ```bash
   npm install
   ```
3. Inicia el servidor con:
   ```bash
   node app.js
   ```
4. El servidor estará disponible en [http://localhost:3000](http://localhost:3000)

## Endpoint
- `GET /`  
  Devuelve un objeto JSON con artículos de noticias simulados.

## Ejemplo de Respuesta
```json
{
  "status": "ok",
  "totalResults": 4,
  "articles": [
    {
      "source": { "id": "tech-daily", "name": "Tech Daily" },
      "author": "Alex Tech",
      "title": "Future of AI: What to Expect Next Decade",
      ...
    },
    ...
  ]
}
```

## Notas
- El servidor incluye CORS habilitado para permitir peticiones desde cualquier origen (ideal para desarrollo frontend).
- Los datos son estáticos y pueden ser modificados en el archivo `app.js`.

## Dependencias
- [express](https://www.npmjs.com/package/express)
- [cors](https://www.npmjs.com/package/cors)

---

**Autor:**
- Proyecto educativo para pruebas y desarrollo local. 