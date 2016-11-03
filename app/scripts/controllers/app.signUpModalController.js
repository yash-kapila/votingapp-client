(function () {
	'use strict';
    angular.module('voting_app').controller('signUpModalController', SignUpModalCtrl);

    SignUpModalCtrl.$inject = ['$scope', '$uibModalInstance', 'preLogin'];

    /**
     *
     */
    function SignUpModalCtrl($scope, $uibModalInstance, preLogin) {
        var vm = this;

        vm.signUp = function(){
            vm.loadingSpin = true;
            var record = {
                email: vm.email,
                username: vm.username,
                password: vm.password
            };

            preLogin.signUpUser(record).then(function(response){
                vm.loadingSpin = false;
                vm.signupFailure = false;
                $uibModalInstance.close(response);
            }, function(response){
                console.log("FAILURE: " + JSON.stringify(response));
                vm.loadingSpin = false;
                vm.signupFailure = true;
                vm.signupFailureMsg = response.data;
            });
        };
        
        
        var initialize = function(){
            vm.loadingSpin = false;
            vm.signupFailure = false;
            vm.signupFailureMsg = '';
        };
        
        initialize();
    }
})();