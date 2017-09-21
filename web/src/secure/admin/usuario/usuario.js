(function()
{
    'use strict';

    /**
     * Módulo de frontend.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.usuario', [
        /*@modules*/
    ])
        .config(
            [
                '$stateProvider',
                configFn
            ]
        );

    /**
     * Definição da função de configuração do módulo.
     *
     * @param {$stateProvider} $stateProvider
     */
    function configFn(
        $stateProvider
    ){
        $stateProvider.state('app.usuario-form', {
            url: '/admin/usuario/form',
            controller: 'usuario.ListCtrl',
            templateUrl: getView('usuario.form')
        })
            .state('app.usuario-list', {
                url: '/admin/usuario/list',
                controller: 'usuario.ListCtrl',
                templateUrl: getView('usuario.list')
            })
        ;
    }

    /**
     * Retorna o caminho completo de uma view.
     *
     * @param view
     * @returns {string}
     */
    function getView(view) {
        return 'src/secure/admin/usuario/views/' + view + '.html';
    }

}());