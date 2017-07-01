<?php
// registra o serviço do Twig e define o path dos templates
$app->register(new \Silex\Provider\TwigServiceProvider(), array(
    "twig.path" => $app["singular.directory.root"]."/views"
));

// adiciona a extensão do injector ao twig
$app['twig'] = $app->extend('twig', function($twig, $app) {
    $twig->addGlobal('injector', $app['injector']);

    return $twig;
});

// altera os caractéres de interpolação e de variável para compatibilidade com o angular
$app["twig"] = $app->extend("twig", function($twig, $app){
    $lexer = new Twig_Lexer($twig, array(
        "tag_variable" => array("[[","]]"),
        'interpolation' => array('#[[', ']]'),
    ));


    $twig->setLexer($lexer);

    return $twig;
});