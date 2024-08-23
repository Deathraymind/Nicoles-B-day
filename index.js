const left = document.getElementById("left-side");
const right = document.getElementById("right-side");
const page2 = document.getElementById("page2");

let isAtZero = false; // Flag to check if the width has reached 0%
let rightSideRevealed = false; // Flag to check if the right-side has been revealed

const handleOnScroll = e => {
    if (e.deltaY > 0 && !isAtZero) {
        const scrollAmount = e.deltaY * 0.1; // Adjust this factor to control sensitivity
        const currentWidth = parseFloat(left.style.width) || 100; // Start at 100% if no width is set
        const newWidth = Math.max(currentWidth - scrollAmount, 0); // Decrease width, keep between 0% and 100%

        // Set the width
        left.style.width = `${newWidth}%`;

        // If the width reaches 0%, set the flag, change background, and reveal the right-side
        if (newWidth === 0) {
            isAtZero = true; // Prevent further scrolling from decreasing the width
            left.style.display = "none"; // Hide the left-side after animation
            right.style.display = "grid"; // Reveal the right-side
            right.style.width = "100%"; // Ensure right-side takes full width
            rightSideRevealed = true; // Set flag indicating right-side is revealed
        }
    }
}

// Attach the scroll event handler to the document
document.onwheel = e => handleOnScroll(e);
document.ontouchmove = e => handleOnScroll(e.touches[0]);

// Allow the normal scroll to page2 only if right-side is revealed and the user tries to scroll again
right.addEventListener('wheel', e => {
    if (rightSideRevealed) {
        page2.scrollIntoView({ behavior: "smooth" });
    }
});