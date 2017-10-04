(function()
{
    'use strict';

    /**
     * Controlador responsável por funcionalidade da aplicação.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.usuario').controller(
        'usuario.CreateCtrl',
        [
            '$scope',
            '$state',
            '$modal',
            '$localStorage',
            'SweetAlert',
            'toaster',
            'usuario.PerfilStore',
            'usuario.UsuarioStore',
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
     * @param PerfilStore
     * @param UsuarioStore
     * @constructor
     */
    function Controller(
        $scope,
        $state,
        $modal,
        $localStorage,
        SweetAlert,
        toaster,
        PerfilStore,
        UsuarioStore
    ) {
        /**
         * Define que o formulário está em processo de criação.
         *
         * @type {boolean}
         */
        $scope.isCreate = true;

        /**
         * Variável de validação da exibição do formulário.
         *
         * @type {boolean}
         */
        $scope.hasRecord = true;

        /**
         * Formulários da view de usuário.
         *
         * @type {object}
         */
        $scope.forms = {
            cadastro: {}
        };

        /**
         * Registro do usuário que está sendo criado.
         *
         * @type {object}
         */
        $scope.usuario = {
            ativo: '1'
        };

        /**
         * Referência ao store de perfil.
         *
         * @type {usuario.PerfilStore}
         */
        $scope.PerfilStore = PerfilStore;

        /**
         * Referência ao store de usuário.
         *
         * @type {usuario.UsuarioStore}
         */
        $scope.UsuarioStore = UsuarioStore;

        // faz o carregamento do store
        $scope.PerfilStore.load();

        /**
         * Função executada após o upload do avatar ter sido realizado.
         *
         * @param {object} response
         */
        $scope.onAvatarUpload = function(response) {
            $scope.usuario.avatar = response.data;
        };

        /**
         * Salva o registro do novo usuário.
         */
        $scope.save = function() {
            // marca que o formulário já foi submetido
            $scope.UsuarioStore.isSubmited = true;

            if (!$scope.forms.cadastro.$invalid) {
                $scope.isSaving = true;
                $scope.UsuarioStore.save($scope.usuario, function(response){
                    $scope.isSaving = false;

                    if (!response.success) {
                        toaster.pop('error','O login informado já está cadastrado');
                        return;
                    } else {
                        toaster.pop('success','Usuário criado com sucesso!');
                        $state.go('app.usuario-edit',{id: response.record});
                    }
                });
            }
        };

    }

}());