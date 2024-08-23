const left = document.getElementById("left-side");
const right = document.getElementById("right-side");

let isAtZero = false; // Flag to check if the width has reached 0%

const handleOnScroll = e => {
    if (e.deltaY > 0 && !isAtZero) {
        const scrollAmount = e.deltaY * 0.1; // Adjust this factor to control sensitivity
        const currentWidth = parseFloat(left.style.width) || 100; // Start at 100% if no width is set
        const newWidth = Math.max(currentWidth - scrollAmount, 0); // Decrease width, keep between 0% and 100%

        // Set the width for left-side
        left.style.width = `${newWidth}%`;

        // Set the width for right-side as the inverse of left-side
        right.style.width = `${100 - newWidth}%`;

        // If the width reaches 0%, set the flag
        if (newWidth === 0) {
            isAtZero = true; // Prevent further scrolling from decreasing the width
        }
    }
}

document.onwheel = e => handleOnScroll(e);
document.ontouchmove = e => handleOnScroll(e.touches[0]);