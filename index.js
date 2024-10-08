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

document.getElementById('door1').addEventListener('click', function() {
    window.location.href = 'valorant/valorant.html'; // Redirect to a different page or do something else
});

document.getElementById('door2').addEventListener('click', function() {
    window.location.href = 'nerdshit/nerdshit.html'; // Redirect to the specified URL
});

document.getElementById('birthday1').addEventListener('click', function() {
    window.location.href = 'happybirthday/happybirthday.html'; // Redirect to the specified URL
});

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the chaser element and the audio element
    const chaser = document.querySelector('.chaser');
    const audio = document.getElementById('cat-audio');

    // Add a click event listener to the chaser element
    chaser.addEventListener('click', function() {
        audio.play(); // Play the audio when chaser is clicked
    });
});

