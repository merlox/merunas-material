app.factory('$users', function($http, $q, $state){
  var $users = {};

  $users.twitter = function(){
    window.location = "/auth/twitter";
  };
  $users.facebook = function(){
    window.location ="/auth/facebook";
  };
  $users.google = function(){
    window.location = "/auth/google";
  };
  $users.signIn = function(myUsername, myPassword){
    $users.loading = true;
    return $http.post('/signin', {
      username: myUsername,
      password: myPassword
    }).success(function(response){
      $state.go('home');
      $users.name = response.username;
      $users.loggedIn = true;
      $users.loading = false;
    }).error(function(error){
      console.log('Error', response);
    });
  };
  $users.signUp = function(myUsername, myPassword, myEmail){
    $users.loading = true;
    $http.post('/signup', {
      username: myUsername,
      password: myPassword,
      email: myEmail
    }).success(function(response){
      $state.go('home');
      //Show acc created msg
      console.log('Account created', response);
      $users.name = myUsername;
      $users.loggedIn = true;
      $users.loading = false;
    }).catch(function(response){
      console.log('Error', response);
    });
  };
  $users.signOut = function(){
    $users.loading = true;
    $http.get('/signout').success(function(response){
      $state.go('signin');
      //Show logged out msg
      console.log('Logged out', response);
      $users.loggedIn = false;
      $users.loading = false;
    }).catch(function(response){
      console.log('Error', response);
    });
  };
  return $users;
});
