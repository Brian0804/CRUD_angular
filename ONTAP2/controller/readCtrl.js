window.readCtrl = function ($scope, $http) {
   $scope.list = [];
   $http.get("").then(function (response) {
      if (response.status === 200) { // response.statusText === "OK"
         $scope.list = response.data;
         console.log("Loading success");
      }
   },
      function (response) {
         console.log("Loading error: " + response);
      })
}