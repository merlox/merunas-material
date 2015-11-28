app.controller('LoginCtrl', function($http, $state){
  var loginCtrl = this;
  loginCtrl.signIn = function(){
    $http.post('/signin', {
      username: loginCtrl.username,
      password: loginCtrl.password
    }).success(function(response){
      loginCtrl.username = response.username;
      console.log(loginCtrl.username)
      $state.go('home');
    }).catch(function(response){
      console.log('Error', response);
    });
  };
  loginCtrl.signUp = function(){
    $http.post('/signup', {
      username: loginCtrl.username,
      password: loginCtrl.password,
      email: loginCtrl.email
    }).success(function(response){
      console.log('Account created', response);
      $state.go('home');
    }).catch(function(response){
      console.log('Error', response);
    });
  };
  loginCtrl.signOut = function(){
    $http.get('/signout').success(function(response){
      console.log('Logged out', response);
      $state.go('signin');
    }).catch(function(response){
      console.log('Error', response);
    });
  };
});
