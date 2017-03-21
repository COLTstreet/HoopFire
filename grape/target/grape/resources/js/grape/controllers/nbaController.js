/**
 * 
 */
grapeControllers.controller("nbaController", [
		'$scope',
		'$http',
		'$routeParams',
		'$rootScope',
		'$location',
		'$interval',
		'$window',
		'alertService',
		'$cookieStore',
		'$mdDialog',
		'sharedUtilService',
		'grapeRestfulDataService',
		function($scope, $http, $routeParams, $rootScope, $location, $interval, $window,
				alertService, $cookieStore, $mdDialog, sharedUtilService, grapeRestfulDataService) {

			console.log("initiating nba controller...");

		    // ******************************
		    // Internal methods
		    // ******************************

		    /**
		     * Search for states... use $timeout to simulate
		     * remote dataservice call.
		     */
		    $scope.querySearch = function querySearch (query) {
		      var results = query ? $scope.nbaTeams.filter( $scope.createFilterFor(query) ) : $scope.nbaTeams,
		          deferred;
		      if ($scope.simulateQuery) {
		        deferred = $q.defer();
		        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
		        return deferred.promise;
		      } else {
		        return results;
		      }
		    };

		    $scope.searchHomeTextChange = function searchHomeTextChange(text) {
		      
		    };

		    $scope.selectedHomeTeamChange = function selectedHomeItemChange(item) {
		    	sharedUtilService.setHomeTeam(item);
		    	$scope.showHomeCard = true;
		    	$scope.selectedHomeTeam = sharedUtilService.getHomeTeam();
		    	if(typeof $scope.selectedHomeTeam !== 'undefined' && typeof $scope.selectedAwayTeam !== 'undefined' &&
		    			$scope.selectedHomeTeam != null && $scope.selectedAwayTeam != null){
		    		$scope.calculateOdds();
		    	}
		    };
		    
		    $scope.searchAwayTextChange = function searchAwayTextChange(text) {
		    	
			      
		    };

		    $scope.selectedAwayTeamChange = function selectedAwayItemChange(item) {
		    	sharedUtilService.setAwayTeam(item);
		    	$scope.showAwayCard = true;
		    	$scope.selectedAwayTeam = sharedUtilService.getAwayTeam();
		    	if(typeof $scope.selectedHomeTeam !== 'undefined' && typeof $scope.selectedAwayTeam !== 'undefined' &&
		    		$scope.selectedHomeTeam != null && $scope.selectedAwayTeam != null){
		    		$scope.calculateOdds();
		    	}
		    };
		    
		    $scope.calculateOdds = function(){
		    	var adv = .010;
				var adjHomeOff = $scope.selectedHomeTeam.offRtg + $scope.selectedHomeTeam.offRtg * adv;
				var adjHomeDef = $scope.selectedHomeTeam.defRtg - $scope.selectedHomeTeam.defRtg * adv;

				var adjAwayOff = $scope.selectedAwayTeam.offRtg - $scope.selectedAwayTeam.offRtg * adv;
				var adjAwayDef = $scope.selectedAwayTeam.defRtg + $scope.selectedAwayTeam.defRtg * adv;
				
				var pythExp = 14.0;
				var adjHomePyth = Math.pow(adjHomeOff, pythExp) / (Math.pow(adjHomeOff, pythExp) + Math.pow(adjHomeDef, pythExp));
				var adjAwayPyth = Math.pow(adjAwayOff, pythExp) / (Math.pow(adjAwayOff, pythExp) + Math.pow(adjAwayDef, pythExp));
				
				var homeWinChance = (adjHomePyth - adjHomePyth * adjAwayPyth) / (adjHomePyth + adjAwayPyth - 2 * adjHomePyth * adjAwayPyth);
				$scope.homeWinChance = homeWinChance * 100;
				$scope.awayWinChance = (1 - homeWinChance) * 100;
				$scope.homeWinChance = $scope.homeWinChance.toFixed(0) + "%";
				$scope.awayWinChance = $scope.awayWinChance.toFixed(0) + "%";
				
				var adjPos = (($scope.selectedAwayTeam.pace / $scope.avgPos) * ($scope.selectedHomeTeam.pace / $scope.avgPos)) * $scope.avgPos;
				
				var awayScoreD = (((adjAwayOff / $scope.avgOff) * (adjHomeDef / $scope.avgOff)) * ($scope.avgOff) * (adjPos / 100));
				$scope.awayScore = awayScoreD.toFixed(0);
				var homeScoreD = (((adjHomeOff / $scope.avgOff) * (adjAwayDef / $scope.avgOff)) * ($scope.avgOff) * (adjPos / 100));
				$scope.homeScore = homeScoreD.toFixed(0);
				
				if ($scope.homeScore > $scope.awayScore) {
					$scope.spread = "-" + Math.abs($scope.homeScore - $scope.awayScore);
					$scope.winner = $scope.selectedHomeTeam;
				} else {
					$scope.spread = "-" + Math.abs($scope.awayScore - $scope.homeScore);
					$scope.winner = $scope.selectedAwayTeam;
				}
				
				$scope.overUnder = (awayScoreD + homeScoreD).toFixed(2);
				
				$scope.showOdds = true;
		    	
		    	if($scope.homeWinChance > $scope.awayWinChance) {
			    	document.getElementById('cardRight').style.background = "linear-gradient(to left, #4CAF50 " + $scope.homeWinChance + ", rgba(158,158,158,.9) " + $scope.homeWinChance + ")";
			    	document.getElementById('cardLeft').style.background = "linear-gradient(to right, #F44336 " + $scope.awayWinChance + ", rgba(158,158,158,.9) " + $scope.awayWinChance + ")";
		    	} else {
			    	document.getElementById('cardRight').style.background = "linear-gradient(to left, #F44336 " + $scope.homeWinChance + ", rgba(158,158,158,.9) " + $scope.homeWinChance + ")";
			    	document.getElementById('cardLeft').style.background = "linear-gradient(to right, #4CAF50 " + $scope.awayWinChance + ", rgba(158,158,158,.9) " + $scope.awayWinChance + ")";
		    	}
		    }
		    
		    $scope.addToMatchups = function(t) {
		    	if($scope.selectedAwayTeam.team != $scope.selectedHomeTeam.team){
		    		var matchup = {};
			    	matchup.awayTeam = $scope.selectedAwayTeam.team;
			    	matchup.awayWinChance = $scope.awayWinChance;
			    	matchup.awayScore = Number($scope.awayScore);
			    	matchup.homeTeam = $scope.selectedHomeTeam.team;
			    	matchup.homeWinChance = $scope.homeWinChance;
			    	matchup.homeScore = Number($scope.homeScore);
			    	matchup.totalScore = (Number(matchup.awayScore) + Number(matchup.homeScore));
			    	
			    	if(matchup.awayScore > matchup.homeScore){
			    		matchup.spread = matchup.awayTeam + " -" + Math.abs((matchup.awayScore - matchup.homeScore));
			    	} else if(matchup.homeScore > matchup.awayScore){
			    		matchup.spread = matchup.homeTeam + " -" + Math.abs((matchup.homeScore - matchup.awayScore));
			    	} else if(matchup.awayScore == matchup.homeScore){
			    		matchup.spread = "EVEN";
			    	}
			    	
			    	if(typeof t === 'undefined' || t === null){
			    		matchup.time = "User Created";
			    	} else {
			    		matchup.time = t;
			    	}
			    	
			    	$scope.matchups.push(matchup);
			    	
			    	sharedUtilService.setMatchupList($scope.matchups);
		    	}
		    	$scope.matchups = sharedUtilService.getMatchupList();
		    }
		    
		    $scope.runTodaysNbaGames = function() {
		    	for (var i = 0; i < $scope.todaysNbaGames.length; i++) {
		    		var game = $scope.todaysNbaGames[i];
		    		
		    		for (var j = 0; j < $scope.nbaTeams.length; j++) {
		    			if(game.awayTeam === $scope.nbaTeams[j].team){
		    				$scope.selectedAwayTeam = $scope.nbaTeams[j];
		    			}
		    		}
		    		for (var z = 0; z < $scope.nbaTeams.length; z++) {
		    			if(game.homeTeam === $scope.nbaTeams[z].team){
		    				$scope.selectedHomeTeam = $scope.nbaTeams[z];
		    			}
		    		}
		    		
		    		$scope.calculateOdds();
		    		$scope.addToMatchups(game.time);
		    		if(i == ($scope.todaysNbaGames.length - 1)){
		    			$scope.selectedAwayTeamChange($scope.selectedAwayTeam);
		    			$scope.selectedHomeTeamChange($scope.selectedHomeTeam);
		    		}
		    	}
		    }
		    
		    $scope.viewMatchup = function(m) {
		    	for (var j = 0; j < $scope.nbaTeams.length; j++) {
	    			if(m.awayTeam === $scope.nbaTeams[j].team){
	    				$scope.selectedAwayTeam = $scope.nbaTeams[j];
	    			}
	    		}
	    		for (var z = 0; z < $scope.nbaTeams.length; z++) {
	    			if(m.homeTeam === $scope.nbaTeams[z].team){
	    				$scope.selectedHomeTeam = $scope.nbaTeams[z];
	    			}
	    		}
	    		
	    		$scope.calculateOdds();
	    		$window.scrollTo(0, 0);
		    }
		    
		    $scope.calculateAverages = function() {
		    	if(sharedUtilService.getAvgPoss() == null || sharedUtilService.getAvgOff() == null){
		    		var avgPosSum = 0;
			    	var avgOffSum = 0;
			    	for (var i = 0; i < $scope.nbaTeams.length; i++) {
					    var team = $scope.nbaTeams[i];
					    avgPosSum += team.pace;
					    avgOffSum += team.offRtg;
					}
			    	
			    	$scope.avgPos = avgPosSum / $scope.nbaTeams.length;
			    	$scope.avgOff = avgOffSum / $scope.nbaTeams.length;
			    	
			    	$scope.showOdds = false;
			    	
			    	sharedUtilService.setAvgPoss($scope.avgPos);
			    	sharedUtilService.setAvgOff($scope.avgOff);
		    	} else {
		    		$scope.avgPos = sharedUtilService.getAvgPoss();
			    	$scope.avgOff = sharedUtilService.getAvgOff();
		    	}
		    	
			      
		    };
		    
		    function getCssValuePrefix() {
		        var rtrnVal = '';//default to standard syntax
		        var prefixes = ['-o-', '-ms-', '-moz-', '-webkit-'];

		        // Create a temporary DOM object for testing
		        var dom = document.createElement('div');

		        for (var i = 0; i < prefixes.length; i++)
		        {
		            // Attempt to set the style
		            dom.style.background = prefixes[i] + 'linear-gradient(#000000, #ffffff)';

		            // Detect if the style was successfully set
		            if (dom.style.background)
		            {
		                rtrnVal = prefixes[i];
		            }
		        }

		        dom = null;
		        delete dom;

		        return rtrnVal;
		    }

		    /**
		     * Create filter function for a query string
		     */
		    $scope.createFilterFor = function createFilterFor(query) {
		      var lowercaseQuery = angular.lowercase(query);

		      return function filterFn(item) {
		        return (item.team.toLowerCase().indexOf(lowercaseQuery) === 0);
		      };

		    };

			//page nagivator
			$scope.navigateToPage = function(page) {
				
				$location.path('/' + page);
			};
			
			$scope.getNbaTableData = function(){
				if(sharedUtilService.getNbaTable() == null){
						grapeRestfulDataService.getNbaTableData() 
						.success(function(response) {
							console.log("successfully retrieved nba table data "); 
							if(response.result==="SUCCESS"){
								$scope.nbaTeams = response.nbaTable;
								sharedUtilService.setNbaTable(response.nbaTable);

								$scope.calculateAverages();
							}
						})
						.error(function(error) {
							console.log(error);
						});
					} else {
						$scope.nbaTeams = sharedUtilService.getNbaTable();
						$scope.calculateAverages();
					}
				};
				
			$scope.getNbaScheduleData = function(){
				if(typeof $scope.todaysNbaGames === 'undefined'){
					grapeRestfulDataService.getNbaScheduleData() 
					.success(function(response) {
						console.log("successfully retrieved nba schedule data "); 
						$scope.getTodaysNbaGames(response.nbaSchedule);
					})
					.error(function(error) {
						console.log(error);
					});
				} else {
					$scope.todaysNbaGames = sharedUtilService.getTodaysNbaGames();
				}
			};
			
			$scope.getNbaInjuries = function(){
				if(typeof $scope.inuriesList === 'undefined'){
					grapeRestfulDataService.getNbaInjuries() 
					.success(function(response) {
						console.log("successfully retrieved nba injuries data "); 
						$scope.injuriesList = response.nbaInjuries;
						$scope.loading = false;
					})
					.error(function(error) {
						console.log(error);
					});
				} else {
					$scope.injuriesList = sharedUtilService.getNbaInjuries();
					$scope.loading = false;
				}
			};
			
			$scope.getTodaysNbaGames = function(allGames) {
				var today = new Date();
				today.setHours(0,0,0,0);
				var tomorrow = new Date();
				tomorrow.setDate(tomorrow.getDate() + 1);
				tomorrow.setHours(0,0,0,0);
				
				$scope.todaysNbaGames = [];
				
				for (var i = 0; i < allGames.length; i++) {
					var game = allGames[i];
					var gDate = new Date(game.date+'T12:00:00Z');
					
					if(today < gDate && tomorrow > gDate) {
						$scope.todaysNbaGames.push(game);
					}
				}
				
				sharedUtilService.setTodaysNbaGames($scope.todaysNbaGames);
			};		
					
			$scope.showAwayInjuries = function(ev) {
				
			    $mdDialog.show({
				  locals:{injuries: $scope.injuriesList, teamName: $scope.selectedAwayTeam.team},
			      controller: DialogController,
			      templateUrl: '/resources/pages/common/injuries.html',
			      parent: angular.element(document.body),
			      targetEvent: ev,
			      clickOutsideToClose: true
			    })
			    .then(function(answer) {
			    	
			    }, function() {
			    	
			    });
			    
			  };
			  
			  $scope.showHomeInjuries = function(ev) {
					
				    $mdDialog.show({
					  locals:{injuries: $scope.injuriesList, teamName: $scope.selectedHomeTeam.team},
				      controller: DialogController,
				      templateUrl: '/resources/pages/common/injuries.html',
				      parent: angular.element(document.body),
				      targetEvent: ev,
				      clickOutsideToClose: true
				    })
				    .then(function(answer) {
				    	
				    }, function() {
				    	
				    });
				    
				  };
			  
			  function DialogController($scope, $mdDialog, injuries, teamName) {
				  	$scope.injuriesList = injuries;
				  	$scope.teamName = teamName;
				  
				    $scope.hide = function() {
				      $mdDialog.hide();
				    };

				    $scope.cancel = function() {
				      $mdDialog.cancel();
				    };

				    $scope.answer = function(answer) {
				      $mdDialog.hide(answer);
				    };
				    
				    $scope.filterInjuries = function() {
				    	$scope.filteredInjuries = [];
				    	for (var i = 0; i < $scope.injuriesList.length; i++) {
				    		var profile = $scope.injuriesList[i];
					    	if(profile.team === $scope.teamName){
				    			$scope.filteredInjuries.push(profile);
				    		}
				    	}
				    }
				    

				  	
				  	$scope.filterInjuries();
				  };
				
			$scope.removeMatchup = function(matchup){
				if($scope.matchups.indexOf(matchup) != -1){
					var index = $scope.matchups.indexOf(matchup);
					$scope.matchups.splice(index, "1");

					sharedUtilService.setMatchupList($scope.matchups); 
				}
			}

			$scope.initialize = function() {
				if (angular.isDefined($scope.dataReload)) {
					$interval.cancel($scope.dataReload);
				};
				$scope.loading = true;
				
				
				$scope.simulateQuery = false;
				$scope.isDisabled    = false;
		
				$scope.getNbaTableData();
				$scope.getNbaScheduleData();
				$scope.getNbaInjuries();
				$scope.matchups = [];
				sharedUtilService.setMatchupList($scope.matchups); 
				
				$scope.query = {
				    order: 'awayTeam',
				    limit: 5,
				    page: 1
				  };

			};

			$scope.initialize();

		} ])