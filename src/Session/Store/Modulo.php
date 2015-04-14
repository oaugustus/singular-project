<?php
namespace Session\Store;

use Singular\SingularStore;
use Symfony\Component\HttpFoundation\Request;
use Singular\Annotation\Service;
use Singular\Annotation\Parameter;


/**
 * Classe Modulo
 *
 * @Service
 *
 * @package Session\Store;
 */
class Modulo extends SingularStore
{
    protected $conn = 'sqlite';
    protected $table = 'modulo';

    /**
     * Recupera os módulos que um usuário possui privilégio de acesso.
     *
     * @param int $usuarioId
     * @param int $aplicacaoId
     *
     * @todo implementar restrição da listagem de módulos de acordo com a permissão de acesso do usuário.
     *
     * @return array
     */
    public function getModulosByAplicacao($usuarioId, $aplicacaoId)
    {
        $qb = $this->db->createQueryBuilder();

        $qb->select('t.*')
            ->from($this->table,'t')
            ->where('t.aplicacao_id = '.$aplicacaoId)
            ->andWhere('t.ativo = "1"')
            ->orderBy('t.ordem','ASC');

        return $this->db->fetchAll($qb->getSQL());
    }
}