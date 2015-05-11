(function()
{
    'use strict';

    /**
     * Controlador da principal do sistema.
     *
     * @param $scope
     * @param $localStorage
     * @param $window
     * @constructor
     */
    var UiCtrl = function($scope, $localStorage, $window, SweetAlert, Session, Notification)
    {
        $scope.logout = function(){
            SweetAlert.swal({
                    title: "Sair",
                    text: "Deseja realmente sair do sistema?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Sim",
                    cancelButtonText: 'Não',
                    closeOnConfirm: false},
                function(confirm){
                    if (confirm){
                        Session.logout(function(){
                            self.location.reload();
                        });
                    }
                });
        }

        $scope.session = Session;

        $scope.notification = Notification

        $scope.notification.addNotification({
            message: 'Notificação 1',
            date: new Date()
        });


    }

    angular.module('singular.ui').controller('ui.UiCtrl',['$scope','$localStorage','$window','SweetAlert','ui.Session','ui.Notification', UiCtrl]);
}());