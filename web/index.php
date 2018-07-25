<?php
require_once __DIR__.'/../vendor/autoload.php';

date_default_timezone_set ('America/Sao_Paulo');

error_reporting(E_ALL);
ini_set("display_errors", 1);

$app = new Singular\Application(array(
    "base_dir" =>__DIR__.'/../',
    "web_dir" =>__DIR__,
    "src_dir" => __DIR__."/src",
    "deploy_dir" => "files",
    "env" => 'prod'
));

$app->run();

return $app;