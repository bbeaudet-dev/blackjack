// Blackjack

let isAlive = true
let hasBlackjack = false
let message = ""

let firstCard = Math.floor(Math.random()*10)+2
let secondCard = Math.floor(Math.random()*10)+2
let sum = firstCard + secondCard

let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")

function startGame() {
    cardsEl.textContent = "Cards: " + firstCard + " " + secondCard
    sumEl.textContent = "Sum: " + sum
    if (sum < 21) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "Wohoo! You've got Blackjack!"
        hasBlackjack = true
    } else if (sum > 21) {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}

function newCard() {
    
}