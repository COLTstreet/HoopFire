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
	.when('/marchWest', {
		templateUrl: "/resources/pages/marchWest.html", 
		controller: "marchWestController", 
		reloadOnSearch: false
	})
	.when('/marchEast', {
		templateUrl: "/resources/pages/marchEast.html", 
		controller: "marchEastController", 
		reloadOnSearch: false
	})
	.when('/marchSouth', {
		templateUrl: "/resources/pages/marchSouth.html", 
		controller: "marchSouthController", 
		reloadOnSearch: false
	})
	.when('/marchMidwest', {
		templateUrl: "/resources/pages/marchMidwest.html", 
		controller: "marchMidwestController", 
		reloadOnSearch: false
	})
	.when('/finalFour', {
		templateUrl: "/resources/pages/finalFour.html", 
		controller: "finalFourController", 
		reloadOnSearch: false
	})
	.when('/march', {
		templateUrl: "/resources/pages/march.html", 
		controller: "marchController", 
		reloadOnSearch: false
	})
	.otherwise({
		templateUrl: "/resources/pages/home.html", 
		controller: "homeController", 
		reloadOnSearch: false
	})
	
    
    // use the HTML5 History API
$locationProvider.html5Mode(false);
	
	
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


