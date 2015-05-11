(function()
{
    'use strict';

    var getView = function(view){
        return 'src/login/views/' + view + '.html';
    }

    var module = angular.module('app.login', ['ngAnimate', 'ngCookies', 'ngResource', 'ngSanitize',
            'ngTouch', 'ngStorage', 'ui.router', 'ui.bootstrap', 'singular.ui'
        ]
    );

    module.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

        $stateProvider.state('login', {
            url: '/login',
            controller: 'login.LoginCtrl',
            templateUrl: getView('login')
        })
            .state('recover', {
                url: '/recuperarSenha',
                templateUrl: getView('senha')
            })
            .state('registro',{
                url: '/registrar',
                templateUrl: getView('registro')
            });

    }]);

}());