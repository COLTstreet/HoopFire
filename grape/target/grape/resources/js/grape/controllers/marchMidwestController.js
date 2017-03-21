/**
 * 
 */
grapeControllers.controller("marchMidwestController", [
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

			console.log("initiating west controller...");

		    // ******************************
		    // Internal methods
		    // ******************************
		    
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
				$scope.homeScore = Number($scope.homeScore);
				
				var decSpread = Math.abs(awayScoreD - (homeScoreD));
				
				if ($scope.homeScore > $scope.awayScore) {
					$scope.spread = "-" + (Math.round(decSpread * 2) / 2).toFixed(1);
					$scope.winner = $scope.selectedHomeTeam;
				} else {
					$scope.spread = "-" + (Math.round(decSpread * 2) / 2).toFixed(1);
					$scope.winner = $scope.selectedAwayTeam;
				}

				$scope.overUnder = (awayScoreD + (homeScoreD)).toFixed(2);
				$scope.getWinChance(decSpread);

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
								$scope.setWestFirstRound();
							}
						})
						.error(function(error) {
							console.log(error);
						});
					} else {
						$scope.ncaaTeams = sharedUtilService.getNcaaTable();
						$scope.calculateAverages();
						$scope.setWestFirstRound();
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
			
			$scope.calculateFirstRound = function() {
				if($scope.oneSeedWest != undefined && $scope.sixteenSeedWest != undefined){
					$scope.selectedHomeTeam = $scope.oneSeedWest;
					$scope.selectedAwayTeam = $scope.sixteenSeedWest;
					$scope.calculateOdds();
					$scope.firstRoundOneTwo = {
							"homeWinChance": $scope.homeWinChance,
							"homeScore": $scope.homeScore,
							"awayWinChance": $scope.awayWinChance,
							"awayScore": $scope.awayScore
					}
				}
				if($scope.eightSeedWest != undefined && $scope.nineSeedWest != undefined){
					$scope.selectedHomeTeam = $scope.eightSeedWest;
					$scope.selectedAwayTeam = $scope.nineSeedWest;
					$scope.calculateOdds();
					$scope.firstRoundThreeFour = {
							"homeWinChance": $scope.homeWinChance,
							"homeScore": $scope.homeScore,
							"awayWinChance": $scope.awayWinChance,
							"awayScore": $scope.awayScore
					}
				}
				if($scope.fiveSeedWest != undefined && $scope.twelveSeedWest != undefined){
					$scope.selectedHomeTeam = $scope.fiveSeedWest;
					$scope.selectedAwayTeam = $scope.twelveSeedWest;
					$scope.calculateOdds();
					$scope.firstRoundFiveSix = {
							"homeWinChance": $scope.homeWinChance,
							"homeScore": $scope.homeScore,
							"awayWinChance": $scope.awayWinChance,
							"awayScore": $scope.awayScore
					}
				}
				if($scope.fourSeedWest != undefined && $scope.thirteenSeedWest != undefined){
					$scope.selectedHomeTeam = $scope.fourSeedWest;
					$scope.selectedAwayTeam = $scope.thirteenSeedWest;
					$scope.calculateOdds();
					$scope.firstRoundSevenEight = {
							"homeWinChance": $scope.homeWinChance,
							"homeScore": $scope.homeScore,
							"awayWinChance": $scope.awayWinChance,
							"awayScore": $scope.awayScore
					}
				}
				if($scope.sixSeedWest != undefined && $scope.elevenSeedWest != undefined){
					$scope.selectedHomeTeam = $scope.sixSeedWest;
					$scope.selectedAwayTeam = $scope.elevenSeedWest;
					$scope.calculateOdds();
					$scope.firstRoundNineTen = {
							"homeWinChance": $scope.homeWinChance,
							"homeScore": $scope.homeScore,
							"awayWinChance": $scope.awayWinChance,
							"awayScore": $scope.awayScore
					}
				}
				if($scope.threeSeedWest != undefined && $scope.fourteenSeedWest != undefined){
					$scope.selectedHomeTeam = $scope.threeSeedWest;
					$scope.selectedAwayTeam = $scope.fourteenSeedWest;
					$scope.calculateOdds();
					$scope.firstRoundElevenTwelve = {
							"homeWinChance": $scope.homeWinChance,
							"homeScore": $scope.homeScore,
							"awayWinChance": $scope.awayWinChance,
							"awayScore": $scope.awayScore
					}
				}
				if($scope.sevenSeedWest != undefined && $scope.tenSeedWest != undefined){
					$scope.selectedHomeTeam = $scope.sevenSeedWest;
					$scope.selectedAwayTeam = $scope.tenSeedWest;
					$scope.calculateOdds();
					$scope.firstRoundThirteenFourteen = {
							"homeWinChance": $scope.homeWinChance,
							"homeScore": $scope.homeScore,
							"awayWinChance": $scope.awayWinChance,
							"awayScore": $scope.awayScore
					}
				}
				if($scope.twoSeedWest != undefined && $scope.fifteenSeedWest != undefined){
					$scope.selectedHomeTeam = $scope.twoSeedWest;
					$scope.selectedAwayTeam = $scope.fifteenSeedWest;
					$scope.calculateOdds();
					$scope.firstRoundFifteenSixteen = {
							"homeWinChance": $scope.homeWinChance,
							"homeScore": $scope.homeScore,
							"awayWinChance": $scope.awayWinChance,
							"awayScore": $scope.awayScore
					}
				}
			}
			
			$scope.setWestFirstRound = function(){
				$scope.fourthRound = [];
				for(var i = 0; i < $scope.ncaaTeams.length; i++){
					var team = $scope.ncaaTeams[i];
					if(team.team == "Kansas"){
						$scope.oneSeedWest = team;
						$scope.oneSeedWest.rank = "1";
					} else if(team.team == "UC Davis"){
						$scope.sixteenSeedWest = team;
						$scope.sixteenSeedWest.rank = "16";
					} else if(team.team == "Miami FL"){
						$scope.eightSeedWest = team;
						$scope.eightSeedWest.rank = "8";
					} else if(team.team == "Michigan St."){
						$scope.nineSeedWest = team;
						$scope.nineSeedWest.rank = "9";
					} else if(team.team == "Iowa St."){
						$scope.fiveSeedWest = team;
						$scope.fiveSeedWest.rank = "5";
					} else if(team.team == "Nevada"){
						$scope.twelveSeedWest = team;
						$scope.twelveSeedWest.rank = "12";
					} else if(team.team == "Purdue"){
						$scope.fourSeedWest = team;
						$scope.fourSeedWest.rank = "4";
					} else if(team.team == "Vermont"){
						$scope.thirteenSeedWest = team;
						$scope.thirteenSeedWest.rank = "13";
					} else if(team.team == "Creighton"){
						$scope.sixSeedWest = team;
						$scope.sixSeedWest.rank = "6";
					} else if(team.team == "Rhode Island"){
						$scope.elevenSeedWest = team;
						$scope.elevenSeedWest.rank = "11";
					} else if(team.team == "Oregon"){
						$scope.threeSeedWest = team;
						$scope.threeSeedWest.rank = "3";
					} else if(team.team == "Iona"){
						$scope.fourteenSeedWest = team;
						$scope.fourteenSeedWest.rank = "14";
					} else if(team.team == "Michigan"){
						$scope.sevenSeedWest = team;
						$scope.sevenSeedWest.rank = "7";
					} else if(team.team == "Oklahoma St."){
						$scope.tenSeedWest = team;
						$scope.tenSeedWest.rank = "10";
					} else if(team.team == "Louisville"){
						$scope.twoSeedWest = team;
						$scope.twoSeedWest.rank = "2";
					} else if(team.team == "Jacksonville St."){
						$scope.fifteenSeedWest = team;
						$scope.fifteenSeedWest.rank = "15";
					}
				}
				$scope.calculateFirstRound();
			}
			
			//SecondRound Functions----------------------------------------------
			
			$scope.setSecondRoundTeamOne = function(team) {
				if(typeof team != "undefined") {
				$scope.secondRoundTeamOne = team;
				$scope.secondRoundTeamOne.rank = team.rank;
				if($scope.secondRoundTeamOne != undefined && $scope.secondRoundTeamTwo != undefined){
					$scope.selectedHomeTeam = $scope.secondRoundTeamOne;
					$scope.selectedAwayTeam = $scope.secondRoundTeamTwo;
					$scope.calculateOdds();
					$scope.secondRoundOneTwo = {
							"homeWinChance": $scope.homeWinChance,
							"homeScore": $scope.homeScore,
							"awayWinChance": $scope.awayWinChance,
							"awayScore": $scope.awayScore
					}
				}
				}
			}
			$scope.setSecondRoundTeamTwo = function(team) {
				if(typeof team != "undefined") {
				$scope.secondRoundTeamTwo = team;
				$scope.secondRoundTeamTwo.rank = team.rank;
				if($scope.secondRoundTeamOne != undefined && $scope.secondRoundTeamTwo != undefined){
					$scope.selectedHomeTeam = $scope.secondRoundTeamOne;
					$scope.selectedAwayTeam = $scope.secondRoundTeamTwo;
					$scope.calculateOdds();
					$scope.secondRoundOneTwo = {
							"homeWinChance": $scope.homeWinChance,
							"homeScore": $scope.homeScore,
							"awayWinChance": $scope.awayWinChance,
							"awayScore": $scope.awayScore
					}
				}
				}
			}
			$scope.setSecondRoundTeamThree = function(team) {
				if(typeof team != "undefined") {
				$scope.secondRoundTeamThree = team;
				$scope.secondRoundTeamThree.rank = team.rank;
				if($scope.secondRoundTeamThree != undefined && $scope.secondRoundTeamFour != undefined){
					$scope.selectedHomeTeam = $scope.secondRoundTeamThree;
					$scope.selectedAwayTeam = $scope.secondRoundTeamFour;
					$scope.calculateOdds();
					$scope.secondRoundThreeFour = {
							"homeWinChance": $scope.homeWinChance,
							"homeScore": $scope.homeScore,
							"awayWinChance": $scope.awayWinChance,
							"awayScore": $scope.awayScore
					}
				}
				}
			}
			$scope.setSecondRoundTeamFour = function(team) {
				if(typeof team != "undefined") {
				$scope.secondRoundTeamFour = team;
				$scope.secondRoundTeamFour.rank = team.rank;
				if($scope.secondRoundTeamThree != undefined && $scope.secondRoundTeamFour != undefined){
					$scope.selectedHomeTeam = $scope.secondRoundTeamThree;
					$scope.selectedAwayTeam = $scope.secondRoundTeamFour;
					$scope.calculateOdds();
					$scope.secondRoundThreeFour = {
							"homeWinChance": $scope.homeWinChance,
							"homeScore": $scope.homeScore,
							"awayWinChance": $scope.awayWinChance,
							"awayScore": $scope.awayScore
					}
				}
				}
			}
			$scope.setSecondRoundTeamFive = function(team) {
				if(typeof team != "undefined") {
				$scope.secondRoundTeamFive = team;
				$scope.secondRoundTeamFive.rank = team.rank;
				if($scope.secondRoundTeamFive != undefined && $scope.secondRoundTeamSix != undefined){
					$scope.selectedHomeTeam = $scope.secondRoundTeamFive;
					$scope.selectedAwayTeam = $scope.secondRoundTeamSix;
					$scope.calculateOdds();
					$scope.secondRoundFiveSix = {
							"homeWinChance": $scope.homeWinChance,
							"homeScore": $scope.homeScore,
							"awayWinChance": $scope.awayWinChance,
							"awayScore": $scope.awayScore
					}
				}
				}
			}
			$scope.setSecondRoundTeamSix = function(team) {
				if(typeof team != "undefined") {
				$scope.secondRoundTeamSix = team;
				$scope.secondRoundTeamSix.rank = team.rank;
				if($scope.secondRoundTeamFive != undefined && $scope.secondRoundTeamSix != undefined){
					$scope.selectedHomeTeam = $scope.secondRoundTeamFive;
					$scope.selectedAwayTeam = $scope.secondRoundTeamSix;
					$scope.calculateOdds();
					$scope.secondRoundFiveSix = {
							"homeWinChance": $scope.homeWinChance,
							"homeScore": $scope.homeScore,
							"awayWinChance": $scope.awayWinChance,
							"awayScore": $scope.awayScore
					}
				}
				}
			}
			$scope.setSecondRoundTeamSeven = function(team) {
				if(typeof team != "undefined") {
				$scope.secondRoundTeamSeven = team;
				$scope.secondRoundTeamSeven.rank = team.rank;
				if($scope.secondRoundTeamSeven != undefined && $scope.secondRoundTeamEight != undefined){
					$scope.selectedHomeTeam = $scope.secondRoundTeamSeven;
					$scope.selectedAwayTeam = $scope.secondRoundTeamEight;
					$scope.calculateOdds();
					$scope.secondRoundSevenEight = {
							"homeWinChance": $scope.homeWinChance,
							"homeScore": $scope.homeScore,
							"awayWinChance": $scope.awayWinChance,
							"awayScore": $scope.awayScore
					}
				}
				}
			}
			$scope.setSecondRoundTeamEight = function(team) {
				if(typeof team != "undefined") {
				$scope.secondRoundTeamEight = team;
				$scope.secondRoundTeamEight.rank = team.rank;
				if($scope.secondRoundTeamSeven != undefined && $scope.secondRoundTeamEight != undefined){
					$scope.selectedHomeTeam = $scope.secondRoundTeamSeven;
					$scope.selectedAwayTeam = $scope.secondRoundTeamEight;
					$scope.calculateOdds();
					$scope.secondRoundSevenEight = {
							"homeWinChance": $scope.homeWinChance,
							"homeScore": $scope.homeScore,
							"awayWinChance": $scope.awayWinChance,
							"awayScore": $scope.awayScore
					}
				}
				}
			}
			
			//ThirdRound Functions----------------------------------------------
			$scope.setThirdRoundTeamOne = function(team) {
				if(typeof team != "undefined") {
				$scope.thirdRoundTeamOne = team;
				$scope.thirdRoundTeamOne.rank = team.rank;
				if($scope.thirdRoundTeamOne != undefined && $scope.thirdRoundTeamTwo != undefined){
					$scope.selectedHomeTeam = $scope.thirdRoundTeamOne;
					$scope.selectedAwayTeam = $scope.thirdRoundTeamTwo;
					$scope.calculateOdds();
					$scope.thirdRoundOneTwo = {
							"homeWinChance": $scope.homeWinChance,
							"homeScore": $scope.homeScore,
							"awayWinChance": $scope.awayWinChance,
							"awayScore": $scope.awayScore
					}
				}
				}
			}
			$scope.setThirdRoundTeamTwo = function(team) {
				if(typeof team != "undefined") {
				$scope.thirdRoundTeamTwo = team;
				$scope.thirdRoundTeamTwo.rank = team.rank;
				if($scope.thirdRoundTeamOne != undefined && $scope.thirdRoundTeamTwo != undefined){
					$scope.selectedHomeTeam = $scope.thirdRoundTeamOne;
					$scope.selectedAwayTeam = $scope.thirdRoundTeamTwo;
					$scope.calculateOdds();
					$scope.thirdRoundOneTwo = {
							"homeWinChance": $scope.homeWinChance,
							"homeScore": $scope.homeScore,
							"awayWinChance": $scope.awayWinChance,
							"awayScore": $scope.awayScore
					}
				}
				}
			}
			$scope.setThirdRoundTeamThree = function(team) {
				if(typeof team != "undefined") {
				$scope.thirdRoundTeamThree = team;
				$scope.thirdRoundTeamThree.rank = team.rank;
				if($scope.thirdRoundTeamThree != undefined && $scope.thirdRoundTeamFour != undefined){
					$scope.selectedHomeTeam = $scope.thirdRoundTeamThree;
					$scope.selectedAwayTeam = $scope.thirdRoundTeamFour;
					$scope.calculateOdds();
					$scope.thirdRoundThreeFour = {
							"homeWinChance": $scope.homeWinChance,
							"homeScore": $scope.homeScore,
							"awayWinChance": $scope.awayWinChance,
							"awayScore": $scope.awayScore
					}
				}
				}
			}
			$scope.setThirdRoundTeamFour = function(team) {
				if(typeof team != "undefined") {
				$scope.thirdRoundTeamFour = team;
				$scope.thirdRoundTeamFour.rank = team.rank;
				if($scope.thirdRoundTeamThree != undefined && $scope.thirdRoundTeamFour != undefined){
					$scope.selectedHomeTeam = $scope.thirdRoundTeamThree;
					$scope.selectedAwayTeam = $scope.thirdRoundTeamFour;
					$scope.calculateOdds();
					$scope.thirdRoundThreeFour = {
							"homeWinChance": $scope.homeWinChance,
							"homeScore": $scope.homeScore,
							"awayWinChance": $scope.awayWinChance,
							"awayScore": $scope.awayScore
					}
				}
				}
			}
			
			//FourthRound Functions----------------------------------------------
			$scope.setFourthRoundTeamOne = function(team) {
				if(typeof team != "undefined") {
				$scope.fourthRoundTeamOne = team;
				$scope.fourthRoundTeamOne.rank = team.rank;
				if($scope.fourthRoundTeamOne != undefined && $scope.fourthRoundTeamTwo != undefined){
					$scope.selectedHomeTeam = $scope.fourthRoundTeamOne;
					$scope.selectedAwayTeam = $scope.fourthRoundTeamTwo;
					$scope.calculateOdds();
					$scope.fourthRoundOneTwo = {
							"homeWinChance": $scope.homeWinChance,
							"homeScore": $scope.homeScore,
							"awayWinChance": $scope.awayWinChance,
							"awayScore": $scope.awayScore
					}
				}
				}
			}
			$scope.setFourthRoundTeamTwo = function(team) {
				if(typeof team != "undefined") {
				$scope.fourthRoundTeamTwo = team;
				$scope.fourthRoundTeamTwo.rank = team.rank;
				if($scope.fourthRoundTeamOne != undefined && $scope.fourthRoundTeamTwo != undefined){
					$scope.selectedHomeTeam = $scope.fourthRoundTeamOne;
					$scope.selectedAwayTeam = $scope.fourthRoundTeamTwo;
					$scope.calculateOdds();
					$scope.fourthRoundOneTwo = {
							"homeWinChance": $scope.homeWinChance,
							"homeScore": $scope.homeScore,
							"awayWinChance": $scope.awayWinChance,
							"awayScore": $scope.awayScore
					}
				}
				}
			}
			
			//FifthRound functions-------------------------------------------------------
			$scope.setFifthRoundTeamOne = function(team) {
				if(typeof team != "undefined") {
					$scope.fifthRoundTeamOne = team;
					$scope.fifthRoundTeamOne.rank = team.rank;
					sharedUtilService.setMidwestTeamOne($scope.fifthRoundTeamOne);
				}
			}

			$scope.initialize = function() {
				if (angular.isDefined($scope.dataReload)) {
					$interval.cancel($scope.dataReload);
				};
				
				
				
				
				$scope.simulateQuery = false;
				$scope.isDisabled    = false;
		
				$scope.getNcaaTableData();
				$scope.getNcaaTeamTableData();
				$scope.matchups = [];
				sharedUtilService.setMatchupList($scope.matchups); 

				$scope.contentHeight = $window.innerHeight + "px";
				document.getElementById("content").style.height = $scope.contentHeight;
				$scope.$watch('contentHeight', function() {
					document.getElementById("content").style.height = $scope.contentHeight;
			    });
			};

			$scope.initialize();

		} ])