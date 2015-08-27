(function()
{
    'use strict';

    var getView = function(view){
        return 'src/secure/views/' + view + '.html';
    }

    var module = angular.module('app.secure', ['ngAnimate', 'ngCookies', 'ngResource', 'ngSanitize',
            'ngTouch', 'ngStorage', 'ui.router', 'ui.bootstrap', 'singular.ui','upload.button',
            'lr.upload','angularMoment', 'ui.utils.masks'
        ]
    );

    module.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/app/dashboard');

        $stateProvider.state('app.dashboard', {
            url: '/dashboard',
            menu: 'configuracao'
        });


    }])
        .run(['ui.Session', function(Session){
            Session.setSession(window.APP.session);
            Session.setMenu(window.APP.menu);
        }]);

}());