const APIURL = "https://api.github.com/users/"

const form = document.getElementById("form")
const search = document.getElementById("search")
const card = document.querySelector(".card-here")

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const user = search.value

    if(user) {
        getUser(user)
        getUserRepos(user)

        search.value = ""
    }
})

async function getUser(username) {
    try {
        const {data} = await axios(APIURL + username)
        renderCard(data)
    } catch(err) {
        if(err.response.status == 404) {
            renderUserError("No profile with that username was found")
        }
    }
}

async function getUserRepos(username) {
    try {
        const {data} = await axios(APIURL + username + "/repos?sort=created")
        renderRepos(data)
    } catch(err) {
        renderReposError()
    }
}

function renderCard(data) {
    card.innerHTML = `<div class="card">
                        <div class="card-image">
                            <img src="${data.avatar_url}" alt="profile pic">
                        </div>
                        <div class="card-content">
                            <h2 class="card-title">${data.name}</h2>
                            <p class="card-main">${data.bio}</p>
                            <div class="stats">
                                <span class="stat"><span id="followers">${data.followers}</span> <strong>Followers</strong></span>
                                <span class="stat"><span id="following">${data.following}</span> <strong>Following</strong></span>
                                <span class="stat"><span id="repos">${data.public_repos}</span> <strong>Repos</strong></span>
                            </div>
                            <div class="repos"></div>
                        </div>
                    </div>
                    `
}

function renderUserError(message) {
    card.innerHTML = `
        <div class="card">
            <h1>${message}</h1>
        </div>
    `
}

function renderRepos(repos) {
    const repoArr = repos.slice(0,10)
    const repoHtml = repoArr.map(repo => renderSingleRepo(repo)).join("")

    document.querySelector(".repos").innerHTML = repoHtml
}

function renderReposError() {
    document.querySelector(".repos").innerHTML = `<div style="font-weight:bold; color:yellow; font-style:italic">Problem fetching repos</div>`
}

function renderSingleRepo(repo) {
    return `<a href=${repo.html_url} target="_blank" class="repo">${repo.name}</a >`
}