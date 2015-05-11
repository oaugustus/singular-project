<?php
namespace Session\Controller;

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
 * Classe Session
 *
 * @Controller
 *
 * @package Session\Controller;
 */
class Session extends SingularController
{
    /**
     * Controlador que realiza a autenticação do usuário.
     *
     * @Route(method="post")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function login(Request $request)
    {
        $app = $this->app;

        $app['session.service.session']->open($request->request->all());

        return $app->json(array(
            'success' => true
        ));
    }

    /**
     * Controlador responsável por efetuar o logout do usuário.
     *
     * @Route(method="post")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function logout(Request $request)
    {
        $app = $this->app;

        $app['session.service.session']->close();

        return $app->json(array(
            'success' => true
        ));
    }
}