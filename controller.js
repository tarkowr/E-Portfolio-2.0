var app = angular.module('myApp', []);
app.controller('personalInfo', function($scope) {
    $scope.firstName= "Richie";
    $scope.lastName= "Tarkowski";
    $scope.email = "tarkowr@gmail.com";
    $scope.getCurrentYear = function() {
        var currentdate = new Date();
        return currentdate.getFullYear();
    }
});