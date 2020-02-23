// Style Navbar on scroll event
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scroll', window.scrollY > 0);
});


// Parallax Effect on Hero BG on mouse mouvement
window.addEventListener('mousemove', (e) => {
    const heroBg = document.querySelector('.hero__bg');

    const mouseX = e.clientX / 100;
    const mouseY = e.clientY / 100;

    heroBg.style.backgroundPosition = -mouseX + "px " + -mouseY + "px";
});

