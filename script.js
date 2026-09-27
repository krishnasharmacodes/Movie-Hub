const movieHub = document.querySelector("#movieHub");
const movieForm = document.querySelector("#movieForm");
const movieInput = document.querySelector("#movieInput");

// Search Form
movieForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const query = movieInput.value.trim();

    if (!query) {
        return;
    }

    searchMovie(query);
});

// Fetch Movies
async function searchMovie(movieName) {

    // Loader
    movieHub.innerHTML = `
        <div class="col-span-full flex justify-center items-center py-20">
            <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
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
                <div class="col-span-full text-center py-20">
                    <h2 class="text-2xl font-bold text-red-400 mb-2">
                        Movie Not Found
                    </h2>

                    <p class="text-slate-400">
                        ${data.Error}
                    </p>
                </div>
            `;
        }

    } catch (error) {

        movieHub.innerHTML = `
            <div class="col-span-full text-center py-20">
                <h2 class="text-2xl font-bold text-red-400 mb-2">
                    Something Went Wrong
                </h2>

                <p class="text-slate-400">
                    Please try again later.
                </p>
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

        card.dataset.imdbID = movie.imdbID;

        card.className = `
            movie-card
            bg-slate-900/80
            border
            border-slate-800
            rounded-2xl
            overflow-hidden
            cursor-pointer
            hover:border-blue-500
            hover:-translate-y-2
            hover:shadow-xl
            hover:shadow-blue-500/20
            transition-all
            duration-300
        `;

        card.innerHTML = `
            <div class="overflow-hidden">
                <img
                    src="${
                        movie.Poster !== "N/A"
                            ? movie.Poster
                            : "https://placehold.co/400x600/0f172a/ffffff?text=No+Poster"
                    }"
                    alt="${movie.Title}"
                    class="w-full h-[420px] object-cover hover:scale-105 transition duration-500"
                >
            </div>

            <div class="p-5">

                <h2 class="text-xl font-bold text-white mb-3 line-clamp-1">
                    ${movie.Title}
                </h2>

                <div class="flex items-center justify-between mb-4">

                    <span class="text-slate-400">
                        ${movie.Year}
                    </span>

                    <span class="bg-blue-600 px-3 py-1 rounded-full text-sm">
                        Movie
                    </span>

                </div>

                <button
                    class="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition">
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

    location.href = `movie-details.html?id=${imdbID}`;
});