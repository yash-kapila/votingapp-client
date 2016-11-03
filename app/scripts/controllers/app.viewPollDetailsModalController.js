(function () {
	'use strict';
    angular.module('voting_app').controller('viewPollDetailsModalController', ViewPollDetailsModalCtrl);

    ViewPollDetailsModalCtrl.$inject = ['$scope', '$uibModalInstance', 'preLogin', 'pollOptions'];

    /**
     *
     */
    function ViewPollDetailsModalCtrl($scope, $uibModalInstance, preLogin, pollOptions) {
        var vm = this;
        
        var initialize = function(){
            vm.pollQuestion = pollOptions.question;
            vm.pollValues = [], vm.pollVotes = [];
            vm.chartOptions = {
                legend: {display: true}
            };
            vm.noVotesCast = false;

            for(var i in pollOptions.option){
                vm.pollValues.push(pollOptions.option[i].value);
                
                if(pollOptions.option[i].votes == null || pollOptions.option[i].votes == undefined){
                    vm.pollVotes.push(0);
                }
                else{
                    vm.pollVotes.push(pollOptions.option[i].votes);
                }
            };
            
            var filter = vm.pollVotes.filter(function(item){
                return item !== 0;    
            });
            
            if(filter.length === 0){
                vm.noVotesCast = true;    
            }
        };

        initialize();
    }
})();