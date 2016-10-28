(function () {
    'use strict';
    angular.module('voting_app').factory('postLogin', PostLogin);

    PostLogin.$inject = ['$http'];

    /**
     *
     */

    function PostLogin($http) {

        var obj = {};

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

        return obj;
    }
        
})();