/**
 * 
 */
grapeControllers.controller("homeController", [
		'$scope',
		'$http',
		'$routeParams',
		'$rootScope',
		'$location',
		'$interval',
		'alertService',
		'$cookieStore',
		function($scope, $http, $routeParams, $rootScope, $location, $interval,
				alertService, $cookieStore) {

			console.log("initiating home controller...");

			// page nagivator
			$scope.navigateToPage = function(page) {

				$location.path('/' + page);
			};

			$scope.initialize = function() {
				if (angular.isDefined($scope.dataReload)) {
					$interval.cancel($scope.dataReload);
				};
			};

			$scope.initialize();

			$scope.$on('$destroy', function() {
				if ($scope.dataReload)
					console.log("canceling promise ...")
				$interval.cancel($scope.dataReload);
			});

		} ])