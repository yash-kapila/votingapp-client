(function () {
	'use strict';
    angular.module('voting_app').controller('authController', AuthController);

    AuthController.$inject = ['$scope', '$state', '$cookies'];

    /**
     *
     */
    function AuthController($scope, $state, $cookies) {    	
    	var authStatus = $cookies.get('voting_jwt');
    	if(authStatus)
        	$state.go('profile');
        else
        	$state.go('home');
    }
})();