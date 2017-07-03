<?php
namespace Session\Store;

use Singular\SingularStore;
use Singular\Annotation\Service;
use Singular\Annotation\Parameter;


/**
 * Classe Perfil
 *
 * @Service
 *
 * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
class Perfil extends SingularStore
{
    /**
     * Classe do modelo vinculado ao store.
     *
     * @var string
     */
    protected $modelClass = 'Session\Model\Perfil';
}