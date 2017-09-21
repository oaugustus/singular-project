(function()
{
    /**
     * Serviço de store para o recurso de usuário na API.
     *
     * @author Otávio Fernandes <otavio@neton.com.br>
     */
    angular.module('admin.usuario').factory(
        'usuario.UsuarioStore',
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
        var me = StoreFactory.create('sessao', 'usuario');

        /**
         * Mapa do filtro de consultas.
         *
         * @type {Object}
         * @example {
         *    id: '=',
         *    status: {
         *       property: 'en.status',
         *       operation: '=',
         *       convert: function(v){
         *          if (v > 1) {
         *              return 1;
         *          }
         *       }
         *    }
         * }
         */
        me.filterMap = {
            nome: '%',
            login: '%',
            perfil: {
                property: 'p.perfil',
                operation: '%'
            }
        };

        me.enableRowSelection = false;

        /**
         * Renderiza a propriedade ativo de um usuário.
         *
         * @param {string} status
         *
         * @return {string}
         */
        me.renderAtivo = function(status){
            switch (status) {
                case '1':
                    return 'Sim';
                break;
                case '0':
                    return 'Não';
                break;
            }
        };

        return me;
    }

}());