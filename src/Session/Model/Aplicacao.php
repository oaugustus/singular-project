<?php
namespace Session\Model;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Aplicacao extends Model
{
    /**
     * Nome da tabela relacionada ao modelo.
     *
     * @var string
     */
    protected $table = 'menu_aplicacao';

    /**
     * Filtra apenas as aplicações ativas.
     *
     * @param Builder $query
     *
     * @return Builder
     */
    public function scopeAtivos(Builder $query)
    {
        $query->where('ativo',1);
    }
}