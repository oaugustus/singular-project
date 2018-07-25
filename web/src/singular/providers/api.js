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
            function apiFactory(resource, $Filter, $Paging) {
                var _filter = null,
                    _paging = null,
                    _sort = null;

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
                     * @param {object}
                     * @type {function}
                     */
                    paginate: applyPaging,

                    /**
                     * Injeta a ordenação na chamada do método.
                     *
                     * @param {string}
                     * @type {function}
                     */
                    sort: applySort,

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

                    if (_paging) {
                        params.paging = _paging.getPaging();
                    }

                    if (_sort) {
                        params.sort = getSort(_sort);
                    }

                    var request = $http({
                        method: method.toUpperCase(),
                        url: getURL(action),
                        data: params
                    }).then(function(response){
                        if (response.status == 200) {
                            _filter = null;
                            _sort = null;

                            if (_paging) {
                                _paging.total = response.data.total;
                            }

                            return response.data;
                        }
                    });

                    return request;
                }

                /**
                 * Aplica o filtro na chamada da api.
                 *
                 * @param filter
                 * @return {Api}
                 */
                function applyFilter(filter) {
                    var f = filter || $Filter;

                    if (!f) {
                        f = {};
                    }

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
                 * @param paging
                 * @return {Api}
                 */
                function applyPaging(paging) {
                    var p = paging|| $Paging;

                    if (!p) {
                        p = {};
                    }

                    if (!p.hasOwnProperty('isPagingProvider')) {
                        _paging = $sngPaging(p);
                    } else {
                        _paging = p;
                    }

                    return Api;
                }

                /**
                 * Aplica a ordenação na chamada da api.
                 *
                 * @param strSort
                 * @return {Api}
                 */
                function applySort(strSort) {
                    _sort = strSort;

                    return Api;
                }

                /**
                 * Recupera a estrutura de ordenação da consulta.
                 *
                 * @param strSort
                 * @return {{}}
                 */
                function getSort(strSort){
                    var sort = {},
                        direction = 'ASC',
                        fields;

                    if (typeof strSort === 'string') {
                        fields = strSort.split(",");

                        angular.forEach(fields, function(field){
                            try {
                                if (field.charAt(0) == '-') {
                                    direction = 'DESC';
                                    field = field.substr(1).trim();
                                }

                                sort[field] = direction;
                            } catch(e){}
                        });
                    } else {
                        sort = strSort;
                    }

                    return sort;
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