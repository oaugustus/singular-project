<?php

use Phinx\Migration\AbstractMigration;

class CriaTabelaSingularModulo extends AbstractMigration
{
    /**
     * Cria a tabela de módulos do menu.
     */
    public function change()
    {
        // define a tabela para trabalhar
        $modulo = $this->table(
            'singular_modulo',
            [
                'comment' => 'Armazena os registros dos módulos de uma aplicação no menu principal da aplicação'
            ]
        );

        // define as colunas da tabela
        $modulo
            ->addColumn(
                'aplicacao_id',
                'integer',
                [
                    'comment' => 'Relacionamento com o registro associado na tabela [singular_aplicacao] 
                    através do campo [id]'
                ]
            )
            ->addColumn(
                'modulo_id',
                'integer',
                [
                    'null' => true,
                    'comment' => 'Relacionamento com o registro associado na tabela [singular_modulo] 
                    através do campo [id]. Refere-se ao módulo pai, quando aplicável'
                ]
            )
            ->addColumn(
                'modulo',
                'string',
                [
                    'limit' => 60,
                    'comment' => 'Nome do módulo, visível no menu'
                ]
            )
            ->addColumn(
                'icon_cls',
                'string',
                [
                    'limit' => 30,
                    'comment' => 'Classe css do ícone do módulo visível no menu'
                ]
            )
            ->addColumn(
                'ui_sref',
                'string',
                [
                    'limit' => 60,
                    'comment' => 'Nome do estado ui-router do módulo'
                ]
            )
            ->addColumn(
                'ordem',
                'integer',
                [
                    'comment' => 'Ordem de exibição do módulo no submenu da aplicação'
                ]
            )
            ->addColumn(
                'ativo',
                'integer',
                [
                    'comment' => 'Se o registro do módulo está ativo ou não. [1 = Ativo, 0 = Inativo]'
                ]
            );

        // define as chaves estrangeiras da tabela
        $modulo
            ->addForeignKey(
                'aplicacao_id',
                'singular_aplicacao',
                'id',
                [
                    'delete' => 'CASCADE'
                ]
            )
            ->addForeignKey(
                'modulo_id',
                'singular_modulo',
                'id',
                [
                    'delete' => 'CASCADE'
                ]
            );

        // cria a tabela
        $modulo->create();
    }
}