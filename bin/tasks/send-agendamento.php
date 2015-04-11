<?php
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Filesystem\Filesystem;

date_default_timezone_set ('America/Sao_Paulo');

$console
    ->register('send-agendamento')
    ->setDefinition(array(
//        new InputArgument("name",InputArgument::REQUIRED),
//        new InputArgument("pack",InputArgument::REQUIRED)
        //new InputOption('some-option', null, InputOption::VALUE_NONE, 'Some help'),
    ))
    ->setDescription('Envia a agenda de todos os pesquisadores')
    ->setCode(function (InputInterface $input, OutputInterface $output) use ($app) {
        $pesquisas = $app['pesquisa.store.pesquisa']->listAtivas();

        foreach ($pesquisas as $pesquisa) {
            $app['pesquisa.service.agendamento']->send($pesquisa['id']);
        }

        $output->writeln("<info>Agendamento enviado!</info>");
    });
