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

	//show and hide .sub-menu on width > 768
	$body.on('mouseenter focusin', $menuItemWithSubmenu, function() {
		if ($(window).width() > 768) {
			$(this).children('.sub-menu').stop().addClass("js-open").slideDown();
		}
	});

	$body.on('mouseleave focusout', $menuItemWithSubmenu, function() {
		if ($(window).width() > 768) {
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
	*Setup show/hide .main-nav for desktop width < 768px
	*
	*/
	var $navBar = $('#js-main-nav');

	$body.on('click', '#js-nav-btn', function(event) {
		event.preventDefault();

		if( $navBar.hasClass('main-nav_open')) {
			$navBar.removeClass('main-nav_open');
			
		} else {
			$navBar.addClass('main-nav_open');
		}

	});

	$body.on('click', '#js-main-nav', function(event) {
		$navBar.removeClass('main-nav_open');	
	});

	$body.on('click', '.menu', function(event) {
		event.stopPropagation();
	});
	/*
	*
	* end setup .main-nav
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


	/*
	*
	*setup sidebar quizz
	*
	*/
	$body.on('click', '.quizz__list li', function(event){
		if(!$(event.currentTarget).hasClass('selected')) {
			
			$(this)
				.addClass('selected')
				.siblings()
				.removeClass('selected');

			$(this)
				.parent()
				.siblings('.quizz__answer')
				.hide();

			$(this).parent().siblings('.quizz__answer'+'[data-question="' + $(event.currentTarget).parent().data('question') + '"]' + '[data-answer="' + $(event.currentTarget).data('answer') + '"]').show();

		} else {
			$(this).removeClass('selected');
			$(this)
				.parent()
				.siblings('.quizz__answer')
				.hide();
		}
	});
	/*
	*
	*end setup sidebar quizz
	*
	*/


	/*
	*
	*setup .accordion
	*
	*/
		$body.on('click', '.accordion__item', function(event){
			if(!$(event.currentTarget).hasClass('opened')) {
				$('.accordion__item').removeClass('opened');
				$('.accordion__item-body').stop().slideUp();
				$(this).addClass('opened').find('.accordion__item-body').slideDown();
			} else {
				$('.accordion__item-body').stop().slideUp();
				$(this).removeClass('opened');
			}
		});
	/*
	*
	*end setup .accordion
	*
	*/
	


})(jQuery);
