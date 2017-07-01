<?php
namespace Session\Model;

use Illuminate\Database\Eloquent\Model;

/**
 * Classe Perfil
 *
 * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
class Perfil extends Model
{
    /**
     * A tabela associada ao modelo
     *
     * @var string
     */
    protected $table = 'singular_perfil';

    /**
     * Lista dos campos que não podem ser atribuídos em massa.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * Não utiliza os campos de data e hora de criação/atualização.
     *
     * @var array
     */
    public $timestamps = false;
}