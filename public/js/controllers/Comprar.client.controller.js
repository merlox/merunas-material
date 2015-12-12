app.controller('ComprarCtrl', function($users, $cookies, $timeout, $http){
  var comprarCtrl = this;
  comprarCtrl.$users = $users;

  (function checkLoginForPayment(){
    $timeout(function(){
      if($users.name || $cookies.get('username')){
        comprarCtrl.showLogin = false;
        comprarCtrl.showMetodoPago = true;
        comprarCtrl.showNombreLogged = true;
      }
    }, 1000);
  })();
  (function checkPaypalCallback(){
    $timeout(function(){
      comprarCtrl.payedName = '';
      comprarCtrl.payedAddress = '';
      comprarCtrl.payedEmail = '';
      $http.get('/api/paymentCallback').success(function(response){
        if(Object.keys(response).length != 0){
          comprarCtrl.payedName = response.name;
          console.log(comprarCtrl.payedName)
          comprarCtrl.payedAddress = response.address;
          comprarCtrl.payedEmail = response.email;
        }
      }).catch(function(err){
        console.log(err)
      });
    }, 1000);
  })();


  comprarCtrl.paypalPayment = function(){
    comprarCtrl.loading = true;
    $http.get('/payment/paypal').success(function(response){
      console.log(response)
      window.location = response;
    }).catch(function(err){
      console.log(err)
    });
  };
  comprarCtrl.creditCardPayment = function(nombre, direccion, numeroDireccion, codigoPostal, ciudad, provincia){
    $http.get('/payment/creditCard', {
      nombre: nombre,
      direccion: direccion,
      numeroDireccion: numeroDireccion,
      ciudad: ciudad,
      provincia: provincia
    }).success(function(response){
      console.log(response)
      window.location = response;
    }).catch(function(err){
      console.log(err)
    });
  };
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
