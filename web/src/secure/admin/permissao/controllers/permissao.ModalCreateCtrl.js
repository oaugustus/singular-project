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
             '$scope'
            ,'$uibModalInstance'
            ,'toastr'
            ,'$sngApi'
            ,'permissao.PerfilService'
            ,Controller
        ]
    );

    /**
     * Função de definição do controlador.
     *
     * @param $scope
     * @param $uibModalInstance
     * @param toastr
     * @param $sngApi
     * @param PerfilService
     * @constructor
     */
    function Controller(
         $scope
        ,$uibModalInstance
        ,toastr
        ,$sngApi
        ,PerfilService
    ) {

        /**
         * Api de comunicação com o controlador de perfil de acesso no backend.
         *
         * @type {$sngApi}
         */
        $scope.perfilApi = $sngApi('sessao/perfil_acesso');

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
            PerfilService.isSubmited = true;

            if (!$scope.forms.perfil.$invalid) {
                $scope.isSaving = true;
                $scope.perfilApi.save($scope.perfil).then(function(response){
                    $scope.isSaving = false;

                    if (!response.success) {
                        toastr.error('O perfil informado já está cadastrado');
                    } else {
                        toastr.success('Perfil criado com sucesso!');
                        $scope.close();
                    }
                });
            }
        };

        /**
         * Verifica se um campo foi acionado.
         *
         * @param field
         * @return {boolean}
         */
        $scope.isDirty = PerfilService.isDirty;

        /*
         Fecha o modal em modo de cancelamento
         */
        $scope.cancel = function(){
            $uibModalInstance.dismiss();
        };

        $scope.close = function(){
            $uibModalInstance.close();
        };

    }

}());