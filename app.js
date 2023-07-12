//click event listener for the start game button
document.querySelector(".start-game-button span").onclick = function () {
    let yourName = prompt("Whats Your Name?");
    if (yourName == null || yourName == "") {
        document.querySelector(".player-name span").innerHTML = 'Unknown';
    } else {
        document.querySelector(".player-name span").innerHTML = yourName;
    }
    document.querySelector(".start-game-button").remove();
};
let durationTime = 1000;
let gameBlocks = document.querySelector(".game-boards")
let blocks = Array.from(gameBlocks.children)
let orderRange = Array.from(Array(blocks.length).keys());
shuffle(orderRange)
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    block.addEventListener("click", function () {
        flipCard(block)
    })
});
// Flip Block Function
function flipCard(selectedBlock) {
    selectedBlock.classList.add('is-flipped');
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"))
    if (allFlippedBlocks.length === 2) {
        stopClicking();
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
};
// Stop Clicking  Function
function stopClicking() {

    // Add Class No Clicking on Main Container
    gameBlocks.classList.add('no-clicking');

    // Wait Duration
    setTimeout(() => {

        // Remove Class No Clicking After The Duration
        gameBlocks.classList.remove('no-clicking');

    }, durationTime);

}
// Reset Boards Function
function checkMatchedBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector('.player-tries span');
    if (firstBlock.dataset.animals === secondBlock.dataset.animals) {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, durationTime);
    }
}


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
