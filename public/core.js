// public/core.js
var mantidAlgs = angular.module('mantidAlgs', []);

function mainController($scope, $http) {
  $scope.formData = {};

  $.ajax({
      url:'localhost:8080/api/records',
      dataType: 'json',
      }).done(function(data) {
         console.log(data);
             $('#algorithms-table').dynatable({
          dataset: {
          records: data
        }
       });
  });
}
