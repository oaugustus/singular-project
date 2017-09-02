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
                    'limit' => \Phinx\Db\Adapter\MysqlAdapter::INT_TINY,
                    'comment' => 'Se o registro da aplicação está ativo ou não. [1 = Ativo, 0 = Inativo]',
                    'default' => 1
                ]
            )
            ->addColumn(
                'tem_migration',
                'integer',
                [
                    'limit' => \Phinx\Db\Adapter\MysqlAdapter::INT_TINY,
                    'comment' => 'Se o registro já possui uma entrada no mecanismo de migrations. [1 = Tem, 0 = Não tem]',
                    'default' => 0
                ]
            );

        // cria a tabela
        $aplicacao->create();
    }
}
