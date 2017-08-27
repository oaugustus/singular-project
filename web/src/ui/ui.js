(function()
{
    'use strict';

    /**
     * Módulo responsável pela renderização e gerenciamento da interface do sistema.
     *
     * @author Otávio Fernandes <otavio@neton.com.br>
     */
    angular.module(
        'singular.ui',
        [
            'toaster',
            'angular-loading-bar',
            'ngSweetAlert'
        ]
    )
        // definição de constantes de interface
        .constant('UI', {
            url: "",
            appName: 'Singular',
            appVersion: '2.0',
            navbarHeaderColor: 'deep-orange',
            headerColor: 'bg-white-only',
            navbarColor: 'bg-white',
            headerFixed: true,
            titleBarColor: 'deep-orange',
            primaryButtonColor: 'deep-orange',
            secondaryButtonColor: '',
            asideFixed: true,
            asideFolded: false,
            asideDock: false,
            container: false,
            showFilterModule: true,
            asideCollapsible: true
        })

        // definição de configurações de interface
        .config(
            [
                '$httpProvider',
                '$stateProvider',
                configFn
            ]
        );

    /**
     * Definição da função de configuração do módulo.
     *
     * @param $httpProvider
     * @param $stateProvider
     */
    function configFn(
        $httpProvider,
        $stateProvider
    ) {

        $stateProvider.state('app', {
            url: '/app',
            abstract: true,
            controller: 'ui.UiCtrl',
            templateUrl: 'src/ui/views/app.html'
        });

    }

}());