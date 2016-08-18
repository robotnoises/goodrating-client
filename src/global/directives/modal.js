'use strict';

(function (angular) {
  
  angular.module('goodrating.global')
  
  .directive('modal', ['$timeout', function ($timeout) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        items: '=items',
        showModal: '=show'
      },
      template: 
        '<form>' +
        ' <div class="modal" ng-if="showModal">' +
        '   <div class="modal-body">' +
        '     <div class="modal-range" ng-repeat="i in items">' +
        '       <p><input type="range" min="0" max="100" ng-value="i.value"></p>' +
        '     </div>' +
        '   </div>' +
        ' </div>' +
        ' <div class="modal-backdrop" ng-class="{show: showModal}" ng-click="toggleModal()"></div>' +
        '</form>',
      link: function (scope, ele, attr) {
        
        scope.showModal = false;

        scope.toggleModal = function () {
          scope.showModal = !scope.showModal;
        };
      }
    }
  }]);
  
})(angular);