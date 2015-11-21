app.controller('ThumbnailCtrl', function($http, Upload, $timeout){
  thumbnailCtrl = this;
  thumbnailCtrl.getThumbnails = function(){
    $http.get('/api/thumbnails/id').then(function successCallback(response){
      thumbnailCtrl.loading = false;
      thumbnailCtrl.thumbnailData = response.data;
    }, function errorCallback(response){
      thumbnailCtrl.loading = false;
      thumbnailCtrl.responseError = response;
    });
  };
  thumbnailCtrl.postThumbnail = function(myFile){
    console.log(myFile);
    if(myFile){
      Upload.upload({
        url: '/api/thumbnails/id',
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
      $http.get('/api/thumbnails/id').then(function successCallback(response){
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
});
