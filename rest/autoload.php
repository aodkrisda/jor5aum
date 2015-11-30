<?php
class Autoloader
{
	private static $registered=false;
	private static $WEB_DIR='';

	//Redirect namespace class
	const PREFIX = array (
		/* 
		'Respect/'=>'Respect/lib/' 
		'Respect/'=>'Respect/lib/' ,
		*/
	);

	//No namespace class prefix
	const _NAMESPACE = array (
		'Twig'
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
    }

    public static function autoload($class) {
		$ars=explode('\\', $class);
		$n=count($ars)-1;
		$_ns=false;
		if($n===0){
			if(self::_NAMESPACE && is_array(self::_NAMESPACE)){
				$ars2=explode('_', $ars[0]);
				if(in_array($ars2[0], self::_NAMESPACE)){
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
			$lib=self::$WEB_DIR.'/app/'. $file;
			if(is_file($lib)){
				require $lib;
				return;
			}
			if ($is_ctl) {
				$lib=self::$WEB_DIR.'/app/controllers/'. $file;
				if(is_file($lib)){
	    			 require $lib;
					 return;
				}else{
	    			$lib=__DIR__ .'/app/controllers/admin/'. $file;
					if(is_file($lib)){
						require $lib;
						return;
					}
				}
			}
		}

		if(is_array(self::PREFIX) && self::PREFIX){
			foreach(self::PREFIX as $pre => $path){
				if($pre && (strpos($file, $pre)===0)){
					$file = $path . substr($file, strlen($pre));
					break;
				}
			}
				
		}

		$lib=__DIR__ . '/'. $file;
		if(is_file($lib)){
			require $lib;
			return;
		}

    }
}

Autoloader::register();
