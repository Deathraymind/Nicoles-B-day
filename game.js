const draggable = document.getElementById('draggable');

let posX = window.innerWidth / 2;
let posY = window.innerHeight / 2;
let velocityX = 2; // Horizontal velocity
let velocityY = 0; // Vertical velocity
let gravity = 0.5; // Gravity acceleration
let friction = 0.98; // Friction to reduce velocity over time
let bounceFactor = 0.7; // Bounce damping factor

let isDragging = false;
let offsetX, offsetY;

draggable.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - draggable.getBoundingClientRect().left;
    offsetY = e.clientY - draggable.getBoundingClientRect().top;
    draggable.style.cursor = 'grabbing';
    velocityX = 0; // Stop current motion on grab
    velocityY = 0;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        posX = e.clientX - offsetX;
        posY = e.clientY - offsetY;
        draggable.style.left = `${posX}px`;
        draggable.style.top = `${posY}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    draggable.style.cursor = 'grab';
});

// Function to apply gravity and bounce effects
function applyPhysics() {
    if (!isDragging) {
        velocityY += gravity; // Apply gravity
        posX += velocityX; // Move horizontally
        posY += velocityY; // Move vertically

        // Check for collision with the left or right borders
        if (posX + draggable.offsetWidth > window.innerWidth || posX < 0) {
            velocityX = -velocityX * bounceFactor; // Reverse direction and apply bounce factor
            if (posX < 0) posX = 0; // Prevent it from going off screen
            if (posX + draggable.offsetWidth > window.innerWidth) posX = window.innerWidth - draggable.offsetWidth;
        }

        // Check for collision with the top or bottom borders
        if (posY + draggable.offsetHeight > window.innerHeight || posY < 0) {
            velocityY = -velocityY * bounceFactor; // Reverse direction and apply bounce factor
            if (posY < 0) posY = 0; // Prevent it from going off screen
            if (posY + draggable.offsetHeight > window.innerHeight) posY = window.innerHeight - draggable.offsetHeight;
        }

        // Apply friction
        velocityX *= friction;
        velocityY *= friction;

        // Update the position of the draggable element
        draggable.style.left = `${posX}px`;
        draggable.style.top = `${posY}px`;
    }

    requestAnimationFrame(applyPhysics); // Continue the physics loop
}

applyPhysics(); // Start the physics loop