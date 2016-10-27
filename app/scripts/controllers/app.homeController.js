(function () {
	'use strict';
    angular.module('voting_app').controller('homeController', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$uibModal'];

    /**
     *
     */
    function HomeCtrl($scope, $uibModal) {
        var vm = this;
        
        vm.signUp = function() {
            var modalInstance = $uibModal.open({
                templateUrl: require('../../views/app.signUpModal.html'),
                controller: 'signUpModalController',
                controllerAs: 'signUpModalCtrl'
                scope: $scope,
                keyboard: false
            });
            
            modalInstance.result.then(function () {
                // Change state after successful login
            }, function () {
                // No change to grid if Cancelled from Modal
            });            
        };
    }
})();