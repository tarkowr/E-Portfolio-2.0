$(function() {
    let offset = 72;
    let s1, s2, s3, s4, s5, scroll = 0;
    let sprints = [s1, s2, s3, s4, s5];
    let sprintIds = [
        document.getElementById("s1-target").id,
        document.getElementById("s2-target").id,
        document.getElementById("s3-target").id,
        document.getElementById("s4-target").id,
        document.getElementById("s5-target").id
    ];
    let up = $('#top-arrow');
    let down = $("#bottom-arrow");

    // Set initial href for down arrow
    down.attr('href',"#"+sprintIds[0].toString());

    // Get current page scroll
    scroll = $(window).scrollTop();

    // Get sprint element Y positions
    getSprintY();

    // Set the href value for arrows based on current location
    setDownArrow();
    setUpArrow();

    // On window resize get updated sprint Y positions
    $(window).on('resize', function(){
        getSprintY();
    });

    // On page scroll get user scroll and determine if they scroll up or down. Then update down arrow based on scroll.
    $(window).scroll(function(){
        scroll = $(window).scrollTop();
        setDownArrow();
        setUpArrow();
    });

    // Get sprint Y positions
    function getSprintY(){
        s1 = document.getElementById("sprint-one").getBoundingClientRect().top + window.scrollY - offset;
        s2 = document.getElementById("sprint-two").getBoundingClientRect().top + window.scrollY - offset;
        s3 = document.getElementById("sprint-three").getBoundingClientRect().top + window.scrollY - offset;
        s4 = document.getElementById("sprint-four").getBoundingClientRect().top + window.scrollY - offset;
        s5 = document.getElementById("sprint-five").getBoundingClientRect().top + window.scrollY - offset;
        sprints = [s1, s2, s3, s4, s5];
    }

    // Set the href for the down arrow based on current scroll and sprint Y positions
    function setDownArrow(){
        let curr = down.attr('href');
        curr = curr.replace('#','');
        for(let i=1; i < sprints.length; i++){
            if(scroll>sprints[i-1] && scroll<sprints[i]){
                down.attr('href',"#"+sprintIds[i].toString());
                return;
            }
            else if(scroll<sprints[0]){
                down.attr('href',"#"+sprintIds[0].toString());
                return;
            }
        }
    }

    // Set the href for the up arrow based on current scroll and sprint Y positions
    function setUpArrow(){
        for(let i=1; i < sprints.length; i++){
            if(scroll>sprints[i-1]+offset && scroll<sprints[i]+offset){
                up.attr('href',"#"+sprintIds[i-1].toString());
            }
            else if(scroll>sprints[4]+offset){
                up.attr('href',"#"+sprintIds[4].toString());
            }
            else if(scroll<sprints[0]+offset){
                up.attr('href',"#");
            }
        }
    }
});