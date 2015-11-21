var app = angular.module('myApp', ['ui.router', 'ngMaterial', 'ngFileUpload', 'ngImgCrop']);

app.controller('MainCtrl', function($http){
  var mainCtrl = this;
  mainCtrl.saveUser = function(){
    $http.post('/api/users', {
      username: mainCtrl.username,
      password: mainCtrl.password,
      phoneNumber: mainCtrl.phoneNumber
    }).then(function successCallback(response){
        mainCtrl.loading = false;
        mainCtrl.response = response.data.message;
        mainCtrl.credentials = response.data.credentials;
      }, function errorCallback(response){
        mainCtrl.loading = false;
        mainCtrl.response = response;
      });
    $http.get('/api/users').then(function successCallback(response){
      mainCtrl.loading = false;
      mainCtrl.usersData = response.data;
    }, function errorCallback(response){
      mainCtrl.loading = false;
      mainCtrl.errorUsers = response;
    });
  };
  mainCtrl.editUser = function(id, user, pass, phone){
    $http.put('/api/users/'+id, {
      username: user,
      password: pass,
      phoneNumber: phone
    }).then(function successCallback(response){
      mainCtrl.editMessage = response.data.message;
      $http.get('/api/users').then(function successCallback(response){
        mainCtrl.loading = false;
        mainCtrl.usersData = response.data;
      }, function errorCallback(response){
        mainCtrl.loading = false;
        mainCtrl.errorUsers = response;
      });
    }, function errorCallback(response){
      mainCtrl.editMessage = response.data.message;
      $http.get('/api/users').then(function successCallback(response){
        mainCtrl.loading = false;
        mainCtrl.usersData = response.data;
      }, function errorCallback(response){
        mainCtrl.loading = false;
        mainCtrl.errorUsers = response;
      });
    });
  };
  mainCtrl.removeUser = function(id, index){
    $http.delete('/api/users/'+id).then(function successCallback(response){
      mainCtrl.editMessage = response.data.message;
      $http.get('/api/users').then(function successCallback(response){
        mainCtrl.loading = false;
        mainCtrl.usersData = response.data;
      }, function errorCallback(response){
        mainCtrl.loading = false;
        mainCtrl.errorUsers = response;
      });
    }, function errorCallback(response){
      mainCtrl.editMessage = response.data.message;
      $http.get('/api/users').then(function successCallback(response){
        mainCtrl.loading = false;
        mainCtrl.usersData = response.data;
      }, function errorCallback(response){
        mainCtrl.loading = false;
        mainCtrl.errorUsers = response;
      });
    });
  };
});

app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('show', {
      url: '/users',
      templateUrl: 'views/showUsers.html'
    })
    .state('form', {
      url: '/users/form',
      templateUrl: 'views/añadirArticulo.html',
      controller: 'ThumbnailCtrl as thumbnailCtrl'
    })
    .state('home', {
      url: '/',
      templateUrl: 'views/panels.html',
      controller: 'ThumbnailCtrl as thumbnailCtrl'
    });

  $urlRouterProvider.otherwise('/');
});

app.config(function($mdThemingProvider){
  $mdThemingProvider.theme('default')
    .primaryPalette('purple')
    .accentPalette('deep-purple');
});
