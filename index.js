const left = document.getElementById("left-side");
const right = document.getElementById("right-side"); // Added this line
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
    const opacity = 1 - (scrollTop / maxHeight);

    // Adjust opacity of left and right sides
    left.style.opacity = Math.max(opacity, 0);
    right.style.opacity = Math.max(opacity, 0);

    // Move #page2 into view
    if (scrollTop > maxHeight) {
        page2.style.opacity = 1;
    } else {
        page2.style.opacity = 0;
    }
});



