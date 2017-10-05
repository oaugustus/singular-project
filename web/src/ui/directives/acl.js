(function()
{
    /**
     * Diretiva de Access Control List da interface.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('singular.ui').directive(
        'acl',
        [
            '$state',
            'toaster',
            Directive
        ]
    );

    /**
     * Função de definição da diretiva.
     *
     * @param $state
     * @param toaster
     * @returns {{priority: number, terminal: boolean, restrict: string, link: link}}
     * @constructor
     */
    function Directive(
        $state,
        toaster
    ) {
        return {
            priority: 1000,
            terminal: false,
            restrict: 'A',
            link: function($scope, $element, $attr) {
                var acl = window.APP.acl;

                if (acl.indexOf('|' + $attr.acl + '|') == -1) {
                    $element.remove();
                }

            }
        }
    }
}());

