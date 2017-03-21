/**
 * This is the service layer of the sysmon app. contains service methods and
 * functions used by the sysmon app.
 */
"use strict";

var sharedServices = angular.module('sharedServices', [ 'ngMaterial',
		'ngResource' ]);

sharedServices.factory('sharedUtilService', function() {

	var homeTeam;
	var awayTeam;
	var nbaTable;
	var ncaaTable;
	var avgPos;
	var avgOff;
	var avgNcaaPos;
	var avgNcaaOff;
	var matchupList = [];
	var todaysNbaGames = [];
	var todaysNcaaGames = [];
	var injuriesList = [];;
	var ncaaTeamReferenceList = [];
	var eastTeamOne;
	var westTeamOne;
	var southTeamOne;
	var midwestTeamOne;

	return {
		
		setEastTeamOne : function(objectToSet) {
			eastTeamOne = objectToSet;
		},
		
		getEastTeamOne : function(objectToSet) {
			return eastTeamOne;
		},
		
		setWestTeamOne : function(objectToSet) {
			westTeamOne = objectToSet;
		},
		
		getWestTeamOne : function(objectToSet) {
			return westTeamOne;
		},
		
		setSouthTeamOne : function(objectToSet) {
			southTeamOne = objectToSet;
		},
		
		getSouthTeamOne : function(objectToSet) {
			return southTeamOne;
		},
		
		setMidwestTeamOne : function(objectToSet) {
			midwestTeamOne = objectToSet;
		},
		
		getMidwestTeamOne : function(objectToSet) {
			return midwestTeamOne;
		},

		setNbaTable : function(objectToSet) {
			nbaTable = objectToSet;
		},

		getNbaTable : function() {
			return nbaTable;
		},
		
		setNcaaTable : function(objectToSet) {
			ncaaTable = objectToSet;
		},

		getNcaaTable : function() {
			return ncaaTable;
		},
		
		setHomeTeam : function(objectToSet) {
			homeTeam = objectToSet;
		},

		getHomeTeam : function() {
			return homeTeam;
		},
		
		setAwayTeam : function(objectToSet) {
			awayTeam = objectToSet;
		},

		getAwayTeam : function() {
			return awayTeam;
		},
		
		setAvgPoss : function(objectToSet) {
			avgPos = objectToSet;
		},

		getAvgPoss : function() {
			return avgPos;
		},
		
		setAvgOff : function(objectToSet) {
			avgOff = objectToSet;
		},

		getAvgOff : function() {
			return avgOff;
		},
		
		setAvgNcaaPoss : function(objectToSet) {
			avgNcaaPos = objectToSet;
		},

		getAvgNcaaPoss : function() {
			return avgNcaaPos;
		},
		
		setAvgNcaaOff : function(objectToSet) {
			avgNcaaOff = objectToSet;
		},

		getAvgNcaaOff : function() {
			return avgNcaaOff;
		},
		
		setMatchupList : function(objectToSet) {
			matchupList = objectToSet;
		},

		getMatchupList : function() {
			return matchupList;
		},
		
		setTodaysNbaGames : function(objectToSet) {
			todaysNbaGames = objectToSet;
		},

		getTodaysNbaGames : function() {
			return todaysNbaGames;
		},
		
		setTodaysNcaaGames : function(objectToSet) {
			todaysNcaaGames = objectToSet;
		},

		getTodaysNcaaGames : function() {
			return todaysNcaaGames;
		},
		
		setInjuriesList : function(objectToSet) {
			injuriesList = objectToSet;
		},

		getInjuriesList : function() {
			return injuriesList;
		},
		
		setNcaaTeamReferenceList : function(objectToSet) {
			ncaaTeamReferenceList = objectToSet;
		},

		getNcaaTeamReferenceList : function() {
			return ncaaTeamReferenceList;
		}

	}
});

sharedServices.factory('grapeRestfulDataService', function($http) {

    var factory = {
    		getNbaTableData : function() {
                  return $http({
                        url : 'https://hoopfire.herokuapp.com/getNbaTableData',
                        method : 'GET',
                        paramSerializer : '$httpParamSerializerJQLike',
                        headers : {
                        	'Content-Type' : 'application/x-www-form-urlencoded'
                        }
                  })
    		},
    
		    getNbaScheduleData : function() {
		    	return $http({
		              url : 'https://hoopfire.herokuapp.com/getNbaScheduleData',
		              method : 'GET',
		              paramSerializer : '$httpParamSerializerJQLike',
		              headers : {
		              	'Content-Type' : 'application/x-www-form-urlencoded'
                      }
                })
		    },
		    
		    getNcaaScheduleData : function() {
		    	return $http({
		              url : 'https://hoopfire.herokuapp.com/getNcaaScheduleData',
		              method : 'GET',
		              paramSerializer : '$httpParamSerializerJQLike',
		              headers : {
		              	'Content-Type' : 'application/x-www-form-urlencoded'
                      }
                })
		    },
		    
		    getNcaaTeamTableData : function() {
		    	return $http({
		              url : 'https://hoopfire.herokuapp.com/getNcaaTeamTableData',
		              method : 'GET',
		              paramSerializer : '$httpParamSerializerJQLike',
		              headers : {
		              	'Content-Type' : 'application/x-www-form-urlencoded'
                      }
                })
		    },
		    
		    getNbaInjuries : function() {
                return $http({
                      url : 'https://hoopfire.herokuapp.com/getNbaInjuries',
                      method : 'GET',
                      paramSerializer : '$httpParamSerializerJQLike',
                      headers : {
                      	'Content-Type' : 'application/x-www-form-urlencoded'
                      }
                })
		    },
		    
		    getNcaaTableData : function() {
                return $http({
                      url : 'https://hoopfire.herokuapp.com/getNcaaTableData',
                      method : 'GET',
                      paramSerializer : '$httpParamSerializerJQLike',
                      headers : {
                      	'Content-Type' : 'application/x-www-form-urlencoded'
                      }
                })
		    }
    };

    return factory;

});
