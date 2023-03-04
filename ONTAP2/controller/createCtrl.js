window.createCtrl = function ($scope, $http, $location) {
   $scope.staff = {};

   $scope.onSubmit = function () {
      $http.post("", $scope.staff).then(function (response) {
         $location.path("/staff");
         console.log(response);
      },
         function (response) {
            console.log(response);
         })
   }
}