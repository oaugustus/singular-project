(function()
{
    /**
     * Serviço de store para o recurso de usuário na API.
     *
     * @author Otávio Fernandes <otavio@neton.com.br>
     */
    angular.module('admin.usuario').factory(
        'usuario.UsuarioService',
        [
            '$sngApi',
            '$sngFilter',
            '$sngPaging',
            Service
        ]
    );

    /**
     * Função de definição do serviço.
     *
     * @param $sngApi
     * @param $sngFilter
     * @param $sngPaging
     *
     * @return {object}
     * @constructor
     */
    function Service(
        $sngApi,
        $sngFilter,
        $sngPaging
    ) {
        return {
            api: $sngApi('sessao/usuario'),
            filter: $sngFilter('src/secure/admin/usuario/views/usuario.filter.html'),
            paging: $sngPaging(),
            records: []
        }
    }

}());