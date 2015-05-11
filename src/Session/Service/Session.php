<?php
namespace Session\Service;

use Singular\SingularService;
use Symfony\Component\HttpFoundation\Request;
use Singular\Annotation\Service;
use Singular\Annotation\Parameter;


/**
 * Classe Session
 *
 * @Service
 *
 * @package Session\Service;
 */
class Session extends SingularService
{
    /**
     * Abre a sessão do usuário.
     *
     * @param array $data
     */
    public function open($data)
    {
        $app = $this->app;

        $app['session']->set($app['session.name'], $data);
    }

    /**
     * Verifica se existe uma sessão aberta para o usuário.
     *
     * @return boolean
     */
    public function isOpened()
    {
        $isOpened = false;

        $app = $this->app;

        if ($app['session']->get($app['session.name'])){
            $isOpened = true;
        }

        return $isOpened;
    }

    /**
     * Fecha uma sessão aberta para o usuário.
     *
     */
    public function close()
    {
        $app = $this->app;

        $app['session']->remove($app['session.name']);

        return true;
    }

    /**
     * Injeta o id da conta do usuário na requisição.
     *
     * @param Request $request
     */
    public function injectConta(Request $request)
    {
        $app = $this->app;

        $session = $this->app['session']->get($app['session.name']);

        $request->request->set('conta_id', $session['conta_id']);
        $request->request->set('usuario_id', $session['id']);
    }
}