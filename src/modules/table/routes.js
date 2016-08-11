'use strict';

(function (angular) {
  
  angular.module('goodrating.table')
  
  .config(['$routeProvider', function ($routeProvider) {
    
    // A specific year
    $routeProvider.when('/table/:year', {
      controller: 'tableController',
      templateUrl: 'modules/table/views/table.html'
    });

    // Latest data
    $routeProvider.when('/table', {
      controller: 'tableController',
      templateUrl: 'modules/table/views/table.html'
    });

    // Redirect
    $routeProvider.when('/', {
      redirectTo: '/table'
    });

  }]);
  
})(angular);