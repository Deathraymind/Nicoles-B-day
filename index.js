const left = document.getElementById("left-side");
const page2 = document.getElementById("page2");

const handleOnMove = e => {
    const p = e.clientX / window.innerWidth * 100;
    left.style.width = `${p}%`;
};

document.onmousemove = e => handleOnMove(e);
document.ontouchmove = e => handleOnMove(e.touches[0]);

window.addEventListener('scroll', function() {
    // Use scrollY to get the current vertical scroll position
    const scrollPosition = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = scrollPosition / scrollHeight;

    // If the scroll percentage is above a certain threshold, transition to page2
    if (scrollPercentage > 0.9) { // Adjust the threshold as needed
        page2.scrollIntoView({ behavior: 'smooth' });
    }
});