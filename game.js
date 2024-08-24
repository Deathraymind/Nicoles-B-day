function applyPhysics() {
    if (!isDragging) {
        // Apply gravity to the ball of yarn
        velocityY += gravity;
        posX += velocityX;
        posY += velocityY;

        // Check for collisions with the edges of the screen
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
        if (posX + draggable.offsetWidth > middleWall.offsetLeft && posX < middleWall.offsetLeft + middleWall.offsetWidth) {
            if (posY + draggable.offsetHeight > middleWall.offsetTop && posY < middleWall.offsetTop + middleWall.offsetHeight) {
                // Collision detected with middle wall
                if (velocityX > 0) {
                    posX = middleWall.offsetLeft - draggable.offsetWidth;
                } else if (velocityX < 0) {
                    posX = middleWall.offsetLeft + middleWall.offsetWidth;
                }
                velocityX = -velocityX * bounceFactor;

                if (velocityY > 0) {
                    posY = middleWall.offsetTop - draggable.offsetHeight;
                } else if (velocityY < 0) {
                    posY = middleWall.offsetTop + middleWall.offsetHeight;
                }
                velocityY = -velocityY * bounceFactor;
            }
        }

        // Check for collision with the left ledge
        if (posX + draggable.offsetWidth > leftLedge.offsetLeft && posX < leftLedge.offsetLeft + leftLedge.offsetWidth) {
            if (posY + draggable.offsetHeight > leftLedge.offsetTop && posY < leftLedge.offsetTop + leftLedge.offsetHeight) {
                // Collision detected with left ledge
                if (velocityX > 0) {
                    posX = leftLedge.offsetLeft - draggable.offsetWidth;
                } else if (velocityX < 0) {
                    posX = leftLedge.offsetLeft + leftLedge.offsetWidth;
                }
                velocityX = -velocityX * bounceFactor;

                if (velocityY > 0) {
                    posY = leftLedge.offsetTop - draggable.offsetHeight;
                } else if (velocityY < 0) {
                    posY = leftLedge.offsetTop + leftLedge.offsetHeight;
                }
                velocityY = -velocityY * bounceFactor;
            }
        }

        // Check for collision with the right ledge
        if (posX + draggable.offsetWidth > rightLedge.offsetLeft && posX < rightLedge.offsetLeft + rightLedge.offsetWidth) {
            if (posY + draggable.offsetHeight > rightLedge.offsetTop && posY < rightLedge.offsetTop + rightRidge.offsetHeight) {
                // Collision detected with right ledge
                if (velocityX > 0) {
                    posX = rightLedge.offsetLeft - draggable.offsetWidth;
                } else if (velocityX < 0) {
                    posX = rightLedge.offsetLeft + rightLedge.offsetWidth;
                }
                velocityX = -velocityX * bounceFactor;

                if (velocityY > 0) {
                    posY = rightLedge.offsetTop - draggable.offsetHeight;
                } else if (velocityY < 0) {
                    posY = rightLedge.offsetTop + rightLedge.offsetHeight;
                }
                velocityY = -velocityY * bounceFactor;
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
                // Collision detected with middle wall
                if (chaserVelocityX > 0) {
                    chaserPosX = middleWall.offsetLeft - chaser.offsetWidth;
                } else if (chaserVelocityX < 0) {
                    chaserPosX = middleWall.offsetLeft + middleWall.offsetWidth;
                }
                chaserVelocityX = -chaserVelocityX * bounceFactor;

                if (chaserVelocityY > 0) {
                    chaserPosY = middleWall.offsetTop - chaser.offsetHeight;
                } else if (chaserVelocityY < 0) {
                    chaserPosY = middleWall.offsetTop + middleWall.offsetHeight;
                }
                chaserVelocityY = -chaserVelocityY * bounceFactor;
            }
        }

        // Apply similar collision logic for left and right ledges for the chaser...
        // Left ledge
        if (chaserPosX + chaser.offsetWidth > leftLedge.offsetLeft && chaserPosX < leftLedge.offsetLeft + leftLedge.offsetWidth) {
            if (chaserPosY + chaser.offsetHeight > leftLedge.offsetTop && chaserPosY < leftLedge.offsetTop + leftLedge.offsetHeight) {
                // Collision detected with left ledge
                if (chaserVelocityX > 0) {
                    chaserPosX = leftLedge.offsetLeft - chaser.offsetWidth;
                } else if (chaserVelocityX < 0) {
                    chaserPosX = leftLedge.offsetLeft + leftLedge.offsetWidth;
                }
                chaserVelocityX = -chaserVelocityX * bounceFactor;

                if (chaserVelocityY > 0) {
                    chaserPosY = leftLedge.offsetTop - chaser.offsetHeight;
                } else if (chaserVelocityY < 0) {
                    chaserPosY = leftLedge.offsetTop + leftLedge.offsetHeight;
                }
                chaserVelocityY = -chaserVelocityY * bounceFactor;
            }
        }

        // Right ledge
        if (chaserPosX + chaser.offsetWidth > rightLedge.offsetLeft && chaserPosX < rightLedge.offsetLeft + rightLedge.offsetWidth) {
            if (chaserPosY + chaser.offsetHeight > rightLedge.offsetTop && chaserPosY < rightLedge.offsetTop + rightLedge.offsetHeight) {
                // Collision detected with right ledge
                if (chaserVelocityX > 0) {
                    chaserPosX = rightLedge.offsetLeft - chaser.offsetWidth;
                } else if (chaserVelocityX < 0) {
                    chaserPosX = rightLedge.offsetLeft + rightLedge.offsetWidth;
                }
                chaserVelocityX = -chaserVelocityX * bounceFactor;

                if (chaserVelocityY > 0) {
                    chaserPosY = rightLedge.offsetTop - chaser.offsetHeight;
                } else if (chaserVelocityY < 0) {
                    chaserPosY = rightLedge.offsetTop + rightLedge.offsetHeight;
                }
                chaserVelocityY = -chaserVelocityY * bounceFactor;
            }
        }

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