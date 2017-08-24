(function()
{
    'use strict';

    /**
     * Controlador responsável  pela tela de login do sistema.
     *
     * @author Otávio Fernandes <otavio@neton.com.br>
     */
    angular.module('app.login').controller(
        'login.LoginCtrl',
        [
            '$scope',
            'toaster',
            'login.Login',
            '$mdToast',
            'UI',
            LoginCtrl
        ]
    );

    /**
     * Função de definição do controlador.
     *
     * @param $scope
     * @param toaster
     * @param Login
     * @param $mdToast
     * @constructor
     */
    function LoginCtrl(
        $scope,
        toaster,
        Login,
        $mdToast,
        UI
    ) {

        $scope.appSettings = UI;
        
        $scope.login = function() {

            Login.requestLogin($scope.user, function(response){
                if (response.code == 200) {
                    self.location.reload();
                } else {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Usuário ou senha inválidos!')
                            .position('top right')
                            .hideDelay(3000)
                    );
                }

            })
        }
    }

}());