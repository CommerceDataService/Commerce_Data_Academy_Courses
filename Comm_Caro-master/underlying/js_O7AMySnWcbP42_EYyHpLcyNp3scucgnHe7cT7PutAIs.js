(function($) {
  Drupal.behaviors.preventMultipleSubmit = {
    attach: function(context) {
      $('form.node-form, form#file-entity-add-upload, form.comment-form, form.media-multiedit-form, form#file-entity-add-upload-multiple', context).once('preventMultipleSubmit', function () {
        var $form = $(this);
        $form.find('input.form-submit').click(function (e) {
          var el = $(this);
          el.after('<input type="hidden" name="' + el.attr('name') + '" value="' + el.attr('value') + '" />');
          return true;
        });
        $form.submit(function (e) {
          if (!e.isPropagationStopped()) {
            $('input.form-submit', $(this)).attr('disabled', 'disabled').fadeTo( "fast", 0.33 );
            return true;
          }  
        });
      });
    }
  };
})(jQuery);
;
(function($) {
Drupal.behaviors.globalFunctions = {
    attach: function(context, settings) {
        /* The following adds Show More link and functionality to a Div with a show-hide-more class name */
        /* Source = http://forumone.com/blogs/post/jquery-height-based-show-more-link-buttons-drupal-and-beyond */
        // If the following class name is found on a block
        function showHideMore(el) {

            if( el.length > 0) {
                
                el.each( function(){

                    var fullHeight = $(this).height()
                    // Set default smaller height
                    var height = '44';
                    // Set default height at which the element should be considered overflowing
                    var overflowHeight = '44';

                    // Get height of collapse state from class name
                    if($(this).is('[class*="only-show-"]')) {
                        //Finds element with a height class
                        var heightClass = $(this).attr("class").match(/\b(only-show-\d+)\b/);
                        if(heightClass != null) {
                            var heightClass = heightClass[1];
                            var height = heightClass.substring(10);
                            // Add a little buffer so a small overflow doesn't trigger this effect
                            var overflowHeight = parseInt(height, 10) + 20;
                        }
                    };

                    // If the full height is greater than the set height
                    if(fullHeight > overflowHeight) {

                        // Set height
                        $(this).height(height).css({'overflow': 'hidden'});

                        // Add Show More and Hide links that will trigger height expand and contract
                        $(this).after('<a href="#" class="show-more" style="display: block; text-decoration: none; text-align: center; "><span class="fonticon icon-arrow-down" aria-hidden="true"></span><span class="title">Show more</span></a><a href="#" class="hide-more" style="display: none; text-decoration: none; text-align: center;"><span class="fonticon icon-arrow-up" aria-hidden="true"></span><span class="title">Hide</span></a>');

                        // Bind to the Read More link to toggle the description
                        $(this).next('a.show-more').click(
                            function( event ){
                                // Cancel the default event (this isn't a real link).
                                event.preventDefault();

                                // Show full height and change overflow with slow animation effect
                                $(this).prev('.show-hide-more').css({overflow: "auto"}).animate({
                                    height: fullHeight
                                }, {
                                duration: 400,
                                complete: function() {
                                    
                                    // Hide Show More button after animation finishes
                                    $(this).next('.show-more').css({display: "none"});
                                    $(this).nextAll('.hide-more').eq(0).css({display: "block"});
                                    $(this).addClass('expanded').css({overflow: "hidden", height: "auto" });
                                }
                                });
                            }
                        );
                        // Bind to the Hide link to toggle the
                        $(this).nextAll('.hide-more').eq(0).click(
                            function( event ){
                                // Cancel the default event (this isn't a real link).
                                event.preventDefault();

                                // Show full height and change overflow with slow animation effect
                                $(this).prevAll('.show-hide-more').eq(0).css({overflow: "hidden"}).animate({
                                    height: height
                                }, {
                                duration: 400,
                                complete: function() {
                                    // Hide Show More button after animation finishes
                                    $(this).nextAll('.hide-more').eq(0).css({display: "none"});
                                    $(this).next('.show-more').css({display: "block"});
                                    $(this).removeClass('expanded');
                                }
                                });
                            }
                        );
                    }
                });
            }
        }

        function resetShowHideMore(el) {
            $('.show-more').remove();
            $('.hide-more').remove();
            // Resent to full height
            el.css({'height': 'auto', 'overflow': 'visible'});
        }

        resetShowHideMore($('.show-hide-more'));
        showHideMore($('.show-hide-more'));

        //run it again after window resize
        $(window).bind('resizeEnd', function() {
            resetShowHideMore($('.show-hide-more'));
            showHideMore($('.show-hide-more'));
        });
    }
};
})(jQuery);;
(function ($) {
    
  // bind a function to the window's scroll event
  $(window).scroll(function() {    
    // get the amount the window has scrolled
    var scroll = $(window).scrollTop();
    // add the 'scrolled' class to the body element
	 
    if($("body").hasClass("front")) {  
      if (scroll >= 260) {
        $("body").addClass("scroll-menu");
      }
      if (scroll < 260) {
        $("body").removeClass("scroll-menu");
      }
    }

    if (scroll >= 10) {
      $("body").addClass("scrolled");
    }
    if (scroll < 10) {
      $("body").removeClass("scrolled");
    }
  });

  // Fix bug with iOS when search input is active, fixed header moves down the page

  if (Modernizr.touch) {

    $(document)
    .on('focus', 'input, select, textarea', function(e) {
        $('body').addClass('fixfixed');
    })
    .on('blur', 'input, select, textarea', function(e) {
        $('body').removeClass('fixfixed');
    });
  } 


}(jQuery));
;
(function ($) {
    
  // add the dialog-open class when the media browser opens
  // Drupal.behaviors.DOCdialog = {
  //   attach: function (context, settings) {

  //     $('.launcher').click(function(){
  //       $('body').addClass('dialog-open');
  //     });

  //   }
  // };
    // remove the dialog-open class when the media browser closes
  if (Drupal.media) {
    if (Drupal.media.browser) {
      // Drupal.media.browser.selectionFinalized = function (selectedMedia) {
      //   $('body', parent.document).removeClass('dialog-open');
      // };

     // Resize the Media Browser to the content height
      Drupal.media.browser.resizeIframe = function (event) {
        var h = $('body').height();
        $(parent.window.document).find('#mediaBrowser').height(h + 40);
      };

      Drupal.media.browser.validateButtons = function() {
        $('#media-browser-page .form-item-upload .form-submit').css( "display", "none" );
        if ($('#media-browser-page span.file, #media-browser-page .group-categorization').length > 0) {
          $('#media-browser-page .fake-cancel, #media-tabs-wrapper li.ui-state-default:not(.ui-state-active)').css( "display", "none" );
        }

        // The lines below are from the media module, but we make sure the body can scroll again if canceled
        $('a.button.fake-submit', this).once().bind('click', Drupal.media.browser.submit);
        $('a.button.fake-cancel', this).once().bind('click', Drupal.media.browser.submit);

        //remove dialogue-open class if cancel button clicked
        // $('a.button.fake-cancel', this).click(function(ev){ 
        //   $('body', parent.document).removeClass('dialog-open'); 
        //   }).click(Drupal.media.browser.submit);
      }

    }
  }

}(jQuery));;
(function($) {

	Drupal.behaviors.DOCmenuToggle = {
	  attach: function (context, settings) {

	    // Show mobile menu
	    $("h2.menu-toggle-btn a").unbind('click').click(function() {
	      $(this).parent().toggleClass('open').siblings('.mobile-menu-toggle').animate({width: 'toggle'});
	      return false;
	    });
    }
	};

	function headerTooCrowded(){
			//reset
			$('body').removeClass('mobile-menu');
			// Switch to mobile menu icon if header elements are too wide
			// This happens with too many menu items, long site name, zooming
			var hw=0; // header width
			var bw=0; // branding width
			var hew=0; // header region elements width
			var htotal=0; // total width of branding and header region elements
			$('#branding').css('padding' , '0');
			hw = $('#header').width();
			bw = $('#header #branding').width();
			$('#header .region-header .region-inner').children().width(function(i,w){hew+=w;});
			hew = hew - 158; // subtract margins
			htotal = bw + hew;
			if ( hw < htotal ) {
				$('body').addClass('mobile-menu');
			} 
	}

	$(window).bind('resizeEnd', function() {
		headerTooCrowded();
	});

	// we need to wait for everything to load before measuring
	$(window).load(function() {
		headerTooCrowded();
	});

})(jQuery);;
(function($) {
Drupal.behaviors.DOCinfoToggle = {
  attach: function (context, settings) {

	var hasToggle = false;
    //make info hover behavior switch to tap/clcik on touch screens  
	if (!$('html').hasClass('no-touch') && !hasToggle) { 
		//Execute code only on a touch screen device 
        if($('.info-toggle').length) {
			$('.info-toggle').each(function() {
				if(!$(this).hasClass('toggle-this')) {
					$(this).addClass('toggle-this');
					$(this).prepend('<div class="fonticon icon-arrow-up toggle-icon" aria-hiddden="true" style="cursor:pointer;"></div>');
					$(this).children('.toggle-icon').unbind('touchstart click').bind('touchstart', function() {          
						$(this).parent().toggleClass("open");
						if($(this).hasClass("icon-arrow-up")) { 
							$(this).removeClass("icon-arrow-up").addClass("icon-arrow-down"); 
						} else { 
							$(this).removeClass("icon-arrow-down").addClass("icon-arrow-up"); 
						}
						return false;                         
					});
				} 
			}); 

			hasToggle = true;
		}
	}
  }
};
})(jQuery);;
(function($) {
Drupal.behaviors.DOCtagsToggle = {
  attach: function (context, settings) {

    var el = $('.node-teaser-lite .group-terms, .node-teaser .group-terms');

	el.each(function() {
		if( $(this).siblings('.tags-toggle-btn').size() == 0) {
          //Add a button for toggling tags in the 'teaser-lite' view mode       
		  $(this).before('<div class="tags-toggle-btn"><span class="title">Tags</span></div>');

		  //Toggle tags on click 
		  var btn = $(this).siblings('.tags-toggle-btn');     
		  btn.click(function() {          
			  $(this).toggleClass('open').siblings('.group-terms').toggleClass('open');
		  });
		}
	});

    //Add a 'more tags' button to overflowing tags
    function isOverflowing(){
	    el.each(function() {
			$(this).wrapInner('<div />'); // wrap inner contents
			$(this).css('margin', '0'); //remove any margin for testing width and height
		
	        //Test for overflow
	        var containerWidth = $(this).width();
	        var innerWidth = $(this).children('div').width();
	        var containerHeight = $(this).height();
	        var innerHeight = $(this).children('div').height();

	        if((containerWidth < innerWidth) || (containerHeight < innerHeight)) {
	            if($(this).siblings('.more-tags').length == 0) {
				    $(this).addClass('overflow').before('<div class="more-tags closed"><span class="fonticon icon-arrow-right" aria-hidden="true"></span><span class="fonticon icon-arrow-down" aria-hidden="true"></span><span class="screen-reader-text">more tags</span></div>');
				    
				    //toggle more tags for overflowing group-terms
		            $(this).siblings('.more-tags').click(function(){
			          $(this).toggleClass("closed open").siblings('.group-terms').toggleClass('show-overflow');
		            });
				}
			}
			else {
			    if(!$(this).hasClass('show-overflow')) {
	                $(this).removeClass('overflow').siblings('.more-tags').remove();
			    }
			}
			//alert('containerWidth ' + containerWidth + ', innerWidth ' + innerWidth + ', containerHeight ' + containerHeight + ', innerHeight ' + innerHeight);
			
			$(this).children('div').replaceWith( $(this).children('div').html() ); //unwrap
	        $(this).css('margin', 'inherit'); //allow css to set margin since tesing is done
	    });

	}

	isOverflowing();

  $(window).bind('resizeEnd', function() {
		isOverflowing();
		$('.node-teaser-lite .group-terms, .node-teaser .group-terms').removeClass('open').siblings('.tags-toggle-btn').removeClass('open');
	});

  }
};
})(jQuery);;
/**
 * jQuery.LocalScroll
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 3/11/2009
 *
 * @projectDescription Animated scrolling navigation, using anchors.
 * http://flesler.blogspot.com/2007/10/jquerylocalscroll-10.html
 * @author Ariel Flesler
 * @version 1.2.7
 *
 * @id jQuery.fn.localScroll
 * @param {Object} settings Hash of settings, it is passed in to jQuery.ScrollTo, none is required.
 * @return {jQuery} Returns the same jQuery object, for chaining.
 *
 * @example $('ul.links').localScroll();
 *
 * @example $('ul.links').localScroll({ filter:'.animated', duration:400, axis:'x' });
 *
 * @example $.localScroll({ target:'#pane', axis:'xy', queue:true, event:'mouseover' });
 *
 * Notes:
 *	- The plugin requires jQuery.ScrollTo.
 *	- The hash of settings, is passed to jQuery.ScrollTo, so the settings are valid for that plugin as well.
 *	- jQuery.localScroll can be used if the desired links, are all over the document, it accepts the same settings.
 *  - If the setting 'lazy' is set to true, then the binding will still work for later added anchors.
  *	- If onBefore returns false, the event is ignored.
 **/
;(function( $ ){
	var URI = location.href.replace(/#.*/,''); // local url without hash

	var $localScroll = $.localScroll = function( settings ){
		$('body').localScroll( settings );
	};

	// Many of these defaults, belong to jQuery.ScrollTo, check it's demo for an example of each option.
	// @see http://flesler.demos.com/jquery/scrollTo/
	// The defaults are public and can be overriden.
	$localScroll.defaults = {
		duration:1000, // How long to animate.
		axis:'y', // Which of top and left should be modified.
		event:'click', // On which event to react.
		stop:true, // Avoid queuing animations 
		target: window, // What to scroll (selector or element). The whole window by default.
		reset: true // Used by $.localScroll.hash. If true, elements' scroll is resetted before actual scrolling
		/*
		lock:false, // ignore events if already animating
		lazy:false, // if true, links can be added later, and will still work.
		filter:null, // filter some anchors out of the matched elements.
		hash: false // if true, the hash of the selected link, will appear on the address bar.
		*/
	};

	// If the URL contains a hash, it will scroll to the pointed element
	$localScroll.hash = function( settings ){
		if( location.hash ){
			settings = $.extend( {}, $localScroll.defaults, settings );
			settings.hash = false; // can't be true
			
			if( settings.reset ){
				var d = settings.duration;
				delete settings.duration;
				$(settings.target).scrollTo( 0, settings );
				settings.duration = d;
			}
			scroll( 0, location, settings );
		}
	};

	$.fn.localScroll = function( settings ){
		settings = $.extend( {}, $localScroll.defaults, settings );

		return settings.lazy ?
			// use event delegation, more links can be added later.		
			this.bind( settings.event, function( e ){
				// Could use closest(), but that would leave out jQuery -1.3.x
				var a = $([e.target, e.target.parentNode]).filter(filter)[0];
				// if a valid link was clicked
				if( a )
					scroll( e, a, settings ); // do scroll.
			}) :
			// bind concretely, to each matching link
			this.find('a,area')
				.filter( filter ).bind( settings.event, function(e){
					scroll( e, this, settings );
				}).end()
			.end();

		function filter(){// is this a link that points to an anchor and passes a possible filter ? href is checked to avoid a bug in FF.
			return !!this.href && !!this.hash && this.href.replace(this.hash,'') == URI && (!settings.filter || $(this).is( settings.filter ));
		};
	};

	function scroll( e, link, settings ){
		var id = link.hash.slice(1),
			elem = document.getElementById(id) || document.getElementsByName(id)[0];

		if ( !elem )
			return;

		if( e )
			e.preventDefault();

		var $target = $( settings.target );

		if( settings.lock && $target.is(':animated') ||
			settings.onBefore && settings.onBefore.call(settings, e, elem, $target) === false ) 
			return;

		if( settings.stop )
			$target.stop(true); // remove all its animations

		if( settings.hash ){
			var attr = elem.id == id ? 'id' : 'name',
				$a = $('<a> </a>').attr(attr, id).css({
					position:'absolute',
					top: $(window).scrollTop(),
					left: $(window).scrollLeft()
				});

			elem[attr] = '';
			$('body').prepend($a);
			location = link.hash;
			$a.remove();
			elem[attr] = id;
		}
			
		$target
			.scrollTo( elem, settings ) // do scroll
			.trigger('notify.serialScroll',[elem]); // notify serialScroll about this change
	};

})( jQuery );;
/*!
 * jQuery.ScrollTo
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 4/09/2012
 *
 * @projectDescription Easy element scrolling using jQuery.
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 * @author Ariel Flesler
 * @version 1.4.3.1
 *
 * @id jQuery.scrollTo
 * @id jQuery.fn.scrollTo
 * @param {String, Number, DOMElement, jQuery, Object} target Where to scroll the matched elements.
 *	  The different options for target are:
 *		- A number position (will be applied to all axes).
 *		- A string position ('44', '100px', '+=90', etc ) will be applied to all axes
 *		- A jQuery/DOM element ( logically, child of the element to scroll )
 *		- A string selector, that will be relative to the element to scroll ( 'li:eq(2)', etc )
 *		- A hash { top:x, left:y }, x and y can be any kind of number/string like above.
 *		- A percentage of the container's dimension/s, for example: 50% to go to the middle.
 *		- The string 'max' for go-to-end. 
 * @param {Number, Function} duration The OVERALL length of the animation, this argument can be the settings object instead.
 * @param {Object,Function} settings Optional set of settings or the onAfter callback.
 *	 @option {String} axis Which axis must be scrolled, use 'x', 'y', 'xy' or 'yx'.
 *	 @option {Number, Function} duration The OVERALL length of the animation.
 *	 @option {String} easing The easing method for the animation.
 *	 @option {Boolean} margin If true, the margin of the target element will be deducted from the final position.
 *	 @option {Object, Number} offset Add/deduct from the end position. One number for both axes or { top:x, left:y }.
 *	 @option {Object, Number} over Add/deduct the height/width multiplied by 'over', can be { top:x, left:y } when using both axes.
 *	 @option {Boolean} queue If true, and both axis are given, the 2nd axis will only be animated after the first one ends.
 *	 @option {Function} onAfter Function to be called after the scrolling ends. 
 *	 @option {Function} onAfterFirst If queuing is activated, this function will be called after the first scrolling ends.
 * @return {jQuery} Returns the same jQuery object, for chaining.
 *
 * @desc Scroll to a fixed position
 * @example $('div').scrollTo( 340 );
 *
 * @desc Scroll relatively to the actual position
 * @example $('div').scrollTo( '+=340px', { axis:'y' } );
 *
 * @desc Scroll using a selector (relative to the scrolled element)
 * @example $('div').scrollTo( 'p.paragraph:eq(2)', 500, { easing:'swing', queue:true, axis:'xy' } );
 *
 * @desc Scroll to a DOM element (same for jQuery object)
 * @example var second_child = document.getElementById('container').firstChild.nextSibling;
 *			$('#container').scrollTo( second_child, { duration:500, axis:'x', onAfter:function(){
 *				alert('scrolled!!');																   
 *			}});
 *
 * @desc Scroll on both axes, to different values
 * @example $('div').scrollTo( { top: 300, left:'+=200' }, { axis:'xy', offset:-20 } );
 */

;(function( $ ){
	
	var $scrollTo = $.scrollTo = function( target, duration, settings ){
		$(window).scrollTo( target, duration, settings );
	};

	$scrollTo.defaults = {
		axis:'xy',
		duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1,
		limit:true
	};

	// Returns the element that needs to be animated to scroll the window.
	// Kept for backwards compatibility (specially for localScroll & serialScroll)
	$scrollTo.window = function( scope ){
		return $(window)._scrollable();
	};

	// Hack, hack, hack :)
	// Returns the real elements to scroll (supports window/iframes, documents and regular nodes)
	$.fn._scrollable = function(){
		return this.map(function(){
			var elem = this,
				isWin = !elem.nodeName || $.inArray( elem.nodeName.toLowerCase(), ['iframe','#document','html','body'] ) != -1;

				if( !isWin )
					return elem;

			var doc = (elem.contentWindow || elem).document || elem.ownerDocument || elem;
			
			return /webkit/i.test(navigator.userAgent) || doc.compatMode == 'BackCompat' ?
				doc.body : 
				doc.documentElement;
		});
	};

	$.fn.scrollTo = function( target, duration, settings ){
		if( typeof duration == 'object' ){
			settings = duration;
			duration = 0;
		}
		if( typeof settings == 'function' )
			settings = { onAfter:settings };
			
		if( target == 'max' )
			target = 9e9;
			
		settings = $.extend( {}, $scrollTo.defaults, settings );
		// Speed is still recognized for backwards compatibility
		duration = duration || settings.duration;
		// Make sure the settings are given right
		settings.queue = settings.queue && settings.axis.length > 1;
		
		if( settings.queue )
			// Let's keep the overall duration
			duration /= 2;
		settings.offset = both( settings.offset );
		settings.over = both( settings.over );

		return this._scrollable().each(function(){
			// Null target yields nothing, just like jQuery does
			if (target == null) return;

			var elem = this,
				$elem = $(elem),
				targ = target, toff, attr = {},
				win = $elem.is('html,body');

			switch( typeof targ ){
				// A number will pass the regex
				case 'number':
				case 'string':
					if( /^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ) ){
						targ = both( targ );
						// We are done
						break;
					}
					// Relative selector, no break!
					targ = $(targ,this);
					if (!targ.length) return;
				case 'object':
					// DOMElement / jQuery
					if( targ.is || targ.style )
						// Get the real position of the target 
						toff = (targ = $(targ)).offset();
			}
			$.each( settings.axis.split(''), function( i, axis ){
				var Pos	= axis == 'x' ? 'Left' : 'Top',
					pos = Pos.toLowerCase(),
					key = 'scroll' + Pos,
					old = elem[key],
					max = $scrollTo.max(elem, axis);

				if( toff ){// jQuery / DOMElement
					attr[key] = toff[pos] + ( win ? 0 : old - $elem.offset()[pos] );

					// If it's a dom element, reduce the margin
					if( settings.margin ){
						attr[key] -= parseInt(targ.css('margin'+Pos)) || 0;
						attr[key] -= parseInt(targ.css('border'+Pos+'Width')) || 0;
					}
					
					attr[key] += settings.offset[pos] || 0;
					
					if( settings.over[pos] )
						// Scroll to a fraction of its width/height
						attr[key] += targ[axis=='x'?'width':'height']() * settings.over[pos];
				}else{ 
					var val = targ[pos];
					// Handle percentage values
					attr[key] = val.slice && val.slice(-1) == '%' ? 
						parseFloat(val) / 100 * max
						: val;
				}

				// Number or 'number'
				if( settings.limit && /^\d+$/.test(attr[key]) )
					// Check the limits
					attr[key] = attr[key] <= 0 ? 0 : Math.min( attr[key], max );

				// Queueing axes
				if( !i && settings.queue ){
					// Don't waste time animating, if there's no need.
					if( old != attr[key] )
						// Intermediate animation
						animate( settings.onAfterFirst );
					// Don't animate this axis again in the next iteration.
					delete attr[key];
				}
			});

			animate( settings.onAfter );			

			function animate( callback ){
				$elem.animate( attr, duration, settings.easing, callback && function(){
					callback.call(this, target, settings);
				});
			};

		}).end();
	};
	
	// Max scrolling position, works on quirks mode
	// It only fails (not too badly) on IE, quirks mode.
	$scrollTo.max = function( elem, axis ){
		var Dim = axis == 'x' ? 'Width' : 'Height',
			scroll = 'scroll'+Dim;
		
		if( !$(elem).is('html,body') )
			return elem[scroll] - $(elem)[Dim.toLowerCase()]();
		
		var size = 'client' + Dim,
			html = elem.ownerDocument.documentElement,
			body = elem.ownerDocument.body;

		return Math.max( html[scroll], body[scroll] ) 
			 - Math.min( html[size]  , body[size]   );
	};

	function both( val ){
		return typeof val == 'object' ? val : { top:val, left:val };
	};

})( jQuery );;
jQuery(document).ready(function($) {
  $.localScroll.hash({offset: {top:-180, left:0} });
});;
/*
 * Copyright (c) 2009 Simo Kinnunen.
 * Licensed under the MIT license.
 *
 * @version 1.09i
 */
var Cufon=(function(){var m=function(){return m.replace.apply(null,arguments)};var x=m.DOM={ready:(function(){var C=false,E={loaded:1,complete:1};var B=[],D=function(){if(C){return}C=true;for(var F;F=B.shift();F()){}};if(document.addEventListener){document.addEventListener("DOMContentLoaded",D,false);window.addEventListener("pageshow",D,false)}if(!window.opera&&document.readyState){(function(){E[document.readyState]?D():setTimeout(arguments.callee,10)})()}if(document.readyState&&document.createStyleSheet){(function(){try{document.body.doScroll("left");D()}catch(F){setTimeout(arguments.callee,1)}})()}q(window,"load",D);return function(F){if(!arguments.length){D()}else{C?F():B.push(F)}}})(),root:function(){return document.documentElement||document.body}};var n=m.CSS={Size:function(C,B){this.value=parseFloat(C);this.unit=String(C).match(/[a-z%]*$/)[0]||"px";this.convert=function(D){return D/B*this.value};this.convertFrom=function(D){return D/this.value*B};this.toString=function(){return this.value+this.unit}},addClass:function(C,B){var D=C.className;C.className=D+(D&&" ")+B;return C},color:j(function(C){var B={};B.color=C.replace(/^rgba\((.*?),\s*([\d.]+)\)/,function(E,D,F){B.opacity=parseFloat(F);return"rgb("+D+")"});return B}),fontStretch:j(function(B){if(typeof B=="number"){return B}if(/%$/.test(B)){return parseFloat(B)/100}return{"ultra-condensed":0.5,"extra-condensed":0.625,condensed:0.75,"semi-condensed":0.875,"semi-expanded":1.125,expanded:1.25,"extra-expanded":1.5,"ultra-expanded":2}[B]||1}),getStyle:function(C){var B=document.defaultView;if(B&&B.getComputedStyle){return new a(B.getComputedStyle(C,null))}if(C.currentStyle){return new a(C.currentStyle)}return new a(C.style)},gradient:j(function(F){var G={id:F,type:F.match(/^-([a-z]+)-gradient\(/)[1],stops:[]},C=F.substr(F.indexOf("(")).match(/([\d.]+=)?(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)/ig);for(var E=0,B=C.length,D;E<B;++E){D=C[E].split("=",2).reverse();G.stops.push([D[1]||E/(B-1),D[0]])}return G}),quotedList:j(function(E){var D=[],C=/\s*((["'])([\s\S]*?[^\\])\2|[^,]+)\s*/g,B;while(B=C.exec(E)){D.push(B[3]||B[1])}return D}),recognizesMedia:j(function(G){var E=document.createElement("style"),D,C,B;E.type="text/css";E.media=G;try{E.appendChild(document.createTextNode("/**/"))}catch(F){}C=g("head")[0];C.insertBefore(E,C.firstChild);D=(E.sheet||E.styleSheet);B=D&&!D.disabled;C.removeChild(E);return B}),removeClass:function(D,C){var B=RegExp("(?:^|\\s+)"+C+"(?=\\s|$)","g");D.className=D.className.replace(B,"");return D},supports:function(D,C){var B=document.createElement("span").style;if(B[D]===undefined){return false}B[D]=C;return B[D]===C},textAlign:function(E,D,B,C){if(D.get("textAlign")=="right"){if(B>0){E=" "+E}}else{if(B<C-1){E+=" "}}return E},textShadow:j(function(F){if(F=="none"){return null}var E=[],G={},B,C=0;var D=/(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)|(-?[\d.]+[a-z%]*)|,/ig;while(B=D.exec(F)){if(B[0]==","){E.push(G);G={};C=0}else{if(B[1]){G.color=B[1]}else{G[["offX","offY","blur"][C++]]=B[2]}}}E.push(G);return E}),textTransform:(function(){var B={uppercase:function(C){return C.toUpperCase()},lowercase:function(C){return C.toLowerCase()},capitalize:function(C){return C.replace(/\b./g,function(D){return D.toUpperCase()})}};return function(E,D){var C=B[D.get("textTransform")];return C?C(E):E}})(),whiteSpace:(function(){var D={inline:1,"inline-block":1,"run-in":1};var C=/^\s+/,B=/\s+$/;return function(H,F,G,E){if(E){if(E.nodeName.toLowerCase()=="br"){H=H.replace(C,"")}}if(D[F.get("display")]){return H}if(!G.previousSibling){H=H.replace(C,"")}if(!G.nextSibling){H=H.replace(B,"")}return H}})()};n.ready=(function(){var B=!n.recognizesMedia("all"),E=false;var D=[],H=function(){B=true;for(var K;K=D.shift();K()){}};var I=g("link"),J=g("style");function C(K){return K.disabled||G(K.sheet,K.media||"screen")}function G(M,P){if(!n.recognizesMedia(P||"all")){return true}if(!M||M.disabled){return false}try{var Q=M.cssRules,O;if(Q){search:for(var L=0,K=Q.length;O=Q[L],L<K;++L){switch(O.type){case 2:break;case 3:if(!G(O.styleSheet,O.media.mediaText)){return false}break;default:break search}}}}catch(N){}return true}function F(){if(document.createStyleSheet){return true}var L,K;for(K=0;L=I[K];++K){if(L.rel.toLowerCase()=="stylesheet"&&!C(L)){return false}}for(K=0;L=J[K];++K){if(!C(L)){return false}}return true}x.ready(function(){if(!E){E=n.getStyle(document.body).isUsable()}if(B||(E&&F())){H()}else{setTimeout(arguments.callee,10)}});return function(K){if(B){K()}else{D.push(K)}}})();function s(D){var C=this.face=D.face,B={"\u0020":1,"\u00a0":1,"\u3000":1};this.glyphs=D.glyphs;this.w=D.w;this.baseSize=parseInt(C["units-per-em"],10);this.family=C["font-family"].toLowerCase();this.weight=C["font-weight"];this.style=C["font-style"]||"normal";this.viewBox=(function(){var F=C.bbox.split(/\s+/);var E={minX:parseInt(F[0],10),minY:parseInt(F[1],10),maxX:parseInt(F[2],10),maxY:parseInt(F[3],10)};E.width=E.maxX-E.minX;E.height=E.maxY-E.minY;E.toString=function(){return[this.minX,this.minY,this.width,this.height].join(" ")};return E})();this.ascent=-parseInt(C.ascent,10);this.descent=-parseInt(C.descent,10);this.height=-this.ascent+this.descent;this.spacing=function(L,N,E){var O=this.glyphs,M,K,G,P=[],F=0,J=-1,I=-1,H;while(H=L[++J]){M=O[H]||this.missingGlyph;if(!M){continue}if(K){F-=G=K[H]||0;P[I]-=G}F+=P[++I]=~~(M.w||this.w)+N+(B[H]?E:0);K=M.k}P.total=F;return P}}function f(){var C={},B={oblique:"italic",italic:"oblique"};this.add=function(D){(C[D.style]||(C[D.style]={}))[D.weight]=D};this.get=function(H,I){var G=C[H]||C[B[H]]||C.normal||C.italic||C.oblique;if(!G){return null}I={normal:400,bold:700}[I]||parseInt(I,10);if(G[I]){return G[I]}var E={1:1,99:0}[I%100],K=[],F,D;if(E===undefined){E=I>400}if(I==500){I=400}for(var J in G){if(!k(G,J)){continue}J=parseInt(J,10);if(!F||J<F){F=J}if(!D||J>D){D=J}K.push(J)}if(I<F){I=F}if(I>D){I=D}K.sort(function(M,L){return(E?(M>=I&&L>=I)?M<L:M>L:(M<=I&&L<=I)?M>L:M<L)?-1:1});return G[K[0]]}}function r(){function D(F,G){if(F.contains){return F.contains(G)}return F.compareDocumentPosition(G)&16}function B(G){var F=G.relatedTarget;if(!F||D(this,F)){return}C(this,G.type=="mouseover")}function E(F){C(this,F.type=="mouseenter")}function C(F,G){setTimeout(function(){var H=d.get(F).options;m.replace(F,G?h(H,H.hover):H,true)},10)}this.attach=function(F){if(F.onmouseenter===undefined){q(F,"mouseover",B);q(F,"mouseout",B)}else{q(F,"mouseenter",E);q(F,"mouseleave",E)}}}function u(){var C=[],D={};function B(H){var E=[],G;for(var F=0;G=H[F];++F){E[F]=C[D[G]]}return E}this.add=function(F,E){D[F]=C.push(E)-1};this.repeat=function(){var E=arguments.length?B(arguments):C,F;for(var G=0;F=E[G++];){m.replace(F[0],F[1],true)}}}function A(){var D={},B=0;function C(E){return E.cufid||(E.cufid=++B)}this.get=function(E){var F=C(E);return D[F]||(D[F]={})}}function a(B){var D={},C={};this.extend=function(E){for(var F in E){if(k(E,F)){D[F]=E[F]}}return this};this.get=function(E){return D[E]!=undefined?D[E]:B[E]};this.getSize=function(F,E){return C[F]||(C[F]=new n.Size(this.get(F),E))};this.isUsable=function(){return !!B}}function q(C,B,D){if(C.addEventListener){C.addEventListener(B,D,false)}else{if(C.attachEvent){C.attachEvent("on"+B,function(){return D.call(C,window.event)})}}}function v(C,B){var D=d.get(C);if(D.options){return C}if(B.hover&&B.hoverables[C.nodeName.toLowerCase()]){b.attach(C)}D.options=B;return C}function j(B){var C={};return function(D){if(!k(C,D)){C[D]=B.apply(null,arguments)}return C[D]}}function c(F,E){var B=n.quotedList(E.get("fontFamily").toLowerCase()),D;for(var C=0;D=B[C];++C){if(i[D]){return i[D].get(E.get("fontStyle"),E.get("fontWeight"))}}return null}function g(B){return document.getElementsByTagName(B)}function k(C,B){return C.hasOwnProperty(B)}function h(){var C={},B,F;for(var E=0,D=arguments.length;B=arguments[E],E<D;++E){for(F in B){if(k(B,F)){C[F]=B[F]}}}return C}function o(E,M,C,N,F,D){var K=document.createDocumentFragment(),H;if(M===""){return K}var L=N.separate;var I=M.split(p[L]),B=(L=="words");if(B&&t){if(/^\s/.test(M)){I.unshift("")}if(/\s$/.test(M)){I.push("")}}for(var J=0,G=I.length;J<G;++J){H=z[N.engine](E,B?n.textAlign(I[J],C,J,G):I[J],C,N,F,D,J<G-1);if(H){K.appendChild(H)}}return K}function l(D,M){var C=D.nodeName.toLowerCase();if(M.ignore[C]){return}var E=!M.textless[C];var B=n.getStyle(v(D,M)).extend(M);var F=c(D,B),G,K,I,H,L,J;if(!F){return}for(G=D.firstChild;G;G=I){K=G.nodeType;I=G.nextSibling;if(E&&K==3){if(H){H.appendData(G.data);D.removeChild(G)}else{H=G}if(I){continue}}if(H){D.replaceChild(o(F,n.whiteSpace(H.data,B,H,J),B,M,G,D),H);H=null}if(K==1){if(G.firstChild){if(G.nodeName.toLowerCase()=="cufon"){z[M.engine](F,null,B,M,G,D)}else{arguments.callee(G,M)}}J=G}}}var t=" ".split(/\s+/).length==0;var d=new A();var b=new r();var y=new u();var e=false;var z={},i={},w={autoDetect:false,engine:null,forceHitArea:false,hover:false,hoverables:{a:true},ignore:{applet:1,canvas:1,col:1,colgroup:1,head:1,iframe:1,map:1,optgroup:1,option:1,script:1,select:1,style:1,textarea:1,title:1,pre:1},printable:true,selector:(window.Sizzle||(window.jQuery&&function(B){return jQuery(B)})||(window.dojo&&dojo.query)||(window.Ext&&Ext.query)||(window.YAHOO&&YAHOO.util&&YAHOO.util.Selector&&YAHOO.util.Selector.query)||(window.$$&&function(B){return $$(B)})||(window.$&&function(B){return $(B)})||(document.querySelectorAll&&function(B){return document.querySelectorAll(B)})||g),separate:"words",textless:{dl:1,html:1,ol:1,table:1,tbody:1,thead:1,tfoot:1,tr:1,ul:1},textShadow:"none"};var p={words:/\s/.test("\u00a0")?/[^\S\u00a0]+/:/\s+/,characters:"",none:/^/};m.now=function(){x.ready();return m};m.refresh=function(){y.repeat.apply(y,arguments);return m};m.registerEngine=function(C,B){if(!B){return m}z[C]=B;return m.set("engine",C)};m.registerFont=function(D){if(!D){return m}var B=new s(D),C=B.family;if(!i[C]){i[C]=new f()}i[C].add(B);return m.set("fontFamily",'"'+C+'"')};m.replace=function(D,C,B){C=h(w,C);if(!C.engine){return m}if(!e){n.addClass(x.root(),"cufon-active cufon-loading");n.ready(function(){n.addClass(n.removeClass(x.root(),"cufon-loading"),"cufon-ready")});e=true}if(C.hover){C.forceHitArea=true}if(C.autoDetect){delete C.fontFamily}if(typeof C.textShadow=="string"){C.textShadow=n.textShadow(C.textShadow)}if(typeof C.color=="string"&&/^-/.test(C.color)){C.textGradient=n.gradient(C.color)}else{delete C.textGradient}if(!B){y.add(D,arguments)}if(D.nodeType||typeof D=="string"){D=[D]}n.ready(function(){for(var F=0,E=D.length;F<E;++F){var G=D[F];if(typeof G=="string"){m.replace(C.selector(G),C,true)}else{l(G,C)}}});return m};m.set=function(B,C){w[B]=C;return m};return m})();Cufon.registerEngine("vml",(function(){var e=document.namespaces;if(!e){return}e.add("cvml","urn:schemas-microsoft-com:vml");e=null;var b=document.createElement("cvml:shape");b.style.behavior="url(#default#VML)";if(!b.coordsize){return}b=null;var h=(document.documentMode||0)<8;document.write(('<style type="text/css">cufoncanvas{text-indent:0;}@media screen{cvml\\:shape,cvml\\:rect,cvml\\:fill,cvml\\:shadow{behavior:url(#default#VML);display:block;antialias:true;position:absolute;}cufoncanvas{position:absolute;text-align:left;}cufon{display:inline-block;position:relative;vertical-align:'+(h?"middle":"text-bottom")+";}cufon cufontext{position:absolute;left:-10000in;font-size:1px;}a cufon{cursor:pointer}}@media print{cufon cufoncanvas{display:none;}}</style>").replace(/;/g,"!important;"));function c(i,j){return a(i,/(?:em|ex|%)$|^[a-z-]+$/i.test(j)?"1em":j)}function a(l,m){if(m==="0"){return 0}if(/px$/i.test(m)){return parseFloat(m)}var k=l.style.left,j=l.runtimeStyle.left;l.runtimeStyle.left=l.currentStyle.left;l.style.left=m.replace("%","em");var i=l.style.pixelLeft;l.style.left=k;l.runtimeStyle.left=j;return i}function f(l,k,j,n){var i="computed"+n,m=k[i];if(isNaN(m)){m=k.get(n);k[i]=m=(m=="normal")?0:~~j.convertFrom(a(l,m))}return m}var g={};function d(p){var q=p.id;if(!g[q]){var n=p.stops,o=document.createElement("cvml:fill"),i=[];o.type="gradient";o.angle=180;o.focus="0";o.method="sigma";o.color=n[0][1];for(var m=1,l=n.length-1;m<l;++m){i.push(n[m][0]*100+"% "+n[m][1])}o.colors=i.join(",");o.color2=n[l][1];g[q]=o}return g[q]}return function(ac,G,Y,C,K,ad,W){var n=(G===null);if(n){G=K.alt}var I=ac.viewBox;var p=Y.computedFontSize||(Y.computedFontSize=new Cufon.CSS.Size(c(ad,Y.get("fontSize"))+"px",ac.baseSize));var y,q;if(n){y=K;q=K.firstChild}else{y=document.createElement("cufon");y.className="cufon cufon-vml";y.alt=G;q=document.createElement("cufoncanvas");y.appendChild(q);if(C.printable){var Z=document.createElement("cufontext");Z.appendChild(document.createTextNode(G));y.appendChild(Z)}if(!W){y.appendChild(document.createElement("cvml:shape"))}}var ai=y.style;var R=q.style;var l=p.convert(I.height),af=Math.ceil(l);var V=af/l;var P=V*Cufon.CSS.fontStretch(Y.get("fontStretch"));var U=I.minX,T=I.minY;R.height=af;R.top=Math.round(p.convert(T-ac.ascent));R.left=Math.round(p.convert(U));ai.height=p.convert(ac.height)+"px";var F=Y.get("color");var ag=Cufon.CSS.textTransform(G,Y).split("");var L=ac.spacing(ag,f(ad,Y,p,"letterSpacing"),f(ad,Y,p,"wordSpacing"));if(!L.length){return null}var k=L.total;var x=-U+k+(I.width-L[L.length-1]);var ah=p.convert(x*P),X=Math.round(ah);var O=x+","+I.height,m;var J="r"+O+"ns";var u=C.textGradient&&d(C.textGradient);var o=ac.glyphs,S=0;var H=C.textShadow;var ab=-1,aa=0,w;while(w=ag[++ab]){var D=o[ag[ab]]||ac.missingGlyph,v;if(!D){continue}if(n){v=q.childNodes[aa];while(v.firstChild){v.removeChild(v.firstChild)}}else{v=document.createElement("cvml:shape");q.appendChild(v)}v.stroked="f";v.coordsize=O;v.coordorigin=m=(U-S)+","+T;v.path=(D.d?"m"+D.d+"xe":"")+"m"+m+J;v.fillcolor=F;if(u){v.appendChild(u.cloneNode(false))}var ae=v.style;ae.width=X;ae.height=af;if(H){var s=H[0],r=H[1];var B=Cufon.CSS.color(s.color),z;var N=document.createElement("cvml:shadow");N.on="t";N.color=B.color;N.offset=s.offX+","+s.offY;if(r){z=Cufon.CSS.color(r.color);N.type="double";N.color2=z.color;N.offset2=r.offX+","+r.offY}N.opacity=B.opacity||(z&&z.opacity)||1;v.appendChild(N)}S+=L[aa++]}var M=v.nextSibling,t,A;if(C.forceHitArea){if(!M){M=document.createElement("cvml:rect");M.stroked="f";M.className="cufon-vml-cover";t=document.createElement("cvml:fill");t.opacity=0;M.appendChild(t);q.appendChild(M)}A=M.style;A.width=X;A.height=af}else{if(M){q.removeChild(M)}}ai.width=Math.max(Math.ceil(p.convert(k*P)),0);if(h){var Q=Y.computedYAdjust;if(Q===undefined){var E=Y.get("lineHeight");if(E=="normal"){E="1em"}else{if(!isNaN(E)){E+="em"}}Y.computedYAdjust=Q=0.5*(a(ad,E)-parseFloat(ai.height))}if(Q){ai.marginTop=Math.ceil(Q)+"px";ai.marginBottom=Q+"px"}}return y}})());Cufon.registerEngine("canvas",(function(){var b=document.createElement("canvas");if(!b||!b.getContext||!b.getContext.apply){return}b=null;var a=Cufon.CSS.supports("display","inline-block");var e=!a&&(document.compatMode=="BackCompat"||/frameset|transitional/i.test(document.doctype.publicId));var f=document.createElement("style");f.type="text/css";f.appendChild(document.createTextNode(("cufon{text-indent:0;}@media screen,projection{cufon{display:inline;display:inline-block;position:relative;vertical-align:middle;"+(e?"":"font-size:1px;line-height:1px;")+"}cufon cufontext{display:-moz-inline-box;display:inline-block;width:0;height:0;overflow:hidden;text-indent:-10000in;}"+(a?"cufon canvas{position:relative;}":"cufon canvas{position:absolute;}")+"}@media print{cufon{padding:0;}cufon canvas{display:none;}}").replace(/;/g,"!important;")));document.getElementsByTagName("head")[0].appendChild(f);function d(p,h){var n=0,m=0;var g=[],o=/([mrvxe])([^a-z]*)/g,k;generate:for(var j=0;k=o.exec(p);++j){var l=k[2].split(",");switch(k[1]){case"v":g[j]={m:"bezierCurveTo",a:[n+~~l[0],m+~~l[1],n+~~l[2],m+~~l[3],n+=~~l[4],m+=~~l[5]]};break;case"r":g[j]={m:"lineTo",a:[n+=~~l[0],m+=~~l[1]]};break;case"m":g[j]={m:"moveTo",a:[n=~~l[0],m=~~l[1]]};break;case"x":g[j]={m:"closePath"};break;case"e":break generate}h[g[j].m].apply(h,g[j].a)}return g}function c(m,k){for(var j=0,h=m.length;j<h;++j){var g=m[j];k[g.m].apply(k,g.a)}}return function(V,w,P,t,C,W){var k=(w===null);if(k){w=C.getAttribute("alt")}var A=V.viewBox;var m=P.getSize("fontSize",V.baseSize);var B=0,O=0,N=0,u=0;var z=t.textShadow,L=[];if(z){for(var U=z.length;U--;){var F=z[U];var K=m.convertFrom(parseFloat(F.offX));var I=m.convertFrom(parseFloat(F.offY));L[U]=[K,I];if(I<B){B=I}if(K>O){O=K}if(I>N){N=I}if(K<u){u=K}}}var Z=Cufon.CSS.textTransform(w,P).split("");var E=V.spacing(Z,~~m.convertFrom(parseFloat(P.get("letterSpacing"))||0),~~m.convertFrom(parseFloat(P.get("wordSpacing"))||0));if(!E.length){return null}var h=E.total;O+=A.width-E[E.length-1];u+=A.minX;var s,n;if(k){s=C;n=C.firstChild}else{s=document.createElement("cufon");s.className="cufon cufon-canvas";s.setAttribute("alt",w);n=document.createElement("canvas");s.appendChild(n);if(t.printable){var S=document.createElement("cufontext");S.appendChild(document.createTextNode(w));s.appendChild(S)}}var aa=s.style;var H=n.style;var j=m.convert(A.height);var Y=Math.ceil(j);var M=Y/j;var G=M*Cufon.CSS.fontStretch(P.get("fontStretch"));var J=h*G;var Q=Math.ceil(m.convert(J+O-u));var o=Math.ceil(m.convert(A.height-B+N));n.width=Q;n.height=o;H.width=Q+"px";H.height=o+"px";B+=A.minY;H.top=Math.round(m.convert(B-V.ascent))+"px";H.left=Math.round(m.convert(u))+"px";var r=Math.max(Math.ceil(m.convert(J)),0)+"px";if(a){aa.width=r;aa.height=m.convert(V.height)+"px"}else{aa.paddingLeft=r;aa.paddingBottom=(m.convert(V.height)-1)+"px"}var X=n.getContext("2d"),D=j/A.height;X.scale(D,D*M);X.translate(-u,-B);X.save();function T(){var x=V.glyphs,ab,l=-1,g=-1,y;X.scale(G,1);while(y=Z[++l]){var ab=x[Z[l]]||V.missingGlyph;if(!ab){continue}if(ab.d){X.beginPath();if(ab.code){c(ab.code,X)}else{ab.code=d("m"+ab.d,X)}X.fill()}X.translate(E[++g],0)}X.restore()}if(z){for(var U=z.length;U--;){var F=z[U];X.save();X.fillStyle=F.color;X.translate.apply(X,L[U]);T()}}var q=t.textGradient;if(q){var v=q.stops,p=X.createLinearGradient(0,A.minY,0,A.maxY);for(var U=0,R=v.length;U<R;++U){p.addColorStop.apply(p,v[U])}X.fillStyle=p}else{X.fillStyle=P.get("color")}T();return s}})());;
/*!
 * The following copyright notice may not be removed under any circumstances.
 * 
 * Description:
 * Font generated by IcoMoon.
 */
Cufon.registerFont({"w":360,"face":{"font-family":"docfont","font-weight":400,"font-stretch":"normal","units-per-em":"360","panose-1":"0 0 0 0 0 0 0 0 0 0","ascent":"338","descent":"-22","bbox":"-2.59912 -339.403 383.627 26","underline-thickness":"0","underline-position":"0","unicode-range":"U+0001-U+FFFD"},"glyphs":{" ":{"d":"0,0r0,0r0,0","w":180},"\ufffd":{"w":0},"\ue001":{"d":"291,-13v10,1,12,-5,11,-14r0,-112v14,-1,53,5,36,-13r-144,-145v-5,-6,-21,-6,-27,0r-145,145v-5,7,-5,13,7,13r29,0r1,112v0,10,2,15,14,14r71,0r-1,-111r74,0r0,111r74,0"},"\ue002":{"d":"0,-225r360,0r-180,-113xm292,-180r0,135r46,0r0,-135r11,-22r-68,0xm202,-180r0,135r46,0r0,-135r11,-22r-68,0xm112,-180r0,135r46,0r0,-135r11,-22r-68,0xm22,-180r0,135r46,0r0,-135r11,-22r-68,0xm0,22r360,0r-11,-44r-338,0xm202,-270v0,14,-8,22,-22,22v-14,0,-22,-8,-22,-22v0,-14,8,-22,22,-22v14,0,22,8,22,22"},"\ue003":{"d":"51,-58v-7,-20,20,-27,26,-13v8,20,-20,27,-26,13xm51,-110v-8,-20,20,-26,26,-13v8,19,-19,29,-26,13xm103,-109v-9,-20,22,-28,26,-13v7,19,-18,26,-26,13xm51,-162v-8,-19,22,-26,26,-12v8,20,-19,27,-26,12xm206,-72v0,-8,24,-9,25,1v2,16,-3,22,-19,20v-9,0,-6,-12,-6,-21xm161,-129v19,-7,26,18,13,26v-15,2,-23,-2,-20,-19v0,-4,3,-8,7,-7xm109,-154v-14,-7,-5,-36,13,-26v8,-1,7,10,7,18v0,9,-11,7,-20,8xm51,-213v-7,-19,20,-26,26,-13v2,16,-3,23,-19,19v-4,1,-7,-2,-7,-6xm206,-109v-9,-20,21,-28,25,-13v8,19,-19,27,-25,13xm154,-162v-8,-19,22,-26,26,-12v8,20,-19,28,-26,12xm109,-206v-10,-1,-8,-26,0,-26v12,0,20,0,20,19v0,9,-12,5,-20,7xm51,-264v-8,-19,21,-26,26,-13v8,19,-19,28,-26,13xm212,-154v-10,-1,-9,-28,0,-27v16,-7,27,18,13,26xm154,-213v-8,-19,21,-26,26,-13v2,14,-1,24,-19,19v-5,1,-7,-2,-7,-6xm105,-259v-14,-20,18,-35,24,-17v5,18,-10,22,-24,17xm206,-213v-8,-19,20,-26,25,-13v2,14,-1,24,-19,19v-4,0,-7,-1,-6,-6xm154,-264v-8,-20,23,-27,26,-12v-1,8,2,19,-6,18v-8,1,-20,2,-20,-6xm206,-264v-4,-17,6,-23,23,-18v6,12,1,31,-17,24v-4,0,-7,-1,-6,-6xm174,-52v13,7,3,36,6,52r77,-1r0,-308r-231,0r0,309r77,-1v2,-16,-6,-43,6,-50xm270,-335v6,0,13,7,13,13r0,335v0,6,-7,13,-13,13r-257,-1v-6,0,-13,-6,-13,-13r0,-333v0,-7,7,-13,13,-13","w":283},"\ue004":{"d":"324,-283v0,-23,-15,-36,-36,-36r-216,0v-21,1,-35,13,-35,36r-1,251v1,22,15,36,36,36r217,0v20,-2,36,-14,36,-36xm72,-32r0,-251r216,0r1,251r-217,0xm109,-122r-1,19r91,0r-1,-19r-89,0xm180,-193r1,17r71,0r0,-17r-72,0xm252,-212r0,-36r-71,0r-1,36r72,0xm108,-248r1,72r53,0r0,-72r-54,0xm109,-158r-1,19r37,0r-1,-19r-35,0xm252,-139r0,-19r-90,0r0,19r90,0xm109,-86r-1,18r144,0r0,-18r-143,0xm252,-103r0,-19r-36,0r1,19r35,0"},"\ue005":{"d":"14,-166v-16,2,-19,31,-1,32r24,7r19,-30xm252,-56r-100,-77r-13,-3r-18,29r20,5v38,27,71,59,112,83v5,0,8,-2,11,-4r95,-87v6,-16,-13,-31,-26,-19xm3,-27v-9,12,6,30,21,22v3,-1,5,-3,6,-6r126,-197r94,58v8,1,13,-2,16,-6r94,-137v4,-19,-21,-25,-30,-12r-81,117r-95,-59v-8,-1,-13,2,-16,7"},"\ue006":{"d":"324,-302v0,-24,-35,-15,-58,-17v-10,0,-14,8,-14,17r0,306r72,0r0,-306xm216,-193v-1,-25,-33,-19,-58,-19v-9,0,-13,9,-14,19r0,197r72,0r0,-197xm108,-86v0,-24,-34,-16,-57,-17v-11,-1,-14,8,-15,17r0,90r72,0r0,-90"},"\ue007":{"d":"0,-45r360,0r0,45r-360,0r0,-45xm45,-135r45,0r0,67r-45,0r0,-67xm112,-225r46,0r0,157r-46,0r0,-157xm180,-158r45,0r0,90r-45,0r0,-90xm248,-292r44,0r0,224r-44,0r0,-224"},"\ue008":{"d":"162,-298v-74,11,-122,58,-133,133r133,-1r0,-132xm179,4v131,6,196,-158,114,-252v-23,-27,-54,-43,-94,-50r0,152v0,11,-8,19,-18,19r-152,-1v14,77,64,128,150,132"},"\ue009":{"d":"360,-193v1,-14,-5,-19,-17,-19r-326,0v-12,0,-19,5,-17,19r16,169v2,8,10,10,19,11r290,0v13,-1,19,-5,20,-19xm335,-237v-3,-15,-8,-28,-26,-29v-57,-5,-134,16,-164,-23v-14,-19,-56,-13,-89,-13v-28,0,-21,40,-26,65r305,0"},"\ue00a":{"d":"305,-248v4,-13,-15,-16,-17,-18r-216,0v-1,2,-21,5,-17,18r0,19r250,0r0,-19xm269,-283v4,-13,-13,-18,-17,-19r-144,0v-3,1,-22,6,-17,19r178,0xm328,-32v5,-54,30,-130,26,-184v-6,-7,-18,-20,-24,-24r0,28r-300,0r0,-28v-7,7,-26,17,-26,33v0,52,22,124,28,175v2,14,10,19,23,19r260,-2v7,-1,12,-8,13,-17xm252,-168v-2,23,9,53,-19,53r-106,0v-28,2,-17,-30,-19,-53r26,0r0,29r92,0r0,-29r26,0"},"\ue00b":{"d":"86,-214r60,0r0,92r68,0r0,-92r60,0r-94,-88xm327,4v34,-4,24,-50,33,-79v-11,-31,-47,-37,-69,-57r-36,0r61,47v-22,1,-49,-3,-68,2r-14,40r-108,0v-7,-13,-8,-32,-19,-42r-63,0r61,-47r-36,0r-63,43v-14,20,4,52,5,77v3,9,11,16,22,16r294,0"},"\ue00c":{"d":"290,-132r-35,0r61,47v-22,1,-49,-3,-68,2r-14,40r-109,0v-7,-13,-6,-35,-19,-42r-62,0r60,-47r-35,0v-23,21,-66,25,-69,64v10,25,0,72,33,72r301,-1v24,-13,28,-66,20,-92v-20,-16,-43,-28,-64,-43xm274,-210r-60,0r0,-92r-68,0r-1,92r-59,0r93,88"},"\ue00d":{"d":"288,-17v31,-2,14,-56,18,-86r-36,30r0,20r-234,0r0,-162v21,-1,51,6,56,-11v6,-7,17,-15,30,-25r-104,0v-11,0,-17,7,-18,18r0,198v1,11,7,18,18,18r270,0xm240,-115r120,-93r-120,-90r0,56v-73,0,-114,24,-126,72r-18,72v29,-53,61,-83,144,-80r0,63"},"\ue00e":{"d":"324,-49v4,-45,-54,-69,-87,-43r-94,-56v0,-7,2,-13,0,-19r94,-56v30,26,90,3,87,-43v-2,-33,-22,-53,-54,-53v-35,0,-58,25,-53,62r-94,57v-31,-27,-87,-3,-87,42v0,46,55,70,87,43r94,57v-4,36,18,62,53,62v33,0,52,-21,54,-53"},"\ue00f":{"d":"111,-248v-25,-1,-85,15,-92,31v0,4,2,5,8,5r306,0v6,0,7,-1,7,-5v-7,-17,-67,-32,-92,-31r0,-54r-136,0xm356,-107v0,-32,12,-85,-20,-85r-313,0v-31,4,-20,54,-20,85v0,24,30,22,56,21r-17,90r275,0r-17,-90v26,1,56,3,56,-21xm103,-148r153,0r24,116r-201,0"},"\ue010":{"d":"180,-193v-33,0,-54,21,-54,54v0,33,22,53,54,53v32,0,54,-20,54,-53v0,-33,-21,-54,-54,-54xm360,-212v1,-43,-51,-33,-88,-39v-16,-12,-7,-46,-31,-51r-122,0v-27,4,-11,50,-40,54v-40,-2,-79,-1,-79,36r0,163v2,21,14,36,36,36r288,0v22,-2,36,-15,36,-36r0,-163xm180,-49v-53,0,-90,-36,-90,-90v0,-55,36,-90,90,-90v54,0,90,35,90,90v0,54,-37,90,-90,90xm311,-186v-8,1,-12,-7,-12,-13v0,-6,4,-14,12,-13v6,-1,14,7,13,13v1,6,-7,14,-13,13"},"\ue011":{"d":"220,-215r-35,53r-26,-26r-25,42r-20,-19r-20,42r163,-1xm45,-22r259,0r0,-259r-259,0r0,259xm68,-101r0,-157r213,-1r0,158r-213,0xm118,-191v10,0,17,-5,17,-16v0,-25,-34,-20,-34,0v1,10,6,16,17,16"},"\ue012":{"d":"270,-13r0,-81r28,7r41,-151r-207,-57r-13,52r-23,-1r21,-77r249,66r-66,250xm0,22r0,-259r259,1r0,258r-259,0xm22,-214r0,158r215,-1r0,-157r-215,0xm89,-101r25,-42r26,26r35,-53r37,91r-164,0r21,-42xm56,-163v1,-21,32,-22,34,0v2,18,-28,23,-32,7v-1,-2,-2,-4,-2,-7","w":365},"\ue013":{"d":"342,-32v16,1,14,-19,14,-36r-35,0r0,-35r35,0r0,-36r-35,0r0,-37r35,0r0,-36r-35,0r0,-36r35,0v1,-17,2,-36,-14,-35r-324,0v-16,-1,-15,18,-14,35r35,0r0,36r-35,0r0,36r35,0r0,37r-35,0r0,36r35,0r0,35r-35,0v0,17,-2,37,14,36r324,0xm141,-212r90,54r-90,55r0,-109"},"\ue014":{"d":"157,-8v-58,69,-193,4,-150,-92v20,-45,68,-81,104,-116r115,-112v61,-40,132,46,76,102r-181,181v-27,25,-80,-2,-59,-44v40,-50,90,-92,134,-139v7,-9,22,-2,22,9v0,4,-2,6,-4,9r-122,122v-17,10,-5,39,10,24r182,-179v32,-27,-1,-89,-45,-63r-190,189v-50,40,-9,137,64,109v9,-4,18,-10,26,-18r182,-181v6,-8,22,-1,21,9v0,4,-1,7,-4,9"},"\ue015":{"d":"23,-5v1,16,11,28,28,28r270,-2v9,-5,18,-12,17,-27r-2,-225v-12,-45,-50,-65,-78,-94v-47,-25,-140,-7,-207,-13v-16,2,-29,13,-29,29xm248,-304v22,16,40,41,58,57r-58,-1r0,-56xm315,-224r1,219r-1,-1v1,4,-2,7,-5,7r-259,-1v-3,1,-6,-2,-5,-5r-1,-304v0,-2,2,-6,6,-5r175,0r-1,89"},"\ue016":{"d":"145,-166v24,-26,66,28,66,-22v-19,-36,-83,-22,-101,6v-46,31,-118,126,-31,164v41,18,81,-9,93,-42v2,-16,-20,-24,-31,-13v-14,35,-84,26,-67,-21v21,-26,48,-47,71,-72xm304,-184v48,-45,-2,-144,-71,-113v-19,8,-38,23,-45,45v5,31,41,10,49,-6v23,-23,67,11,46,44r-62,61v-24,29,-33,11,-56,4v-10,1,-17,7,-17,18v10,44,82,31,99,4"},"\ue017":{"d":"27,-262v-16,2,-4,16,2,19r143,76v35,4,160,-75,169,-87v0,-6,-2,-7,-8,-8r-306,0xm324,-53v29,-4,18,-52,18,-82r-1,-72v-20,5,-5,5,-77,38v-30,14,-54,37,-92,38v-11,4,-154,-95,-154,-71r0,132v1,9,9,17,18,17r288,0"},"\ue018":{"d":"248,-199v-22,46,-62,84,-107,107v-26,2,-26,-33,-59,-21v-24,9,-67,47,-32,75v30,45,100,11,134,-14v62,-44,140,-105,140,-198v0,-31,-21,-38,-39,-52v-35,-7,-57,31,-61,62v3,17,25,20,24,41"},"\ue019":{"d":"299,-195v-58,34,-181,33,-238,0r20,175v35,47,163,47,198,0xm180,-204v58,0,127,-4,137,-54v-9,-27,-49,-41,-80,-44v-12,-11,-16,-30,-41,-28v-21,2,-50,-7,-57,11r-16,16v-34,9,-73,15,-80,49v14,44,80,50,137,50xm112,-262v10,-4,33,-54,50,-52v50,-10,61,23,86,51r-31,1r-22,-25r-30,1r-22,23"},"\ue01a":{"d":"342,-15v9,5,17,-3,18,-11r-2,-217v-30,-22,-61,-41,-94,-59v-31,14,-55,35,-84,51v-28,-17,-53,-37,-84,-51v-34,17,-64,39,-95,59r-1,217v1,9,9,17,18,11r77,-49v29,17,54,36,85,51v31,-14,55,-35,84,-51xm23,-48r-1,-182r62,-37r-1,181xm106,-86r2,-181r59,37r1,182xm192,-48r-1,-182r61,-37r-1,181xm274,-86r2,-181r59,37r1,182"},"\ue01b":{"d":"180,-302v-115,0,-106,144,-45,222r45,67v35,-52,94,-128,90,-199v-4,-53,-36,-90,-90,-90xm180,-162v-29,0,-49,-20,-49,-48v0,-30,20,-49,49,-49v29,0,49,19,49,49v0,28,-20,48,-49,48"},"\ue01c":{"d":"160,-312v0,-10,-14,-6,-23,-7v-5,0,-8,2,-8,7r0,68v-28,2,-63,-5,-83,6v-12,14,-51,22,-42,42v21,12,33,35,62,35r63,0r0,158v0,10,14,6,24,7v4,0,7,-3,7,-7r0,-309xm294,-197v27,-5,47,-25,66,-41v-16,-19,-38,-34,-66,-42r-123,0r15,83r108,0"},"\ue01d":{"d":"300,-148v6,-3,7,-16,0,-19r-161,-98v-10,-1,-13,6,-13,15r0,185v-1,12,9,19,20,12"},"\ue01e":{"d":"243,-283v-18,0,-32,5,-32,23r0,205v0,18,14,23,32,23v18,0,32,-6,33,-23r0,-205v-1,-17,-15,-23,-33,-23xm117,-283v-18,0,-32,6,-33,23r0,205v1,17,15,23,33,23v18,0,32,-5,32,-23r0,-205v0,-18,-14,-23,-32,-23"},"\ue01f":{"d":"180,-283v-76,0,-126,51,-126,125v0,75,49,126,126,126v77,0,126,-51,126,-126v0,-74,-50,-125,-126,-125"},"\ue020":{"d":"288,-242v1,-19,-10,-24,-27,-24r-162,0v-17,1,-27,5,-27,24r0,169v-1,19,10,24,27,24r162,0v17,-1,27,-5,27,-24r0,-169"},"\ue021":{"d":"330,-149v5,-4,6,-13,0,-17r-142,-92v-8,-1,-11,6,-12,14r0,173v0,11,9,18,19,11xm167,-149v5,-4,6,-13,0,-17r-137,-92v-9,-1,-11,6,-12,14r0,173v-1,11,9,18,19,11"},"\ue022":{"d":"30,-166v-5,4,-6,13,0,17r142,92v8,1,11,-6,12,-14r0,-173v0,-11,-9,-18,-19,-11xm193,-166v-5,4,-6,13,0,17r137,92v9,1,11,-6,12,-14r0,-173v1,-11,-9,-18,-19,-11"},"\ue023":{"d":"139,-165v-5,3,-5,12,0,15r132,82v9,6,18,2,17,-9r0,-161v1,-11,-8,-16,-17,-10xm99,-262v-16,0,-27,5,-27,21r0,167v0,16,11,21,27,21v16,0,27,-5,27,-21r0,-167v0,-16,-11,-21,-27,-21"},"\ue024":{"d":"221,-150v5,-2,5,-13,0,-15r-131,-83v-11,-6,-18,-1,-18,10r0,161v-1,11,9,14,17,9xm261,-262v-15,0,-27,5,-27,21r1,167v-1,18,12,21,27,21v16,0,27,-5,27,-21r-1,-167v1,-16,-11,-21,-27,-21"},"\ue025":{"d":"11,-158v0,-89,59,-147,148,-147v87,0,140,58,146,144r45,0r-67,74r-66,-74r51,0v-4,-65,-44,-107,-110,-107v-66,0,-106,45,-110,110v-5,91,106,140,175,90r26,27v-23,17,-50,31,-90,31v-90,0,-148,-59,-148,-148"},"\ue026":{"d":"133,-240v-68,-33,-84,42,-106,88v-34,74,14,161,84,162v67,1,126,-32,158,-63v21,-52,-29,-98,-58,-131v-21,-23,-51,-43,-78,-56xm246,-70v-77,-10,-126,-73,-150,-138v-2,-12,0,-14,12,-11v67,19,116,73,138,138v1,6,1,9,0,11xm236,-242v-12,12,0,37,20,29v17,-12,29,-30,44,-44v7,-19,-17,-34,-30,-20xm202,-256v12,-17,46,-57,12,-69v-26,6,-33,32,-39,58v3,9,14,16,27,11xm335,-178v18,-11,2,-44,-18,-32r-41,25v-9,17,8,36,24,27"},"\ue027":{"d":"333,-285v14,-11,1,-38,-19,-30r-292,291v-7,19,16,33,30,20xm256,-172v15,22,30,44,27,68v-21,2,-46,-12,-67,-28r-100,100v75,26,148,-20,191,-54v20,-38,-14,-77,-33,-104xm212,-250v-24,-17,-61,-46,-95,-26v-32,38,-77,104,-58,179r97,-98v-13,-19,-24,-38,-22,-58v20,-4,40,9,59,21"},"\ue028":{"d":"252,-264r-54,52r35,36r54,-55r36,45r0,-114r-114,0xm73,-85r-36,-44r0,114r114,0r-44,-36r55,-53r-36,-36"},"\ue029":{"d":"18,-32r36,36r52,-55r36,38r0,-107r-106,0r38,36xm306,-319r-52,55r-36,-38r0,107r106,0r-38,-36r56,-52"},"\ue02a":{"d":"38,-188v-3,86,95,140,171,99v28,24,46,57,80,74v18,-5,44,-27,27,-44r-68,-68v43,-76,-13,-176,-99,-173v-66,3,-108,45,-111,112xm72,-188v0,-48,32,-78,77,-78v47,0,81,34,81,81v0,47,-30,77,-77,77v-49,0,-81,-34,-81,-80"},"\ue02b":{"d":"307,11v19,26,71,-1,49,-32v-26,-36,-67,-58,-99,-88v-6,-2,-10,-7,-19,-6v17,-22,34,-48,32,-87v-4,-81,-53,-136,-135,-136v-82,0,-135,55,-135,136v0,80,53,134,135,134v39,0,67,-13,88,-32v-1,13,6,18,11,26xm135,-112v-53,0,-90,-35,-90,-90v0,-55,36,-90,90,-90v54,0,90,35,90,90v0,55,-37,90,-90,90xm158,-270r-46,0r0,45r-44,0r0,45r44,0r0,45r46,0r0,-45r44,0r0,-45r-44,0r0,-45"},"\ue02c":{"d":"307,11v19,26,71,-1,49,-32v-26,-36,-67,-58,-99,-88v-6,-2,-10,-7,-19,-6v17,-22,34,-48,32,-87v-4,-81,-53,-136,-135,-136v-82,0,-135,55,-135,136v0,80,53,134,135,134v39,0,67,-13,88,-32v-1,13,6,18,11,26xm135,-112v-53,0,-90,-35,-90,-90v0,-55,36,-90,90,-90v54,0,90,35,90,90v0,55,-37,90,-90,90xm68,-225r134,0r0,45r-134,0r0,-45"},"\ue02d":{"d":"325,-248v-1,-21,-15,-35,-37,-35r-216,0v-22,0,-35,13,-35,35v0,59,-26,162,35,162r73,0r71,54r1,-54v46,-2,107,13,107,-36"},"\ue02e":{"d":"108,-49v49,-5,126,17,126,-37v0,-11,4,-27,-3,-33r-127,1r0,-112v-44,2,-107,-10,-104,37v4,60,-27,153,54,144r0,53xm360,-176v0,-55,20,-144,-36,-144r-162,1v-23,0,-36,14,-36,36r0,143r126,1r54,53r0,-53v31,1,54,-8,54,-37"},"\ue02f":{"d":"360,-280v-2,-21,-15,-36,-36,-36r-288,0v-21,2,-36,15,-36,36r0,198v4,54,70,46,114,59r-29,12v-19,8,-17,12,5,12r180,0v22,0,24,-4,5,-12r-29,-12v44,-13,114,-4,114,-59r0,-198xm36,-84r0,-199r288,0r0,199r-288,0"},"\ue030":{"d":"287,-301v-3,-20,-15,-37,-37,-37r-140,0v-22,1,-38,16,-38,37r1,287v2,21,14,36,37,36r139,0v24,0,37,-14,37,-36xm198,-24v17,11,1,34,-19,32v-13,-1,-23,-8,-26,-19v3,-17,30,-23,45,-13xm102,-47r1,-243r154,0r0,243r-155,0"},"\ue031":{"d":"254,-271v11,-22,51,-12,46,16v-41,75,-88,144,-133,216v-6,10,-33,9,-38,-2r-68,-94v-9,-27,28,-43,44,-22r43,56"},"\ue032":{"d":"250,-103v14,15,41,1,32,-22v-29,-34,-62,-62,-95,-92v-9,-5,-17,0,-22,5r-88,87v-10,21,17,38,33,22r69,-67"},"\ue033":{"d":"250,-212v14,-15,41,-1,32,22v-29,34,-62,62,-95,92v-9,5,-17,0,-22,-5r-88,-87v-10,-21,17,-38,33,-22r69,67"},"\ue034":{"d":"125,-228v-14,-14,0,-42,23,-32v33,29,62,63,92,95v3,10,0,17,-5,22r-81,84v-12,14,-42,1,-34,-20v21,-29,49,-52,73,-78"},"\ue035":{"d":"235,-228v14,-13,0,-42,-22,-32v-35,28,-62,63,-93,95v-3,10,0,17,5,22r81,84v12,14,42,1,34,-20v-21,-29,-49,-52,-73,-78"},"\ue036":{"d":"306,-158v0,-12,-8,-18,-18,-18r-216,0v-10,1,-17,7,-17,18v0,12,7,19,17,19r216,0v10,-1,18,-7,18,-19xm72,-248v-18,-1,-23,29,-7,35r230,0v17,-5,13,-35,-7,-35r-216,0xm295,-102r-230,0v-15,5,-13,34,7,34r223,-1v15,-2,14,-33,0,-33"},"\ue037":{"d":"360,-266v-2,-21,-14,-36,-36,-36r-288,0v-22,2,-36,15,-36,36r0,217v2,21,14,36,36,36r288,0v22,-2,36,-15,36,-36r0,-217xm36,-49r0,-217r288,0r0,217r-288,0xm72,-120r0,33r90,0r0,-33r-90,0xm72,-174r0,33r90,0r0,-33r-90,0xm72,-228r0,33r90,0r0,-33r-90,0xm211,-188v0,33,41,51,4,70v-13,3,-20,6,-17,31r90,0v0,-6,0,-25,-2,-25v-12,-5,-31,-10,-30,-24v3,-20,21,-27,20,-52v0,-24,-8,-40,-33,-40v-25,0,-32,15,-32,40"},"\ue038":{"d":"340,-34v-26,-49,-129,-30,-132,-102v4,-21,19,-28,23,-51v15,-1,18,-34,6,-39v17,-50,-9,-93,-66,-93v-57,0,-81,39,-68,93v-8,8,-6,39,7,39r24,51v-5,71,-106,53,-132,102r-1,38r339,0r0,-38"},"\ue039":{"d":"250,-270v-36,0,-50,33,-40,64v-6,2,-4,27,1,25v3,0,5,2,5,7v8,22,20,45,-3,60v25,17,66,20,66,61r0,54r81,0r-1,-35v18,-97,-120,-39,-75,-140v4,-9,18,-15,6,-32v9,-34,-4,-64,-40,-64xm250,-49v-18,-51,-123,-32,-111,-107v6,-10,12,-16,14,-32v5,-9,21,-20,8,-42v11,-45,-5,-87,-54,-86v-47,0,-65,38,-54,86v-7,3,-4,38,2,34v12,4,8,34,21,40v13,65,-64,48,-76,91r0,66r250,0r0,-50"},"\ue03a":{"d":"164,-136v0,-20,19,-22,20,-45v8,-8,27,-30,9,-45v35,-79,-76,-125,-127,-69v-16,17,-14,44,-8,69v-11,8,-7,39,7,39v7,13,9,32,21,41v12,52,-45,66,-86,78r0,72r288,0v15,-108,-124,-54,-124,-140xm306,-229r-36,0r0,53r-54,0r0,37r54,0r0,53r36,0r0,-53r54,0r0,-37r-54,0r0,-53"},"\ue03b":{"d":"320,-230v1,-34,-35,-68,-68,-67r-194,194r-19,86r86,-18xm91,-39v-6,-12,-17,-23,-29,-29v4,-16,3,-43,25,-36v16,5,40,32,42,50v-8,10,-24,11,-38,15"},"\ue03c":{"d":"79,-72v-6,26,-28,71,-11,94v22,-10,20,-57,34,-84v50,-4,81,-7,99,-50v-24,5,-47,-5,-53,-24v41,-10,95,-18,115,-59v-30,6,-67,6,-68,-19v48,-13,114,-11,111,-77v-2,-34,-41,-42,-73,-47v-30,14,-42,68,-68,88v-17,-15,-4,-56,6,-73v-64,21,-87,95,-71,187v3,19,0,23,-9,12v-12,-15,-24,-42,-31,-62v-13,41,-1,86,19,114"},"\ue03d":{"d":"340,-253v-47,11,-97,31,-116,15v-39,-17,-55,-57,-91,-72v-15,-6,-43,5,-82,34r-33,12r66,260r36,0r-32,-127v56,-51,74,-40,116,-11v13,9,28,8,46,0v18,-8,48,-43,91,-104v1,-3,1,-5,-1,-7"},"\ue03e":{"d":"180,-316r43,121r115,0r-94,71r34,125r-98,-75r-98,75r34,-125r-94,-71r115,0"},"\ue03f":{"d":"358,-187v-1,-55,23,-151,-32,-151v-57,0,-127,-9,-159,24r-157,158v-13,9,-12,37,0,48v46,41,84,90,132,128v14,5,30,0,37,-7r157,-158v9,-10,18,-26,22,-42xm281,-225v-20,0,-33,-13,-33,-34v0,-21,12,-33,33,-33v21,0,34,13,34,33v0,20,-14,34,-34,34"},"\ue040":{"d":"381,-187v-2,-51,19,-128,-32,-128v-52,0,-108,-5,-137,24r-132,132v-12,11,-12,36,0,48r99,98v9,13,35,12,47,0r133,-132v10,-10,17,-27,22,-42xm304,-202v-20,0,-34,-14,-34,-34v0,-20,14,-34,34,-34v20,0,34,14,34,34v0,20,-14,34,-34,34xm151,-6v-13,6,-31,2,-40,-7r-98,-98v-13,-9,-12,-36,0,-48r132,-132v14,-12,33,-23,57,-24r-172,172v-4,4,-4,12,0,16","w":382},"\ue041":{"d":"257,-19v-6,-43,20,-69,62,-65v5,-8,8,-21,12,-29v-27,-10,-41,-59,-12,-80v19,-7,5,-26,0,-38v-41,4,-68,-22,-62,-65v-9,-6,-20,-9,-29,-13v-11,15,-24,29,-48,29v-24,0,-37,-14,-48,-29v-9,4,-20,7,-29,13v6,43,-21,68,-62,65v-5,8,-8,21,-12,29v36,14,36,78,0,92v3,11,8,20,12,30v41,-9,69,18,62,61v9,6,20,9,29,13v11,-15,24,-29,48,-29v24,0,37,14,48,29v9,-4,20,-7,29,-13xm180,-91v-38,0,-65,-27,-65,-67v0,-39,27,-66,65,-66v38,0,66,26,66,66v0,40,-28,67,-66,67"},"\ue042":{"d":"143,-104r-16,-16v-11,7,-19,20,-33,10r-4,-25r-22,0v-3,13,-2,27,-17,30r-20,-15r-16,16v7,10,20,18,10,32r-25,4r0,23v13,2,28,1,30,16r-15,21r16,16v10,-7,18,-20,32,-10r5,24r22,0v2,-13,2,-27,16,-29r21,15r16,-16v-7,-11,-20,-19,-10,-33r25,-4r0,-23v-13,-2,-28,-1,-30,-16xm79,-34v-13,0,-23,-8,-23,-22v0,-13,10,-23,23,-23v14,0,22,10,22,23v0,13,-9,22,-22,22xm157,-118v9,-5,17,-19,27,-9r-5,23r20,9v7,-7,7,-23,22,-19r4,24r23,0r4,-24v14,-4,15,13,22,19r20,-9v-1,-10,-10,-25,2,-28r20,14r16,-16v-4,-9,-20,-19,-9,-27r23,5r9,-20v-7,-8,-22,-8,-19,-22r24,-4r0,-23r-24,-4v-4,-15,12,-15,19,-22r-9,-20v-11,1,-25,10,-28,-3r14,-19r-16,-16v-9,4,-18,20,-27,9r5,-23r-20,-10v-7,7,-9,25,-22,19r-4,-24r-23,0v-3,10,2,26,-13,26r-13,-21r-20,10v1,11,10,25,-3,28r-19,-14r-16,16v5,9,19,17,9,27r-23,-5r-10,20v7,7,25,8,19,22r-24,4r0,23v9,3,26,-2,26,12r-21,14r10,20v10,-1,24,-10,28,2r-14,20xm236,-165v-31,0,-49,-20,-49,-49v0,-29,20,-49,49,-49v29,0,49,18,49,49v0,30,-19,49,-49,49"},"\ue043":{"d":"27,-182v32,11,13,-47,53,-36v12,3,20,28,32,20v8,-12,40,-21,23,-37v-9,-9,-21,-25,-8,-39v15,-16,41,-29,63,-37v10,-4,13,-5,8,-5v-70,-10,-113,24,-148,55v-6,9,-5,31,-24,30v-22,-1,-31,25,-12,34v8,8,12,14,13,15xm159,-204v-14,-3,-25,17,-35,25r151,174v14,8,37,-11,32,-27xm287,-195v56,12,80,-23,71,-81v0,-5,-2,-7,-4,-7v-17,11,-16,44,-43,44v-39,0,-23,-48,-7,-67v2,-4,-1,-9,-7,-6v-15,8,-58,25,-52,57v7,39,-21,51,-38,71r24,29v18,-14,28,-36,56,-40xm49,-30v-8,15,19,40,31,28r88,-87r-27,-31"},"\ue044":{"d":"146,-89v-20,32,21,70,52,48v40,-54,61,-131,86,-197v17,-45,11,-40,-15,-9r-48,57xm37,-51v-6,-108,57,-184,166,-173r26,-32v-139,-27,-237,65,-228,207v2,24,37,21,36,-2xm323,-52v-3,26,35,25,36,4v5,-67,-18,-124,-49,-155r-15,38v18,29,33,66,28,113"},"\ue045":{"d":"275,-32v0,18,31,14,31,0r-2,-209v-51,-33,-112,-57,-166,-87v-37,-9,-84,11,-84,50r2,188v22,30,1,5,86,59v27,17,52,35,82,48v4,-3,10,-6,10,-12r-2,-204v-47,-32,-102,-56,-152,-86v6,-10,29,-27,45,-19r150,80r0,192"},"\ue046":{"d":"202,-236r86,-28r71,213r-85,29xm90,-22r0,-248r-90,0r0,248r90,0xm68,-225r0,23r-46,0r0,-23r46,0xm202,-22r0,-248r-90,0r0,248r90,0xm180,-225r0,23r-45,0r0,-23r45,0"},"\ue047":{"d":"60,-117v10,62,74,71,120,97v30,-9,56,-29,84,-41v14,-9,10,-24,15,-44r-99,48xm146,-195v2,-27,56,-26,66,-7r111,36v14,-7,54,-24,28,-39r-150,-85v-13,-4,-29,-6,-42,0r-157,90v-5,9,0,16,7,19r160,87v11,2,25,1,32,-4r97,-54v-40,-7,-75,-23,-118,-23v-17,0,-32,-5,-34,-20xm305,-46v2,8,25,17,25,-3v0,-65,6,-83,-7,-117r-25,14v15,29,17,45,7,106"},"\ue048":{"d":"342,-248v-2,-27,-21,-38,-52,-35r0,35r-58,0r0,-35r-104,0r0,35r-58,0r0,-35v-31,-3,-52,8,-52,35r0,216v2,22,14,36,36,36r252,0v22,-1,36,-14,36,-36r0,-216xm54,-32r0,-144r252,0r0,144r-252,0xm86,-319r0,61r26,0r0,-61r-26,0xm248,-319r0,61r26,0r0,-61r-26,0"},"\ue049":{"d":"211,-158v17,-48,85,-57,70,-139v-29,-55,-173,-54,-202,0r0,42v4,46,60,57,70,97v-16,50,-86,57,-70,140v28,54,174,54,202,0r0,-42v-4,-46,-61,-57,-70,-98xm102,-292v35,-31,122,-28,157,1v-22,36,-125,28,-157,6v-3,-2,-3,-5,0,-7xm101,-273v37,25,121,25,158,0v8,68,-103,74,-59,144v19,31,64,38,59,93v-23,-11,-70,-14,-70,-45v0,-6,-4,-10,-9,-10v-14,1,-5,22,-18,28v-14,14,-43,18,-61,27v-13,-74,103,-77,59,-150v-18,-30,-61,-37,-59,-87"},"\ue04a":{"d":"143,-297v-27,24,-23,81,-6,111r-97,149v0,19,2,40,10,54v19,5,45,-2,53,-15r36,-60r26,-5r42,-69v114,28,147,-124,73,-184v-40,-32,-115,-12,-137,19xm262,-290v34,21,13,100,-24,67v-16,-14,-54,-26,-38,-55v9,-18,41,-25,62,-12"},"\ue04b":{"d":"46,-255v17,20,20,50,59,43v14,-12,26,-27,41,-38r1,-19v-16,-11,-34,-22,-54,-29v-19,12,-34,26,-47,43xm67,-157v-6,-7,-10,-25,-4,-35v-13,-12,-22,-25,-31,-40v-25,42,-22,123,6,159v6,-31,16,-60,29,-84xm122,-312v23,8,32,28,65,20v6,3,14,4,18,9v18,-7,36,-14,57,-18v-32,-22,-98,-31,-140,-11xm233,-127v2,-4,7,-9,10,-12v-15,-30,-26,-64,-49,-86v-16,11,-35,-13,-43,4v-10,7,-18,16,-26,25v4,5,7,19,4,29v29,19,62,34,104,40xm338,-107v-13,3,-27,5,-39,6v-16,17,-23,39,-21,77v27,-21,49,-48,60,-83xm225,-103v-43,-8,-81,-24,-112,-45v-6,3,-14,6,-25,5v-15,29,-27,58,-29,99v15,17,35,29,56,39v29,-41,64,-75,110,-98xm291,-281v-27,5,-54,9,-75,20v1,8,-1,15,-4,19v22,28,42,57,54,95v16,1,26,10,31,22r47,-9v9,-67,-19,-114,-53,-147xm250,-7v2,-23,16,-71,-7,-77v-43,19,-77,51,-103,87v36,10,83,3,110,-10"},"\ue04c":{"d":"180,-330v-104,0,-173,69,-173,172v0,103,68,173,173,173v105,0,173,-70,173,-173v0,-103,-69,-172,-173,-172xm227,-297v85,21,133,149,70,229v-19,-18,6,-44,0,-77v-3,-19,-10,-39,-33,-38v-24,-5,-38,-45,-15,-61v5,-7,18,-14,8,-25v-12,2,-43,11,-34,-21v2,-3,1,-3,4,-7xm73,-174v8,-12,17,-35,-8,-33r-23,-3v20,-47,62,-86,118,-93v-25,22,-55,39,-71,70v11,32,120,-4,95,74v-11,19,-37,16,-41,42v-9,17,2,51,-7,68v-22,-9,-38,-40,-38,-75v0,-21,-37,-19,-25,-50xm262,-34v-28,22,-89,31,-128,17v32,-18,93,-44,128,-17"},"\ue04d":{"d":"137,-238v15,-14,-7,-37,-22,-23r-115,103r120,107v14,8,30,-14,17,-26r-89,-81xm245,-261v-11,-11,-32,0,-26,17v29,31,63,57,93,86r-93,87v-6,16,14,28,26,17r115,-104"},"\ue04e":{"d":"306,-172v-1,-24,-29,-22,-54,-21v4,-69,-4,-126,-72,-126v-54,0,-74,35,-72,90r36,0v-1,-32,5,-54,36,-54v44,0,35,48,36,90r-144,0v-12,0,-16,11,-18,21v3,50,-3,110,5,155v38,32,123,19,191,20v23,-7,56,-7,56,-35r0,-140"},"\ue04f":{"d":"307,-172v-2,-22,-29,-22,-55,-21v4,-64,-12,-109,-72,-109v-59,1,-77,47,-71,109v-25,0,-56,-5,-55,21v2,50,-3,110,5,155v38,32,123,20,191,20v23,-7,56,-6,56,-35xm180,-266v37,-1,38,36,37,73r-73,0v-1,-36,-1,-72,36,-73"},"\ue050":{"d":"228,-70v14,15,44,1,35,-24v-17,-23,-37,-42,-55,-64r55,-63v9,-23,-20,-41,-35,-24r-49,54v-18,-19,-33,-42,-54,-59v-23,-8,-38,19,-23,36r48,56v-17,25,-42,43,-55,72v-2,19,24,29,37,16r47,-54"},"\ue051":{"d":"324,-266v-1,-23,-15,-36,-36,-36r-216,0v-21,2,-35,14,-35,36r-1,217v1,21,15,36,36,36r217,0v20,-2,36,-15,36,-36xm180,-127r-54,56r-32,-32r56,-55r-56,-54r32,-32r54,56r56,-56r30,32r-54,54r54,55r-30,32"},"\ue052":{"d":"180,-309v-90,0,-151,60,-151,151v0,91,60,152,151,152v91,0,151,-61,151,-152v0,-91,-61,-151,-151,-151xm266,-103r-31,32r-55,-56r-55,56r-31,-32r55,-55r-55,-54r31,-32r55,56r55,-56r31,32r-55,54"},"\ue053":{"d":"284,-158v0,-9,1,-18,-10,-18r-188,0v-11,-1,-10,9,-10,18v0,10,-1,19,10,19r188,0v11,1,10,-9,10,-19"},"\ue054":{"d":"324,-266v-1,-23,-15,-36,-36,-36r-216,0v-21,2,-35,14,-35,36r-1,217v1,21,15,36,36,36r217,0v20,-2,36,-15,36,-36xm90,-139r1,-37r179,0r1,37r-181,0"},"\ue055":{"d":"180,-309v-90,0,-151,60,-151,151v0,91,60,152,151,152v91,0,151,-61,151,-152v0,-91,-61,-151,-151,-151xm271,-139r-182,0r0,-37r182,0r0,37"},"\ue056":{"d":"283,-158v0,-9,1,-19,-9,-18r-76,0r0,-75v0,-11,-8,-11,-19,-11v-9,0,-18,1,-17,11r-1,75r-75,0v-12,-1,-10,9,-11,18v1,9,-1,19,11,19r75,0r1,75v-1,10,8,11,17,11v11,0,19,0,19,-11r0,-75r76,0v10,1,9,-10,9,-19"},"\ue057":{"d":"324,-266v-1,-23,-15,-36,-36,-36r-216,0v-21,2,-35,14,-35,36r-1,217v1,21,15,36,36,36r217,0v20,-2,36,-15,36,-36xm198,-139r1,71r-37,0r0,-71r-72,0r1,-37r71,0r0,-72r36,0r1,72r71,0r1,37r-73,0"},"\ue058":{"d":"180,-309v-90,0,-151,60,-151,151v0,91,60,152,151,152v91,0,151,-61,151,-152v0,-91,-61,-151,-151,-151xm198,-67r-36,0r0,-72r-73,0r0,-37r73,0r0,-72r36,0r0,72r73,0r0,37r-73,0r0,72"},"\ue059":{"d":"176,-293v-4,-48,84,-64,84,-9v4,48,-85,65,-84,9xm150,22v-32,3,-27,-34,-20,-63r25,-107v0,-3,-1,-5,-3,-5v-11,1,-37,13,-45,20r-10,-16v35,-26,70,-62,122,-62v26,0,19,37,13,58v-8,38,-23,74,-27,114v1,4,2,5,4,5v15,-2,31,-11,43,-22r11,15v-31,29,-63,58,-113,63"},"\ue05a":{"d":"178,-323v-98,0,-163,68,-163,168v0,99,68,163,167,163v100,0,163,-67,163,-168v0,-99,-68,-163,-167,-163xm165,-240v0,-27,42,-38,52,-15v5,21,-10,36,-29,36v-14,0,-23,-6,-23,-21xm153,-54v-19,2,-15,-20,-12,-37v4,-22,15,-47,13,-67v-4,2,-23,6,-27,12r-5,-10v20,-15,45,-32,73,-37v15,2,12,23,8,35r-17,68v9,13,29,-23,35,-1v-19,19,-37,33,-68,37"},"\ue05b":{"d":"178,-323v-98,0,-163,68,-163,168v0,99,68,163,167,163v100,0,163,-67,163,-168v0,-99,-68,-163,-167,-163xm155,-90v8,-24,49,-16,47,11v-1,14,-13,25,-26,22v-19,1,-27,-16,-21,-33xm156,-125v-4,-43,42,-45,49,-76v-2,-13,-8,-23,-25,-23v-19,0,-25,12,-25,30r-40,-1v2,-40,21,-62,64,-62v65,0,90,72,38,101v-11,7,-23,13,-22,32"},"\ue05c":{"d":"341,4v10,1,16,-10,11,-18r-165,-286v-5,-4,-16,-1,-17,5r-163,287v1,6,5,13,13,12r321,0xm161,-32r-1,-36r40,0r0,36r-39,0xm160,-94r1,-108r39,0r0,108r-40,0"},"\ue05d":{"d":"178,-323v-98,0,-163,68,-163,168v0,99,67,163,167,163v100,0,163,-67,163,-168v0,-99,-68,-163,-167,-163xm224,-248v-23,-12,-65,-13,-88,0r-23,-37v34,-20,101,-21,134,0xm89,-202v-11,25,-13,65,0,89r-37,22v-19,-34,-21,-99,0,-133xm247,-29v-36,20,-99,21,-134,0r23,-38v21,14,68,14,88,0xm180,-78v-48,0,-79,-32,-79,-80v0,-47,33,-79,79,-79v46,0,79,32,79,79v0,48,-31,80,-79,80xm271,-112v11,-25,13,-64,0,-89r37,-23v19,34,21,99,0,133"},"\ue05e":{"d":"36,-244v139,8,223,92,231,231r42,0v-3,-129,-74,-210,-166,-252v-33,-14,-69,-22,-107,-22r0,43xm36,-159v86,5,141,58,145,146r43,0v-2,-90,-50,-144,-115,-174v-23,-10,-47,-14,-73,-14r0,42xm77,-13v44,3,52,-64,15,-78v-27,-10,-57,8,-56,37v1,25,16,39,41,41"},"\ue05f":{"d":"245,-302v0,-10,-7,-17,-18,-17r-104,1v-5,4,-7,9,-7,16r-1,306r66,-64r64,64r0,-306"},"\ue060":{"d":"278,-319v-2,-35,-61,-13,-93,-19v-10,1,-14,9,-15,19v23,0,55,-5,55,17r-1,224r55,65xm95,-283v-11,-1,-13,9,-15,17r1,288r53,-64r55,64r-2,-294v-11,-22,-62,-7,-92,-11"},"\ue061":{"d":"360,-116v0,-54,-42,-88,-101,-83v-13,-37,-43,-67,-92,-67v-59,0,-100,42,-94,108v-42,-4,-73,22,-73,63v0,38,27,63,65,63r209,0v52,-2,86,-33,86,-84"},"\ue062":{"d":"135,0v6,31,90,31,90,0r0,-112r135,-136v-1,-25,5,-44,-14,-55v-75,-47,-258,-46,-332,0v-19,11,-13,30,-14,55r135,136r0,112xm23,-281v70,-47,247,-46,314,0v-70,46,-246,45,-314,0"},"\ue063":{"d":"224,-75v2,23,-15,61,4,70r72,6v6,1,11,-3,11,-9r7,-60xm131,-5v20,-8,3,-48,5,-70r-95,7r7,60v0,6,5,10,11,9xm179,-316v-88,0,-149,59,-146,151r5,61r94,-8v-10,-53,-12,-117,48,-116v31,1,56,23,53,55r-5,61r93,8r6,-73v-5,-86,-62,-139,-148,-139"},"\ue064":{"d":"197,-134v-20,-14,-41,-64,-21,-97r-13,-12r-74,75v13,9,10,26,-4,32r100,100v25,4,66,-13,61,23r-137,0v-9,-33,34,-21,60,-23r-94,-94v-18,9,-28,-3,-28,-23v0,-23,14,-33,32,-21r76,-77v-5,-6,-17,-16,-7,-24v12,-9,21,-33,40,-24r30,29v37,-14,80,1,95,25xm285,-205v33,32,-18,69,-42,43"},"\ue065":{"d":"148,-221v0,8,-13,8,-13,0v1,-15,-25,-19,-37,-22v-4,-3,0,-12,5,-11v23,1,45,11,45,33xm154,-172v50,-37,17,-121,-51,-113v-61,-7,-101,63,-57,106v19,18,33,45,34,67r46,0v2,-19,11,-39,28,-60xm206,-221v2,49,-50,67,-55,112v12,4,13,21,4,30v10,6,7,23,-3,28v7,15,-4,30,-20,29v-7,24,-51,24,-59,0v-16,1,-28,-16,-19,-29v-10,-5,-12,-21,-4,-28v-7,-9,-7,-26,4,-30v-4,-46,-57,-61,-54,-112v4,-59,46,-90,103,-90v57,0,100,32,103,90","w":205},"\ue066":{"d":"219,22v-10,0,-17,-10,-17,-21r-23,-71r-28,85v-12,17,-24,-7,-34,-13r-19,17v-7,-3,-9,-9,-9,-18r35,-112r-44,8r11,-45r-47,-18r33,-33r-33,-39r46,-12r-10,-50r47,13r15,-48r35,35r37,-35r14,48r48,-12r-12,49r48,14r-31,34r34,35r-48,15r11,49r-44,-10r35,114v0,8,-3,14,-10,18r-18,-18xm176,-266v-35,0,-67,31,-67,67v0,35,30,68,67,68v35,0,68,-31,68,-68v0,-35,-32,-67,-68,-67"},"\ue067":{"d":"114,-297v-39,9,-58,42,-75,73v-12,12,-48,20,-35,43r64,64v25,14,30,-25,42,-36v14,-4,29,-12,37,-23r175,194v17,14,48,-19,33,-33r-193,-176v11,-8,19,-20,22,-36v13,-12,55,-23,35,-43r-62,-63v-25,-16,-32,24,-43,36"},"\ue068":{"d":"334,-115v1,22,-12,38,-34,38v-23,-1,-29,-22,-52,-23v-35,-1,-16,47,-17,73v-34,-1,-97,23,-97,-17v0,-23,21,-28,21,-52v0,-22,-16,-34,-38,-34v-21,0,-40,13,-40,34v0,24,19,31,19,51v0,37,-58,23,-96,18r0,-206v34,2,96,20,96,-18v0,-20,-19,-27,-19,-50v0,-22,18,-35,41,-35v21,-1,37,13,37,34v0,24,-23,30,-21,53v3,39,64,15,97,16v-3,35,-20,93,18,97v19,-3,28,-20,51,-20v22,0,34,20,34,41","w":334},"\ue069":{"d":"360,-158v0,-48,-35,-71,-90,-67v11,-84,-66,-90,-135,-90v-59,0,-122,9,-135,56r0,203v12,47,76,56,135,56v69,0,146,-6,135,-90v55,4,90,-20,90,-68xm37,-259v41,-29,157,-29,196,0v-42,31,-156,30,-196,0xm326,-158v0,28,-26,31,-56,29r0,-57v30,-1,56,1,56,28"},"\ue06a":{"d":"335,-274v-1,-23,-16,-38,-39,-38r-232,0v-23,1,-39,15,-39,38r0,233v4,61,98,31,156,38r0,-111r-37,0r0,-48r37,0v-5,-67,27,-98,97,-91r0,55v-15,2,-40,-7,-40,11r0,25r40,0r0,48r-40,0r0,111v45,0,97,7,97,-38r0,-233"},"\ue06b":{"d":"89,-86v-44,0,-71,-30,-71,-72v0,-42,27,-71,71,-71v43,0,70,28,70,71v0,44,-27,72,-70,72xm271,-86v-43,0,-71,-29,-71,-72v0,-42,28,-71,71,-71v44,0,71,29,71,71v0,42,-27,72,-71,72"},"\ue06c":{"d":"36,-237v1,46,24,69,72,68v-2,16,4,25,9,36v-48,2,-98,15,-98,68v1,56,54,64,110,64v73,0,98,-109,36,-144v-7,-6,-17,-12,-18,-23v15,-27,45,-44,37,-94v-3,-20,-10,-29,-24,-37v12,-7,41,2,42,-17v-81,1,-168,-9,-166,79xm169,-75v1,33,-24,47,-52,47v-34,0,-65,-11,-61,-47v6,-51,111,-59,113,0xm97,-292v59,-13,70,87,24,103v-49,2,-67,-87,-24,-103xm288,-246r-35,0r0,54r-54,0r0,34r54,0r0,54r35,0r0,-54r53,0r0,-34r-53,0r0,-54"},"\ue06d":{"d":"37,-280v-18,30,-4,77,21,91v-13,0,-25,-7,-31,-8v3,36,23,61,55,67v-10,3,-21,3,-31,1v10,26,29,47,64,47v-24,20,-54,32,-101,29v29,16,60,32,105,30v119,-4,193,-83,192,-202v12,-11,27,-21,35,-35v-12,4,-23,9,-39,10v13,-9,25,-20,29,-37v-13,7,-26,14,-43,16v-40,-43,-133,-13,-116,62v-65,-3,-108,-34,-140,-71"},"\ue06e":{"d":"91,-283v0,24,-15,35,-37,35v-22,0,-36,-13,-36,-35v0,-21,13,-34,37,-34v23,0,35,12,36,34xm20,-221r69,0r0,223r-69,0r0,-223xm238,-169v-25,0,-38,16,-38,42r0,129r-69,0r-2,-223r60,0v2,10,0,23,4,31v14,-18,36,-36,69,-36v102,-1,78,129,80,228r-69,0r0,-123v-1,-28,-8,-48,-35,-48"},"\ue070":{"d":"105,-326v-10,0,-25,-2,-16,11v11,35,24,67,20,117v6,-1,17,3,19,-2v-4,-54,11,-88,23,-126r-20,0r-12,50xm176,-197v31,1,25,-36,25,-67v0,-19,-6,-31,-25,-31v-31,-1,-25,36,-25,66v-1,20,7,32,25,32xm176,-278v15,4,5,35,8,52v-1,7,-1,12,-8,12v-15,-5,-8,-35,-8,-52v0,-7,2,-12,8,-12xm215,-218v-4,24,22,25,32,10r0,10v5,-1,15,3,17,-2r0,-94v-6,1,-14,-2,-17,2r0,70v-3,7,-15,12,-15,2r0,-74v-5,1,-15,-3,-17,2r0,74xm274,-105v-11,-1,-9,12,-9,22r17,0v0,-10,2,-22,-8,-22xm218,-52v-1,-20,6,-65,-16,-49r0,57v6,7,17,4,16,-8xm284,7v53,-9,37,-117,26,-169v-28,-36,-113,-13,-182,-21v-79,-9,-87,40,-87,130v0,90,102,58,191,64xm100,-133r0,107r-18,0r0,-107r-21,0r0,-17r59,0r0,17r-20,0xm139,-51v-2,13,11,13,15,3r0,-71r17,0r0,93r-17,0r0,-10v-9,16,-32,15,-32,-9r0,-74r17,0r0,68xm202,-110v9,-13,34,-13,32,8v4,31,5,101,-32,68r0,8r-16,0r0,-124r16,0r0,40xm274,-120v24,1,26,24,25,51r-34,0v-6,17,10,44,16,19r0,-8v10,0,21,-3,17,13v-8,33,-50,22,-50,-11v0,-31,-4,-65,26,-64"},"\ue072":{"d":"237,-134v-31,1,-31,64,0,65v31,-4,31,-61,0,-65xm345,-148v0,-32,-11,-54,-27,-70v5,-21,-1,-58,-11,-80v-34,8,-46,14,-82,38v-25,-7,-66,-7,-91,0v-34,-24,-48,-30,-81,-38v-12,23,-16,57,-12,80v-16,17,-27,40,-28,70v-3,113,82,136,197,131v83,-3,136,-41,135,-131xm282,-150v54,63,-18,134,-103,117v-69,2,-130,-15,-119,-86v10,-67,111,-35,179,-43v17,-2,35,3,43,12xm123,-134v-32,1,-32,64,0,65v30,-3,30,-62,0,-65"},"\ue07a":{"d":"22,-338r136,0r0,23r-136,0r0,-23xm202,-338r136,0r0,23r-136,0r0,-23xm360,-200v-1,-22,-20,-27,-45,-25r0,-90r-90,0r0,90r-90,0r0,-90r-90,0r0,90v-25,-2,-44,3,-45,25r0,197v1,15,10,24,25,25r107,0v16,0,26,-11,26,-25r0,-132r44,0r0,132v2,14,10,25,26,25r107,0v15,-1,24,-10,25,-25r0,-197xm135,-11v1,6,-7,11,-13,11r-87,0v-6,0,-14,-5,-13,-11v-1,-6,7,-11,13,-11r87,0v6,0,14,5,13,11xm202,-169v0,15,-19,11,-33,11v-6,0,-11,-5,-11,-11v0,-15,19,-11,33,-11v6,0,11,5,11,11xm338,-11v1,6,-7,11,-13,11r-87,0v-6,0,-14,-5,-13,-11v-1,-6,7,-11,13,-11r87,0v6,0,14,5,13,11"},"\u00a0":{"d":"0,0r0,0r0,0","w":180}}});
;
(function($) {
	var docfontPolyfill = function(container) {
  	if ($('body').hasClass('no-font') || $('html').hasClass('ie7')) {
			function addIcon(el, entity) {
				if(!$(el).hasClass('ctools-collapsible-container')) {
					$(el).prepend('<span class="polyfill-icon" style="font-family: \'docfont\'">' + entity + '</span>').addClass('polyicon');
				}
			}
			var icons = {
				'icon-home' : '&#xe001;',
				'icon-commerce-bldg' : '&#xe002;',
				'icon-building' : '&#xe003;',
				'icon-news' : '&#xe004;',
				'icon-statistics' : '&#xe005;',
				'icon-bar' : '&#xe006;',
				'icon-bar2' : '&#xe007;',
				'icon-pie' : '&#xe008;',
				'icon-folder' : '&#xe009;',
				'icon-archive' : '&#xe00a;',
				'icon-upload' : '&#xe00b;',
				'icon-download' : '&#xe00c;',
				'icon-export' : '&#xe00d;',
				'icon-share' : '&#xe00e;',
				'icon-print' : '&#xe00f;',
				'icon-camera' : '&#xe010;',
				'icon-image' : '&#xe011;',
				'icon-gallery' : '&#xe012;',
				'icon-video' : '&#xe013;',
				'icon-attachment' : '&#xe014;',
				'icon-document' : '&#xe015;',
				'icon-link' : '&#xe016;',
				'icon-mail' : '&#xe017;',
				'icon-phone' : '&#xe018;',
				'icon-trash' : '&#xe019;',
				'icon-map' : '&#xe01a;',
				'icon-location' : '&#xe01b;',
				'icon-directions' : '&#xe01c;',
				'icon-play' : '&#xe01d;',
				'icon-pause' : '&#xe01e;',
				'icon-record' : '&#xe01f;',
				'icon-stop' : '&#xe020;',
				'icon-forward' : '&#xe021;',
				'icon-rewind' : '&#xe022;',
				'icon-first' : '&#xe023;',
				'icon-last' : '&#xe024;',
				'icon-cycle' : '&#xe025;',
				'icon-sound' : '&#xe026;',
				'icon-mute' : '&#xe027;',
				'icon-enlarge' : '&#xe028;',
				'icon-shrink' : '&#xe029;',
				'icon-search' : '&#xe02a;',
				'icon-zoom-in' : '&#xe02b;',
				'icon-zoom-out' : '&#xe02c;',
				'icon-comment' : '&#xe02d;',
				'icon-comments' : '&#xe02e;',
				'icon-desktop' : '&#xe02f;',
				'icon-mobile' : '&#xe030;',
				'icon-check' : '&#xe031;',
				'icon-arrow-up' : '&#xe032;',
				'icon-arrow-down' : '&#xe033;',
				'icon-arrow-right' : '&#xe034;',
				'icon-arrow-left' : '&#xe035;',
				'icon-menu' : '&#xe036;',
				'icon-profile' : '&#xe037;',
				'icon-user' : '&#xe038;',
				'icon-users' : '&#xe039;',
				'icon-add-user' : '&#xe03a;',
				'icon-edit' : '&#xe03b;',
				'icon-write' : '&#xe03c;',
				'icon-flag' : '&#xe03d;',
				'icon-star' : '&#xe03e;',
				'icon-tag' : '&#xe03f;',
				'icon-tags' : '&#xe040;',
				'icon-cog' : '&#xe041;',
				'icon-cogs' : '&#xe042;',
				'icon-tool' : '&#xe043;',
				'icon-dashboard' : '&#xe044;',
				'icon-book' : '&#xe045;',
				'icon-books' : '&#xe046;',
				'icon-learn' : '&#xe047;',
				'icon-calendar' : '&#xe048;',
				'icon-hourglass' : '&#xe049;',
				'icon-key' : '&#xe04a;',
				'icon-network' : '&#xe04b;',
				'icon-earth' : '&#xe04c;',
				'icon-code' : '&#xe04d;',
				'icon-unlocked' : '&#xe04e;',
				'icon-locked' : '&#xe04f;',
				'icon-cross' : '&#xe050;',
				'icon-cross-square' : '&#xe051;',
				'icon-cross-circle' : '&#xe052;',
				'icon-minus' : '&#xe053;',
				'icon-minus-square' : '&#xe054;',
				'icon-minus-circle' : '&#xe055;',
				'icon-plus' : '&#xe056;',
				'icon-plus-square' : '&#xe057;',
				'icon-plus-circle' : '&#xe058;',
				'icon-info' : '&#xe059;',
				'icon-info-circle' : '&#xe05a;',
				'icon-question' : '&#xe05b;',
				'icon-warning' : '&#xe05c;',
				'icon-help' : '&#xe05d;',
				'icon-rss' : '&#xe05e;',
				'icon-bookmark' : '&#xe05f;',
				'icon-bookmarks' : '&#xe060;',
				'icon-cloud' : '&#xe061;',
				'icon-filter' : '&#xe062;',
				'icon-magnet' : '&#xe063;',
				'icon-lamp' : '&#xe064;',
				'icon-idea' : '&#xe065;',
				'icon-official' : '&#xe066;',
				'icon-legal' : '&#xe067;',
				'icon-puzzle' : '&#xe068;',
				'icon-mug' : '&#xe069;',
				'icon-facebook' : '&#xe06a;',
				'icon-flickr' : '&#xe06b;',
				'icon-google-plus' : '&#xe06c;',
				'icon-twitter' : '&#xe06d;',
				'icon-linked-in' : '&#xe06e;',
				'icon-github' : '&#xe072;',
				'icon-youtube' : '&#xe070;',
				'icon-binoculars' : '&#xe07a;',
	            // custom ctype icon classes 
				'icon-ol_locator_location' : '&#xe01b;',
				'icon-event' : '&#xe048;',
				'icon-policy' : '&#xe067;',
				'icon-answers_question' : '&#xe05b;',
				'icon-doc_group' : '&#xe068;'
			},
			els = $(container+' *'),
			i, attr, html, c, el;
		for (i = 0; ; i += 1) {
				el = els[i];
				if(!el) {
					break;
				}
				var polyicon = '';
				polyicon = el.className;
				var polyicon = new String(polyicon);
				polyicon = polyicon.match(/polyicon/);
				attr = el.getAttribute('data-icon');
				if (attr && !polyicon) {
					addIcon(el, attr);
				}
				c = el.className;
				var c = new String(c);
				c = c.match(/icon-[^\s'"]+/);
				if (c && icons[c[0]] && !polyicon) {
					addIcon(el, icons[c[0]]);
				}
			}
		}
	};

  //we need to change a few spans to divs so Cufon doesn't ignore them
	$.fn.changeElementType = function(newType) {
	    var newElements = [];
	    $(this).each(function() {
	        var attrs = {};
	        $.each(this.attributes, function(idx, attr) {
	            attrs[attr.nodeName] = attr.nodeValue;
	        });
	        var newElement = $("<" + newType + "/>", attrs).append($(this).contents());
	        $(this).replaceWith(newElement);
	        newElements.push(newElement);
	    });
	    return $(newElements);
	};
	var docfontCufon = function(container) {
			
  	if ($('body').hasClass('no-font')) {
		    // change icon and icon wrapper to divs so Cufon does not ignore them
			$(container+' span.fonticon').changeElementType('div').addClass('converted');
			$(container+' span.polyfill-icon').changeElementType('div').addClass('converted');
			// wrap link text in a span so Cufon ignores
			$(container+' a.[class*="icon-"]').each(function(i, v) {
			    $(v).contents().eq(1).wrap('<span class="title"/>')
			});
			// icon links need to be selected so hover can be maintained
			var icon_link = $(container+' .polyfill-icon').closest('a');
			Cufon.replace(icon_link, { ignore: { span: true }, hover: true });
		 
	    // run Cufon all the icon that aren't part of a link
	    icon_link.find(container+' .polyfill-icon').removeClass('polyfill-icon').addClass('polyfill-iconlink');
	    Cufon.replace($(container+' .polyfill-icon'), { ignore: { span: true } });
		}
	};

	// fontFallback event subscriber (fontFallback is an event fired by the doc_font_check module)
	$(document).on("fontFallback", fontFallbackHandler);

	// fontFallback event handler
	function fontFallbackHandler(e) {
		docfontPolyfill('body');
		docfontCufon('body');
	}
	
  //run it with other behaviors so ajax content is converted
	Drupal.behaviors.Docfont = {
    attach: function (context, settings) {
      docfontPolyfill('body');
			docfontCufon('body');
			//run Cufon again when menu minipanels generate the dropdowns
			if (typeof MenuMiniPanels !== 'undefined' && $.isFunction(MenuMiniPanels)) {
				MenuMiniPanels.setCallback('onRender', function(qTip, event, content) {
					docfontPolyfill('.qtip');
					docfontCufon('.qtip');
				});
			}
    }
	}


})(jQuery);;
(function($) {
Drupal.behaviors.DOCchromeRenderBug = {
  attach: function (context, settings) {

/*	Silently append and remove a text node	
	This make Chrome repaint the page
	Without it, some of the elements don't get rendered until scroll
*/
var n = document.createTextNode(' ');
$('body').append(n);
setTimeout(function(){n.parentNode.removeChild(n)}, 600);

  }
};
})(jQuery);;
(function($) {

Drupal.behaviors.docTabs = {
  attach: function (context, settings) {

    if($('.doc-tab-first').length) {
      $('.doc-tab-first').each( function( groupIndex, group ) {
        $(this, context).once('doc-tabs-group', function () {
          // This is uses the method andSelf to select all the tabs that are siblings.
          // If using jQuery > 1.7, use the addBack method.
          var tabGroup = $(this).siblings('.doc-tab').andSelf();
          // Wrap each group of tabs
          tabGroup.wrapAll("<div class='doc-tabs-group' />");
          // Iterate over each tab in the group to add markup with id
          tabGroup.each( function( tabIndex, tab ) {
            $(this).wrap(function() {
              return "<div class='doc-tab-content' id='" + 'fragment-' + groupIndex + '-' + tabIndex + "'></div>";
            });
          });
          // Add the tab links
          $(this).closest('.doc-tabs-group').prepend('<ul class="doc-tabs" />');
          var tabCount = tabGroup.length;
          for(var i = 0; i < tabCount; i++) {
            tabLinkTitle = '';
            tabLinkTitle = $("#fragment-" + groupIndex + '-' + i + " h2.pane-title").text();
            if(!tabLinkTitle) { tabLinkTitle = 'No Title' };
            $(this).closest('.doc-tabs-group').find('ul.doc-tabs').append('<li class="doc-tab-link"><a href="#fragment-' + groupIndex + '-' + i + '"><span>' + tabLinkTitle + '</span></a></li>');
          }

        });
      });
    }
    // Run jQuery UI tabs
    $('.doc-tabs-group').tabs();

  }
};

})(jQuery);
;
(function($) {
	
	$(window).load(function() {

		$('.slide-down').delay(1000).queue(function(next){
	    $(this).addClass("slide-down-on").dequeue();
		});

		$('.blink').delay(1000).queue(function(next){
	    $(this).addClass("blink-on").dequeue();
		}).delay(300).queue(function(next){
	    $(this).removeClass("blink-on").dequeue();
		});
	});

})(jQuery);;
(function($) {
  Drupal.behaviors.toolTip = {
    attach: function(context) {

      var inputs = ".form-item:not(.form-item-field-release-datetime-und-0-value-date, .form-item-field-release-datetime-und-0-value-time), .views-exposed-widget"; 

      $('.no-touch .tooltip-help input, .no-touch .tooltip-help textarea', context).once('tooltipFocus', function () {
        $(this).focus(function(){
          $(this).closest(inputs).addClass("has-focus");
          $(this).closest('fieldset').removeClass("collapsed");

        }).blur(function(){
          $(this).closest(inputs).removeClass("has-focus");
        }).mouseout(function(){
          $(this).closest(inputs).removeClass("has-focus");
        })
      });
      // hide the whole tooltip if it's contents were meant to hide
      $('.fieldset-description .js-hide', context).once('tooltipHide', function () {
        $(this).parent().addClass('js-hide');
      });
      // move help text above body text areas
      $('.text-format-wrapper', context).once('tooltipAbove', function () {
        $(this).children('.description').insertBefore($(this).children('.form-item').find('.form-textarea-wrapper'));
      });
      // move help text above summary text areas
      $('.text-summary-wrapper .form-item', context).once('tooltipAbove', function () {
        $(this).children('.description').insertBefore($(this).children('.form-item .form-textarea-wrapper'));
      });

    }
  };
})(jQuery);;
(function($) {
Drupal.behaviors.iconColumns = {
  attach: function (context, settings) {

    var availHeight = "";
    var iconHeight = "";
    var iconCols= "";
    var icons = $('.node-teaser .field-name-content-icons, .node-teaser-link .field-name-content-icons, .node-teaser-lite .field-name-content-icons');

    //Add a 'more tags' button to overflowing tags
    function iconColumns(el){
	    el.each(function() {
        availHeight = $(this).parent().find('.group-teaser-content').height();
        $(this).removeClass('icon-col-1 icon-col-2 icon-col-3 icon-col-4 icon-col-5');
        if(availHeight < 60){
          availHeight = 60;
        }
        iconHeight = $(this).find('.view-content .content-icon-group').height();
			  // alert(availHeight + " px for " + iconNum + " icons");
        iconCols = Math.ceil((iconHeight / availHeight).toFixed(1))
        // alert(iconHeight + " / " + availHeight + " = " + (iconHeight / availHeight) + " or " + iconCols);
        $(this).addClass('icon-col-' + iconCols);
	    });

  	}

  	iconColumns(icons);

    //run it again after window resize
  	$(window).resize(function() {
      if(this.resizeTO) clearTimeout(this.resizeTO);
        this.resizeTO = setTimeout(function() {
          $(this).trigger('resizeEnd');
        }, 500);
      });

      $(window).bind('resizeEnd', function() {
  		iconColumns(icons);
  	});

  }
};
})(jQuery);;
(function($) {
  Drupal.behaviors.hideEmptyFieldset = {
    attach: function(context) {
      $('.fieldset-wrapper', context).once('check-empty', function () {
        var $fieldset = $(this);
        if( $fieldset.is(':empty') ) {
          $fieldset.parent().addClass('element-hidden');
        };
      });
    }
  };
})(jQuery);;
(function($) {
Drupal.behaviors.loginButton = {
  attach: function(context) {
    $('.not-logged-in a.login', context).once('loginButton', function () {
      $(this).prepend('<span class="login-btn-text">Log in</span>');
    });

  }
};
})(jQuery);;
(function($) {
  Drupal.behaviors.holiday = {
    attach: function(context) {

if($('body').hasClass('winter') && $('body').hasClass('front') && !$('html').hasClass('ie78') && !$('html').hasClass('ie7')) {
      
      $('#leaderboard-wrapper').prepend('<div id="playsnow" class="play">Let it snow!</div>');

      // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 
// MIT license
 
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

var snowtimer = null;

var flakes = [],
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    flakeCount = 400,
    mX = -100,
    mY = -100

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

function snow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < flakeCount; i++) {
        var flake = flakes[i],
            x = mX,
            y = mY,
            minDist = 150,
            x2 = flake.x,
            y2 = flake.y;

        var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
            dx = x2 - x,
            dy = y2 - y;

        if (dist < minDist) {
            var force = minDist / (dist * dist),
                xcomp = (x - x2) / dist,
                ycomp = (y - y2) / dist,
                deltaV = force / 2;

            flake.velX -= deltaV * xcomp;
            flake.velY -= deltaV * ycomp;

        } else {
            flake.velX *= .98;
            if (flake.velY <= flake.speed) {
                flake.velY = flake.speed
            }
            flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
        }

        ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
        flake.y += flake.velY;
        flake.x += flake.velX;
            
        if (flake.y >= canvas.height || flake.y <= 0) {
            reset(flake);
        }


        if (flake.x >= canvas.width || flake.x <= 0) {
            reset(flake);
        }

        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
        ctx.fill();
    }
    if(requestAnimationFrame) {
      requestAnimationFrame(snow);
  }
    };

function reset(flake) {
    flake.x = Math.floor(Math.random() * canvas.width);
    flake.y = 0;
    flake.size = (Math.random() * 3) + 2;
    flake.speed = (Math.random() * 1) + 0.5;
    flake.velY = flake.speed;
    flake.velX = 0;
    flake.opacity = (Math.random() * 0.5) + 0.3;
}

function init() {
    for (var i = 0; i < flakeCount; i++) {
        var x = Math.floor(Math.random() * canvas.width),
            y = Math.floor(Math.random() * canvas.height),
            size = (Math.random() * 3) + 2,
            speed = (Math.random() * 1) + 0.5,
            opacity = (Math.random() * 0.5) + 0.3;

        flakes.push({
            speed: speed,
            velY: speed,
            velX: 0,
            x: x,
            y: y,
            size: size,
            stepSize: (Math.random()) / 30,
            step: 0,
            opacity: opacity
        });
    }
    snow();

};

    canvas.addEventListener("mousemove", function(e) {
    mX = e.clientX,
    mY = e.clientY
});

window.addEventListener("resize",function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

function stopsnow() {
    // $('body').removeClass('snow-playing');
    $('#playsnow').text('Let it snow!');
      $('canvas').off();
      
      if (requestAnimationFrame) {
       window.cancelAnimationFrame(requestAnimationFrame);
       requestAnimationFrame = undefined;
    }
    $('body').removeClass('snow-playing');
    flakeCount = 0;
}

function playsnow() {
    // $('body').addClass('snow-playing');
    $('#playsnow').text('Make it stop');
    (function() {
        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
        window.requestAnimationFrame = requestAnimationFrame;
    })();

    flakeCount = 400;

    init();

    $('body').addClass('snow-playing');

    if (snowtimer) {
        clearTimeout(snowtimer); //cancel the previous timer.
        snowtimer = null;
    }
    snowtimer = setTimeout(function() {
        // Stop after 1 minute
        stopsnow();
    }, 60000);
}

$('#playsnow').click(function() {
    if($('body').hasClass('snow-playing')) {
        stopsnow();
    } else {
        playsnow();
    }
});

}

    }
  };
})(jQuery);;
(function($) {
	Drupal.behaviors.closeQtip = {
    attach: function(context, settings) {

			//Click bindings for no-touch devices (Modernizr adds no-touch class to html)
			$('.no-touch a.menu-minipanel').click(function(e){
				//Don't travel to link destination, just open dropdown menu
				e.preventDefault();
				setTimeout(function() {
				  $('body').append('<div class="close-qtip"></div>');
				}, 500);
			});

			$('.no-touch body').on("click", '.close-qtip', function() {
			  //Hide the menus if visible
			  $('.qtip').hide();
			  //Remove the big close box that covers the screen
			  $('.close-qtip').remove();
			  //Remove the hover style that qtip added
			  $('a.menu-minipanel').removeClass('qtip-hover');
			});

		}
	};
})(jQuery);;
(function($) {
Drupal.behaviors.DOCresponsiveTables = {

// Simply wrap all tables in the body field with a div
// This allows us to set a overflow:auto on the container 
// so big tables scroll horizontally and don't break the layout

  attach: function(context, settings) {

  	$('.field-name-body table', context).once('wrapTable', function () {
	    	$(this).each( function( index, element ){
	    		$(element).wrap('<div class="table-wrapper"><div class="table-inner"></div></div>');
	    	});
	    });

  	function tableOverflow(){
    	$('.table-inner').each( function( index, element ){
    		$overflown = $(element).overflown();
    		$(element).children('.table-overflow').remove();
    		if ($overflown == true) {
	      	$(element).append('<div class="table-overflow">Scroll<span class="icon-arrow-right"></span></div>');
	      	var lastPos = 0;
	      	$(element).scroll(function(e) {
				    var currPos = $(this).scrollLeft();
						if (lastPos < currPos) {
			        $(element).children('.table-overflow').hide();
				    }
	      	});
	      }
    	});
	  }


		$.fn.overflown=function(){var e=this[0];return e.scrollHeight>e.clientHeight||e.scrollWidth>e.clientWidth;}

		tableOverflow();

		$(window).bind('resizeEnd', function() {
			tableOverflow();
		});
}
};


})(jQuery);;
