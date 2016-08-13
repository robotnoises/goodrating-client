'use strict';

(function (angular) {
  
  angular.module('goodrating.global')
  
  .directive('spinner', ['$timeout', function ($timeout) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        hideSpinner: '=loaded'
      },
      template: 
        '<div class="loading" ng-hide="hideSpinner">' +
        ' <div class="rect1"></div>' +
        ' <div class="rect2"></div>' +
        ' <div class="rect3"></div>' +
        ' <div class="rect4"></div>' +
        ' <div class="rect5"></div>' +
        '</div>'
    }
  }]);
  
})(angular);