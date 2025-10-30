# Guía de Base de Datos: Integrando SQLite en tu API

**Prerrequisito:** Haber completado la `GUIA_AVANZADA.md`, especialmente la refactorización a una estructura de Rutas y Controladores.

En la guía anterior, logramos la persistencia de datos usando un archivo JSON. Aunque funcional, tiene limitaciones en cuanto a rendimiento, manejo de concurrencia y capacidades de consulta. Ahora daremos el salto a una solución profesional: una base de datos SQL.

Usaremos **SQLite**, una base de datos increíblemente popular, rápida y ligera que no requiere un servidor separado, ya que almacena todo en un único archivo. Es la elección perfecta para aprender los fundamentos de SQL en un proyecto Node.js.

**Objetivo:** Refactorizar la `crud-api` para que todas las operaciones de datos se realicen contra una base de datos SQLite.

---

## 1. Preparación y Configuración de la Base de Datos

### Paso 1: Instalar Dependencias

Necesitamos dos paquetes de npm. `sqlite3` es el driver para conectarse a SQLite, y `sqlite` es una librería "envoltorio" (wrapper) que nos permite usar la sintaxis moderna de `async/await` en lugar de callbacks, haciendo nuestro código mucho más limpio.

En la terminal, dentro de la carpeta `crud-api`, ejecuta:

```bash
npm install sqlite sqlite3
```

### Paso 2: Crear el Archivo de la Base de Datos y el Script de Setup

1.  Dentro de `crud-api`, crea una nueva carpeta llamada `database`.
2.  Dentro de `database`, crea un archivo vacío llamado `news.db`. Este será nuestro archivo de base de datos.
3.  Ahora, crea un archivo llamado `database/setup.js`. Este script se encargará de crear la tabla `articles` si no existe. Es una buena práctica tener un script de "migración" o configuración para inicializar la estructura de la base de datos.

    Pega el siguiente código en `database/setup.js`:

    ```javascript
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('./database/news.db', (err) => {
      if (err) {
        console.error(err.message);
        throw err;
      }
      console.log('Connected to the SQLite database.');
    });

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS articles (
        id TEXT PRIMARY KEY,
        author TEXT,
        title TEXT NOT NULL,
        description TEXT,
        url TEXT,
        urlToImage TEXT,
        publishedAt TEXT,
        content TEXT,
        sourceId TEXT,
        sourceName TEXT
      );
    `;

    db.run(createTableQuery, (err) => {
      if (err) {
        console.error(err.message);
        throw err;
      }
      console.log('Table "articles" is ready.');
    });

    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Closed the database connection.');
    });
    ```

### Paso 3: Ejecutar el Script de Setup

Corre este script una sola vez para crear la tabla en tu archivo `news.db`.

```bash
node database/setup.js
```

Verás los mensajes de conexión y creación de la tabla. ¡Tu base de datos está lista!

---

## 2. Creando la Capa de Servicio (Data Access Layer)

**Concepto:** Para mantener nuestro código organizado, no pondremos las consultas a la base de datos directamente en los controladores. Crearemos una "capa de servicio", que será el único lugar en nuestra aplicación que sabe cómo hablar con la base de datos.

### Paso 1: Crear el Módulo de Conexión

Crea el archivo `database/connection.js`. Este módulo se encargará de abrir la conexión a la base de datos para que podamos reutilizarla.

```javascript
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

// Esta función asíncrona abre la conexión a la base de datos
async function openDb() {
  return open({
    filename: './database/news.db',
    driver: sqlite3.Database
  });
}

module.exports = { openDb };
```

### Paso 2: Crear el Servicio de Artículos

1.  Dentro de `crud-api`, crea una nueva carpeta llamada `services`.
2.  Crea el archivo `services/article.service.js`. Este servicio contendrá toda la lógica CRUD para los artículos.

    ```javascript
    const { openDb } = require('../database/connection');

    // Obtener todos los artículos
    async function getAll() {
      const db = await openDb();
      return db.all('SELECT * FROM articles');
    }

    // Crear un nuevo artículo
    async function create(article) {
      const db = await openDb();
      const { id, author, title, description, url, urlToImage, publishedAt, content, source } = article;
      const result = await db.run(
        'INSERT INTO articles (id, author, title, description, url, urlToImage, publishedAt, content, sourceId, sourceName) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [id, author, title, description, url, urlToImage, publishedAt, content, source.id, source.name]
      );
      return result;
    }

    // (Opcional) Añade aquí las funciones para getById, update y remove como ejercicio

    module.exports = {
      getAll,
      create,
    };
    ```

**Nota sobre `?`:** Usar `?` en las consultas es crucial. Es la forma de pasar parámetros de manera segura para **prevenir ataques de inyección SQL**.

---

## 3. Refactor de los Controladores para Usar el Servicio

Ahora que tenemos nuestra capa de servicio, podemos simplificar enormemente nuestros controladores.

Reemplaza el contenido de `crud-api/controllers/articles.controller.js` con el siguiente código:

```javascript
const articleService = require('../services/article.service');

// Controlador para LEER todos los artículos
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await articleService.getAll();
    res.json({ status: 'ok', totalResults: articles.length, articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los artículos de la base de datos.' });
  }
};

// Controlador para CREAR un artículo
exports.createArticle = async (req, res) => {
  const { title, author, description } = req.body;

  // Mantenemos la validación de entradas
  if (!title || !author || !description) {
    return res.status(400).json({ message: 'Los campos title, author y description son obligatorios.' });
  }

  const newArticle = {
    id: `a${Date.now()}`,
    ...req.body,
    publishedAt: new Date().toISOString(),
    source: req.body.source || { id: null, name: 'Custom' }
  };

  try {
    await articleService.create(newArticle);
    res.status(201).json(newArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al guardar el artículo en la base de datos.' });
  }
};

// ... (Aquí irían los controladores para PUT y DELETE, que usarían sus respectivas funciones del servicio)
```

Observa qué limpio queda el controlador. Su única responsabilidad es manejar la petición (`req`) y la respuesta (`res`), y orquestar la llamada al servicio. No sabe nada sobre SQL o bases de datos.

---

## 4. Verificación y Conclusión

### ¡A Probar!

1.  Inicia el servidor de la `crud-api` con `node app.js`.
2.  Usa Postman para hacer una petición `GET` a `http://localhost:3000/api/articles`. Debería devolver un array vacío (ya que aún no hemos insertado nada).
3.  Haz una petición `POST` con un nuevo artículo. Deberías recibir un `201 Created`.
4.  Vuelve a hacer la petición `GET`. ¡Tu artículo ahora está allí, servido desde la base de datos SQLite!
5.  Detén y reinicia el servidor. Haz la petición `GET` de nuevo. Los datos persisten.

### Conclusión

¡Felicidades! Has refactorizado tu API para usar una base de datos SQL real. Este es un paso gigantesco en tu carrera como desarrollador. Has aprendido a:

-   **Configurar una base de datos** y su estructura inicial (migración).
-   **Abstraer la lógica de datos** en una capa de servicio, un patrón de diseño profesional.
-   **Escribir consultas SQL seguras** desde una aplicación Node.js.
-   **Utilizar `async/await`** para manejar operaciones de base de datos de forma limpia.

Tu aplicación ahora es mucho más robusta, escalable y profesional que antes. El siguiente paso sería completar las funciones de `update` y `delete` en el servicio y el controlador. ¡Excelente trabajo!
