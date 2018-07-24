(function()
{
    'use strict';

    /**
     * Provedor do serviço de paginação para o Singular.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('singular').provider('$sngPaging', PagingProvider);

    /**
     * Função de definição do provedor de paginação.
     *
     * @constructor
     */
    function PagingProvider(){
        var provider = this;

        this.$get = [function(){
            function pagingFactory(){
                var Paging = {


                };

                return Paging;
            }

            return pagingFactory;
        }];
    }
})();