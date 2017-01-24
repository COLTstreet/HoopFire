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
	var todaysGames = [];
	var injuriesList = [];

	return {

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
		
		setTodaysGames : function(objectToSet) {
			todaysGames = objectToSet;
		},

		getTodaysGames : function() {
			return todaysGames;
		},
		
		setInjuriesList : function(objectToSet) {
			injuriesList = objectToSet;
		},

		getInjuriesList : function() {
			return injuriesList;
		}

	}
});

sharedServices.factory('grapeRestfulDataService', function($http) {

    var factory = {
    		getNbaTableData : function() {
                  return $http({
                        url : 'http://localhost:8080/grape/getNbaTableData',
                        method : 'GET',
                        paramSerializer : '$httpParamSerializerJQLike',
                        headers : {
                        	'Content-Type' : 'application/x-www-form-urlencoded'
                        }
                  })
    		},
    
		    getNbaScheduleData : function() {
		    	return $http({
		              url : 'http://localhost:8080/grape/getNbaScheduleData',
		              method : 'GET',
		              paramSerializer : '$httpParamSerializerJQLike',
		              headers : {
		              	'Content-Type' : 'application/x-www-form-urlencoded'
                      }
                })
		    },
		    
		    getNbaInjuries : function() {
                return $http({
                      url : 'http://localhost:8080/grape/getNbaInjuries',
                      method : 'GET',
                      paramSerializer : '$httpParamSerializerJQLike',
                      headers : {
                      	'Content-Type' : 'application/x-www-form-urlencoded'
                      }
                })
		    },
		    
		    getNcaaTableData : function() {
                return $http({
                      url : 'http://localhost:8080/grape/getNcaaTableData',
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
