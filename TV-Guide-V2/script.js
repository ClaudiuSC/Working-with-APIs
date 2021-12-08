const searchQuery = document.getElementById("search-query")
const searchEvent = document.getElementById("search-movie")
const mainContent = document.querySelector(".main-content")
let searchWord = ""
let searchHtmlContent = ""

// GET requests
async function getGuide(query) {
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
    const data = await response.json()
    return data
}

async function getMainContent(id) {
    const response = await fetch(`https://api.tvmaze.com/shows/${id}?embed=seasons`)
    const showData = await response.json()
    return showData
}

// add eventlistener on search button
searchEvent.addEventListener("click", e => {
    e.preventDefault()
    searchWord = searchQuery.value
    if(searchQuery.value == "") {
        searchQuery.setAttribute("placeholder", "Show name here")
    } else {
        getGuide(searchWord)
            .then(data => {
                searchQuery.setAttribute("placeholder", "")
                searchHtmlContent = data.map(generateSearchHtml).join("")
                mainContent.innerHTML = searchHtmlContent
                mainContent.style.gridAutoRows = "30px"
                addLink(data)
                searchQuery.value = ""
            })
            .catch(error => {
                console.error(error)
            })
    }
})

// addeventlisteners on titles that appear in search
function addLink(data) {
    const getTitles = document.querySelectorAll(".show-title")
    const showId = data.map(item => item.show.id) 
    for(let i = 0; i < getTitles.length; i++) {
        getTitles[i].addEventListener("click", () => getMainContent(showId[i]).then(showData => generateShowHtml(showData)))
    }
}

// generate search content
function generateSearchHtml(element) {
    return `
        <p class="show-title">${element.show.name}</p>
        <p class="show-genres">${element.show.genres.join(" ")}</p>
        <p class="show-country">${element.show.language}</p>
        <p class="show-year">Aired from ${element.show.premiered ? element.show.premiered.slice(0,4) : "no info"} to ${element.show.ended ? element.show.ended.slice(0,4) : "present"}</p>
        <div class="border"></div>
    ` 
}

// generate selected show content
function generateShowHtml(showData) {
    mainContent.innerHTML = `
        <i class="fas fa-long-arrow-alt-left"></i>
        <h1>${showData.name}</h1>
        <small>${showData.genres} / No. of seasons: ${showData._embedded.seasons.length}</small>
        <div class="summary"><img src=${showData.image.medium}>${showData.summary}</div>
        ${showData._embedded.seasons.map(elem => `
            <div class="box">Season: ${elem.number}</div>`).join("")}
    `
    mainContent.style.gridAutoRows = "auto"

    // ----------------------back arrow functionality--------------------------
    document.querySelector(".fa-long-arrow-alt-left").addEventListener("click", () => 
        {
            getGuide(searchWord)
            .then(data => {
                searchQuery.setAttribute("placeholder", "")
                searchHtmlContent = data.map(generateSearchHtml).join("")
                mainContent.innerHTML = searchHtmlContent
                mainContent.style.gridAutoRows = "30px"
                addLink(data)
                searchQuery.value = ""
            })
            .catch(error => {
                console.error(error)
            })
        })
}




