'use strict';

app.factory('ItemService', ['$q', '$http',
  function ($q, $http) {
    return {
      getAllItems: function () {
        var defer = $q.defer();

        // Make http request here
        setTimeout(function () {
          defer.resolve({
            'name': 'test'
          });
        }, 2000);

        return defer.promise;
      }
    };
  }
]);
