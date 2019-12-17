window.addEventListener('load', function() {
    let projects = document.getElementsByClassName('proj');
    let selectFilter = document.getElementById("select-filter");

    let types = [{
        value: 'all',
        label: 'Display All'
    }];  
    
    let projects_list = getProjects();
    
    projects_list.forEach(function(proj){ 
        types.push(proj);
    });
    
    createSelectList(selectFilter, types);
    
    let selected_type = types[0].value;
    
    let handleFilter = function() {
        selected_type = types[selectFilter.selectedIndex].value;
    
        Array.prototype.forEach.call(projects, function(el) {
            const DISPLAY_CLASS = 'display-none';
            let dataTags = parseComma(el.attributes['data-tags'].value);
    
            if(selected_type === types[0].value){
                el.classList.remove(DISPLAY_CLASS);
            }
            else{
                if(dataTags.includes(selected_type)){
                    el.classList.remove(DISPLAY_CLASS);
                }
                else{
                    el.classList.add(DISPLAY_CLASS);
                }
            }
        });
    }
    
    selectFilter.addEventListener("change", function(){
        handleFilter();
    });
});

// Populate select list with technology list
function createSelectList(select, options){
    for(let i=0; i<options.length; i++){
        let option = options[i];
        let el = document.createElement("option");
        el.textContent = option.label;
        el.value = option.value;
        select.appendChild(el);
    }
}

// Get all project technologies by data tags in HTML
function getProjects(){
    let projects = $(".proj");
    let projects_list = [];

    projects.each(function(index){
        if(projects[index].offsetParent !== null){ // Ensure project is not disabled
            tags = parseComma(projects[index].dataset.tags); // Gets tags as array
    
            tags.forEach(function(tag){
                if(!inList(tag, projects_list)){ // Ensure tag is not already in list
                    projects_list.push({
                        value: tag,
                        label: tag
                    });
                }
            });
        }
    });

    projects_list.sort((a, b) => (a.value > b.value) ? 1 : -1) // Custom sort the array

    return projects_list;
}

// Check if the data tag is already in the project tech list
function inList(tag, list){
    isInList = false;
    list.forEach(function(set){
        if(set.value === tag){
            isInList = true;
            return;
        }
    });

    return isInList;
}

// Split comma delimited string 
function parseComma(str){
    return str.split(",");
}