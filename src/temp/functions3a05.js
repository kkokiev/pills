//Création de la variable globale Cookie
var Cookie = {
	read: function(name) {
		var data, result = "null";
		var cookie = document.cookie.split("; ");
		for(i in cookie) {
			data = cookie[i].split("=");
			if(name == data[0]) {
				result = data[1];
				break;
			}
		}
		return result;
	},
	write: function(name, value, days) {
		var cookie;
		if(days == null) {
			cookie = name + "=" + value + "; domain="+location.host+"; path=/";
		}
		else {
			var date = new Date().getTime() + 1000*3600*24*days;
			var expires = new Date(date).toUTCString();
			cookie = name + "=" + value + "; expires=" + expires + "; domain="+location.host+"; path=/";
		}
		document.cookie = cookie;
	}
};
//Au chargement de la page
$(document).ready(function () {
	$('a').click(function(e) {
        e.preventDefault();
        externalLinkDisclaimer($(e.currentTarget));
    });

    $('#disclaimer .link').find(".left").click(function(e) {
        $("#disclaimer").hide();//background link
        $("#disclaimer .link").hide();
        window.open($(e.currentTarget).data("href"), "_blank");
    });

	//==== FERMETURE SELECT ===== //
	$(document).click(function(e) {
		//console.log($(e.target));
		if($(e.target).parent().attr("id") != 'language') {
			$("#language").children("ul").slideUp();
			setTimeout(function() {$("#language").removeClass("selected");}, 380);
		}
		if($(e.target).parent().attr("id") != 'method_choice' && $(e.target).attr("id") != 'method_choice') {
			$("#method_choice").children("ul").slideUp();
			setTimeout(function() {$("#method_choice").removeClass("selected");}, 380);
		}
		if($(e.target).parent().attr("id") != 'quizz_selection_sex') {
			$("#quizz_selection_sex").children("ul").slideUp();
			setTimeout(function() {$("#quizz_selection_sex").removeClass("selected");}, 380);
		}
	});

// ===== HEADER - MENU PRINCIPAL ===== //
	//Mise en surbrillance de la catégorie courante dans le main menu
	$.each( $('#master_nav > div > ul > li > ul > li > a'), function(i, val) {
		if( document.URL.indexOf($(this).attr("href")) != -1) {
			$(this).parent().parent().parent().addClass('selected');
		}
	});
	//Affichage des logos dans le main menu
	$.each( $('#master_nav > div > ul > li > a'), function(i, val) {
		if($(this).attr("title"))
			$(this).html('<span>&#xe6'+$(this).attr("title")+';</span><br />'+$(this).html());
		if($(this).attr("title") == '0c') {
			if($(this).parent().hasClass('selected')) {
				$(this).parent().css('color', '#458889');
			}
			$(this).parent().hover(function() {
				$(this).css('color', '#458889');
			}, function() {
				if($(this).hasClass('selected')) {
					$(this).css('color', '#458889');
				} else {
					$(this).css('color', 'black');
				}
			});
		}
		$(this).attr("title", "");
	});
	
	//retire les liens sur les tablette qui affiche le site en mode desktop
	$("#master_nav > div > ul > li > a").click(function (e) {
		var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		if($('html').hasClass('mobile') && width > 768) {
			if($(e.currentTarget).parent().children('ul').length == 1) {
                e.preventDefault();
            }
		}
	});

	//Ouverture des sous menu dans le main menu
	$("#master_nav > div > ul > li").hover(function(e) {
		e.stopPropagation();
		$(this).children("ul").stop( true, true ).slideDown();
	}, function() {
		$("#master_nav > div > ul > li").children("ul").slideUp();
	});
	
// ===== HEADER - MENU LANGUE ===== //
	//Ouverture du menu langue en header
	$("#language").click(function(e){
		if(!$(e.currentTarget).hasClass("selected")) {
			$(e.currentTarget).addClass("selected");
			$(e.currentTarget).children("ul").slideDown();
		} else {
			$(e.currentTarget).children("ul").slideUp();
			setTimeout(function() {$(e.currentTarget).removeClass("selected");}, 380);
		}
	});

// ====== HEADER - COOKIE DISCLAIMER ====== //
	//On check si on a un cookie si oui on masque le message en header
	if(Cookie.read('cookieDisclaimer') == "null") {
		$('#surheader p').css('display','inline-block');
    	if(document.documentElement.clientWidth < 767) {
			$('#surheader_mobile').css('display','block');
		}
	}
	//Quand on ferme le disclaimer Cookie on set un cookie
	$('.close_cookie_disclaimer').click(function() {
		$('#surheader p').slideUp();
		$('#surheader_mobile').css('display','none');
		Cookie.write('cookieDisclaimer', "true", 365);
	});

// ===== FOOTER ===== //
	//Retire le dernier "/" du menu en footer
	//$('#footer_nav ul li').last().text($('#footer_nav ul li').last().text().substring(0,$('#footer_nav ul li').last().text().length-3));
	
	if(navigator.userAgent.match("MSIE 8") == null) {
		var footer = document.getElementById("footer_nav").childNodes[1].childNodes;
		footer[footer.length-2].childNodes[1].nodeValue = "";
	}

// ===== TEMPLATE - MYTH ===== //
	//Ouverture des réponses dans myth
	$(".myth li").click(function(e){
		if(!$("html").hasClass('mobile')) {
			if(!$(e.currentTarget).hasClass("selected")) {
				$(".myth li").children(".answer").slideUp();
				$(".myth li").removeClass("selected");
				$(e.currentTarget).addClass("selected");
				$(e.currentTarget).children(".answer").slideDown();
			} else {
				$(e.currentTarget).children(".answer").slideUp();
				$(".myth li").removeClass("selected");
			}
		} else {
			if(!$(e.currentTarget).hasClass("selected")) {
				$(".myth li").children(".answer").hide();
				$(".myth li").removeClass("selected");
				$(e.currentTarget).addClass("selected");
				$(e.currentTarget).children(".answer").show();
			} else {
				$(e.currentTarget).children(".answer").hide();
				$(".myth li").removeClass("selected");
			}
		}
	});
	
// ===== POPIN - DISPATCH DISCLAIMER ===== //
	//Affichage du dispatch disclaimer à l'arrivée sur le site
	
	if($("#container").hasClass('en-US')) {
		if(Cookie.read('dispatchDisclaimerFemme') == "null") {
			$('#disclaimer').css('display','block');
			$('#disclaimer .dispatch').css('display','block');
			if(document.documentElement.clientWidth < 767) {
				$('#header').css('display','none');
				$('#container').css('display','none');
				$('#disclaimer .dispatch').css({'top':'0px' , 'left':'0px'});
			} else {
				if($('html').hasClass('ipad')) {
					$('#disclaimer .dispatch').css({'top':(window.innerHeight/2)-($('#disclaimer .dispatch').height()/2)+'px' , 'left':(window.innerWidth/2)-($('#disclaimer .dispatch').width()/2)+'px'});	
				} else {
					$('#disclaimer .dispatch').css({'top':($(window).height()/2)-($('#disclaimer .dispatch').height()/2)+'px' , 'left':($(window).width()/2)-($('#disclaimer .dispatch').width()/2)+'px'});
				}
			}
		} else {
			if(Cookie.read('redirect') == "null") {
				Cookie.write('redirect', 'redirected', null);
				if(document.location.href.indexOf('wp-admin') == -1) {
					if(Cookie.read('dispatchDisclaimerFemme') != document.location.href) {
						document.location.href=Cookie.read('dispatchDisclaimerFemme');
					}
				}
			}
		}
	}
	//Ouverture du menu dans le dispatch pays
	$("#disclaimer .menu span").click(function(e){
		if(!$(e.currentTarget).hasClass("selected")) {
			$(e.currentTarget).addClass("selected");
			$(e.currentTarget).next('ul').slideDown();
		} else {
			$(e.currentTarget).next('ul').slideUp();
			setTimeout(function() {$(e.currentTarget).removeClass("selected");}, 380);
		}
	});
	//Affichage du dispatch disclaimer au click dans le footer
	$(document).on('click', '.open_dispatch', function(e) { 
		$('#disclaimer').css('display','block');
		$('#disclaimer .dispatch').css('display','block');
		if(document.documentElement.clientWidth < 767) {
			$('#header').css('display','none');
			$('#container').css('display','none');
			$('#disclaimer .dispatch').css({'top':'0px' , 'left':'0px'});
		} else {
			if($('html').hasClass('ipad')) {
				$('#disclaimer .dispatch').css({'top':(window.innerHeight/2)-($('#disclaimer .dispatch').height()/2)+'px' , 'left':(window.innerWidth/2)-($('#disclaimer .dispatch').width()/2)+'px'});	
			} else {
				$('#disclaimer .dispatch').css({'top':($(window).height()/2)-($('#disclaimer .dispatch').height()/2)+'px' , 'left':($(window).width()/2)-($('#disclaimer .dispatch').width()/2)+'px'});	
			}
		}
	});
	//Fermeture du dispatch disclaimer
	$('#disclaimer .dispatch .close').click(function() {
		Cookie.write('dispatchDisclaimerFemme', document.location.href, 365);
		Cookie.write('redirect', 'redirected', null);
		$('#disclaimer').css('display','none');
		$('#disclaimer .dispatch').css('display','none');
		//For mobile
		$('#header').css('display','block');
		$('#container').css('display','block');
	});
	//Fermeture du dispatch disclaimer
	/*$('#disclaimer').click(function() {
		$('#disclaimer').css('display','none');
		$('#disclaimer .dispatch').css('display','none');
		//For mobile
		$('#header').css('display','block');
		$('#container').css('display','block');
	});*/
	//Choix de la redirection dans le dispatch disclaimer
	$('#disclaimer .dispatch .menu a').click(function(e) {
		e.preventDefault();
		Cookie.write('dispatchDisclaimerFemme', $(e.currentTarget).attr('href'), 365);
		Cookie.write('redirect', 'redirected', null);
		document.location.href=$(e.currentTarget).attr('href');
	});

// ===== POPIN - LINK DISCLAIMER ===== //
	//Fonction de close des disclaimer
	$('#disclaimer .link .close').click(function() {
		//For mobile
		$('#header').css('display','block');
		$('#container').css('display','block');
		//For all
		$('#disclaimer').css('display','none');
		$('#disclaimer .link').css('display','none');
		$('#disclaimer .dispatch').css('display','none');
	});

// ===== SIDEBAR - QUIZZ ===== //
	//Gère l'affichage dans le module quizz
	$(".quizz_selection li").click(function(e){
		if(!$(e.currentTarget).hasClass("selected")) {
			$(e.currentTarget).parent().parent().find('ul'+'[data-question="' + $(e.currentTarget).parent().data('question') + '"]').children().removeClass('selected');
			$(e.currentTarget).addClass("selected");
			$(e.currentTarget).parent().parent().find('.quizz_selection_answer'+'[data-question="' + $(e.currentTarget).parent().data('question') + '"]').css('display','none');
			$(e.currentTarget).parent().parent().find('.quizz_selection_answer'+'[data-question="' + $(e.currentTarget).parent().data('question') + '"]' + '[data-answer="' + $(e.currentTarget).data('answer') + '"]').css('display','block');
		} else {
			$(e.currentTarget).removeClass("selected");
			$(e.currentTarget).parent().parent().find('.quizz_selection_answer'+'[data-question="' + $(e.currentTarget).parent().data('question') + '"]').css('display','none');
		}
	});

// ===== SIDEBAR - ACCIDENT HAPPEN QUIZZ ===== //
	//Gère l'affichage dans le module Accident happen quizz
	$("#quizz_selection_sex").click(function(e){
		if(!$(e.currentTarget).hasClass("selected")) {
			$(e.currentTarget).addClass("selected");
			$(e.currentTarget).children("ul").slideDown();
		} else {
			$(e.currentTarget).children("ul").slideUp();
			setTimeout(function() {$(e.currentTarget).removeClass("selected");}, 380);
		}
	});
	$("#quizz_selection_sex li").click(function(e) {
		$('.quizz_selection_sex_answer').css('display','none');
		$('#quizz_selection_sex_'+$(e.currentTarget).data('answer')).css('display','block');
		$('#accident_happen_quizz_selection').html($(e.currentTarget).html());
	});

    //Positionnement du disclaimer dispatch
    if($('html').hasClass('ipad')) {
		$('#pop_video .background').css({'top':(window.innerHeight/2)-($('#pop_video .background').height()/2) , 'left':(window.innerWidth/2)-($('#pop_video .background').width()/2)});
		//$('#pop_video_menu .background').css({'margin-top':(window.innerHeight/2)-($('#pop_video_menu .background').height()/2) , 'left':(window.innerWidth/2)-($('#pop_video_menu .background').width()/2)});
	} else {
    	$('#pop_video .background').css({'top':($(window).height()/2)-($('#pop_video .background').height()/2)+'px' , 'left':($(window).width()/2)-($('#pop_video .background').width()/2)+'px'});
    	//$('#pop_video_menu .background').css({'top':($(window).height()/2)-($('#pop_video_menu .background').height()/2)+'px' , 'left':($(window).width()/2)-($('#pop_video_menu .background').width()/2)+'px'});
    }
    //Fonction de close de la pop_video
    var popVidEnCours = $('#pop_video .encours').html();
    $('#pop_video .close').click(function() {
    	popVidEnCours = $('#pop_video .encours').html();
    	$('#pop_video').addClass('closed');
        $('#pop_video').css('display','none');
        $('#pop_video .encours').html('');
        //For mobile
		$('#header').css('display','block');
		$('#container').css('display','block');
    });

    var popVidEnCours = $('#pop_video_menu .encours').html();
    $('#pop_video_menu .close').click(function() {
    	popVidEnCours = $('#pop_video_menu .encours').html();
    	$('#pop_video_menu').addClass('closed');
        $('#pop_video_menu').css('display','none');
        $('#pop_video_menu .encours').html('');
        //For mobile
		$('#header').css('display','block');
		$('#container').css('display','block');
    });

    //Fonction d'affichage de la pop_video
    $(document).on('click', '.open_popin_video', function(e) {
    	if($('#pop_video').hasClass('closed')) {
    		$('#pop_video .encours').html(popVidEnCours);
    		$('#pop_video').removeClass('closed');
    	}
        $('#pop_video').css('display','block');
    	if(document.documentElement.clientWidth < 767) {
			$('#header').css('display','none');
			$('#container').css('display','none');
			$('#pop_video .background').css({'top':'0px' , 'left':'0px'});
		} else {
			if($('html').hasClass('ipad')) {
				$('#pop_video .background').css({'top':(window.innerHeight/2)-($('#pop_video .background').height()/2) , 'left':(window.innerWidth/2)-($('#pop_video .background').width()/2)});
			} else {
				$('#pop_video .background').css({'top':($(window).height()/2)-($('#pop_video .background').height()/2) , 'left':($(window).width()/2)-($('#pop_video .background').width()/2)});
			}
		}
    });

    $(document).on('click', '.open_popin_video_menu', function(e) {
    	e.preventDefault();
    	if($('#pop_video_menu').hasClass('closed')) {
    		$('#pop_video_menu .encours').html(popVidEnCours);
    		$('#pop_video_menu').removeClass('closed');
    	}
        $('#pop_video_menu').css('display','block');
    	if(document.documentElement.clientWidth < 767) {
			$('#header').css('display','none');
			$('#container').css('display','none');
			$('#pop_video_menu .background').css({"margin-left": "-"+($('#pop_video_menu .background').innerWidth()/2)+"px", "margin-top": "-"+($('#pop_video_menu .background').innerHeight()/2)+"px"});
			$('#pop_video_menu .background').find('iframe').css({"width":($('#pop_video_menu .background').innerWidth()-70)+"px"});
		} else {
			$('#pop_video_menu .background').css({"margin-left": "-"+($('#pop_video_menu .background').innerWidth()/2)+"px", "margin-top": "-"+($('#pop_video_menu .background').innerHeight()/2)+"px"});
			$('#pop_video_menu .background').find('iframe').css({"width":($('#pop_video_menu .background').innerWidth()-70)+"px"});
		}
    });

    /* ---- VIDEO PLAYER ---- */
    $(".video.second").click(function(){
        var newVideoUrl = $(this).data("video-url");
        var oldVideoUrl = $(".video.encours iframe");
        $(".video.encours").html(newVideoUrl);
        $(this).data("video-url", oldVideoUrl);

        var newImgSrc = $(this).find("img").attr("src");
        var oldImgSrc = $(".video.encours").data("img-url");
        $(".video.encours").data("img-url", newImgSrc);
        $(this).find("img").attr("src", oldImgSrc);
    });

    $(".direction.next").click(function(){
        var currentPage = $(this).data("current-page");
        var nbVideoPage = $(this).data("nb-video-page");
        var nextPage = parseInt(currentPage + 1);
        if(currentPage == nbVideoPage){
            $(this).data("current-page", 1);
            $(".direction.previous").data("current-page", 1);
            $(".video-page").css("display", "none");
            $(".video-page-1").css("display", "block");
        }else{
            $(".video-page").css("display", "none");
            $(".video-page-" + nextPage).css("display", "block");
            $(this).data("current-page", nextPage);
            $(".direction.previous").data("current-page", nextPage);
        }
        //console.log($(this).data("current-page"));
    });
    $(".direction.previous").click(function(){
        var currentPage = $(this).data("current-page");
        var nbVideoPage = $(this).data("nb-video-page");
        var nextPage = parseInt(currentPage - 1);
        if(currentPage == 1){
            $(this).data("current-page", nbVideoPage);
            $(".direction.next").data("current-page", nbVideoPage);
            $(".video-page").css("display", "none");
            $(".video-page-" + nbVideoPage).css("display", "block");
        }else{
            $(".video-page").css("display", "none");
            $(".video-page-" + nextPage).css("display", "block");
            $(this).data("current-page", nextPage);
            $(".direction.next").data("current-page", nextPage);
        }
    });


    /**********************************************************************************************************/
    /**********************************************************************************************************/
    /*********************************************** MOBILE ***************************************************/
    /**********************************************************************************************************/
    /**********************************************************************************************************/
    if(document.documentElement.clientWidth < 767) {
    	$("html").addClass('ellamobile');
    	if($("html").hasClass('iphone')) {
    		if ($('#myViewport').attr('content') != 'width=device-width, user-scalable=no') {
    			$('#myViewport').attr('content', 'width=device-width, user-scalable=no')
    		}
    	} else {
	    	if ($('#myViewport').attr('content') != 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no') {
	    		$('#myViewport').attr('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
	    	}
	    }
    } else {
    	$("html").removeClass('ellamobile');
    	if($('html').hasClass('android') && navigator.userAgent.indexOf('Chrome') == '-1') {
    		if ($('#myViewport').attr('content') != 'width=device-width, initial-scale=0.1') {
    			$('#myViewport').attr('content', 'width=device-width, initial-scale=0.1');
    		}
    	} else {
    		if ($('#myViewport').attr('content') != 'width=device-width') {
    			$('#myViewport').attr('content', 'width=device-width');
    		}
    	}
   	}

    $(".mobile_menu_button").click(function() {displayMenuMobile("menu")});
    $("#back_mobile_menu").click(function() {displayMenuMobile("back")});
    $("#logo").click(function() {displayMenuMobile("logo")});

    myTab = $(".ellamobile #content .entry-content table");
    var tableContent, formEl, inpt1, inpt2, btn;

    $.each(myTab, function(index, object) {
        tableContent = $(object).html();
        $(object).html("");
        $(object).html('<p style="displaykey: "value", block; text-decoration:underline;" class="table_remplacement submit_table">Click here to see this content</p>');
        formEl = $("<form />");
        formEl.attr("class", "form_table");
        formEl.attr("name", "table_remplacement");
        formEl.attr("action", "/tables/table_template.php");
        formEl.attr("method", "POST");
        $(object).append(formEl);
        inpt1 = $('<input class="table_value" name="my_table" type="hidden" value="">');
        inpt2 = $('<input class="table_from" name="page_from" type="hidden" value="'+window.location.href+'">');
        formEl.append(inpt1);
        formEl.append(inpt2);
        formEl.append(btn);
        $(object).show();
        console.log(tableContent);
    });
    $(".submit_table").click(function (e) {
        $('.table_value').val('<table>'+tableContent+'</table>');
        $('.form_table').submit();
    });

    /**********************************************************************************************************/
    /**********************************************************************************************************/
    /****************************************** GOOGLE ANALYTICS **********************************************/
    /**********************************************************************************************************/
    /**********************************************************************************************************/
    var event_GA = 'notset';
    if($("html").hasClass('mobile') && document.documentElement.clientWidth < 767) {
        event_GA = 'touch_mobile';
    } else if($("html").hasClass('mobile') && document.documentElement.clientWidth >= 767) {
        event_GA = 'touch_tablet';
    } else if (document.documentElement.clientWidth < 767) {
        event_GA = 'click_mobile';
    } else {
        event_GA = 'click';
    }
    /* MENUS */
        $("#logo a").click(function (e) { ga('send', 'event', 'menu', event_GA, 'Main : Logo ('+$(e.currentTarget).attr('href')+')' ); });
        $("#master_nav a").click(function (e) { ga('send', 'event', 'menu', event_GA, 'Main : '+$(e.currentTarget).text()+' ('+$(e.currentTarget).attr('href')+')' ); });
        $("#mobile_menu a").click(function (e) { ga('send', 'event', 'menu', event_GA, 'Main : '+$(e.currentTarget).text()+' ('+$(e.currentTarget).attr('href')+')' ); });
        $("#language a").click(function (e) { ga('send', 'event', 'menu', event_GA, 'Language : '+$(e.currentTarget).text()+' ('+$(e.currentTarget).attr('href')+')' ); });
        $("#footer_nav a").click(function (e) { ga('send', 'event', 'menu', event_GA, 'Footer : '+$(e.currentTarget).text()+' ('+$(e.currentTarget).attr('href')+')' ); });
        $("#popin_disclaimer_menu_select_country a").click(function (e) { ga('send', 'event', 'menu', event_GA, 'Country Disclaimer : '+$(e.currentTarget).text()+' ('+$(e.currentTarget).attr('href')+')' ); });
    /* BUTTONS */
        $(".mobile_menu_button").click(function (e) { ga('send', 'event', 'button', event_GA, 'Open menu mobile' ); });
        $("#footer .open_dispatch").click(function (e) { ga('send', 'event', 'button', event_GA, 'Country Disclaimer : open with footer button' ); });
        $(".dispatch .close").click(function (e) { ga('send', 'event', 'button', event_GA, 'Country Disclaimer : '+$(e.currentTarget).text() ); });
        $("#surheader .close_cookie_disclaimer").click(function (e) { ga('send', 'event', 'button', event_GA, 'Cookie Disclaimer : '+$(e.currentTarget).text() ); });
        $("#surheader_mobile .close_cookie_disclaimer").click(function (e) { ga('send', 'event', 'button', event_GA, 'Cookie Disclaimer : '+$(e.currentTarget).text() ); });
        $(".myth ul li").click(function (e) { ga('send', 'event', 'button', event_GA, 'Myth : '+$(e.currentTarget).text() ); });
        $("#masonry_container .item").click(function (e) { ga('send', 'event', 'button', event_GA, 'Regular Contraception : '+$(e.currentTarget).text() ); });
        $(".regular_contraception .mobile_el .item_mobile").click(function (e) { ga('send', 'event', 'link', event_GA, 'Regular Contraception Mobile : '+$(e.currentTarget).text() ); });
        $("#disclaimer .link .left").click(function (e) { ga('send', 'event', 'button', event_GA, 'Link Disclaimer : '+$(e.currentTarget).text() ); });
        $("#disclaimer .link .right").click(function (e) { ga('send', 'event', 'button', event_GA, 'Link Disclaimer : '+$(e.currentTarget).text() ); });
        $("#pop_video .close").click(function (e) { ga('send', 'event', 'button', event_GA, 'Popin Video : close' ); });
        $("#pop_video .video.second").click(function (e) { ga('send', 'event', 'button', event_GA, 'Popin Video : Video '+$(e.currentTarget).data('img-video-url') ); });
        $("#content_case_studie_desktop #tagline .case_unselected").click(function (e) { ga('send', 'event', 'button', event_GA, 'Case studies : '+$(e.currentTarget).attr('id') ); });
        $("#content_case_studie_desktop #tagline .arrows next").click(function (e) { ga('send', 'event', 'button', event_GA, 'Case studies : next' ); });
        $("#content_case_studie_desktop #tagline .arrows previous").click(function (e) { ga('send', 'event', 'button', event_GA, 'Case studies : previous'+$(e.currentTarget).attr('id') ); });
        $("#content_case_studie_desktop #tagline .arrows profil_back").click(function (e) { ga('send', 'event', 'button', event_GA, 'Case studies : back to profil' ); });
        $("#content_case_studie_mobile #tagline .case").click(function (e) { if(!$(e.currentTarget).hasClass('selected')){ ga('send', 'event', 'button', event_GA, 'Case studies mobile open : '+$(e.currentTarget).attr('id') ); } });
        $(".self_test ul li").click(function (e) { ga('send', 'event', 'button', event_GA, 'Self test : response '+$(e.currentTarget).data('reponse') ); });
    /* LINKS */
        $(".wrapper_head .media_centre a").click(function (e) { ga('send', 'event', 'link', event_GA, 'Header : '+$(e.currentTarget).text()+' ('+$(e.currentTarget).attr('href')+')' ); });
        $(".dispatch .media_centre a").click(function (e) { ga('send', 'event', 'link', event_GA, 'Country Disclaimer : '+$(e.currentTarget).text()+' ('+$(e.currentTarget).attr('href')+')' ); });
        $(".meaplus a").click(function (e) { ga('send', 'event', 'link', event_GA, 'CTA Plus : '+$(e.currentTarget).text()+' ('+$(e.currentTarget).attr('href')+')' ); });
        $(".mearose a").click(function (e) { ga('send', 'event', 'link', event_GA, 'CTA Pink : '+$(e.currentTarget).text()+' ('+$(e.currentTarget).attr('href')+')' ); });
        $(".related a").click(function (e) { ga('send', 'event', 'link', event_GA, 'Related : '+$(e.currentTarget).text()+' ('+$(e.currentTarget).attr('href')+')' ); });
        $(".related_story_link").click(function (e) { ga('send', 'event', 'link', event_GA, 'Related Story : ('+$(e.currentTarget).attr('href')+')' ); });
        $(".reference a").click(function (e) { ga('send', 'event', 'link', event_GA, 'Reference : '+$(e.currentTarget).text()+' ('+$(e.currentTarget).attr('href')+')' ); });
        $(".module_link_link").click(function (e) { ga('send', 'event', 'link', event_GA, 'Sidebar Module Link : '+$(e.currentTarget).text()+' ('+$(e.currentTarget).attr('href')+')' ); });
        $(".module_accident_happen_short_link").click(function (e) { ga('send', 'event', 'link', event_GA, 'Sidebar Module AccidentHappen : ('+$(e.currentTarget).attr('href')+')' ); });
        $(".module_ellaone_link").click(function (e) { ga('send', 'event', 'link', event_GA, 'Sidebar Module ellaOne : ('+$(e.currentTarget).attr('href')+')' ); });
        $(".quizz_selection_sex_answer").click(function (e) { ga('send', 'event', 'link', event_GA, 'Sidebar Module Have you had unprotected sex ? : '+$(e.currentTarget).text()     ); });
        $(".module.Follow a").click(function (e) { ga('send', 'event', 'link', event_GA, 'Sidebar Module Follow : '+$(e.currentTarget).text()+' ('+$(e.currentTarget).attr('href')+')' ); });
        $(".module.related_content_modern a").click(function (e) { ga('send', 'event', 'link', event_GA, 'Sidebar Module related modern : '+$(e.currentTarget).text()+' ('+$(e.currentTarget).attr('href')+')' ); });
        $(".module.related_content_retro a").click(function (e) { ga('send', 'event', 'link', event_GA, 'Sidebar Module related retro : '+$(e.currentTarget).text()+' ('+$(e.currentTarget).attr('href')+')' ); });
        $(".module.jargon_buster a").click(function (e) { ga('send', 'event', 'link', event_GA, 'Sidebar Module related jargon buster : '+$(e.currentTarget).text()+' ('+$(e.currentTarget).attr('href')+')' ); });
        $("#home article .accident_happen").click(function (e) { ga('send', 'event', 'link', event_GA, 'Home : Accidents Happen' ); });
        if($("html").hasClass('mobile')) {
            $("#home article .open_popin_video").click(function (e) { ga('send', 'event', 'link', event_GA, 'Home Mobile : Women think' ); });
        } else {
            $("#home article .open_popin_video").click(function (e) { ga('send', 'event', 'link', event_GA, 'Home : Women think' ); });
        }
        $("#home article .link_product_link").click(function (e) { ga('send', 'event', 'link', event_GA, 'Home : Product' ); });
        $("#home article .ten_things_home").click(function (e) { ga('send', 'event', 'link', event_GA, 'Home : Ten Things'); });
        $("#home article .link_product a").click(function (e) { ga('send', 'event', 'link', event_GA, 'Home Mobile : Product'); });
        $("#home article .accident_happen a").click(function (e) { ga('send', 'event', 'link', event_GA, 'Home Mobile : Accidents Happen'); });
        $("#home article .ten_things_home a").click(function (e) { ga('send', 'event', 'link', event_GA, 'Home Mobile : Ten Things'); });
        $("#home article .top-left a").click(function (e) { ga('send', 'event', 'link', event_GA, 'Home : Pharcists role ('+$(e.currentTarget).attr('href')+')' ); });
        $("#home article .top-right a").click(function (e) { ga('send', 'event', 'link', event_GA, 'Home : Donwload ellaOne® pharmacy training ('+$(e.currentTarget).attr('href')+')' ); });
        $("#home article .center a").click(function (e) { ga('send', 'event', 'link', event_GA, 'Home : What is ellaOne® ('+$(e.currentTarget).attr('href')+')' ); });
        $("#home article .bottom-left a").click(function (e) { ga('send', 'event', 'link', event_GA, 'Home : 10 tinhgs to know about ellaOne ('+$(e.currentTarget).attr('href')+')' ); });
        $("#home article .bottom-middle a").click(function (e) { ga('send', 'event', 'link', event_GA, 'Home : Consult SMPC ('+$(e.currentTarget).attr('href')+')' ); });
        $("#home article .bottom-right a").click(function (e) { ga('send', 'event', 'link', event_GA, 'Home : Cases to learn from ('+$(e.currentTarget).attr('href')+')' ); });
        $("#home article .link_product a").click(function (e) { ga('send', 'event', 'link', event_GA, 'Home Mobile : What is ellaOne® ('+$(e.currentTarget).attr('href')+')' ); });
        $("#home article .pharma_role a").click(function (e) { ga('send', 'event', 'link', event_GA, 'Home Mobile : Pharcists role ('+$(e.currentTarget).attr('href')+')' ); });
        $("#home article .ten_things_home a").click(function (e) { ga('send', 'event', 'link', event_GA, 'Home Mobile : 10 tinhgs to know about ellaOne ('+$(e.currentTarget).attr('href')+')' ); });
        $("#home article .case_to_learn a").click(function (e) { ga('send', 'event', 'link', event_GA, 'Home Mobile : Cases to learn from ('+$(e.currentTarget).attr('href')+')' ); });
        $("#home article .pharmacy_training a").click(function (e) { ga('send', 'event', 'link', event_GA, 'Home Mobile : Donwload ellaOne® pharmacy training ('+$(e.currentTarget).attr('href')+')' ); });
        $("#home article .country_specific a").click(function (e) { ga('send', 'event', 'link', event_GA, 'Home Mobile : Consult SMPC ('+$(e.currentTarget).attr('href')+')' ); });
    /* QUIZZ */
        $(".quizz_selection li.answer").click(function (e) { ga('send', 'event', 'quizz', event_GA, 'Sidebar Module Quizz : '+$(e.currentTarget).text() ); });
});

$(window).resize(function() {
	var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	if(document.documentElement.clientWidth < 767) {
		if(Cookie.read('cookieDisclaimer') == "null") {
			$('#surheader_mobile').css('display','block');
			$('#surheader p').css('display','none');
		}
    	$("html").addClass('ellamobile');
    	if($("html").hasClass('iphone')) {
    		if ($('#myViewport').attr('content') != 'width=device-width, user-scalable=no') {
    			$('#myViewport').attr('content', 'width=device-width, user-scalable=no')
    		}
    	} else {
	    	if ($('#myViewport').attr('content') != 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no') {
	    		$('#myViewport').attr('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
	    	}
		    if($("html").hasClass('android')) {
	            $("#header").css({'width':width});
	            $("#surheader_mobile").css({'width':width});
	        }
	    }
    } else {
    	if(Cookie.read('cookieDisclaimer') == "null") {
			$('#surheader p').css('display','inline-block');
			$('#surheader_mobile').css('display','none');
		}
    	$("html").removeClass('ellamobile');
    	if($('html').hasClass('android') && navigator.userAgent.indexOf('Chrome') == '-1') {
    		if ($('#myViewport').attr('content') != 'width=device-width, initial-scale=0.1') {
    			$('#myViewport').attr('content', 'width=device-width, initial-scale=0.1');
    		}
    	} else {
    		if ($('#myViewport').attr('content') != 'width=device-width') {
    			$('#myViewport').attr('content', 'width=device-width');
    		}
    	}
    }
	$("#mobile_menu .nav-menu").css('height',window.innerHeight-52);
	$("#back_mobile_menu").css('height',window.innerHeight);

	if($('html').hasClass('ipad')) {
		$('#disclaimer .link').css({'top':(window.innerHeight/2)-($('#disclaimer .link').height()/2)+'px' , 'left':(window.innerWidth/2)-($('#disclaimer .link').width()/2)+'px'});	
		$('#pop_video .background').css({'top':(window.innerHeight/2)-($('#pop_video .background').height()/2)+'px' , 'left':(window.innerWidth/2)-($('#pop_video .background').width()/2)+'px'});	
		$('#pop_video_menu .background').css({"margin-left": "-"+($('#pop_video_menu .background').innerWidth()/2)+"px", "margin-top": "-"+($('#pop_video_menu .background').innerHeight()/2)+"px"});
		$('#pop_video_menu .background').find('iframe').css({"width":($('#pop_video_menu .background').innerWidth()-70)+"px"});
		$('#disclaimer .dispatch').css({'top':(window.innerHeight/2)-($('#disclaimer .dispatch').height()/2)+'px' , 'left':(window.innerWidth/2)-($('#disclaimer .dispatch').width()/2)+'px'});	
	} else {
		$('#disclaimer .link').css({'top':($(window).height()/2)-($('#disclaimer .link').height()/2) , 'left':($(window).width()/2)-($('#disclaimer .link').width()/2)});
		$('#pop_video .background').css({'top':($(window).height()/2)-($('#pop_video .background').height()/2) , 'left':($(window).width()/2)-($('#pop_video .background').width()/2)});
		$('#pop_video_menu .background').css({"margin-left": "-"+($('#pop_video_menu .background').innerWidth()/2)+"px", "margin-top": "-"+($('#pop_video_menu .background').innerHeight()/2)+"px"});
		$('#pop_video_menu .background').find('iframe').css({"width":($('#pop_video_menu .background').innerWidth()-70)+"px"});
		$('#disclaimer .dispatch').css({'top':($(window).height()/2)-($('#disclaimer .dispatch').height()/2) , 'left':($(window).width()/2)-($('#disclaimer .dispatch').width()/2)});
	}
});

function displayMenuMobile(el) {
	if($("#mobile_menu").hasClass('opened')) {
		$("#mobile_menu").removeClass('opened');
    	$("#mobile_menu").animate({
    		left:"-85%"
    	}, 200, function() {
	    		$("#mobile_menu").css('display','none');
    	});
    	$("#back_mobile_menu").animate({
    		opacity:"0"
    	}, 200, function() {
    		$("#back_mobile_menu").css('display','none');
    	});
	} else {
		if(el == "menu") {
			$("#mobile_menu").addClass('opened');
	    	$("#mobile_menu").css('display','block');
	    	$("#mobile_menu .nav-menu").css('height',window.innerHeight-52);
	    	$("#back_mobile_menu").css('display','block');
	    	$("#back_mobile_menu").css('height',window.innerHeight);
	    	$("#mobile_menu").animate({
	    		left:"0"
	    	}, 200);
	    	$("#back_mobile_menu").animate({
	    		opacity:"0.5"
	    	}, 200);
	    }
    }
}

function externalLinkDisclaimer(el, e) {
	if(!el.attr("href").match(new RegExp($(document).context.domain)) ) {
        if(el.attr("href").match(new RegExp("http://")) != null) {
            var regex = new RegExp( __disclaimerLinkAllowedDomains, 'g');
            if(el.attr("href").match(regex) == null) {
                $("#disclaimer").show();//background link
                $("#disclaimer .link").show();
                $("#disclaimer .link .left").data("href", el.attr("href"));
                if(document.documentElement.clientWidth < 767) {
                    $('#header').css('display','none');
                    $('#container').css('display','none');
                    $('#disclaimer .link').css({'top':'0px' , 'left':'0px'});
                } else {
                    if($('html').hasClass('ipad')) {
                        $('#disclaimer .link').css({'top':(window.innerHeight/2)-($('#disclaimer .link').height()/2)+'px' , 'left':(window.innerWidth/2)-($('#disclaimer .link').width()/2)+'px'}); 
                    } else {
                        $('#disclaimer .link').css({'top':($(window).height()/2)-($('#disclaimer .link').height()/2) , 'left':($(window).width()/2)-($('#disclaimer .link').width()/2)});
                    }
                }
            } else {
            	//alert("3");
		        window.open(el.attr("href"), "_blank");
            }
        } else {
        	 // alert("2");
			if (el.attr('target') == '_blank') {
				window.open(el.attr("href"), "_blank");
			} else {
				window.location.href=el.attr("href");
			}
        }
    } else {
    	 //alert("1");        
		if (el.attr('target') == '_blank') {
			window.open(el.attr("href"), "_blank");
		} else {
			window.location.href=el.attr("href");
		}
    }
}
/*
$(document).bind('click', function(e) {
	var el = $(e.target);
    if(el.context.host) {
    	if(el.context.host != $(document).context.domain) { 
    		//if (customInArray(el.context.host, __disclaimerLinkAllowedDomains) == -1){
    			externalLinkDisclaimer(el, e);
    		//}
    	}
    }
});
*/
/*
Fonction custom pour que si jamais il ne trouve pas exactement le domaine dans la liste des domaines autorisés, il aille chercher si le domaine est quand meme présent.
Par exemple : pour autoriser le domaine "test.com" on pourra ajouter au tableau seulement "test.com" et si jamais le lien pointe sur 
- www.test.com
- www1.test.com
- fr.test.com 
ça passera à chaque fois car il aura trouvé "test.com" dans le domaine
*/
function customInArray(value, array){
	var find = $.inArray(value, array);
	
	if (find != -1)
		return $.inArray(value, array);
	else{
		var arraySize = array.length;
		var loopCpt = 0;
		while (find == -1 && loopCpt < arraySize){
			find = value.indexOf(array[loopCpt]);
			loopCpt++;
		}
	}
	
	return find;
}
