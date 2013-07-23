angular.module('calamar.routing.buildRoutes', []).constant('buildRoutes', (function () {
    'use strict';

    var INVALID_PARAMETERS_ERROR = 'Invalid parameters error.';
    var PATH_NOT_FOUND = '`path`property not found error.';
    var PATH_SEPARATOR = '/';

    function copy(dest, source) {
        for (var key in source) {
            var value = source[key];
            if (angular.isObject(value)) {
                dest[key] = copy(dest[key] || {}, value);
            } else {
                dest[key] = value;
            }
        }
        return dest;
    }

    function throwError(error) {
        throw new Error(error);
    }

    function routingParameterIsValid(routing) {
        //TODO
        return true;
    }

    function routeProviderParameterIsValid(routeProvider) {
        //TODO
        return true;
    }

    function parametersAreValids(routing, routeProvider) {
        return routeProviderParameterIsValid(routing) && routingParameterIsValid(routeProvider);
    }


    return  function (routingData, routeProvider) {

        function process(routingData, previousData, previousPath) {
            var path = (routingData.path || throwError(PATH_NOT_FOUND)).replace(/^\/|\/$/, '');
            previousPath = previousPath.replace(/\/$/, '');
            path = previousPath + PATH_SEPARATOR + path;
            var parameters = copy(copy({}, previousData), routingData.parameters);
            routeProvider.when(path, parameters);
            angular.forEach(routingData.subRoutes, function (value) {
                process(value, parameters, path);
            });
        }

        if (!parametersAreValids(routingData, routeProvider))throw new Error(INVALID_PARAMETERS_ERROR)

        process(routingData, {}, '');

    };

})());