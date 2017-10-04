(function()
{
    'use strict';

    /**
     * Controlador responsável pelo gerenciamento de componentes.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.componente').controller(
        'componente.ComponenteCtrl',
        [
            '$scope',
            '$state',
            '$modal',
            '$localStorage',
            'SweetAlert',
            'toaster',
            'componente.ComponenteStore',
            'componente.MenuStore',
            'componente.ParenteStore',
            Controller
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
     * @param ComponenteStore
     * @param MenuStore
     * @param ParenteStore
     * @constructor
     */
    function Controller(
        $scope,
        $state,
        $modal,
        $localStorage,
        SweetAlert,
        toaster,
        ComponenteStore,
        MenuStore,
        ParenteStore
    ) {
        $scope.ComponenteStore = ComponenteStore;
        $scope.ComponenteStore.sort = ['t.text'];
        $scope.ComponenteStore.load();

        $scope.ParenteStore = ParenteStore;
        $scope.ParenteStore.filter.tipo = 'M';
        $scope.ParenteStore.sort = ['t.text'];
        $scope.ParenteStore.load();

        $scope.MenuStore = MenuStore;
        $scope.MenuStore.sort = ['t.modulo'];
        $scope.MenuStore.load();

        $scope.query = null;
        $scope.forms = {};
        $scope.componente = {};
        $scope.componente.tipo  = 'M';

        $scope.$watch('componente.tipo', function(val) {
            if (val == 'M') {
                $scope.componente.parent_id  = null;
            } else {
                $scope.componente.menu_id  = null;
            }
        });


        $scope.vm = {};
        $scope.vm.ignoreChanges = false;
        $scope.vm.newNode = {};


        var i = 1;
        $scope.$watch('ComponenteStore.results', function(){

            if($scope.ComponenteStore.results.length > 0 ){
                $scope.vm.originalData =$scope.ComponenteStore.results;

                $scope.vm.treeData = [];
                angular.copy($scope.vm.originalData,$scope.vm.treeData);

                $scope.vm.treeConfig = {
                    core : {
                        multiple : true,
                        animation: true,
                        error : function(error) {
                            $log.error('treeCtrl: error from js tree - ' + angular.toJson(error));
                        },
                        check_callback : true,
                        worker : true
                    },
                    version : i++,
                    // plugins : ['type']
                    plugins : ['type','changed','json_data','ui']
                };
            }else{
                $scope.vm.originalData =[];

                $scope.vm.treeData = [];
                angular.copy($scope.vm.originalData,$scope.vm.treeData);

                $scope.vm.treeConfig = {
                    core : {
                        multiple : true,
                        animation: true,
                        error : function(error) {
                            $log.error('treeCtrl: error from js tree - ' + angular.toJson(error));
                        },
                        check_callback : true,
                        worker : true
                    },
                    version : i++,
                    // plugins : ['type']
                    plugins : ['type','changed','json_data','ui']
                };
            }

        });


        /**
         * Salva o registro de um componente.
         */
        $scope.saveComponente = function(){
            toaster.clear();
            $scope.ComponenteStore.isSubmited = true;

            // if ($scope.forms.componente.$invalid) {
            //     toaster.pop('error','Verifique o preenchimento do formulário!');
            //     return;
            // }

            var componente = angular.copy($scope.componente);

            $scope.ComponenteStore.save(componente, function(response){
                toaster.clear();
                if (response.success) {
                    toaster.pop('success', 'Componente incluído com sucesso!');

                    $scope.ComponenteStore.load();
                    $scope.ParenteStore.load();

                    $scope.ComponenteStore.isSubmited = false;
                    $scope.forms.componente.$setPristine();

                    $scope.componente = {};
                    $scope.componente.tipo = "M";

                    return ;
                }

                toaster.pop('error', 'Falhou ao tentar incluir o registro!');
            });
        };

        $scope.vm.selectNode = function(node,selected) {
            $scope.componente = angular.copy(selected.node.original);
        };


        /**
         * reseta o formulario de componentes
         */
        $scope.novoComponente = function(){
            $scope.componente = {};
            $scope.componente.tipo = "M";

        };

        /* Remove o registro de um componente
         */
        $scope.removeComponente = function() {

            if($scope.componente.tipo == 'M'){
                SweetAlert.swal({
                        title: "Remover",
                        text: "Deseja realmente remover este módulo? Os componentes dependentes serão removidos juntos com ele!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Sim",
                        cancelButtonText: 'Não',
                        closeOnConfirm: true
                    },
                    function (confirm) {
                        if (confirm) {
                            $scope.ComponenteStore.removeComponente($scope.componente, function(success){
                                if (success) {
                                    $scope.ComponenteStore.load({});
                                    $scope.ParenteStore.load();

                                    $scope.ComponenteStore.isSubmited = false;
                                    $scope.forms.componente.$setPristine();

                                    $scope.componente = {};
                                    $scope.componente.tipo  = 'M';
                                } else {
                                    toaster.pop('error','Não é possível excluir o registro informado!');
                                }
                            });
                        }
                    });

            }else{
                SweetAlert.swal({
                        title: "Remover",
                        text: "Deseja realmente remover este componente?",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Sim",
                        cancelButtonText: 'Não',
                        closeOnConfirm: true
                    },
                    function (confirm) {
                        if (confirm) {
                            $scope.ComponenteStore.removeComponente($scope.componente, function(success){
                                if (success) {
                                    $scope.ComponenteStore.load({});
                                    $scope.ParenteStore.load();

                                    $scope.ComponenteStore.isSubmited = false;
                                    $scope.forms.componente.$setPristine();

                                    $scope.componente = {};
                                    $scope.componente.tipo  = 'M';
                                } else {
                                    toaster.pop('error','Não é possível excluir o registro informado!');
                                }
                            });
                        }
                    });
            }


        };
    }

}());