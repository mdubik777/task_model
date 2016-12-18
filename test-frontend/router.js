angular.module('testFrontend')

    .config(function($stateProvider, $urlRouterProvider){

        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "/home.html",
                controller: "AppCtrl",
                resolve: {
                    init: function(sessionFactory) {
                        return sessionFactory.cookiesSession();
                    }
                }
            });

        $urlRouterProvider.otherwise("/home");
    });