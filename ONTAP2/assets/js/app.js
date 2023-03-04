var app = angular.module('myApp', ['ngRoute']);

window.apiUrl = "http://localhost:3000/list";

app.config(function ($routeProvider, $locationProvider) {
   $locationProvider.hashPrefix("");
   $routeProvider
      .when('/home', {
         templateUrl: './layout/home.html',
         controller: readCtrl
      })
      .when('/home/add', {
         templateUrl: './layout/add.html',
         controller: createCtrl
      })
      .when('/home/edit/:id', {
         templateUrl: './layout/add.html',
         controller: updateCtrl
      })
      .when('/home/delete/:id', {
         templateUrl: './layout/home.html',
         controller: deleteCtrl
      })
      .otherwise({ redirectTo: '/home' });
});

// app.controller('HomeCtrl', ['', function () { }]);
window.readCtrl = function ($scope, $http) {
   $scope.list = [];
   $http.get(apiUrl).then(function (response) {
      if (response.statusText === "OK") {
         $scope.list = response.data;
         console.log("Load successful");
      }
   }, function (response) {
      console.log("Load error");
   });
}

window.createCtrl = function ($scope, $http, $location) {
   $scope.staff = {};
   // $scope.staff.gender = "true";
   // var dateString = document.querySelector("input[type=date]").value;
   // $scope.staff.birthday = dateString.substring(0, 10);// cắt bỏ đuôi giờ, chỉ giữ lại ngày tháng năm

   $scope.onSubmit = function () {
      $scope.staff.birthday = $scope.staff.birthday.toISOString().substring(0, 10); // bị lỗi bên datefmt angular
      $http.
         post(apiUrl, $scope.staff).
         then(
            function (response) {
               if (response.status === 201) {
                  $location.path('/list');// bắt buộc có dòng này
                  alert("Added staff successfully")
               }
            },
            function (response) {
               alert("Added staff error");
            }
         )
   };
}

window.updateCtrl = function ($scope, $http, $routeParams, $location) {
   $scope.staff = {};
   var id = $routeParams.id;

   if (id) {
      $http.
         get(apiUrl + "/" + id).
         then(
            function (response) {
               if (response.status === 200) {
                  $scope.staff = response.data;
                  $scope.staff.birthday = new Date(response.data.birthday);// gán chuỗi thành date, vẫn còn định dạng giờ đằng sau
                  console.log("Load successful");
               }
            },
            function (response) {
               console.log("Load error");
            }
         )
   }

   $scope.onSubmit = function () {
      $scope.staff.birthday = $scope.staff.birthday.toISOString().substring(0, 10); // bị lỗi bên datefmt angular
      // var dateString = document.querySelector("input[type=date]").value;
      // $scope.staff.birthday = dateString.substring(0, 10);// cắt bỏ đuôi giờ, chỉ giữ lại ngày tháng năm
      $http.
         put(apiUrl + "/" + id, $scope.staff).
         then(
            function (response) {
               if (response.status === 200) {
                  $location.path('/list');
                  alert("Updated staff successfully")
               }
            },
            function (response) {
               alert("Updated staff error");
            }
         )
   };
}

window.deleteCtrl = function ($scope, $http, $routeParams, $location) {
   var id = $routeParams.id;

   if (id) {
      $http.
         delete(apiUrl + "/" + id).
         then(
            function (response) {
               if (response.status === 200) {
                  $scope.list = response.data; // dòng này có cũng được, không có cũng chả sao
                  $location.path('/list'); // thay là home cũng chả làm sao, sẽ chuyển đến trang khác tránh delete nhiều lần
                  alert("Deleted staff successfully")
               }
            },
            function (response) {
               alert("Deleted staff error");
            }
         )
   }
}