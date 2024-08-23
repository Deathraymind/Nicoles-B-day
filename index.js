const left = document.getElementById("left-side");
const right = document.getElementById("right-side");
const page2 = document.getElementById("page2");

const handleOnMove = e => {
    const p = e.clientX / window.innerWidth * 100;
    left.style.width = `${p}%`;
};

document.onmousemove = e => handleOnMove(e);
document.ontouchmove = e => handleOnMove(e.touches[0]);

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const maxHeight = window.innerHeight;

    // Check if the user has scrolled past the first section
    if (scrollTop >= maxHeight) {
        // Reveal #page2 by adjusting its position
        page2.style.top = `${scrollTop}px`;
    }
});
