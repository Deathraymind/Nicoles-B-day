let totalCircles = 15;
let circlesClicked = 0;
let startTime, endTime;
let misclicks = 0;

const gameArea = document.getElementById('game-area');
const circle = document.getElementById('circle');
const highScoreDisplay = document.getElementById('high-score');
const misclickCount = document.getElementById('misclick-count');

// Array of image paths (1-14)
const images = [
    'images/image1.png',
    'images/image2.png',
    'images/image3.png',
    'images/image4.png',
    'images/image5.png',
    'images/image6.png',
    'images/image7.png',
    'images/image8.png',
    'images/image9.png',
    'images/image10.png',
    'images/image11.png',
    'images/image12.png',
    'images/image13.png',
    'images/image14.png'
];

function getRandomPosition() {
    const gameAreaRect = gameArea.getBoundingClientRect();
    const x = Math.floor(Math.random() * (gameAreaRect.width - 50));
    const y = Math.floor(Math.random() * (gameAreaRect.height - 50));
    return { x, y };
}

function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}

function showCircle() {
    if (circlesClicked === 0) {
        startTime = Date.now();
    }

    if (circlesClicked < totalCircles) {
        const { x, y } = getRandomPosition();
        const randomImage = getRandomImage();
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;
        circle.style.backgroundImage = `url(${randomImage})`;
        circle.style.display = 'block';
    } else {
        endTime = Date.now();
        circle.style.display = 'none';
        const timeTaken = (endTime - startTime) / 1000;
        updateHighScore(timeTaken);
        alert(`You completed the challenge in ${timeTaken.toFixed(2)} seconds!`);
    }
}

function updateHighScore(timeTaken) {
    let highScore = localStorage.getItem('highScore');
    if (!highScore || timeTaken < highScore) {
        localStorage.setItem('highScore', timeTaken.toFixed(2));
        highScoreDisplay.textContent = timeTaken.toFixed(2);
        alert(`New High Score: ${timeTaken.toFixed(2)} seconds!`);
    } else {
        highScoreDisplay.textContent = highScore;
    }
}

circle.addEventListener('click', () => {
    circlesClicked++;
    circle.style.display = 'none';
    showCircle();
});

gameArea.addEventListener('click', (event) => {
    if (event.target !== circle) {
        incrementMisclicks();
    }
});

function incrementMisclicks() {
    misclicks++;
    misclickCount.textContent = misclicks;
}

function startGame() {
    // Display the current high score when the game starts
    let highScore = localStorage.getItem('highScore');
    if (highScore) {
        highScoreDisplay.textContent = highScore;
    } else {
        highScoreDisplay.textContent = '0.00';
    }
    showCircle();
}

document.addEventListener('DOMContentLoaded', startGame);
