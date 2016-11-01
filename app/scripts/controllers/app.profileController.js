(function () {
	'use strict';
    angular.module('voting_app').controller('profileController', ProfileCtrl);

    ProfileCtrl.$inject = ['$scope', '$state', '$stateParams', '$cookies', 'postLogin'];

    /**
     *
     */
    function ProfileCtrl($scope, $state, $stateParams, $cookies, postLogin) {
        var vm = this;
    
        vm.logout = function(){
            postLogin.signOut().then(function(response){
                // on successful logout
                $state.go('auth');
            }, function(response){
                // on unsuccessful logout
            });
        };

        vm.addOptions = function(){
            var id = vm.pollOptions[vm.pollOptions.length-1].id;
            
            var poll = {
                id: ++id,
                value: '',
                count: 0
            };
            
            vm.pollOptions.push(poll);
        };

        vm.submitPoll = function(){
            console.log("submit: " + $stateParams.username);
            var pollInfo = {
                username: $stateParams.username,
                id: $stateParams.userid,
                question: vm.pollName,
                options: vm.pollOptions
            };
            
            postLogin.submitPoll(pollInfo).then(function(response){
                // poll saved successfully
                console.log("IN SUCCESS");
                vm.pollURL = response.data.url;
                vm.pollCreated = true;
                vm.newPoll = false;
                vm.myPolls = false;
            }, function(response){
                // error while saving poll
                console.log("IN FAILURE");
            });
        };

        vm.newPollFunction = function(){
            vm.newPoll = true; 
            vm.myPolls = false; 
            vm.pollCreated = false;
            vm.pollNotCreated = false;
        };
        
        vm.myPollsFunction = function(){
            vm.newPoll = false; 
            vm.myPolls = true; 
            vm.pollCreated = false;
            vm.pollNotCreated = false;
            console.log($stateParams.username);
            var user = {
                username: $stateParams.username
            };
            
            postLogin.getMyPolls(user).then(function(response){
                // polls successfully fetched
            }, function(response){
                // error while fetching polls    
            });
        };        

        var initialize = function(){
            vm.newPoll = true;
            vm.myPolls = false;
            console.log("initialize" + $stateParams.username);
            vm.pollName = '';
            vm.pollOptions = [
                {
                    id: '1',
                    value: '',
                    count: 0
                },
                {
                    id: '2',
                    value: '',
                    count: 0
                }
            ];
        };

        initialize();
    }
})();