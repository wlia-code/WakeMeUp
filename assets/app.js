// Variables
const durationTime = 1000;
const gameBlocks = document.querySelector(".game-boards");
const blocks = Array.from(gameBlocks.children);
const orderRange = Array.from(Array(blocks.length).keys());
shuffle(orderRange);

// Set order for the blocks and add click event listeners
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    block.addEventListener("click", function () {
        flipCard(block);
    });
});

//flip a card when clicked
function flipCard(selectedBlock) {
    selectedBlock.classList.add('is-flipped');
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"));
    if (allFlippedBlocks.length === 2) {
        stopClicking();
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

//disable clicking on all blocks for a short duration
function stopClicking() {
    gameBlocks.classList.add('no-clicking');
    setTimeout(() => {
        gameBlocks.classList.remove('no-clicking');
    }, durationTime);
}

//check if the two flipped blocks match
function checkMatchedBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector('.player-tries span');
    if (firstBlock.dataset.animals === secondBlock.dataset.animals) {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
        checkAllMatched();
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, durationTime);
    }
}

//shuffle an array
function shuffle(array) {
    let current = array.length,
        temp,
        random;
    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
    return array;
}

//flip or unflip all cards based on the provided action
function flipAllCards(action) {
    blocks.forEach(block => {
        if (action === "flip") {
            block.classList.add('is-flipped');
        } else if (action === "unflip") {
            block.classList.remove('is-flipped');
        }
    });
}

// Get references to the necessary elements in the finish dialog
const finishDialog = document.getElementById("finish-dialog");
const finishMessage = document.getElementById("finish-message");
const playAgainButton = document.getElementById("play-again-button");
const finishButton = document.getElementById("finish-button");

//handle the Play Again button
function handlePlayAgainButtonClick() {
    resetGame();
    finishDialog.close();
}

//handle the "Finish" button 
function handleFinishButtonClick() {
    location.reload();
}

//check if all blocks have been matched
function checkAllMatched() {
    let allMatched = blocks.every(block => block.classList.contains('has-match'));
    if (allMatched) {
        finishMessage.textContent = "Thank you for playing!";
        finishDialog.showModal();
    }
}

//reset the game
function resetGame() {
    blocks.forEach(block => {
        block.classList.remove('is-flipped', 'has-match');
    });
}

playAgainButton.addEventListener("click", handlePlayAgainButtonClick);
finishButton.addEventListener("click", handleFinishButtonClick);

// start the game by flipping all cards initially and then unflipping them
function startGame(playerName) {
    document.querySelector(".player-name span").textContent = playerName;
    document.querySelector(".player-tries span").textContent = "0";

    document.querySelector(".start-game-overlay").remove();
    flipAllCards("flip");

    setTimeout(() => {
        flipAllCards("unflip"); // Unflip all cards after 2.5 seconds
    }, 2500);
}

// Event listener for the Start Game button and "Play as Guest" and blank input message
document.getElementById("start-button").addEventListener("click", function () {
    let yourName = document.getElementById("name-input").value.trim();
    const errorMessageElement = document.querySelector(".error-message");

    if (yourName === "") {
        errorMessageElement.style.display = "block"; // Display error message if the player name is empty
        return;
    }

    errorMessageElement.style.display = "none";
    startGame(yourName);
});

document.getElementById("guest-button").addEventListener("click", function () {
    startGame("Guest");
});