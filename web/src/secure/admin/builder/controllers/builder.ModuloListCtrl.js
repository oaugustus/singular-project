(function()
{
    'use strict';

    /**
     * Controlador responsável pela listagem de módulos do builder.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.builder').controller(
        'builder.ModuloListCtrl',
        [
            '$scope'
            ,'$state'
            ,'$stateParams'
            ,'$uibModal'
            ,'SweetAlert'
            ,'toastr'
            ,'$sngApi'
            ,'builder.BuilderService'
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
     * @param Builder
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
        ,Builder
    ) {
        /**
         * Api de comunicação com o controlador módulo no backend.
         *
         * @type {$sngApi}
         */
        $scope.moduloApi = $sngApi('builder/modulo');

        /**
         * Módulo.
         *
         * @type {Object}
         */
        $scope.modulo = {};

        /**
         * Referência ao serviço do Builder.
         *
         * @type {Object}
         */
        $scope.Builder = Builder;

        /**
         * Inicialização do controlador.
         */
        $scope.onInit = function(){
            loadModulos();
        };

        /**
         * Seleciona um nó parent.
         *
         * @param parent
         */
        $scope.selectParent = function(parent){
            $scope.Builder.parents.push(parent.name);
            loadModulos();
        };

        /**
         * Remove os parents de um módulo selecionado no breadcrumb.
         *
         * @param index
         */
        $scope.popParent = function(index){

            for (var i = 0; i < index; i++) {
                $scope.Builder.parents.pop();
            }
            loadModulos();
        };

        /**
         * Abre a modal de criação de pacote.
         */
        $scope.abreModalModulo = function () {

            var modal = $uibModal.open({
                templateUrl: 'src/secure/admin/builder/views/frontend.modulo.modal.html',
                controller: 'builder.ModuloModalCtrl',
                size: 'md',
                scope: $scope
            });

            modal.result.then(function (rec) {
                loadModulos();
            });

        };

        /**
         * Carrega os módulos da aplicação.
         */
        function loadModulos(){
            var lastParent = '';

            if (Builder.parents.length > 0){
                lastParent = Builder.parents[Builder.parents.length -1].name;
            }


            $scope.moduloApi.call('find',{parent: Builder.parents}).then(function(response){
                $scope.modulos = response.results;
            });
        }

        $scope.onInit();
    }

}());