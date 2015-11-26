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
        data: {
          file: Upload.dataUrltoBlob(myFile),
          thumbnailTitle: thumbnailCtrl.thumbnailTitle,
          thumbnailBody: thumbnailCtrl.thumbnailBody,
          articleTitle: thumbnailCtrl.articleTitle,
          articleBody: thumbnailCtrl.articleBody
        }
      }).then(function(response){
        $timeout(function(){
          myFile.result = response.data;
          thumbnailCtrl.loading = false;
          thumbnailCtrl.response = response.data.message;
          thumbnailCtrl.credentials = response.data.credentials;
        });
      }, function(responseError){
        if(responseError) thumbnailCtrl.responseError = responseError;
      });
    }
  };
  thumbnailCtrl.removeThumbnail = function(myTitle){
    $http.delete('/api/thumbnails/'+myTitle).success(function(response){
      thumbnailCtrl.getThumbnails();
    }).catch(function(response){
      thumbnailCtrl.responseError = 'Something went wrong';
    });
  };
  thumbnailCtrl.editThumbnail = function(myTitle, editTitle, editBody){
    $http.put('/api/thumbnails/'+myTitle, {
      thumbnailTitle: editTitle,
      thumbnailBody: editBody
    }).success(function(response){
      thumbnailCtrl.getLastPosts();
      thumbnailCtrl.getThumbnails();
    }).catch(function(response){
      console.log(response);
      thumbnailCtrl.responseError = 'Something went wrong';
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
  thumbnailCtrl.selectIndex = function(index){
    for (var i = 0; i < thumbnailCtrl.thumbnailData.length; i++) {
      if(thumbnailCtrl.thumbnailData[i] == thumbnailCtrl.thumbnailData[index]){
        thumbnailCtrl.value=thumbnailCtrl.thumbnailData[i];
        return thumbnailCtrl.thumbnailData[i];
      }
    }
  };
  thumbnailCtrl.getThumbnailsLimit = function(limitQuery, pageQuery){
    if(pageQuery){
      $http.get('/api/thumbnails/search?limit='+limitQuery+'&page='+pageQuery).success(function(response){
        thumbnailCtrl.loading = false;
        thumbnailCtrl.thumbnailData = response.thumbnailsFound;
      }).catch(function(response){
        alert('Something went wrong');
      });
    }else{
      $http.get('/api/thumbnails/search?limit='+limitQuery).success(function(response){
        thumbnailCtrl.loading = false;
        thumbnailCtrl.thumbnailData = response.thumbnailsFound;
      }).catch(function(response){
        alert('Something went wrong');
      });
    }
  };
  thumbnailCtrl.getLastPosts = function(){
    $http.get('/api/thumbnails?lastPosts=10').success(function(response){
      thumbnailCtrl.loading = false;
      thumbnailCtrl.lastPosts = response.thumbnailsFound;
    }).catch(function(response){
      console.log('error'+response.error);
    });
  };
});
