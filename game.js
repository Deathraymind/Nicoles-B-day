const draggable = document.getElementById('draggable');
const chaser = document.getElementById('chaser');

let posX = window.innerWidth / 2;
let posY = window.innerHeight / 2;
let velocityX = 0; // Initial horizontal velocity
let velocityY = 0; // Initial vertical velocity
let gravity = 0.5; // Gravity acceleration
let friction = 0.98; // Friction to reduce velocity over time
let bounceFactor = 0.7; // Bounce damping factor

let chaserPosX = window.innerWidth / 4;
let chaserPosY = window.innerHeight / 4;
let chaserOffsetX = 50; // Offset distance between the chaser and the circle
let chaserOffsetY = 50;

let isDragging = false;
let offsetX, offsetY;
let lastMouseX, lastMouseY; // To calculate the velocity based on drag

draggable.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - draggable.getBoundingClientRect().left;
    offsetY = e.clientY - draggable.getBoundingClientRect().top;
    draggable.style.cursor = 'grabbing';
    velocityX = 0; // Stop current motion on grab
    velocityY = 0;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        posX = e.clientX - offsetX;
        posY = e.clientY - offsetY;
        draggable.style.left = `${posX}px`;
        draggable.style.top = `${posY}px`;

        // Calculate the velocity based on mouse movement
        velocityX = e.clientX - lastMouseX;
        velocityY = e.clientY - lastMouseY;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    draggable.style.cursor = 'grab';
});

// Function to apply physics, gravity, and bouncing for both objects
function applyPhysics() {
    if (!isDragging) {
        // Apply gravity to the circle
        velocityY += gravity;
        posX += velocityX;
        posY += velocityY;

        // Check for collisions with the edges for the circle
        if (posX + draggable.offsetWidth > window.innerWidth || posX < 0) {
            velocityX = -velocityX * bounceFactor;
            if (posX < 0) posX = 0;
            if (posX + draggable.offsetWidth > window.innerWidth) posX = window.innerWidth - draggable.offsetWidth;
        }

        if (posY + draggable.offsetHeight > window.innerHeight || posY < 0) {
            velocityY = -velocityY * bounceFactor;
            if (posY < 0) posY = 0;
            if (posY + draggable.offsetHeight > window.innerHeight) posY = window.innerHeight - draggable.offsetHeight;
        }

        // Apply friction
        velocityX *= friction;
        velocityY *= friction;

        // Update the position of the draggable circle
        draggable.style.left = `${posX}px`;
        draggable.style.top = `${posY}px`;

        // Make the chaser move toward the circle with an offset
        chaserPosX += (velocityX * 0.8); // Chaser's speed relative to the circle's velocity
        chaserPosY += (velocityY * 0.8);

        // Apply the offset
        chaserPosX = posX - chaserOffsetX;
        chaserPosY = posY - chaserOffsetY;

        // Update the position of the chaser
        chaser.style.left = `${chaserPosX}px`;
        chaser.style.top = `${chaserPosY}px`;
    }

    requestAnimationFrame(applyPhysics); // Continue the physics loop
}

applyPhysics(); // Start the physics loop