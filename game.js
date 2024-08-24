const draggable = document.getElementById('draggable');
const chaser = document.getElementById('chaser');
const middleWall = document.getElementById('middle-wall');
const leftLedge = document.getElementById('left-ledge');
const rightLedge = document.getElementById('right-ledge');

let posX = window.innerWidth / 2;
let posY = window.innerHeight / 2;
let velocityX = 0; // Initial horizontal velocity
let velocityY = 0; // Initial vertical velocity
let gravity = 0.5; // Gravity acceleration for the ball of yarn
let friction = 0.96; // Friction to reduce velocity over time
let bounceFactor = 0.4; // Bounce damping factor

let chaserPosX = window.innerWidth / 4;
let chaserPosY = window.innerHeight / 4;
let chaserVelocityX = 0;
let chaserVelocityY = 0;
let springStrength = 0.02; // How strongly the "rubber band" pulls
let damping = 0.9; // Reduces oscillations

let isDragging = false;
let offsetX, offsetY;
let lastMouseX, lastMouseY; // To calculate the velocity based on drag

// Variables for left ledge timer logic
let isOnLeftLedge = false;
let leftLedgeTimer;

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

// Function to detect collisions with the ledges
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

        // Check for collision with the middle wall (for the yarn)
        if (checkCollision(posX, posY, draggable.offsetWidth, draggable.offsetHeight, middleWall.offsetLeft, middleWall.offsetTop, middleWall.offsetWidth, middleWall.offsetHeight)) {
            if (posX < middleWall.offsetLeft) {
                posX = middleWall.offsetLeft - draggable.offsetWidth;
            } else if (posX + draggable.offsetWidth > middleWall.offsetLeft + middleWall.offsetWidth) {
                posX = middleWall.offsetLeft + middleWall.offsetWidth;
            }
            if (posY < middleWall.offsetTop) {
                posY = middleWall.offsetTop - draggable.offsetHeight;
            } else if (posY + draggable.offsetHeight > middleWall.offsetTop + middleWall.offsetHeight) {
                posY = middleWall.offsetTop + middleWall.offsetHeight;
            }
            velocityX = -velocityX * bounceFactor;
            velocityY = -velocityY * bounceFactor;
        }

        // Check for collision with the left ledge (for the yarn)
        if (checkCollision(posX, posY, draggable.offsetWidth, draggable.offsetHeight, leftLedge.offsetLeft, leftLedge.offsetTop, leftLedge.offsetWidth, leftLedge.offsetHeight)) {
            if (posX < leftLedge.offsetLeft) {
                posX = leftLedge.offsetLeft - draggable.offsetWidth;
            } else if (posX + draggable.offsetWidth > leftLedge.offsetLeft + leftLedge.offsetWidth) {
                posX = leftLedge.offsetLeft + leftLedge.offsetWidth;
            }
            if (posY < leftLedge.offsetTop) {
                posY = leftLedge.offsetTop - draggable.offsetHeight;
            } else if (posY + draggable.offsetHeight > leftLedge.offsetTop + leftLedge.offsetHeight) {
                posY = leftLedge.offsetTop + leftLedge.offsetHeight;
            }
            velocityX = -velocityX * bounceFactor;
            velocityY = -velocityY * bounceFactor;
        }

        // Check for collision with the right ledge (for the yarn)
        if (checkCollision(posX, posY, draggable.offsetWidth, draggable.offsetHeight, rightLedge.offsetLeft, rightLedge.offsetTop, rightLedge.offsetWidth, rightLedge.offsetHeight)) {
            if (posX < rightLedge.offsetLeft) {
                posX = rightLedge.offsetLeft - draggable.offsetWidth;
            } else if (posX + draggable.offsetWidth > rightLedge.offsetLeft + rightLedge.offsetWidth) {
                posX = rightLedge.offsetLeft + rightLedge.offsetWidth;
            }
            if (posY < rightLedge.offsetTop) {
                posY = rightLedge.offsetTop - draggable.offsetHeight;
            } else if (posY + draggable.offsetHeight > rightLedge.offsetTop + rightLedge.offsetHeight) {
                posY = rightLedge.offsetTop + rightLedge.offsetHeight;
            }
            velocityX = -velocityX * bounceFactor;
            velocityY = -velocityY * bounceFactor;
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

        // Check for collision with the middle wall (for the cat)
        if (checkCollision(chaserPosX, chaserPosY, chaser.offsetWidth, chaser.offsetHeight, middleWall.offsetLeft, middleWall.offsetTop, middleWall.offsetWidth, middleWall.offsetHeight)) {
            if (chaserPosX < middleWall.offsetLeft) {
                chaserPosX = middleWall.offsetLeft - chaser.offsetWidth;
            } else if (chaserPosX + chaser.offsetWidth > middleWall.offsetLeft + middleWall.offsetWidth) {
                chaserPosX = middleWall.offsetLeft + middleWall.offsetWidth;
            }
            if (chaserPosY < middleWall.offsetTop) {
                chaserPosY = middleWall.offsetTop - chaser.offsetHeight;
            } else if (chaserPosY + chaser.offsetHeight > middleWall.offsetTop + middleWall.offsetHeight) {
                chaserPosY = middleWall.offsetTop + middleWall.offsetHeight;
            }
            chaserVelocityX = -chaserVelocityX * bounceFactor;
            chaserVelocityY = -chaserVelocityY * bounceFactor;
        }

        // Check for collision with the left ledge (for the cat)
        if (checkCollision(chaserPosX, chaserPosY, chaser.offsetWidth, chaser.offsetHeight, leftLedge.offsetLeft, leftLedge.offsetTop, leftLedge.offsetWidth, leftLedge.offsetHeight)) {
            if (chaserPosX < leftLedge.offsetLeft) {
                chaserPosX = leftLedge.offsetLeft - chaser.offsetWidth;
            } else if (chaserPosX + chaser.offsetWidth > leftLedge.offsetLeft + leftLedge.offsetWidth) {
                chaserPosX = leftLedge.offsetLeft + leftLedge.offsetWidth;
            }
            if (chaserPosY < leftLedge.offsetTop) {
                chaserPosY = leftLedge.offsetTop - chaser.offsetHeight;
            } else if (chaserPosY + chaser.offsetHeight > leftLedge.offsetTop + leftLedge.offsetHeight) {
                chaserPosY = leftLedge.offsetTop + leftLedge.offsetHeight;
            }
            chaserVelocityX = -chaserVelocityX * bounceFactor;
            chaserVelocityY = -chaserVelocityY * bounceFactor;
        }

        // Check for collision with the right ledge (for the cat)
        if (checkCollision(chaserPosX, chaserPosY, chaser.offsetWidth, chaser.offsetHeight, rightLedge.offsetLeft, rightLedge.offsetTop, rightLedge.offsetWidth, rightLedge.offsetHeight)) {
            if (chaserPosX < rightLedge.offsetLeft) {
                chaserPosX = rightLedge.offsetLeft - chaser.offsetWidth;
            } else if (chaserPosX + chaser.offsetWidth > rightLedge.offsetLeft + rightLedge.offsetWidth) {
                chaserPosX = rightLedge.offsetLeft + rightLedge.offsetWidth;
            }
            if (chaserPosY < rightLedge.offsetTop) {
                chaserPosY = rightLedge.offsetTop - chaser.offsetHeight;
            } else if (chaserPosY + chaser.offsetHeight > rightLedge.offsetTop + rightLedge.offsetHeight) {
                chaserPosY = rightLedge.offsetTop + rightLedge.offsetHeight;
            }
            chaserVelocityX = -chaserVelocityX * bounceFactor;
            chaserVelocityY = -chaserVelocityY * bounceFactor;
        }

        // Update the position of the cat
        chaser.style.left = `${chaserPosX}px`;
        chaser.style.top = `${chaserPosY}px`;
    }

    requestAnimationFrame(applyPhysics); // Continue the physics loop
}

applyPhysics(); // Start the physics loop