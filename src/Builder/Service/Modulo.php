<?php
namespace Builder\Service;

use Singular\SingularService;
use Singular\Annotation\Service;
use Singular\Annotation\Parameter;
use Symfony\Component\Finder\Finder;


/**
 * Classe Modulo
 *
 * @Service
 *
 * @author Author <Email>
 */
class Modulo extends SingularService
{
    /**
     * Recupera a lista de módulos da aplicação.
     *
     * @param string $parent
     * @return array
     */
    public function listModulos($parent)
    {
        $app = $this->app;

        $controllers = [];

        $finder = new Finder();
        $parentDir = $app['injector.directory.src'].DIRECTORY_SEPARATOR.$parent;

        $finder
            ->files()
            ->name('*.js')
            ->in($parentDir)
            ->depth('== 1')
            ->sortByName();

        foreach ($finder as $file) {
            $moduleFile = str_replace('.js','',$file->getFilename());

            if ($file->getRelativePath() == $moduleFile) {
                $controllers[] = [
                    'name' => $moduleFile,
                    'parent' => $parent
                ];
            }
        }

        return $controllers;
    }

}