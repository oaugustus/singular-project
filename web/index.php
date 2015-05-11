<?php
require_once __DIR__.'/../vendor/autoload.php';

date_default_timezone_set ('America/Sao_Paulo');

$app = new Singular\Application(array(
    "base_dir"=>__DIR__.'/../',
    "web_dir"=>__DIR__,
    "src_dir" => __DIR__."/src",
    "deploy_dir" => "deploy",
    "env"=>'prod'
));

//$app->get('/', function()use($app){
//    $app['debug'] = false;
//   $app['injector']->inject('vendor');
//    $app['injector']->inject('css','css');
//    die();
//});

$app->run();
