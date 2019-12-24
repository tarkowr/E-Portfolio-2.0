$(function() {
    const DEFAULT_NAV = 'default-navigation';
    const SCROLLED_NAV = 'scrolled-navigation';
    
    let nav = $('#navigation');
    let filter = $('#filter');

    // If JS is enabled, display the project filter
    filter.removeClass('display-none');

    // Check if window is scrolled past a certain point and handle navbar classes
    let ToggleNavBar = function(){
        let scroll = $(window).scrollTop();
        if(!($(window).innerWidth() + scrollBarWidth <= maxSmallScreen)){
            if (scroll > maxScroll) {
                nav.addClass(SCROLLED_NAV);
                nav.removeClass(DEFAULT_NAV);
            }
            else{
                nav.addClass(DEFAULT_NAV);
                nav.removeClass(SCROLLED_NAV);
            }
        }
    }

    // Check window width on page load to determine navbar class
    if ($(window).innerWidth() + scrollBarWidth <= maxSmallScreen) 
    { 
        nav.addClass(SCROLLED_NAV);
    }

    ToggleNavBar();
  
    // On window scroll, check if it has passed a certain point
    $(window).scroll(function(){
        ToggleNavBar();
    });

    // On window resize, check if the navbar needs to switch to mobile or desktop
    $(window).on('resize', function(){
        mobile = false;
        
        if ($(window).innerWidth() + scrollBarWidth <= maxSmallScreen) { 
            $('#navigation a').css('display', 'none');
            nav.addClass(SCROLLED_NAV);
        }
        else{
            $('#navigation a').css('display', 'inline-block');
            ToggleNavBar();
        }
    });
});