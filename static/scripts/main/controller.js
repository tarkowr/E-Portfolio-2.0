var app = angular.module('myApp', []);

app.controller('projects', function ($scope){
    $scope.projects = angular.element(document.getElementsByClassName('proj'));
    $scope.types = 
    [{
        value: 'all',
        label: 'Display All'
    }];  

    let projects_list = getProjects();

    projects_list.forEach(function(proj){
        $scope.types.push(proj);
    });

    $scope.selected_type = $scope.types[0].value;

    $scope.ProjectFilter = function() {
        angular.forEach($scope.projects, function(value, key) {
            let dataTags = value.attributes['data-tags'].value.split(',');
            if($scope.selected_type === 'all'){
                angular.element(value.removeAttribute('ng-hide'));
                angular.element(value.setAttribute('ng-show', 'true'));
            }
            else{
                if(dataTags.includes($scope.selected_type)){
                    angular.element(value.removeAttribute('ng-hide'));
                    angular.element(value.setAttribute('ng-show', 'true'));
                }
                else{
                    angular.element(value.removeAttribute('ng-show'));
                    angular.element(value.setAttribute('ng-hide', 'true'));
                }
            }
        });
        compile($scope.projects);
    }
});

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

// Recompile element(s) on a webpage
function compile(element){
    let el = angular.element(element);    
    $scope = el.scope();
    $injector = el.injector();
    $injector.invoke(function($compile){
        $compile(el)($scope)
    });
}