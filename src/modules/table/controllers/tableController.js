'use strict';

(function (angular) {
  
  angular.module('goodrating.table')
  
  .controller('tableController', ['$scope', '$routeParams', 'tableDataService', tableController]);

  function tableController($scope, $routeParams, tableDataService) {
    $scope.ratings = [];

    var year = $routeParams.year || '';

    tableDataService.calc('/calc/' + year)
      .then(function (data) {
        $scope.ratings = data;
      })
      .catch(function (error) {
        console.error(error);
      })
  }
  
})(angular);