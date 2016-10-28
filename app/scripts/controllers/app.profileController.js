(function () {
	'use strict';
    angular.module('voting_app').controller('profileController', ProfileCtrl);

    ProfileCtrl.$inject = ['$scope', '$state', '$cookies', 'postLogin'];

    /**
     *
     */
    function ProfileCtrl($scope, $state, $cookies, postLogin) {
        var vm = this;
    
        vm.logout = function(){
            postLogin.signOut().then(function(response){
                // on successful logout
                $state.go('auth');
            }, function(response){
                // on unsuccessful logout
            });
        };

        var initialize = function(){
            
        };

        initialize();
    }
})();