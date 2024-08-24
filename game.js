const draggable = document.getElementById('draggable');
const chaser = document.getElementById('chaser');
const wall = document.getElementById('wall');
const leftWall = document.getElementById('left-wall');
const rightWall = document.getElementById('right-wall');

let posX = window.innerWidth / 2;
let posY = window.innerHeight / 2;
let velocityX = 0; // Initial horizontal velocity
let velocityY = 0; // Initial vertical velocity
let gravity = 0.5; // Gravity acceleration for the ball of yarn
let friction = 0.98; // Friction to reduce velocity over time
let bounceFactor = 0.7; // Bounce damping factor

let chaserPosX = window.innerWidth / 4;
let chaserPosY = window.innerHeight / 4;
let chaserVelocityX = 0;
let chaserVelocityY = 0;
let springStrength = 0.05; // How strongly the "rubber band" pulls
let damping = 0.9; // Reduces oscillations

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

// Function to detect collisions with the walls
function checkCollision(objectX, objectY, objectWidth, objectHeight, wallX, wallY, wallWidth, wallHeight) {
    return (
        objectX < wallX + wallWidth &&
        objectX + objectWidth > wallX &&
        objectY < wallY + wallHeight &&
        objectY + objectHeight > wallY
    );
}

// Function to apply physics for both the ball of yarn and the cat
function applyPhysics() {
    if (!isDragging) {
        // Apply gravity to the ball of yarn
        velocityY += gravity;
        posX += velocityX;
        posY += velocityY;

        // Check for collisions with the edges for the ball of yarn
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

        // Check for collision with the top wall
        if (checkCollision(posX, posY, draggable.offsetWidth, draggable.offsetHeight, wall.offsetLeft, wall.offsetTop, wall.offsetWidth, wall.offsetHeight)) {
            if (posX < wall.offsetLeft) {
                posX = wall.offsetLeft - draggable.offsetWidth;
            } else if (posX + draggable.offsetWidth > wall.offsetLeft + wall.offsetWidth) {
                posX = wall.offsetLeft + wall.offsetWidth;
            }
            if (posY < wall.offsetTop) {
                posY = wall.offsetTop - draggable.offsetHeight;
            } else if (posY + draggable.offsetHeight > wall.offsetTop + wall.offsetHeight) {
                posY = wall.offsetTop + wall.offsetHeight;
            }
        }

        // Check for collision with the left wall
        if (checkCollision(posX, posY, draggable.offsetWidth, draggable.offsetHeight, leftWall.offsetLeft, leftWall.offsetTop, leftWall.offsetWidth, leftWall.offsetHeight)) {
            if (posX < leftWall.offsetLeft) {
                posX = leftWall.offsetLeft - draggable.offsetWidth;
            } else if (posX + draggable.offsetWidth > leftWall.offsetLeft + leftWall.offsetWidth) {
                posX = leftWall.offsetLeft + leftWall.offsetWidth;
            }
            if (posY < leftWall.offsetTop) {
                posY = leftWall.offsetTop - draggable.offsetHeight;
            } else if (posY + draggable.offsetHeight > leftWall.offsetTop + leftWall.offsetHeight) {
                posY = leftWall.offsetTop + leftWall.offsetHeight;
            }
        }

        // Check for collision with the right wall
        if (checkCollision(posX, posY, draggable.offsetWidth, draggable.offsetHeight, rightWall.offsetLeft, rightWall.offsetTop, rightWall.offsetWidth, rightWall.offsetHeight)) {
            if (posX < rightWall.offsetLeft) {
                posX = rightWall.offsetLeft - draggable.offsetWidth;
            } else if (posX + draggable.offsetWidth > rightWall.offsetLeft + rightWall.offsetWidth) {
                posX = rightWall.offsetLeft + rightWall.offsetWidth;
            }
            if (posY < rightWall.offsetTop) {
                posY = rightWall.offsetTop - draggable.offsetHeight;
            } else if (posY + draggable.offsetHeight > rightWall.offsetTop + rightWall.offsetHeight) {
                posY = rightWall.offsetTop + rightWall.offsetHeight;
            }
        }

        // Apply friction
        velocityX *= friction;
        velocityY *= friction;

        // Update the position of the ball of yarn
        draggable.style.left = `${posX}px`;
        draggable.style.top = `${posY}px`;

        // Calculate the force that pulls the cat towards the yarn
        let forceX = (posX - chaserPosX) * springStrength;
        let forceY = (posY - chaserPosY) * springStrength;

        // Update the cat's velocity based on the force
        chaserVelocityX += forceX;
        chaserVelocityY += forceY;

        // Apply damping to reduce oscillations
        chaserVelocityX *= damping;
        chaserVelocityY *= damping;

        // Update the cat's position based on its velocity
        chaserPosX += chaserVelocityX;
        chaserPosY += chaserVelocityY;

        // Check for collision with the top wall
        if (checkCollision(chaserPosX, chaserPosY, chaser.offsetWidth, chaser.offsetHeight, wall.offsetLeft, wall.offsetTop, wall.offsetWidth, wall.offsetHeight)) {
            if (chaserPosX < wall.offsetLeft) {
                chaserPosX = wall.offsetLeft - chaser.offsetWidth;
            } else if (chaserPosX + chaser.offsetWidth > wall.offsetLeft + wall.offsetWidth) {
                chaserPosX = wall.offsetLeft + wall.offsetWidth;
            }
            if (chaserPosY < wall.offsetTop) {
                chaserPosY = wall.offsetTop - chaser.offsetHeight;
            } else if (chaserPosY + chaser.offsetHeight > wall.offsetTop + wall.offsetHeight) {
                chaserPosY = wall.offsetTop + wall.offsetHeight;
            }
        }

        // Check for collision with the left wall
        if (checkCollision(chaserPosX, chaserPosY, chaser.offsetWidth, chaser.offsetHeight, leftWall.offsetLeft, leftWall.offsetTop, leftWall.offsetWidth, leftWall.offsetHeight)) {
            if (chaserPosX < leftWall.offsetLeft) {
                chaserPosX = leftWall.offsetLeft - chaser.offsetWidth;
            } else if (chaserPosX + chaser.offsetWidth > leftWall.offsetLeft + leftWall.offsetWidth) {
                chaserPosX = leftWall.offsetLeft + leftWall.offsetWidth;
            }
            if (chaserPosY < leftWall.offsetTop) {
                chaserPosY = leftWall.offsetTop - chaser.offsetHeight;
            } else if (chaserPosY + chaser.offsetHeight > leftWall.offsetTop + leftWall.offsetHeight) {
                chaserPosY = leftWall.offsetTop + leftWall.offsetHeight;
            }
        }

        // Check for collision with the right wall
        if (checkCollision(chaserPosX, chaserPosY, chaser.offsetWidth, chaser.offsetHeight, rightWall.offsetLeft, rightWall.offsetTop, rightWall.offsetWidth, rightWall.offsetHeight)) {
            if (chaserPosX < rightWall.offsetLeft) {
                chaserPosX = rightWall.offsetLeft - chaser.offsetWidth;
            } else if (chaserPosX + chaser.offsetWidth > rightWall.offsetLeft + rightWall.offsetWidth) {
                chaserPosX = rightWall.offsetLeft + rightWall.offsetWidth;
            }
            if (chaserPosY < rightWall.offsetTop) {
                chaserPosY = rightWall.offsetTop - chaser.offsetHeight;
            } else if (chaserPosY + chaser.offsetHeight > rightWall.offsetTop + rightWall.offsetHeight) {
                chaserPosY = rightWall.offsetTop + rightWall.offsetHeight;
            }
        }

        // Update the position of the cat
        chaser.style.left = `${chaserPosX}px`;
        chaser.style.top = `${chaserPosY}px`;
    }

    requestAnimationFrame(applyPhysics); // Continue the physics loop
}

applyPhysics(); // Start the physics loop

