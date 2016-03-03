(function(){
	angular.module('WebDev')
	.controller('NavigationController', ['$scope','$http','$state', function($rootScope, $http, $state){
        
		$rootScope.logUserIn = function(){
            
			if(localStorage['User-Data']){
				$rootScope.loggedIn = true;
			} else{
				$rootScope.loggedIn = false;
			}

			$http.post('api/user/login', $rootScope.login).success(function(response){
				localStorage.setItem('User-Data', JSON.stringify(response));
                window.location.hash = '#/'; //Aqui creo que esta el detalle 
				$rootScope.loggedIn = true;
			}).error(function(error){
				console.error(error);
			});
		};
        
        $rootScope.logOut = function(){
            localStorage.clear();
            localStorage.removeItem('User-Data');
            $rootScope.loggedIn = false;
            $rootScope.login = '';
            window.location.reload(true);
        };
	}]);
}());