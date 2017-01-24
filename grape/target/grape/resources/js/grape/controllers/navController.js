//individual controllers separated by functionality

grapeControllers.controller("navController", [                                    
		'$scope',
		'$rootScope',
		'$location',
		'$cookieStore',
		'alertService',
		'sharedUtilService',
		function($scope, $rootScope, $location, $cookieStore, alertService, sharedUtilService) {

			console.log("initiating nav controller...");
			
			$scope.activePage = 'home'; 
			$scope.setActivePage = function(page) {
				$scope.activePage = page;
			}
			
			$scope.navigateToPage = function(page) {
				$scope.activePage = page;
				$location.path('/' + page).search();
			}
			

		} ])