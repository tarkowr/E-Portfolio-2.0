const maxSmallScreen = 649;
const maxScroll = 100;
const scrollBarWidth = 17;

$(function() {
    let nav = $("#navigation");
    let ToggleNavBar = function(){
        var scroll = $(window).scrollTop();
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

    if ($(window).innerWidth() + scrollBarWidth <= maxSmallScreen) { nav.addClass("scrolled-navigation") }
  
    $(window).scroll(function(){
        ToggleNavBar();
    });

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

document.getElementById("nav-bars").addEventListener("click", function(){
    let links = document.getElementsByClassName('nav-links');

    if(links[0].style.display == "inline-block"){
        for(var i = 0; i < links.length; i++){
            links[i].style.display = "none";
        }
    }
    else{
        for(var i = 0; i < links.length; i++){
            links[i].style.display = "inline-block";
        }
    }
});

  