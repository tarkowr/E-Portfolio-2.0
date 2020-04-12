$(function() {
    let offset = 80;
    let scroll = 0;
    let sprintIds = [];
    let sprints = [];
    let up, down;
    let blogData = new Object();

    const testEnvironment = {
        production: false,
        apiUrl: 'http://localhost:8080'
    }
    
    const environment = {
        production: true,
        apiUrl: 'https://richietarkowski.com'
    }

    // Get blog data from server
    let blogName = (window.location.href.includes('alyssa')) ? 'alyssa' : 'main';

    BlogDataService(environment, blogName)
    .then(data => {
        blogData = data;

        if (data.length){
            setup();
        }
    });

    // Configure arrow buttons
    function setup(){
        up = $('#top-arrow');
        down = $('#bottom-arrow');

        // Get target element references in the page
        for(var i=0; i<blogData.length; i++){
            var id = 's' + (i+1) + '-target';
            sprintIds.push(document.getElementById(id).id);
        }
    
        // Set initial href for down arrow
        down.attr('href','#'+sprintIds[0].toString());
    
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
    }

    // Get sprint Y positions
    function getSprintY(){
        for(var i=0; i<blogData.length; i++){
            var id = 'post' + (i+1);
            sprints.push(document.getElementById(id).getBoundingClientRect().top + window.scrollY - offset);
        }
    }

    // Set the href for the down arrow based on current scroll and sprint Y positions
    function setDownArrow(){
        let curr = down.attr('href');
        curr = curr.replace('#','');
        for(let i=1; i < sprints.length; i++){
            if(scroll>sprints[i-1] && scroll<sprints[i]){
                down.attr('href','#'+sprintIds[i].toString());
                return;
            }
            else if(scroll<sprints[0]){
                down.attr('href','#'+sprintIds[0].toString());
                return;
            }
        }
    }

    // Set the href for the up arrow based on current scroll and sprint Y positions
    function setUpArrow(){
        for(let i=1; i < sprints.length; i++){
            if(scroll>sprints[i-1]+offset && scroll<sprints[i]+offset){
                up.attr('href','#'+sprintIds[i-1].toString());
            }
            else if(scroll>sprints[sprints.length-1]+offset){
                up.attr('href','#'+sprintIds[sprints.length-1].toString());
            }
            else if(scroll<sprints[0]+offset){
                up.attr('href','#');
            }
        }
    }

    // Retrieve blog data from server
    function BlogDataService(environment, query){
        const ROUTE = `/blog/data/${query}`;
        const URL = environment.apiUrl + ROUTE;

        return fetch(URL)
        .then(response => {
            return response.json();
        });
    }
});