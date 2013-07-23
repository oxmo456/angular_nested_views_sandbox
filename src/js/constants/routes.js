angular.module("app").constant("routes", {
    path: "/",
    parameters: {
        controller: "Main",
        meta: {
        },
        templateUrl: "/templates/a.html",
        resolve: {
            "helloWorld": "helloWorldResolver"
        }
    },
    subRoutes: [
    ]
});

