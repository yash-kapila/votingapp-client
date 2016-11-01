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
            var record = {
                username: vm.username,
                password: vm.password
            };

            preLogin.loginUser(record).then(function(response){
                console.log("SUCCESS: " + response);
                vm.loginFailure = false;
                $uibModalInstance.close(response);
            }, function(response){
                console.log("FAILURE: " + response);
                vm.loginFailure = true;
                vm.loginFailureMsg = response.data;
            });
        };

        var initialize = function(){
            vm.loginFailure = false;
            vm.loginFailureMsg = '';
        };

        initialize();
    }
})();