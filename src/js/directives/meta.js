angular.module("app").directive("metaProvider", function ($routeParams) {

    return {
        restrict: "A",
        compile: function () {

            return {
                pre: function (scope, element, attributes) {
                    scope.$on("$routeChangeSuccess", function (event, currentRoute) {
                        console.log("route chnage success...", currentRoute)
                        scope.meta = currentRoute.meta;
                    });

                }
            }

        }
    }

});