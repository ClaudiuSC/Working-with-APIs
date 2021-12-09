const apiContainer = document.querySelector(".container")

async function getApiList() {
    const response = await fetch("https://api.publicapis.org/entries")
    const data = await response.json()
    return data
}

getApiList().then(data => {
    apiContainer.innerHTML = data.entries.map(entry => generateHtml(entry)).join(" ")
})

function generateHtml(data) {
    return `
        <div class="api-card">
            <h2 class="api-name"><a href=${data.Link} target=#>${data.API}</a></h2>
            <div class="api-category">-${data.Category}-</div>
            <div class="api-description">${data.Description}</div>
            <div class="border"></div>
            <div class="api-auth">Authorization method: ${data.Auth ? data.Auth : "none"}</div>
            <div class="api-https">HTTP support: ${data.HTTPS}</div>
        </div>
    `
}
