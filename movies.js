const movieHub = document.querySelector("#movieHub");
const movieForm = document.querySelector("#movieForm");
const movieInput = document.querySelector("#movieInput");

// Default Trending Movies
loadTrendingMovies();

// Search Form
movieForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const query = movieInput.value.trim();

    if (!query) return;

    searchMovie(query);
});

// Load Trending Movies
async function loadTrendingMovies() {

    movieHub.innerHTML = `
        <div class="col-span-full flex justify-center py-10">
            <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    `;

    try {

        const response = await fetch(
            "https://www.omdbapi.com/?apikey=e2e6a54f&s=avengers"
        );

        const data = await response.json();

        if (data.Response === "True") {
            displayMovies(data.Search);
        }

    } catch (error) {

        movieHub.innerHTML = `
            <div class="col-span-full text-center text-red-400">
                Failed to load movies
            </div>
        `;

        console.error(error);
    }
}

// Search Movies
async function searchMovie(movieName) {

    movieHub.innerHTML = `
        <div class="col-span-full flex justify-center py-10">
            <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    `;

    try {

        const response = await fetch(
            `https://www.omdbapi.com/?apikey=e2e6a54f&s=${movieName}`
        );

        const data = await response.json();

        if (data.Response === "True") {

            displayMovies(data.Search);

        } else {

            movieHub.innerHTML = `
                <div class="col-span-full text-center py-10">
                    <h2 class="text-2xl text-red-400 font-bold">
                        ${data.Error}
                    </h2>
                </div>
            `;
        }

    } catch (error) {

        movieHub.innerHTML = `
            <div class="col-span-full text-center py-10">
                <h2 class="text-2xl text-red-400 font-bold">
                    Something went wrong
                </h2>
            </div>
        `;

        console.error(error);
    }
}

// Display Movies
function displayMovies(movies) {

    movieHub.innerHTML = "";

    movies.forEach((movie) => {

        const card = document.createElement("div");

        // Save IMDb ID
        card.dataset.imdbID = movie.imdbID;

        card.className = `
            movie-card
            bg-slate-900
            rounded-2xl
            overflow-hidden
            border
            border-slate-800
            hover:border-blue-500
            hover:-translate-y-2
            hover:shadow-xl
            hover:shadow-blue-500/20
            transition-all
            duration-300
            cursor-pointer
        `;

        card.innerHTML = `
            <div class="overflow-hidden">

                <img
                    src="${
                        movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://placehold.co/400x600?text=No+Image"
                    }"
                    alt="${movie.Title}"
                    class="w-full h-[420px] object-cover hover:scale-105 transition duration-500"
                >

            </div>

            <div class="p-4">

                <h3 class="text-xl font-bold mb-2 line-clamp-1">
                    ${movie.Title}
                </h3>

                <p class="text-slate-400 mb-4">
                    ${movie.Year}
                </p>

                <button
                    class="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-medium transition">
                    View Details
                </button>

            </div>
        `;

        movieHub.appendChild(card);
    });
}

// Movie Card Click
movieHub.addEventListener("click", (e) => {

    const movieCard = e.target.closest(".movie-card");

    if (!movieCard) return;

    const imdbID = movieCard.dataset.imdbID;

    // Open Details Page
    location.href = `movie-details.html?id=${imdbID}`;
});