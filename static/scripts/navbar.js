$(function() {
    const DEFAULT_NAV = 'default-navigation';
    const SCROLLED_NAV = 'scrolled-navigation';
    const DISPLAY_NONE = 'display-none';

    let nav = $('#navigation');
    let filter = $('#filter');
    let icon = $('#nav-bars');

    filter.removeClass(DISPLAY_NONE);
    icon.removeClass(DISPLAY_NONE);

    // Check if window is scrolled past a certain point and handle navbar classes
    let ToggleNavBar = function(){
        let scroll = $(window).scrollTop();

        if(!(isMobile())){
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
    if (isMobile()) 
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
        
        if (isMobile()) { 
            $('#navigation a').css('display', 'none');
            nav.addClass(SCROLLED_NAV);
        }
        else{
            $('#navigation a').css('display', 'inline-block');
            ToggleNavBar();
        }
    });

    function isMobile(){
        return $(window).innerWidth() + scrollBarWidth <= maxSmallScreen
    }
});