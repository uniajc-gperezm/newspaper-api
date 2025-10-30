# Temario de Exposiciones: Tópicos Avanzados en Desarrollo Web

**Objetivo del Documento:** Proveer una guía de temas de exposición para grupos de 4 a 5 estudiantes. Cada tema representa una especialización o un siguiente paso lógico en la construcción de una aplicación web completa, usando el proyecto del periódico como base.

---

### Tema 1: Sistema de Autenticación y Perfiles de Usuario con JWT

**Objetivo de la Exposición:** Implementar un sistema de autenticación y autorización de punta a punta. La meta es que solo los usuarios registrados y autenticados puedan crear, modificar o eliminar artículos, mientras que los visitantes anónimos solo pueden leerlos.

**Conceptos Clave a Cubrir:**
*   Hashing de contraseñas (bcrypt).
*   JSON Web Tokens (JWT): Estructura, firma y propósito.
*   Autenticación sin estado (Stateless Authentication).
*   Middlewares en Express para protección de rutas.
*   Almacenamiento seguro de tokens en el cliente (Cookies vs. LocalStorage).

**Desglose Sugerido de Tareas por Integrante:**
*   **Integrante 1 (Arquitecto de la Base de Datos):**
    *   **Tarea:** Diseñar y crear la tabla `users` en la base de datos SQLite.
    *   **Responsabilidad:** Explicar el esquema de la tabla (email, password_hash, etc.). Implementar la lógica en el servicio para crear un nuevo usuario, asegurándose de **hashear la contraseña con `bcrypt`** antes de guardarla. Presentar por qué nunca se deben guardar contraseñas en texto plano.

*   **Integrante 2 (Especialista en Autenticación):**
    *   **Tarea:** Implementar la ruta `POST /auth/login`.
    *   **Responsabilidad:** Desarrollar la lógica que compara la contraseña enviada con el hash almacenado usando `bcrypt.compare()`. Si la autenticación es exitosa, generar un JWT firmado con un secreto (`process.env.JWT_SECRET`). Explicar la estructura del JWT y qué información (payload) es útil incluir.

*   **Integrante 3 (Guardián de la API - Middleware):**
    *   **Tarea:** Crear un middleware de Express `authenticateToken.js`.
    *   **Responsabilidad:** Este middleware deberá extraer el JWT de la cabecera `Authorization: Bearer <token>`. Verificará la firma del token y su validez. Si es válido, adjuntará la información del usuario (`payload`) al objeto `req` y pasará a la siguiente función. Si no, devolverá un error `401 Unauthorized`.

*   **Integrante 4 (Gestor de Sesión en el Cliente):**
    *   **Tarea:** Modificar el frontend (sea Vanilla JS o React) para manejar el login.
    *   **Responsabilidad:** Crear un formulario de login. Al recibir el JWT del backend, deberá almacenarlo de forma segura. Investigar y exponer las diferencias, ventajas y desventajas de guardar el token en `localStorage` vs. `HttpOnly Cookies` (opción más segura). Implementar la lógica para enviar el token en las cabeceras de las peticiones a rutas protegidas.

*   **Integrante 5 (Opcional - Gestor de Perfiles):**
    *   **Tarea:** Crear una ruta protegida `GET /users/me` que devuelva la información del usuario actualmente autenticado.
    *   **Responsabilidad:** Demostrar un caso de uso práctico del middleware de autenticación, donde una ruta devuelve información personalizada basada en el token del usuario.

**Resultado Esperado:** Una demostración funcional donde un usuario se registra, inicia sesión, y solo entonces puede usar un formulario en el frontend para crear un nuevo artículo.

---

### Tema 2: Pirámide de Pruebas (Testing) para la API

**Objetivo de la Exposición:** Demostrar un enfoque profesional para garantizar la calidad del software mediante la implementación de tres niveles de pruebas automatizadas para la `crud-api`.

**Conceptos Clave a Cubrir:**
*   La Pirámide de Pruebas (Unitarias, Integración, End-to-End).
*   Frameworks de testing: Jest.
*   Mocking y Stubs.
*   Pruebas de API con Supertest.
*   Pruebas de UI con Cypress o Playwright.

**Desglose Sugerido de Tareas por Integrante:**
*   **Integrante 1 (Fundamentos y Pruebas Unitarias):**
    *   **Tarea:** Introducir la teoría de la Pirámide de Pruebas. Configurar **Jest** y escribir **pruebas unitarias** para una capa de servicio (ej: `article.service.js`).
    *   **Responsabilidad:** Explicar qué es una prueba unitaria. Demostrar cómo "mockear" (simular) la base de datos para que las pruebas de la lógica de negocio se ejecuten de forma aislada y rápida.

*   **Integrante 2 (Pruebas de Integración):**
    *   **Tarea:** Escribir **pruebas de integración** para los endpoints de la API.
    *   **Responsabilidad:** Usando **Jest** y **Supertest**, realizar peticiones HTTP a la API en un entorno de prueba. Verificar que las rutas (`GET`, `POST`, etc.) devuelvan los códigos de estado y las respuestas JSON correctas.

*   **Integrante 3 (Pruebas End-to-End - E2E):**
    *   **Tarea:** Escribir una o dos **pruebas E2E** para el frontend.
    *   **Responsabilidad:** Usando una herramienta como **Cypress** o **Playwright**, simular las acciones de un usuario real en el navegador. Por ejemplo: "abrir la página, escribir 'tecnología' en el buscador, hacer clic en 'Buscar' y verificar que aparezcan tarjetas de noticias".

*   **Integrante 4 (Calidad y Automatización - CI):**
    *   **Tarea:** Configurar el script `npm test` y generar un reporte de **cobertura de código (code coverage)**.
    *   **Responsabilidad:** Explicar qué es la cobertura y cómo ayuda a identificar partes del código que no están probadas. Como bonus, crear un flujo de trabajo simple en **GitHub Actions** que ejecute las pruebas automáticamente en cada `push`.

**Resultado Esperado:** Una demostración en vivo de la ejecución de los tres tipos de pruebas y una explicación clara de cómo cada una contribuye a la calidad y fiabilidad de la aplicación.

---

### Tema 3: API Real-Time con WebSockets

**Objetivo de la Exposición:** Evolucionar la API de un modelo de petición-respuesta (HTTP) a un modelo de comunicación bidireccional y en tiempo real usando WebSockets.

**Conceptos Clave a Cubrir:**
*   Limitaciones de HTTP para aplicaciones en tiempo real.
*   Protocolo WebSocket.
*   Librerías: Socket.IO o `ws`.
*   Eventos, emisión (emit), escucha (on).
*   Salas (Rooms) y Namespaces.

**Desglose Sugerido de Tareas por Integrante:**
*   **Integrante 1 (Introducción y Setup del Servidor):**
    *   **Tarea:** Explicar la diferencia fundamental entre HTTP y WebSockets. Integrar **Socket.IO** en el servidor Express existente.
    *   **Responsabilidad:** Configurar el servidor para que acepte conexiones WebSocket y registrar eventos básicos como `connection` y `disconnect`.

*   **Integrante 2 (Lógica de Eventos en el Backend):**
    *   **Tarea:** Implementar la lógica de emisión de eventos.
    *   **Responsabilidad:** Modificar la ruta `POST /api/articles` para que, después de guardar un nuevo artículo, emita un evento (ej: `new_article_added`) a todos los clientes conectados, enviando el nuevo artículo como datos.

*   **Integrante 3 (Integración en el Cliente):**
    *   **Tarea:** Modificar el frontend para que se conecte al servidor de WebSockets.
    *   **Responsabilidad:** Usar el cliente de Socket.IO en el frontend para escuchar el evento `new_article_added`. Cuando se reciba el evento, el frontend deberá añadir dinámicamente el nuevo artículo a la lista de noticias **sin necesidad de recargar la página**.

*   **Integrante 4 (Caso de Uso Avanzado: Notificaciones por Categoría):**
    *   **Tarea:** Implementar el concepto de "Salas" (Rooms).
    *   **Responsabilidad:** Permitir que los clientes se unan a salas basadas en categorías. Modificar el backend para que, al crear un artículo, solo emita el evento a los clientes que están en la sala correspondiente.

**Resultado Esperado:** Una demostración donde un usuario crea un nuevo artículo, y la página web de otros usuarios se actualiza instantáneamente para mostrar el nuevo artículo sin recargar.

---

### Tema 4: Construyendo una API con GraphQL

**Objetivo de la Exposición:** Reconstruir la `crud-api` utilizando **GraphQL** en lugar de REST, demostrando sus ventajas para evitar el sobre-fetching y under-fetching de datos.

**Conceptos Clave a Cubrir:**
*   REST vs. GraphQL.
*   Schema Definition Language (SDL).
*   Tipos, Queries, Mutations, Resolvers.
*   Herramientas: Apollo Server, GraphQL Playground.

**Desglose Sugerido de Tareas por Integrante:**
*   **Integrante 1 (El Arquitecto del Schema):**
    *   **Tarea:** Introducir los conceptos de GraphQL. Escribir el **Schema** de GraphQL.
    *   **Responsabilidad:** Definir los tipos (`Article`, `Source`) y las operaciones principales (`Query` para leer datos y `Mutation` para escribir datos) en un archivo `schema.graphql`.

*   **Integrante 2 (Implementador de Queries):**
    *   **Tarea:** Escribir los **Resolvers** para las `Queries`.
    *   **Responsabilidad:** Crear las funciones que resuelven las queries `allArticles` y `article(id: ID!)`, reutilizando la capa de servicio ya existente.

*   **Integrante 3 (Implementador de Mutations):**
    *   **Tarea:** Escribir los **Resolvers** para las `Mutations`.
    *   **Responsabilidad:** Implementar las funciones para `createArticle`, `updateArticle` y `deleteArticle`, conectándolas también a la capa de servicio.

*   **Integrante 4 (El Demostrador Práctico):**
    *   **Tarea:** Configurar **Apollo Server** y realizar una demostración práctica.
    *   **Responsabilidad:** Usando GraphQL Playground, demostrar cómo un cliente puede pedir *exactamente* los campos que necesita. Presentar una comparativa final de pros y contras entre REST y GraphQL.

**Resultado Esperado:** Una API GraphQL funcional y una demostración clara de cómo el cliente tiene el poder de definir la forma de los datos que recibe.

---

### Tema 5: Despliegue y Operaciones (DevOps) con Contenedores

**Objetivo de la Exposición:** Demostrar el ciclo de vida completo de despliegue de la `crud-api` utilizando tecnologías de contenedores (Docker) y automatización (GitHub Actions).

**Conceptos Clave a Cubrir:**
*   Contenerización y sus beneficios.
*   Dockerfile y Docker Compose.
*   Imágenes y Contenedores.
*   Integración Continua y Despliegue Continuo (CI/CD).
*   GitHub Actions.

**Desglose Sugerido de Tareas por Integrante:**
*   **Integrante 1 (El Especialista en Docker):**
    *   **Tarea:** Escribir un `Dockerfile` optimizado para la `crud-api`.
    *   **Responsabilidad:** Explicar las buenas prácticas, como el uso de **builds multi-etapa (multi-stage builds)** para crear imágenes de producción ligeras y seguras.

*   **Integrante 2 (El Orquestador Multi-Servicio):**
    *   **Tarea:** Crear un archivo `docker-compose.yml`.
    *   **Responsabilidad:** Definir una aplicación multi-servicio (ej: la API y una base de datos PostgreSQL). Explicar cómo Docker Compose maneja las redes y los volúmenes de datos.

*   **Integrante 3 (Automatización de la Integración Continua - CI):**
    *   **Tarea:** Crear un flujo de trabajo de CI con **GitHub Actions**.
    *   **Responsabilidad:** Configurar un workflow que se active en cada `push` y que automáticamente ejecute las pruebas y construya la imagen de Docker.

*   **Integrante 4 (Automatización del Despliegue Continuo - CD):**
    *   **Tarea:** Extender el flujo de trabajo de GitHub Actions para el despliegue.
    *   **Responsabilidad:** Después de que la CI sea exitosa, el workflow deberá **publicar la imagen de Docker** en un registro y luego **desencadenar un despliegue** en un servicio en la nube.

**Resultado Esperado:** Una presentación que muestre un flujo de trabajo automatizado donde un `git push` desencadena pruebas, la creación de una imagen de software portable (Docker) y su despliegue.

---

### Tema 6: Subida de Archivos y Servidor de Medios

**Objetivo de la Exposición:** Implementar una funcionalidad para que los usuarios puedan subir imágenes para los artículos, en lugar de solo enlazar a URLs externas.

**Conceptos Clave a Cubrir:**
*   Peticiones `multipart/form-data`.
*   Middleware de manejo de archivos: `multer`.
*   Servir archivos estáticos con Express.
*   Consideraciones de seguridad al aceptar subidas de archivos.

**Desglose Sugerido de Tareas por Integrante:**
*   **Integrante 1 (Configuración del Backend):**
    *   **Tarea:** Integrar el middleware **`multer`** en la `crud-api`.
    *   **Responsabilidad:** Configurar `multer` para que acepte subidas de imágenes, las guarde en una carpeta en el servidor (ej: `/uploads`), y limite el tamaño y tipo de archivo.

*   **Integrante 2 (Modificación de la API):**
    *   **Tarea:** Adaptar las rutas `POST` y `PUT` para manejar la subida de archivos.
    *   **Responsabilidad:** Modificar el controlador para que guarde la ruta local al archivo en la base de datos en el campo `urlToImage`.

*   **Integrante 3 (Servidor de Archivos Estáticos):**
    *   **Tarea:** Configurar Express para servir la carpeta `/uploads`.
    *   **Responsabilidad:** Usar `express.static('uploads')` para que los archivos guardados sean accesibles públicamente a través de una URL.

*   **Integrante 4 (Integración con el Frontend):**
    *   **Tarea:** Modificar el frontend para incluir un campo de subida de archivo.
    *   **Responsabilidad:** Crear o modificar el formulario para que envíe una petición `multipart/form-data` (usando `FormData`) al backend.

**Resultado Esperado:** Una demostración donde un usuario puede crear un nuevo artículo a través de un formulario, seleccionar una imagen de su computadora, y ver el nuevo artículo renderizado con la imagen que acaba de subir, servida directamente desde la API.
