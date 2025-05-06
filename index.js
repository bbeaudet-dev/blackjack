
let player = {
    name: "Player",
    chips: 10,
    wins: 0,
    losses: 0
}
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let isPassed = false
let permaDeath = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let winLossEl = document.getElementById("winloss-el")
let startButtonEl = document.getElementById("start-button-el")
let newCardButtonEl = document.getElementById("newcard-button-el")
let passButtonEl = document.getElementById("pass-button-el")
updateButtonStates()
updateStats()

function startGame() {
    if (permaDeath === false && isAlive === false) {
        isAlive = true
        isPassed = false
        hasBlackJack = false
        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        cards = [firstCard, secondCard]
        sum = firstCard + secondCard
        console.log("Game Started")
        updateButtonStates()
        renderGame()
    }
}

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        if (isPassed === false) {
            message = "Do you want to draw a new card?"
        } else {
            // could possibly move this to its own function createDealerHand()
            let dealerHand = 0
            let randomHand = Math.floor(Math.random()*50)+1
            // nat21=4.8, 21=7.4, 20=17.6, 19=13.5, 18=13.8, 17=14.6, 16=28.4, 15=0
            if (randomHand <= 5) {dealerHand = 21}
            else if (randomHand <= 13) {dealerHand = 20}
            else if (randomHand <= 19) {dealerHand = 19}
            else if (randomHand <= 25) {dealerHand = 18}
            else if (randomHand <= 33) {dealerHand = 17}
            else if (randomHand <= 47) {dealerHand = 16}
            else if (randomHand <= 49) {dealerHand = 15}
            else if (randomHand <= 50) {dealerHand = 14}
            console.log("Random Number from 1 to 50: ",randomHand,", Dealer hand is ",dealerHand)
            if (sum < dealerHand) {
                message = "Dealer wins with " + dealerHand
                isAlive = false
                console.log("Dealer Wins")
                updateStats(player.chips = Math.floor(player.chips/2), player.losses += 1)
            } else if (sum > dealerHand) {
                message = "Dealer has " + dealerHand + ", you win!"
                hasBlackJack = true // could amend this by adding new beatDealer boolean
                isAlive = false
                console.log("Beat Dealer")
                updateStats(player.chips = Math.ceil(player.chips*2), player.wins += 1)
            } else {
                message = "Dealer has " + dealerHand + ", it's a tie!"
                isAlive = false
                console.log("Tie")
                updateStats()
            }
        }
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        isAlive = false
        console.log("Blackjack")
        updateStats(player.chips = Math.ceil(player.chips*2), player.wins += 1)
    } else {
        for (let i = 0; i < cards.length; i++) { // turns Ace into a 1 if it would cause you to Bust
            if (cards[i] === 11) {
                cards[i] += -10
                sum += -10
                renderGame()
                return
            }        
        }
        message = "You're out of the game!"
        isAlive = false
        console.log("Bust")
        updateStats(player.chips = Math.floor(player.chips/2), player.losses += 1)
    }
    messageEl.textContent = message
    updateButtonStates()
    console.log("Game Rendered")
}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        console.log("New Card")
        updateButtonStates()
        renderGame()        
    }
}

function passCard() {
    if (isAlive === true && hasBlackJack === false) {
        isPassed = true
        console.log("Pass")
        updateButtonStates()
        renderGame()        
    }
}

function updateButtonStates() {
    if (isAlive === true) {
        startButtonEl.style.opacity = 0.5
        newCardButtonEl.style.opacity = 1
        passButtonEl.style.opacity = 1
    } else if (permaDeath === true) {
        startButtonEl.style.opacity = 0.5
        newCardButtonEl.style.opacity = 0.5
        passButtonEl.style.opacity = 0.5
    } else {
        startButtonEl.style.opacity = 1
        newCardButtonEl.style.opacity = 0.5
        passButtonEl.style.opacity = 0.5
    }
}

function updateStats() {
    if (player.chips <= 0) {
        permaDeath = true
        message = "You're broke! Try again next time..."
        messageEl.style.color="red"
        playerEl.style.color="red"
    }
    playerEl.textContent = player.name + ": $" + player.chips
    winLossEl.textContent = "Wins: " + player.wins + "  /  Losses: " + player.losses
}