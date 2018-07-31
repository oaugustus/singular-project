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
            '$scope'
            ,'$uibModal'
            ,'SweetAlert'
            ,'toastr'
            ,'$sngApi'
            ,'permissao.PermissaoStore'
            ,Controller
        ]
    );

    /**
     * Função de definição do controlador.
     *
     * @param $scope
     * @param $uibModal
     * @param SweetAlert
     * @param toastr
     * @param $sngApi
     * @param PermissaoStore
     * @constructor
     */
    function Controller(
         $scope
        ,$uibModal
        ,SweetAlert
        ,toastr
        ,$sngApi
        ,PermissaoStore
    ) {
        /**
         * Api de comunicação com o controlador de perfil de acesso.
         *
         * @type {$sngApi}
         */
        $scope.perfilApi = $sngApi('sessao/perfil_acesso');

        /**
         * Api de comunicação com o controlador de permissão.
         *
         * @type {$sngApi}
         */
        $scope.permissaoApi = $sngApi('sessao/permissao');

        $scope.alterado = false;
        $scope.forms = {};
        $scope.permissao = {};

        $scope.vm = {};
        $scope.vm.ignoreChanges = false;
        $scope.vm.newNode = {};

        /**
         * Inicialização do controlador.
         */
        $scope.onInit = function() {
            reloadPerfis();
        };

        /**
         * Função que possibilita recarregar a lista de permissao
         */
        $scope.reload = function() {
            $scope.permissaoApi.call('listarPermissoes', $scope.perfil).then(function(response){
                $scope.permissoes = response.results;
            });
        };

        /**
         * Função que seleciona o grupo de acesso apara ser caregada as permissões...
         */
        $scope.onSelectPerfil = function(perfil){

            $scope.showBtnCopiar = true;

            $scope.perfil = perfil;
            $scope.nomePerfil = perfil.perfil;
            $scope.showPanel = true;
            $scope.reload();
        };


        /**
         * Abre a modal de copiar permissão
         */
        $scope.abreModalCopiar = function () {

            var modal = $uibModal.open({
                templateUrl: 'src/secure/admin/permissao/views/copiar.modal.html',
                controller: 'permissao.ModalCopiarCtrl',
                size: 'md',
                scope: $scope
            });

            modal.result.then(function (rec) {
                $scope.reload();
            });

        };

        /**
         * Abre a modal de copiar permissão
         */
        $scope.abreModalPerfil = function () {

            var modal = $uibModal.open({
                templateUrl: 'src/secure/admin/permissao/views/perfil.modal.html',
                controller: 'permissao.ModalCreateCtrl',
                size: 'md',
                scope: $scope

            });

            modal.result.then(function (rec) {
                reloadPerfis();
            });

        };

        /**
         * Abre a modal de copiar permissão
         */
        $scope.editarPerfil = function () {

            var modal = $uibModal.open({
                templateUrl: 'src/secure/admin/permissao/views/perfil.modal.html',
                controller: 'permissao.ModalEditCtrl',
                size: 'md',
                scope: $scope,
                resolve: {
                    record: function(){
                        return angular.copy($scope.perfil);
                    }
                }
            });

            modal.result.then(function (rec) {
                $scope.perfil = rec;
                $scope.nomePerfil = rec.perfil;
                reloadPerfis();
            });

        };

        $scope.removerPerfil = function() {
            $scope.perfilApi.remove($scope.perfil.id, function(response){
                reloadPerfis();
                $scope.perfil = null;
            }, 'Atenção','Deseja realmente excluir este perfil?');
        };



        var i = 1;
        $scope.$watch('permissoes', function(results){

            if (!results) {
                return;
            }
            
            if ($scope.permissoes.length > 0 ) {
                $scope.vm.originalData = $scope.permissoes;

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
            } else {
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

            $scope.perfil.selecteds = $scope.vm.treeInstance.jstree(true).get_selected();

            $scope.perfil.selecteds.push(selected.node.parent);

        };

        $scope.vm.deselectNode = function(node,selected) {

            $scope.alterado = true;

            $scope.perfil.selecteds = $scope.vm.treeInstance.jstree(true).get_selected();

            $scope.perfil.selecteds.push(selected.node.parent);

        };


        $scope.savePermissoes = function () {

            $scope.permissaoApi.save($scope.perfil).then(function(response) {

                toastr.clear();

                if (response.success) {
                    $scope.alterado = false;
                    toastr.success('Permissao alterada com sucesso!');
                    return ;
                }

                toastr.error('Falhou ao tentar alterar o registro!');
            });

        };
        

        /* Remove o registro de um permissao
         */
        $scope.removePermissao = function() {

            if ($scope.permissao.tipo == 'M'){
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
                            $scope.permissaoApi.removePermissao($scope.permissao, function(success){
                                if (success) {
                                    $scope.permissaoApi.load({});
                                    $scope.ParenteStore.load();

                                    $scope.permissaoApi.isSubmited = false;
                                    $scope.forms.permissao.$setPristine();

                                    $scope.permissao = {};
                                    $scope.permissao.tipo  = 'M';
                                } else {
                                    toastr.pop('error','Não é possível excluir o registro informado!');
                                }
                            });
                        }
                    });

            } else {
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
                            $scope.permissaoApi.removePermissao($scope.permissao, function(success){
                                if (success) {
                                    $scope.permissaoApi.load({});
                                    $scope.ParenteStore.load();

                                    $scope.permissaoApi.isSubmited = false;
                                    $scope.forms.permissao.$setPristine();

                                    $scope.permissao = {};
                                    $scope.permissao.tipo  = 'M';
                                } else {
                                    toastr.pop('error','Não é possível excluir o registro informado!');
                                }
                            });
                        }
                    });
            }
        };

        /**
         * Função que recarrega a lista de perfis.
         */
        function reloadPerfis() {
            $scope.perfilApi.find().then(function(results) {
                $scope.listaPerfil = results;
            });
        }

        $scope.onInit();
    }

}());