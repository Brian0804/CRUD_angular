var app = angular.module("myApp", ["ngRoute"]);
app.config(function ($routeProvider, $locationProvider) {
   $locationProvider.hashPrefix("");
   $routeProvider
      .when("/home", {
         templateUrl: "layout/home.html",
         controller: listProduct
      })
      .when("/book/add", {
         templateUrl: "./layout/add.html",
         controller: createController
      })
      .when("/book/delete/:id", {
         templateUrl: "./layout/home.html",
         controller: deleteController
      })
      .when("/book/edit/:id", {
         templateUrl: "./layout/add.html",
         controller: updateController
      })
      .otherwise({
         redirectTo: "/home"
      });
});
