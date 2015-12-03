app.controller('TwitterCtrl', function($http){
  twitterCtrl = this;
  twitterCtrl.loadTweets = function(){
    $http.get('/api/tweets').then(function(response){
      console.log(response)
    }, function(error){
      console.log(error)
    });
  };
  twitterCtrl.sendTweet = function(myTweet){
    $http.post('/api/tweets', {
      tweet: myTweet
    }).then(function(response){
      console.log(response)
    }, function(error){
      console.log(error)
    });
  };
});
