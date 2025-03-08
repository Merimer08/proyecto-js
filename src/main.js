import './style.css'
/* import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'*/

document.querySelector('#app').innerHTML = `

  <main>
    <!-- Título principal -->
    <h1>Buscador de Libros</h1>
    <!-- Formulario de búsqueda -->
    <form class="search-form" id="searchForm">
      <input type="text" id="searchInput" class="search-input" placeholder="Ingresa el título del libro">
      <button type="submit" class="search-button">Buscar</button>
    </form>
    <!-- Contenedor para mensajes de error -->
    <div id="errorMessage" class="error-message"></div>
    <!-- Contenedor para mostrar los resultados de la búsqueda -->
    <div id="resultsContainer" class="results-container"></div>

    <!-- Script principal de la aplicación -->
    <script type="module" src="/src/main.js"></script>
  </main>
`;



/* `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
` */

setupCounter(document.querySelector('#counter'))
