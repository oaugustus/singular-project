(function()
{
    /**
     * Serviço de store para o recurso de usuário na API.
     *
     * @author Otávio Fernandes <otavio@neton.com.br>
     */
    angular.module('admin.usuario').factory(
        'permissao.PerfilService',
        [
            Service
        ]
    );

    /**
     * Função de definição do serviço.
     *
     * @return {object}
     * @constructor
     */
    function Service(
    ) {
        var me = {
            /**
             * Verifica de um campo foi acionado.
             *
             * @param field
             * @return {boolean}
             */
            isDirty: function(field) {
                if (field) {
                    return me.isSubmited || field.$dirty;
                }

                return false;
            }
        };

        return me;
    }

}());