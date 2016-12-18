
angular.module('testFrontend').factory('sessionFactory', function($q, $http, $cookieStore){

    var account = null;
//    var sessionId = '585070af-a5e8-4ff1-b6e8-5ffcac1f0644';
//    var sessionId = '5856cb77-64e8-4351-a8d9-3038ac1f0644'; //Maria Hernandez
    var sessionId;
    return {

        cookiesSession: function() {
            var x = 10;
            var cookiesSession = $cookieStore.get('session');
            if(cookiesSession) {
                sessionId = cookiesSession;
                return this.checkSession(sessionId);
            } else {
                return this.signUp();
            }

        },

        getAccount: function(){
            var url = 'https://api-test-task.decodeapps.io/account' + '?session=' + sessionId;
            return $http({
                method: 'GET',
                url: url
            })
                .success(function(data){
                    account = data.Account;
                })
                .error(function() {
                });
        },

        signUp: function() {
            var deferred = $q.defer();
            var self = this;
            $http({
                method: 'GET',
                url: 'https:api-test-task.decodeapps.io/signup'
            })
                .success(function(data){
                    sessionId = data.session;
                    $cookieStore.put('session', data.session);
                    deferred.resolve(self.getAccount());
                })
                .error(function() {
                    deferred.reject('error');
                });
            return deferred.promise;
        },

        get(){
           return account;
        },

        getCurrentAccount: function() {
            return account;
        },

        checkSession: function(_sessionId) {
            var deferred = $q.defer();
            var self = this;
            $http({
                method: 'GET',
                url: 'https://api-test-task.decodeapps.io/session' + '?session=' + sessionId
            })
                .success(function(data){

                    deferred.resolve(self.getAccount());
                })
                .error(function() {
                    deferred.resolve(self.signUp());
                });
            return deferred.promise
        },

        getSession: function() {
            return sessionId;
        }

    }
});