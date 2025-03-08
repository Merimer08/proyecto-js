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
 


// Función para mostrar un mensaje de error en el contenedor de error
function showError(message) {
  errorMessage.innerHTML = message; // Actualiza el mensaje de error
  resultsContainer.innerHTML = ''; // Limpia los resultados anteriores

}

// Función para mostrar los resultados de la búsqueda en tarjetas
function showResults(books) {
  resultsContainer.innerHTML = ''; // Limpia los resultados anteriores

  // Si no se encontraron libros, mostramos un mensaje de error
  if (books.length === 0) {
    showError('No se encontraron libros.');
    return;
  }

  // Itera sobre los libros y crea una tarjeta para cada uno
  books.forEach(book => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${book.image}" alt="${book.title}">
      <h2>${book.title}</h2>
      <p>${book.author}</p>
      <p>${book.year}</p>
    `;
    resultsContainer.appendChild(card);
  });
}   

//Variable para el titulo del libro, autorm año y portada del libro
const bookTitle = book.title || 'Título no disponible';
    const bookAuthor = book.author_name ? book.author_name.join(', ') : 'Autor desconocido';
    const bookFirstPublishYear = book.first_publish_year || 'Año no disponible';
    const bookCoverUrl = book.cover_i 
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`  // URL de la portada si está disponible
      : 'https://via.placeholder.com/128x192.png?text=Sin+Portada'; // Imagen de marcador de posición

// Función para buscar libros en la API de Open Library
async function searchBooks(title) {
  try {
    const response = await fetch(`https://openlibrary.org/search.json?q=${title}`);
    const data = await response.json();
    return data.docs;
  } catch (error) {
    console.error('Error al buscar libros:', error);
    return [];
  }
}