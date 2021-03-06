/* -------------------------------------------------------------------------- */
/*                                    VARS                                    */
/* -------------------------------------------------------------------------- */
const loader = document.createElement('div');
const body = document.querySelector('body');
const allCircles = document.querySelectorAll('[data-genie]');
const form = document.querySelector('form');
const submit = document.querySelector('[type=submit]');
const contact = document.querySelector('#contact');

/* -------------------------------------------------------------------------- */
/*                                PROGRESS BAR                                */
/* -------------------------------------------------------------------------- */
let bodyHeight = window.getComputedStyle(body).getPropertyValue('height');
let contactHeight = window.getComputedStyle(contact).getPropertyValue('height');
let scrollableHeight = parseInt(bodyHeight, 10) - parseInt(contactHeight, 10) - 70;
let progressBar = document.querySelector('.progress-bar');

// Recalculate after the window is resized
const calcProgress = () => {
  bodyHeight = window.getComputedStyle(body).getPropertyValue('height');
  contactHeight = window.getComputedStyle(contact).getPropertyValue('height');
  scrollableHeight = parseInt(bodyHeight, 10) - parseInt(contactHeight, 10) - 70;
  progressBar = document.querySelector('.progress-bar');
  console.log('Resized');
  
  return bodyHeight, contactHeight, scrollableHeight, progressBar
}
window.onresize = calcProgress();
/* -------------------------------------------------------------------------- */
/*                                     NAV                                    */
/* -------------------------------------------------------------------------- */
window.addEventListener('scroll', () => {
  // NAV
  let header = document.querySelector('header');
  header.classList.toggle('scroll', window.scrollY > 0);

  // PROGRESS BAR
  let scrollProgression = Math.ceil((window.scrollY * 100) / scrollableHeight);
  progressBar.style.height = scrollProgression+'vh';
  const color = `hsl(${scrollProgression*3.6}, 100%, 50%)`;
  progressBar.style.backgroundColor = color;
  progressBar.style.boxShadow = `-5px 0 40px ${color}`;

});

/* -------------------------------------------------------------------------- */
/*                                    HERO                                    */
/* -------------------------------------------------------------------------- */
// // Parallax Effect on Hero BG on mouse mouvement
// window.addEventListener('mousemove', (e) => {
//     let heroBg = document.querySelector('.hero__bg');

//     let mouseX = e.clientX / 100;
//     let mouseY = e.clientY / 100;
//     heroBg.style.backgroundPosition = -mouseX + "px " + -mouseY + "px";
// });

/* -------------------------------------------------------------------------- */
/*                                   LOADER                                   */
/* -------------------------------------------------------------------------- */
loader.className = 'loader';
body.appendChild(loader);
loader.innerHTML = `
<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(255, 255, 255, 0); display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<g>
<circle cx="68.3979" cy="50" r="4" fill="#e15b64">
  <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="-0.67s"></animate>
  <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="-0.67s"></animate>
</circle>
<circle cx="88.7979" cy="50" r="4" fill="#e15b64">
  <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="-0.33s"></animate>
  <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="-0.33s"></animate>
</circle>
<circle cx="48.5979" cy="50" r="4" fill="#e15b64">
  <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="0s"></animate>
  <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="0s"></animate>
</circle>
</g><g transform="translate(-15 0)">
<path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#f8b26a" transform="rotate(90 50 50)"></path>
<path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#f8b26a" transform="rotate(20.3969 50 50)">
  <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;45 50 50;0 50 50" keyTimes="0;0.5;1"></animateTransform>
</path>
<path d="M50 50L20 50A30 30 0 0 1 80 50Z" fill="#f8b26a" transform="rotate(-20.3969 50 50)">
  <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;-45 50 50;0 50 50" keyTimes="0;0.5;1"></animateTransform>
</path>
</g>
<!-- [ldio] generated by https://loading.io/ --></svg>`;

function loading() {
  body.removeChild(loader);
};

/* -------------------------------------------------------------------------- */
/*                                    GENIE                                   */
/* -------------------------------------------------------------------------- */
const circles = [].slice.call(allCircles);
circles.forEach(circle => {
  circle.addEventListener('mouseover', (event) => {
    const target = event.target;
    const current = target.parentNode.parentNode;
    const next = current.nextSibling.nextSibling;
    const prev = current.previousSibling.previousSibling;

    // Previous
    if (prev && prev.childNodes[3].classList.contains('circle')) {
      prev.childNodes[3].style.transform = 'scale(1.1)';
      prev.childNodes[3].style.transition = 'transform .8s';
    }
    // Current
    current.childNodes[3].style.transform = 'scale(1.3)';
    current.childNodes[3].style.transition = 'transform .4s';
    // Next
    if (next && next.childNodes[3].classList.contains('circle')) {
      next.childNodes[3].style.transform = 'scale(1.1)';
      next.childNodes[3].style.transition = 'transform .8s';
    }
  });

  circle.addEventListener('mouseout', (event) => {
    const target = event.target;
    const current = target.parentNode.parentNode;
    const next = current.nextSibling.nextSibling;
    const prev = current.previousSibling.previousSibling;
    // Previous
    if (prev && prev.childNodes[3].classList.contains('circle')) {
      prev.childNodes[3].style.transform = 'scale(1)';
    }
    // Current
    current.childNodes[3].style.transform = 'scale(1)';
    // Next
    if (next && next.childNodes[3].classList.contains('circle')) {
      next.childNodes[3].style.transform = 'scale(1)';
    }
  });
});

submit.addEventListener('click', e => {
  e.preventDefault();
  form.classList.toggle('validated');
})

/* -------------------------------------------------------------------------- */
/*                                    GSAP                                    */
/* -------------------------------------------------------------------------- */
// MENU
const header_timeline = new TimelineMax();
header_timeline
  .staggerFrom('.header__item', 1, {cycle:{y: [15, -15], scale: .5}, opacity: 0, ease: Power4.easeOut}, .2)

// HERO
const hero_timeline = new TimelineMax();
hero_timeline
  .from('.hero__content', 1, {y: -100, opacity: 0, ease: Power4.easeOut})
  .from('.hero__btn', .25, {width: 0, height: 0, autoAlpha: 0, delay: .5, ease: Power4.easeOut})

// SERVICES
const services_timeline = new TimelineMax();
services_timeline
  .staggerFrom('.service', 1.5, {y: -30, autoAlpha: 0, ease: Power4.easeOut}, .5)
  .staggerFrom('.icon', 1.5, {scale: 3, autoAlpha: 0, ease: Power4.easeOut},.25, '-=2')
  .fromTo('.service-txt', .7, {autoAlpha: 0, y: -10}, {autoAlpha: 1, y: 0, ease: Power4.easeOut})
  services_timeline.timeScale(1.5);

// PORTFOLIO
const portfolio_timeline = new TimelineMax();
portfolio_timeline
  .from('.portfolio__item', 2, {y: 15, skewX: '7', autoAlpha: 0, ease: Power4.easeOut})

// ABOUT
var circle_after = CSSRulePlugin.getRule('.about__item:not(:last-child) .circle::after');
const about_timeline = new TimelineMax();
about_timeline
  .staggerFrom('.about__item', 1, {cycle: {x: [20, -20]}, autoAlpha: 0, ease: Power4.easeOut}, .25)
  .staggerFrom('.about__txt', 1, {cycle: {x: [-20, 20]}, autoAlpha: 0, ease: Power4.easeOut}, .25, '-=2.5')
  .from(circle_after, 1, {cssRule:{height: '0%'}, ease: Power4.easeOut}, '-=.5')


// Scroll behaviour
const controller = new ScrollMagic.Controller();

const services_scene = new ScrollMagic.Scene({
  triggerElement: '#services',
  triggerHook: .2,
  duration: 0
});

services_scene
  .setTween(services_timeline)
  .addTo(controller)
  .reverse(false)

const portfolio_scene = new ScrollMagic.Scene({
  triggerElement: '#portfolio',
  triggerHook: .2,
  duration: 0
});
  
portfolio_scene
  .setTween(portfolio_timeline)
  .addTo(controller)
  .reverse(false)

const about_scene = new ScrollMagic.Scene({
  triggerElement: '#about',
  triggerHook: .2,
  duration: 0
  });

about_scene
  .setTween(about_timeline)
  .addTo(controller)
  .reverse(false)