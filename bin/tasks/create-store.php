<?php
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Filesystem\Filesystem;

$console
    ->register('create-store')
    ->setDefinition(array(
        new InputArgument("name",InputArgument::REQUIRED),
        new InputArgument("pack",InputArgument::REQUIRED)
        //new InputOption('some-option', null, InputOption::VALUE_NONE, 'Some help'),
    ))
    ->setDescription('Cria um novo store')
    ->setCode(function (InputInterface $input, OutputInterface $output) use ($app) {
        $fs = new Filesystem();

        $namespace = $input->getArgument("pack");

        $packDir = $app['base_dir']."/src/".ucfirst($namespace)."/";
        $ctrlDir = $packDir."Store/";

        if ($fs->exists($packDir)){
            $namespace = str_replace('/','\\',$namespace);

            $tpl = file_get_contents(__DIR__."/templates/Store.tpl");
            $tpl = str_replace('$PACKNAMESPACE', $namespace, $tpl);
            $tpl = str_replace('$SERVICE', ucfirst($input->getArgument('name')), $tpl);

            if (!$fs->exists($ctrlDir.ucfirst($input->getArgument('name')).".php")){
                //$output->write($ctrlDir.ucfirst($input->getArgument('name')));
                $fs->dumpFile($ctrlDir.ucfirst($input->getArgument('name')).".php", $tpl);

                $output->writeln("<info>O Store ".$input->getArgument("name")." foi criado com sucesso!</info>");
            } else {
                $output->writeln("<error>O Store ".$input->getArgument("name")." já existe!</error>");
            }


        } else {
            $output->writeln("<error>O pacote {$input->getArgument('pack')} não existe existe!</error>");
        }
    });
