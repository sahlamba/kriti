'use strict';

// Contains services


angular.module('kriti.services', []);

angular.module('kriti.services')
  .factory('ItemService', ['$q', '$http',
    function ($q, $http) {
      return {
        getAllItems: function () {
          var defer = $q.defer();

          // Make http request here
          $http.get(api.all_items)
            .success(function (data) {
              defer.resolve(data);
            })
            .error(function () {
              console.log("Error in getting data.");
            });

          return defer.promise;
        },
        likeItem: function (id) {
          console.log(id);
        }
      };
    }
  ]);

angular.module('kriti.services')
  .factory('SearchService', ['$q', '$http',
    function ($q, $http) {
      return {
        search: function (query) {
          var defer = $q.defer();

          defer.resolve({test: [1,2,3]});
          // Make http request here
          // $http.get(api.search)
          //   .success(function (data) {
          //     defer.resolve(data);
          //   })
          //   .error(function () {
          //     console.log("Error in getting data.");
          //   });

          return defer.promise;
        }
      };
    }
  ]);
