import { GET } from "./get.js";

const containerEl = document.querySelector(".card-container");
const searchBar = document.getElementById('searchBar');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageIndicator = document.getElementById('pageIndicator');
const topRated = document.getElementById ('topRated');
const topPopular = document.getElementById ('topPopular');

const urlPopular = '/movie/popular'; 
const urlRated = '/tv/popular'; // ESERCIZIO 2

let api_current = urlPopular;

let movies = [];
let currentPage = 1;
let totalPages = 1;

//ESERCIZIO 1 
const fetchMovies = async (page = 1) => {
    try {
        const data = await GET(api_current, page);
        movies = data.results;
        currentPage = data.page;
        totalPages = data.total_pages;
        displayMovies(movies);
        updatePagination();
    } catch (err) {
        console.error(err);
    }
};

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


const updatePagination = () => {
    pageIndicator.textContent = `Pagina ${currentPage}`;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
};

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


topRated.addEventListener('click', () => {
    api_current = urlRated;
    fetchMovies();
});

topPopular.addEventListener('click', () => {
    api_current = urlPopular;
    fetchMovies();
});

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredMovies = movies.filter(movie => {
        return movie.title.toLowerCase().includes(searchString);
    });
    displayMovies(filteredMovies);
}); 

fetchMovies();
