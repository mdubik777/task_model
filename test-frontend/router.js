angular.module('testFrontend')

    .config(function($stateProvider, $urlRouterProvider){

        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "home/home.html",
                controller: "AppCtrl",
                resolve: {
                    init: function(sessionFactory) {
                        return sessionFactory.getCurrentCookiesSession();
                    }
                }
            });

        $urlRouterProvider.otherwise("/home");
    });