<?php
use Symfony\Component\HttpFoundation\Request;

$app->before(function (Request $request) use ($app) {
    $session = $app['session']->get($app['session.name']);

    if ($session) {
        foreach ($session as $key => $value) {
            $request->request->set("session.".$key, $value);
        }
    }
});