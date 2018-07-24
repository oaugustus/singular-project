(function()
{
    /**
     * Diretiva que cria um componente de paginação.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('singular').directive(
        'sngPagination',
        [
            Directive
        ]
    );

    /**
     * Função de definição da diretiva.
     *
     * @returns {Object}
     * @constructor
     */
    function Directive(
    ) {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                paging: '='
            },
            template: '<md-table-pagination md-limit="paging.limit" md-limit-options="paging.options" md-page="paging.page" md-total="paging.total" md-on-paginate="paging.onPaginate" md-page-select></md-table-pagination>',
            link: function(scope,element,attrs,ctrl, transclude){

            }
        }
    }
}());

