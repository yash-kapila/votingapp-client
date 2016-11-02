(function () {
    'use strict';
    angular.module('voting_app').factory('postLogin', PostLogin);

    PostLogin.$inject = ['$http'];

    /**
     *
     */

    function PostLogin($http) {

        var obj = {};

        obj.submitPoll = function(pollInfo){
            return $http.post('/api/v1/savepoll', 
                {
                    params : pollInfo,
                    headers : {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    }
                }
            );
        };
        
        obj.getMyPolls = function(user){
            return $http.get('/api/v1/mypolls', 
                {
                    params : user,
                    headers : {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    }
                }
            );
        };        

        obj.signOut = function(record){
            return $http.post('/api/v1/logout', 
                {
                    headers : {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    }
                }
            );
        };
        
        obj.deletePoll = function(id){
            return $http.delete('/api/v1/removepoll', 
                {
                    params : id,
                    headers : {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    }
                }
            );
        };

        return obj;
    }
        
})();