angular.module('testFrontend').controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log, $http, sessionFactory, projectsFactory, tasksFactory) {
//            $scope.toggleLeft = buildDelayedToggler('left');

//        /**
//             * Supplies a function that will continue to operate until the
//             * time is up.
//             */
//            function debounce(func, wait, context) {
//                var timer;
//
//                return function debounced() {
//                    var context = $scope,
//                        args = Array.prototype.slice.call(arguments);
//                    $timeout.cancel(timer);
//                    timer = $timeout(function() {
//                        timer = undefined;
//                        func.apply(context, args);
//                    }, wait || 10);
//                };
//            }
//            /**
//             * Build handler to open/close a SideNav; when animation finishes
//             * report completion in console
//             */
//            function buildDelayedToggler(navID) {
//                return debounce(function() {
//                    // Component lookup should always be available since we are not using `ng-if`
//                    $mdSidenav(navID)
//                        .toggle()
//                        .then(function () {
//                            $log.debug("toggle " + navID + " is done");
//                        });
//                }, 200);
//            }

            function buildToggler(navID) {
                return function() {
                    // Component lookup should always be available since we are not using `ng-if`
                    $mdSidenav(navID)
                        .toggle()
                        .then(function () {
                            $log.debug("toggle " + navID + " is done");
                        });
                }
            }
//        projectsFactory.resolveAllProjects().then(function(response) {
//            $scope.projects = response;
//            if (response.length) {
//                $scope.onShowEmptyProject(response[0].Project.id, response[0].Project.task_count);
//            }
//
//
//        });
//
//        $scope.onShowEmptyProject = function(projectId, taskCount) {
//            Number(taskCount) == 0 ?  $scope.showNoTasks = true :  $scope.showNoTasks = false;
//            projectsFactory.setCurrentProjectId(projectId);
//        };
//        $scope.noShowTask = tasksFactory.getShowNoTasks();
    $scope.toggleRight = buildToggler('right');

    $scope.isOpenRight = function(){
        return $mdSidenav('right').isOpen();
    };

    $scope.showNoTasks = tasksFactory.getShowNoTasks();

    $scope.$watch(function () {
            return tasksFactory.getShowNoTasks();
        },
        function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.showNoTasks = newValue;
            }
        });


    $scope.onOpenTaskPanel = function() {
        $scope.$broadcast('onCreateTask');
    };


//        $scope.tasks = tasksFactory.getAllTasks();
//        projectsFactory.resolveAllTasks().then(function(response) {
//            $scope.tasks = response;
//        });



        //FETCH TASK


//    $scope.fetchTask = function() {
//        var _data = {
//
//            task_id: 2506
//        };
//
//        projectsFactory.resolveTask(_data).then(function(response) {
//            $scope.task = response;
//        });
//
//
//
//    };

    //EDIT PROJECT
    $scope.editProject = function(){
        var  data = {
            project_id: projectsFactory.getCurrentProjectId()
        };
        projectsFactory.resolveProject(data).then(function(response){
            response.createProjectMode = false;
            $scope.$broadcast('editProjectEvent', response);
        });
    };


    // DELETE PROJECT
    $scope.deleteProject = function() {
        var id = projectsFactory.getCurrentProjectId();
        var data = {
            project_id: id
        };
        projectsFactory.deleteProject(data).then(function(response) {
            projectsFactory.resolveAllProjects();
        });
    }

});








