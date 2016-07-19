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


	/*
	*
	*setup .filter
	*
	*/

	//setup select menu
	$body.on('click', '#filter-select', function(event){
		if($(this).hasClass('js-opened')) {
			$(this).removeClass('js-opened');
			$('#filter-list').slideUp();
		} else {
			$(this).addClass('js-opened');
			$('#filter-list').slideDown();
		}
	});

	//hide filter list then click outside select menu
	$body.on('click', function(event){
		$('#filter-select').removeClass('js-opened');
		$('#filter-list').slideUp();
	});

	$body.on('click', '#filter-select', function(event){
		event.stopPropagation();
	});

	//setup filter
	$body.on('click', '#filter-list li', function(event){
		//change text
		var filterOptionText = $(this).text();
		$('#filter-text').text(filterOptionText);

		//default status for .filter__item`s
		makeFilterItemsDefault();

		var filterValue = $(this).attr('data-filter');
		$('.filter__body').isotope({ filter: filterValue });

	});

	var makeFilterItemsDefault = function(){
		$('.filter__item').removeClass('filter__item_selected');
		$('.filter__item-img').removeClass('filter__item-img_show');
		$('.filter__item-answer').hide();
	};

	//setup isotope
	setTimeout(function(){
		$('.filter__body').isotope({
			itemSelector: '.filter__item',
			layoutMode: 'masonry',
			masonry: {
				columnWidth: 1,
				isOriginLeft: true,
				gutter:0
			}
		});
	}, 200);

	//setup items
	$body.on('click', '.filter__item', function(event){
		if($(this).hasClass('filter__item_selected')) {
			makeFilterItemsDefault();
		} else {
			$('.filter__item').removeClass('filter__item_selected');
			$(this).addClass('filter__item_selected');
			$('.filter__item-img').addClass('filter__item-img_show');
			$(this).find('.filter__item-img').removeClass('filter__item-img_show');

			var $thisAnswer = $(this).find('.filter__item-answer');
			var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

			if ( parseInt($(this).offset().left) < parseInt(width/2) ) {
				$thisAnswer.css("left", "90%");
				$thisAnswer.find('img').css("left", "-23px");
				$thisAnswer.find('img').attr("src", "images/box_answer_fleche_left.png");
			} else {
				$thisAnswer.css("left", "-200px");
				$thisAnswer.find('img').css("left", "100%");
				$thisAnswer.find('img').attr("src", "images/box_answer_fleche_right.png");
			}

			$('.filter__item-answer').hide();
			$thisAnswer.show();
		}
	});

	$body.on('click', function(event){
		makeFilterItemsDefault();
	});

	$body.on('click', '.filter__item', function(event){
		event.stopPropagation();
	});


})(jQuery);
