let deckId
let playerComp
let playerPlayer
const drawBtn = document.getElementById("draw-btn")
const remainingCards = document.getElementById("remaining-cards")
let scoreComp = 0
let scorePlayer = 0

// ====================================Event listeners=========================================================
// ============================================================================================================
// get deck of cards
document.getElementById("shuffle-btn").addEventListener("click", () => {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
            drawBtn.disabled = false
            remainingCards.innerText = data.remaining
            resetGame()
        })
})

// draw two cards
drawBtn.addEventListener("click", () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            remainingCards.innerText = data.remaining
            document.getElementById("computer-card").innerHTML = `<img src="${data.cards[0].image}">`
            document.getElementById("player-card").innerHTML = `<img src="${data.cards[1].image}">`
            evalCards(data.cards[0].value, data.cards[1].value)
            checkGameEnd(data.remaining)
        })
})

document.getElementById("play-again").addEventListener("click", () => {
    drawBtn.disabled = true
    resetGame()
})


// ============================================================================================================
// evaluate the card values + add score + render score
function evalCards(cardOne, cardTwo) {
    playerComp = changeCardValue(cardOne)
    playerPlayer = changeCardValue(cardTwo)
    if(playerComp !== playerPlayer){
        playerComp > playerPlayer ? scoreComp++ : scorePlayer++
    }
    document.getElementById("computer-score").innerText = scoreComp
    document.getElementById("player-score").innerText = scorePlayer
}

// change the value of the cards with pictures on them
function changeCardValue(card) {
    const evalCards = ({
        "JACK": 12,
        "QUEEN" : 13,
        "KING": 14,
        "ACE": 15,
    })[card] ?? card
    return parseInt(evalCards)
}

// check for the end of the game
function checkGameEnd(remaining) {
    if(remaining === 0) {
        document.querySelector(".overlay").style.display = "block"
        document.getElementById("end-message").innerText = scoreComp > scorePlayer ? "Computer won :/" : "Player WON!"
    }
}

// reset game
function resetGame() {
    scoreComp = 0
    scorePlayer = 0
    document.getElementById("computer-score").innerText = 0
    document.getElementById("player-score").innerText = 0
    document.getElementById("computer-card").innerHTML = ""
    document.getElementById("player-card").innerHTML = ""
    document.querySelector(".overlay").style.display = "none"
    document.getElementById("title").classList.add("expand-text")
    setTimeout(() => {
        document.getElementById("title").classList.remove("expand-text")
    }, 1000); 
}

