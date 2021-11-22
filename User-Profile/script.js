async function getUser() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1")
    const user = res.json()
    return user
}

getUser().then(user => {
    console.log(user)
    document.body.innerHTML = `
        <div class="user-card">
            <div class="user-card-header">
                <div>
                    <h2>${user.name}</h2>
                    <small><a href="#">${user.email}</a></small>
                </div>
                <span>@${user.username}</span>
            </div>
            <div class="user-card-workplace">
                <p>${user.company.name}</p>
                <p>${user.company.catchPhrase}</p>
                <p>${user.company.bs}</p>
            </div>
            <div class="user-card-footer">
                <div><a href="#">${user.website}</a></div>
                <div><a href="#">${user.phone.substr(0, user.phone.length-7)}</a></div>
            </div>
        </div>
    `
})