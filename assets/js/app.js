var viewed = false;

var width = $(window).width();


$(document).ready(function() {
	/* MENU */
	$('.navbar-nav').attr('id', 'menu'); // please don't remove this line
	$( '<div class="calendar-top"></div>' ).insertBefore( "#calendar" );
	$( '<div class="card-profile-top"></div>' ).insertBefore( ".card.profile.card-profile" );
	var divs = $(".card-profiles > div");
	for(var i = 0; i < divs.length; i+=2) {
		divs.slice(i, i+2).wrapAll( '<div class="col-xs" />');
	}

	var headerNavbar = $('#headerNavbar');
	var width100 = $('.width100');
	var innerWidth = $('body').innerWidth();
	headerNavbar.width(innerWidth);
	width100.width(innerWidth);

    $('.nav-item').children("a").each(function(){
        if($(this).attr('data-toggle') == 'dropdown'){
            $(this).removeAttr('data-toggle')
        }
    });

    if (width < 992) { // mobile
        $('#menuToggle input[type="checkbox"]').change(function(){
            var checked = $(this).is(":checked");
            if(checked){
                $('#menu').show("slide", { direction: "right" }, 400);
                $('#search').hide();
                $('#menu, #menu *').css({
                    'visibility': 'visible'
                });
                $('.navbar.fixed').css('position', 'absolute');
                $('html, body').animate({
                    scrollTop:  0
                }, 1);
                // $('body', 'html').css({
                //     'overflow': 'hidden'
                // });
            }else{
                $('#menu').hide("slide", { direction: "right" }, 400);
                $('#search').hide();
                $('.navbar.fixed').css('position', 'fixed');
                // $('.navbar').addClass('fixed');
                // $('body', 'html').css({
                //     'overflow': 'auto'
                // });
            }
        });
    }

    $('.dropdown a').click(function(event) {

        if (location.href.indexOf("#") != -1) {
            var link = $(this).attr('href');
            var anchorId = link.substr(link.indexOf("#") + 1);
            if($("#"+anchorId).length > 0){

                window.location.href = link;
                location.reload();
            }
        }
    });


    $('body').on('click', '.projects_services .accordion-toggle', function () {
        if ($(this).next(".accordion-content").is(':visible')) {
            $(this).next(".accordion-content").slideUp(300);
            $(this).children(".plusminus").html('<span class="plus"></span>');
        } else {
            $(this).next(".accordion-content").slideDown(300);
            $(this).children(".plusminus").html('<span class="minus"></span>');
        }
    });


    var extLink = $('#layout-content a').filter(function() { 
      return this.hostname && this.hostname !== location.hostname
    });
    extLink.each(function(){
      $(this).attr('target', '_blank');
    });

    $('.about .container').each(function( index, value ) {
        $(value).find('a').attr( "onclick", "openNewTab(this.href);" )
    });

    $('.projects_services').removeAttr('role');

	$('.nav.nav-pills').removeAttr('id');

    $('.tabs').each(function(){
        // For each set of tabs, we want to keep track of
        // which tab is active and its associated content
        var $active, $content, $links = $(this).find('a');
        var speed = "fast";
        var activeTab = $(location.hash);
        // If the location.hash matches one of the links, use that as the active tab.
        // If no match is found, use the first link as the initial active tab.
        $active = $($links.filter("[href=\'"+location.hash+"\']")[0] || $links[0]);

        // if($(this).parent().parent().hasClass('events')){
            $active.addClass('active');
        // }

        $content = $($active[0].hash);

        // Hide the remaining content
        $links.not($active).each(function () {
            $(this.hash).hide();
        });

        if(activeTab.length){
            $content.slideDown(speed);
            //scroll to element
            // $('html, body').animate({
            //     scrollTop:  activeTab.offset().top - $('header').height()*2
            // }, speed);
        }

        // Bind the click event handler
        $(this).find("a").click(function (e) {

            if($(this).hasClass('active')) {
                $content.slideDown({
                    scrollTop: 0
                }, speed);
                var screenSize = getScreenSize();
                if (screenSize.width < 800) {
                    // scroll to element
                    $('html, body').animate({
                        scrollTop: 0  // mobile
                    }, speed);
                }else{
                    //scroll to element icons top
                    $('html, body').animate({
                        scrollTop:  0
                    }, speed);
                }
                e.preventDefault();
                return false;
            }
            // Make the old tab inactive.
            $active.removeClass('active');
            $content.hide();

            // Update the variables with the new link and content
            $active = $(this);
            $content = $(this.hash);

            location.hash = $active[0].hash;

            // Make the tab active.
            $active.addClass('active');
            if($content.offset()){
                $content.slideDown({
                    scrollTop: 0
                }, speed);
            }

            // Prevent the anchor\'s default click action
            e.preventDefault();
        });
    });

    $( ".tabs" ).tabs();
    $( ".subtabs" ).tabs();
    openParentTab();

	$('.about h1.display-1').attr('data-aos', 'fade-up');
	$('h2.underline').attr('data-aos', 'fade-up');

    $('.accordion-toggle .col-xs.start-xs').each(function(){
        if($(this).text().toLowerCase() === 'role in the oecd tgs programme'){
            $(this).parent().css('text-transform', 'unset');
            $(this).text('ROLE IN THE OECD TGs PROGRAMME');
        }
    });

    $('.useful-resources .items').slick({
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1
    });


});

// this function can fire onclick handler for any DOM-Element
function fireClickEvent(element) {
    var evt = new window.MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    });

    element.dispatchEvent(evt);
    return false;
}

// this function will setup a virtual anchor element
// and fire click handler to open new URL in the same room
// it works better than location.href=something or location.reload()
function openSameTab(targetURL) {
    var a = document.createElement('a');
    a.href = targetURL;
    fireClickEvent(a);
}

function openNewTab(targetURL) {
    var a = document.createElement('a');
    a.href = targetURL;

    a.target = '_blank'; // now it will open new tab/window and bypass any popup blocker!

    fireClickEvent(a);
}

function openParentTab() {
	locationHash = location.hash.substring( 1 );
	// Check if we have an location Hash
	if (locationHash) {
		// Check if the location hash exsist.
		var hash = jQuery('#'+locationHash);
		if (hash.length) {
			// Check of the location Hash is inside a tab.
			if (hash.closest(".tabContent").length) {
				// Grab the index number of the parent tab so we can activate it
				var tabNumber = hash.closest(".tabContent").index();
				jQuery(".tabs.fix").tabs({ active: tabNumber });
				// Not need but this puts the focus on the selected hash
				hash.get(0).scrollIntoView();
				setTimeout(function() {
					hash.get(0).scrollIntoView();
				}, 1000);
			}
		}
	}
}

function GoToPage(page){
    window.open('/'+page, '_self');
}


function redirectAndRefresh(url){
	$(".tabs a").each(function() {
		this.href = window.location.hash;
	});
	window.open(url, '_blank');
	location.reload();
}

function isBreakpointLarge() {
    return window.innerWidth <= 991;
}

function showSearchForm(){
	$('#layout-header').toggleClass('full-width');
	$('#search').toggle();
	$('#menu li').hide();
	$('nav a:not(.navbar-brand)').hide();
}

function hideSearchForm(){
	$('#layout-header').toggleClass('full-width');
	$('#search').hide();
	$('#menu li').show();
    $('nav a').show();
}

