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
    BlogDataService(environment, 'main')
    .then(data => {
        blogData = data;

        if (data.length){ setup(); }
    });

    // Configure arrow buttons
    function setup(){
        up = $('#top-arrow');
        down = $('#bottom-arrow');

        // Get target element references in the page
        for(let i=0; i<blogData.length; i++){
            let id = 's' + (i+1) + '-target';
            sprintIds.push(document.getElementById(id).id);
        }

        // Get sprint element Y positions
        getSprintY();

        // On window resize get updated sprint Y positions
        $(window).on('resize', function(){
            getSprintY();
        });

        // Send to next post on down click
        down.click(function() {
            scroll = $(window).scrollTop();
            let target = getDownTarget();
            sendToTarget(target);
        })

        // Send to above post on up click
        up.click(function() {
            scroll = $(window).scrollTop();
            let target = getUpTarget();
            sendToTarget(target);
        })
    }

    // Get sprint Y positions
    function getSprintY(){
        for(let i=0; i<blogData.length; i++){
            let id = 'post' + (i+1);
            sprints.push(document.getElementById(id).getBoundingClientRect().top + window.scrollY - offset);
        }
    }

    // Relocate the user to the target
    function sendToTarget(t){
        if (!t) return;
 
        // Fix to browser not sending the user to target if the target is already the hash
        if (window.location.hash === '#' + t){
            window.location.hash = ''
        }
        
        window.location.hash = t;
    }

    // Set the href for the down arrow based on current scroll and sprint Y positions
    function getDownTarget(){
        for(let i=1; i < sprints.length; i++){
            if(scroll>sprints[i-1] && scroll<sprints[i]){
                return sprintIds[i]
            }
            else if(scroll<sprints[0]){
                return sprintIds[0]
            }
        }
    }

    // Set the href for the up arrow based on current scroll and sprint Y positions
    function getUpTarget(){
        for(let i=1; i < sprints.length; i++){
            if(scroll>sprints[i-1]+offset && scroll<sprints[i]+offset){
                return sprintIds[i-1]
            }
            else if(scroll>sprints[sprints.length-1]+offset){
                return sprintIds[sprints.length-1]
            }
            else if(scroll<sprints[0]+offset){
                return '';
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