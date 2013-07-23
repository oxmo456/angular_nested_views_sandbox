angular.module("app").factory("helloWorldResolver", function ($q, $timeout) {
        var deferred = $q.defer();
        $timeout(function () {
            deferred.resolve("Hello world (" + (Math.random() * 1000 >> 0) + ")");
        }, 100);
        return deferred.promise;
    }
);