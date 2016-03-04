(function(){
	angular.module('WebDev')
.controller('SignupController', ['$scope', '$state', '$http', function($scope, $state, $http){

		$scope.createUser = function(){
            console.log($scope.newUser);
			$http.post('api/user/signup', $scope.newUser).success(function(response){
			}).error(function(error){
				console.log(error);
			})
            $scope.newUser = {};
            window.location.hash = '/login';
		}
	}]);
}());