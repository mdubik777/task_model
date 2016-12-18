angular.module('testFrontend').factory('projectsFactory', function($http, $q, sessionFactory) {
    var currentProjectId = null;
    var projects = [];


    return {


        // CREATE NEW PROJECT

        createProject: function(projectData) {
            projectData.session = sessionFactory.getSession();

            var project = null;
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'https://api-test-task.decodeapps.io/projects/project',
                data: projectData
            }).success(function(response) {
                    deferred.resolve(response)
                }).error(function(response) {
                    deferred.reject('error')
                });
            return deferred.promise
        },
        //RESOLVE ALL PROJECTS

        resolveAllProjects: function() {
            var _data = {
                session: sessionFactory.getSession()
            };
            var deferred = $q.defer();
            var _this = this;
            $http({
                method: 'GET',
                url: 'https://api-test-task.decodeapps.io/projects',
                params: _data
            }).success(function(response) {
                    _this.projects = response.projects;
                    deferred.resolve(_this.projects);

                }).error(function(response) {
                    deferred.reject('error')
                });
            return deferred.promise
        },

        //GET ALL PROJECTS

        getAllProjects: function() {
            return this.projects;
        },

        //SET ALL PROJECTS

        setAllProjects: function(_projects) {
            this.projects = _projects;
        },




        // RESOLVE CURRENT PROJECT

        resolveProject: function(_params) {
            _params.session = sessionFactory.getSession();
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'https://api-test-task.decodeapps.io/projects/project',
                params: _params
            }).success(function(response) {
                    deferred.resolve(response)
                }).error(function(response) {
                    deferred.reject('error')
                });
            return deferred.promise
        },

        // SET CURRENT PROJECTID


        setCurrentProjectId: function(_id) {
            currentProjectId = _id;

        },

        // SEt CURRENT PROJECTID

        getCurrentProjectId: function(){
            return currentProjectId;
        },

        // updateProject

        updateProject: function(_data) {
            _data.session = sessionFactory.getSession();
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'https://api-test-task.decodeapps.io/projects/project',
                data: _data
            }).success(function(response) {
                    deferred.resolve(response)
                }).error(function(response) {
                    deferred.reject('error')
                });
            return deferred.promise
        },


        //DELETE PROJECT


        deleteProject: function(_data) {
            _data.session = sessionFactory.getSession();
            var deferred = $q.defer();
            $http({
                method: 'DELETE',
                url: 'https://api-test-task.decodeapps.io/projects/project',
                params: _data
            }).success(function(response) {
                    deferred.resolve(response)
                }).error(function(response) {
                    deferred.reject('error')
                });
            return deferred.promise
        }
    }
});