// Get references to elements
const colorBox = document.getElementById("colorBox");
const colorOptions = document.querySelectorAll(".color-btn");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");

let targetColor;
let  score = 0;

// Function to generate a random RGB color
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Function to start a new round
function startNewGame() {
    gameStatus.textContent = ""; // Clear status message
    targetColor = getRandomColor(); // Pick a new target color
    colorBox.style.backgroundColor = targetColor; // Set color box

    // Generate six color options
    let correctIndex = Math.floor(Math.random() * colorOptions.length);
    
    colorOptions.forEach((btn, index) => {
        let randomColor = getRandomColor();
        
        // Set one correct answer
        if (index === correctIndex) {
            randomColor = targetColor;
        }

        btn.style.backgroundColor = randomColor;
        btn.dataset.correct = index === correctIndex;
        btn.disabled = false;
    });
}

// Function to handle color selection
function handleColorClick(event) {
    const isCorrect = event.target.dataset.correct === "true";

    if (isCorrect) {
        gameStatus.textContent = "Correct! ✅";
        gameStatus.style.color = "green";
        score++;
        scoreDisplay.textContent = score;
        setTimeout(startNewGame, 1000);
    } else {
        gameStatus.textContent = "Wrong! ❌ Try again.";
        gameStatus.style.color = "red";
    }
}

// Add event listeners to color buttons
colorOptions.forEach(btn => btn.addEventListener("click", handleColorClick));

// Add event listener to New Game button
newGameButton.addEventListener('click', startNewGame);

// Start the first game round
startNewGame();
