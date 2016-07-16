// public/core.js
var mantidAlgs = angular.module('mantidAlgs', ['angularSpinner']);

function mainController($scope, $http) {

  $scope.busy = true;

  $http.get('/api/records')
        .success(function(data) {
          $scope.busy = false;
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
