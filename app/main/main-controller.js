(function(){
    angular.module('WebDev')
    .controller('MainController', ['$scope', '$http', '$interval', '$rootScope', 'Upload', 
        function($scope, $http, $interval, $rootScope, Upload){
            
        
          if(localStorage['User-Data']){
              $scope.user = JSON.parse(localStorage['User-Data']);
              console.log($scope.user.username);
              console.log($scope.user.email);
              console.log($scope.user.bio);
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

            $scope.sendWaste = function(event){
                if(event.which === 13){
                    var request = {
                        user: $scope.user.username || $scope.user.email,
                        userId: $scope.user._id,
                        userImage: $scope.user.image,
                        content: $scope.newWaste
                    };
                    
                    $http.post('api/waste/post', request).success(function(response){
                        console.log(response);
                        $scope.wastes = response;
                    }).error(function(error){
                            console.error(error);
                    })
                   window.location.reload(true);
                }
                
            };

            $scope.sendWasteClick=function(){
                var request = {
                    user: $scope.user.username || $scope.user.email,
                    userId: $scope.user._id,
                    userImage: $scope.user.image,
                    content: $scope.newWaste
                };

                $http.post('api/waste/post', request).success(function(response){
                    console.log(response);
                    $scope.wastes = response;
                }).error(function(error){
                    console.error(error);
                })
                window.location.reload(true);
            }
            
            function getWastes (initial){
                $http.get('api/waste/get').success(function (response){
                    if(initial){
                        $scope.wastes = response;
                    }else{
                        if(response.lenght > $scope.wastes.length){
                        $scope.incomingWastes = response;
                        }
                    }
                })
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
            
            $interval(function(){
                getWastes(false);
                if($scope.incomingWastes){
                $scope.difference = $scope.incomingWastes.length - $scope.wastes.length;
                }
                if($scope.incomingResources){
                $scope.difference = $scope.incomingResources.length - $scope.resources.length;
                }
                console.log("this is working");
            }, 5000) //5 segundos para hacer la retroalimentacion de Publicaciones
            
            $scope.setNewWastes = function(){
                $scope.wastes = angular.copy($scope.incomingWastes);
                $scope.incomingWastes = undefined;
            }
            getWastes(true);
            getResources(true);
            
        }]);
}());