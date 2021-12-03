const searchQuery = document.getElementById("search-query")
const searchEvent = document.getElementById("search-movie")
const mainContent = document.querySelector(".main-content")

async function getGuide(query) {
    const response = await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${query}&embed=seasons`)
    const data = await response.json()
    return data
}

searchEvent.addEventListener("click", e => {
    e.preventDefault()
    getGuide(searchQuery.value)
        .then(data => {
            mainContent.innerHTML = `
                    <h1>${data.name}</h1>
                    <small>${data.genres} / No. of seasons: ${data._embedded.seasons.length}</small>
                    <div class="image"><img src=${data.image.medium}></div>
                    <div class="summary">${data.summary}</div>
                    ${data._embedded.seasons.map(elem => `
                        <div class="box">Season: ${elem.number}</div>`).join("")}
                `
        })
        .catch(error => {
            searchQuery.required = true
            console.error(error)
        })
    searchQuery.value = ""
})


