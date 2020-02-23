// Style Navbar on scroll event
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scroll', window.scrollY > 0);
});


// Parallax Effect on Hero BG on mouse mouvement
window.addEventListener('mousemove', (e) => {
    var hero = document.querySelector('#hero');

    var mouseX = e.clientX / 100;
    var mouseY = e.clientY / 100;

    hero.style.backgroundPosition = mouseX + "px " + mouseY + "px";
});