const left = document.getElementById("left-side");
const right = document.getElementById("right-side"); // Added this line
const page2 = document.getElementById("page2");

const handleOnMove = e => {
    const p = e.clientX / window.innerWidth * 100;
    left.style.width = `${p}%`;
};

document.onmousemove = e => handleOnMove(e);
document.ontouchmove = e => handleOnMove(e.touches[0]);

window.addEventListener("scroll", (event) => {
    const scrollTop = window.scrollY;
    const maxHeight = window.innerHeight;
    const opacity = 1 - (scrollTop / maxHeight);
    
    left.style.opacity = opacity;
    right.style.opacity = opacity;
    console.log('The page is scrolling!', event);
});


