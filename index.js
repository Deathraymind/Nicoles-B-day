const left = document.getElementById("left-side");
const right = document.getElementById("right-side"); // Added this line
const page2 = document.getElementById("page2");

const handleOnMove = e => {
    const p = e.clientX / window.innerWidth * 100;
    left.style.width = `${p}%`;
};

document.onmousemove = e => handleOnMove(e);
document.ontouchmove = e => handleOnMove(e.touches[0]);

window.addEventListener('scroll', function() {
    console.log('Scrolling...'); // Check if this logs in the console
    const scrollPosition = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = scrollPosition / scrollHeight;

    if (scrollPercentage > 0.9) {
        console.log('Triggering transition to page2'); // Check if this logs in the console
        left.style.transform = 'translateX(-100%)';
        right.style.transform = 'translateX(100%)';
        page2.scrollIntoView({ behavior: 'smooth' });
    }
});
