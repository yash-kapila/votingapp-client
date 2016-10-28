angular.module('voting_app', ['ui.router', 'ngCookies', 'ui.bootstrap']);

angular.module('voting_app').config(StateConfig);

StateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

/**
 * State Configuration. This is the base configuration. Each module should have its own configuration
 * @param $stateProvider
 * @constructor
 */
function StateConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when("", "/auth");
    $stateProvider
        .state('auth', {
            url: '/auth',          
            controller: 'authController',
            controllerAs: 'authCtrl'
        })
        .state('home', {
            url: '/home',          
            templateUrl: require('../views/app.homePage.html'),
            controller: 'homeController',
            controllerAs: 'homeCtrl'
        })        
        .state('profile', {
            url: '/profile',          
            templateUrl: require('../views/app.profilePage.html'),
            controller: 'profileController',
            controllerAs: 'profileCtrl'
        });              
}