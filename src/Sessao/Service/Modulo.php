<?php
namespace Sessao\Service;

use Singular\SingularService;
use Singular\Annotation\Service;
use Singular\Annotation\Parameter;
use Symfony\Component\HttpFoundation\Request;


/**
 * Classe Modulo
 *
 * @Service
 *
 * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
class Modulo extends SingularService
{
    /**
     * Cria e injeta o id do módulo, caso ele não seja informado para o método save.
     *
     * @param Request $request
     */
    public function injectId(Request $request)
    {
        $action = $request->attributes->get('_controller');

        if ($action == 'sessao.controller.modulo:save') {
            $id = $request->request->get('id', uniqid());
            $request->request->set('id', $id);
        }
    }
}