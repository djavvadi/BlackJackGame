//
// BlackJack Game
//

//Card vaiables
let suits = ["Hearts", "Spades", "Clubs", "Diamonds"],
    values = ["Ace", "King", "Queen", "Jack", "Nine", "Eight", "Seven", "Six", "Five", "Four", "Three", "Two"]

// DOM Varibales
let textArea = document.getElementById("text-area"),
    newGamebutton = document.getElementById("new-game-button"),
    hitButton = document.getElementById("hit-button"),
    stayButton = document.getElementById("stay-button");

//Game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealserCards = [],
    playerCards = [],
    dealserScore = 0,
    playerScore = 0,
    deck = [];

hitButton.style.display = "none";
stayButton.style.display = "none";
showStatus();

newGamebutton.addEventListener("click", function () {
    gameStarted = true;
    gameOver = false;
    playerWon = false;

    deck = createDeck();
    shuffleDeck(deck);
    dealserCards = [getNextcard(), getNextcard()];
    playerCards = [getNextcard(), getNextcard()];

    textArea.innerText = "The Game Started.";
    newGamebutton.style.display = "none";
    hitButton.style.display = "inline";
    stayButton.style.display = "inline";
    showStatus();
});

hitButton.addEventListener("click", function () {
    playerCards.push(getNextcard());
    checkforEndofGame();
    showStatus();
});

stayButton.addEventListener("click", function () {
    gameOver = true;
    checkforEndofGame();
    showStatus();
});


function createDeck() {
    let deck = [];
    for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
        for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
            let card =
                {
                    suit: suits[suitIdx],
                    value: values[valueIdx]
                };
            deck.push(card)
        }
    }
    return deck;
}

function getNextcard() {
    return deck.shift();
}

function getCardstring(card) {
    return card.value + " of " + card.suit;
}

function shuffleDeck(deck) {
    for (let i = 0; i < deck.length; i++) {
        let swapIdx = Math.trunc(Math.random() * deck.length);
        let tmp = deck[swapIdx];
        deck[swapIdx] = deck[i];
        deck[i] = tmp;
    }
}

function getCardNumericValue(card) {
    switch (card.value) {
        case "Ace": return 1;
        case "Two": return 2;
        case "Three": return 3;
        case "Four": return 4;
        case "Five": return 5;
        case "Six": return 6;
        case "Seven": return 7;
        case "Eight": return 8;
        case "Nine": return 9;
        default: return 10;

    }
}

function getScore(cardArray) {
    let score = 0;
    let hasAce = false;
    for (let i = 0; i < cardArray.length; i++) {
        let card = cardArray[i]
        score += getCardNumericValue(card);
        if (card.value === "Ace") {
            hasAce = true
        }
    }
    if (hasAce && score + 10 <= 21) {
        return score + 10;
    }

    return score;
}

function updateScores() {
    dealserScore = getScore(dealserCards);
    playerScore = getScore(playerCards)
}

function checkforEndofGame() {
    updateScores();

    if (gameOver) {
        while (dealserScore < playerScore && playerScore <= 21 && dealserScore <= 21) {
            dealserCards.push(getNextcard());
            updateScores();
        }
    }

    if (playerScore > 21) {
        playerWon = false;
        gameOver = true;
    }
    else if (dealserScore > 21) {
        playerWon = true;
        gameOver = true;
    }

    else if (gameOver) {
        if (playerScore > dealserScore) {
            playerWon = true;
        }
        else {
            playerWon = false;
        }
    }


}



function showStatus() {
    if (!gameStarted) {
        textArea.innerText = "Lets Play";
        return;
    }

    let dealserCardString = "";
    for (let i = 0; i < dealserCards.length; i++) {
        dealserCardString += getCardstring(dealserCards[i]) + "\n";
        console.log(dealserCards[i].value);
    }

    let playerCardString = "";
    for (let i = 0; i < playerCards.length; i++) {
        playerCardString += getCardstring(playerCards[i]) + "\n";
    }

    updateScores();

    textArea.innerText = "Dealer has: \n " + dealserCardString + "(score " + dealserScore + ") \n Player has: \n" + playerCardString + "(score " + playerScore + ") \n";

    if (gameOver) {
        if (playerWon) {
            textArea.innerText += "\n YOU WIN !!"
        }
        else {
            textArea.innerText += "\n DEALER WIN !!"
        }

        newGamebutton.style.display = "inline";
        hitButton.style.display = "none";
        stayButton.style.display = "none";
    }



}


