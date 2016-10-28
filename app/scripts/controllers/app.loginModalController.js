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
                $uibModalInstance.close();
            }, function(response){
                console.log("FAILURE: " + response);
            });
        };
    }
})();