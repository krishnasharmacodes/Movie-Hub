const movieDetail = document.querySelector("#movie-detail");
const params = new URLSearchParams(location.search);
const imdbID = params.get("id");

if (imdbID) {
    searchMovie(imdbID.trim());
}

async function searchMovie(imdbID) {

    movieDetail.innerHTML = `
        <div class="flex justify-center items-center py-20">
            <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    `;

    try {

        const response = await fetch(
            `https://www.omdbapi.com/?apikey=e2e6a54f&i=${imdbID}&plot=full`
        );

        const data = await response.json();

        if (data.Response === "True") {
            displayMovie(data);
        } else {
            movieDetail.innerHTML = `
                <div class="text-center py-20">
                    <h2 class="text-3xl font-bold text-red-400">
                        ${data.Error}
                    </h2>
                </div>
            `;
        }

    } catch (error) {

        movieDetail.innerHTML = `
            <div class="text-center py-20">
                <h2 class="text-3xl font-bold text-red-400">
                    Something Went Wrong
                </h2>
            </div>
        `;

        console.error(error);
    }
}

function displayMovie(data) {

    movieDetail.innerHTML = `
    
    <div class="max-w-7xl mx-auto p-6">

        <div class="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">

            <div class="grid lg:grid-cols-3 gap-8 p-8">

                <!-- Poster -->
                <div>
                    <img
                        src="${data.Poster}"
                        alt="${data.Title}"
                        class="w-full rounded-2xl shadow-lg"
                    >
                </div>

                <!-- Movie Info -->
                <div class="lg:col-span-2">

                    <h1 class="text-4xl font-bold mb-4">
                        ${data.Title}
                    </h1>

                    <div class="flex flex-wrap gap-3 mb-6">

                        <span class="bg-blue-600 px-4 py-2 rounded-full">
                            ${data.Year}
                        </span>

                        <span class="bg-slate-800 px-4 py-2 rounded-full">
                            ${data.Rated}
                        </span>

                        <span class="bg-slate-800 px-4 py-2 rounded-full">
                            ${data.Runtime}
                        </span>

                        <span class="bg-yellow-500 text-black font-semibold px-4 py-2 rounded-full">
                            IMDb ${data.imdbRating}/10
                        </span>

                    </div>

                    <p class="text-slate-300 mb-6">
                        ${data.Genre}
                    </p>

                    <!-- Plot -->
                    <div class="mb-8">
                        <h2 class="text-2xl font-bold mb-3 text-blue-400">
                            Plot Overview
                        </h2>

                        <p class="text-slate-300 leading-relaxed">
                            ${data.Plot}
                        </p>
                    </div>

                    <!-- Details -->
                    <div class="grid md:grid-cols-2 gap-6">

                        <div class="bg-slate-800 p-4 rounded-xl">
                            <h3 class="font-bold text-blue-400 mb-2">
                                Director
                            </h3>
                            <p>${data.Director}</p>
                        </div>

                        <div class="bg-slate-800 p-4 rounded-xl">
                            <h3 class="font-bold text-blue-400 mb-2">
                                Writer
                            </h3>
                            <p>${data.Writer}</p>
                        </div>

                        <div class="bg-slate-800 p-4 rounded-xl">
                            <h3 class="font-bold text-blue-400 mb-2">
                                Actors
                            </h3>
                            <p>${data.Actors}</p>
                        </div>

                        <div class="bg-slate-800 p-4 rounded-xl">
                            <h3 class="font-bold text-blue-400 mb-2">
                                Released
                            </h3>
                            <p>${data.Released}</p>
                        </div>

                        <div class="bg-slate-800 p-4 rounded-xl">
                            <h3 class="font-bold text-blue-400 mb-2">
                                Language
                            </h3>
                            <p>${data.Language}</p>
                        </div>

                        <div class="bg-slate-800 p-4 rounded-xl">
                            <h3 class="font-bold text-blue-400 mb-2">
                                Country
                            </h3>
                            <p>${data.Country}</p>
                        </div>

                    </div>

                    <!-- Buttons -->
                    <div class="flex flex-wrap gap-4 mt-8">

                        <a
                            href="https://www.imdb.com/title/${data.imdbID}"
                            target="_blank"
                            class="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl transition"
                        >
                            View on IMDb
                        </a>

                        <a
                            href="index.html"
                            class="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl transition"
                        >
                            Back to Search
                        </a>

                    </div>

                </div>

            </div>

        </div>

    </div>
    `;
}