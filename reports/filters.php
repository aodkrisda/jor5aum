<?php
$dir=__DIR__;
require($dir.'/../rest/autoload.php');

Twig_Autoloader::register();
$loaderA=new  Twig_Loader_Array(array());
$loaderB = new Twig_Loader_Filesystem($dir.'/templates/');
$loader= new Twig_Loader_Chain(array($loaderA, $loaderB));
$twig = new Twig_Environment($loader, array(
    '__cache' => $dir.'/cache/',
));

global $base_url;
$base_url = dirname("http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]");
$twig->addGlobal('base_url', $base_url);

$filter = new Twig_SimpleFilter( 'th_date', function ( $dtstr ,$format='',$inc=0) {
	$dt=strtotime($dtstr);
	if($dt){
		$dd=intval(date('j',$dt));
		$mm=intval(date('m',$dt));
		$yy=intval($d=date('Y',$dt)) + 543;
		$months=explode(',','มกราคม,กุมภาพันธ์,มีนาคม,เมษายน,พฤษภาคม,มิถุนายน,กรกฏาคม,สิงหาคม,กันยายน,ตุลาคม,พฤศจิกายน,ธันวาคม');
		$smonths=explode(',','ม.ค,ก.พ,มี.ค,เม.ย,พ.ค,มิ.ย,ก.ค,ส.ค,ก.ย,ต.ค,พ.ย,ธ.ค');
		switch(strtolower($format)){
			case 'date':
			return sprintf('%s',$dd);	
			case 'month':
			return sprintf('%s',$months[$mm-1]);
			break;
			case 'year':
				if($inc){
					$yy+=intval($inc);
				}
				return sprintf('%s',$yy);
			break;
			case 'short':
				return sprintf("%s %s %s", $dd, $smonths[$mm-1] ,$yy); 
			break;
	
		}
	    return sprintf("%s %s พ.ศ. %s", $dd, $months[$mm-1] ,$yy); 
    }
    return '';
});

$twig->addFilter($filter);
$filter = new Twig_SimpleFilter( 'user_group', function ( $id) {
	global $_GROUPS;
	if(isset($_GROUPS)){
		if(isset($_GROUPS[$id])){
			return $_GROUPS[$id];
		}
	}
	return 'กลุ่ม '.$id;
});
$twig->addFilter($filter);

$twig->addFilter($filter);
$filter = new Twig_SimpleFilter( 'user_name', function ( $id) {
	global $_USERS;
	if(isset($_USERS)){
		if(isset($_USERS[$id])){
			return $_USERS[$id];
		}
	}
	return '';
});
$twig->addFilter($filter);

$filter = new Twig_SimpleFilter( 'split', function ($id, $idx=0, $sep='/') {
	$str=$id;
	if($sep){
		$ar=explode($sep,$str);
		$idx=intval($idx);
		if(isset($ar[$idx])){
			$str=$ar[$idx];
		}
	}
	return $str;
});
$twig->addFilter($filter);

$filter = new Twig_SimpleFilter( 'xdays', function ($it) {
	$n=0;
	$str='';
	if($it){
		if(isset($it['date_ap']) && isset($it['date_received3'])){
			if($it['date_ap'] && $it['date_received3']){
				$ap=date_create($it['date_ap']);
				$rc=date_create($it['date_received3']);
				$diff=date_diff($ap,$rc);
				$n = intval($diff->y * 365.25 + $diff->m * 30 + $diff->d);
				if($n>15){
					$str='ไม่ช้า (' . $n . ' วัน)';
				}else{
					$str='ช้า (' . abs($n) . ' วัน)';
				}
			}
		}
	}
	
	return $str;
});
$twig->addFilter($filter);
$func=new Twig_SimpleFunction('getDict', function($key, $def=null){
	global $_DICT;
	if(isset($_DICT) && is_array($_DICT)){
		if(isset($_DICT[$key])){
			return $_DICT[$key];
		}
	}
	return $def;
}
);
$twig->addFunction($func);

$func=new Twig_SimpleFunction('percentOf', function($a,$b){
	$str='-';
	if($b!=0){
		$n=ceil(($a/$b) * 10000)/100;
		$str=$n;

	}
	return $str;
}
);
$twig->addFunction($func);

function printPdf(&$html, $paper='A4-L'){
	try{
		if (!defined("_MPDF_SYSTEM_TTFONTS")) { define("_MPDF_SYSTEM_TTFONTS", 'C:/Windows/Fonts/'); }
		$mpdf=new mPDF('th', $paper, '0', 'garuda');//'THNiramit'); //'THSarabun'
		$mpdf->WriteHTML($html);
		$mpdf->Output();
	}catch(Exception $e){
		echo $html;
	}
	exit();
}

function renderDocx($xfile, $data){
	if(class_exists('ZipArchive')){
		global $loaderA;
		global $twig;
		$_dir=__DIR__.'/tmp';
		@mkdir($_dir);
		$ofile=tempnam ($_dir, 'out');
		$dfile='word/document.xml';
		if(copy($xfile, $ofile)){
			$zip = new ZipArchive;
			if ($zip->open($ofile) === TRUE) {
				$html=$zip->getFromName($dfile);
				$loaderA->setTemplate('docx', $html);
				$html= $twig->render('docx', $data);
				$zip->addFromString($dfile, $html);
				$zip->close();
				$bname=basename($xfile);
				header('Content-Disposition: attachment; filename="'. $bname . '"');
				header("Content-Type: application/msword");
				echo file_get_contents($ofile);
			}
			@unlink($ofile);
			exit();
		}
	}else{
		echo 'require ZipArchive';
		exit();
	}
}