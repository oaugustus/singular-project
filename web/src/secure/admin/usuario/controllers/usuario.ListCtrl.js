(function()
{
    'use strict';

    /**
     * Controlador responsável por funcionalidade da aplicação.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.usuario').controller(
        'usuario.ListCtrl',
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
     * @param UsuarioStore
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
        /**
         * UsuarioStore
         *
         * @type {UsuarioStore}
         */
        $scope.DataStore = UsuarioStore;

        // seta o template a ser utilizado no filtro para este módulo
        $scope.Filter.templateUrl = 'src/secure/admin/usuario/views/usuario.filter.html';

        /**
         * Função de recarregamento dos dados do DataStore.
         */
        $scope.reloadData = function() {
            $scope.DataStore.load();
        };

        /**
         * Remove o registro de um usuário.
         */
        $scope.remove = function(id){
            $scope.DataStore.remove(id, function(response){
                $scope.reloadData();
            }, {
                text: 'Deseja realmente excluir este usuário?'
            });
        };

        $scope.selected = [];
        
        // força o carregamento dos dados
        $scope.reloadData();

    }

}());