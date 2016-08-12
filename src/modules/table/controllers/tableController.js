'use strict';

(function (angular) {
  
  angular.module('goodrating.table')
  
  .controller('tableController', ['$scope', '$routeParams', 'tableDataService', tableController]);

  function tableController($scope, $routeParams, tableDataService) {
    $scope.ratings = [];

    tableDataService.calc('/calc/2015')
      .then(function (data) {
        $scope.ratings = data;
      })
      .catch(function (error) {
        console.error(error);
      })
  }
  
})(angular);