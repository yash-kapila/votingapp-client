(function () {
	'use strict';
    angular.module('voting_app').controller('loginModalController', LoginModalCtrl);

    LoginModalCtrl.$inject = ['$scope', '$uibModalInstance', 'preLogin'];

    /**
     *
     */
    function LoginModalCtrl($scope, $uibModalInstance, preLogin) {
        var vm = this;

        vm.login = function(){
            vm.loadingSpin = true;
            var record = {
                username: vm.username,
                password: vm.password
            };

            preLogin.loginUser(record).then(function(response){
                vm.loginFailure = false;
                vm.loadingSpin = false;
                $uibModalInstance.close(response);
            }, function(response){
                console.log("FAILURE: " + response);
                vm.loginFailure = true;
                vm.loadingSpin = false;
                vm.loginFailureMsg = response.data;
            });
        };

        var initialize = function(){
            vm.loadingSpin = false;
            vm.loginFailure = false;
            vm.loginFailureMsg = '';
        };

        initialize();
    }
})();