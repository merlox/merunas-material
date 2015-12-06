app.controller('ComprarCtrl', function($interval, $users){
  var comprarCtrl = this;

  comprarCtrl.twitter = function(){
    window.location = '/auth/twitter?comprar=true';
  };
  comprarCtrl.facebook = function(){
    window.location ="/auth/facebook/comprar";
  };
  comprarCtrl.google = function(){
    window.location = "/auth/google/comprar";
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
