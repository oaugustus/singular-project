(function()
{
    'use strict';

    var getView = function(view){
        return 'src/secure/views/' + view + '.html';
    }

    var module = angular.module('app.secure', ['ngAnimate', 'ngCookies', 'ngResource', 'ngSanitize',
            'ngTouch', 'ngStorage', 'ui.router', 'ui.bootstrap', 'singular.ui'
        ]
    );

    module.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/app/dashboard');

        $stateProvider.state('app.dashboard', {
            url: '/dashboard'
        });


    }])
        .run(['ui.Session', function(Session){
            Session.setSession(window.APP.session);
            Session.setMenu(window.APP.menu);
        }]);

}());