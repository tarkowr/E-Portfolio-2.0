$(function() {
    let nav = $("#navigation");

    //Check if window is scrolled past a certain point
    //Handle navbar classes
    let ToggleNavBar = function(){
        let scroll = $(window).scrollTop();
        if(!($(window).innerWidth() + scrollBarWidth <= maxSmallScreen)){
            if (scroll > maxScroll) {
                nav.addClass("scrolled-navigation");
                nav.removeClass("default-navigation");
            }
            else{
                nav.addClass("default-navigation");
                nav.removeClass("scrolled-navigation");
            }
        }
    }

    //Check window width on page load to determine navbar class
    if ($(window).innerWidth() + scrollBarWidth <= maxSmallScreen) { nav.addClass("scrolled-navigation") }
  
    //On window scroll, check if it has passed a certain point
    $(window).scroll(function(){
        ToggleNavBar();
    });

    //On window resize, check if the navbar needs to switch to mobile or desktop
    $(window).on('resize', function(){
        if ($(window).innerWidth() + scrollBarWidth <= maxSmallScreen) { 
            $('#navigation a').css('display', 'none');
            nav.addClass("scrolled-navigation");
        }
        else{
            $('#navigation a').css('display', 'inline-block');
            ToggleNavBar();
        }
    });
});