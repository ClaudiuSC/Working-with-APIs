function renderColors(colors) {
    const body = colors.map(color => `<div class="box" style="background-color:${color.value}"></div>`).join("")
    
    document.querySelector(".container").innerHTML = `<div class="container">${body}</div>`

    const test = document.querySelectorAll(".box")

    for (let i = 0; i < test.length; i++) {
        test[i].addEventListener("click", () => {
            document.body.style.backgroundColor = colors[i].value
        })
    }
}

async function getColors(noOfColors) {
    const res = await fetch(`https://apis.scrimba.com/hexcolors?count=${noOfColors}`)
    const data = await res.json()
    const colors = data.colors
    renderColors(colors)
}

const noOfColors = 16
getColors(noOfColors)


