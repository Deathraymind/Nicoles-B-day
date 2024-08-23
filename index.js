const left = document.getElementById("left-side");

const handleOnScroll = e => {
    // e.deltaY gives the scroll amount, we can use it to increase or decrease the width
    const scrollAmount = e.deltaY * 0.1; // Adjust this factor to control sensitivity
    const currentWidth = parseFloat(left.style.width) || 100; // Start at 50% if no width is set
    const newWidth = Math.min(Math.max(currentWidth + scrollAmount, 0), 100); // Keep between 0% and 100%

    left.style.width = `${newWidth}%`;
}

document.onwheel = e => handleOnScroll(e);

document.ontouchmove = e => handleOnScroll(e.touches[0]);