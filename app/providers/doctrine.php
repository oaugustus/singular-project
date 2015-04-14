<?php
$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
    'dbs.options' => array (
        'mysql' => array(
            'driver'    => 'pdo_mysql',
            'host'      => $app["db.host"],
            'dbname'    => $app["db.name"],
            'user'      => $app["db.user"],
            'password'  => $app["db.pass"],
            'charset'   => $app["db.charset"],
        ),
        'sqlite' => array(
            'driver'   => 'pdo_sqlite',
            'path'     => __DIR__.'/../../data/app.db'
        )
    ),
));