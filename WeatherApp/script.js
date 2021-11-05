const cityEl = document.getElementById('city')
const tempEl = document.getElementById('temp')

document.getElementById('submit').addEventListener('click', (event) => {
    event.preventDefault()
    const inputEl = document.getElementById('city-input')
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${inputEl.value}&appid=245133f7c8744c05e8ece35bfd263e6b&lang=RO&units=metric`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.cod == 404) {
                cityEl.textContent = data.message
                tempEl.textContent = ""
            } else {
                cityEl.textContent = data.name
                tempEl.textContent = data.main.temp
            }
            })
})
