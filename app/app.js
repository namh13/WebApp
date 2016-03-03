(function(){
	angular.module('WebDev', ['ui.router', 'ngFileUpload'])
		.config(function($stateProvider, $urlRouterProvider){
             
             $urlRouterProvider.otherwise('/');
             
			$stateProvider
				.state('signUp', {
				url: "/signup",
				templateUrl: "app/signup/signup.html",
				controller: "SignupController"		
			})
				.state('editProfile', {
                url: "/edit-profile",
				templateUrl: "app/profile/edit-profile-view.html",
				controller: "EditProfileController"
		     })
                .state('main',{
                    url: "/",
                    templateUrl: "app/main/main.html",
                    controller: "MainController"
             })
                .state('login',{
                    url: "/login",
                    templateUrl: "app/navigation/login.html",
                    controller: "NavigationController"
             })
		})
        /*.run(function($rootScope){
             $rootScope.$on('$stateChangeStart',  function(event, toState, toParams, fromState){ 
                        if(!$rootScope.loggedIn){
                            window.location.hash = '/';
                            event.preventDefault();
                        }
            })
            
        })*/
}());