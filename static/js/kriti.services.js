'use strict';

// Contains services

angular.module('kriti.services', []);

angular.module('kriti.services')
  .factory('UserService', ['$q', '$http',
    function ($q, $http) {
      return {
        getUser: function (enrolment) {
          // body...
        }
      };
    }
  ]);

// Item related services
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
        appreciateItem: function (id) {
          console.log(id);
        },
        addItem: function (itemObject) {
          // body...
        },
        deleteItem: function (id) {
          // body...
        }
      };
    }
  ]);

// Search related services
angular.module('kriti.services')
  .factory('SearchService', ['$q', '$http',
    function ($q, $http) {
      return {
        search: function (query) {
          var defer = $q.defer();

          defer.resolve({
            test: [1, 2, 3]
          });
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

// Notification System
angular.module('kriti.services')
  .factory('NotificationSys', function () {
    return {
      notify: function (msg, typeOfNoti) {
        Messenger().post({
          message: msg,
          hideAfter: 5, // seconds
          hideOnNavigate: true,
          showCloseButton: true,
          type: typeOfNoti
        });
      }
    };
  });
