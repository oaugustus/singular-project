(function()
{
    'use strict';

    /**
     * Controlador responsável por funcionalidade da aplicação.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.usuario').controller(
        'usuario.ShowCtrl',
        [
            '$scope',
            '$state',
            '$stateParams',
            '$uibModal',
            '$localStorage',
            'SweetAlert',
            'toaster',
            'usuario.PerfilStore',
            'usuario.UsuarioStore',
            Controller
        ]
    );

    /**
     * Função de definição do controlador.
     *
     * @param $scope
     * @param $state
     * @param $stateParams
     * @param $uibModal
     * @param $localStorage
     * @param SweetAlert
     * @param toaster
     * @param PerfilStore
     * @param UsuarioStore
     * @constructor
     */
    function Controller(
        $scope,
        $state,
        $stateParams,
        $uibModal,
        $localStorage,
        SweetAlert,
        toaster,
        PerfilStore,
        UsuarioStore
    ) {
        /**
         * Define que o formulário está em processo de criação.
         *
         * @type {boolean}
         */
        $scope.isShow = true;

        /**
         * Ainda não possui o registro ao abrir a tela.
         *
         * @type {boolean}
         */
        $scope.hasRecord = false;

        /**
         * Referência ao store de perfil.
         *
         * @type {usuario.PerfilStore}
         */
        $scope.PerfilStore = PerfilStore;

        /**
         * Referência ao store de usuário.
         *
         * @type {usuario.UsuarioStore}
         */
        $scope.UsuarioStore = UsuarioStore;

        // carrega o registro do usuário para ser editado
        $scope.UsuarioStore.get($stateParams.id, function(record) {
            if (record) {
                $scope.hasRecord = true;
            }
            $scope.usuario = record;
        });

        // faz o carregamento do store
        $scope.PerfilStore.load();
        
    }

}());