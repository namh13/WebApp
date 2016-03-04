(function(){
	angular.module('WebDev', ['ui.router', 'ngFileUpload'])
		.config(function($stateProvider, $urlRouterProvider){
             
             $urlRouterProvider.otherwise('/');
             
			$stateProvider
				.state('signUp', {
                resolve: {
                  "revisar": function($rootScope){
                      if($rootScope.loggedIn){
                          window.location.hash = 'main';
                      }
                  }  
                },
				url: "/signup",
				templateUrl: "app/signup/signup.html",
				controller: "SignupController"		
			})
				.state('editProfile', {
                resolve: {
                  "check": function($rootScope){
                      if(!$rootScope.loggedIn){
                          window.location.hash = 'login';
                      }
                  }  
                },
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