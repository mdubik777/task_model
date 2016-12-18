angular.module('testFrontend').controller('RightCtrl', function ( $scope, $timeout, $mdSidenav, $log, sessionFactory, projectsFactory, tasksFactory) {

    $scope.taskTitle = '';
    $scope.descriptionTask = '';
    $scope.projectTitle = '';
    $scope.isTaskMode = false;


    $scope.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('right').close()
            .then(function () {
                $log.debug("close RIGHT is done");
            });
    };

    //    CREATE PROJECT

    $scope.createNewProject = function() {
        var createProjectData = {
            Project: {
                title: $scope.projectTitle
            }
        };
        projectsFactory.createProject(createProjectData).then(function(response) {
            projectsFactory.resolveAllProjects();

            $scope.close();
        });
    };

    $scope.$on('createProjectEvent', function(event, args) {
        $scope.projectTitle  = '';
        $scope.isTaskMode = false;
        $scope.createProjectMode = true;
        $mdSidenav('right').open();
    });


    $scope.$on('editProjectEvent', function(event, args) {
        $scope.projectTitle  = args.Project.title;
        $scope.createProjectMode = args.createProjectMode;
        $scope.isTaskMode = false;

        $mdSidenav('right').open().then(function () {
            var inputProject = document.getElementById('projectNameInput');
            inputProject ? inputProject.focus() : null;
        });
    });


    $scope.updateProject = function() {
        var data = {
            Project: {
                id: projectsFactory.getCurrentProjectId(),
                title: $scope.projectTitle
            }
        };
        projectsFactory.updateProject(data).then(function(response) {
            projectsFactory.resolveAllProjects();
            $scope.close();
            $scope.projectTitle = '';
        })

    };



    //          CREATE TASK


    $scope.$on('onCreateTask', function(event, args) {
        $scope.isTaskMode = true;
        $scope.taskTitle = '';
        $scope.descriptionTask = '';
        $mdSidenav('right').open();
    });


    $scope.cleanCreateTaskForm = function() {
        $scope.taskTitle = '';
        $scope.descriptionTask = '';
    };

    $scope.createTask = function() {
        var idCurrent = projectsFactory.getCurrentProjectId();
        var createTaskData = {
            Project: {
                id: idCurrent
            },
            Task: {
                title:   $scope.taskTitle,
                description:  $scope.descriptionTask
            }
        };
        tasksFactory.createTask(createTaskData).then(function(response) {
            projectsFactory.resolveAllProjects();
            $scope.task = response;
            $scope.close();
            $scope.cleanCreateTaskForm();
        });
    };



});

