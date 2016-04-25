if ($.cookie("theme_csspath")) {
    $('link#theme-stylesheet').attr("href", $.cookie("theme_csspath"));
}

$(function () {

    animations();
    sliders();
    fullScreenContainer();
    utils();
    sliding();
    contactForm();
    map();
    counters();
    parallax();
    demo();
});

$(window).load(function () {
    windowWidth = $(window).width();
    $(this).alignElementsSameHeight();

    masonry();

});
$(window).resize(function () {

    newWindowWidth = $(window).width();

    if (windowWidth !== newWindowWidth) {
	setTimeout(function () {
	    $(this).alignElementsSameHeight();
	    fullScreenContainer();
	    waypointsRefresh();
	}, 205);
	windowWidth = newWindowWidth;
    }

});


/* =========================================
 *  for demo purpose only - can be deleted 
 *  =======================================*/

function demo() {

    if ($.cookie("theme_csspath")) {
	$('link#theme-stylesheet').attr("href", $.cookie("theme_csspath"));
    }

    $("#colour").change(function () {

	if ($(this).val !== '') {

	    var colour = $(this).val();
	    var introImage = $('body').find('#intro .item');

	    introImage.removeClass();
	    introImage.addClass('item');
	    introImage.addClass(colour);


	    var theme_csspath = 'css/style.' + $(this).val() + '.css';
	    $('link#theme-stylesheet').attr("href", theme_csspath);
	    $.cookie("theme_csspath", theme_csspath, {expires: 365, path: '/'});
	}

	return false;
    });
}

/* =========================================
 *  animations
 *  =======================================*/

function animations() {

    if (Modernizr.csstransitions) {

	delayTime = 0;
	$('[data-animate]').css({opacity: '0'});
	$('[data-animate]').waypoint(function (direction) {
	    delayTime += 150;
	    $(this).delay(delayTime).queue(function (next) {
		$(this).toggleClass('animated');
		$(this).toggleClass($(this).data('animate'));
		delayTime = 0;
		next();
		//$(this).removeClass('animated');
		//$(this).toggleClass($(this).data('animate'));
	    });
	},
		{
		    offset: '95%',
		    triggerOnce: true
		});
	$('[data-animate-hover]').hover(function () {
	    $(this).css({opacity: 1});
	    $(this).addClass('animated');
	    $(this).removeClass($(this).data('animate'));
	    $(this).addClass($(this).data('animate-hover'));
	}, function () {
	    $(this).removeClass('animated');
	    $(this).removeClass($(this).data('animate-hover'));
	});
    }

}

/* =========================================
 * sliding 
 *  =======================================*/

function sliding() {
    $('.scrollTo, #navigation a').click(function (event) {
	event.preventDefault();
	var full_url = this.href;
	var parts = full_url.split("#");
	var trgt = parts[1];

	$('body').scrollTo($('#' + trgt), 800, {offset: -80});

    });
}

/* =========================================
 * sliders 
 *  =======================================*/

function sliders() {
    if ($('.owl-carousel').length) {

	$(".customers").owlCarousel({
	    items: 6,
	    itemsDesktopSmall: [990, 4],
	    itemsTablet: [768, 2],
	    itemsMobile: [480, 1]
	});
	$(".testimonials").owlCarousel({
	    items: 4,
	    itemsDesktopSmall: [1170, 3],
	    itemsTablet: [970, 2],
	    itemsMobile: [750, 1]
	});
    }

}

/* =========================================
 * counters 
 *  =======================================*/

function counters() {

    $('.counter').counterUp({
	delay: 10,
	time: 1000
    });

}

/* =========================================
 * parallax 
 *  =======================================*/

function parallax() {

    $('.text-parallax').parallax("50%", 0.1);
    
}

/* =========================================
 *  masonry 
 *  =======================================*/

function masonry() {

    $('#references-masonry').css({visibility: 'visible'});

    $('#references-masonry').masonry({
	itemSelector: '.reference-item:not(.hidden)',
	isFitWidth: true,
	isResizable: true,
	isAnimated: true,
	animationOptions: {
	    duration: 200,
	    easing: 'linear',
	    queue: true
	},
	gutter: 30
    });
    scrollSpyRefresh();
    waypointsRefresh();
}

/* =========================================
 * filter 
 *  =======================================*/

$('#filter a').click(function (e) {
    e.preventDefault();



    $('#filter li').removeClass('active');
    $(this).parent('li').addClass('active');

    var categoryToFilter = $(this).attr('data-filter');

    $('.reference-item').each(function () {
	if ($(this).data('category') === categoryToFilter || categoryToFilter === 'all') {
	    $(this).removeClass('hidden');
	}
	else {
	    $(this).addClass('hidden');
	}
    });

    if ($('#detail').hasClass('open')) {
	closeReference();
    }
    else {
	$('#references-masonry').masonry('reloadItems').masonry('layout');

    }

    scrollSpyRefresh();
    waypointsRefresh();
});

/* =========================================
 *  open reference 
 *  =======================================*/

$('.reference-item').click(function (e) {
    e.preventDefault();

    var element = $(this);
    var title = element.find('.reference-title').text();
    var description = element.find('.reference-description').html();
    slider = '';
 //    images = element.find('.reference-description').data('images').split(',');

 //    if (images.length > 0) {
	// slider = '';
	// for (var i = 0; i < images.length; ++i) {
	//     slider = slider + '<div class="item"><img src=' + images[i] + ' alt="" class="img-responsive"></div>';
	// }
 //    }
 //    else {
	// slider = '';
 //    }



    $('#detail-title').text(title);
    $('#detail-content').html(description);
    $('#detail-slider').html(slider);

    openReference();

});

function openReference() {

    $('#detail').addClass('open');
    $('#references-masonry').animate({opacity: 0}, 300);
    $('#detail').animate({opacity: 1}, 300);

    setTimeout(function () {
	$('#detail').slideDown();
	$('#references-masonry').slideUp();

	if ($('#detail-slider').html() !== '') {

	    $('#detail-slider').owlCarousel({
		slideSpeed: 300,
		paginationSpeed: 400,
		autoPlay: true,
		stopOnHover: true,
		singleItem: true,
		afterInit: ''
	    });
	}
    }, 300);

    setTimeout(function () {
	$('body').scrollTo($('#detail'), 1000, {offset: -80});
    }, 500);

}

function closeReference() {

    $('#detail').removeClass('open');
    $('#detail').animate({'opacity': 0}, 300);

    setTimeout(function () {
	$('#detail').slideUp();
	//$('#detail-slider').data('owlCarousel').destroy();
	$('#references-masonry').slideDown().animate({'opacity': 1}, 300).masonry('reloadItems').masonry();

    }, 300);

    setTimeout(function () {
	$('body').scrollTo($('#filter'), 1000, {offset: -110});
    }, 500);


    setTimeout(function () {
	$('#references-masonry').masonry('reloadItems').masonry();
    }, 800);

}

$('#detail .close').click(function () {
    closeReference(true);
})

/* =========================================
 * full screen intro 
 *  =======================================*/

function fullScreenContainer() {

    var screenWidth = $(window).width() + "px";
    var screenHeight = '';
    if ($(window).height() > 500) {
	screenHeight = $(window).height() + "px";
    }
    else {
	screenHeight = "500px";
    }


    $("#intro, #intro .item").css({
	width: screenWidth,
	height: screenHeight
    });
}

/* =========================================
 *  map 
 *  =======================================*/

function map() {

    var styles = [{"featureType": "landscape", "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]}, {"featureType": "poi", "stylers": [{"saturation": -100}, {"lightness": 51}, {"visibility": "simplified"}]}, {"featureType": "road.highway", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "road.arterial", "stylers": [{"saturation": -100}, {"lightness": 30}, {"visibility": "on"}]}, {"featureType": "road.local", "stylers": [{"saturation": -100}, {"lightness": 40}, {"visibility": "on"}]}, {"featureType": "transit", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "administrative.province", "stylers": [{"visibility": "off"}]}, {"featureType": "water", "elementType": "labels", "stylers": [{"visibility": "on"}, {"lightness": -25}, {"saturation": -100}]}, {"featureType": "water", "elementType": "geometry", "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]}];
    map = new GMaps({
	el: '#map',
	lat: -12.043333,
	lng: -77.028333,
	zoomControl: true,
	zoomControlOpt: {
	    style: 'SMALL',
	    position: 'TOP_LEFT'
	},
	panControl: false,
	streetViewControl: false,
	mapTypeControl: false,
	overviewMapControl: false,
	scrollwheel: false,
	draggable: false,
	styles: styles
    });

    var image = 'img/marker.png';

    map.addMarker({
	lat: -12.043333,
	lng: -77.028333,
	icon: image/* ,
	 title: '',
	 infoWindow: {
	 content: '<p>HTML Content</p>'
	 }*/
    });
}

/* =========================================
 *  UTILS
 *  =======================================*/

function utils() {

    /* tooltips */

    $('[data-toggle="tooltip"]').tooltip();

    /* external links in new window*/

    $('.external').on('click', function (e) {

	e.preventDefault();
	window.open($(this).attr("href"));
    });
    /* animated scrolling */

}

$.fn.alignElementsSameHeight = function () {
    $('.same-height-row').each(function () {

	var maxHeight = 0;
	var children = $(this).find('.same-height');
	children.height('auto');
	if ($(window).width() > 768) {
	    children.each(function () {
		if ($(this).innerHeight() > maxHeight) {
		    maxHeight = $(this).innerHeight();
		}
	    });
	    children.innerHeight(maxHeight);
	}

	maxHeight = 0;
	children = $(this).find('.same-height-always');
	children.height('auto');
	children.each(function () {
	    if ($(this).height() > maxHeight) {
		maxHeight = $(this).innerHeight();
	    }
	});
	children.innerHeight(maxHeight);
    });
}

/* refresh scrollspy */
function scrollSpyRefresh() {
    setTimeout(function () {
	$('body').scrollspy('refresh');
    }, 1000);
}

/* refresh waypoints */
function waypointsRefresh() {
    setTimeout(function () {
	$.waypoints('refresh');
    }, 1000);
}

/* ajax contact form */

function contactForm() {
    $("#contact-form").submit(function () {

	var url = "contact.php"; // the script where you handle the form input.

	$.ajax({
	    type: "POST",
	    url: url,
	    data: $(this).serialize(), // serializes the form's elements.
	    success: function (data)
	    {
		var messageAlert = 'alert-' + data.type;
		var messageText = data.message;
		var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable animated bounceIn"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
		if (messageAlert && messageText) {
		    $('#contact-form').find('.messages').html(alertBox);
		}
	    }
	});
	return false; // avoid to execute the actual submit of the form.
    });
}

var $frontEndIcon = $('#frontEndIcon');
var $backEndIcon = $('#backEndIcon');
var $dataScienceIcon = $('#dataScienceIcon');
var $UXIcon = $('#UXIcon');
var $fieldsTitle = $('.generalFieldsTitle h4');
var $fieldsDescription = $('.generalFieldsDescription');
var $fieldsKeywords = $('.generalFieldsKeywords p')

$frontEndIcon.click(function(e) {
	e.preventDefault();
	$fieldsTitle.text('Front-End Development')
	$fieldsKeywords.text(' HTML, CSS, JavaScript, jQuery, Backbone.js, Handlebars')
	$fieldsDescription.text('Front-end development consists of using HTML, CSS, Javascript, jQuery, and other tools to give style and functionality to the front-facing part of a website.')
	console.log($fieldsKeywords.text());
})

$backEndIcon.click(function(e) {
	e.preventDefault();
	$fieldsTitle.text('Back-End Development')
	$fieldsKeywords.text(' Python, Ruby, Rails, Docker, MySQL, Django')
	$fieldsDescription.text('Back-end developers use languages such as Python, Ruby, or Node.js to program the guts of an application, along with server-side frameworks such as Flask, Django, Rails or Express.js, and also model, store, manipulate, and access data using databases like PostgreSQL, MySQL or MongoDB. ')
})

$dataScienceIcon.click(function(e) {
	e.preventDefault();
	$fieldsTitle.text('Data-Science');
	$fieldsKeywords.text(' R, Python, RStudio, Python Notebook, Data Visualization')
	$fieldsDescription.text('Data science is the practice of transforming raw data into insights, products, and applications to empower data-driven decision making.')

})

$UXIcon.click(function(e) {
	e.preventDefault();
	$fieldsTitle.text('UX/UI Design');
	$fieldsKeywords.text(' User Experience, User Design, User Stories, Wireframes, Mock-Ups')
	$fieldsDescription.text('User experience(UX) design is the process of enhancing user satisfaction by improving the user interface (UI), accessibility, and pleasure of the product the user is interacting with.')
})

var $modalTitle = $('#modalTitle');
var $modalBody = $('#modalBody');
var $eventURL = $('#eventUrl');
var $fullCalModal = $('#fullCalModal');

$('#calendar').fullCalendar({
        // put your options and callbacks here
        events: [
        	{
        		title: 'Intro to Photoshop & Design',
        		start: '2016-04-19',
        		description: 'Learn the basic principles and concepts of design such as color theory, typography, branding, user experience design, and mobile design. Practice what you learn in photoshop, and walk away with a design by the end of the class.'
        	},
        	{
        		title: 'Data Wrangling with Pandas',
        		start: '2016-06-13',
        		description: 'Download, explore, and wrangle the Titanic passenger manifest dataset with an eye toward developing a predictive model for survival.'
        	}, 
        	{
        		title: 'Data Storytelling with R',
        		start: '2016-06-01',
        		description: 'Overview of internal R data visualization tools as well as use of Shiny, Leaflet, and Plotly for interactive visualizations.'
        	},
        	{
        		title: 'Intro to Data Analysis',
        		start: '2016-05-17',
        		description: 'Given a dataset online, use R to load the data, compute summary statistics, and investigate correlations.'
        	},
        	{
        		title: 'Intro to R',
        		start: '2016-05-02',
        		description: 'Introductory course that covers basic R syntax, input and output, and basic statistical analysis.'
        	}
        ],
        eventClick: function(event, jsEvent, view) {
        	$modalTitle.html(event.title);
        	$modalBody.html(event.description);
        	$fullCalModal.modal();
        	return false;
        }
})