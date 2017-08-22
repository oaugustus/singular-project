<?php
namespace Sessao\Store;

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
    protected $table = 'singular_perfil';
}