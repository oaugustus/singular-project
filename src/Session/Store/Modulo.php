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
    /**
     * Recupera os módulos que um usuário possui privilégio de acesso.
     *
     * @param int $usuarioId
     * @param int $aplicacaoId
     *
     * @return array
     */
    public function getModulosByAplicacao($perfilId, $aplicacaoId)
    {
        $qb = $this->db->createQueryBuilder();

        $qb->select('t.*')
            ->from($this->table,'t')
            ->where('t.aplicacao_id = '.$aplicacaoId)
            ->andWhere('t.ativo = "1"')
            ->andWhere('t.modulo_id IS NULL')
            ->orderBy('t.ordem','ASC');

        $rs = $this->db->fetchAll($qb->getSQL());
        $modulos = array();

        foreach ($rs as $modulo){
            $modulo['modulos'] = $this->getSubModulos($modulo['id']);

            $modulos[] = $modulo;
        }

        return $modulos;
    }

    /**
     * Recupera a relação de submódulos de um determinado módulo.
     *
     * @param $moduloId
     *
     * @return array
     */
    private function getSubModulos($moduloId)
    {
        $qb = $this->db->createQueryBuilder();

        $qb->select('m.*')
            ->from($this->table,'m')
            ->where('m.modulo_id = '.$moduloId)
            ->andWhere('m.ativo = "1"')
            ->orderBy('m.ordem','ASC');

        $rs = $this->db->fetchAll($qb->getSQL());

        $modulos = array();

        foreach ($rs as $modulo) {
            $modulo['modulos'] = $this->getSubModulos($modulo['id']);
            $modulos[] = $modulo;
        }

        return $modulos;
    }
}