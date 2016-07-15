// public/core.js
var mantidAlgs = angular.module('mantidAlgs', []);

function mainController($scope, $http) {

  $http.get('/api/records')
        .success(function(data) {
          $('#algorithms-table').dynatable({
            dataset: {
              records: data,
              perPageDefault: 50
            }
          });
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

}
