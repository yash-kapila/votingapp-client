(function () {
	'use strict';
    angular.module('voting_app').controller('profileController', ProfileCtrl);

    ProfileCtrl.$inject = ['$scope', '$state', '$stateParams', '$cookies', 'postLogin', '$uibModal'];

    /**
     *
     */
    function ProfileCtrl($scope, $state, $stateParams, $cookies, postLogin, $uibModal) {
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
            var pollInfo = {
                username: $stateParams.username,
                id: $stateParams.userid,
                question: vm.pollName,
                options: vm.pollOptions
            };
            
            postLogin.submitPoll(pollInfo).then(function(response){
                // poll saved successfully
                vm.pollURL = response.data.url;
                vm.pollCreated = true;
                vm.newPoll = false;
                vm.myPolls = false;
            }, function(response){
                // error while saving poll
                console.log("IN FAILURE");
            });
        };

        vm.retrievePolls = function(){
            var user = {
                username: $stateParams.username
            };            
            postLogin.getMyPolls(user).then(function(response){
                // polls successfully fetched
                vm.retrievedPolls = response.data.polls;
            }, function(response){
                // error while fetching polls    
            });
        };

        vm.newPollTab = function(){
            vm.newPoll = true; 
            vm.myPolls = false; 
            vm.pollCreated = false;
            vm.pollNotCreated = false;
        };
        
        vm.myPollsTab = function(){
            vm.newPoll = false; 
            vm.myPolls = true; 
            vm.pollCreated = false;
            vm.pollNotCreated = false;
            vm.retrievePolls();
        };

        vm.viewPollDetails = function(options){
            console.log(JSON.stringify(options));
            var modalInstance = $uibModal.open({
                templateUrl: require('../../views/app.viewPollDetails.html'),
                controller: 'viewPollDetailsModalController',
                controllerAs: 'viewPollDetailsModalCtrl',
                scope: $scope,
                keyboard: false,
                resolve: {
                    pollOptions: function() {
                        return angular.copy(options);
                    }
                }
            });
        };

        vm.deletePoll = function(options){
            var pollID = {
                _id: options._id
            };
            
            postLogin.deletePoll(pollID).then(function(response){
                // poll deleted successfully - refresh list of polls
                vm.retrievePolls();
            }, function(response){
                // poll wasn't deleted
            });
        };

        vm.openPoll = function(){
            $state.go('polls', { url: vm.pollName });
        };

        var initialize = function(){
            vm.newPoll = true;
            vm.myPolls = false;

            vm.pollName = '';
            vm.pollOptions = [
                {
                    value: '',
                    votes: 0
                },
                {
                    value: '',
                    votes: 0
                }
            ];
            vm.retrievedPolls = [];
        };

        initialize();
    }
})();