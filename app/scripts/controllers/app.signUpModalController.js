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
                $uibModalInstance.close();
            }, function(response){
                console.log("FAILURE: " + response);
            });
        };
    }
})();