<?php

	if(!isset($_POST['case_id'])){
		echo "<p style=\"text-align:center;padding-top:45vh;color:#ee0000;font-size:2em\">ไม่สามารถแสดงรายงานออกมาได้</p>";
		exit();
	}

    require_once  'filters.php';
	$orm=NotORM::getInstance();
	$r=$orm->cases()->where('id',$_POST['case_id'])->fetch();
	if($r){
		$d=$r->toArray();
		if($d){
			/*
			$ids=json_decode($d['topic_ids']);
			if(is_array($ids)){
				$r2=$orm->topics()->where('id',$ids);
				$t=array();
				foreach($ids as $i){
					$r3=$r2[$i];
					if($r3){
						$t[]=$r3['name'];
					}
				}
				$i=count($t);
				if($i>0){
					if($i==1){
						$d['_topics']=implode('',$t);
					}else{
						$d['_topics']=implode(', ',$t);
					}
				}
			}
			*/
			$r2=$orm->users()->where('id',$d['user_id'])->fetch();
			if($r2){
				$d['_court']=preg_replace('/^ศาล/','',$r2['name']);
			}
			$r2=$orm->types()->where('id',$d['type_id'])->fetch();
			if($r2){
				$r3=$orm->groups()->where('id',$r2['group_id'])->fetch();
				$d['_type_id_name']=preg_replace('/^ความ/','',$r3['name']);
			}
		}
		$d['report_name']='พิมพ์ปกสำนวน';
		$html=$twig->render('report3.html', $d);
		$mpdf=new mPDF('th', 'A4-P', '0', 'garuda');
		$mpdf->SetImportUse(); 
		$pagecount = $mpdf->SetSourceFile('templates/cover.pdf');
		$tplIdx = $mpdf->ImportPage(1);
		$sz=$mpdf->getTemplateSize($tplIdx);
		$mpdf->SetPageTemplate($tplIdx); 
		$mpdf->addPage();
		$mpdf->WriteHTML($html);
		$mpdf->Output();

	}

