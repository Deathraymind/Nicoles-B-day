.side {
    width: 100vw;  /* Full width of the viewport */
    height: 100vh; /* Full height of the viewport */
    display: grid;
    place-items: center;
    overflow: hidden;
    position: absolute; /* Absolute positioning for stacking */
    top: 0;
    left: 0;
}

#left-side {
    background-color: pink;
    z-index: 3;
    transition: width 0.5s ease;
}

#right-side {
    background-color: white;
    z-index: 2;
    transition: width 0.5s ease;
}

#page2 {
    background-color: pink;
    width: 100vw;  /* Full width of the viewport */
    height: 100vh; /* Full height of the viewport */
    position: relative; /* Positioned naturally below the other sections */
    z-index: 1; /* Lower z-index so it stays below the other elements */
}

#left-side .title {
    color: white;
}

#right-side .title {
    color: pink;
}