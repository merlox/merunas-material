app.controller('EmailCtrl', function($mdDialog, $mdMedia, $http, $cookies){
  var emailCtrl = this;

  (function checkCookie(){
    if($cookies.get('email')){
      emailCtrl.isEmailAdded = true;
    }else{
      return;
    }
  })();

  emailCtrl.contactoEmail = function(){
    emailCtrl.loading = true;
    $http.post('/api/emailContacto', {
      email: emailCtrl.emailContacto,
      contenido: emailCtrl.contenidoEmail
    }).success(function(response){
      emailCtrl.loading = false;
      emailCtrl.response = response;
    }).catch(function(err){
      emailCtrl.loading = false;
      emailCtrl.response = response;
    });
  };
  emailCtrl.getEmails = function(){
    $http.get('/api/getEmails').success(function(response){
      emailCtrl.getEmails = response;
    }).catch(function(err){
      emailCtrl.getEmails = err;
    });
  };
  emailCtrl.showEmailDialog = function(ev) {
    $mdDialog.show({
      templateUrl: 'views/emailDialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      controller: 'EmailCtrl',
      controllerAs: 'emailCtrl',
      fullscreen: $mdMedia('sm')
    });
  };
  emailCtrl.sendEmail = function(){
    $cookies.put('email', emailCtrl.email, {maxAge: 31104000000}); //expires 1 year
    $http.post('/api/sendEmailAndSave', {
      email: emailCtrl.email
    }).success(function(response){
      console.log('Ok')
    }).catch(function(err){
      console.log(err)
    });
  };
  emailCtrl.close = function(value){
    $mdDialog.hide()
    if(value === true){
      emailCtrl.isEmailAdded = true;
    }
  };
});
