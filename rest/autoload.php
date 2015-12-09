<?php
require('db.config.php');

class Autoloader
{
	private static $registered=false;
	private static $AUTOLOAD_DIR='';
	private static $WEB_DIR='';
	private static $APP_DIR='';
	private static $CONTROLLER_DIR='';
	private static $CONTROLLER_SUBDIRS=array();

	const _PSR=array(
		'mPDF.php'=>'Pdf/mpdf.php',
		'NotORM.php'=>'NotORM/lib.php',
		'Mail.php'=>'PHPMailer/lib.php',
		'PHPMailer.php'=>'PHPMailer/lib.php'
	);

	const _PSR0 = array (
		'Twig'
	);

	const _PSR4 = array (
		'Respect/'=>'Respect/lib/' 
	);

    public static function register($prepend = false) {
		if(self::$registered===true){
			return;
		}
		if (PHP_VERSION_ID < 50300) {
			spl_autoload_register(array(__CLASS__, 'autoload'));
		} else {
			spl_autoload_register(array(__CLASS__, 'autoload'), true, $prepend);
		}
		self::$registered=true;
		
		self::$WEB_DIR=dirname(__DIR__);
		self::$AUTOLOAD_DIR=self::$WEB_DIR . '/vendor';
		self::$APP_DIR=__DIR__ . '/app';
		self::$CONTROLLER_DIR=self::$APP_DIR .'/controllers';
    }

    public static function autoload($class) {
		$ars=explode('\\', $class);
		$n=count($ars)-1;
		$_ns=false;
		if($n===0){
			if(self::_PSR0 && is_array(self::_PSR0)){
				$ars2=explode('_', $ars[0]);
				if(in_array($ars2[0], self::_PSR0)){
					$ars=$ars2;
					$n=count($ars)-1;
					$_ns=true;
				}
			}
		}
		$file=$ars[$n];
		if(strpos($file,'.php')===false){
			$ars[$n]=$file . '.php';
		}
		$is_ctl=(strpos($ars[$n], 'Controller.php')!==false);
		$file= implode('/',$ars);

		if($n==0){
			if(array_key_exists($file, self::_PSR)){
				$lib=self::$AUTOLOAD_DIR . '/'. self::_PSR[$file];
				if(is_file($lib)){
					require $lib;
					return;
				}
			}
			$lib=self::$APP_DIR. '/' .$file;
			if(is_file($lib)){
				require $lib;
				return;
			}
			if ($is_ctl) {
				$lib=self::$CONTROLLER_DIR.'/'. $file;
				if(is_file($lib)){
	    			 require $lib;
					 return;
				}else{
					foreach(self::$CONTROLLER_DIR as $fd){
	    				$lib=self::$CONTROLLER_DIR."/$fd/$file";
						if(is_file($lib)){
							require $lib;
							return;
						}
					}
				}
			}
		}

		if(is_array(self::_PSR4) && self::_PSR4){
			foreach(self::_PSR4 as $pre => $path){
				if($pre && (strpos($file, $pre)===0)){
					$file = $path . substr($file, strlen($pre));
					break;
				}
			}
		}

		$lib=self::$AUTOLOAD_DIR . '/'. $file;
		if(is_file($lib)){
			require $lib;
			return;
		}

    }
}

Autoloader::register();
