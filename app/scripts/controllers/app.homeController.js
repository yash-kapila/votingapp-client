(function () {
	'use strict';
    angular.module('voting_app').controller('homeController', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$uibModal', '$state'];

    /**
     *
     */
    function HomeCtrl($scope, $uibModal, $state) {
        var vm = this;
        
        vm.signUp = function() {
            var modalInstance = $uibModal.open({
                templateUrl: require('../../views/app.signUpModal.html'),
                controller: 'signUpModalController',
                controllerAs: 'signUpModalCtrl',
                scope: $scope,
                keyboard: false
            });
            
            modalInstance.result.then(function () {
                $state.go('profile');
            }, function () {
                // No change to modal is dismissed
            });            
        };
        
        vm.login = function(){
            var modalInstance = $uibModal.open({
                templateUrl: require('../../views/app.loginModal.html'),
                controller: 'loginModalController',
                controllerAs: 'loginModalCtrl',
                scope: $scope,
                keyboard: false
            });
            
            modalInstance.result.then(function () {
                $state.go('profile');
            }, function () {
                // No change to modal is dismissed
            });                 
        };
    }
})();