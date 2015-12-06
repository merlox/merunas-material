var app = angular.module('myApp',
[
  'ui.router',
  'ngMaterial',
  'ngFileUpload',
  'ngImgCrop',
  'ngSanitize',
  'ngCookies',
]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      views: {
        'mainToolbar': {
          templateUrl: 'views/mainToolbar.html'
        },
        '': {
          templateUrl: 'views/thumbnails.html'
        },
        'sidebar': {
          templateUrl: 'views/sidebar.html'
        }
      },
      onEnter: function(){
        thumbnailCtrl.isSidebarHidden = false;
      }
    })
    .state('signin', {
      url: '/signin',
      views: {
        'mainToolbar': {
          templateUrl: 'views/mainToolbar.html'
        },
        '': {
          templateUrl: 'views/signin.html'
        }
      }
    })
    .state('admin', {
      url: '/admin/add',
      views: {
        'mainToolbar': {
          templateUrl: 'views/mainToolbar.html'
        },
        '': {
          templateUrl: 'views/añadirArticulo.html'
        }
      },
      onEnter: function(){
        thumbnailCtrl.isSidebarHidden = true;
        thumbnailCtrl.expandFlex = true;
      },
      onExit: function(){
        thumbnailCtrl.isSidebarHidden = false;
        thumbnailCtrl.expandFlex = false;
      }
    })
    .state('article', {
      url: '/article?id',
      views: {
        'mainToolbar': {
          templateUrl: 'views/mainToolbar.html'
        },
        '': {
          templateUrl: 'views/article.html'
        },
        'sidebar': {
          templateUrl: 'views/sidebar.html'
        }
      },
      onEnter: function(){
        thumbnailCtrl.getThumbnails();
      }
    })
    .state('comprar', {
      url: '/comprar?id',
      reloadOnSearch: false,
      views: {
        'mainToolbar': {
          templateUrl: 'views/mainToolbar.html'
        },
        '': {
          templateUrl:'views/comprar.html'
        }
      }
    });

  $urlRouterProvider.otherwise('/');
});

app.config(function($mdThemingProvider){
  $mdThemingProvider.theme('default')
    .primaryPalette('purple')
    .accentPalette('deep-purple');
});
