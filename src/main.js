import './style.css'


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

 
  </main>
`;

//referencias a los elementos del DOM
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const errorMessage = document.getElementById('errorMessage');
const resultsContainer = document.getElementById('resultsContainer');
const spinner = document.getElementById('spinner');  

