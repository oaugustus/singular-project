<?php

use Phinx\Migration\AbstractMigration;

class InsereRegistrosComponentes1526327605 extends AbstractMigration
{
    /**
     * Insere os registros no banco.
     */
    public function up()
    {

        $comonentes = [
                    ];

        $this->insert('singular_componente', $comonentes);
    }

    /**
     * Excluí os registros do banco.
     */
    public function down()
    {
        $this->execute('DELETE FROM singular_componente WHERE migration = "1526327605"');
    }
}
