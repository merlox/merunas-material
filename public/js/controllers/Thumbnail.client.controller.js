app.controller('ThumbnailCtrl', function($http, Upload, $timeout){
  thumbnailCtrl = this;
  thumbnailCtrl.getThumbnails = function(){
    $http.get('/api/thumbnails').success(function(response){
      thumbnailCtrl.loading = false;
      thumbnailCtrl.thumbnailData = response.thumbnailsFound;
      thumbnailCtrl.actualPage = response.actualPage;
      var totalPages = Math.floor(response.totalPages/18);
      var range = [];
      for (var i = 1; i <= totalPages; i++) {
        range.push(i);
      }
      thumbnailCtrl.pagesArray = range;
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
    $http.delete('/api/thumbnails/'+myTitle).success(function(response){
      $http.get('/api/thumbnails').success(function(response){
        thumbnailCtrl.loading = false;
        thumbnailCtrl.thumbnailData = response.thumbnailsFound;
      }).catch(function(response){
        thumbnailCtrl.loading = false;
        thumbnailCtrl.responseError = response;
      });
    }).catch(function(response){
      thumbnailCtrl.responseError = 'Something went wrong';
    });
  };
  thumbnailCtrl.editThumbnail = function(myTitle, editTitle, editBody){
    $http.put('/api/thumbnails/'+myTitle, {
      title: editTitle,
      body: editBody
    }).success(function(response){
      $http.get('/api/thumbnails').success(function(response){
        console.log(response);
        thumbnailCtrl.loading = false;
        thumbnailCtrl.thumbnailData = response.data;
      }).catch(function(response){
        console.log(response);
        thumbnailCtrl.loading = false;
        thumbnailCtrl.responseError = response;
      });
    }).catch(function(response){
      console.log(response);
      thumbnailCtrl.responseError = 'Something went wrong';
    });
  };
  thumbnailCtrl.getThumbnailsLimit = function(limitQuery){
    $http.get('/api/thumbnails?limit='+limitQuery).success(function(response){
      thumbnailCtrl.loading = false;
      thumbnailCtrl.thumbnailData = response.thumbnailsFound;
    }).catch(function(response){
      alert('Something went wrong');
    });
  };
  thumbnailCtrl.getPage = function(pageQuery){
    $http.get('/api/thumbnails?page='+pageQuery).success(function(response){
      thumbnailCtrl.loading = false;
      thumbnailCtrl.thumbnailData = response.thumbnailsFound;
      thumbnailCtrl.actualPage = response.actualPage;
    }).catch(function(response){
      alert('Something went wrong');
    });
  };
  thumbnailCtrl.getLastPosts = function(){
    $http.get('/api/thumbnails?limit=10').success(function(response){
      thumbnailCtrl.loading = false;
      thumbnailCtrl.lastPosts = response.thumbnailsFound;
      console.log(thumbnailCtrl.lastPosts);
    }).catch(function(response){
      alert(response);
    });
  };
});
