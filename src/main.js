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
    <!-- Spinner de carga -->
    <div id="spinner" class="spinner" style="display: none;">Cargando...</div>
  </main>
`;

// Referencias a los elementos del DOM
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const errorMessage = document.getElementById('errorMessage');
const resultsContainer = document.getElementById('resultsContainer');
const spinner = document.getElementById('spinner');

// Función para mostrar un mensaje de error en el contenedor de error
function showError(message) {
  errorMessage.innerHTML = message; // Actualiza el mensaje de error
  resultsContainer.innerHTML = ''; // Limpia los resultados anteriores
  spinner.style.display = 'none'; // Oculta el spinner si hubo un error
}

// Función para mostrar los resultados de la búsqueda en tarjetas
function showResults(books) {
  resultsContainer.innerHTML = ''; // Limpia los resultados anteriores
  spinner.style.display = 'none'; // Oculta el spinner cuando los resultados están listos
  
  // Si no se encontraron libros, mostramos un mensaje de error
  if (books.length === 0) {
    showError('No se encontraron libros.');
    return;
  }
  books.forEach(book => {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book-card');  // Estilo para la tarjeta del libro
    
    // Variables para el título, autor, año y portada del libro
    const bookTitle = book.title || 'Título no disponible';
    const bookAuthor = book.author_name ? book.author_name.join(', ') : 'Autor desconocido';
    const bookFirstPublishYear = book.first_publish_year || 'Año no disponible';
    const bookCoverUrl = book.cover_i 
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`  // URL de la portada si está disponible
      : 'https://via.placeholder.com/128x192.png?text=Sin+Portada'; // Imagen de marcador de posición

    // Rellenamos el contenido de la tarjeta con los datos del libro
    bookElement.innerHTML = `
      <img src="${bookCoverUrl}" alt="${bookTitle}" class="book-cover">
      <h3 class="book-title">${bookTitle}</h3>
      <p class="book-author">${bookAuthor}</p>
      <p class="book-year">Publicado en: ${bookFirstPublishYear}</p>
    `;
    
    // Añadimos la tarjeta del libro al contenedor de resultados
    resultsContainer.appendChild(bookElement);
  });
}

// Función para realizar la búsqueda de libros en la API
async function searchBooks(query) {
  // Mostrar el spinner mientras se realiza la búsqueda
  spinner.style.display = 'block';

  // Si no se ha introducido un título, mostramos un mensaje de error
  if (!query) {
    showError('Por favor, ingresa un título de libro para buscar.');
    return;
  }

  try {
    // Hacemos la solicitud a la API de OpenLibrary
    const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`);
    
    // Convertimos la respuesta a formato JSON
    const data = await response.json();

    // Si se encuentran libros, los mostramos; de lo contrario, mostramos un mensaje de error
    if (data.docs.length > 0) {
      showResults(data.docs);
    } else {
      showError('No se encontraron libros para esa búsqueda.');
    }
  } catch (error) {
    // Si ocurre un error durante la solicitud, mostramos un mensaje de error
    showError('Hubo un problema al buscar los libros. Intenta nuevamente más tarde.');
  }
}

// Manejador de eventos para el envío del formulario de búsqueda
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Evitamos el comportamiento predeterminado del formulario
  const title = searchInput.value.trim(); // Obtenemos el título ingresado por el usuario
  const books = await searchBooks(title); // Buscamos libros en la API de Open Library
  showResults(books); // Mostramos los resultados de la búsqueda
});