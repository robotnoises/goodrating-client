'use strict';

(function (angular) {
  
  angular.module('goodrating.table')
  
  .controller('tableController', ['$scope', '$routeParams', '$location', 'tableDataService', tableController]);

  function tableController($scope, $routeParams, $location, tableDataService) {
    
    // Private

    var ratings = [];
    var ratingsReversed = [];

    var COLUMN = {
      'WIN_PERCENTAGE': 'win_percentage',
      'YPP_OFFENSE': 'ypp_offense',
      'YPP_DEFENSE': 'ypp_defense',
      'RECRUITING_SCORE': 'recruiting_score',
      'ATS': 'ats',
      'ADJUSTMENTS': 'adjustments',
      'WIN_PERCENTAGE_RATING': 'win_percentage_rating',
      'YPP_OFFENSE_RATING': 'ypp_offense_rating',
      'YPP_DEFENSE_RATING': 'ypp_defense_rating',
      'RECRUITING_SCORE_RATING': 'recruiting_score_rating',
      'TOTAL_RATING': 'total_rating'
    };

    var YEAR = {
      '2016': '2016 Season',
      '2015': '2015 Season'
    };

    var SORT_DIRECTION = {
      'ASCENDING': 'Sort Ascending ',
      'DESCENDING': 'Sort Descending'
    };
    
    function changeYear(year) {
      $location.search('');
      $location.path('/table/' + year);
    }

    function reverseSort(reverse) {
      $scope.sortDirection = (reverse) ? SORT_DIRECTION.ASCENDING : SORT_DIRECTION.DESCENDING;
      $scope.ratings = (reverse) ? ratingsReversed : ratings;
    }

    function isWeight(key) {
      return (key === COLUMN.WIN_PERCENTAGE_RATING) ||
        (key === COLUMN.YPP_OFFENSE_RATING) ||
        (key === COLUMN.YPP_DEFENSE_RATING) ||
        (key === COLUMN.RECRUITING_SCORE_RATING);
    }

    // Scope shit

    $scope.ratings = [];
    $scope.loaded = false;
    $scope.showModal = false;
    $scope.sortDirection = SORT_DIRECTION.DESCENDING;
    $scope.selectedYear = YEAR[$routeParams.year];
    $scope.sortColumn = ($location.search().sortby) ? COLUMN[$location.search().sortby.toUpperCase()] : COLUMN.TOTAL_RATING;

    $scope.updated = 'Last updated October 17, 2016';

    $scope.years = [
      { 
        'name': '2016 Season', 
        'action': changeYear.bind(undefined, '2016') 
      },
      { 
        'name': '2015 Season', 
        'action': changeYear.bind(undefined, '2015') 
      }
    ];

    $scope.sorts = [
      { 
        'name': 'Sort Descending', 
        'action': reverseSort.bind(undefined, false)
      },
      { 
        'name': 'Sort Ascending', 
        'action': reverseSort.bind(undefined, true) 
      }
    ];

    $scope.weights = {};
    $scope.weights[COLUMN.WIN_PERCENTAGE_RATING] = 35;
    $scope.weights[COLUMN.YPP_OFFENSE_RATING] = 20;
    $scope.weights[COLUMN.YPP_DEFENSE_RATING] = 20;
    $scope.weights[COLUMN.RECRUITING_SCORE_RATING] = 25;

    $scope.sortBy = function (column) {
      $location.search('sortby', COLUMN[column.toUpperCase()] || COLUMN.TOTAL_RATING)
    }

    $scope.toggleModal = function (force) {
      $scope.showModal = (force) ? force : !$scope.showModal;
    };

    // Init

    var year = $routeParams.year || '';

    tableDataService.calc('/calc/' + year, $location.search())
      .then(function (data) {
        $scope.ratings = data;
        $scope.errorMsg = '';
        $scope.loaded = !!data;

        ratings = data;
        ratingsReversed = ratings.slice().reverse();
      })
      .catch(function (error) {
        $scope.loaded = true;
        $scope.errorMsg = 'Sorry, there was a problem retrieving the data.';
        console.error(error);
      });
    
    Object.keys($location.search()).forEach(function (key) {
      if (isWeight(key)) {
        $scope.weights[key] = parseInt($location.search()[key]);
      }
    });
  }
  
})(angular);