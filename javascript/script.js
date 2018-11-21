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

window.onload = function() {
    ApiService("https://api.github.com/users/tarkowr/repos");
};

function ApiService(url){
    const eportfolioDate = document.getElementById("eportfolio-date");
    const cit228Date = document.getElementById("cit228-date");
    const cit195Date = document.getElementById("cit195-date");

    const Http = new XMLHttpRequest();
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange=(e)=>{
        if(Http.readyState === 4 && Http.status === 200) {
            eportfolioDate.innerHTML = GetDateFromGithubApi(ConvertJsonToObject(Http.responseText), "ePortfolio");
            cit228Date.innerHTML = GetDateFromGithubApi(ConvertJsonToObject(Http.responseText), "CIT-228-Discussion-Forum");
            cit195Date.innerHTML = GetDateFromGithubApi(ConvertJsonToObject(Http.responseText), "CIT195-Final-Project");
        }
    }
}

function ConvertJsonToObject(json){
    return JSON.parse(json);
}

function GetDateFromGithubApi(obj, name){
    var repo = obj.find(function(element) {
        return element.name == name;
    });
    var repoLastUpdated = new Date(repo.updated_at);
    var date = repoLastUpdated.getDate();
    var month = repoLastUpdated.getMonth();
    var year = repoLastUpdated.getFullYear();

    return  (month + 1) + "-" + date + "-" + year;
}

  