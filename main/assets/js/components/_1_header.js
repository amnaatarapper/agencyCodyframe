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