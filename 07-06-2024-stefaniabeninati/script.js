// script.js
const containerEl = document.querySelector(".card-container");
const searchBar = document.getElementById('searchBar');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageIndicator = document.getElementById('pageIndicator');
const topRated = document.getElementById ('topRated');
const topPopular = document.getElementById ('topPopular');

const url = 'https://api.themoviedb.org/3/movie';
const urlPopular = url + "/popular";
const urlRated = url + '/top_rated';

let api_current = urlPopular;

let movies = [];
let currentPage = 1;
let totalPages = 1;

const options = { //Esercizio 1: Effettuiamo la chiamata all'API di MovieDB e stampiamo a DOM le card dei movies ottenuti all'endpoin
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTBhY2YwYmVjMDE3ODMxMmJhN2FiY2E4NmZmZTI0NiIsInN1YiI6IjY2NjJmZjI4ZjE1MDFjZWZkYTgzNDM5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VJQwodW4q8zE1XWp6RIFBHl3rUBzX_3Sbyp4KH2Bz8o'
    }
};


const fetchMovies = (page = 1) => {
    fetch(api_current + "?page=" + page, options)
        .then(response => response.json())
        .then(data => {
            movies = data.results;
            currentPage = data.page;
            totalPages = data.total_pages;
            displayMovies(movies);
            updatePagination();
        })
        .catch(err => console.error(err));
}; //Esercizio 2: Inseriamo un catch a fine catena then per gestire eventuali errori (provate a crearne uno per assicurarvi il corretto funzionamento del catch - poi potete anche lasciare il codice funzionante)

const updatePagination = () => {
    pageIndicator.textContent = `Pagina ${currentPage}`;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
};

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredMovies = movies.filter(movie => {
        return movie.title.toLowerCase().includes(searchString);
    });
    displayMovies(filteredMovies);
}); // Esercizio 3 (Opzionale):Proviamo a filtrare i risultati con una searchBar.

prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        fetchMovies(currentPage - 1);
    }
});

nextPageBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        fetchMovies(currentPage + 1);
    }
});

const displayMovies = (movies) => {
    containerEl.innerHTML = '';
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('card');
        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster">
            <h3>${movie.title}</h3>
            <p>${movie.overview}</p>
        `;
        containerEl.appendChild(movieCard);
    });
};

/*Esercizio 5 (Opzionale pazzo): e se facessimo dei bottoni che al click cambiano l'endpoint tipo di default stampate /popular  come da Es1 e al click di un button per esempio "TOP_RATED" /top_rated https://developer.themoviedb.org/reference/movie-top-rated-list*/

topRated.addEventListener('click', () => {
        api_current = urlRated;
        fetchMovies();
    });

    topPopular.addEventListener('click', () => {
        api_current = urlPopular;
        fetchMovies();
    });

// Fetch initial set of movies
fetchMovies();
