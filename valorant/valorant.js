let totalCircles = 15;
let circlesClicked = 0;
let misclicks = 0;
let startTime, timerInterval;

const gameArea = document.getElementById('game-area');
const circle = document.getElementById('circle');
const timeDisplay = document.getElementById('time');
const misclicksDisplay = document.getElementById('misclicks');

function getRandomPosition() {
    const gameAreaRect = gameArea.getBoundingClientRect();
    const x = Math.floor(Math.random() * (gameAreaRect.width - 50));
    const y = Math.floor(Math.random() * (gameAreaRect.height - 50));
    return { x, y };
}

function updateTime() {
    const currentTime = (Date.now() - startTime) / 1000;
    timeDisplay.textContent = currentTime.toFixed(2);
}

function showCircle() {
    if (circlesClicked === 0) {
        startTime = Date.now();
        timerInterval = setInterval(updateTime, 10);
    }

    if (circlesClicked < totalCircles) {
        const { x, y } = getRandomPosition();
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;
        circle.style.display = 'block';
    } else {
        clearInterval(timerInterval);
        circle.style.display = 'none';
        const timeTaken = (Date.now() - startTime) / 1000;
        alert(`You completed the challenge in ${timeTaken.toFixed(2)} seconds with ${misclicks} misclicks!`);
    }
}

circle.addEventListener('click', () => {
    circlesClicked++;
    circle.style.display = 'none';
    showCircle();
});

gameArea.addEventListener('click', (e) => {
    if (e.target !== circle) {
        misclicks++;
        misclicksDisplay.textContent = misclicks;
    }
});

showCircle();
