angular.module('testFrontend').factory('tasksFactory', function($http, $q, sessionFactory) {
    var tasks = [];
    var showNoTasks;

    return {
        setShowNoTasks: function(_boolean) {
            showNoTasks = _boolean
        },

        getShowNoTasks: function() {
            return showNoTasks;
        },



        //RESOLVE ALL TASKS

        resolveAllTasks: function(_params) {
            _params.session  = sessionFactory.getSession();
            var self = this;
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'https://api-test-task.decodeapps.io/tasks',
                params: _params
            }).success(function(response) {
                    self.tasks = response;
                    deferred.resolve( self.tasks)
                }).error(function(response) {
                    deferred.reject('error')
                });
            return deferred.promise
        },

        //GET ALL TASKS

        getAllTasks: function() {
            return this.tasks;
        },

        //GET ALL TASKS

        setAllTasks: function(_tasks) {
            this.projects = _tasks;
        },

        //CREATE TASK

        createTask: function(_TaskData) {
            _TaskData.session = sessionFactory.getSession();
            var task = null;
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'https://api-test-task.decodeapps.io/tasks/task',
                data: _TaskData
            }).success(function(response) {
                    deferred.resolve(response)
                }).error(function(response) {
                    deferred.reject('error')
                });
            return deferred.promise
        }
//
//        //RESOLVE  TASK
//
//        resolveTask: function(_params) {
//        _params.session =  sessionFactory.getSession();
//
//            var deferred = $q.defer();
//            $http({
//                method: 'GET',
//                url: 'https://api-test-task.decodeapps.io/tasks/task',
//                params: _params
//            }).success(function(response) {
//                    deferred.resolve(response)
//                }).error(function(response) {
//                    deferred.reject('error')
//                });
//            return deferred.promise
//        }
    }
});
