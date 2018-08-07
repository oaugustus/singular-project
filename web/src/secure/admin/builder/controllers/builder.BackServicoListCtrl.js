(function()
{
    'use strict';

    /**
     * Controlador responsável por controlar a aba de serviços de backend do build.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.builder').controller(
        'builder.BackServicoListCtrl',
        [
            '$scope'
            ,'$state'
            ,'$stateParams'
            ,'$uibModal'
            ,'SweetAlert'
            ,'toastr'
            ,'$sngApi'
            ,Controller
        ]
    );

    /**
     * Função de definição do controlador.
     *
     * @param $scope
     * @param $state
     * @param $stateParams
     * @param $uibModal
     * @param SweetAlert
     * @param toastr
     * @param $sngApi
     * @constructor
     */
    function Controller(
         $scope
        ,$state
        ,$stateParams
        ,$uibModal
        ,SweetAlert
        ,toastr
        ,$sngApi
    ) {
        /**
         * Api de comunicação com o controlador de serviço no backend.
         *
         * @type {$sngApi}
         */
        $scope.servicoApi = $sngApi('builder/back_servico');

        /**
         * Lista de serviços da aplicação.
         *
         * @type {Array}
         */
        $scope.servicos = [];

        /**
         * Inicialização do controlador.
         */
        $scope.onInit = function(){
            loadServicos();
        };

        /**
         * Abre a modal de criação de pacote.
         */
        $scope.abreModalServico = function () {

            var modal = $uibModal.open({
                templateUrl: 'src/secure/admin/builder/views/backend.servico.modal.html',
                controller: 'builder.BackServicoModalCtrl',
                size: 'md',
                scope: $scope
            });

            modal.result.then(function (rec) {
                loadServicos();
            });

        };

        /**
         * Carrega os serviços da aplicação.
         */
        function loadServicos(){
            $scope.servicoApi.find().then(function(results){
                $scope.servicos = results;
            });
        }

        $scope.onInit();
    }

}());