/**
 * 
 */
grapeControllers.controller("ncaaController", [
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

			console.log("initiating ncaa controller...");

		    // ******************************
		    // Internal methods
		    // ******************************

		    /**
		     * Search for states... use $timeout to simulate
		     * remote dataservice call.
		     */
		    $scope.querySearch = function querySearch (query) {
		      var results = query ? $scope.ncaaTeams.filter( $scope.createFilterFor(query) ) : $scope.ncaaTeams,
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
				var adjHomeOff = $scope.selectedHomeTeam.adjO;
				var adjHomeDef = $scope.selectedHomeTeam.adjD;

				var adjAwayOff = $scope.selectedAwayTeam.adjO;;
				var adjAwayDef = $scope.selectedAwayTeam.adjD;
				
				var pythExp = 10.25;
				var adjHomePyth = Math.pow(adjHomeOff, pythExp) / (Math.pow(adjHomeOff, pythExp) + Math.pow(adjHomeDef, pythExp));
				var adjAwayPyth = Math.pow(adjAwayOff, pythExp) / (Math.pow(adjAwayOff, pythExp) + Math.pow(adjAwayDef, pythExp));
				
				var adjPos = (($scope.selectedAwayTeam.adjT / $scope.avgPos) * ($scope.selectedHomeTeam.adjT / $scope.avgPos)) * $scope.avgPos;
				
				var awayScoreD = (((adjAwayOff / $scope.avgOff) * (adjHomeDef / $scope.avgOff)) * ($scope.avgOff) * (adjPos / 100));
				$scope.awayScore = awayScoreD.toFixed(0);
				var homeScoreD = (((adjHomeOff / $scope.avgOff) * (adjAwayDef / $scope.avgOff)) * ($scope.avgOff) * (adjPos / 100));
				$scope.homeScore = homeScoreD.toFixed(0);
				$scope.homeScore = Number($scope.homeScore) + 3;
				
				var decSpread = Math.abs(awayScoreD - (homeScoreD +3));
				
				if ($scope.homeScore > $scope.awayScore) {
					$scope.spread = "-" + (Math.round(decSpread * 2) / 2).toFixed(1);
					$scope.winner = $scope.selectedHomeTeam;
				} else {
					$scope.spread = "-" + (Math.round(decSpread * 2) / 2).toFixed(1);
					$scope.winner = $scope.selectedAwayTeam;
				}
				
				
				$scope.overUnder = (awayScoreD + (homeScoreD+3)).toFixed(2);
				
				$scope.showOdds = true;
				
				$scope.getWinChance(decSpread);
		    	
		    	if($scope.homeWinChance > $scope.awayWinChance) {
			    	document.getElementById('cardRight').style.background = "linear-gradient(to left, #4CAF50 " + $scope.homeWinChance + ", rgba(158,158,158,.9) " + $scope.homeWinChance + ")";
			    	document.getElementById('cardLeft').style.background = "linear-gradient(to right, #F44336 " + $scope.awayWinChance + ", rgba(158,158,158,.9) " + $scope.awayWinChance + ")";
		    	} else {
			    	document.getElementById('cardRight').style.background = "linear-gradient(to left, #F44336 " + $scope.homeWinChance + ", rgba(158,158,158,.9) " + $scope.homeWinChance + ")";
			    	document.getElementById('cardLeft').style.background = "linear-gradient(to right, #4CAF50 " + $scope.awayWinChance + ", rgba(158,158,158,.9) " + $scope.awayWinChance + ")";
		    	}
		    }
		    
		    $scope.getWinChance = function(spread) {
		    	if (spread >= 0 && spread < 0.1){
		    		 winChance = 50;
		    	} else if (spread  >= 0.1 && spread < 0.4) {
		    		 winChance = 51;
		    	} else if (spread  >= 0.4 && spread < 0.7) {
		    		 winChance = 52;
		    	} else if (spread  >= 0.7 && spread < 1) {
		    		 winChance = 53;
		    	} else if (spread  >= 1.0 && spread < 1.25) {
		    		 winChance = 54;
		    	} else if (spread  >= 1.25 && spread < 1.5) {
		    		 winChance = 55;
	    		} else if (spread  >= 1.5 && spread < 1.75) {
		    		 winChance = 56;
	    		} else if (spread  >= 1.75 && spread < 2) {
		    		 winChance = 57;
		    	} else if (spread  >= 2 && spread < 2.25) {
		    		 winChance = 58;
		    	} else if (spread  >= 2.25 && spread < 2.5) {
		    		 winChance = 59;
		    	} else if (spread  >= 2.5 && spread < 2.75) {
		    		 winChance = 60;
		    	} else if (spread  >= 2.75 && spread < 3) {
		    		 winChance = 61;
		    	} else if (spread  >= 3 && spread < 3.25) {
		    		 winChance = 62;
		    	} else if (spread  >= 3.25 && spread < 3.5) {
		    		 winChance = 63;
		    	} else if (spread  >= 3.5 && spread < 3.75) {
		    		 winChance = 64;
		    	} else if (spread  >= 3.75 && spread < 4) {
		    		 winChance = 65;
		    	} else if (spread  >= 4 && spread < 4.33) {
		    		 winChance = 66;
		    	} else if (spread  >= 4.33 && spread < 4.67) {
		    		 winChance = 67;
		    	} else if (spread  >= 4.67 && spread < 5) {
		    		 winChance = 68;
		    	} else if (spread  >= 5 && spread < 5.33) {
		    		 winChance = 69
		    	} else if (spread  >= 5.33 && spread < 5.67) {
		    		 winChance = 70;
		    	} else if (spread  >= 5.67 && spread < 6) {
		    		 winChance = 71;
		    	} else if (spread  >= 6 && spread < 6.33) {
		    		 winChance = 72;
		    	} else if (spread  >= 6.33 && spread < 6.67) {
		    		 winChance = 73;
		    	} else if (spread  >= 6.67 && spread < 7) {
		    		 winChance = 74;
		    	} else if (spread  >= 7 && spread < 7.33) {
		    		 winChance = 75;
		    	} else if (spread  >= 7.33 && spread < 7.67) {
		    		 winChance = 76;
		    	} else if (spread  >= 7.67 && spread < 8) {
		    		 winChance = 77;
		    	} else if (spread  >= 8 && spread < 8.33) {
		    		 winChance = 78;
		    	} else if (spread  >= 8.33 && spread < 8.67) {
		    		 winChance = 79
		    	} else if (spread  >= 8.67 && spread < 9) {
		    		 winChance = 80;
		    	} else if (spread  >= 9 && spread < 9.5) {
		    		 winChance = 81;
		    	} else if (spread  >= 9.5 && spread < 10) {
		    		 winChance = 82;
		    	} else if (spread  >= 10 && spread < 10.5) {
		    		 winChance = 83;
		    	} else if (spread  >= 10.5 && spread < 11) {
		    		 winChance = 84;
		    	} else if (spread  >= 11 && spread < 11.5) {
		    		 winChance = 85;
		    	} else if (spread  >= 11.5 && spread < 12) {
		    		 winChance = 86;
		    	} else if (spread  >= 12 && spread < 12.5) {
		    		 winChance = 87;
		    	} else if (spread  >= 12.5 && spread < 13) {
		    		 winChance = 88;
		    	} else if (spread  >= 13 && spread < 14) {
		    		 winChance = 89;
		    	} else if (spread  >= 14 && spread < 15) {
		    		 winChance = 90;
		    	} else if (spread  >= 15 && spread < 16) {
		    		 winChance = 91;
		    	} else if (spread  >= 16 && spread < 17) {
		    		 winChance = 92;
		    	} else if (spread  >= 17 && spread < 18) {
		    		 winChance = 93;
		    	} else if (spread  >= 18 && spread < 19) {
		    		 winChance = 94;
		    	} else if (spread  >= 19 && spread < 20) {
		    		 winChance = 95;
		    	} else if (spread  >= 20 && spread < 21) {
		    		 winChance = 96;
		    	} else if (spread  >= 21 && spread < 22) {
		    		 winChance = 97;
		    	} else if (spread  >= 22 && spread < 23) {
		    		 winChance = 98;
		    	} else if(spread  >= 23 && spread < 24) {
		    		 winChance = 99;
		    	} else if(spread >=24) {
		    		winChance = 100;
		    	}
		    	
		    	
		    	if ($scope.homeScore > $scope.awayScore) {
		    		$scope.homeWinChance = winChance + "%";
		    		$scope.awayWinChance = (100 - winChance) + "%";;
		    	} else {
		    		$scope.awayWinChance = winChance + "%";
		    		$scope.homeWinChance = (100 - winChance) + "%";;
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
			    		matchup.spread = matchup.awayTeam + " " + $scope.spread;
			    	} else if(matchup.homeScore > matchup.awayScore){
			    		matchup.spread = matchup.homeTeam + " " + $scope.spread;
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
		    
		    $scope.runTodaysNcaaGames = function() {
		    	for (var i = 0; i < $scope.todaysNcaaGames.length; i++) {
		    		var game = $scope.todaysNcaaGames[i];
		    		
		    		var tempAway;
		    		for (var j = 0; j < $scope.ncaaTeamReferenceList.length; j++) {
		    			if(game.awayTeam === $scope.ncaaTeamReferenceList[j].scheduleTeamName){
		    				tempAway = $scope.ncaaTeamReferenceList[j];
		    			}
		    		}
		    		for (var x = 0; x < $scope.ncaaTeams.length; x++) {
		    			if(tempAway.kenPomTeamName === $scope.ncaaTeams[x].team){
		    				$scope.selectedAwayTeam = $scope.ncaaTeams[x];
		    			}
		    		}
		    		
		    		var tempHome
		    		for (var z = 0; z < $scope.ncaaTeamReferenceList.length; z++) {
		    			if(game.homeTeam === $scope.ncaaTeamReferenceList[z].scheduleTeamName){
		    				tempHome = $scope.ncaaTeamReferenceList[z];
		    			}
		    		}
		    		for (var y = 0; y < $scope.ncaaTeams.length; y++) {
		    			if(tempHome.kenPomTeamName === $scope.ncaaTeams[y].team){
		    				$scope.selectedHomeTeam = $scope.ncaaTeams[y];
		    			}
		    		}
		    		
		    		$scope.calculateOdds();
		    		$scope.addToMatchups(game.time);
		    		if(i == ($scope.todaysNcaaGames.length - 1)){
		    			$scope.selectedAwayTeamChange($scope.selectedAwayTeam);
		    			$scope.selectedHomeTeamChange($scope.selectedHomeTeam);
		    		}
		    	}
		    }
		    
		    $scope.viewMatchup = function(m) {
		    	for (var j = 0; j < $scope.ncaaTeams.length; j++) {
	    			if(m.awayTeam === $scope.ncaaTeams[j].team){
	    				$scope.selectedAwayTeam = $scope.ncaaTeams[j];
	    			}
	    		}
	    		for (var z = 0; z < $scope.ncaaTeams.length; z++) {
	    			if(m.homeTeam === $scope.ncaaTeams[z].team){
	    				$scope.selectedHomeTeam = $scope.ncaaTeams[z];
	    			}
	    		}
	    		
	    		$scope.calculateOdds();
	    		$window.scrollTo(0, 0);
		    }
		    
		    $scope.calculateAverages = function() {
		    	if(sharedUtilService.getAvgNcaaPoss() == null || sharedUtilService.getAvgNcaaOff() == null){
		    		var avgPosSum = 0;
			    	var avgOffSum = 0;
				    for (var i = 0; i < $scope.ncaaTeams.length; i++) {
					    var team = $scope.ncaaTeams[i];
					    avgPosSum += team.adjT;
					    avgOffSum += team.adjO;
					}
			    	
			    	$scope.avgPos = avgPosSum / $scope.ncaaTeams.length;
			    	$scope.avgOff = avgOffSum / $scope.ncaaTeams.length;
			    	
			    	$scope.showOdds = false;
			    	
			    	sharedUtilService.setAvgNcaaPoss($scope.avgPos);
			    	sharedUtilService.setAvgNcaaOff($scope.avgOff);
		    	} else {
		    		$scope.avgPos = sharedUtilService.getAvgNcaaPoss();
			    	$scope.avgOff = sharedUtilService.getAvgNcaaOff();
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
			
			$scope.getNcaaTableData = function(){
				if(sharedUtilService.getNcaaTable() == null){
						grapeRestfulDataService.getNcaaTableData() 
						.success(function(response) {
							console.log("successfully retrieved ncaa table data "); 
							if(response.result==="SUCCESS"){
								$scope.ncaaTeams = response.ncaaTable;
								sharedUtilService.setNcaaTable(response.ncaaTable);

								$scope.calculateAverages();
							}
						})
						.error(function(error) {
							console.log(error);
						});
					} else {
						$scope.ncaaTeams = sharedUtilService.getNcaaTable();
						$scope.calculateAverages();
					}
				};
				
			$scope.getNcaaScheduleData = function(){
				if(typeof $scope.todaysNcaaGames === 'undefined'){
					grapeRestfulDataService.getNcaaScheduleData() 
					.success(function(response) {
						console.log("successfully retrieved ncaa schedule data "); 
						$scope.todaysNcaaGames = response.ncaaSchedule;
						sharedUtilService.setTodaysNcaaGames($scope.todaysNcaaGames);
					})
					.error(function(error) {
						console.log(error);
					});
				} else {
					$scope.todaysNcaaGames = sharedUtilService.getTodaysNcaaGames();
				}
			};
			
			$scope.getNcaaTeamTableData = function(){
				if(typeof $scope.todaysNcaaGames === 'undefined'){
					grapeRestfulDataService.getNcaaTeamTableData() 
					.success(function(response) {
						console.log("successfully retrieved ncaa team table data "); 
						$scope.ncaaTeamReferenceList = response.ncaaTeamTable;
						sharedUtilService.setNcaaTeamReferenceList($scope.ncaaTeamReferenceList);
					})
					.error(function(error) {
						console.log(error);
					});
				} else {
					$scope.ncaaTeamReferenceList = sharedUtilService.getNcaaTeamReferenceList();
				}
			};
			
			$scope.getNcaaInjuries = function(){
				if(typeof $scope.inuriesList === 'undefined'){
					grapeRestfulDataService.getNcaaInjuries() 
					.success(function(response) {
						console.log("successfully retrieved ncaa injuries data "); 
						$scope.injuriesList = response.ncaaInjuries;
					})
					.error(function(error) {
						console.log(error);
					});
				} else {
					$scope.injuriesList = sharedUtilService.getNcaaInjuries();
				}
			};
			
//			$scope.getTodaysNcaaGames = function(allGames) {
//				var today = new Date();
//				today.setHours(0,0,0,0);
//				var tomorrow = new Date();
//				tomorrow.setDate(tomorrow.getDate() + 1);
//				tomorrow.setHours(0,0,0,0);
//				
//				$scope.todaysNcaaGames = [];
//				
//				for (var i = 0; i < allGames.length; i++) {
//					var game = allGames[i];
//					var gDate = new Date(game.date+'T12:00:00Z');
//					
//					if(today < gDate && tomorrow > gDate) {
//						$scope.todaysNcaaGames.push(game);
//					}
//				}
//				
//				sharedUtilService.setTodaysNcaaGames($scope.todaysNcaaGames);
//				console.log(sharedUtilService.getTodaysNcaaGames());
//			};		
					
			$scope.showAwayInjuries = function(ev) {
				
			    $mdDialog.show({
				  locals:{injuries: $scope.injuriesList, teamName: $scope.selectedAwayTeam.team},
			      controller: DialogController,
			      templateUrl: 'resources/pages/common/injuries.html',
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
				      templateUrl: 'resources/pages/common/injuries.html',
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
				
				
				$scope.simulateQuery = false;
				$scope.isDisabled    = false;
		
				$scope.getNcaaTableData();
				$scope.getNcaaScheduleData();
				$scope.getNcaaTeamTableData();
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