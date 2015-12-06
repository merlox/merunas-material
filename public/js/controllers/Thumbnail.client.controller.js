app.controller('ThumbnailCtrl', function($http, Upload, $timeout, $location, $anchorScroll, $stateParams, $cookies){
  thumbnailCtrl = this;

  thumbnailCtrl.getThumbnails = function(){
    thumbnailCtrl.loading=true;
    $http.get('/api/thumbnails').success(function(response){
      thumbnailCtrl.thumbnailData = response.thumbnailsFound;
      thumbnailCtrl.actualPage = response.actualPage;
      articleLoader();
      paginatorCalculator(response);
      getLastPosts();
      thumbnailCtrl.loading = false;
    }).catch(function(response){
      thumbnailCtrl.loading = false;
      thumbnailCtrl.responseError = response;
    });
  };
  thumbnailCtrl.postThumbnail = function(myFile){
    thumbnailCtrl.loading=true;
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
    thumbnailCtrl.loading = true;
    for (var i = 0; i < thumbnailCtrl.thumbnailData.length; i++) {
      if(thumbnailCtrl.thumbnailData[i] == thumbnailCtrl.thumbnailData[index]){
        thumbnailCtrl.articleFound = thumbnailCtrl.thumbnailData[i];
        thumbnailCtrl.loading = false;
        return thumbnailCtrl.thumbnailData[i];
      }
    }
  };
  thumbnailCtrl.editArticle = function(editedTitle, editedBody){
    thumbnailCtrl.loading = true;
    var myTitle = thumbnailCtrl.thumbnailData[$stateParams.id].thumbnailTitle;
    $http.put('/api/article/'+myTitle, {
      articleTitle: editedTitle,
      articleBody: editedBody
    }).success(function(response){
      console.log(response)
      thumbnailCtrl.getThumbnails();
      thumbnailCtrl.loading = false;
    }).catch(function(error){
      console.log(error)
    });
  };
  thumbnailCtrl.getThumbnailsLimit = function(limitQuery, pageQuery){
    thumbnailCtrl.loading=true;
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
  thumbnailCtrl.scrollToTop = function(){
    $location.hash('scrollTop');
    $anchorScroll();
  };
  thumbnailCtrl.currentParamsId = function(){
    return $stateParams.id;
  };
  thumbnailCtrl.isLogged = function(){
    if($cookies.get('username')){
      return true;
    }else{
      return false;
    }
  }
  function paginatorCalculator(response){
    //Paginator calculation
    var totalPages = Math.ceil(response.totalPages/18);
    var range = [];
    for (var i = 1; i <= totalPages; i++) {
      range.push(i);
    }
    thumbnailCtrl.pagesArray = range;
  }
  function articleLoader(){
    if(Object.keys($stateParams).length != 0){
      //the id object is defined in the routes app.js
      thumbnailCtrl.selectIndex($stateParams.id);
    }
    $('.owl-carousel').owlCarousel({
      items: 1,
      nav: true,
      dots: false,
      autoplay: true,
      loop: true
    });
  };
  function getLastPosts(){
    $http.get('/api/thumbnails?lastPosts=10').success(function(response){
      thumbnailCtrl.loading = false;
      thumbnailCtrl.lastPosts = response.thumbnailsFound;
    }).catch(function(response){
      console.log('error'+response.error);
    });
  };
});
