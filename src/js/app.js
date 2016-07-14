//Common scripts


//ie fix
if(!(window.console && console.log)) {
	console = {
		log: function(){},
		debug: function(){},
		info: function(){},
		warn: function(){},
		error: function(){}
	};
}


(function () {
	var $body = $('body');

	/*
	*
	* setup .menu
	*
	*/

	var $menuItemWithSubmenu = '.menu>li:has( > .sub-menu)';

	//show and hide .sub-menu on width > 900
	$body.on('mouseenter focusin', $menuItemWithSubmenu, function() {
		if ($(window).width() > 900) {
			$(this).children('.sub-menu').stop().addClass("js-open").slideDown();
		}
	});

	$body.on('mouseleave focusout', $menuItemWithSubmenu, function() {
		if ($(window).width() > 900) {
			$(this).children('.sub-menu').stop().removeClass('js-open').slideUp();
		}
	});

	/*
	*
	* end setup .menu
	*
	*/


	/*
	*
	*Setup show/hide navbar for desktop width < 900px
	*
	*/
	var $navBtn = $('#mobile-btn'),
		$navBar = $('#navbar');

	$body.on('click', '#mobile-btn', function(event) {
		event.preventDefault();

		if( $navBar.hasClass('js-nav-open')) {
			$navBar.removeClass('js-nav-open').slideUp();
			$navBtn.removeClass('topline__mobile-btn_navigation-close');
		} else {
			$navBar.addClass('js-nav-open').slideDown();
			$navBtn.addClass('topline__mobile-btn_navigation-close');
		}

	});
	/*
	*
	* end setup .navbar
	*
	*/

	/*
	*
	*Hide .topline block
	*
	*/
	$body.on('click', '#js-topline-close-btn', function(event) {
		event.preventDefault();
		$('#js-topline-wrap').slideUp();
	});


	/*
	*
	*Hide .topline-mobile block
	*
	*/
	$body.on('click', '#js-topline-mobile-close-btn', function(event) {
		event.preventDefault();
		$('#js-topline-mobile').hide();
	});
	


})(jQuery);
