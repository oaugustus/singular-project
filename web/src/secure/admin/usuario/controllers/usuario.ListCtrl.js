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
            ,'usuario.UsuarioService'
            ,Controller
        ]
    );

    /**
     * Função de definição do controlador.
     *
     * @param $scope
     * @param UsuarioService
     * @constructor
     */
    function Controller(
        $scope
        ,UsuarioService
    ) {
        /**
         * Atalho para o serviço de usuário.
         *
         * @type {usuario.UsuarioService}
         */
        $scope.usuario = UsuarioService;

        /**
         * Atalho para a propriedade filter do serviço de usuário.
         *
         * @type {$sngFilter}
         */
        $scope.filtro = UsuarioService.filter;

        /**
         * Função de recarregamento dos dados.
         *
         * @type {function}
         */
        $scope.reloadData = reloadDataFn;

        /**
         * Função de remoção dos registros.
         *
         * @type {function}
         */
        $scope.remove = removeFn;

        /**
         * Registros de usuários.
         *
         * @type {Array}
         */
        $scope.records = [];

        /**
         * Inicialização do controlador.
         */
        $scope.onInit = function() {
            $scope.reloadData();

            // evento acionado ao clicar no botão "Aplicar filtro"
            $scope.filtro.$on('apply', $scope.reloadData);

            // evento acionado ao clicar no botão "Limpar filtro"
            $scope.filtro.$on('clear', function(){
                $scope.reloadData();
                $scope.filtro.close();
            });

        };

        /**
         * Recarrega a lista de usuários.
         */
        function reloadDataFn() {
            $scope.usuario.api.find($scope.usuario.sort).then(function(results) {
                if (results) {
                    $scope.records = results;
                }
            });
        }

        /**
         * Remove o registro de um usuário pelo seu id.
         *
         * @param {int} id
         */
        function removeFn(id) {
            $scope.usuario.api.remove(id, function(response) {
                if (response) {
                    $scope.reloadData();
                }
            });
        }

        // inicializa o controlador
        $scope.onInit();
    }

}());