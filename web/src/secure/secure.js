(function()
{
    'use strict';

    angular.module(
        'app.secure',
        [
            'ngAnimate'
            ,'ngCookies'
            ,'ngResource'
            ,'ngSanitize'
            ,'ngTouch'
            ,'ngStorage'
            ,'ui.router'
            ,'ui.bootstrap'
            ,'singular.ui'
            ,'upload.button'
            ,'lr.upload'
            ,'angularMoment'
            ,'ui.utils.masks'
            ,'ngMaterial'
            ,'md.data.table'
            ,'singular.admin'
            /*@modules*/
        ]
    )
        .config(
            [
                '$stateProvider',
                '$urlRouterProvider',
                configFn
            ]
        )
        .run(
            [
                'ui.Session',
                runFn
            ]
        );

    /**
     * Definição da função de configuração do módulo.
     *
     * @param $stateProvider
     * @param $urlRouterProvider
     */
    function configFn(
        $stateProvider,
        $urlRouterProvider
    ) {

        $urlRouterProvider.otherwise('/app/dashboard');

        $stateProvider.state('app.dashboard', {
            url: '/dashboard',
            menu: 'configuracao'
        });

    }

    /**
     * Definição da função de execução.
     *
     * @param Session
     */
    function runFn(
        Session
    ){
        Session.setSession(window.APP.session);
        Session.setMenu(window.APP.menu);
    }

    /**
     * Retorna a view a ser renderizada para um state na raiz do módulo.
     *
     * @param view
     * @returns {string}
     */
    function getView(view){
        return 'src/secure/views/' + view + '.html';
    }

}());