'use strict';
angular.module('itsiTemplate')
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('root', {
                views: {
                    'header': {
                        controller: 'headerController as vm',
                        templateUrl: 'feature/header/header.tpl.html'
                    }
                },
                abstract: true
            })
            .state('root.home', {
                url: '/',
                views: {
                    'content@': {
                        controller: 'homeController as vm',
                        templateUrl: 'feature/home/home.tpl.html'
                    }
                }
            });

        // Set the app in html5 mode and not hashbang mode.
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise('/');
    }]);