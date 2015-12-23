(function()
{
    'use strict';

    /**
     * Controlador responsável pela view de login do sistema.
     *
     * @param $scope
     * @param $http
     * @param $state
     *
     * @constructor
     */
    var LoginCtrl = function($scope, toaster, Login, $mdToast)
    {

        $scope.login = function() {
            $scope.user.id = 1;

            Login.requestLogin($scope.user, function(response){
                if (response.success) {
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

    angular.module('app.login').controller('login.LoginCtrl',['$scope','toaster','login.Login','$mdToast', LoginCtrl]);
}());