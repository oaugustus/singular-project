<?php

namespace Sessao\Store;

use Singular\SingularStore;
use Singular\Annotation\Service;
use Singular\Annotation\Parameter;


/**
 * Classe Componente
 *
 * @Service
 *
 * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
class Componente extends SingularStore
{
    /**
     * Tabela relacionada no banco de dados.
     *
     * @var string
     */
    protected $table = 'singular_componente';

    /**
     * Perfis de consulta.
     *
     * @var array
     */
    protected $profiles = [
        'default' => [
            'select' => ['t.*'],
            'joins' => [],
            'filters' => [],
            'groupings' => []
        ]
    ];

    /**
     * Retorna um array dos ids de todos os componentes filhos de um componente.
     *
     * @param integer $componenteId
     *
     * @return array
     */
    public function getIdFilhosComponente($componenteId)
    {
        $filhos = $this->findBy([
            'parent' => $componenteId
        ]);

        $ids = [];

        foreach ($filhos['results'] as $filho){
            $ids[] = $filho['id'];
        }

        return $ids;
    }
}