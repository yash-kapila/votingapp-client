(function () {
    'use strict';
    angular.module('voting_app').factory('preLogin', PreLogin);

    PreLogin.$inject = ['$http'];

    /**
     *
     */

    function PreLogin($http) {

        var obj = {};

        obj.signUpUser = function(record){
            return $http.post('/api/signup', 
                {
                    params: record,                    
                    headers : {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    }
                }
            );
        };

        obj.loginUser = function(record){
            return $http.post('/api/login', 
                {
                    params: record,                    
                    headers : {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    }
                }
            );
        };
        
        obj.getPollDetails = function(url){
            return $http.get('/api/getpolldetails', 
                {
                    params: url,                    
                    headers : {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    }
                }
            );
        };

        obj.submitVote = function(id){
            return $http.put('/api/submitvote', 
                {
                    params: id,                    
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