// read
window.listProduct = function ($scope, $http) {
   $scope.list = [];
   $http.get(listApi).then(
      function (response) {
         if (response.statusText === "OK") {
            $scope.list = response.data;
         }
      },
      function (response) {
         console.log(errors);
      }
   );
};

// create
window.createController = function ($scope, $http, $location) {
   $scope.book = {};
   // cast image to base64 encoding
   // $scope.uploadImage = function (input) {
   //    if (input.files && input.files[0]) {
   //       var reader = new FileReader();

   //       reader.onload = function (e) {
   //          $scope.book.image = e.target.result;
   //          $scope.$apply();
   //       };

   //       reader.readAsDataURL(input.files[0]);
   //    }
   // };

   $scope.onSubmit = function () {
      $http
         .post(listApi, $scope.book)
         .then(
            function (response) {
               console.log(response);
               if (response.status === 201) {
                  $location.path("list");
                  alert("Successful Add");
               }
            },
            function (errors) {
               console.log(errors);
            }
         );
   };
};

// update
window.updateController = function (
   $scope,
   $http,
   $location,
   $routeParams
) {

   // $scope.uploadImage = function (input) {
   //    if (input.files && input.files[0]) {
   //       var reader = new FileReader();

   //       reader.onload = function (e) {
   //          $scope.book.image = e.target.result;
   //          $scope.$apply();
   //       };

   //       reader.readAsDataURL(input.files[0]);
   //    }
   // };

   // $scope.setName = function (input) {
   //    if (input.files && input.files[0]) {
   //       input.value = input.files[0].name;
   //       $scope.$apply();
   //    }
   // };

   // $scope.list = [];
   $scope.book = {};
   var id = $routeParams.id;

   if (id) {
      $http.get(`${listApi}/${id}`).then(
         function (response) {
            // $scope.list = response.data;
            // const index = $scope.list.findIndex(item => item.id === id);
            if (response.status === 200) {
               // $scope.book = $scope.list[index];
               $scope.book = response.data;

               // $scope.book.image = 'data:image/jpeg;base64,' + response.data.avatar;
               // var input = document.querySelector("input[type=file]");
               // input.value = response.data.image;
            }
         },
         function (errors) {
            console.log(errors);
         }
      );
   }

   $scope.onSubmit = function () {
      if (id) {
         return $http
            .put(`${listApi}/${id}`, $scope.book)
            .then(
               function (response) {
                  if (response.status === 200) {
                     $location.path("list");
                  }
               },
               function (errors) {
                  console.log(errors);
               }
            );
      }
   };
};

// delete
window.deleteController = function (
   $scope,
   $http,
   $routeParams,
   $location
) {
   var id = $routeParams.id;
   if (id) {
      $http.delete(`${listApi}/${id}`).then( // listApi + "/" + id
         function (response) {
            $scope.list = response.data;
            $location.path("list");
            alert("Successful Delete");
         },
         function (errors) {
            console.log(errors);
         }
      );
   }
};

