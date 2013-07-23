angular.module("app").controller("Main", function ($scope, helloWorld) {
    console.log("...controller...");

    $scope.helloWorld = helloWorld;

});