angular.module('app', ['calamar.routing.buildRoutes']);angular.module('app').config([
  '$routeProvider',
  '$locationProvider',
  '$provide',
  'buildRoutes',
  'routes',
  function ($routeProvider, $locationProvider, $provide, buildRoutes, routes) {
    buildRoutes(routes, $routeProvider);
    $routeProvider.otherwise({ redirectTo: '.' });
    $locationProvider.html5Mode(true).hashPrefix('!');
  }
]);angular.module('app').run([
  '$route',
  function ($route) {
    console.log('run...', $route);
  }
]);angular.module('app').controller('Main', [
  '$scope',
  'helloWorld',
  function ($scope, helloWorld) {
    $scope.helloWorld = helloWorld;
  }
]);angular.module('app').controller('MainBis', [
  '$scope',
  function ($scope) {
    $scope.helloWorld = '//TODO';
  }
]);angular.module('app').factory('helloWorldResolver', [
  '$q',
  '$timeout',
  function ($q, $timeout) {
    var deferred = $q.defer();
    $timeout(function () {
      deferred.resolve('Hello world (' + (Math.random() * 1000 >> 0) + ')');
    }, 100);
    return deferred.promise;
  }
]);angular.module('app').directive('metaProvider', [
  '$routeParams',
  function ($routeParams) {
    return {
      restrict: 'A',
      compile: function () {
        return {
          pre: function (scope, element, attributes) {
            scope.$on('$routeChangeSuccess', function (event, currentRoute) {
              scope.meta = currentRoute.meta;
            });
          }
        };
      }
    };
  }
]);angular.module('calamar.routing.buildRoutes', []).constant('buildRoutes', function () {
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
    return true;
  }
  function routeProviderParameterIsValid(routeProvider) {
    return true;
  }
  function parametersAreValids(routing, routeProvider) {
    return routeProviderParameterIsValid(routing) && routingParameterIsValid(routeProvider);
  }
  return function (routingData, routeProvider) {
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
    if (!parametersAreValids(routingData, routeProvider))
      throw new Error(INVALID_PARAMETERS_ERROR);
    process(routingData, {}, '');
  };
}());angular.module('app').constant('routes', {
  path: '/',
  parameters: {
    controller: 'Main',
    meta: {},
    templateUrl: 'templates/a.html',
    resolve: { 'helloWorld': 'helloWorldResolver' }
  },
  subRoutes: [
    { path: '/a1' },
    { path: '/a2' },
    {
      path: '/b1',
      controller: null,
      templateUrl: null,
      parameters: { meta: { mainView: 'templates/b.html' } }
    },
    {
      path: '/b2',
      controller: null,
      templateUrl: null,
      parameters: { meta: { mainView: 'templates/b.html' } }
    },
    {
      path: '/b3',
      controller: null,
      templateUrl: null,
      parameters: { meta: { mainView: 'templates/c.html' } },
      subRoutes: [
        {
          path: '/a',
          parameters: {
            meta: {
              subViewA: 'templates/partials/a.html',
              subViewB: 'templates/partials/b.html'
            }
          }
        },
        {
          path: '/b',
          parameters: {
            meta: {
              subViewA: 'templates/partials/b.html',
              subViewB: 'templates/partials/c.html'
            }
          }
        },
        {
          path: '/c',
          parameters: {
            meta: {
              subViewA: 'templates/partials/c.html',
              subViewB: 'templates/partials/a.html'
            }
          }
        }
      ]
    }
  ]
});