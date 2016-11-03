(function () {
	'use strict';
    angular.module('voting_app').controller('profileController', ProfileCtrl);

    ProfileCtrl.$inject = ['$scope', '$state', '$stateParams', '$cookies', 'postLogin', '$uibModal', 'staticData'];

    /**
     *
     */
    function ProfileCtrl($scope, $state, $stateParams, $cookies, postLogin, $uibModal, staticData) {
        var vm = this;
    
        vm.logout = function(){
            vm.loadingSpin = true;
            postLogin.signOut().then(function(response){
                // on successful logout
                vm.loadingSpin = false;
                $state.go('auth');
            }, function(response){
                vm.loadingSpin = false;
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
            vm.loadingSpin = true;
            var pollInfo = {
                username: $stateParams.username,
                id: $stateParams.userid,
                question: vm.pollName,
                options: vm.pollOptions
            };
            
            postLogin.submitPoll(pollInfo).then(function(response){
                // poll saved successfully
                vm.pollURL = response.data.url;
                vm.loadingSpin = false;
                vm.pollCreated = true;
                vm.newPoll = false;
                vm.myPolls = false;
            }, function(response){
                // error while saving poll
                console.log("IN FAILURE");
                vm.loadingSpin = false;
            });
        };

        vm.retrievePolls = function(){
            vm.loadingSpin = true;
            var user = {
                username: $stateParams.username
            };            
            postLogin.getMyPolls(user).then(function(response){
                vm.retrievedPolls = response.data.polls;
                vm.loadingSpin = false;
            }, function(response){
                // error while fetching polls
                vm.loadingSpin = false;
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
            var modalInstance = $uibModal.open({
                templateUrl: require('../../views/app.viewPollDetails.html'),
                controller: 'viewPollDetailsModalController',
                controllerAs: 'viewPollDetailsModalCtrl',
                scope: $scope,
                resolve: {
                    pollOptions: function() {
                        return angular.copy(options);
                    }
                }
            });
        };

        vm.deletePoll = function(options){
            vm.loadingSpin = true;
            var pollID = {
                _id: options._id
            };
            
            postLogin.deletePoll(pollID).then(function(response){
                // poll deleted successfully - refresh list of polls
                vm.loadingSpin = false;
                vm.retrievePolls();
            }, function(response){
                // poll wasn't deleted
                vm.loadingSpin = false;
            });
        };

        vm.openPoll = function(){
            $state.go('polls', { url: vm.pollName });
        };

        var initialize = function(){
            vm.appVersion = staticData.appVersion;
            vm.loadingSpin = false;
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