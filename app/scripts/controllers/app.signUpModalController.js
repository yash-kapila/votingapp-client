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
            var record = {
                email: vm.email,
                username: vm.username,
                password: vm.password
            };

            preLogin.signUpUser(record).then(function(response){
                console.log("SUCCESS: " + response);
                vm.signupFailure = false;
                $uibModalInstance.close(response);
            }, function(response){
                console.log("FAILURE: " + JSON.stringify(response));
                vm.signupFailure = true;
                vm.signupFailureMsg = response.data;
            });
        };
        
        
        var initialize = function(){
            vm.signupFailure = false;
            vm.signupFailureMsg = '';
        };
        
        initialize();
    }
})();