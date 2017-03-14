//declare and load all the resources including controllers and service layers 

"use strict";

var  grapeApp = angular.module('grapeApp', [
	'grapeControllers',
	'ngMaterial',
	'ngRoute',
    'app.services.alertservice',
    'sharedServices',
    'toastr',
    'ngCookies', 
    'angular-jwt',
    'md.data.table'
      
    ]);


//configure the routing logic 

grapeApp.config(function($routeProvider, $locationProvider) {
	
	$routeProvider
	.when('/home', {
		templateUrl: "/resources/pages/home.html",
		controller: "homeController", 
		reloadOnSearch: false
	})
	.when('/nbabb', {
		templateUrl: "/resources/pages/nba.html", 
		controller: "nbaController", 
		reloadOnSearch: false
	})
	.when('/ncaabb', {
		templateUrl: "/resources/pages/ncaa.html", 
		controller: "ncaaController", 
		reloadOnSearch: false
	})
	.otherwise({
		templateUrl: "/resources/pages/home.html", 
		controller: "homeController", 
		reloadOnSearch: false
	})
	
    
    // use the HTML5 History API
$locationProvider.html5Mode(true);
	
	
}); 


grapeApp.config(function($mdThemingProvider) {
	$mdThemingProvider.theme('default')
	    .primaryPalette('cyan')
	    .accentPalette('deep-orange')
	    .warnPalette('red')
	    .backgroundPalette('grey')
	    .dark();
});


grapeApp.run(['$window', '$injector','$cookieStore','$rootScope','$location', function($window,$injector,$cookieStore,$rootScope,$location) {
      
      
      
   $rootScope.$on(
     "$routeChangeStart",
     function( event, next, current ){
         // Update the rendering.
        
          if( $cookieStore.get("isLoggedIn")){
                  var nextPath = $location.path();
                  var lastPage = $cookieStore.get("lastPage");
                  if(nextPath==="/"){
                         nextPath="/home" ; 
                  }
                  
                  else {
                         nextPath=lastPage;
                  }
                $location.path(nextPath).search() ; 
          }
          
          
     }
 );



}]);


