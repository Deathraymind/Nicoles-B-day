let isOnLeftLedge = false;
let leftLedgeTimer;

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

        // Check for collision with the middle wall
        if (checkCollision(posX, posY, draggable.offsetWidth, draggable.offsetHeight, middleWall.offsetLeft, middleWall.offsetTop, middleWall.offsetWidth, middleWall.offsetHeight)) {
            // handle middle wall collision
        }

        // Check for collision with the left ledge
        if (checkCollision(posX, posY, draggable.offsetWidth, draggable.offsetHeight, leftLedge.offsetLeft, leftLedge.offsetTop, leftLedge.offsetWidth, leftLedge.offsetHeight)) {
            if (!isOnLeftLedge) {
                isOnLeftLedge = true;
                leftLedgeTimer = setTimeout(() => {
                    window.location.href = 'pages/valorant.html';
                }, 3000); // 3 seconds
            }
        } else {
            if (isOnLeftLedge) {
                isOnLeftLedge = false;
                clearTimeout(leftLedgeTimer);
            }
        }

        // Check for collision with the right ledge
        if (checkCollision(posX, posY, draggable.offsetWidth, draggable.offsetHeight, rightLedge.offsetLeft, rightLedge.offsetTop, rightLedge.offsetWidth, rightLedge.offsetHeight)) {
            // handle right ledge collision
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

        // Check for collision with the middle wall
        if (checkCollision(chaserPosX, chaserPosY, chaser.offsetWidth, chaser.offsetHeight, middleWall.offsetLeft, middleWall.offsetTop, middleWall.offsetWidth, middleWall.offsetHeight)) {
            // handle middle wall collision
        }

        // Check for collision with the left ledge
        if (checkCollision(chaserPosX, chaserPosY, chaser.offsetWidth, chaser.offsetHeight, leftLedge.offsetLeft, leftLedge.offsetTop, leftLedge.offsetWidth, leftLedge.offsetHeight)) {
            // handle left ledge collision
        }

        // Check for collision with the right ledge
        if (checkCollision(chaserPosX, chaserPosY, chaser.offsetWidth, chaser.offsetHeight, rightLedge.offsetLeft, rightLedge.offsetTop, rightLedge.offsetWidth, rightLedge.offsetHeight)) {
            // handle right ledge collision
        }

        // Update the position of the cat
        chaser.style.left = `${chaserPosX}px`;
        chaser.style.top = `${chaserPosY}px`;
    }

    requestAnimationFrame(applyPhysics); // Continue the physics loop
}

applyPhysics(); // Start the physics loop
