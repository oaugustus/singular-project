(function()
{
   'use strict';

    /**
     * Serviço que fornece a api para conexão.
     *
     * @param $http
     * @param UI
     *
     * @constructor
     */
    var LoginService = function($http, UI)
    {
        var me = this;

        /**
         * Função que faz o login.
         *
         * @param {Object}   data
         * @param {Function} callback
         */
        me.requestLogin = function(data, callback){
            $http.post('session/session/login', data).success(callback)
        }

        return me;
    }

    angular.module('app.login').factory('login.Login', ['$http','UI', LoginService]);
}());