<?php
namespace Sessao\Store;

use Singular\SingularStore;
use Singular\Annotation\Service;
use Singular\Annotation\Parameter;


/**
 * Classe Usuario
 *
 * @Service
 *
 * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
class Usuario extends SingularStore
{
    protected $table = 'singular_usuario';
}
