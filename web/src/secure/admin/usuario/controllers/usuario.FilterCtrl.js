(function()
{
    'use strict';

    /**
     * Controlador responsável pela funcionalidade de filtro da tela de listagem de usuários.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.usuario').controller(
        'usuario.FilterCtrl',
        [
            '$scope'
            ,'$state'
            ,'$modal'
            ,'$localStorage'
            ,'SweetAlert'
            ,'toaster'
            ,'usuario.UsuarioStore'
            ,Controller
        ]
    );

    /**
     * Função de definição do controlador.
     *
     * @param $scope
     * @param $state
     * @param $modal
     * @param $localStorage
     * @param SweetAlert
     * @param toaster
     * @constructor
     */
    function Controller(
        $scope
        ,$state
        ,$modal
        ,$localStorage
        ,SweetAlert
        ,toaster
        ,UsuarioStore
    ) {
        $scope.DataStore = UsuarioStore;

        /**
         * Referência local para o filtro no formulário.
         *
         * @type {object}
         */
        $scope.filter = {};

        /**
         * Função executada quando o filtro é aberto.
         */
        $scope.Filter.onOpen = function() {
            $scope.filter = angular.copy($scope.DataStore.filter);
        };
        
        /**
         * Define a função de aplicação de filtro.
         */
        $scope.Filter.applyFilter = function() {
            $scope.DataStore.filter = $scope.filter;
            $scope.DataStore.load();
        };

        /**
         * Define a função de reset de filtro.
         */
        $scope.Filter.clearFilter = function() {
            $scope.DataStore.clearFilter();
        };

        /**
         * Limpa o filtro de um determinado campo.
         *
         * @param field
         */
        $scope.clear = function(field) {
            delete $scope.filter[field];
        };
    }

}());