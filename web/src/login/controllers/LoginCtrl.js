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
    var LoginCtrl = function($scope, toaster, Login)
    {
        $scope.login = function() {
            $scope.user.id = 1;
            Login.requestLogin($scope.user, function(response){
                if (response) {

                }
            })
        }
    }

    angular.module('app.login').controller('login.LoginCtrl',['$scope','toaster','login.Login', LoginCtrl]);
}());