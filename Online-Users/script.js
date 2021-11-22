async function myUsers() {
    const res = await fetch('users.json')
    const users = await res.json()
    return users
}

function getHtml(user) {
    return `
    <div class="user-box">
        <span class=${(user.online === 'true' ? 'online' : 'offline')}></span>
        <span class="username">${user.username}</span>
    </div>`
}

function renderUsers(users, compare) {
    users.sort(compare);

    const userList = `${users.map(user => getHtml(user)).join("")}`
    
    return userList
}

myUsers().then(users => {   

    document.querySelector("main").innerHTML = `
        <div class="chat-container">
            <div class="user-container">${renderUsers(users)}</div>
            <div class="btns">
                <button id="sort-name">Sort by Name</button></br>
                <button id="sort-status">Sort by Status</button>
            </div>
        </div>
        <div class="main-content">Main Content</div>
    `

    document.getElementById("sort-status").addEventListener("click", () => {
        document.querySelector(".user-container").innerHTML = renderUsers(users, compareStatus)
    })
    
    document.getElementById("sort-name").addEventListener("click", () => {
        document.querySelector(".user-container").innerHTML = renderUsers(users, compareUsername)
    })
})

// sort functions
function compareStatus(a, b) {
    if (a.online > b.online){
      return -1;
    }
    if (a.online < b.online){
      return 1;
    }
    return 0;
  }

function compareUsername(a, b) {
    if (a.username < b.username){
      return -1;
    }
    if (a.username > b.username){
      return 1;
    }
    return 0;
  }

