app.factory('$users', function($http, $state, $location, $cookies){
  var $users = {};

  (function setCookie(){
    $http.get('/api/cookie').success(function(response){
      if (response.username) {
        $cookies.put('username', response.username, {maxAge: 31104000000}); //expires 1 year
        $users.name = $cookies.get('username');
        $users.loggedIn = true;
        if($cookies.get('username') === 'Merunas Grincalaitis' || $cookies.get('username') === 'Merlox' || $cookies.get('username') === 'Merlox Gr'){
          $users.adminMode = true;
        }else{
          $users.adminMode = false;
        }
      }else{
        $cookies.remove('username');
        $users.loggedIn = false;
        $users.adminMode = false;
      }
      if(response.userImage){
        $cookies.put('userImage', response.userImage, {maxAge: 31104000000});
        $users.userImage = $cookies.get('userImage');
      }else{
        $cookies.remove('userImage');
      }
    }).catch(function(error){
      console.log(error);
    });
    if($cookies.get('username')){
      $users.name = $cookies.get('username');
      $users.loggedIn = true;
    }else{
      $users.loggedIn = false;
    }
    if($cookies.get('userImage')){
      $users.userImage = $cookies.get('userImage');
    }
    if($cookies.get('username') === 'Merunas Grincalaitis' || $cookies.get('username') === 'Merlox' || $cookies.get('username') === 'Merlox Gr'){
      $users.adminMode = true;
    }else{
      $users.adminMode = false;
    }
  })();

  $users.twitter = function(){
    window.location = '/auth/twitter';
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
      $users.name = '';
      $cookies.remove('username');
      $cookies.remove('userImage');
      $users.adminMode = false;
    }).catch(function(response){
      console.log('Error', response);
    });
  };
  return $users;
});
