// Utility function
function Util () {};

/* 
	class manipulation functions
*/
Util.hasClass = function(el, className) {
	if (el.classList) return el.classList.contains(className);
	else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};

Util.addClass = function(el, className) {
	var classList = className.split(' ');
 	if (el.classList) el.classList.add(classList[0]);
 	else if (!Util.hasClass(el, classList[0])) el.className += " " + classList[0];
 	if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
};

Util.removeClass = function(el, className) {
	var classList = className.split(' ');
	if (el.classList) el.classList.remove(classList[0]);	
	else if(Util.hasClass(el, classList[0])) {
		var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
		el.className=el.className.replace(reg, ' ');
	}
	if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' '));
};

Util.toggleClass = function(el, className, bool) {
	if(bool) Util.addClass(el, className);
	else Util.removeClass(el, className);
};

Util.setAttributes = function(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
};

/* 
  DOM manipulation
*/
Util.getChildrenByClassName = function(el, className) {
  var children = el.children,
    childrenByClass = [];
  for (var i = 0; i < el.children.length; i++) {
    if (Util.hasClass(el.children[i], className)) childrenByClass.push(el.children[i]);
  }
  return childrenByClass;
};

Util.is = function(elem, selector) {
  if(selector.nodeType){
    return elem === selector;
  }

  var qa = (typeof(selector) === 'string' ? document.querySelectorAll(selector) : selector),
    length = qa.length,
    returnArr = [];

  while(length--){
    if(qa[length] === elem){
      return true;
    }
  }

  return false;
};

/* 
	Animate height of an element
*/
Util.setHeight = function(start, to, element, duration, cb) {
	var change = to - start,
	    currentTime = null;

  var animateHeight = function(timestamp){  
    if (!currentTime) currentTime = timestamp;         
    var progress = timestamp - currentTime;
    var val = parseInt((progress/duration)*change + start);
    element.style.height = val+"px";
    if(progress < duration) {
        window.requestAnimationFrame(animateHeight);
    } else {
    	cb();
    }
  };
  
  //set the height of the element before starting animation -> fix bug on Safari
  element.style.height = start+"px";
  window.requestAnimationFrame(animateHeight);
};

/* 
	Smooth Scroll
*/

Util.scrollTo = function(final, duration, cb, scrollEl) {
  var element = scrollEl || window;
  var start = element.scrollTop || document.documentElement.scrollTop,
    currentTime = null;

  if(!scrollEl) start = window.scrollY || document.documentElement.scrollTop;
      
  var animateScroll = function(timestamp){
  	if (!currentTime) currentTime = timestamp;        
    var progress = timestamp - currentTime;
    if(progress > duration) progress = duration;
    var val = Math.easeInOutQuad(progress, start, final-start, duration);
    element.scrollTo(0, val);
    if(progress < duration) {
        window.requestAnimationFrame(animateScroll);
    } else {
      cb && cb();
    }
  };

  window.requestAnimationFrame(animateScroll);
};

/* 
  Focus utility classes
*/

//Move focus to an element
Util.moveFocus = function (element) {
  if( !element ) element = document.getElementsByTagName("body")[0];
  element.focus();
  if (document.activeElement !== element) {
    element.setAttribute('tabindex','-1');
    element.focus();
  }
};

/* 
  Misc
*/

Util.getIndexInArray = function(array, el) {
  return Array.prototype.indexOf.call(array, el);
};

Util.cssSupports = function(property, value) {
  if('CSS' in window) {
    return CSS.supports(property, value);
  } else {
    var jsProperty = property.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase();});
    return jsProperty in document.body.style;
  }
};

// merge a set of user options into plugin defaults
// https://gomakethings.com/vanilla-javascript-version-of-jquery-extend/
Util.extend = function() {
  // Variables
  var extended = {};
  var deep = false;
  var i = 0;
  var length = arguments.length;

  // Check if a deep merge
  if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
    deep = arguments[0];
    i++;
  }

  // Merge the object into the extended object
  var merge = function (obj) {
    for ( var prop in obj ) {
      if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
        // If deep merge and property is an object, merge properties
        if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
          extended[prop] = extend( true, extended[prop], obj[prop] );
        } else {
          extended[prop] = obj[prop];
        }
      }
    }
  };

  // Loop through each object and conduct a merge
  for ( ; i < length; i++ ) {
    var obj = arguments[i];
    merge(obj);
  }

  return extended;
};

// Check if Reduced Motion is enabled
Util.osHasReducedMotion = function() {
  if(!window.matchMedia) return false;
  var matchMediaObj = window.matchMedia('(prefers-reduced-motion: reduce)');
  if(matchMediaObj) return matchMediaObj.matches;
  return false; // return false if not supported
}; 

/* 
	Polyfills
*/
//Closest() method
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
	Element.prototype.closest = function(s) {
		var el = this;
		if (!document.documentElement.contains(el)) return null;
		do {
			if (el.matches(s)) return el;
			el = el.parentElement || el.parentNode;
		} while (el !== null && el.nodeType === 1); 
		return null;
	};
}

//Custom Event() constructor
if ( typeof window.CustomEvent !== "function" ) {

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
}

/* 
	Animation curves
*/
Math.easeInOutQuad = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};


/* JS Utility Classes */
(function() {
  // make focus ring visible only for keyboard navigation (i.e., tab key) 
  var focusTab = document.getElementsByClassName('js-tab-focus');
  function detectClick() {
    if(focusTab.length > 0) {
      resetFocusTabs(false);
      window.addEventListener('keydown', detectTab);
    }
    window.removeEventListener('mousedown', detectClick);
  };

  function detectTab(event) {
    if(event.keyCode !== 9) return;
    resetFocusTabs(true);
    window.removeEventListener('keydown', detectTab);
    window.addEventListener('mousedown', detectClick);
  };

  function resetFocusTabs(bool) {
    var outlineStyle = bool ? '' : 'none';
    for(var i = 0; i < focusTab.length; i++) {
      focusTab[i].style.setProperty('outline', outlineStyle);
    }
  };
  window.addEventListener('mousedown', detectClick);
}());
// File#: _1_header
// Usage: codyhouse.co/license
(function() {
	var mainHeader = document.getElementsByClassName('js-header')[0];
	if( mainHeader ) {
		var trigger = mainHeader.getElementsByClassName('js-header__trigger')[0],
			nav = mainHeader.getElementsByClassName('js-header__nav')[0];

		// we'll use these to store the node that needs to receive focus when the mobile menu is closed 
		var focusMenu = false;

		//detect click on nav trigger
		trigger.addEventListener("click", function(event) {
			event.preventDefault();
			var ariaExpanded = !Util.hasClass(nav, 'header__nav--is-visible');
			//show nav and update button aria value
			Util.toggleClass(nav, 'header__nav--is-visible', ariaExpanded);
			trigger.setAttribute('aria-expanded', ariaExpanded);
			if(ariaExpanded) { //opening menu -> move focus to first element inside nav
				nav.querySelectorAll('[href], input:not([disabled]), button:not([disabled])')[0].focus();
			} else if(focusMenu) {
				focusMenu.focus();
				focusMenu = false;
			}
		});
		// listen for key events
		window.addEventListener('keyup', function(event){
			// listen for esc key
			if( (event.keyCode && event.keyCode == 27) || (event.key && event.key.toLowerCase() == 'escape' )) {
				// close navigation on mobile if open
				if(trigger.getAttribute('aria-expanded') == 'true' && isVisible(trigger)) {
					focusMenu = trigger; // move focus to menu trigger when menu is close
					trigger.click();
				}
			}
			// listen for tab key
			if( (event.keyCode && event.keyCode == 9) || (event.key && event.key.toLowerCase() == 'tab' )) {
				// close navigation on mobile if open when nav loses focus
				if(trigger.getAttribute('aria-expanded') == 'true' && isVisible(trigger) && !document.activeElement.closest('.js-header')) trigger.click();
			}
		});
	}

	function isVisible(element) {
		return (element.offsetWidth || element.offsetHeight || element.getClientRects().length);
	};
}());
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
const bodyHeight = window.getComputedStyle(body).getPropertyValue('height');
const contactHeight = window.getComputedStyle(contact).getPropertyValue('height');
const scrollableHeight = window.pageYOffset;
const progressBar = document.querySelector('.progress-bar');

/* -------------------------------------------------------------------------- */
/*                                     NAV                                    */
/* -------------------------------------------------------------------------- */
window.addEventListener('scroll', () => {
  // NAV
  let header = document.querySelector('header');
  header.classList.toggle('scroll', window.scrollY > 0);

  // PROGRESS BAR
  let scrollProgression = Math.ceil(((window.scrollY * 100) / scrollableHeight));
  progressBar.style.width = scrollProgression+'vw';
  progressBar.style.backgroundColor = `hsl(${scrollProgression*3.6}, 100%, 50%)`;
});

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

    if (prev && prev.childNodes[3].classList.contains('circle')) {
      prev.childNodes[3].style.transform = 'scale(1)';
    }

    current.childNodes[3].style.transform = 'scale(1)';

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
  .addIndicators()
  .reverse(false)

const portfolio_scene = new ScrollMagic.Scene({
  triggerElement: '#portfolio',
  triggerHook: .2,
  duration: 0
});
  
portfolio_scene
  .setTween(portfolio_timeline)
  .addTo(controller)
  .addIndicators()
  .reverse(false)

const about_scene = new ScrollMagic.Scene({
  triggerElement: '#about',
  triggerHook: .2,
  duration: 0
  });

about_scene
  .setTween(about_timeline)
  .addTo(controller)
  .addIndicators()
  .reverse(false)


