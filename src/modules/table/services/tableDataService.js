'use strict';

(function (angular) {

  angular.module('goodrating.table')

  .factory('tableDataService', ['$http', '$httpParamSerializer', '$q', 
  function ($http, $httpParamSerializer, $q) {

    var _dataService = {};
    
    var apiBase = 'https://goodrating.herokuapp.com/api/v1'; // 'http://localhost:12345/api/v1';

    function _calc(path, query) {
      return $q(function (resolve, reject) {
        $http({
          method: 'GET',
          url: apiBase + path + '?' + $httpParamSerializer(query)
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