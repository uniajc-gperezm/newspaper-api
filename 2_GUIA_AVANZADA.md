# Guía Avanzada: Llevando tu API al Siguiente Nivel

**Prerrequisito:** Haber completado y entendido la `DOCUMENTACION.md` inicial.

¡Felicidades! Ya tienes una aplicación funcional con un frontend que consume un backend de forma segura. Ahora, vamos a transformarla para que se parezca mucho más a una aplicación profesional. Esta guía te enseñará a:

1.  **Guardar datos de forma permanente** para que no se pierdan al reiniciar el servidor.
2.  **Estructurar tu código** de backend de forma limpia y escalable.
3.  **Mejorar la experiencia del usuario** en el frontend con estados de carga y error.
4.  **Hacer tu API más robusta** validando los datos que recibe.
5.  **Entender cómo se despliega** una aplicación en el mundo real.

---

## 1. Persistencia de Datos: De la Memoria a un Archivo

**Objetivo:** Modificar la `crud-api` para que lea y escriba los artículos en un archivo `data.json`. De esta forma, los cambios serán permanentes.

### Paso 1: Crear el archivo de base de datos

Crea un nuevo archivo dentro de la carpeta `crud-api` llamado `data.json` y pega el siguiente contenido. Este será el estado inicial de nuestra "base de datos".

```json
[
  {
    "id": "a1",
    "source": {
      "id": "tech-daily",
      "name": "Tech Daily"
    },
    "author": "Alex Tech",
    "title": "Future of AI: What to Expect Next Decade",
    "description": "Experts predict major breakthroughs in artificial intelligence...",
    "url": "https://www.techdaily.com/ai-future",
    "urlToImage": "https://www.techdaily.com/images/ai-future.jpg",
    "publishedAt": "2025-06-01T10:00:00Z",
    "content": "Artificial intelligence continues to evolve..."
  },
  {
    "id": "a2",
    "source": {
      "id": "global-news",
      "name": "Global News"
    },
    "author": "Maria Reporter",
    "title": "Climate Change Solutions: New Innovations Emerge",
    "description": "Scientists are developing groundbreaking technologies...",
    "url": "https://www.globalnews.com/climate-solutions",
    "urlToImage": "https://www.globalnews.com/images/climate-solutions.jpg",
    "publishedAt": "2025-06-05T14:30:00Z",
    "content": "From advanced carbon capture technologies..."
  }
]
```

### Paso 2: Modificar `crud-api/app.js`

Ahora, cambiaremos el código para que use este archivo.

1.  **Importa el módulo `fs` (File System)** de Node.js al principio del archivo.
2.  **Lee los datos del archivo** al iniciar, en lugar de tenerlos en una variable.
3.  **Crea una función para guardar los datos** en el archivo cada vez que haya un cambio.
4.  **Llama a la función de guardado** en las rutas `POST`, `PUT` y `DELETE`.

Reemplaza todo el contenido de `crud-api/app.js` con este código actualizado:

```javascript
const express = require('express');
const cors = require('cors');
const fs = require('fs'); // Módulo para manejar archivos
const path = require('path'); // Módulo para manejar rutas de archivos

const app = express();
const PORT = 3000;

// --- Configuración de la Base de Datos (Archivo JSON) ---
const DB_PATH = path.join(__dirname, 'data.json');

const getArticlesFromDb = () => {
  const dbJson = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(dbJson);
};

const saveArticlesToDb = (articles) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(articles, null, 2));
};

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- Rutas CRUD ---

// LEER todos los artículos
app.get('/articles', (req, res) => {
  const articles = getArticlesFromDb();
  res.json({ status: 'ok', totalResults: articles.length, articles });
});

// LEER un solo artículo por ID
app.get('/articles/:id', (req, res) => {
  const articles = getArticlesFromDb();
  const article = articles.find(a => a.id === req.params.id);
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ message: 'Article not found' });
  }
});

// CREAR un nuevo artículo
app.post('/articles', (req, res) => {
  let articles = getArticlesFromDb();
  const newArticle = req.body;
  newArticle.id = `a${Date.now()}`; // ID único basado en el tiempo
  articles.push(newArticle);
  saveArticlesToDb(articles);
  res.status(201).json(newArticle);
});

// ACTUALIZAR un artículo
app.put('/articles/:id', (req, res) => {
  let articles = getArticlesFromDb();
  const articleIndex = articles.findIndex(a => a.id === req.params.id);
  if (articleIndex !== -1) {
    const updatedArticle = { ...articles[articleIndex], ...req.body, id: req.params.id };
    articles[articleIndex] = updatedArticle;
    saveArticlesToDb(articles);
    res.json(updatedArticle);
  } else {
    res.status(404).json({ message: 'Article not found' });
  }
});

// BORRAR un artículo
app.delete('/articles/:id', (req, res) => {
  let articles = getArticlesFromDb();
  const initialLength = articles.length;
  articles = articles.filter(a => a.id !== req.params.id);
  if (articles.length < initialLength) {
    saveArticlesToDb(articles);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Article not found' });
  }
});

// --- Iniciar Servidor ---
app.listen(PORT, () => {
  console.log(`CRUD API with persistence is running on http://localhost:${PORT}`);
});
```

### Paso 3: ¡Prueba la persistencia!

1.  Inicia el servidor: `node app.js`.
2.  Usa Postman (o similar) para enviar una petición `POST` a `http://localhost:3000/articles` con un nuevo artículo.
3.  Detén el servidor (Ctrl+C) y vuelve a iniciarlo.
4.  Ahora, haz una petición `GET` a `http://localhost:3000/articles`. ¡Verás que tu nuevo artículo sigue ahí!

---

## 2. Estructura Profesional: Separando Rutas y Controladores

**Objetivo:** Reorganizar el código de `crud-api` para que sea más limpio y fácil de mantener, separando la lógica de las rutas de la lógica de negocio.

### Paso 1: Crear la nueva estructura de carpetas

Dentro de `crud-api`, crea dos carpetas nuevas:
- `controllers`
- `routes`

### Paso 2: Crear el Controlador

Crea el archivo `crud-api/controllers/articles.controller.js`. Este archivo contendrá toda la lógica que antes estaba dentro de las rutas.

```javascript
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data.json');

const getArticlesFromDb = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
const saveArticlesToDb = (articles) => fs.writeFileSync(DB_PATH, JSON.stringify(articles, null, 2));

// Controlador para LEER todos los artículos
exports.getAllArticles = (req, res) => {
  const articles = getArticlesFromDb();
  res.json({ status: 'ok', totalResults: articles.length, articles });
};

// Controlador para CREAR un artículo
exports.createArticle = (req, res) => {
  let articles = getArticlesFromDb();
  const newArticle = req.body;
  newArticle.id = `a${Date.now()}`;
  articles.push(newArticle);
  saveArticlesToDb(articles);
  res.status(201).json(newArticle);
};

// ... (Puedes añadir aquí los controladores para GET by ID, PUT y DELETE como ejercicio)
```

### Paso 3: Crear el Router

Crea el archivo `crud-api/routes/articles.route.js`. Este archivo define las URLs y las conecta con las funciones del controlador.

```javascript
const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articles.controller');

// Define las rutas y las asocia a los controladores
router.get('/', articleController.getAllArticles);
router.post('/', articleController.createArticle);

// ... (Puedes añadir aquí las rutas para GET by ID, PUT y DELETE)

module.exports = router;
```

### Paso 4: Limpiar `app.js`

Ahora tu `app.js` principal se vuelve mucho más simple. Su única responsabilidad es configurar el servidor y "usar" las rutas que definimos.

```javascript
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Importar el router de artículos
const articleRoutes = require('./routes/articles.route');

// Middlewares
app.use(cors());
app.use(express.json());

// Usar el router con un prefijo de API
// Todas las rutas en articleRoutes ahora empezarán con /api/articles
app.use('/api/articles', articleRoutes);

// Iniciar Servidor
app.listen(PORT, () => {
  console.log(`Refactored CRUD API is running on http://localhost:${PORT}`);
});
```

¡Listo! La API funciona igual, pero ahora está organizada de una manera mucho más profesional y escalable.

---

## 3. Mejorando el Frontend: Estados de Carga y Errores

**Objetivo:** Hacer que nuestra página de noticias informe al usuario lo que está pasando.

### Paso 1: Añadir elementos de feedback en `index.html`

Justo después de la etiqueta `<body>`, añade estos dos `div`s:

```html
<body>
  <div id="loading-spinner" class="hidden">Cargando noticias...</div>
  <div id="error-message" class="hidden"></div>
  <nav>
  ...
```

Y en `style.css`, añade estilos para ocultarlos y mostrarlos:

```css
.hidden {
  display: none;
}

#loading-spinner, #error-message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: white;
  border: 1px solid black;
  z-index: 1000;
}

#error-message {
  background-color: #ffdddd;
  border-color: #ff0000;
  color: #d8000c;
}
```

### Paso 2: Actualizar `script.js`

Modifica la función `fetchNews` para que gestione estos elementos.

```javascript
// ... (el resto del script)

async function fetchNews(query) {
    const loadingSpinner = document.getElementById('loading-spinner');
    const errorMessage = document.getElementById('error-message');

    loadingSpinner.classList.remove('hidden');
    errorMessage.classList.add('hidden');

    try {
        const res = await fetch(`${localApiUrl}${query}`);
        if (!res.ok) {
            throw new Error(`Error del servidor: ${res.status}`);
        }
        const data = await res.json();
        
        if(data.articles.length === 0) {
            errorMessage.innerText = 'No se encontraron noticias para tu búsqueda.';
            errorMessage.classList.remove('hidden');
        }

        bindData(data.articles);
    } catch (error) {
        console.error('Falló la petición fetch:', error);
        errorMessage.innerText = 'No se pudieron cargar las noticias. Revisa la conexión con la API.';
        errorMessage.classList.remove('hidden');
        document.getElementById('cards-container').innerHTML = ''; // Limpia resultados viejos
    } finally {
        loadingSpinner.classList.add('hidden');
    }
}

// ... (el resto del script)
```

Ahora, si la API tarda en responder, el usuario verá "Cargando...". Si falla, verá un mensaje de error claro.

---

## 4. API Robusta: Validación de Entradas en el Backend

**Objetivo:** Proteger nuestra `crud-api` de recibir datos incorrectos o incompletos.

Modifica el controlador `crud-api/controllers/articles.controller.js` para validar los datos en la función `createArticle`.

```javascript
// ... (resto de funciones del controlador)

exports.createArticle = (req, res) => {
  const { title, author, description, url, urlToImage, content } = req.body;

  // Validación simple
  if (!title || !author || !description) {
    return res.status(400).json({
      message: 'Los campos title, author y description son obligatorios.'
    });
  }

  let articles = getArticlesFromDb();
  const newArticle = {
    id: `a${Date.now()}`,
    source: { id: null, name: 'Custom' },
    title,
    author,
    description,
    url,
    urlToImage,
    content,
    publishedAt: new Date().toISOString()
  };

  articles.push(newArticle);
  saveArticlesToDb(articles);
  res.status(201).json(newArticle);
};
```

Ahora, si intentas crear un artículo desde Postman sin un `title`, la API responderá con un error `400 Bad Request` y un mensaje claro, en lugar de guardar datos corruptos.

---

## 5. El Mundo Real: Una Introducción al Despliegue

**Objetivo:** Entender conceptualmente cómo nuestra aplicación puede pasar de `localhost` a una URL pública en internet.

Esto no requiere código, sino entender el proceso:

1.  **Subir el Código a GitHub:** El primer paso es tener todo nuestro proyecto en un repositorio de GitHub.

2.  **Desplegar el Backend (la API):**
    *   **Servicio:** Usaríamos una plataforma como **Render** o **Heroku**.
    *   **Proceso:** Conectas tu cuenta de GitHub a Render. Le dices que despliegue el repositorio y, muy importante, le indicas que la carpeta a desplegar es `basic-api` (o `crud-api`).
    *   **Variables de Entorno:** En el panel de control de Render, configurarías la variable de entorno `API_KEY` con el valor `fc79f79a...`. ¡Nunca se sube el archivo `.env` a GitHub!
    *   **Resultado:** Render te daría una URL pública para tu API, por ejemplo: `https://newspaper-api-backend.onrender.com`.

3.  **Desplegar el Frontend (la página de noticias):**
    *   **Servicio:** Usaríamos una plataforma como **Vercel** o **Netlify**, que son especialistas en desplegar sitios estáticos (HTML, CSS, JS).
    *   **Proceso:** El proceso es similar. Conectas GitHub y le dices que despliegue la carpeta raíz del proyecto.
    *   **El Cambio Final:** Antes de desplegar, tendrías que hacer un último cambio en `script.js`. La variable `localApiUrl` debería apuntar a la URL pública de tu backend:
        ```javascript
        const localApiUrl = "https://newspaper-api-backend.onrender.com/news?q=";
        ```
    *   **Resultado:** Vercel te daría una URL pública para tu página, por ejemplo: `https://newspaper-app-gperezm.vercel.app`.

¡Y eso es todo! Al acceder a la URL de Vercel, estarías usando una aplicación completamente funcional en la nube, con un frontend y un backend desacoplados y comunicándose a través de internet, tal como funcionan las aplicaciones modernas.

---

### Conclusión de la Guía Avanzada

Al completar estos pasos, no solo has construido una aplicación, sino que has practicado los fundamentos de la persistencia de datos, la arquitectura de software, la experiencia de usuario y la seguridad de una API. Estos son los pilares sobre los que se construyen aplicaciones mucho más grandes y complejas. ¡Excelente trabajo!
