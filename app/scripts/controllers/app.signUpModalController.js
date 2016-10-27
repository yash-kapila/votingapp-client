(function () {
	'use strict';
    angular.module('voting_app').controller('signUpModalController', SignUpModalCtrl);

    SignUpModalCtrl.$inject = ['$scope', '$uibModalInstance'];

    /**
     *
     */
    function SignUpModalCtrl($scope, $uibModalInstance) {
        var vm = this;
        vm.signUp = function(){
              
        };
    }
})();