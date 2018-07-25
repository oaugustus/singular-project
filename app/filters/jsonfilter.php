<?php

use Symfony\Component\HttpFoundation\Request;

$app->before(function (Request $request) {

    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());
    }

    if ($request->getMethod() == 'OPTIONS'){
        return new \Singular\Response\JsonResponse();
    }

}, 512);