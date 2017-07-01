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
 * @author Author <author@email.com>
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