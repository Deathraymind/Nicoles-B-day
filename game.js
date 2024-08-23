const draggable = document.getElementById('draggable');
let isDragging = false;
let offsetX, offsetY, velocityX = 0, velocityY = 0;

draggable.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - draggable.getBoundingClientRect().left;
    offsetY = e.clientY - draggable.getBoundingClientRect().top;
    draggable.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const newX = e.clientX - offsetX;
        const newY = e.clientY - offsetY;
        velocityX = newX - parseFloat(draggable.style.left || 0);
        velocityY = newY - parseFloat(draggable.style.top || 0);
        draggable.style.left = `${newX}px`;
        draggable.style.top = `${newY}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    draggable.style.cursor = 'grab';

    const friction = 0.95;
    const moveElement = () => {
        if (!isDragging) {
            velocityX *= friction;
            velocityY *= friction;
            draggable.style.left = `${parseFloat(draggable.style.left || 0) + velocityX}px`;
            draggable.style.top = `${parseFloat(draggable.style.top || 0) + velocityY}px`;

            if (Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1) {
                requestAnimationFrame(moveElement);
            }
        }
    };

    moveElement();
});
