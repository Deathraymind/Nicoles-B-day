let totalCircles = 15;
let circlesClicked = 0;
let startTime, endTime;

const gameArea = document.getElementById('game-area');
const circle = document.getElementById('circle');
const timeDisplay = document.getElementById('time');

// Array of image paths (1-9)
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
    'images/image14.png',];

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
