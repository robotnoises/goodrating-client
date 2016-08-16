'use strict';

/**
 * dropdown, a fancy-looking dropdown
 * 
 * dropdown expects an attribute, "items", which is a list of items to display in the dropdown
 */

(function (angular) {
  
  angular.module('goodrating.global')
  
  .directive('dropdown', ['$timeout', function ($timeout) {
    return {
      restrict: 'E',
      replace: false,
      transclude: true,
      scope: {
        items: '=items'
      },
      template: 
        '<div>' +
        ' <span class="dropdown" ng-click="toggleDropdown()">' +
        '   <span class="selected" ng-bind="selected.name"></span>' +
        '   <ul class="items" ng-show="show">' +
        '     <li ng-repeat="i in items" ng-click="i.action()" ng-bind="i.name"></li>' +
        '   </ul>' +
        ' </span>' + 
        ' <span class="dropdown-backdrop" ng-if="show" ng-click="toggleDropdown()"></span>' +
        '</div>',
      link: function (scope, ele, attr) {
        
        scope.show = false;
        scope.selected = scope.items[0];

        scope.toggleDropdown = function () {
          scope.show = !scope.show;
        };
      }
    }
  }]);
  
})(angular);