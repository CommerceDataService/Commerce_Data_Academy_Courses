$(document).ready( function(){
	$('.image-carousel').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		infinite: false,
		centerMode: true,
		responsive: [
		    {
		      breakpoint: 1024,
		      settings: {
		        slidesToShow: 3,
		        slidesToScroll: 3,
		        autoplay: true,
		        autoplaySpeed: 3000,
		        infinite: false
		      }
		    },
		    {
		      breakpoint: 600,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2,
		        autoplay: true,
		        autoplaySpeed: 3000,
		        infinite: false
		      }
		    },
		    {
		      breakpoint: 480,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1,
		        autoplay: true,
		        autoplaySpeed: 3000,
		        infinite: false
		      }
		    }
		]
	});
});

$('.image-carousel').get(0).slick.setPosition();