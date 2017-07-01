<?php

use Phinx\Migration\AbstractMigration;

class CriaTabelaSingularAplicacao extends AbstractMigration
{
    /**
     * Cria a tabela de aplicação do singular.
     */
    public function change()
    {
        // define o nome da tabela
        $aplicacao = $this->table(
            'singular_aplicacao',
            [
                'comment' => 'Armazena os registros das aplicações do menu principal da aplicação'
            ]
        );

        // define as colunas da tabela
        $aplicacao
            ->addColumn(
                'aplicacao',
                'string',
                [
                    'limit' => 60,
                    'comment' => 'Nome da aplicação no menu'
                ]
            )
            ->addColumn(
                'ordem',
                'integer',
                [
                    'comment' => 'Ordem da aplicação no menu'
                ]
            )
            ->addColumn(
                'ativo',
                'integer',
                [
                    'comment' => 'Se o registro da aplicação está ativo ou não. [1 = Ativo, 0 = Inativo]'
                ]
            );

        // cria a tabela
        $aplicacao->create();
    }
}
