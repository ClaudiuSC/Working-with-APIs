const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1"
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query='

const main = document.getElementById("main")
const search = document.getElementById("search")
const form = document.getElementById("form")

getMovies(API_URL)

async function getMovies(url) {
    const data = await fetch(url)
    const movies = await data.json()

    showMovies(movies.results)
}

function showMovies(movies) {
    main.innerHTML = ""

    movies.forEach(movie => {
        const {title, vote_average, poster_path, overview} = movie
        const movieDiv = document.createElement("div")
        movieDiv.classList.add("movie")
        movieDiv.innerHTML = `
            <div class="round" style="z-index:-1"></div>
            ${renderPhoto(IMG_PATH, poster_path, title)}
            <div class="movie-header">
                <h2 class="title">${title}</h2>
                <span class="rating ${ratingColor(vote_average)}">${vote_average}</span>
            </div>
            <p class="overview">${overview}</p>
        ` 
        main.appendChild(movieDiv)
    });
}

function ratingColor(rating) {
    if(rating >= 8) {
        return "green"
    } else if(rating >= 5) {
        return "orange"
    } else {
        return "red"
    }
}

function renderPhoto(IMG_PATH, poster_path, title) {
    if(poster_path == null) {
        return `<p style="text-align:center">No photo available</p>`
    } else {
        return `<img class="poster" src="${IMG_PATH + poster_path}" alt="${title}" style="z-index:1">`
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault()

    if(search.value !== "") {
        getMovies(SEARCH_API + search.value)
        search.value = ""
    } else {
        window.location.reload()
    }
})

