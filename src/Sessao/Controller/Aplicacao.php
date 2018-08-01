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
 * Classe Aplicacao
 *
 * @Controller(
 *     @Before({"sessao.service.aplicacao:injectId"})
 * )
 *
 * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
class Aplicacao extends SingularController
{
    use Crud;

    /**
     * Defina o store padrão do controlador.
     *
     * @var $store
     */
    protected $store = 'aplicacao';
}