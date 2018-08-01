<?php
namespace Sessao\Controller;

use Symfony\Component\HttpFoundation\Request;
use Singular\SingularController;
use Singular\Crud;
use Singular\Annotation\Controller;
use Singular\Annotation\Route;
use Singular\Annotation\Direct;
use Singular\Annotation\Value;
use Singular\Annotation\Assert;
use Singular\Annotation\Convert;
use Singular\Annotation\After;
use Singular\Annotation\Before;

/**
 * Classe Modulo
 *
 * @Controller(
 *     @Before({"sessao.service.modulo:injectId"})
 * )
 *
 * @author Author <author@email.com>
 */
class Modulo extends SingularController
{
    use Crud;

    /**
     * Defina o store padrão do controlador.
     *
     * @var $store
     */
    protected $store = 'modulo';
}