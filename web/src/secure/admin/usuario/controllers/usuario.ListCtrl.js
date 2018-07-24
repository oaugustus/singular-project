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
            ,'$uibModal'
            ,'$localStorage'
            ,'SweetAlert'
            ,'toaster'
            ,'$aside'
            ,'$sngFilter'
            ,'$sngApi'
            ,'usuario.UsuarioService'
            ,'usuario.UsuarioStore'
            ,Controller
        ]
    );

    /**
     * Função de definição do controlador.
     *
     * @param $scope
     * @param $state
     * @param $uibModal
     * @param $localStorage
     * @param SweetAlert
     * @param toaster
     * @param UsuarioStore
     * @constructor
     */
    function Controller(
        $scope
        ,$state
        ,$uibModal
        ,$localStorage
        ,SweetAlert
        ,toaster
        ,$aside
        ,$sngFilter
        ,$sngApi
        ,usuarioService
        ,UsuarioStore
    ) {
        $scope.usuario = usuarioService;
        // $scope.filtro = usuarioService.filter;
        // $scope.paging = usuarioService.paging;

        /**
         * UsuarioStore
         *
         * @type {UsuarioStore}
         */
        $scope.DataStore = UsuarioStore;

        $scope.usuario.filter.$on('apply', function() {
            $scope.usuario.api.filter($scope.usuario.filter).paging().call('find').then(function(response){
                console.log(response);
            });
        });

        $scope.usuario.filter.$on('clear', $scope.usuario.filter.close);

        $scope.usuario.filter.$on('open', function(){
            // $scope.filtro.addFilter('nome', 'Otávio');
        });

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