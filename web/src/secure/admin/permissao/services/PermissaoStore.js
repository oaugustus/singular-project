(function()
{
    /**
     * Serviço de store para o recurso de permissão na API.
     *
     * @author Otávio Fernandes <otavio@neton.com.br>
     */
    angular.module('admin.permissao').factory(
        'permissao.PermissaoStore',
        [
            'ui.StoreFactory',
            Service
        ]
    );

    /**
     * Função de definição do serviço.
     *
     * @param StoreFactory
     * @returns {UsuarioStore}
     * @constructor
     */
    function Service(
        StoreFactory
    ) {
        var me = StoreFactory.create('sessao', 'permissao');

        /**
         * lista as permissoes com o check
         *
         * @param {function} callback
         */
        me.listarPermissoes = function(data, callback) {
            me.call('listarPermissoes', data, function(response) {
                callback(response);
            });
        };

        /**
         * Copia as permissoes de uma função para outra.
         *
         * @param {object} data
         * @param {function} callback
         */
        me.copiaPermissoesPerfil = function(data, callback) {

            me.call('copiaPermissoesPerfil', data, function(response) {
                callback(response);
            });

        };

        return me;
    }

}());