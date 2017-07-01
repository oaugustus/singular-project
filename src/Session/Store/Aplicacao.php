<?php
namespace Session\Store;

use Session\Service\Session;
use Singular\SingularStore;
use Symfony\Component\HttpFoundation\Request;
use Singular\Annotation\Service;
use Singular\Annotation\Parameter;


/**
 * Classe Aplicacao
 *
 * @Service
 *
 * @package Session\Store;
 */
class Aplicacao extends SingularStore
{
    /**
     * Recupera as aplicações que o usuário possui acesso.
     *
     * @param array $filter
     * @param array $paging
     *
     * @return array
     */
    public function filter($filter = [], $paging = [])
    {
        $aplicacao = \Session\Model\Aplicacao::class;

        return $aplicacao::ativos()->get();
    }
}