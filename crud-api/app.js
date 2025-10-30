// Importa la librería express
// La necesitamos para crear nuestro servidor web y manejar las solicitudes.
const express = require('express');

// Crea una instancia de la aplicación express
// Este objeto 'app' se utilizará para definir nuestras rutas de API.
const app = express();

// Importa y usa la librería cors para permitir peticiones desde otros dominios (el frontend)
const cors = require('cors');
app.use(cors());

// Define el puerto en el que nuestro servidor escuchará.
// Es una práctica común usar el puerto 3000 para desarrollo.
const PORT = 3000;

// Middleware para parsear cuerpos de solicitud JSON
// Esto permite que nuestra API entienda los datos JSON que le enviamos en las solicitudes POST y PUT.
app.use(express.json());

// Esta es nuestra data falsa hardcodeada.
// Es un objeto que imita la estructura de la API que solicitaste.
let fakeApiData = { // Usamos 'let' porque vamos a modificar esta data
  "status": "ok",
  "totalResults": 4,
  "articles": [
    {
      "id": "a1", // Añadimos un ID único para cada artículo
      "source": {
        "id": "tech-daily",
        "name": "Tech Daily"
      },
      "author": "Alex Tech",
      "title": "Future of AI: What to Expect Next Decade",
      "description": "Experts predict major breakthroughs in artificial intelligence, impacting daily life and industries worldwide.",
      "url": "https://www.techdaily.com/ai-future",
      "urlToImage": "https://www.techdaily.com/images/ai-future.jpg",
      "publishedAt": "2025-06-01T10:00:00Z",
      "content": "Artificial intelligence continues to evolve at a rapid pace. Researchers are focusing on explainable AI and ethical implications. Expect more personalized experiences powered by AI in areas like healthcare and education. The integration of AI into robotics is also set to accelerate, leading to more autonomous systems in various sectors. This will revolutionize manufacturing and logistics. [+1200 chars]"
    },
    {
      "id": "a2",
      "source": {
        "id": "global-news",
        "name": "Global News"
      },
      "author": "Maria Reporter",
      "title": "Climate Change Solutions: New Innovations Emerge",
      "description": "Scientists are developing groundbreaking technologies to combat climate change, offering hope for a sustainable future.",
      "url": "https://www.globalnews.com/climate-solutions",
      "urlToImage": "https://www.globalnews.com/images/climate-solutions.jpg",
      "publishedAt": "2025-06-05T14:30:00Z",
      "content": "From advanced carbon capture technologies to renewable energy storage solutions, the fight against climate change is seeing new innovations. Researchers are exploring geoengineering techniques, though they come with their own set of challenges and ethical considerations. International collaborations are key to implementing these solutions globally. Citizen science initiatives are also playing a vital role in data collection and awareness. [+1500 chars]"
    },
    {
      "id": "a3",
      "source": {
        "id": null,
        "name": "Health Today"
      },
      "author": "Dr. Wellness",
      "title": "Breakthrough in Gene Therapy for Rare Diseases",
      "description": "A new gene therapy shows promise in treating previously incurable rare genetic disorders.",
      "url": "https://www.healthtoday.com/gene-therapy",
      "urlToImage": "https://www.healthtoday.com/images/gene-therapy.jpg",
      "publishedAt": "2025-06-10T09:15:00Z",
      "content": "In a significant medical advancement, preliminary trials for a novel gene therapy have yielded positive results. This therapy targets specific genetic mutations, offering a new ray of hope for patients suffering from conditions like cystic fibrosis and Huntington's disease. Ethical debates surrounding gene editing continue, but the potential to alleviate suffering is immense. Regulatory bodies are working to ensure safe and effective deployment of these therapies. [+1000 chars]"
    },
    {
      "id": "a4",
      "source": {
        "id": "space-frontier",
        "name": "Space Frontier"
      },
      "author": "Cosmic Explorer",
      "title": "Mars Colonization Plans Accelerate",
      "description": "Private companies and space agencies are making rapid progress toward establishing human settlements on Mars.",
      "url": "https://www.spacefrontier.com/mars-colonization",
      "urlToImage": "https://www.spacefrontier.com/images/mars-colonization.jpg",
      "publishedAt": "2025-06-15T18:45:00Z",
      "content": "With advancements in rocketry and life support systems, the dream of living on Mars is closer than ever. Plans include building self-sustaining habitats and utilizing Martian resources. Challenges remain, such as radiation exposure and long-duration space travel, but engineers are actively developing solutions. International cooperation is crucial for such an ambitious endeavor. Public interest in space exploration is at an all-time high. [+1300 chars]"
    }
  ]
};

// Ruta para LEER todos los artículos (GET all)
// Cuando alguien visita la URL "/articles", esta función se ejecutará.
app.get('/articles', (req, res) => {
  // Envía todos los artículos como una respuesta JSON.
  res.json(fakeApiData);
});

// Ruta para LEER un solo artículo por ID (GET by ID)
// Cuando alguien visita "/articles/:id", donde :id es un marcador de posición para el ID del artículo.
app.get('/articles/:id', (req, res) => {
  // Extrae el ID del artículo de los parámetros de la URL.
  const articleId = req.params.id;
  // Busca el artículo en nuestro array 'articles' por su ID.
  const article = fakeApiData.articles.find(a => a.id === articleId);

  // Si se encuentra el artículo, envíalo.
  if (article) {
    res.json(article);
  } else {
    // Si no se encuentra el artículo, envía un estado 404 (No encontrado) y un mensaje.
    res.status(404).json({ message: 'Article not found' });
  }
});

// Ruta para CREAR un nuevo artículo (POST)
// Cuando alguien envía una solicitud POST a "/articles".
app.post('/articles', (req, res) => {
  // El nuevo artículo se envía en el cuerpo de la solicitud (req.body).
  const newArticle = req.body;

  // Asigna un ID único al nuevo artículo.
  // En una aplicación real, esto se haría con una base de datos.
  newArticle.id = `a${fakeApiData.articles.length + 1}`;

  // Añade el nuevo artículo al array de artículos.
  fakeApiData.articles.push(newArticle);
  // Actualiza el total de resultados.
  fakeApiData.totalResults = fakeApiData.articles.length;

  // Envía el nuevo artículo creado con un estado 201 (Creado).
  res.status(201).json(newArticle);
});

// Ruta para ACTUALIZAR un artículo existente (PUT)
// Cuando alguien envía una solicitud PUT a "/articles/:id".
app.put('/articles/:id', (req, res) => {
  // Extrae el ID del artículo de los parámetros de la URL.
  const articleId = req.params.id;
  // Obtiene los datos actualizados del cuerpo de la solicitud.
  const updatedArticleData = req.body;

  // Encuentra el índice del artículo en el array.
  const articleIndex = fakeApiData.articles.findIndex(a => a.id === articleId);

  // Si se encuentra el artículo.
  if (articleIndex !== -1) {
    // Actualiza el artículo con los nuevos datos, manteniendo su ID original.
    fakeApiData.articles[articleIndex] = { ...fakeApiData.articles[articleIndex], ...updatedArticleData, id: articleId };
    // Envía el artículo actualizado.
    res.json(fakeApiData.articles[articleIndex]);
  } else {
    // Si no se encuentra el artículo, envía un estado 404.
    res.status(404).json({ message: 'Article not found' });
  }
});

// Ruta para BORRAR un artículo (DELETE)
// Cuando alguien envía una solicitud DELETE a "/articles/:id".
app.delete('/articles/:id', (req, res) => {
  // Extrae el ID del artículo de los parámetros de la URL.
  const articleId = req.params.id;

  // Filtra el array para crear uno nuevo sin el artículo a borrar.
  const initialLength = fakeApiData.articles.length;
  fakeApiData.articles = fakeApiData.articles.filter(a => a.id !== articleId);
  // Actualiza el total de resultados.
  fakeApiData.totalResults = fakeApiData.articles.length;

  // Si la longitud del array cambió, significa que se borró un artículo.
  if (fakeApiData.articles.length < initialLength) {
    // Envía un estado 204 (Sin Contenido) para indicar éxito sin devolver data.
    res.status(204).send();
  } else {
    // Si no se encontró el artículo para borrar, envía un estado 404.
    res.status(404).json({ message: 'Article not found' });
  }
});


// Inicia el servidor y haz que escuche las solicitudes entrantes en el PUERTO definido.
app.listen(PORT, () => {
  // Este mensaje se registrará en tu consola cuando el servidor se inicie correctamente.
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Open your browser and go to http://localhost:3000/articles to see all articles.');
});
