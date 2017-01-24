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
	var avgPos;
	var avgOff;
	var matchupList = [];
	var todaysGames = [];

	return {

		setNbaTable : function(objectToSet) {
			nbaTable = objectToSet;
		},

		getNbaTable : function() {
			return nbaTable;
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
         }
    };

    return factory;

});
