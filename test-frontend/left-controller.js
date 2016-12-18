angular.module('testFrontend').controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log, $http, sessionFactory, projectsFactory, tasksFactory) {

    $scope.selected = 0;
    $scope.account = sessionFactory.getCurrentAccount();

    //     FETCH PROJECTS

    $scope.projects = [];
    projectsFactory.resolveAllProjects().then(function(response) {
        $scope.projects = response;
        if (response.length) {
            $scope.onShowEmptyProject(response[0].Project.id, response[0].Project.task_count);
        }
    });

    $scope.onShowEmptyProject = function(projectId, taskCount) {
        // если таски = 0 передаем true, иначе false
        tasksFactory.setShowNoTasks( Number(taskCount) == 0);
        projectsFactory.setCurrentProjectId(projectId);
    };


    $scope.$watch(function () {
            return projectsFactory.getAllProjects();
        },
        function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.projects = newValue;
                $scope.selected = 0;
                $scope.onShowEmptyProject(newValue[0].Project.id, newValue[0].Project.task_count);

            }

    });

    $scope.onOpenProjectPanel = function() {
        $scope.$parent.$broadcast('createProjectEvent');
        $mdSidenav('right').open();
    };


    //      FETCH PROJECT

    $scope.getTasks = function(_project, _index) {
        $scope.selected = _index;
        projectsFactory.setCurrentProjectId(_project.id);

        if (Number(_project.task_count) != 0) {
            var dataGetTasks = {
                project_id: Number(_project.id),
                condition_keywords: '',
                paging_size: 4,
                paging_offset: 10
            };
            tasksFactory.resolveAllTasks(dataGetTasks);
            tasksFactory.setShowNoTasks(false);
        } else {
            tasksFactory.setShowNoTasks(true);
        }
    };




    //FETCH TASKS
//        $scope.tasks = [];
//        var idCurrent = projectsFactory.getCurrentProjectId();
//                var dataGetTasks = {
//
//                    project_id: idCurrent,
//                    condition_keywords: 'Some keywords',
//                    paging_size: 5,
//                    paging_offset: 5
//                };
//
//
//        tasksFactory.resolveAllTasks(dataGetTasks).then(function(response) {
//                    $scope.tasks = response.tasks
//       });



//            $scope.close = function () {
//                // Component lookup should always be available since we are not using `ng-if`
//                $mdSidenav('left').close()
//                    .then(function () {
//                        $log.debug("close LEFT is done");
//                    });
//
//            };
});