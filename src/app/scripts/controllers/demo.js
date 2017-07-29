'use strict';
angular.module('app')
  .controller('DemoCtrl', function ($scope, fsDock, $q) {

    $scope.show = function() {

	    fsDock.show(
	    {
	    	template: '<div layout="row" layout-align="start center"><span flex>{{message}}</span><md-button ng-click="hide()">Hide</md-button></div>',
	    	title: 'Dock Title',
	    	controller: ['$scope','message',function($scope, message) {
	    		$scope.message = message;
	    	}],
	    	resolve: {
	    		message: function() {
	    			return $q(function(resolve) {
	    				resolve('How do you like me now?');
	    			});
	    		}
	    	}

	    });

    }
});
