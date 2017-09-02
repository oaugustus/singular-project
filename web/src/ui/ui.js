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
            'ngSweetAlert',
            'ui.router'
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
                '$urlRouterProvider',
                '$localStorageProvider',
                configFn
            ]
        )
        .run(
            [
                '$rootScope',
                '$state',
                '$localStorage',
                '$urlRouter',
                '$location',
                'toaster',
                'ui.Session',
                runFn
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
        $stateProvider,
        $urlRouterProvider,
        $localStorageProvider
    ) {
        var state = '/login';

        $stateProvider.state('app', {
            url: '/app',
            abstract: true,
            controller: 'ui.UiCtrl',
            templateUrl: 'src/ui/views/app.html'
        });

        if (typeof $localStorageProvider.$get('ngStorage').state != 'undefined' &&
            $localStorageProvider.$get('ngStorage').state != '/login') {
            state = $localStorageProvider.$get('ngStorage').state;
        }

        $urlRouterProvider.otherwise(state);
    }

    /**
     * Definição da função de execução do módulo.
     *
     * @param $rootScope
     * @param $state
     * @param $localStorage
     * @param $urlRouter
     * @param $location
     * @param toaster
     * @param Session
     */
    function runFn(
        $rootScope,
        $state,
        $localStorage,
        $urlRouter,
        $location,
        toaster,
        Session
    ) {

        if (window.APP) {
            var acl = window.APP.acl;

            Session.setSession(window.APP.session);
            Session.setMenu(window.APP.menu);

            $rootScope.$on("$locationChangeStart",function(event, next, current){
                var url = next.substring(next.indexOf('#')+1),
                    state = $state.fromUrl(url);

                if (state){
                    if (state.self.acl) {
                        if (acl.indexOf('|' + state.self.acl + '|') == -1) {
                            event.preventDefault();
                        }
                    }
                }
            });


            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
                if (toState.acl) {
                    if (acl.indexOf('|' + toState.acl + '|') == -1) {
                        toaster.clear();
                        toaster.pop('error','ACESSO NEGADO','Seu usuário não tem permissão para executar esta ação!');
                        event.preventDefault();
                    }
                }
            });


            $rootScope.$on('$locationChangeSuccess', function(
                event,
                next
            ){
                var url = next.substring(next.indexOf('#')+1),
                    state = $state.fromUrl(url),
                    address = window.location.hash;

                if (state.self.persistent) {
                    address = address.substring(1);
                    $localStorage.state = address;
                }

            });

        }
    }

}());