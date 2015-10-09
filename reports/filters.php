<?php
$filter = new Twig_SimpleFilter( 'th_date', function ( $dtstr ,$format='') {
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
				return sprintf('%s',$yy);
			break;
			case 'short':
				return sprintf("%s %s %s", $dd, $smonths[$mm-1] ,$yy-2500); 
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

