// Load environment variables from .env file
require('dotenv').config();

// Import the express library
// We need this to create our web server and handle requests.
const express = require('express');
// Importa la librería cors
// La necesitamos para manejar las políticas de seguridad de "Cross-Origin Resource Sharing" (CORS).
const cors = require('cors');

// Create an instance of the express application
// This 'app' object will be used to define our API routes.
const app = express();

// Define the port our server will listen on.
// It's common practice to use port 3000 for development.
const PORT = 3000;

// Middleware para habilitar CORS
// Esto permite que nuestra API sea accesible desde diferentes dominios (por ejemplo, desde una aplicación web que se ejecuta en un puerto o dominio diferente).
app.use(cors());

// Middleware para parsear cuerpos de solicitud JSON
// Esto permite que nuestra API entienda los datos JSON que le enviamos en las solicitudes POST y PUT.
app.use(express.json());

// --- NEW ENDPOINT: Proxy for External News API ---
// This endpoint will receive requests from our frontend, add the secret API key,
// and forward the request to the real NewsAPI.
app.get('/news', async (req, res) => {
  const query = req.query.q || 'latest'; // Use the query from the frontend, or default to 'latest'
  const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`NewsAPI responded with ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching from NewsAPI:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});


// --- ORIGINAL ENDPOINT: Local Fake Data ---
// This is our hardcoded fake data.
// It's an object that mimics the structure of the API you requested.
const fakeApiData = {
  "status": "ok",
  "totalResults": 4,
  "articles": [
    {
      "source": {
        "id": "tech-daily",
        "name": "Tech Daily"
      },
      "author": "Alex Tech",
      "title": "Future of AI: What to Expect Next Decade",
      "description": "Experts predict major breakthroughs in artificial intelligence, impacting daily life and industries worldwide.",
      "url": "https://www.techdaily.com/ai-future",
      "urlToImage": "https://platform.theverge.com/wp-content/uploads/sites/2/2025/03/STK466_ELECTION_2024_CVirginia_F.webp?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200",
      "publishedAt": "2025-06-01T10:00:00Z", // Using a future date
      "content": "Artificial intelligence continues to evolve at a rapid pace. Researchers are focusing on explainable AI and ethical implications. Expect more personalized experiences powered by AI in areas like healthcare and education. The integration of AI into robotics is also set to accelerate, leading to more autonomous systems in various sectors. This will revolutionize manufacturing and logistics. [+1200 chars]"
    },
    {
      "source": {
        "id": "global-news",
        "name": "Global News"
      },
      "author": "Maria Reporter",
      "title": "Climate Change Solutions: New Innovations Emerge",
      "description": "Scientists are developing groundbreaking technologies to combat climate change, offering hope for a sustainable future.",
      "url": "https://www.globalnews.com/climate-solutions",
      "urlToImage": "https://platform.theverge.com/wp-content/uploads/sites/2/2025/03/STK466_ELECTION_2024_CVirginia_F.webp?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200",
      "publishedAt": "2025-06-05T14:30:00Z", // Using a future date
      "content": "From advanced carbon capture technologies to renewable energy storage solutions, the fight against climate change is seeing new innovations. Researchers are exploring geoengineering techniques, though they come with their own set of challenges and ethical considerations. International collaborations are key to implementing these solutions globally. Citizen science initiatives are also playing a vital role in data collection and awareness. [+1500 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Health Today"
      },
      "author": "Dr. Wellness",
      "title": "Breakthrough in Gene Therapy for Rare Diseases",
      "description": "A new gene therapy shows promise in treating previously incurable rare genetic disorders.",
      "url": "https://www.healthtoday.com/gene-therapy",
      "urlToImage": "https://platform.theverge.com/wp-content/uploads/sites/2/2025/03/STK466_ELECTION_2024_CVirginia_F.webp?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200",
      "publishedAt": "2025-06-10T09:15:00Z", // Using a future date
      "content": "In a significant medical advancement, preliminary trials for a novel gene therapy have yielded positive results. This therapy targets specific genetic mutations, offering a new ray of hope for patients suffering from conditions like cystic fibrosis and Huntington's disease. Ethical debates surrounding gene editing continue, but the potential to alleviate suffering is immense. Regulatory bodies are working to ensure safe and effective deployment of these therapies. [+1000 chars]"
    },
    {
      "source": {
        "id": "space-frontier",
        "name": "Space Frontier"
      },
      "author": "Cosmic Explorer",
      "title": "Mars Colonization Plans Accelerate",
      "description": "Private companies and space agencies are making rapid progress toward establishing human settlements on Mars.",
      "url": "https://www.spacefrontier.com/mars-colonization",
      "urlToImage": "https://platform.theverge.com/wp-content/uploads/sites/2/2025/03/STK466_ELECTION_2024_CVirginia_F.webp?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200",
      "publishedAt": "2025-06-15T18:45:00Z", // Using a future date
      "content": "With advancements in rocketry and life support systems, the dream of living on Mars is closer than ever. Plans include building self-sustaining habitats and utilizing Martian resources. Challenges remain, such as radiation exposure and long-duration space travel, but engineers are actively developing solutions. International cooperation is crucial for such an ambitious endeavor. Public interest in space exploration is at an all-time high. [+1300 chars]"
    }
  ]
};

// Define our first (and only) API endpoint.
// When someone visits the root URL ("/") of our server, this function will run.
app.get('/', (req, res) => {
  // 'req' is the request object (what the client sent)
  // 'res' is the response object (what we send back to the client)

  // Use res.json() to send our fake data back as a JSON response.
  // This automatically sets the correct Content-Type header.
  res.json(fakeApiData);
});

// Start the server and make it listen for incoming requests on the defined PORT.
app.listen(PORT, () => {
  // This message will be logged to your console when the server successfully starts.
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Open your browser and go to http://localhost:3000 to see the API response.');
});