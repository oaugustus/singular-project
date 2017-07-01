<?php
// registra o serviço capsule
$app->register(new \Singular\Capsule\Provider\CapsuleServiceProvider(), [
    'capsule.connections' => [
        'default' => [
            'driver'    => $app['db.driver'],
            'host'      => $app['db.host'],
            'database'  => $app['db.name'],
            'username'  => $app['db.user'],
            'password'  => $app['db.pass'],
            'charset'   => $app['db.charset'],
            'collation' => $app['db.collation'],
            'prefix'    => '',
            'logging'   => false,
        ]
    ]
]);