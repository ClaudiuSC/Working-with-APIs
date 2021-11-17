// Unsplash image used for background image => still waiting my account to get activated and i am using the scrimba api
// fetch("https://api.unsplash.com/photos/?YyNmKuRo25f8VWci84VPBdpb5WV1_jkRO2x_k84Yg9M?random?orientation=landscape&query=nature") ???check if url is correct
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => {
        if(!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    }
        )
    .then(data => {
        document.getElementById("main").style.backgroundImage = `url(${data.urls.regular})`
        document.getElementById("author").innerHTML = `<small>Picture by:</small> ${data.user.name}`
    })
    .catch(err => {
        console.log(err)
        document.getElementById("main").style.backgroundImage = `url(https://images.unsplash.com/photo-1488711500009-f9111944b1ab?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzcwNjM4NTI&ixlib=rb-1.2.1&q=85)`
    })

// Coingecko API
fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        document.getElementById("crypto").innerHTML = `
            <div class="flex-local">
                <img src=${data.image.small} />
                <span class="crypto-title">${data.name}</span>
            </div>
            <p><span class="crypto-icons">&#8594</span> : $${data.market_data.current_price.usd} <small>current value</small></p>
            <p><span class="crypto-icons">&#8593</span> : $${data.market_data.high_24h.usd} <small>24h high</small></p>
            <p><span class="crypto-icons">&#8595</span> : $${data.market_data.low_24h.usd} <small>24h low</small></p>
        `
    })
    .catch(err => {
        document.getElementById("crypto").innerHTML = "Service not available, please try again later"
        console.error(err)

    })

// weather app using geolocation
navigator.geolocation.getCurrentPosition(position => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=9bea25b1d242598a3943919c7066dc10&units=metric`)
        .then(res => {
            if(!res.ok) {
                throw Error("Something went wrong")
            }
            return res.json()
        })
        .then(data => {
            const weatherIconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src=${weatherIconUrl}>
                <span class="weather-temp">${Math.round(data.main.temp*10)/10}&#xb0</span>
                <span class="weather-location">${data.name}</span>
            `
        })
        .catch(err => {
            document.getElementById("weather").innerHTML = "Service not available, please try again later"
            console.log(err)
        })
})

// local time
function myTime() {
    const date = new Date()
    document.getElementById("time").innerHTML = `${date.toLocaleTimeString([], {timeStyle: 'medium', hour12: false})}<p class="small-date">${date.toLocaleDateString('de-DE')}</p>`;

}

setInterval(myTime, 1000);
