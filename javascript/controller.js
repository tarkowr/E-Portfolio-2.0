var app = angular.module('myApp', []);

app.controller('personalInfo', function ($scope) {
    $scope.name = "Richie Tarkowski";
    $scope.email = "tarkowr@gmail.com";
    $scope.getCurrentYear = function () {
        var currentdate = new Date();
        return currentdate.getFullYear();
    }
});

app.controller('links', function ($scope) {
    $scope.gitHub = {
        domain: "https://github.com/tarkowr",
        cit195: "/CIT-195-Despair",
        cit190: "/CIT-228-Discussion-Forum",
    };
    $scope.linkedIn = "https://www.linkedin.com/in/richie-tarkowski-273238155";
    $scope.trailHead = "https://trailhead.salesforce.com/en/me/0055000000875A3AAI";
});