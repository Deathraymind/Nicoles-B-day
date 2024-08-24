function applyPhysics() {
    if (!isDragging) {
        // Apply gravity to the ball of yarn
        velocityY += gravity;

        // Predict next position
        let nextPosX = posX + velocityX;
        let nextPosY = posY + velocityY;

        // Check for collisions with the walls before updating position
        if (nextPosX + draggable.offsetWidth > window.innerWidth || nextPosX < 0) {
            velocityX = -velocityX * bounceFactor;
            if (nextPosX < 0) nextPosX = 0;
            if (nextPosX + draggable.offsetWidth > window.innerWidth) nextPosX = window.innerWidth - draggable.offsetWidth;
        }

        if (nextPosY + draggable.offsetHeight > window.innerHeight || nextPosY < 0) {
            velocityY = -velocityY * bounceFactor;
            if (nextPosY < 0) nextPosY = 0;
            if (nextPosY + draggable.offsetHeight > window.innerHeight) nextPosY = window.innerHeight - draggable.offsetHeight;
        }

        // Check for collision with the middle wall
        if (checkCollision(nextPosX, nextPosY, draggable.offsetWidth, draggable.offsetHeight, middleWall.offsetLeft, middleWall.offsetTop, middleWall.offsetWidth, middleWall.offsetHeight)) {
            if (nextPosX < middleWall.offsetLeft) {
                nextPosX = middleWall.offsetLeft - draggable.offsetWidth;
            } else if (nextPosX + draggable.offsetWidth > middleWall.offsetLeft + middleWall.offsetWidth) {
                nextPosX = middleWall.offsetLeft + middleWall.offsetWidth;
            }
            if (nextPosY < middleWall.offsetTop) {
                nextPosY = middleWall.offsetTop - draggable.offsetHeight;
            } else if (nextPosY + draggable.offsetHeight > middleWall.offsetTop + middleWall.offsetHeight) {
                nextPosY = middleWall.offsetTop + middleWall.offsetHeight;
            }
        }

        // Check for collision with the left ledge
        if (checkCollision(nextPosX, nextPosY, draggable.offsetWidth, draggable.offsetHeight, leftLedge.offsetLeft, leftLedge.offsetTop, leftLedge.offsetWidth, leftLedge.offsetHeight)) {
            if (nextPosX < leftLedge.offsetLeft) {
                nextPosX = leftLedge.offsetLeft - draggable.offsetWidth;
            } else if (nextPosX + draggable.offsetWidth > leftLedge.offsetLeft + leftLedge.offsetWidth) {
                nextPosX = leftLedge.offsetLeft + leftLedge.offsetWidth;
            }
            if (nextPosY < leftLedge.offsetTop) {
                nextPosY = leftLedge.offsetTop - draggable.offsetHeight;
            } else if (nextPosY + draggable.offsetHeight > leftLedge.offsetTop + leftLedge.offsetHeight) {
                nextPosY = leftLedge.offsetTop + leftLedge.offsetHeight;
            }
        }

        // Check for collision with the right ledge
        if (checkCollision(nextPosX, nextPosY, draggable.offsetWidth, draggable.offsetHeight, rightLedge.offsetLeft, rightLedge.offsetTop, rightLedge.offsetWidth, rightLedge.offsetHeight)) {
            if (nextPosX < rightLedge.offsetLeft) {
                nextPosX = rightLedge.offsetLeft - draggable.offsetWidth;
            } else if (nextPosX + draggable.offsetWidth > rightLedge.offsetLeft + rightLedge.offsetWidth) {
                nextPosX = rightLedge.offsetLeft + rightLedge.offsetWidth;
            }
            if (nextPosY < rightLedge.offsetTop) {
                nextPosY = rightLedge.offsetTop - draggable.offsetHeight;
            } else if (nextPosY + draggable.offsetHeight > rightLedge.offsetTop + rightLedge.offsetHeight) {
                nextPosY = rightLedge.offsetTop + rightLedge.offsetHeight;
            }
        }

        // Apply friction
        velocityX *= friction;
        velocityY *= friction;

        // Update position after collision detection
        posX = nextPosX;
        posY = nextPosY;
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

        // Check for collision with the middle wall for the cat
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
        }

        // Check for collision with the left ledge for the cat
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
        }

        // Check for collision with the right ledge for the cat
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
        }

        // Update the position of the cat
        chaser.style.left = `${chaserPosX}px`;
        chaser.style.top = `${chaserPosY}px`;
    }

    requestAnimationFrame(applyPhysics); // Continue the physics loop
}

applyPhysics(); // Start the physics loop