(function()
{
    'use strict';

    /**
     * Controlador responsável pela modal de copia de permissões.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.permissao').controller(
        'permissao.ModalCopiarCtrl',
        [
            '$scope',
            '$uibModal',
            '$uibModalInstance',
            'SweetAlert',
            'toastr',
            Controller
        ]
    );

    /**
     * Função de definição do controlador.
     *
     * @param $scope
     * @param $uibModal
     * @param $modalInstance
     * @param SweetAlert
     * @param toastr
     * @constructor
     */
    function Controller(
        $scope,
        $uibModal,
        $modalInstance,
        SweetAlert,
        toastr
    ) {

        $scope.copiar = {};

        $scope.copiaPermissoes = function () {

            var data = {
                origem_perfil_id: $scope.copiar.perfil_id,
                destino_perfil_id: $scope.perfil.id
            };

            if (data.origem_perfil_id != data.destino_perfil_id) {
                $scope.PermissaoStore.copiaPermissoesPerfil(data, function(response) {

                    toastr.clear();

                    if (response.success) {

                        $scope.close();

                        $scope.$parent.alterado = false;

                        toastr.pop('success', 'Permissões copiadas com sucesso!');
                        return ;

                    }

                    toastr.pop('error', 'Falhou ao tentar copiar as permissões!');

                });
            } else {
                $scope.close();
            }
        };


        $scope.loadPerfil = function() {

            $scope.FuncaoCopiarStore.filter.funcao_id = $scope.copiar.funcao_id;
            $scope.FuncaoCopiarStore.load();

        };


        /*
         Fecha o modal em modo de cancelamento
         */
        $scope.cancel = function(){
            $modalInstance.dismiss();
        };

        $scope.close = function(){
            $modalInstance.close();
        };

    }

}());