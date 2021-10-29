document.getElementById("btn").addEventListener('click', () => {
    fetch("https://apis.scrimba.com/bored/api/activity")
        .then(response => response.json())
        .then(data => {
            document.getElementById('api-placeholder').textContent = data.activity
        })
})
