(function(){
    angular.module('WebDev')
    .controller('VideoController', ['$scope', '$http', '$interval', '$rootScope', 'Upload', 
        function($scope, $http, $interval, $rootScope, Upload){
            
        
          if(localStorage['User-Data']){
              $scope.user = JSON.parse(localStorage['User-Data']);
              console.log($scope.user.username);
              console.log($scope.user.email);
              $rootScope.loggedIn = true;
            }
 
            $scope.$watch(function(){
               return $scope.file
              }, function(){
                  $scope.upload($scope.file);
              });
  
              $scope.upload = function(file){
                  if(file){
                      Upload.upload({
                          url: 'api/resource/post',
                          method:'POST',
                          data: {userId: $scope.user._id},
                          file: file
                      }).progress(function(evt){
                          console.log("firing");
                      }).success(function(data){
                          
                      }).error(function(error){
                          console.log(error);
                      })
                      window.location.reload(true);
                  }
              };

            
            function getResources (initial){
                $http.get('api/resource/get').success(function(response){
                    if(initial){
                        $scope.resources = response;
                     }else{
                         if(response.lenght > $scope.resources.length){
                             $scope.incomingResources = response;
                         }
                     }
                })
            };
            
            getResources(true);
            
        }]);
}());