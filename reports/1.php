<?php 
$dir=__DIR__;
require($dir.'/../rest/autoload.php');

    $orm=NotORM::getInstance();
var_dump($orm->get_tables());
