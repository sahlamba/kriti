'use strict';

// Contains services

angular.module('kriti.services', []);

var image_url = '';

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

angular.module('kriti.services')
  .factory('UserService', ['$q', '$http', 'NotificationSys',
    function ($q, $http, NotificationSys) {
      return {
        getUser: function (enrollment) {
          var defer = $q.defer();

          $http.get(api.user_profile(enrollment))
            .success(function (data) {
              console.log(data)
              data.photo = '' + data.photo;
              angular.forEach(data.addedItems, function (value, key) {
                value.entities[0].file = image_url + value.entities[0].file;
                value.owner.photo = '' + value.owner.photo;
              });
              angular.forEach(data.feed, function (value, key) {
                value.entities[0].file = image_url + value.entities[0].file;
                value.owner.photo = '' + value.owner.photo;
              });
              defer.resolve(data);
            })
            .error(function () {
            });

          return defer.promise;
        },
        getCurrentUser: function () {
          var defer = $q.defer();

          $http.get(api.current_user)
            .success(function (data) {
              data.photo = '' + data.photo;
              defer.resolve(data);
            })
            .error(function () {
              console.log('Error in getting current_user data.');
            });

          return defer.promise;
        },
        follow_unfollow: function (user, action) {
          var defer = $q.defer();

          if (action) {
            var req_action = 'follow';
          } else {
            var req_action = 'unfollow'
          }

          $http.get(api.follow_unfollow(user, req_action))
            .success(function (resp) {
              defer.resolve(resp.status);
            })
            .error(function () {
              NotificationSys.notify('An unexpected error occured, please try again.', 'error');
              defer.resolve(false);
            });

          return defer.promise;
        }
      };
    }
  ]);

// Item related services
angular.module('kriti.services')
  .factory('ItemService', ['$q', '$http', 'Upload',
    function ($q, $http, Upload) {
      return {
        getAllItems: function () {
          var defer = $q.defer();

          // Make http request here
          $http.get(api.all_items)
            .success(function (data) {
              angular.forEach(data.items, function (value, key) {
                value.entities[0].file = image_url + value.entities[0].file;
                value.owner.photo = '' + value.owner.photo;
              });
              defer.resolve(data.items);
            })
            .error(function () {
              console.log("Error in getting data.");
            });

          return defer.promise;
        },
        appreciateItem: function (id, action) {
          var defer = $q.defer();

          if (action) {
            action = 'appreciate';
          } else {
            action = 'unappreciate';
          }

          $http({
              method: 'POST',
              url: api.appreciate,
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              data: {
                itemId: id,
                action: action
              }
            })
            .then(function (resp) {
              defer.resolve(resp.status);
            }, function () {
              NotificationSys.notify('An unexpected error occured, please try again.', 'error');
              defer.resolve(false);
            });

          return defer.promise;
        },
        addItem: function (itemObject, itemFile) {
          Upload.upload({
            url: api.upload,
            method: 'POST',
            headers: {'Content-Type':'multipart/form-data'},
            data: {
              item: itemObject,
              file: itemFile
            },
            withCredentials: true
          })
          .then(function (resp) {
            console.log('Success: ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data);
          }, function (error) {
            console.log('Error status: ' + error.status);
          }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('Progress: ' + progressPercentage + '%, ' + evt.config.data.file.name);
          });
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

          $http.get(api.search(query), {
            ignoreLoadingBar: true
          }).success(function (data) {
              defer.resolve(data);
            })
            .error(function () {
              console.log("Error in getting data.");
            });

          return defer.promise;
        }
      };
    }
  ]);
