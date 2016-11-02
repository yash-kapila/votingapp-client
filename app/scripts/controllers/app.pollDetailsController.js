(function () {
	'use strict';
    angular.module('voting_app').controller('pollDetailsController', PollDetailsController);

    PollDetailsController.$inject = ['$scope', '$stateParams', 'preLogin', '$uibModal'];

    /**
     *
     */
    function PollDetailsController($scope, $stateParams, preLogin, $uibModal) {
        var vm = this;
        
        vm.retrievePolls = function(){
            preLogin.getPollDetails({ url: $stateParams.url }).then(function(response){
                vm.username = response.data.user;
                vm.pollRecord = response.data.poll;

                vm.pollQuestion = vm.pollRecord.polls[0].question;
                vm.pollOptions = vm.pollRecord.polls[0].option;
                vm.showPoll = true;
            }, function(response){
                // inside failure
            });
        };

        vm.pollVote = function(){
            var id = {
                userID: vm.pollRecord._id,
                questionID: vm.pollRecord.polls[0]._id,
                optionID: vm.selectedOption
            };
            
            preLogin.submitVote(id).then(function(response){
                vm.viewPollDetails(response.data.poll);
            }, function(response){
                // inside error
            });
        };

        vm.viewPollDetails = function(options){
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

        var initialize = function(){
            vm.pollRecord = {};
            vm.pollOptions = [];
            vm.showPoll = false;
            vm.retrievePolls();
        };
        
        initialize();
    }
})();