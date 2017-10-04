(function()
{
    'use strict';

    /**
     * Controlador responsável pela tela de definição de permissões do sistema.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.permissao').controller(
        'permissao.PermissaoCtrl',
        [
            '$scope',
            '$state',
            '$modal',
            '$localStorage',
            'SweetAlert',
            'toaster',
            'permissao.PermissaoStore',
            'usuario.PerfilStore',
            Controller
        ]
    );

    /**
     * Define um novo controlador.
     *
     * @author nome <email>
     */
    function Controller(
        $scope,
        $state,
        $modal,
        $localStorage,
        SweetAlert,
        toaster,
        PermissaoStore,
        PerfilStore
    ) {

        $scope.alterado = false;
        $scope.forms = {};
        $scope.permissao = {};
        $scope.funcao = {};

        $scope.vm = {};
        $scope.vm.ignoreChanges = false;
        $scope.vm.newNode = {};

        $scope.PermissaoStore = PermissaoStore;

        $scope.PerfilStore = PerfilStore;
        $scope.PerfilStore.load();


        /**
         * Função que possibilita recarregar a lista de permissao
         */
        $scope.reload = function(){
            $scope.PermissaoStore.listarPermissoes($scope.funcao, function(response){
                $scope.PermissaoStore.results = response.results;
            });
        };

        /**
         * Função que seleciona o grupo de acesso apara ser caregada as permissões...
         */
        $scope.onSelectPerfil = function(funcao){

            $scope.showBtnCopiar = true;

            $scope.funcao = funcao;
            $scope.nomeFuncao = funcao.descricao;
            $scope.showPanel = true;
            $scope.reload();
            // $scope.vm.loadNodes();

        };


        $scope.abreModalCopiar = function () {

            var modal = $modal.open({
                templateUrl: 'src/secure/administracao/permissao/views/copiar.modal.html',
                controller: 'permissao.ModalCopiarCtrl',
                size: 'md',
                scope: $scope

            });


            modal.result.then(function (rec) {
                $scope.reload();
            });

        };



        var i = 1;
        $scope.$watch('PermissaoStore.results', function(results){

            if (!results) {
                return;
            }
            
            if($scope.PermissaoStore.results.length > 0 ){
                $scope.vm.originalData =$scope.PermissaoStore.results;

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
                    plugins : ['type','checkbox','changed','json_data','ui']
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
                    plugins : ['type','checkbox','changed','json_data','ui']
                };
            }

        });



        $scope.vm.selectNode = function(node,selected) {

            $scope.alterado = true;

            $scope.funcao.selecteds = $scope.vm.treeInstance.jstree(true).get_selected();

            $scope.funcao.selecteds.push(selected.node.parent);

        };

        $scope.vm.deselectNode = function(node,selected) {

            $scope.alterado = true;

            $scope.funcao.selecteds = $scope.vm.treeInstance.jstree(true).get_selected();

            $scope.funcao.selecteds.push(selected.node.parent);

        };


        $scope.savePermissoes = function () {

            $scope.PermissaoStore.save($scope.funcao, function(response) {

                toaster.clear();

                if (response.success) {
                    $scope.alterado = false;
                    toaster.pop('success', 'Permissao incluída com sucesso!');
                    return ;
                }

                toaster.pop('error', 'Falhou ao tentar incluir o registro!');

            });

        };
        

        /* Remove o registro de um permissao
         */
        $scope.removePermissao = function() {

            if($scope.permissao.tipo == 'M'){
                SweetAlert.swal({
                        title: "Remover",
                        text: "Deseja realmente remover este módulo? Os permissaos dependentes serão removidos juntos com ele!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Sim",
                        cancelButtonText: 'Não',
                        closeOnConfirm: true
                    },
                    function (confirm) {
                        if (confirm) {
                            $scope.PermissaoStore.removePermissao($scope.permissao, function(success){
                                if (success) {
                                    $scope.PermissaoStore.load({});
                                    $scope.ParenteStore.load();

                                    $scope.PermissaoStore.isSubmited = false;
                                    $scope.forms.permissao.$setPristine();

                                    $scope.permissao = {};
                                    $scope.permissao.tipo  = 'M';
                                } else {
                                    toaster.pop('error','Não é possível excluir o registro informado!');
                                }
                            });
                        }
                    });

            }else{
                SweetAlert.swal({
                        title: "Remover",
                        text: "Deseja realmente remover este permissao?",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Sim",
                        cancelButtonText: 'Não',
                        closeOnConfirm: true
                    },
                    function (confirm) {
                        if (confirm) {
                            $scope.PermissaoStore.removePermissao($scope.permissao, function(success){
                                if (success) {
                                    $scope.PermissaoStore.load({});
                                    $scope.ParenteStore.load();

                                    $scope.PermissaoStore.isSubmited = false;
                                    $scope.forms.permissao.$setPristine();

                                    $scope.permissao = {};
                                    $scope.permissao.tipo  = 'M';
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