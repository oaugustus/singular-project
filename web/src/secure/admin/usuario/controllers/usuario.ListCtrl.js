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
        $scope.usuario = usuarioService.api;
        $scope.filtro = usuarioService.filter;
        $scope.paging = usuarioService.paging;
        $scope.sort = usuarioService.sort;

        /**
         * UsuarioStore
         *
         * @type {UsuarioStore}
         */
        $scope.DataStore = UsuarioStore;

        $scope.filtro.$on('apply', function(){
            $scope.reloadData();
        });

        $scope.filtro.$on('clear', $scope.filtro.close);

        $scope.filtro.$on('open', function(){
            // $scope.filtro.addFilter('nome', 'Otávio');
        });

        /**
         * Função de recarregamento dos dados do DataStore.
         */
        $scope.reloadData = function() {

            $scope.usuario.filter().paginate().sort($scope.sort.field).call('find').then(function(response){
                $scope.usuario.records = response.results;
            });
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