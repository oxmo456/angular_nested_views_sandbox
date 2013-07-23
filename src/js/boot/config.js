angular.module("app").config(function ($routeProvider, $locationProvider, $provide, buildRoutes, routes) {
    console.log("config...");

    buildRoutes(routes, $routeProvider);

    $routeProvider.otherwise({redirectTo: "/"});

    $locationProvider.html5Mode(true).hashPrefix('!');

});





