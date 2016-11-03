(function () {
	'use strict';
    angular.module('voting_app').controller('homeController', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$uibModal', '$state', 'staticData'];

    /**
     *
     */
    function HomeCtrl($scope, $uibModal, $state, staticData) {
        var vm = this;
        
        vm.signUp = function() {
            var modalInstance = $uibModal.open({
                templateUrl: require('../../views/app.signUpModal.html'),
                controller: 'signUpModalController',
                controllerAs: 'signUpModalCtrl',
                scope: $scope
            });
            
            modalInstance.result.then(function (response) {
                $state.go('profile', {username: response.data.username, userid: response.data.id});
            }, function () {
                // No change to modal is dismissed
            });            
        };
        
        vm.login = function(){
            var modalInstance = $uibModal.open({
                templateUrl: require('../../views/app.loginModal.html'),
                controller: 'loginModalController',
                controllerAs: 'loginModalCtrl',
                scope: $scope
            });
            
            modalInstance.result.then(function (response) {
                $state.go('profile', {username: response.data.username, userid: response.data.id});
            }, function () {
                // No change to modal is dismissed
            });                 
        };
        
        var initialize = function(){
            vm.appVersion = staticData.appVersion;
        };
        
        initialize();
    }
})();