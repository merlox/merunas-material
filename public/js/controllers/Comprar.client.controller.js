app.controller('ComprarCtrl', function($interval, $users, $cookies, $timeout){
  var comprarCtrl = this;
  comprarCtrl.$users = $users;

  (function checkCookies(){
    $timeout(function(){
      if($users.name || $cookies.get('username')){
        comprarCtrl.showLogin = false;
        comprarCtrl.showEnvio = true;
        comprarCtrl.showEnvioLogged = true;
      }
    }, 1000);
  })();

  comprarCtrl.twitter = function(){
    window.location = '/auth/twitter';
  };
  comprarCtrl.facebook = function(){
    window.location ="/auth/facebook";
  };
  comprarCtrl.google = function(){
    window.location = "/auth/google";
  };
  comprarCtrl.signIn = function(myUsername, myPassword){
    $users.loading = true;
    return $http.post('/signin', {
      username: myUsername,
      password: myPassword
    }).success(function(response){
      $users.name = response.username;
      $users.loading = false;
      console.log($users.name)
    }).error(function(error){
      console.log('Error', response);
    });
  };
  comprarCtrl.signUp = function(myUsername, myPassword, myEmail){
    $users.loading = true;
    $http.post('/signup', {
      username: myUsername,
      password: myPassword,
      email: myEmail
    }).success(function(response){
      //Show acc created msg
      console.log('Account created', response);
      $users.name = myUsername;
      console.log($users.name)
      $users.loading = false;
    }).catch(function(response){
      console.log('Error', response);
    });
  };

});
