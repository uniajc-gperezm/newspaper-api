# crud-api

Una API REST básica construida con Node.js y Express que permite realizar operaciones CRUD (Crear, Leer, Actualizar y Borrar) sobre un conjunto simulado de artículos de noticias. Ideal para pruebas y desarrollo de aplicaciones frontend como News App.

## Descripción

Este proyecto implementa un servidor Express que expone endpoints para gestionar artículos de noticias en formato JSON. Los datos están almacenados en memoria y simulan la estructura de la API de NewsAPI, permitiendo probar funcionalidades CRUD sin necesidad de una base de datos real.

## Estructura de Archivos

- `app.js`: Código fuente principal del servidor. Define la API, los datos simulados y todas las rutas CRUD para los artículos.

## Instalación y Ejecución

1. Asegúrate de tener Node.js instalado.
2. Instala las dependencias ejecutando en la carpeta `crud-api`:
   ```bash
   npm install express
   ```
3. Inicia el servidor con:
   ```bash
   node app.js
   ```
4. El servidor estará disponible en [http://localhost:3000](http://localhost:3000)

## Endpoints

- `GET /articles`  
  Devuelve todos los artículos de noticias.

- `GET /articles/:id`  
  Devuelve un artículo específico por su ID.

- `POST /articles`  
  Crea un nuevo artículo. El cuerpo de la solicitud debe ser un objeto JSON con los datos del artículo.

- `PUT /articles/:id`  
  Actualiza un artículo existente por su ID. El cuerpo de la solicitud debe contener los campos a modificar.

- `DELETE /articles/:id`  
  Elimina un artículo por su ID.

## Ejemplo de Respuesta (`GET /articles`)

```json
{
  "status": "ok",
  "totalResults": 4,
  "articles": [
    {
      "id": "a1",
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

- Los datos son estáticos y se almacenan en memoria, por lo que se reinician cada vez que se reinicia el servidor.
- No requiere base de datos.
- Ideal para pruebas y desarrollo local de aplicaciones frontend.

## Buenas Prácticas para una API CRUD

- **Uso de Métodos HTTP Correctos:** Utiliza GET para leer, POST para crear, PUT/PATCH para actualizar y DELETE para eliminar recursos.
- **Rutas Claras y Consistentes:** Usa rutas descriptivas y en plural, por ejemplo `/articles` para colecciones y `/articles/:id` para recursos individuales.
- **Respuestas Significativas:** Devuelve códigos de estado HTTP apropiados (200 OK, 201 Created, 204 No Content, 404 Not Found, etc.) y mensajes claros en las respuestas.
- **Validación de Datos:** Valida los datos recibidos en las solicitudes para evitar errores y mantener la integridad de la información.
- **Manejo de Errores:** Proporciona mensajes de error útiles y consistentes para que el cliente pueda entender qué salió mal.
- **No Exponer Información Sensible:** Nunca devuelvas información confidencial en las respuestas de la API.
- **Documentación:** Mantén la documentación de la API actualizada para facilitar su uso y mantenimiento.

## Ejecución en Modo Hot Reload (Desarrollo)

Para facilitar el desarrollo, puedes ejecutar el servidor en modo "hot reload" usando la herramienta `nodemon`, que reinicia automáticamente el servidor cada vez que detecta cambios en los archivos fuente.

### ¿Por qué es importante?
- Permite ver los cambios en tiempo real sin tener que reiniciar manualmente el servidor.
- Aumenta la productividad y reduce errores por olvidos de reinicio.
- Es ideal para entornos de desarrollo, pero no debe usarse en producción.

### Cómo usarlo
1. Instala `nodemon` de forma global (una sola vez):
   ```bash
   npm install -g nodemon
   ```
   O como dependencia de desarrollo en el proyecto:
   ```bash
   npm install --save-dev nodemon
   ```
2. Ejecuta el servidor con el flag `--watch`:
   ```bash
   nodemon --watch . app.js
   ```
   Esto hará que el servidor se reinicie automáticamente cada vez que modifiques cualquier archivo en la carpeta actual.

---

Proyecto educativo para pruebas y desarrollo local. 