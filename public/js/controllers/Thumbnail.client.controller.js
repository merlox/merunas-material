app.controller('ThumbnailCtrl', function($http, Upload, $timeout){
  thumbnailCtrl = this;
  thumbnailCtrl.getThumbnails = function(){
    $http.get('/api/thumbnails').success(function(response){
      thumbnailCtrl.loading = false;
      thumbnailCtrl.thumbnailData = response;
    }).catch(function(response){
      thumbnailCtrl.loading = false;
      thumbnailCtrl.responseError = response;
    });
  };
  thumbnailCtrl.postThumbnail = function(myFile){
    if(myFile){
      Upload.upload({
        url: '/api/thumbnails',
        method: 'POST',
        data: {file: Upload.dataUrltoBlob(myFile), title: thumbnailCtrl.title, body: thumbnailCtrl.body}
      }).then(function(response){
        $timeout(function(){
          myFile.result = response.data;
          thumbnailCtrl.loading = false;
          thumbnailCtrl.response = response.data.message;
          thumbnailCtrl.credentials = response.data.credentials;
        });
        if(response.status > 0){
          thumbnailCtrl.loading = false;
          thumbnailCtrl.response = response.status + ':' + response.data;
        }
      }, function(responseError){
        if(responseError) thumbnailCtrl.responseError = responseError;
      });
    }
  };
  thumbnailCtrl.removeThumbnail = function(myTitle){
    $http.delete('/api/thumbnails/'+myTitle).then(function successCallback(response){
      $http.get('/api/thumbnails').then(function successCallback(response){
        thumbnailCtrl.loading = false;
        thumbnailCtrl.thumbnailData = response.data;
      }, function errorCallback(response){
        thumbnailCtrl.loading = false;
        thumbnailCtrl.responseError = response;
      });
    }, function errorCallback(){
      thumbnailCtrl.responseError = 'Something went wrong';
    });
  };
  thumbnailCtrl.editThumbnail = function(myTitle, editTitle, editBody){
    $http.put('/api/thumbnails/'+myTitle, {
      title: editTitle,
      body: editBody
    }).then(function successCallback(response){
      $http.get('/api/thumbnails').then(function successCallback(response){
        console.log(response);
        thumbnailCtrl.loading = false;
        thumbnailCtrl.thumbnailData = response.data;
      }, function errorCallback(response){
        console.log(response);
        thumbnailCtrl.loading = false;
        thumbnailCtrl.responseError = response;
      });
    }, function errorCallback(response){
      console.log(response);
      thumbnailCtrl.responseError = 'Something went wrong';
    });
  };
  thumbnailCtrl.getThumbnailsLimit = function(limitQuery){
    $http.get('/api/thumbnails?limit='+limitQuery).success(function(response){
      thumbnailCtrl.loading = false;
      thumbnailCtrl.thumbnailData = response;
    }).catch(function(response){
      alert('Something went wrong');
    });
  };
});
