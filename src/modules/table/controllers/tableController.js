'use strict';

(function (angular) {
  
  angular.module('goodrating.table')
  
  .controller('tableController', ['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.foo = 'bar';
  }]);
  
})(angular);