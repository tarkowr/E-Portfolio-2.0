var app = angular.module('myApp', []);

app.controller('links', function ($scope) {
    $scope.gitHub = {
        domain: "https://github.com/tarkowr",
        cit195: "/CIT195-Final-Project",
        cit190: "/CIT-228-Discussion-Forum",
        cit255: "/CIT255FinalApplication",
        eportfolio: "/ePortfolio",
        pycsv: "/PyCsv"
    };
    $scope.linkedIn = "https://www.linkedin.com/in/richie-tarkowski-273238155";
    $scope.trailHead = "https://trailhead.com/me/rtarkowski";
    $scope.instagram = "https://www.instagram.com/richie_tarkowski/";
    $scope.facebook = "https://www.facebook.com/richie.tarkowski";
});

app.controller('projects', function ($scope){
    $scope.projects = angular.element(document.getElementsByClassName('proj'));
    $scope.types = 
    [{
        value: 'all',
        label: 'Display All'
    }, {
        value: 'api',
        label: 'API'
    }, {
        value: 'angular',
        label: 'Angular 7'
    }, {
        value: 'c#',
        label: 'C#'
    }, {
        value: 'html/css',
        label: 'HTML/CSS'
    }, {
        value: 'js',
        label: 'JavaScript'
    },{
        value: 'node',
        label: 'NodeJS'
    }, {
        value: 'php',
        label: 'PHP'
    },{
        value: 'python',
        label: 'Python'
    }, {
        value: 'sql',
        label: 'SQL'
    }];  

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

//Recompile element(s) on a webpage
function compile(element){
    var el = angular.element(element);    
    $scope = el.scope();
    $injector = el.injector();
    $injector.invoke(function($compile){
        $compile(el)($scope)
    });
}