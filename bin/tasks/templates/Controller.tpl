<?php
namespace $PACKNAMESPACE\Controller;

use Singular\SingularController;
use Symfony\Component\HttpFoundation\Request;
use Singular\Annotation\Controller;
use Singular\Annotation\Route;
use Singular\Annotation\Direct;
use Singular\Annotation\Value;
use Singular\Annotation\Assert;
use Singular\Annotation\Convert;
use Singular\Annotation\After;
use Singular\Annotation\Before;

/**
 * Classe $CONTROLLER
 *
 * @Controller
 *
 * @package $PACKNAMESPACE\Controller;
 */
class $CONTROLLER extends SingularController
{

    /**
     * @Route(method="get")
     * @param Request $request
     */
    public function metodo(Request $request)
    {
        return "resposta";
    }
}