<?php

	if (!defined('_HOOK_ERROR')) {
		// set the error reporting level for this script
		function _myErrorHandler($errno, $errstr, $errfile, $errline){
			//do nothing
		}
		define ('_HOOK_ERROR','_myErrorHandler');
		error_reporting(E_USER_ERROR | E_USER_WARNING | E_USER_NOTICE);
		set_error_handler(_HOOK_ERROR);
	}

	if(!function_exists('_cmpPath')){
		function _cmpPath($a, $b) {
			$i=(strlen($b['path'])-strlen($a['path']));
			if($i==0){
				$i=strcasecmp($b['path'],$a['path']);
			}
			return $i;
		}
	}

	if(!isset($GLOBALS['IMAGE_THUMB_SIZE'])) $GLOBALS['IMAGE_THUMB_SIZE']=96;


	///////////////////
	//CLASS FileManager
	///////////////////

	class FileManager{
		private $__Initialized=false;
		private $__IconEx=array();
		private $__VirtualFolders=array();
		private $__RootFolder='';

		static private $THAI_DAY_NAMES=array('อาทิตย์','จันทร์','อังคาร','พุธ','พฤหัสบดี','ศุกร์','เสาร์');
		static private $THAI_MONTH_NAMES=array('มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฏาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม');		
		
		static private $instance;
		static private $app;

		static $ip='';
		static $sid='';
		static $uid='';


		public static function getInstance(){
			if(!FileManager::$instance) new FileManager();
			return FileManager::$instance;
		}

		function FileManager(){
			if(!FileManager::$instance)FileManager::$instance=$this;
			//initailze site
			$this->__RootFolder=$this->getCurrentFolder();
			//register virtual folders 
			$this->__VirtualFolders=array();
			$curDir=$this->getCurrentFolder();
			$this->addVirtualFolder($curDir,'$This',1,0);
			$this->addVirtualFolder($curDir . '/file_icons','$Icons',1,0);


			$ds=$this->getDrives();
			if(is_array($ds)){
				foreach($ds as $d){
					$this->addVirtualFolder($d['drive'].'/','$'.substr($d['drive'],0,1),1,0);
				}
			}

			usort($this->__VirtualFolders,'_cmpPath');

			//register application workspace
			$_app='';
			$_sid='';
			$b=true;
			$a=true;
			if($b){
				if(isset($_GET)){
					if(isset($_GET['app'])){
						$a=false;
						$_app=$_GET['app'];
					}
					if(isset($_GET['sid'])){
						$b=false;
						$_sid=$_GET['sid'];
					}
				}
			}
			if(isset($_POST)){
				if($a){			
					if(isset($_POST['app'])){
						$a=false;
						$_app=$_POST['app'];
					}
				}
				if($b){
					if(isset($_POST['sid'])){
						$b=true;
						$_sid=$_POST['sid'];
					}
				}

			}

			//register icons
			$this->__IconExt=array();
			$this->registerIconExt('zip','rar,gzip');
			$this->registerIconExt('txt','ini');
			$this->registerIconExt('bat','php,asp,aspx,cgi');
			$this->registerIconExt('doc','rtf');
			$this->registerIconExt('mp3','wav');
			$this->registerIconExt('mdb','db,db2');
			$this->registerIconExt('jpg','gif,png,jpeg');
			$this->registerIconExt('htm','html');


			//initialize instance
			if(FileManager::$instance===$this){
				FileManager::$sid=$_sid;
				FileManager::$ip=($_SERVER['REMOTE_ADDR'])?$_SERVER['REMOTE_ADDR']:$_SERVER['REMOTE_HOST'];
				if((!empty($_app))){
					FileManager::$app=$this->deCrypt($_app);
				}
			}
			$this->__Initialized=true;
		}

		function getVariable($id){
			if(FileManager::$app){
				if(isset(FileManager::$app[$id])){
					return FileManager::$app[$id];
				}
			}
			return null;
		}
		function getVirtualFolders(){
			return $this->__VirtualFolders;
		}
		function mktime($tm=false){
			if(is_numeric($tm)){
				$tm=floatval($tm);
			}else if(is_string($tm)){
				$dt=date_parse($tm);
				$tm=false;
				if($dt && isset($dt['year'])){
					if($dt['year']>0){
						$tm=mktime($dt['hour'],$dt['minute'],$dt['second'],$dt['month'],$dt['day'],$dt['year']);
					}
				}
			}else{
				$tm=false;
			}
			return $tm;
		}

		function date($tm=0,$format=0){
			if($tm===0){
				$tm=FileManager::microtime();
			}else{
				$tm=FileManager::mktime($tm);
			}
			if(is_numeric($format)){
				switch($format){
					case 1: // 2008-12-30
						return date('Y-m-d',$tm);
						break;
					case 2: // 17:16:18
						return date('H:i:s',$tm);
						break;
					case 3: // March 10, 2001
						return date('F j, Y',$tm);
						break;
					case 4: // 30 ธันวาคม 2551
						$vo=date('Y;n;j;w',$tm);
						if($vo==false) return $vo;
						$dt=explode(';',$vo);
						return sprintf("%d %s %d",$dt[2],FileManager::$THAI_MONTH_NAMES[$dt[1]-1],$dt[0]+543);
						break;
					case 5: // 3 ธัน วาคม 2551
						$vo=date('Y;n;j;w',$tm);
						if($vo==false) return $vo;
						$dt=explode(';',$vo);
						return sprintf("%s พ.ศ. %d",FileManager::$THAI_MONTH_NAMES[$dt[1]-1],$dt[0]+543);
						break;
					case 6: // ธัน วาคม
						$vo=date('Y;n;j;w',$tm);
						if($vo==false) return $vo;
						$dt=explode(';',$vo);
						return sprintf("%s",FileManager::$THAI_MONTH_NAMES[$dt[1]-1]);
						break;
				}
				
			}else if(is_string($format)){
				$format=trim($format);
				if(!empty($format)){
					return date('Y-m-d H:i:s',$format);
				}
			}
			return date('Y-m-d H:i:s',$tm);
		}

		function microtime(){
			return microtime(true);
		}


		function Test($ini=false){
			if($ini) return ini_get_all();
			$result=array();
			$result['now']=date('Y-m-d H:i:s',time());
			$result['stream_get_meta_data']=(function_exists('stream_get_meta_data'))?'True':'False';
			$result['ShockwaveFlash']=(function_exists('swf_openfile'))?'True':'False';
			$result['SoapClient']=class_exists('SoapClient')?'True':'False';
			$result['http_support']=function_exists('http_support')?'True':'False';
			$result['HttpRequest']=(class_exists('HttpRequest'))?'True':'False';
			$result['HttpResponse']=(class_exists('HttpResponse'))?'True':'False';
			$result['DOMDocument']=(class_exists('DOMDocument'))?'True':'False';

			if(function_exists('sqlite_libversion')){
				$result['sqlite']=sqlite_libversion();
			}else{
				$result['sqlite']='False';
			}
			if(class_exists('PDO')){
				$result['pdo']=PDO::getAvailableDrivers();
			}else{
				$result['pdo']='False';
			}
			if(function_exists('gd_info')){
				$result['gd']=gd_info();
			}else{
				$result['gd']='False';
			}
			
			$result['rootDir']=$this->__RootFolder;
			$result['virtualDir']=$this->__VirtualFolders;
			return $result;
		}

		function getCurrentFolder(){
			return $this->absPath(dirname(__FILE__),false);
		}

		function setRootFolder($path){
			$path=$this->absPath($path,false);
			if(is_dir($path)){
				$this->__RootFolder=$path;
				return;
			}
			$this->__RootFolder=$this->getCurrentFolder();
		}

		function registerIconExt($ext,$exts){
			$ext=strtolower(trim($ext));
			if(empty($ext))return;

			$exts=strtolower(trim($exts));
			$ars=split(',',$exts);
			foreach($ars as $exts){
				$exts=trim($exts);
				if($exts && ($ext!=$exts)){
					$this->__IconExt[$exts]=$ext;
				}
			}
		}

		function getIconExt($ext){
			$ext=strtolower(trim($ext));
			$folder=$this->absPath('$Icons',true);
			if(!empty($folder)){
				if(!ereg('[/\]$',$folder)){
					$folder.='/';
					$folder=ereg_replace('[\]','/',$folder);
					$folder=ereg_replace('[/]{1,}','/',$folder);
				}
			}
			if(file_exists($folder . $ext)) return $ext . '.png';
			if(isset($this->__IconExt[$ext])){
				if(!empty($this->__IconExt[$ext])){
					$ext=$this->__IconExt[$ext];
				}
			}
			return ($ext . '.png');
		}

		function addVirtualFolder($path, $name='', $type=1,$visible=1){
			$filename=$this->absPath($path, false);
			if(is_dir($filename)){
				$prob = pathinfo($filename);
				if(empty($name)){
					$name=ereg_replace('[:]{1,}','',$prob['basename']);
				}
				if($name){
					$fb=false;
					foreach($this->__VirtualFolders as &$vdir){
						if(strcasecmp($vdir['name'],$name)==0){
							$vdir['path']=$filename;
							$vdir['type']=$type;
							$vdir['visible']=$visible;
							$fb=true;
							break;
						}
					}
					if(!$fb){
						$this->__VirtualFolders[]=array('path'=>$filename,'name'=>$name, 'type'=>$type, 'visible'=>$visible);
						if($this->__Initialized){
							usort($this->__VirtualFolders,_cmpPath);
						}
					}
				}
			}
		}

		function getDrives(){
			$result=array();
			$z=ord('Z');
			for($i=ord('C');$i<=$z;$i++){
				if(is_dir(chr($i).':/')){
					$result[]=array('drive'=>chr($i).':',type=>'');
				}
			}
			return $result;
		}

		function getFolderList($options=null){
			//type,filename,is_dir,isBranch,path
			//return $this->__VirtualFolders;
			$fixed=false;
			$contentType='';
			if(is_array($options)){
				if(isset($options['type'])){
					$type=trim($options['type']);
					if(!empty($type)){
						$contentType=strtolower($type);
					}
				}
			}else if(is_string($options)){
				$type=trim($options);
				if(!empty($type)){
					$contentType=strtolower($type);
				}
			}

			if($contentType=='$forms'){
				$result=array();
				$path=$this->absPath('$Forms',true);
				if(is_dir($path)){
					$home=array('filename'=>'My Forms', 'is_dir'=>1, 'is_Branch'=>1, 'path'=>'/$Forms');
					$folder=$path;
					$rs=$this->getTree($folder,3);
					if(!empty($rs)){
						$result2=array();
						if(isset($rs['children'])){
							foreach($rs['children'] as &$row){
								$result2[]=$row;
							}
						}
						$home['children']=$result2;
					}
					$result[]=$home;
				}
				return $result;
			}

			$result=array();
			if(empty($contentType) || ($contentType=='$contents')){
				$home=array('filename'=>'My Contents', 'is_dir'=>1, 'is_Branch'=>1, 'path'=>'/');
				$folder=$this->__RootFolder;
				$rs=$this->getTree($folder,3);
				if(!empty($rs)){
					$result2=array();
					if(isset($rs['children'])){
						foreach($rs['children'] as &$row){
							$result2[]=$row;
						}
					}
					$home['children']=$result2;
				}
				$result[]=$home;
				if($contentType=='$contents') return $result;
			}		

			if(empty($contentType) || ($contentType=='library')){
				if($contentType=='library') $result=array();

				foreach($this->__VirtualFolders as $vdir){
					$b=true;
					$tmp=$this->absPath($this->__RootFolder . '/' .  $vdir['name'],false);
					if(is_dir($tmp)){
						$b=false;
					}
					
					if($b &&  $vdir['visible']){
						$row=array('type'=>$vdir['type'],'filename'=>$vdir['name'], 'is_dir'=>1, 'is_Branch'=>1, 'path'=>'/'. $vdir['name']);
						$folder=$vdir['path'];
						$rs=$this->getTree($folder);
						if(isset($rs['children'])){
							$row['children']=$rs['children'];
						}
						$result[]=$row;
					}
				}
			}

			return $result;
		}


		function createFolder($foldername,$returnObject=false){
			if(!empty($foldername)){
				$path=$this->absPath($foldername,true);
				$filename=$path;
				$ars=split('/',$path);
				$path='';
				for($i=0;$i<count($ars);$i++){
					$path.=$ars[$i].'/';
					if(!is_dir($path)){
						if(!mkdir($path, 0700)){
							return false;
						}
					}
				}
				if($returnObject){
					$prob = pathinfo($filename);
					$fitem=array();
					$fitem['filename']=$prob['basename'];
					$fitem['isBranch']=1;
					$fitem['is_dir']=1;
					$fitem['path']=$this->relPath($filename);
					return $fitem;
				}
				return true;
			}
			return false;
		}

		function getDriveInfo($filename){
			$result=null;
			$filename=$this->absPath($filename,true);
			if(ereg('^.[:][/]{1,}',$filename)){
				$result=array();
				$result['drive']=substr($filename,0,2);
				$result['fee_space']=disk_free_space($result['drive']);
				$result['total_space']=disk_total_space($result['drive']);
			}
			return $result;
		}

		function getTree($folder,$maxlevel=2,$showfile=false){
			$folder=$this->absPath($folder,true);			
			if (is_dir($folder)) {
				if(empty($maxlevel)) $maxlevel=1;
				$result=array();
				$maxlevel=max(1,$maxlevel);
				$maxlevel=min(10,$maxlevel);
				$strip=dirname($folder);
				
				if(!empty($strip)) $strip.='/';
				$strip=ereg_replace('[\]','/',$strip);
				$strip=ereg_replace('[/]{1,}','/',$strip);
				$this->_getTree($folder,$result,$maxlevel,0,$showfile,$strip);
				if(!empty($result)){
					$result['basePath']=$strip;
					return $result;
				}
			}
			return null;
		}

		function getFiles($folder,$includeFolders=true,$details=false){
			$includeFiles=true;
			// filename, is_dir, isBranch, [path, cdate, mdate, size]
			$folder=$this->absPath($folder,true);
			$result=array();
			if (is_dir($folder)) {
				if ($dh = opendir($folder)) {
					$files=array();
					while (($file = readdir($dh)) !== false) {
						if(substr($file,0,1) != '.'){

							if(ereg('^[$](.{0,})[$]',$file)){
								continue;
							}
	
							$filename=$folder . "/$file";

							if(is_dir($filename)){
								if($includeFolders){
									if(!$this->_folderFilters($file)){
										continue;
									}
									if($details){
										$fitem=$this->getFileInfo($filename);
									}else{
										$fitem=array();
									}

									$fitem['filename']=$file;
									$fitem['isBranch']=1;
									$fitem['is_dir']=1;
									$fitem['path']=$this->relPath($filename);
									$result[]=$fitem;
								}
							}else{
								if($this->_fileFilters($file)){
									$files[]=$file;
								}
							}
						}
					}
					if($includeFiles){
						if(!empty($files)){
							$doc=null;
							if(class_exists('XmlClass')){
								$doc = new XmlClass();
							}
							foreach($files as $file){
								$filename=$folder . "/$file";
								if($details){
									$fitem=$this->getFileInfo($filename);
								}else{
									$fitem=array();
								}
								$fitem['filename']=$file;
								$fitem['path']=$this->relPath($filename);

								if(eregi('[.]frm$',$filename) && ($doc!=null)){
									$doc->load($filename);
									$root=$doc->documentElement();
									if($root->nodeName =='FormDesign'){
										if($root->hasAttribute('name')){
											$label=$root->getAttribute('name');
											$label=trim($label);
											if(!empty($label)){
												$fitem['filename']=$label;
											}
										}
									}
								}
								$result[]=$fitem;
							}
							unset($doc);
						}
					}
					unset($files);
					closedir($dh);
				}
				return $result;
			}
			return null;
		}

		function getFileInfo($filename){
			$filename=$this->absPath($filename,true);
			if(file_exists($filename)){
				$result=array();
				/*
				$atts = pathinfo($filename);
				
				foreach($atts as $id=>$value){
					$result[$id]=$value;
				}
				*/
				
				$result['size']=filesize($filename);
				if(is_dir($filename)){
					$result['is_dir']=1;
				}
				$result['cdate']=date('Y-m-d H:i:s',filectime($filename));
				$result['mdate']=date('Y-m-d H:i:s',filemtime($filename));
				if($this->_isImageFile($filename)){
					$zs=$this->getImageSize($filename);
					if(isset($zs['width'])){
						$result['image']=array('w'=>$zs['width'], 'h'=>$zs['height']);
					}
				}
				return $result;
			}
			return null;
		}

		function createFile($filename,$content=''){
			$filename=$this->absPath($filename,true);
			$result=false;
			if (!is_dir($filename)) {
				$handle = @fopen($filename, 'w+b');
				if($handle){
					$result=true;
					if (fwrite($handle, $content) === FALSE) {
						$result=false;
					}
					fclose($handle);
				}
			}

			return $result;
		}
		function appendFile($filename,$content){
			$filename=$this->absPath($filename,true);
			$result=false;
			if (!is_dir($filename)) {
				$handle = @fopen($filename, 'a+b');
				if($handle){
					$result=true;
					if (fwrite($handle, $content) === FALSE) {
						$result=false;
					}
					fclose($handle);
				}
			}
			return $result;
		}
		function renameFile($filename,$newname){
			$filename=$this->absPath($filename,true);
			if(is_file($filename)){
				if(!(empty($filename)||empty($newname))){
					$filename=$this->absPath($filename,true);
					$newname=$this->absPath($newname,true);
					return rename($filename,$newname);
				}
			}else{
				//if is folder
			}
			return false;
		}

		function loadFile($filename, $bytesArray=false){
			$filename=$this->absPath($filename,true);
			if(is_file($filename)){
				if($bytesArray && class_exists('ByteArray')){
					return new ByteArray(file_get_contents($filename));
				}else{
					return file_get_contents($filename);
				}
			}
			return null;
		}


		function resizeImage($filename,$destination_file,$size=96,$jpgQuality=80){
			if(!function_exists('gd_info')) return false;
				

			$filename=$this->absPath($filename,true);
			$result=false;
			$img=false;
			$img_sz = $this->getimagesize($filename);
			if($img_sz===false) return false;

			switch( $img_sz[2] ){
				case 1:
					if(function_exists('imagecreatefromgif')){
						$img=imagecreatefromgif($filename);
					}
					break;
				case 2:
					if(function_exists('imagecreatefromjpeg')){
						$img=imagecreatefromjpeg($filename);
					}
					break;
				case 3:
					if(function_exists('imagecreatefrompng')){
						$img=imagecreatefrompng($filename);
					}
					break;
				case 4:
					if(function_exists('imagecreatefromswf')){
						$img=imagecreatefromswf($filename);
					}
					break;
			}

			if($img){
				$size=(int)$size;
				if($size<16)$size=16;
				$ratio = $img_sz[0] / $img_sz[1];
				$new_width=$size;
				$new_height=(int)($new_width/$ratio); 

				if(($new_width>=$img_sz[0]) && ($new_height>=$img_sz[1])){
					return $filename;
				}

				$new_width=min($new_width,$img_sz[0]);
				$new_height=min($new_height,$img_sz[1]);

				$img_resized=null;	
				if( function_exists("imagecreatetruecolor")){
					$img_resized = imagecreatetruecolor($new_width, $new_height);
					imagecolortransparent ($img_resized,0);
				}elseif(function_exists('imagecreate')){
					$img_resized = imagecreate($new_width, $new_height);
				}

				if($img_resized){
					$res=null;
					if( function_exists("imagecopyresampled")){
						$res = imagecopyresampled($img_resized,$img,0, 0,0, 0,$new_width, $new_height,$img_sz[0], $img_sz[1]);
					}elseif(function_exists("imagecopyresized")){
						$res = imagecopyresized($img_resized,$img,0, 0,0, 0,$new_width, $new_height,$img_sz[0], $img_sz[1]);
					}
					if($res){
						if(empty($destination_file)){
							
							if(function_exists('imagepng')){
								$result=imagepng($img_resized);
							}elseif(function_exists('imagejpeg')){
								$result = imagejpeg($img_resized);
							}elseif(function_exists('imagegif')){
								$result = imagegif($img_resized);
							}
						}else{
							if(function_exists('imagepng')){
								$result = imagepng($img_resized, $destination_file);
							}elseif(function_exists('imagejpeg')){
								$result = imagejpeg($img_resized, $destination_file,$jpgQuality);
							}elseif(function_exists('imagegif')){
								$result = imagegif($img_resized, $destination_file);
							}
						}
					}
					if($img_resized) @imagedestroy($img_resized);
				}
				if($img) @imagedestroy($img);
				exit();
			}
			if($result){
				return $destination_file;
			}
			return false;
		}	

		function deleteFile($filename,$confirm=false){
			$result=false;
			$filename=$this->absPath($filename,true);
			if(is_file($filename)){
				if($confirm){
					if(unlink($filename)){
						$result=true;
					}
				}else{
					return false;
				}
			}else if(is_dir($filename)){
				$result=$this->_deleteFolder($filename,$confirm);
			}
			return $result;
		}

		function getImageSize($filename){
			if(function_exists('getimagesize')){
				$filename=$this->absPath($filename,true);
				$result=getimagesize($filename); 
				$result['width']=$ret[0];
				$result['height']=$ret[1];
				return $result;
			}
			return false;
		}
		
		function relPath($filename){
			$file=$this->absPath($filename,true);
			$i=strlen($this->__RootFolder);
			if(strncasecmp($file,$this->__RootFolder,$i)==0){
				$file=substr($file,$i);
			}

			if(ereg('[:]',$file)){
				foreach($this->__VirtualFolders as &$vdir){
					$i=strlen($vdir['path']);
					if(strncasecmp($vdir['path'],$file,$i)==0){
						$file='/'. $vdir['name'] . '/' . substr($file,$i);
						$file=ereg_replace('[/]{1,}','/',$file);
						break;
					}
				}
			}
			return $file;
		}
		
		function absPath($filename, $useVirtualDir=false){
			if(!ereg('[:]',$filename)){
				$b=false;
				if($useVirtualDir){
					$path=ereg_replace('[\]','/',$filename);
					$path=ereg_replace('[/]{1,}','/',$path);
					$ars=split('/',$path);

					if($ars[0]==''){
						array_shift($ars);
					}
					if(count($ars)>0){
						$vname=$ars[0];
						if(!is_dir($this->__RootFolder . "/$vname")){
							foreach($this->__VirtualFolders as &$vdir){
								if(strcasecmp($vdir['name'],$vname)==0){
									$path=$vdir['path'];
									$path=ereg_replace('[\]','/',$path);
									$path=ereg_replace('[/]{1,}','/',$path);
									$ars3=split('/',$path);
									array_shift($ars);
									foreach($ars as $str){
										array_push($ars3,$str);
									}
									$b=true;
									$ars=$ars3;
									$filename=implode('/',$ars);
									break;
								}
							}
						}
					}	
				}
				if(!$b){
					$filename=$this->__RootFolder . '/'. $filename;
				}
			}

			$result=realpath($filename);
			if($result===FALSE){
				$filename=ereg_replace('[\]','/',$filename);
				$filename=ereg_replace('[/]{1,}','/',$filename);
				$path=trim($filename);
				$head='';
				if(ereg(':',$path)){
					$ars=split(':',$path);
					$head=array_shift($ars);
					if(!empty($head)) $head.=':';
					$path=implode(':',$ars);
				}

				$path=ereg_replace('[\]','/',$path);
				if(!empty($head)){
					if(substr($path,0,2)=='//'){
						$head.='//';
					}else if(substr($path,0,1)=='/'){
						$head.='/';
					}
				}
				$path=ereg_replace('[\]','/',$path);
				$path=ereg_replace('[/]{1,}','/',$path);

				$ars=split('/',$path);
				$ars2=array();

				foreach($ars as $str){
					if(!empty($str)){
						switch(substr($str,0,2)){
							case '.':
								break;
							case '..':
								array_pop($ars2);
								break;
							default:
								array_push($ars2,$str);
								break;
						}
					}
				}
				$path='';
				if(!empty($ars2)){
					$path=implode('/',$ars2);
				}
				$path=$head . $path;
				$result=$path;
				
				if(!ereg('^.[:][/]{1,}',$result)){
					$result=ereg_replace('[:][/]{1,}','://',$path);
				}
			}else{
				$filename=ereg_replace('[\]','/',$result);
				$result=ereg_replace('[/]{1,}','/',$filename);
			}
			return $result;
		}

		function swapBytes($str){
			$result='';
			$n=strlen($str);
			for($i=0;$i<$n;$i++){
				//swap bytes
				$hi=substr($str,$i,1);
				$lo=substr($str,$i+1,1);
				$i++;
				if($lo!=''){
					$result.= ($lo . $hi);
				}else{
					$result.= $hi;
				}
			}
			return $result;
		}
		function swapBits($str){
			$result='';
			$n=strlen($str);			
			for($i=0;$i<$n;$i++){
				//swap bits
				$j=ord(substr($str,$i,1));
				$hi=($j & 0xf0) >> 4;
				$lo=($j & 0x0f) << 4;
				$result.=chr($hi | $lo);
	
			}
			return $result;
		}

		function deCrypt($datas=''){
			$result='';
			if(is_array($datas)){
				$datas=array_change_key_case ($datas,CASE_LOWER);
				$result=FileManager::swapBytes(base64_encode(serialize($datas)));
			}elseif(is_string($datas)){
				$result=unserialize(base64_decode(FileManager::swapBytes(trim($datas))));
			}
			return $result;
		}

		function as3UrlEncode($str){
			$str=rawurlencode($str);
			$str=ereg_replace('[\.]','%2E',$str);
			return $str;
		}

		function _deleteFolder($folder,$confirm=false){
			if(!empty($folder)){
				$folder=$this->absPath($folder,true);
				if(is_dir($folder)){
					if($confirm){
						$str1=strtolower($this->getCurrentDir());
						$str2=strtolower($folder);
						if(strstr($str1,$str2)===FALSE){
							$items = dir($folder);
							while (false !== ($item = $items->read())) {
								if(substr($item, 0, 1)!='.'){ 
									$file=$folder.'/'.$item;
									if(is_dir($file)){
										if(!$this->_deleteFolder($file,true)) return false;
									}else{
										if(!unlink($file)){
											return $false;
										}
									}
								}
							}
							$items->close();

							if(!rmdir($folder)){
								return false;
							}
							return true;
						}else{
							return false;
						}
					}else{
						return false;
					}
				}
			}
			return false;
		}

		function _isImageFile($filename){
			if(eregi('(\.jpeg|\.jpg|\.jpeg|\.gif|\.png)$',$filename)){
				return true;
			}
			return false;
		}
		
		function _fileFilters($filename){
			if(eregi('(\.bak|\.md|\.db)$',$filename)){
				return false;
			}
			return true;
		}

		function _folderFilters($filename){
			if(strtolower($filename)=='thumb'){
				return false;
			}
			return true;
		}

		function _getTree($folder,&$result,$maxlevel=2,$level=0,$showfile=false,$strip=''){
			//$folder=$this->absPath($folder,true);
			$children=null;
			if (is_dir($folder)) {
				if($level<$maxlevel){
					if ($dh = opendir($folder)) {
						$files=array();
						while (($file = readdir($dh)) !== false) {
							if(substr($file,0,1) != '.'){
								if(ereg('^[$](.{0,})[$]',$file)){
									continue;
								}

								$url=$filename;
								$filename=$folder . "/$file";
								if(is_dir($filename)){
									if(!$this->_folderFilters($file)){
										continue;
									}									
									if($children==null){
										$children=array();
									}
									$item=array();
									$this->_getTree($filename,$item,$maxlevel,$level+1,$showfile,$strip);
									$children[]=$item;
									
								}else if($showfile ){
									if($this->_fileFilters($file)){
										$files[]=$file;
									}
								}
							}
						}
						if($showfile){
							if(!empty($files)){						
								foreach($files as $file){
									$filename=$folder . "/$file";								
									if($children==null){
										$children=array();
									}

									$info = pathinfo($filename);
									$it=array();
									$it['path']=$this->relPath($filename);
									$it['filename']=$info['basename'];
									$children[]=$it;
								}
							}
						}
						unset($files);
						closedir($dh);
					}
				}
				$filename=$folder;
				$info = pathinfo($filename);
				$result['is_Branch']=1;
				$result['is_dir']=1;
				$result['path']=$this->relPath($filename);
				$result['filename']=$info['basename'];
				$result['isBranch']='true';
				if(!empty($children)){
					$result['children']=$children;
				}
			}
		}

		function fixUrl($url){
			$tmp=array('url'=>$url,'query'=>'');
			$i=strpos($url,'?');
			if(($i!==FALSE)){
				$tmp['url']=substr($url,0,$i);
				$tmp['query']=substr($url,$i);

			}
			$url=trim($tmp['url']);
			$url=eregi_replace("[\]{1,}","/",$url);
			$url=eregi_replace("/{1,}","/",$url);
			$url=eregi_replace(":/{1,}","://",$url);
			if(!empty($tmp['query'])){
				$url.=$tmp['query'];
			}
			unset($tmp);
			return $url;
		}

		function buildQueryString($vars){
			$query='';
			if(!empty($vars)){
				ksort($vars);
				foreach($vars as $id=>$value){
					$str=$id . '=' . $this->as3UrlEncode($value);
					if($query!='')$query.='&';
					$query.=$str;
				}
			}
			return $query;
		}

		function getMimeType($filename){
			$mime='';
			if($filename){
				$hdr = $this->getImageSize($filename);
				if($hdr && isset($hdr['mime'])){
						$mime=$hdr['mime'];
				}
				if(empty($mime)){
					$types=array(
						'swf'=>'application/x-shockwave-flash',
						'flv'=>'video/x-flv',
						'jpg'=>'image/jpeg',
						'jpeg'=>'image/jpeg',
						'gif'=>'image/gif',
						'png'=>'image/png',
						'bmp'=>'image/bmp',
						'mp3'=>'audio/mpeg',
						'wav'=>'audio/wav',
						'avi'=>'video/x-msvideo',
						'mpg'=>'video/mpeg',
						'wmv'=>'video/x-ms-wmv',
						'wma'=>'audio/x-ms-wma',
						'xls'=>'application/vnd.ms-excel',
						'doc'=>'application/msword',
						'ppt'=>'application/vnd.ms-powerpoint',
						'pdf'=>'application/pdf',
						'tar'=>'application/x-tar',
						'gz'=>'application/x-gzip',
						'zip'=>'application/x-zip',

						'xml'=>'text/xml',
						'htm'=>'text/html'
					);
					$ext='htm';
					$i=strrpos($filename, '.');
					if ($i !== false) {
						$ext=substr($filename,$i+1);
					}
					$ext=strtolower(trim($ext));
					if(isset($types[$ext])){
						$mime=$types[$ext];
					}
				}
				if(empty($mime)){
					$mime='text/plain';
				}
			}
			return $mime;
		}

		function _headerNotFound(){
			@ob_clean();
			header("HTTP/1.1 404 Not Found",true);
			exit();
		}

		function _headerUnauthorized(){
			@ob_clean();
			header("HTTP/1.1 401 Unauthorized",true);	
			exit();
		}

		function _accessAble($filename){
			$result=false;
			if($filename){
				$expr="^[a-zA-Z]{1}:";
				if(eregi($expr,$filename)){
					$filename=$this->relPath($filename);
					$result=!eregi($expr,$filename);
				}else{
					$result=true;
				}
			}
			return $result;
		}

		function defaultHttpHandler(){
			//calc an offset of 14 days
			$offset = 3600 * 24 * 14;	

			if(isset($_FILES)){
				if(isset($_FILES['Filedata'])){
					//move the uploaded file
					$filename=$_FILES['Filedata']['name'];
					if(isset($_POST)){
						if(isset($_POST['folder'])){
							$filename=$_POST['folder'] . '/' .$filename;
						}
					}
					$filename=$this->absPath($filename,true);
					if(move_uploaded_file($_FILES['Filedata']['tmp_name'], $filename)){
						chmod($filename, 0777);
						echo $this->relPath($filename);
					}else{
						@unlink($_FILES['Filedata']['tmp_name']);
					}
					exit();
				}
			}

			if(isset($_GET)){

				if(isset($_GET['enf'])){
					$_GET['file']=base64_decode($_GET['enf']);
				}
				if(isset($_GET['ent'])){
					$_GET['thumb']=base64_decode($_GET['ent']);
				}
				if(isset($_GET['enc'])){
					$str=$this->swapBytes(base64_decode($_GET['enc']));
					$o=array();
					parse_str($str,$o);
					foreach($o as $a=>$b){
						$_GET[$a]=$b;
					}
					unset($o);
				}
				if(isset($_GET['thumb'])){
					@ob_clean();
					$useCustomSize=false;
					$thumbFile=$_GET['thumb'];
					$tmp=strtolower($thumbFile);
					if(empty($thumbFile) || ($tmp=='null')||($tmp=='undefined')){
						$this->_headerNotFound();
					}
					if(!$this->_accessAble($thumbFile)){
						$this->_headerUnauthorized();
					}

					$preview_mode=false;
					$thumbSize=$GLOBALS['IMAGE_THUMB_SIZE'];
					if(isset($_GET['size'])){
						$value=strtolower(trim($_GET['size']));
						if($value=='preview'){
							$thumbSize=250;
							$preview_mode=true;
						}else{
							$thumbSize=(int)floatval($value);
						}
						if($thumbSize<16) $thumbSize=16;
						if($thumbSize>320) $thumbSize=320;
					}
					$thumbSize=round($thumbSize);

					if($thumbSize>$GLOBALS['IMAGE_THUMB_SIZE']){
						$useCustomSize=true;
					}
					$thumbFile=$this->absPath($thumbFile,true);



					
					if($this->_isImageFile($thumbFile)){
						$mime='image/png';
						$data=null;
						/*
						if($useCustomSize){
							$tmpfname = tempnam("/tmp", "thumb");
							$resizefile=$this->resizeImage($thumbFile,$tmpfname, $thumbSize,80);
							if((strcasecmp($resizefile,$thumbFile)==0)){
								$mime=$this->getMimeType($thumbFile);
							}
							$data=file_get_contents($resizefile);
							@unlink($tmpfname);
						}else{
							$thdb=new ContentDB('thumb_' . $thumbSize . 'x' . $thumbSize . '.db3');
							if($thdb->ready()){
								$fmt=filemtime($thumbFile);
								$mt=$thdb->contains($thumbFile);
								//create new thumb if source file was modified
								if($mt != $fmt){
									$tmpfname = tempnam("/tmp", "thumb");
									$resizefile=$this->resizeImage($thumbFile,$tmpfname, $thumbSize);
									if(!(strcasecmp($resizefile,$thumbFile)==0)){
										$thdb->addContent($tmpfname,$thumbFile,$fmt);
										$data=file_get_contents($tmpfname);
									}else{
										$mime=$this->getMimeType($thumbFile);
										$data=file_get_contents($thumbFile);
									}
									@unlink($tmpfname);
								}else{
									$data=$thdb->getContent($thumbFile);
								}
								unset ($thdb);
							}else{
								$tmpfname = tempnam("/tmp", "thumb");
								$resizefile=$this->resizeImage($thumbFile,$tmpfname, $thumbSize,70);
								$data=file_get_contents($resizefile);
								@unlink($tmpfname);
							}
						}
						*/

						$expire = "Expires: " . gmdate("D, d M Y H:i:s", time() + $offset) . " GMT";
						Header($expire);
						Header('Cache-Control: Public');
						Header('Content-Type: '. $mime);
					
						$resizefile=$this->resizeImage($thumbFile,'', $thumbSize,80);
						if(is_file($resizefile)){
							echo file_get_contents($resizefile);
						}
						exit();

						if($data){
							/*
							cache-control{
								Public - may be cached in public shared caches
								Private - may only be cached in private cache
								no-Cache - may not be cached
								no-Store - may be cached but not archived 
							}
							
							calc the string in GMT not localtime and add the offset
							*/

							$expire = "Expires: " . gmdate("D, d M Y H:i:s", time() + $offset) . " GMT";
							Header($expire);
							Header('Cache-Control: Public');
							Header('Content-Type: '. $mime);
							Header('Content-Length: '. strlen($data));
							echo $data;
						}
					}
					exit();
				}
				if(isset($_GET['file'])){
					@ob_clean();
					$filename=$this->absPath($_GET['file'],true);
					if((!file_exists($filename)) || empty($_GET['file'])){
						$this->_headerNotFound();
					}
					if(!$this->_accessAble($_GET['file'])){
						$this->_headerUnauthorized();
					}
					if(is_file($filename)){
						$totalsize=filesize($filename);
						if($fp = @fopen($filename, 'rb')){

							$expire = "Expires: " . gmdate("D, d M Y H:i:s", time() + $offset) . " GMT";
							Header($expire);
							Header('Cache-Control: Public');
							
							if(isset($_GET['download']) || isset($_GET['part'])){
								$info = pathinfo($filename);
								Header('Content-Type: application/force-download');
								if(isset($_GET['part'])){
									$bufsize=ceil(512 * 1024);
									$max_part=($bufsize * 4);
									$parts=ceil($totalsize/$max_part);
									$part=ceil($_GET['part']);
									$part=max(1,$part);
									
									if($part <= $parts){
										$pos=($max_part * ($part-1));
										$fsize=($totalsize-$pos);
										if($fsize>$max_part)$fsize=$max_part;

										if(fseek($fp,$pos,SEEK_SET)==0){
											header("Content-Length: " . $fsize);
											Header('Content-disposition: attachment; filename='. str_replace(' ','_',$info['basename']) . '.' . sprintf('%dParts.%03d',$parts,$part));
											for($i=0;$i<4;$i++){
												if($content=fread($fp,$bufsize)){
													echo $content;
												}else{
													break;
												}
											}
										}
									}
									@fclose($fp);
									exit();
								}
								Header('Content-disposition: attachment; filename='. str_replace(' ','_',$info['basename']));
							}else{
								$mime=$this->getMimeType($filename);
								if(!empty($mime)){
									Header('Content-Type: ' . $mime);
								}else{
									Header('Content-Type: application/octet-stream');
								}
							}

							Header('Content-Length: '. $totalsize);
							@fpassthru($fp);
							@fclose($fp);
						}
					}
					exit();
				}
			}
		}
	}

	
	class sqliDB  {
		/*

		sqli2:
			
		sqli3:
			
		*/

		var $handle=FALSE;
		var $filename='';

		function sqliDB($filename){
			if(!empty($filename)){
				$this->open($filename,true);
			}
		}
	    function __destruct() {
		   $this->close();
	    }
		function hasPDODriver($driver){
			$b=false;
			if(class_exists('PDO')){
				$b=in_array($driver, PDO::getAvailableDrivers());
			}
			return $b;
		}
		function isEnabled(){
			return (sqliDB::hasPDODriver('sqlite'));
		}
		function attributes(){
			if(!$this->ready()) return false;
			$attributes = array(
				"AUTOCOMMIT", "ERRMODE", "CASE", "CLIENT_VERSION", "CONNECTION_STATUS",
				"ORACLE_NULLS", "PERSISTENT", "PREFETCH", "SERVER_INFO", "SERVER_VERSION",
				"TIMEOUT"
			);
			$result=array();
			foreach ($attributes as $val) {
				$result[$val]=$this->handle->getAttribute(constant("PDO::ATTR_$val"));
			}
			return $result;
		}
		function open($filename, $create=false){
			$this->close();
			if(!class_exists('PDO')) return false;

			$b=file_exists($filename);
			if($b || $create){
				if($this->hasPDODriver('sqlite')){
					$this->handle = new PDO('sqlite:'. $filename);
				}
				if (!($this->handle===FALSE)) { 
					$this->filename=$filename;
				}
			}
			if($this->handle){
				//config sqlite
				//$this->handle->exec('PRAGMA case_sensitive_like=0');
				//$this->handle->exec('PRAGMA full_column_names=0');
				//test database
				$this->execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name LIMIT 1");
				$r=$this->errorInfo();

				if($r && isset($r[1])){
					$this->close();
				}
			}
			
			return $this->ready();
		}
		function ready(){
			return (!($this->handle===FALSE)) ;
		}
		function close($filename){
			if($this->handle) {
				unset( $this->handle);
			}
			$this->handle=FALSE;
			$this->filename=null;
		}
		function errorInfo(){
			if(!$this->ready()) return false;
			return $this->handle->errorInfo();
		}
		function beginTransaction(){
			if($this->handle) {
				$this->handle->beginTransaction();
			}
		}
		function commit(){
			if($this->handle) {
				$this->handle->commit();
			}
		}
		function rollBack(){
			if($this->handle) {
				$this->handle->rollBack();
			}
		}
		function execute($sql){
			if(!$this->ready()) return false;
			return $this->handle->exec($sql);
		}
		function &query($sql,$pdoStatement=false){
			if(!$this->ready()) return false;
			$sth = $this->handle->prepare($sql);
			if($sth){
				if($sth->execute()){
					$sth->setFetchMode(PDO::FETCH_ASSOC);
					if($pdoStatement){
						return $sth;
					}
					$result=$sth->fetchAll();
					unset($sth);
					return $result;
				}
			}
			return false;
		}
		function &prepareQuery($sql){
			if(!$this->ready()) return false;
			return $this->handle->prepare($sql);
		}
		function createDatabase($filename){
			if(!class_exists('PDO')) return false;
			if(!file_exists($filename)){
				if($this->hasPDODriver('sqlite')){
					$wnd = new PDO('sqlite:'. $filename);
					if(!($wnd===false)){
						unset($wnd);
						return true;
					}
				}
			}
			return false;
		}
		function getTables(){
			if(!$this->ready()) return false;
			$result=array();
			$sth = $this->handle->prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name");
			if($sth){
				if($sth->execute()){
					while($row=$sth->fetch(PDO::FETCH_ASSOC)){
						$result[]=strtolower($row['name']);
					}
				}
				unset($sth);
			}
			return $result;
		}
		function createTable($tablename){
			//required fields (id, date_created, date_modified)
			if(!$this->ready()) return false; 
			$tablename=strtolower(trim($tablename));
			if(!empty($tablename)){
				$this->execute("CREATE TABLE {$tablename} (id INTEGER PRIMARY KEY AUTOINCREMENT,date_created datetime DEFAULT '', date_modified datetime DEFAULT '', user_modified text COLLATE NOCASE DEFAULT '')");
				$sth = $this->handle->prepare("PRAGMA table_info('$tablename')");
				if($sth){
					if($sth->execute()){
						while($row=$sth->fetch(PDO::FETCH_ASSOC)){
							unset($sth);
							return true;
							break;
						}
					}
					unset($sth);
				}
			}
			return false;
		}
		function nextTableName(){
			$ars=$this->getTables();
			$i=1;
			$iname=sprintf('table%02d',$i);
			if(is_array($ars)){
				for(;;){
					if(!in_array($iname, $ars)){
						return $iname;
					}
					$i++;
					$iname=sprintf('table%02d',$i);
				}
			}
			return $iname;
		}
		function nextFieldName($tablename){
			$ars=$this->getFields($tablename);
			$i=1;
			$iname=sprintf('field%02d',$i);
			if(is_array($ars)){
				$ids=array();
				foreach($ars as $fd){
					$ids[]=$fd['name'];
				}
				for(;;){
					if(!in_array($iname, $ids)){
						return $iname;
					}
					$i++;
					$iname=sprintf('field%02d',$i);
				}
			}
			return $iname;
		}
		function dropTable($tablename){
			if(!$this->ready()) return false;
			$tablename=strtolower(trim($tablename));
			if($tablename){
				return $this->execute("DROP TABLE {$tablename}");
			}
			return false;
		}

		function getRsFields(&$resource){
			$result=array();
			if(is_object($resource)){
				$n=$resource->columnCount();
				if($n){
					for($i=0;$i<$n;$i++){
						$fd=$resource->getColumnMeta($i);
						$result[]=strtolower($fd['name']);
					}
				}
			}
			return $result;
		}
		function getFields($tablename){
			if(!$this->ready()) return false;
			$result=array();
			$sth = $this->handle->prepare("PRAGMA table_info('$tablename')");
			if($sth){
				if($sth->execute()){
					while($row=$sth->fetch(PDO::FETCH_ASSOC)){
						$fd=array();
						$fd['name']=strtolower($row['name']);
						$fd['type']=strtolower($row['type']);
						$fd['default']=$row['dflt_value'];
						$fd['primary_key']=($row['pk'])?1:0;
						$fd['notnull']=($row['notnull'])?1:0;
						$ty=$fd['type'];
						switch($ty){
							case 'real':
							case 'integer':
								$ty='number';
								break;
							case 'date':
							case 'time':
							case 'datetime':
								$ty='date';
								break;
							default:
								$ty='text';
						}
						$fd['_type']=$ty;
						//$fd['numeric']=($fd['_type']=='number')?1:0;
						$result[]=$fd; 
					}
				}
				unset($sth);
			}
			return $result;
		}

		function createField($tablename,$fieldname='',$fieldtype='text'){
			//fieldtype: (text | number | blob | datetime)
			if(!$this->ready()) return false;
			$result=false;
			$row=false;
			$tablename=trim(strtolower($tablename));
			$fieldname=strtolower(trim($fieldname));
			$sth = $this->handle->prepare("SELECT name FROM sqlite_master WHERE type='table' AND lower(name)=:name LIMIT 1"); 
			if($sth){				
				$sth->bindParam(':name', $tablename,PDO::PARAM_STR);
				if($sth->execute()){
					$row=$sth->fetch(PDO::FETCH_ASSOC);
				}
				unset($sth);
			}
			if($row){
				$fieldtype=strtolower(trim($fieldtype));
				$dbtype=$fieldtype;
				switch($fieldtype){
					case 'datetime':
						$dbtype="datetime DEFAULT ''";
						break;
					case 'date':
						$dbtype="date DEFAULT ''";
						break;
					case 'time':
						$dbtype="time DEFAULT ''";
						break;
					case 'real':
					case 'number':
					case 'float':
						$dbtype="real DEFAULT 0";
						break;
					case 'integer':
					case 'int':
						$dbtype="integer DEFAULT 0";
						break;
					case 'blob':
						$dbtype="blob DEFAULT NULL";
						break;
					default:
						$dbtype="text COLLATE NOCASE DEFAULT ''";
						break;
				}
				/*
				interger, real, text, blob, null

				CREATE TABLE contacts ( id INTEGER PRIMARY KEY,
				name TEXT NOT NULL COLLATE NOCASE,
				phone TEXT NOT NULL DEFAULT 'UNKNOWN',
				email TEXT NOT NULL DEFAULT

				CREATE TABLE times ( id int,
				time NOT NULL DEFAULT CURRENT_DATE
				time NOT NULL DEFAULT CURRENT_TIME,
				time NOT NULL DEFAULT CURRENT_TIMESTAMP );
				*/

				$sql="ALTER TABLE $tablename ADD COLUMN {$fieldname} {$dbtype}";
				return $this->handle->exec($sql);
			}
			return false;
		}

		function newRow($tablename, $dataFields){
			if(is_array($dataFields)){
				$l1='';
				$l2='';
				foreach($dataFields as $a=>$b){
					if($l1!=''){
						$l1.=', ';
						$l2.=', ';
					}
					$l1.=$a;
					$l2.=sprintf("'%s'",str_replace("'","''",$b));
				}
				if($l1){
					$sql="INSERT INTO {$tablename} ({$l1}) VALUES ({$l2})";
					$r=$this->execute($sql);
					return $r;
				}
			}
			return false;
		}
		function editRow($tablename, $searchFields, $dataFields){
			if($tablename && is_array($searchFields) && is_array($dataFields)){
				$l1='';
				foreach($searchFields as $a=>$b){
					if($l1!=''){
						$l1.=' AND ';
					}
					$l2=sprintf("'%s'",str_replace("'","''",$b));
					$l1.= $a . '='. $l2;
				}
				if($l1){
					$l2='';
					foreach ($dataFields as $a=>$b) {
						if($l2!='') $l2.=', ';
						$l2.=sprintf("{$a}='%s'",str_replace("'","''",$b));
					}
					$sql="UPDATE {$tablename} SET {$l2}  WHERE {$l1}";
					return $this->execute($sql);
				}
			}
			return false;
		}
		function deleteRow($tablename, $searchFields){
			if(is_array($searchFields)){
				$l1='';
				foreach($searchFields as $a=>$b){
					if($l1!=''){
						$l1.=' AND ';
					}
					$l2=sprintf("'%s'",str_replace("'","''",$b));
					$l1.= $a . '='. $l2;
					
				}
				if($l1){
					$sql="DELETE {$tablename} WHERE {$l1}";
					return $this->execute($sql);
				}
			}
			
			return false;
		}

		function dropFields($tablename,$ifields){
			$tablename=strtolower(trim($tablename));
			$fields=$this->getFields($tablename);
			if(!is_array($fields)) return false;

			$fds=array();
			if(is_array($ifields)){
				foreach($ifields as $field){
					$fds[strtolower($field)]=1;
				}
			}
			if(count($fds)<1)return false;

			$removed=false;
			$ars=array();
			$fstr='';
			foreach($fields as $field){
				if(isset($fds[$field['name']])){
					$removed=true;
					continue;
				}
				if($fstr!='')$fstr.=', ';
				$fstr.=$field['name'];
				$str=$field['name'] . ' ' . $field['type'] . ' ';
				if($field['primary_key']){
					$str.=' PRIMARY KEY AUTOINCREMENT ';
				}
				if(strtolower($field['type'])=='text'){
					$str.=' COLLATE NOCASE ';
				}
				if(isset($field['default'])){
					$str.=' DEFAULT ';
					if($field['default']==''){
						$str.="'' ";
					}else{
						$str.=$field['default'] . ' ' ;
					}
				}
				$ars[]=$str;
			}

			if(!$removed) return false;
			$qrys=array();
			$bak_tablename=$tablename.'_bakup_';

			$qrys[]="BEGIN TRANSACTION";
			
			$qrys[]="CREATE TABLE {$bak_tablename} (" . join($ars,', ') . ")";
			if($fstr!=''){
				$qrys[]="INSERT INTO {$bak_tablename} SELECT " . $fstr . " FROM {$tablename}";
			}
			
			$qrys[]="DROP TABLE {$tablename}";
			
			$qrys[]="ALTER TABLE {$bak_tablename}  RENAME TO {$tablename}";
			
			$qrys[]="COMMIT";

			return $this->execute(join($qrys,";\r"));

		}
	}

	class ContentDB  {

		var $handle=FALSE;
		var $filename='';
		var $tableName='';
		

		function ContentDB($filename){
			$this->tableName='__CONTENTS';
			$filename=trim($filename);
			if(!empty($filename)){
				$this->open($filename,true);
			}
		}
		function isEnabled(){
			return (ContentDB::hasPDODriver('sqlite') || ContentDB::hasPDODriver('sqlite2'));
		}
		function hasPDODriver($driver){
			$b=false;
			if(class_exists('PDO')){
				$b=in_array($driver, PDO::getAvailableDrivers());
			}
			return $b;
		}

		function open($filename, $create=false){
			$this->close();
			if(!class_exists('PDO')) return false;
			$b=file_exists($filename);
			if($b || $create){
				if($this->hasPDODriver('sqlite')){
					$this->handle = new PDO('sqlite:'. $filename);
				}else if($this->hasPDODriver('sqlite2')){
					$filename=eregi_replace('[.]db3$','.db2',$filename);
					$this->handle = new PDO('sqlite2:'. $filename);
				}

				if (!($this->handle===FALSE)) { 
					$this->filename=$filename;
				}
			}
			
			$result=(!($this->handle===FALSE));
			if($result){
				$table=false;
				$sth = $this->handle->prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='{$this->tableName}'");
				if($sth){
					if($sth->execute()){
						if($sth->fetch()){
							$table=true;
						}
						unset($sth);
						if(!$table){
							$sth = $this->handle->prepare("CREATE TABLE {$this->tableName} (path Text , name Text, desc Text, modified Number, content blob NOT NULL,PRIMARY KEY(path))");
							$sth->execute();
						}
					}
				}
				unset($sth);
			}

			return $result;
		}
		function ready(){
			return (!($this->handle===FALSE)) ;
		}
		function close($filename){
			if($this->handle) {
				unset( $this->handle);
			}
			$this->handle=FALSE;
			$this->filename=null;
		}

		function addContent($filename, $path='',$modified=0,$name='', $desc=''){
			if(($this->handle===FALSE)) return FALSE;
			if(file_exists($filename)){
				if(empty($path)) $path=$filename;
				$path=$this->_fixPath($path);
				$b=false;
				$sql="SELECT path FROM {$this->tableName} WHERE path=:path";
				$sth = $this->handle->prepare($sql);
				if($sth){
					$sth->bindParam(':path', $path);
					if($sth->execute()){
						if($sth->fetch(PDO::FETCH_ASSOC)){
							$b=true;
						}
					}
				}
				unset($sth);
	
				$data=file_get_contents($filename);
				if(!($data===FALSE)){
					if($modified==0){
						$modified=filemtime($filename);
					}
					if($b){
						//update
						$sql="UPDATE {$this->tableName} SET modified=:modified, name=:name, desc=:desc, content=:content WHERE path=:path";
					}else{
						//insert
						$sql="INSERT INTO {$this->tableName} (modified, path, name, desc, content) VALUES (:modified, :path, :name, :desc, :content)";
					}
					
					$sth = $this->handle->prepare($sql);
					if($sth){
						$sth->bindParam(':content', $data, PDO::PARAM_LOB);
						$sth->bindParam(':path', $path);
						$sth->bindParam(':name', $name);
						$sth->bindParam(':desc', $desc);
						$sth->bindParam(':modified', $modified);
						$sth->execute();
					}
					unset($sth);

				}
			}
			return false;
		}
		function getContent($path){
			if(($this->handle===FALSE)) return FALSE;
			$path=$this->_fixPath($path);
			$data=null;
			$sql="SELECT content FROM {$this->tableName} WHERE path=:path";
			$sth = $this->handle->prepare($sql);
			if($sth){
				$sth->bindParam(':path', $path);
				if($sth->execute()){			
					if($row=$sth->fetch(PDO::FETCH_ASSOC)){
							$data=$row['content'];
					}
				}
			}
			unset($sth);
			return $data;
		}
		function listContent(){
			if(($this->handle===FALSE)) return FALSE;
			$data=null;
			$sql="SELECT path, modified, name, desc FROM {$this->tableName} ORDER BY path"; 
			$sth = $this->handle->prepare($sql);
			if($sth){
				if($sth->execute()){
					$data=array();
					
					while($row=$sth->fetch(PDO::FETCH_ASSOC)){
						$data[]=$row;
					}
				}
			}
			unset($sth);
			return $data;
		}
		function getContentInfo($path){
			if(($this->handle===FALSE)) return FALSE;
			$data=null;
			$path=$this->_fixPath($path);
			$sql="SELECT path, name, modified, desc FROM {$this->tableName} WHERE path=:path"; 
			$sth = $this->handle->prepare($sql);
			if($sth){
				$sth->bindParam(':path', $path);
				if($sth->execute()){
					$data=array();
					while($row=$sth->fetch(PDO::FETCH_ASSOC)){
						$data=$row;
						break;
					}
				}
			}
			unset($sth);
			return $data;
		}
		function removeAll(){
			if(($this->handle===FALSE)) return FALSE;
			$sql="DELETE FROM {$this->tableName}";
			$sth = $this->handle->prepare($sql);
			if($sth) return $sth->execute();
			return false;
		}
		function deleteContent($path){
			if(($this->handle===FALSE)) return;
			$path=$this->_fixPath($path);
			$sql="DELETE FROM {$this->tableName} WHERE path=:path";
			$sth = $this->handle->prepare($sql);
			if($sth){
				$sth->bindParam(':path', $path);
				return $sth->execute();
			}
			unset($sth);
			return false;
		}
		function getLength(){
			if(($this->handle===FALSE)) return;
			$n=0;
			$sql="SELECT count(path) as rows FROM {$this->tableName}"; 
			$sth = $this->handle->prepare($sql);
			if($sth){
				if($sth->execute()){
					$data=array();
					if($row=$sth->fetch(PDO::FETCH_ASSOC)){
						$n=floatval($row['rows']);
					}
				}
			}
			unset($sth);
			return $n;
		}
		function contains($path){
			if(($this->handle===FALSE)) return;
			$path=$this->_fixPath($path);
			$b=false;
			$modified=0;
			$sql="SELECT path, modified FROM {$this->tableName} WHERE path=:path";
			$sth = $this->handle->prepare($sql);
			if($sth){
				$sth->bindParam(':path', $path);
				if($sth->execute()){
					if($row=$sth->fetch(PDO::FETCH_ASSOC)){
						$b=true;
						$modified=$row['modified'];
					}
				}
			}
			unset($sth);
			if($b){
				return $modified;
			}
			return 0;
		}
	
		function _fixPath($path){
			$path=trim($path);
			$path=ereg_replace('[\]','/',$path);
			$path=ereg_replace('[/]{1,}','/',$path);
			$path=eregi_replace('^(http:[/])','http://',$path);
			return strtolower($path);
		}
	
	    function __destruct() {
		   $this->close();
	    }
	}


	/////////////////
	//DEFAULT HANDLER
	/////////////////
	/*
	if(!class_exists('Gateway')){
		
			//@set_time_limit(0);

			$fmr=new FileManager();
			if($fmr){
				$fmr->defaultHttpHandler();
			}
			exit();

	}
	*/

?>