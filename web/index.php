<?php
require_once __DIR__.'/../vendor/autoload.php';

date_default_timezone_set ('America/Sao_Paulo');

$app = new Singular\Application(array(
    "base_dir"=>__DIR__.'/../',
    "web_dir"=>__DIR__,
    "js_dir" => __DIR__."/src",
    "deploy_path" => __DIR__."/deploy",
    "env"=>'prod'
));

$app->run();
