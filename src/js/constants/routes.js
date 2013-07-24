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
        {
            path: "/a1"
        },
        {
            path: "/a2"
        },
        {
            path: "/b1",
            controller: null,
            templateUrl: null,
            parameters: {
                meta: {
                    mainView: "/templates/b.html"
                }
            }

        },
        {
            path: "/b2",
            controller: null,
            templateUrl: null,
            parameters: {
                meta: {
                    mainView: "/templates/b.html"
                }
            }

        },
        {
            path: "/b3",
            controller: null,
            templateUrl: null,
            parameters: {
                meta: {
                    mainView: "/templates/c.html"
                }
            },
            subRoutes: [
                {
                    path: "/a",
                    parameters: {
                        meta: {
                            subViewA: "/templates/partials/a.html",
                            subViewB: "/templates/partials/b.html"
                        }
                    }

                },
                {
                    path: "/b",
                    parameters: {
                        meta: {
                            subViewA: "/templates/partials/b.html",
                            subViewB: "/templates/partials/c.html"
                        }
                    }

                },
                {
                    path: "/c",
                    parameters: {
                        meta: {
                            subViewA: "/templates/partials/c.html",
                            subViewB: "/templates/partials/a.html"
                        }
                    }

                }

            ]
        }


    ]
});

