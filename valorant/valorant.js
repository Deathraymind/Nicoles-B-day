let totalCircles = 15;
let circlesClicked = 0;
let startTime, endTime;

const gameArea = document.getElementById('game-area');
const circle = document.getElementById('circle');
const timeDisplay = document.getElementById('time');

function getRandomPosition() {
    const gameAreaRect = gameArea.getBoundingClientRect();
    const x = Math.floor(Math.random() * (gameAreaRect.width - 50));
    const y = Math.floor(Math.random() * (gameAreaRect.height - 50));
    return { x, y };
}

function showCircle() {
    if (circlesClicked === 0) {
        startTime = Date.now();
    }

    if (circlesClicked < totalCircles) {
        const { x, y } = getRandomPosition();
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;
        circle.style.display = 'block';
    } else {
        endTime = Date.now();
        circle.style.display = 'none';
        const timeTaken = (endTime - startTime) / 1000;
        timeDisplay.textContent = timeTaken.toFixed(2);
        alert(`You completed the challenge in ${timeTaken.toFixed(2)} seconds!`);
    }
}

circle.addEventListener('click', () => {
    circlesClicked++;
    circle.style.display = 'none';
    showCircle();
});

showCircle();