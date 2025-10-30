# Guía Práctica de APIs con Node.js para Estudiantes

¡Bienvenido! Este repositorio es una herramienta de aprendizaje diseñada para ofrecer una introducción práctica al mundo de las APIs (Interfaces de Programación de Aplicaciones) utilizando Node.js.

A través de este proyecto, entenderás:
- Qué es una API y para qué sirve.
- Cómo funciona un servidor web con Node.js y Express.
- La diferencia fundamental entre consumir una API externa (real, en internet) y una API local (creada por nosotros mismos).
- Qué son las operaciones CRUD en una API.

---

## Parte 1: ¿Qué es una API?

Imagina que estás en un restaurante. Tú eres el **Cliente** y la cocina es el **Servidor** donde se preparan los platillos (los datos). ¿Cómo pides tu comida? No entras a la cocina a prepararla tú mismo. En su lugar, hablas con el mesero.

El **mesero es la API**.

1.  **Petición (Request):** Le das tu orden al mesero (ej: "Quiero una hamburguesa").
2.  **Procesamiento:** El mesero lleva la orden a la cocina. La cocina la prepara.
3.  **Respuesta (Response):** El mesero te trae la hamburguesa desde la cocina.

Una API funciona igual: es un intermediario que define las "órdenes" (peticiones) que un software cliente puede hacer a un software servidor para obtener "platillos" (datos) o realizar una acción.

---

## Parte 2: ¿Cómo funciona Node.js y Express?

-   **Node.js:** Es un entorno que nos permite ejecutar código JavaScript en el **servidor** (la "cocina"), fuera del navegador. Antes de Node.js, JavaScript solo vivía en el frontend (el navegador del usuario). Con Node.js, podemos crear la lógica de negocio, gestionar bases de datos y construir APIs.

-   **Express.js:** Es una librería (un "framework") para Node.js que simplifica enormemente la creación de servidores web y APIs. Express nos da herramientas fáciles de usar para:
    -   Definir **rutas** (las URLs que nuestro servidor escuchará, como `/articulos` o `/usuarios`).
    -   Manejar diferentes **métodos HTTP** (las acciones que el cliente quiere realizar):
        -   `GET`: Para pedir datos (leer).
        -   `POST`: Para enviar datos nuevos (crear).
        -   `PUT` o `PATCH`: Para modificar datos existentes (actualizar).
        -   `DELETE`: Para borrar datos.

En los archivos `basic-api/app.js` y `crud-api/app.js`, puedes ver cómo usamos `express()` para crear un servidor.

---

## Parte 2: ¿Cómo funciona Node.js y Express?

-   **Node.js:** Es un entorno que nos permite ejecutar código JavaScript en el **servidor** (la "cocina"), fuera del navegador. Antes de Node.js, JavaScript solo vivía en el frontend (el navegador del usuario). Con Node.js, podemos crear la lógica de negocio, gestionar bases de datos y construir APIs.

-   **Express.js:** Es una librería (un "framework") para Node.js que simplifica enormemente la creación de servidores web y APIs. Express nos da herramientas fáciles de usar para:
    -   Definir **rutas** (las URLs que nuestro servidor escuchará, como `/articulos` o `/usuarios`).
    -   Manejar diferentes **métodos HTTP** (las acciones que el cliente quiere realizar):
        -   `GET`: Para pedir datos (leer).
        -   `POST`: Para enviar datos nuevos (crear).
        -   `PUT` o `PATCH`: Para modificar datos existentes (actualizar).
        -   `DELETE`: Para borrar datos.

En los archivos `basic-api/app.js` y `crud-api/app.js`, puedes ver cómo usamos `express()` para crear un servidor.

---

## Parte 3: Profundizando: ¿Qué es una API RESTful?

La `crud-api` que construimos es un ejemplo de una **API RESTful**. Este es un término que escucharás constantemente. REST (REpresentational State Transfer) no es una tecnología, sino un **estilo de arquitectura** o un conjunto de reglas y convenciones para diseñar APIs.

Una API que sigue estas reglas se considera "RESTful". Su objetivo es ser predecible, escalable y fácil de usar.

### Estructura y Nomenclatura: Recursos y URLs

La idea central de REST es pensar en todo como un **Recurso**. Un recurso es cualquier objeto o entidad sobre la que la API puede proporcionar información. En nuestro proyecto, un `artículo` es un recurso. En otras APIs, podrían ser `usuarios`, `productos`, `comentarios`, etc.

La nomenclatura de las URLs en REST se basa en identificar estos recursos usando **sustantivos en plural**, no verbos.

-   **Correcto (Estilo REST):**
    -   `/articles` (Se refiere a la colección de todos los artículos).
    -   `/articles/a1` (Se refiere al artículo específico con el ID `a1`).

-   **Incorrecto (Estilo no RESTful):**
    -   `/getAllArticles`
    -   `/createArticle`
    -   `/deleteArticleById?id=a1`

### ¿Cómo Funciona? Los Verbos HTTP

Si las URLs solo identifican el "qué" (el recurso), ¿cómo le decimos a la API el "cómo" (la acción que queremos realizar)? Usamos los **verbos del protocolo HTTP** que ya conocemos. La combinación de una URL (sustantivo) y un verbo HTTP define la operación completa.

| Verbo HTTP | URL de Ejemplo         | Acción que Realiza                                     |
| :--------- | :--------------------- | :----------------------------------------------------- |
| `GET`      | `/articles`            | Obtener una lista de todos los artículos.                |
| `GET`      | `/articles/a1`         | Obtener los detalles del artículo con ID `a1`.         |
| `POST`     | `/articles`            | Crear un nuevo artículo (los datos van en el cuerpo).    |
| `PUT`      | `/articles/a1`         | Reemplazar/Actualizar completamente el artículo `a1`.    |
| `DELETE`   | `/articles/a1`         | Borrar el artículo con ID `a1`.                        |

### Otras Características Clave

-   **Sin Estado (Stateless):** Cada petición que el cliente hace a la API debe contener toda la información necesaria para que el servidor la entienda. El servidor no guarda ningún contexto o "sesión" del cliente entre peticiones. Esto hace que la API sea más simple y escalable.
-   **Representación de Datos:** La información se intercambia en un formato estándar, generalmente **JSON**, que es ligero y fácil de procesar tanto para humanos como para máquinas.

Al seguir estas convenciones, cualquier desarrollador que vea tu API puede intuir rápidamente cómo usarla sin necesidad de leer toda la documentación, ya que sigue un patrón estándar de la industria.

---

## Parte 4: El Ecosistema de este Repositorio

Este proyecto tiene 3 partes principales que trabajan juntas:

1.  **El Frontend (Cliente):** Los archivos `index.html`, `style.css` y `script.js`. Juntos, forman una página web de noticias que el usuario ve y con la que interactúa. Su principal trabajo es **pedir (consumir) datos** de una API y mostrarlos de forma bonita.

2.  **La API Básica (Servidor Local):** La carpeta `basic-api`. Es un servidor simple creado con Node.js/Express que ofrece una lista estática de noticias. No puede crear, actualizar o borrar, solo **leer**.

3.  **La API CRUD (Servidor Local Avanzado):** La carpeta `crud-api`. Es un servidor más completo que permite las 4 operaciones básicas de gestión de datos: **C**reate (Crear), **R**ead (Leer), **U**pdate (Actualizar) y **D**elete (Borrar).

---

## Parte 4: API Externa vs. API Local (La Gran Diferencia)

Aquí está el concepto más importante de esta guía. El frontend (`script.js`) está configurado para usar una API externa, pero podemos modificarlo para que use nuestras APIs locales.

### A) Conexión a una API Externa (El Mundo Real)

Así es como el proyecto funciona por defecto.

-   **¿Dónde está el código?:** Abre el archivo `script.js`.
-   **La Clave:** Verás estas líneas al principio:
    ```javascript
    const API_KEY = "fc79f79a94294473acc63c5940866b0e";
    const url = "https://newsapi.org/v2/everything?q=";
    ```
-   **Explicación:** `newsapi.org` es un servidor en internet, mantenido por otra empresa. Nuestro periódico le pide noticias reales y actualizadas a través de la red. La `API_KEY` es como una contraseña que nos identifica como un cliente válido.

    -   **Ventajas:** Acceso a datos masivos y en tiempo real sin tener que gestionarlos nosotros.
    -   **Desventajas:** Dependemos de un tercero, puede haber costos, límites de peticiones (rate limits) y necesitamos conexión a internet.

### B) Conexión a una API Local (Nuestro Propio Servidor)

Esta es la que construimos nosotros.

-   **¿Dónde está el código?:** Abre el archivo `basic-api/app.js`.
-   **La Clave:** Este servidor, cuando lo ejecutamos, vive en nuestra propia computadora, en una dirección especial: `http://localhost:3000`. `localhost` es una forma de decir "esta misma máquina".
-   **Explicación:** `localhost` es un dominio privado. Las peticiones a esta dirección nunca salen a internet; se resuelven dentro de nuestro propio PC. Es increíblemente rápido y perfecto para desarrollar y probar.

    -   **Ventajas:** Control total, máxima velocidad, sin costos ni límites, ideal para desarrollo.
    -   **Desventajas:** Los datos son solo los que nosotros programamos (en este caso, datos falsos o "hardcodeados").

---

## Parte 5: Guía Práctica Paso a Paso

### Paso 1: Explorar la API Externa (Como está ahora)

1.  **No necesitas instalar nada.** Simplemente abre el archivo `index.html` en tu navegador web (Chrome, Firefox, etc.).
2.  **Observa:** Verás que carga noticias reales sobre la India. Si usas el buscador o haces clic en las categorías, las noticias cambiarán.
3.  **Conclusión:** Estás viendo el frontend consumir datos en tiempo real desde la API externa `newsapi.org`.

### Paso 2: Levantar y Probar la API Básica Local

Ahora, vamos a encender nuestra propia "cocina" de datos.

1.  Abre una terminal o línea de comandos.
2.  Navega a la carpeta de la API básica: `cd basic-api`
3.  Instala las dependencias (Express y Cors): `npm install`
4.  Inicia el servidor: `node app.js`
5.  Verás un mensaje: `Server is running on http://localhost:3000`.
6.  Abre tu navegador y ve a `http://localhost:3000`.
7.  **Observa:** Verás el texto JSON "crudo" que nuestra API local está sirviendo. ¡Felicidades, tu primera API está funcionando!

### Paso 3: Conectar el Frontend a la API Local

Vamos a decirle al mesero que pida la comida a nuestra cocina local en lugar de al restaurante de la otra ciudad.

1.  Abre el archivo `script.js` en un editor de código.
2.  Busca la función `fetchNews(query)` y modifícala. Comenta (o borra) las líneas de la API externa y añade la URL de tu API local.

    **Código Original:**
    ```javascript
    async function fetchNews(query) {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        const data = await res.json();
        bindData(data.articles);
        console.log(data)
    }
    ```

    **Código Modificado:**
    ```javascript
    async function fetchNews(query) {
        // La API local no usa el parámetro "query", pero lo mantenemos para no cambiar la estructura
        const res = await fetch(`http://localhost:3000/`); // ¡Cambiamos la URL!
        const data = await res.json();
        bindData(data.articles);
        console.log(data)
    }
    ```
3.  Guarda el archivo `script.js`.
4.  **Importante:** Asegúrate de que tu servidor de `basic-api` siga corriendo.
5.  Recarga el archivo `index.html` en tu navegador.
6.  **Observa:** Ahora la página muestra las 4 noticias que están "hardcodeadas" en tu archivo `basic-api/app.js`. ¡Has conectado tu frontend a tu backend local!

### Paso 4: Explorar la API CRUD

La API en `crud-api` es más avanzada. Para probarla, necesitarás herramientas que puedan enviar peticiones `POST`, `PUT` y `DELETE`, ya que un navegador por sí solo principalmente hace `GET`.

-   **Para iniciarla:** Sigue los mismos pasos que con la `basic-api` (`cd crud-api`, `npm install`, `node app.js`).
-   **Para probarla:** Te recomendamos investigar herramientas como **Postman** o la extensión **Thunder Client** para Visual Studio Code. Con ellas, podrás enviar peticiones a `http://localhost:3000/articles` y probar a crear, actualizar y borrar noticias.

---

## Parte 7: Guía Práctica Paso a Paso

### Paso 1: Explorar la API Externa (Como está ahora)

1.  **No necesitas instalar nada.** Simplemente abre el archivo `index.html` en tu navegador web (Chrome, Firefox, etc.).
2.  **Observa:** Verás que carga noticias reales sobre la India. Si usas el buscador o haces clic en las categorías, las noticias cambiarán.
3.  **Conclusión:** Estás viendo el frontend consumir datos en tiempo real desde la API externa `newsapi.org`.

### Paso 2: Levantar y Probar la API Básica Local

Ahora, vamos a encender nuestra propia "cocina" de datos.

1.  Abre una terminal o línea de comandos.
2.  Navega a la carpeta de la API básica: `cd basic-api`
3.  Instala las dependencias (Express y Cors): `npm install`
4.  Inicia el servidor: `node app.js`
5.  Verás un mensaje: `Server is running on http://localhost:3000`.
6.  Abre tu navegador y ve a `http://localhost:3000`.
7.  **Observa:** Verás el texto JSON "crudo" que nuestra API local está sirviendo. ¡Felicidades, tu primera API está funcionando!

### Paso 3: Conectar el Frontend a la API Local

Vamos a decirle al mesero que pida la comida a nuestra cocina local en lugar de al restaurante de la otra ciudad.

1.  Abre el archivo `script.js` en un editor de código.
2.  Busca la función `fetchNews(query)` y modifícala. Comenta (o borra) las líneas de la API externa y añade la URL de tu API local.

    **Código Original:**
    ```javascript
    async function fetchNews(query) {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        const data = await res.json();
        bindData(data.articles);
        console.log(data)
    }
    ```

    **Código Modificado:**
    ```javascript
    async function fetchNews(query) {
        // La API local no usa el parámetro "query", pero lo mantenemos para no cambiar la estructura
        const res = await fetch(`http://localhost:3000/`); // ¡Cambiamos la URL!
        const data = await res.json();
        bindData(data.articles);
        console.log(data)
    }
    ```
3.  Guarda el archivo `script.js`.
4.  **Importante:** Asegúrate de que tu servidor de `basic-api` siga corriendo.
5.  Recarga el archivo `index.html` en tu navegador.
6.  **Observa:** Ahora la página muestra las 4 noticias que están "hardcodeadas" en tu archivo `basic-api/app.js`. ¡Has conectado tu frontend a tu backend local!

### Paso 4: Explorar la API CRUD

La API en `crud-api` es más avanzada. Para probarla, necesitarás herramientas que puedan enviar peticiones `POST`, `PUT` y `DELETE`, ya que un navegador por sí solo principalmente hace `GET`.

-   **Para iniciarla:** Sigue los mismos pasos que con la `basic-api` (`cd crud-api`, `npm install`, `node app.js`).
-   **Para probarla:** Te recomendamos investigar herramientas como **Postman** o la extensión **Thunder Client** para Visual Studio Code. Con ellas, podrás enviar peticiones a `http://localhost:3000/articles` y probar a crear, actualizar y borrar noticias.

---

## Fuentes y Recursos Adicionales

Aquí tienes una lista de recursos de alta calidad para profundizar en los temas que hemos cubierto y para practicar con otras APIs.

### Libros y Guías Fundamentales
*   [Eloquent JavaScript (en español)](https://www.eloquentjavascript.es/): Un libro fantástico y completo para dominar JavaScript, desde los fundamentos hasta temas avanzados.

### APIs Públicas para Practicar
*   [The Simpsons API](https://thesimpsonsapi.com/): Una API simple y divertida para obtener frases e información de Los Simpsons.
*   [The Rick and Morty API](https://rickandmortyapi.com/documentation): Una API muy completa y bien documentada, ideal para practicar cómo manejar paginación y filtros más complejos.
*   [PokéAPI](https://pokeapi.co/): La API de Pokémon. Es un recurso increíblemente detallado, perfecto para construir un proyecto de frontend más ambicioso.
*   [JSONPlaceholder](https://jsonplaceholder.typicode.com/): Una API falsa para prototipado y pruebas. Proporciona endpoints RESTful de ejemplo (posts, comments, users) que son muy útiles para desarrollo.
*   [Public APIs on GitHub](https://github.com/public-apis/public-apis): Un repositorio masivo que lista cientos de APIs públicas y gratuitas sobre todo tipo de temas.

### Documentación Oficial y Diseño de APIs
*   [Guía de inicio de Express.js](https://expressjs.com/es/starter/installing.html): La documentación oficial es el mejor lugar para aprender todas las capacidades de Express.
*   [Guías de Node.js](https://nodejs.org/es/docs/guides): Guías oficiales sobre temas clave de Node.js.
*   [Visión general de HTTP (MDN)](https://developer.mozilla.org/es/docs/Web/HTTP/Overview): Entender el protocolo HTTP es fundamental para cualquier desarrollador de APIs. La Mozilla Developer Network (MDN) es una referencia de máxima calidad.

---

## Conclusión

Este repositorio te ha mostrado el viaje completo de los datos en una aplicación web moderna: desde un servidor (local o externo), a través de una API, hasta un cliente que los presenta al usuario. Entender esta separación entre "cliente" y "servidor" y cómo se comunican es la base de todo el desarrollo web actual. ¡Sigue experimentando!
