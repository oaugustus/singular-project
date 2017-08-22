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
    var SessionService = function($http, UI)
    {
        var me = this;
        me.session  = null;
        me.menu = null;

        /**
         * Seta a sessão do usuário no sistema.
         *
         * @param session
         */
        me.setSession = function(session){
            me.session = session;
        }

        /**
         * Recupera a sessão aberta para o usuário.
         *
         * @returns {*}
         */
        me.getSession = function(){
            return me.session;
        }

        /**
         * Seta o menu de navegação principal do sistema.
         *
         * @param menu
         */
        me.setMenu = function(menu){
            me.menu = menu;
        }


        /**
         * Função que encerra a sessão aberta para o usuário.
         *
         * @param {Function} callback
         */
        me.logout = function(callback){
            $http.post(UI.url + 'sessao/sessao/logout', {}).success(function(response){
                if (response.success) {
                    callback();
                }
            })
        }

        return me;
    }

    angular.module('singular.ui').factory('ui.Session', ['$http','UI', SessionService]);
}());