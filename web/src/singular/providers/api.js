(function()
{
    'use strict';

    /**
     * Provider que cria uma interface de encapsulamento para chamada de métodos remotos no backend.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     * @todo Implementar mapa de filtro via diretiva / parâmetro
     */
    angular.module('singular').provider('$sngApi', ApiProvider);

    /**
     * Função de definição do Provider.
     *
     * @constructor
     */
    function ApiProvider() {
        var provider = this,
            defaults = {
                method: 'POST',
                params: {}
            };

        /**
         * Registra as configurações.
         *
         * @param {object} settings
         */
        this.config = function(settings) {
            forEach(settings, function(value, key) {
                defaults[key] = value;
            });
        };

        this.$get = ['$http','$sngFilter','$sngPaging', function($http, $sngFilter, $sngPaging) {
            function apiFactory(resource) {
                var _filter = null,
                    _paging = null;

                var Api = {
                    /**
                     * Injeta o serviço de filtro na chamada do método.
                     *
                     * @param {object} f
                     * @type {function}
                     */
                    filter: applyFilter,

                    /**
                     * Injeta o serviço de paginação na chamada do método.
                     *
                     * @param {}
                     * @type {function}
                     */
                    paging: applyPaging,

                    /**
                     * Chama o método remoto.
                     *
                     * @param {string} action
                     * @param {object} params
                     * @param {string} method
                     *
                     * @type {function}
                     *
                     * @return {promise}
                     */
                    call: doCall
                };

                return Api;

                function doCall(action, params, method) {
                    if (!method) {
                        method = defaults.method;
                    }

                    if (!params) {
                        params = angular.copy(defaults.params);
                    }

                    if (_filter) {
                        params.filter = _filter.getFilter();
                    }
                    // angular.extend(params, );
                    // injectPagingParams(params);

                    var request = $http({
                        method: method.toUpperCase(),
                        url: getURL(action),
                        data: params
                    }).then(function(response){
                        _filter = null;
                        return response.data;
                    });

                    return request;
                }

                /**
                 * Aplica o filtro na chamada da api.
                 *
                 * @param f
                 * @return {Api}
                 */
                function applyFilter(f) {

                    if (!f.hasOwnProperty('isFilterProvider')) {
                        _filter = $sngFilter(f);
                    } else {
                        _filter = angular.copy(f);
                    }

                    return Api;
                }

                /**
                 * Aplica a paginação na chamada da api.
                 *
                 * @param p
                 * @return {Api}
                 */
                function applyPaging(p) {
                    _paging = p;
                    return Api;
                }

                /**
                 * Recupera a URL completa de um endpoint para chamada remota.
                 *
                 * @param {string} action
                 *
                 * @return {string}
                 */
                function getURL(action){
                    return resource + '/' + action;
                }
            }

            return apiFactory;
        }];
    }
})();