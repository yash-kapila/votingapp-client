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
            vm.loadingSpin = true;
            preLogin.getPollDetails({ url: $stateParams.url }).then(function(response){
                vm.username = response.data.user;
                vm.pollRecord = response.data.poll;

                vm.pollQuestion = vm.pollRecord.polls[0].question;
                vm.pollOptions = vm.pollRecord.polls[0].option;
                vm.showPoll = true;
                vm.loadingSpin = false;
            }, function(response){
                // inside failure
                vm.loadingSpin = false;
            });
        };

        vm.pollVote = function(){
            vm.loadingSpin = true;
            var id = {
                userID: vm.pollRecord._id,
                questionID: vm.pollRecord.polls[0]._id,
                optionID: vm.selectedOption
            };
            
            preLogin.submitVote(id).then(function(response){
                vm.loadingSpin = false;
                vm.viewPollDetails(response.data.poll);
            }, function(response){
                // inside error
                vm.loadingSpin = false;
            });
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

        var initialize = function(){
            vm.loadingSpin = false;
            vm.pollRecord = {};
            vm.pollOptions = [];
            vm.showPoll = false;
            vm.retrievePolls();
        };
        
        initialize();
    }
})();