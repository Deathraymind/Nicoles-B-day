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

        // ** New Wall/Ledge Collision Logic **
        // Check for collision with the middle wall
        if (posX + draggable.offsetWidth > middleWall.offsetLeft && posX < middleWall.offsetLeft + middleWall.offsetWidth) {
            if (posY + draggable.offsetHeight > middleWall.offsetTop && posY < middleWall.offsetTop + middleWall.offsetHeight) {
                if (velocityY > 0 && posY + draggable.offsetHeight > middleWall.offsetTop) {
                    posY = middleWall.offsetTop - draggable.offsetHeight;
                    velocityY = -velocityY * bounceFactor;
                } else if (velocityY < 0 && posY < middleWall.offsetTop + middleWall.offsetHeight) {
                    posY = middleWall.offsetTop + middleWall.offsetHeight;
                    velocityY = -velocityY * bounceFactor;
                }

                if (velocityX > 0 && posX + draggable.offsetWidth > middleWall.offsetLeft) {
                    posX = middleWall.offsetLeft - draggable.offsetWidth;
                    velocityX = -velocityX * bounceFactor;
                } else if (velocityX < 0 && posX < middleWall.offsetLeft + middleWall.offsetWidth) {
                    posX = middleWall.offsetLeft + middleWall.offsetWidth;
                    velocityX = -velocityX * bounceFactor;
                }
            }
        }

        // Check for collision with the left ledge
        if (posX + draggable.offsetWidth > leftLedge.offsetLeft && posX < leftLedge.offsetLeft + leftLedge.offsetWidth) {
            if (posY + draggable.offsetHeight > leftLedge.offsetTop && posY < leftLedge.offsetTop + leftLedge.offsetHeight) {
                if (velocityY > 0 && posY + draggable.offsetHeight > leftLedge.offsetTop) {
                    posY = leftLedge.offsetTop - draggable.offsetHeight;
                    velocityY = -velocityY * bounceFactor;
                } else if (velocityY < 0 && posY < leftLedge.offsetTop + leftLedge.offsetHeight) {
                    posY = leftLedge.offsetTop + leftLedge.offsetHeight;
                    velocityY = -velocityY * bounceFactor;
                }

                if (velocityX > 0 && posX + draggable.offsetWidth > leftLedge.offsetLeft) {
                    posX = leftLedge.offsetLeft - draggable.offsetWidth;
                    velocityX = -velocityX * bounceFactor;
                } else if (velocityX < 0 && posX < leftLedge.offsetLeft + leftLedge.offsetWidth) {
                    posX = leftLedge.offsetLeft + leftLedge.offsetWidth;
                    velocityX = -velocityX * bounceFactor;
                }
            }
        }

        // Check for collision with the right ledge
        if (posX + draggable.offsetWidth > rightLedge.offsetLeft && posX < rightLedge.offsetLeft + rightLedge.offsetWidth) {
            if (posY + draggable.offsetHeight > rightLedge.offsetTop && posY < rightLedge.offsetTop + rightLedge.offsetHeight) {
                if (velocityY > 0 && posY + draggable.offsetHeight > rightLedge.offsetTop) {
                    posY = rightLedge.offsetTop - draggable.offsetHeight;
                    velocityY = -velocityY * bounceFactor;
                } else if (velocityY < 0 && posY < rightLedge.offsetTop + rightLedge.offsetHeight) {
                    posY = rightLedge.offsetTop + rightLedge.offsetHeight;
                    velocityY = -velocityY * bounceFactor;
                }

                if (velocityX > 0 && posX + draggable.offsetWidth > rightLedge.offsetLeft) {
                    posX = rightLedge.offsetLeft - draggable.offsetWidth;
                    velocityX = -velocityX * bounceFactor;
                } else if (velocityX < 0 && posX < rightLedge.offsetLeft + rightLedge.offsetWidth) {
                    posX = rightLedge.offsetLeft + rightLedge.offsetWidth;
                    velocityX = -velocityX * bounceFactor;
                }
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

        // Repeat similar collision checks for the chaser (cat)
        if (chaserPosX + chaser.offsetWidth > middleWall.offsetLeft && chaserPosX < middleWall.offsetLeft + middleWall.offsetWidth) {
            if (chaserPosY + chaser.offsetHeight > middleWall.offsetTop && chaserPosY < middleWall.offsetTop + middleWall.offsetHeight) {
                if (chaserVelocityY > 0 && chaserPosY + chaser.offsetHeight > middleWall.offsetTop) {
                    chaserPosY = middleWall.offsetTop - chaser.offsetHeight;
                    chaserVelocityY = -chaserVelocityY * bounceFactor;
                } else if (chaserVelocityY < 0 && chaserPosY < middleWall.offsetTop + middleWall.offsetHeight) {
                    chaserPosY = middleWall.offsetTop + middleWall.offsetHeight;
                    chaserVelocityY = -chaserVelocityY * bounceFactor;
                }

                if (chaserVelocityX > 0 && chaserPosX + chaser.offsetWidth > middleWall.offsetLeft) {
                    chaserPosX = middleWall.offsetLeft - chaser.offsetWidth;
                    chaserVelocityX = -chaserVelocityX * bounceFactor;
                } else if (chaserVelocityX < 0 && chaserPosX < middleWall.offsetLeft + middleWall.offsetWidth) {
                    chaserPosX = middleWall.offsetLeft + middleWall.offsetWidth;
                    chaserVelocityX = -chaserVelocityX * bounceFactor;
                }
            }
        }

        // Apply similar collision logic for left and right ledges for the chaser...

        // Apply friction
        chaserVelocityX *= friction;
        chaserVelocityY *= friction;

        // Update the position of the cat
        chaser.style.left = `${chaserPosX}px`;
        chaser.style.top = `${chaserPosY}px`;
    }

    requestAnimationFrame(applyPhysics); // Continue the physics loop
}

applyPhysics(); // Start the physics loop
