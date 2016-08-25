'use strict';

(function (angular) {
  
  angular.module('goodrating.global')
  
  .directive('modal', ['$timeout', '$location', function ($timeout, $location) {
    return {
      restrict: 'E',
      replace: true,
      transclude: false,
      scope: {
        items: '=items',
        showModal: '=show'
      },
      template: 
        '<form>' +
        ' <div class="modal" ng-if="showModal">' +
        '   <div class="modal-body">' +
        '     <div class="modal-range" ng-repeat="(name, value) in items">' +
        '       <p><input type="range" min="0" max="100" ng-value="value" ng-model="items[name]"></p>' +
        '     </div>' +
        '     <button class="button--sm centered" ng-click="submit()">Let\'s Get Crazy</button>' +
        '   </div>' +
        ' </div>' +
        ' <div class="modal-backdrop" ng-class="{show: showModal}" ng-click="toggleModal()"></div>' +
        '</form>',
      link: function (scope, ele, attr) {
        
        scope.showModal = false;

        // Methods

        scope.toggleModal = function () {
          scope.showModal = !scope.showModal;
        };

        scope.submit = function () {
          $location.search(scope.items);
          scope.showModal = false;
        };

        scope.update = function (name, value) {
          scope.items[name] = value;
        };
      }
    }
  }]);
  
})(angular);