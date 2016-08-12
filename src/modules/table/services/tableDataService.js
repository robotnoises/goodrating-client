'use strict';

(function (angular) {

  angular.module('goodrating.table')

  .factory('tableDataService', ['$http', '$q', function ($http, $q) {

    var _dataService = {};
    
    var apiBase = 'http://localhost:12345/api/v1';

    function _calc(path) {
      return $q(function (resolve, reject) {
        $http({
          method: 'POST',
          url: apiBase + path
        })
        .then(function (response) {
          resolve(response.data);
        }, function (error) {
          reject(error);
        })
      });
    }

    _dataService.calc = _calc;

    return _dataService;
  }]);

} (angular));