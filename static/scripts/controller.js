var app = angular.module('myApp', []);

app.controller('projects', function ($scope){
    $scope.projects = angular.element(document.getElementsByClassName('proj'));
    $scope.types = 
    [{
        value: 'all',
        label: 'Display All'
    }, {
        value: 'angular',
        label: 'Angular'
    }, {
        value: 'api',
        label: 'API'
    }, {
        value: 'asp.net',
        label: 'ASP.NET'
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
    let el = angular.element(element);    
    $scope = el.scope();
    $injector = el.injector();
    $injector.invoke(function($compile){
        $compile(el)($scope)
    });
}