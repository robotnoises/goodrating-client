'use strict';

(function (angular) {
  
  angular.module('goodrating.table')
  
  .controller('tableController', ['$scope', '$routeParams', '$location', 'tableDataService', tableController]);

  function tableController($scope, $routeParams, $location, tableDataService) {
    
    var COLUMN = {
      'WIN_PERCENTAGE': 'win_percentage',
      'YPP_OFFENSE': 'ypp_offense',
      'YPP_DEFENSE': 'ypp_defense',
      'RECRUITING_SCORE': 'recruiting_score',
      'ATS': 'ats',
      'WIN_PERCENTAGE_RATING': 'win_percentage_rating',
      'YPP_OFFENSE_RATING': 'ypp_offense_rating',
      'YPP_DEFENSE_RATING': 'ypp_defense_rating',
      'RECRUITING_SCORE_RATING': 'recruiting_score_rating',
      'TOTAL_RATING': 'total_rating'
    };

    $scope.ratings = [];
    $scope.loaded = false;
    $scope.sortColumn = ($location.search().sortby) ? COLUMN[$location.search().sortby.toUpperCase()] : COLUMN.TOTAL_RATING;
    
    function doNothin() {
      console.log('did nothin.');
    }

    $scope.years = [
      { 'name': '2015 Season', 'action': doNothin, 'default': true },
      { 'name': '2016 Season', 'action': doNothin },
    ];

    $scope.sorts = [
      { 'name': 'Sort Descending', 'action': doNothin, 'default': true },
      { 'name': 'Sort Ascending', 'action': doNothin }
    ];

    // Scope methods

    $scope.sortBy = function (column) {
      $location.search('sortby', COLUMN[column.toUpperCase()] || COLUMN.TOTAL_RATING)
    }

    // Init

    var year = $routeParams.year || '';

    tableDataService.calc('/calc/' + year, $location.search())
      .then(function (data) {
        $scope.ratings = data;
        $scope.loaded = !!data;
      })
      .catch(function (error) {
        console.error(error);
      })
  }
  
})(angular);