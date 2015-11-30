<?php


    $dir=__DIR__.'/';
    require_once ($dir. '../rest/NotORM/lib.php');
    require_once ($dir. '../rest/Twig/Autoloader.php');
    Twig_Autoloader::register();
    $orm=NotORM::getInstance();
    $loader = new Twig_Loader_Filesystem($dir.'/templates/');
    $twig = new Twig_Environment($loader, array(
        '__cache' => $dir.'/cache/',
    ));


	require_once ($dir. '../rest/PHPExcel/PHPExcel.php');
    require_once ($dir. '../rest/autoload.php');
	
	
	$twig->addExtension(new MewesK\TwigExcelBundle\Twig\TwigExcelExtension());

		require_once $dir . 'filters.php';


		$d=array('data'=>array('Krisda','Numtiput','Sum','Pat'));
		file_put_contents('test.xlsx',$twig->render('excel.twig', $d));

