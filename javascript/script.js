$(function() {
    let nav = $("#navigation");
  
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
        if (scroll > 100) {
            nav.addClass("scrolled-navigation");
            nav.removeClass("default-navigation");
        }
        else{
            nav.addClass("default-navigation");
            nav.removeClass("scrolled-navigation");
        }
    });
});
  