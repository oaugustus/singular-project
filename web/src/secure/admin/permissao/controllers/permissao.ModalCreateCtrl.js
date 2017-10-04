(function()
{
    'use strict';

    /**
     * Controlador responsável pela modal criação de um novo perfil.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.permissao').controller(
        'permissao.ModalCreateCtrl',
        [
            '$scope',
            '$modal',
            '$modalInstance',
            'SweetAlert',
            'toaster',
            Controller
        ]
    );

    /**
     * Função de definição do controlador.
     *
     * @param $scope
     * @param $modal
     * @param $modalInstance
     * @param SweetAlert
     * @param toaster
     * @constructor
     */
    function Controller(
        $scope,
        $modal,
        $modalInstance,
        SweetAlert,
        toaster
    ) {

        /**
         * Objeto do perfil do usuário.
         *
         * @type {object}
         */
        $scope.perfil = {};

        /**
         * Salva o registro do novo usuário.
         */
        $scope.save = function() {
            // marca que o formulário já foi submetido
            $scope.PerfilStore.isSubmited = true;

            if (!$scope.forms.perfil.$invalid) {
                $scope.isSaving = true;
                $scope.PerfilStore.save($scope.perfil, function(response){
                    $scope.isSaving = false;

                    if (!response.success) {
                        toaster.pop('error','O perfil informado já está cadastrado');
                        return;
                    } else {
                        toaster.pop('success','Perfil criado com sucesso!');
                        $scope.close();
                    }
                });
            }
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