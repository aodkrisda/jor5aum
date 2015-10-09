<?php

class Informations{
	/*
	var $Host='localhost';
	var $User='root';
	var $Password='';
	var $DbName='jor5_informations';
	var $TablePrefix='info_';
	*/
  
  /*
	var $Host='localhost';
	var $User='jor5app';
	var $Password='doisuthep';
	var $DbName='jor5_informations';
	var $TablePrefix='info_';
  */

	var $Host='localhost';
	var $User='root';
	var $Password='';
	var $DbName='jor5_informations';
	var $TablePrefix='info_';
  

	function Informations(){

		//open mysql
		$this->myid= mysql_connect($this->Host, $this->User, $this->Password); 
		if($this->ready()){
			mysql_select_db ($this->DbName,$this->myid);
			mysql_query("SET NAMES UTF8", $this->myid);
		}
	}
	
	public function trace($str){
		if($str){
			$h=fopen(dirname(__FILE__) .'/debug.txt',"w+"	);
			if($h){
				fwrite($h,$str . "\r\n");
				fclose($h);
			}
		}
	}

	public function ready(){
		return ($this->myid!=null);	
	}

	private function create_definitions(){
		$sql_querys=array();
	}

	public function login($data){
		$account='?'; 
		$password='?';
		if(is_array($data)){
			$account=$data['account'];
			$password=$data['pass'];
		}



		$xtable=sprintf("`%susers`", $this->TablePrefix);
		$sql=sprintf("SELECT * FROM %s WHERE  `account`=%s AND `password`=%s LIMIT 1",$xtable,$this->quoteValue($account),$this->quoteValue($password));
		$rs=mysql_query($sql,$this->myid);
		$result=false;
		if($rs){
			$result=mysql_fetch_assoc($rs);
			if($result){
				$result['server_date']=date('Y-m-d',time());
				$this->backup_tables();
			}
		}
		return $result;
	}
	public function addUpload($data){
		$result=false;	
	
		if(isset($data["case_id"])){
			$id=$data["case_id"];
			$xtable=sprintf("`%scases`", $this->TablePrefix);
		
			if(isset($data['field']) && isset($data['file'])){
				$sql=sprintf("UPDATE %s set `%s`=%s,date_upload='%s'  WHERE  id=%d",$xtable, $data['field'],$this->quoteValue($data['file']),date('Y-m-d',time()), $id);


				mysql_query($sql,$this->myid);
			}
		}
		
		return $result;
	}	
	public function checkUpload($data){
		$result=false;	
	
		if(isset($data["user_id"])){
			$id=$data["user_id"];
			$fd=sprintf(dirname(dirname(dirname(__FILE__))) .'/documents/%d/',$id);
		
			if(isset($data['file1']) && $data['file1']){
				$fi=$fd . $data['file1'];
				if(file_exists($fi)){
					$result[]=$data['file1'];
				}
			}
			if(isset($data['file2']) && $data['file2']){
				$fi=$fd . $data['file2'];
				if(file_exists($fi)){
					$result[]=$data['file2'];
				}
			}

		}
		
		return $result;
	}		
	public function getCases($data){
		/* data {date, user_id}*/
		$result=null;


		if(isset($data['date'])|| isset($data['search'])){
			$xtable=sprintf("`%scases`", $this->TablePrefix);
			$dt=$this->getRange($data['date']);
			
			
			$q='';
			if(isset($data['search']) && is_array($data['search'])){
		
				$p=$data['search'];
				if(isset($p['date1']) && $p['date1']){
					$dt=$this->getRange($data['date1']);
					if($q) $q.=' AND ';
					$q.=sprintf('`date_sent`>=%s',$this->quoteValue($dt['date']));
				}
				if(isset($p['date2']) && $p['date2']){
					$dt=$this->getRange($data['date2']);
					if($q) $q.=' AND ';
					$q.=sprintf('`date_sent`<%s',$this->quoteValue($dt['date']));
				}				
				if(isset($p['number_black'])){
					if($q) $q.=' AND ';
					$q.=sprintf('`number_black` LIKE %s',$this->quoteValue($p['number_black'],true));
				}			
				if(isset($p['defendant'])){
					if($q) $q.=' AND ';
					$q.=sprintf('`defendant` LIKE %s',$this->quoteValue($p['defendant'],true));
				}		
				if(isset($p['plaintiff'])){
					if($q) $q.=' AND ';
					$q.=sprintf('`plaintiff` LIKE %s',$this->quoteValue($p['plaintiff'],true));
				}
				if(isset($p['title'])){
					if($q) $q.=' AND ';
					$q.=sprintf('`title` LIKE %s',$this->quoteValue($p['title'],true));
				}				
				if(isset($data['is_admin']) && ($data['is_admin']<1)){
					if($q) $q.=' AND ';
					$q.=sprintf('user_id=%d',$data['user_id']);
				}
				if($q=="")$q=' (id>0) ';							
			}
			

			if($q){
				$sql=sprintf("SELECT * FROM %s WHERE %s ORDER BY `date_sent` desc,id,`user_id` LIMIT 500",$xtable,$q);	
			}else{
				$sql=sprintf("SELECT * FROM %s WHERE `date_sent`>=%s AND `date_sent`<%s AND user_id=%d ORDER BY `date_sent` desc,id,`user_id`",$xtable,$this->quoteValue($dt['begin']),  $this->quoteValue($dt['end']),$data['user_id']);
			}
	
	


			$rs=mysql_query($sql,$this->myid);
			$result=array();
			if($rs){
				while($row = mysql_fetch_assoc($rs)){
					$result[]=$row;
				}
	
			}
		}
		return $result;
	}
	public function getTreeCases($data){
		/* data {date, user_id}*/
		$result=null;
		if(isset($data['date'])|| isset($data['search'])){
			$xtable=sprintf("`%scases`", $this->TablePrefix);
			$dt=$this->getRange($data['date']);
			
			$show_all=false;
			if(isset($data['is_admin'])){
				$show_all=(intval($data['is_admin'])>2);
			}
			
			$q='';
			if(isset($data['search']) && is_array($data['search'])){
		
				$p=$data['search'];
				if(isset($p['year1']) && $p['year1']){
					
					if($q) $q.=' AND ';
					$q.=sprintf('(YEAR(`date_finish`)>=%d)',$p['year1']);
				}
				if(isset($p['year2']) && $p['year2']){
					
					if($q) $q.=' AND ';
					$q.=sprintf('(YEAR(`date_finish`)<=%s)',$p['year2']);
				}
				
				if(isset($p['judge_id'])){
					if($q) $q.=' AND ';
					$q.=sprintf('(`judge_id` = %d)',$p['judge_id']);
				}	
				if(isset($p['judge2_id'])){
					if($q) $q.=' AND ';
					$q.=sprintf('(`judge2_id` = %d)',$p['judge2_id']);
				}	
				
				if(isset($p['number_black'])){
					if($q) $q.=' AND ';
					$q.=sprintf('(`number_black` LIKE %s)',$this->quoteValue($p['number_black'],true));
				}	
				if(isset($p['number_red'])){
					if($q) $q.=' AND ';
					$q.=sprintf('(`number_red` LIKE %s)',$this->quoteValue($p['number_red'],true));
				}	
				if(isset($p['defendant'])){
					if($q) $q.=' AND ';
					$q.=sprintf('(`defendant` LIKE %s)',$this->quoteValue($p['defendant'],true));
				}		
				if(isset($p['plaintiff'])){
					if($q) $q.=' AND ';
					$q.=sprintf('(`plaintiff` LIKE %s)',$this->quoteValue($p['plaintiff'],true));
				}
				if(isset($p['title'])){
					if($q) $q.=' AND ';
					$q.=sprintf('(`title` LIKE %s)',$this->quoteValue($p['title'],true));
				}	
				
				if(isset($p['court_id'])){
					if($q) $q.=' AND ';
					$q.=sprintf('(user_id=%d)',$p['court_id']);
				}
								
			}
			if($q=="")$q=' id>0 ';	

			$q=$q. " AND ((file1!='') OR (file2!='')) ";
			$sql=sprintf("SELECT * FROM %s WHERE %s ORDER BY `date_finish` desc LIMIT 1000",$xtable,$q);	



			$rs=mysql_query($sql,$this->myid);
			$result=array();
			if($rs){
				while($row = mysql_fetch_assoc($rs)){
					$xrow=array('id'=>$row['id'], 'label'=>$row['number_black']);
					if($show_all){
						$child=array();
						if(isset($row['file1'])){
							$f='';
							if($row['file1']){
								$f=sprintf('%d/%s',$row['user_id'],$row['file1']);
							}
							$child[]=array('icon'=>1,'data'=>'file1','file'=>$f,'label'=>'สำเนาตรวจร่าง');
						}
						if(isset($row['file2'])){
							$f='';
							if($row['file1']){
								$f=sprintf('%d/%s',$row['user_id'],$row['file2']);
							}
							$child[]=array('icon'=>2,'data'=>'file2','file'=>$f,'label'=>'สำเนาคำพิพากษา');
						}
						$xrow['children']=$child;
					}else{
						$f='';
						if($row['file2']){
							$f=sprintf('%d/%s',$row['user_id'],$row['file2']);
						}
						$xrow['data']='file2';
						$xrow['file']=$f;
						$xrow['icon']=1;
					}
					$result[]=$xrow; 
				}

			}
		}
		return $result;
	}
	public function getCase($id){
		$result=null;
		if(isset($id)){
			$xtable=sprintf("`%scases`", $this->TablePrefix);

			$sql=sprintf("SELECT * FROM %s WHERE id=%d LIMIT 1",$xtable,$id);
			$rs=mysql_query($sql,$this->myid);
			if($rs){
				$result=mysql_fetch_assoc($rs);
			}
		}
		return $result;
	}


	public function saveCase($data){
		$qrs=false;
		if($data && isset($data['user_id'])){
			$xtable=sprintf("`%scases`", $this->TablePrefix);
			if($data['number_black']){
			$sql=sprintf("SELECT *  from %s  WHERE number_black=%s ",$xtable,$this->quoteValue($data['number_black']));
			if(isset($data['id'])){
				$sql.=sprintf(" AND id!=%d", $data['id']);
			}
			if(isset($data['user_id'])){
				$sql.=sprintf(" AND user_id=%d", $data['user_id']);
			}
			$sql.=" LIMIT 1";
			$rs=mysql_query($sql,$this->myid);	



			if($rs){
				if($row=mysql_fetch_assoc($rs)){
					return array('result'=>false, 'errorString'=>"เลขคดีดำซ้ำ \n" . sprintf("%s : %s",$row['date_sent'],$row['title']));					
				}
			}
			}

			if(isset($data['id'])){
				$xid=$data['id'];
				$qrs=sprintf("UPDATE %s set date_sent=%s,date_case=%s, number_sent=%s, type_id=%d,number_black=%s,plaintiff=%s,defendant=%s,title=%s,topic_id=%d,note1=%s  WHERE  id=%d",$xtable, $this->quoteValue($data['date_sent']),$this->quoteValue($data['date_case']),$this->quoteValue($data['number_sent']),$data['type_id'],$this->quoteValue($data['number_black']),$this->quoteValue($data['plaintiff']),$this->quoteValue($data['defendant']),$this->quoteValue($data['title']),$data['topic_id'],$this->quoteValue($data['note1']), $xid);
			}else{
				$xid=0;
				$sql=sprintf("SELECT max(id) as n FROM %s",$xtable);
				$rs=mysql_query($sql,$this->myid);	
				if($rs){
					if($row=mysql_fetch_assoc($rs)){
						$xid=intval($row['n']);
					}
				}
				$xid+=1;
				$qrs=sprintf("INSERT INTO %s (id,topic_id, user_id,date_sent,date_case, number_sent, type_id,number_black,plaintiff,defendant,title,note1) VALUES(%d,%d,%d,%s,%s,%s,%d,%s,%s,%s,%s,%s)",$xtable,$xid,$data['topic_id'],$data['user_id'],$this->quoteValue($data['date_sent']),$this->quoteValue($data['date_case']),$this->quoteValue($data['number_sent']),$data['type_id'],$this->quoteValue($data['number_black']),$this->quoteValue($data['plaintiff']),$this->quoteValue($data['defendant']),$this->quoteValue($data['title']),$this->quoteValue($data['note1']));
				
			}

			if(mysql_query($qrs,$this->myid)){
				$sql=sprintf("SELECT * from %s WHERE id=%d LIMIT 1",$xtable, $xid);
				$rs=mysql_query($sql,$this->myid);	
				if($rs){
					if($row=mysql_fetch_assoc($rs)){
						return array('result'=>$row);					
					}
				}
			}

			$qrs=false;

		}
		return $qrs;
	}
	
	/*
	public function saveCase2($data){
		$qrs=false;
		if($data && isset($data['user_id'])){
			$xtable=sprintf("`%scases`", $this->TablePrefix);

			if($data['number_sent_cd']){
				$sql=sprintf("SELECT *  from %s  WHERE number_sent_cd=%s ",$xtable,$this->quoteValue($data['number_sent_cd']));
				if(isset($data['id'])){
					$sql.=sprintf(" AND id!=%d", $data['id']);
				}
				if(isset($data['user_id'])){
					$sql.=sprintf(" AND user_id!=%d", $data['user_id']);
				}
				$sql.=" LIMIT 1";
				$rs=mysql_query($sql,$this->myid);	
		
				if($rs){
					if($row=mysql_fetch_assoc($rs)){
						return array('result'=>false, 'errorString'=>"เลขที่ส่งซ้ำ \n" . sprintf("%s : %s",$row['number_black'],$row['title']));					
					}
				}
			}

			if(isset($data['id'])){
				$xid=$data['id'];
				$qrs=sprintf("UPDATE %s set imprison_id=%s,date_sent_cd=%s, number_sent_cd=%s,command=%s,date_ap=%s,judge_id=%d,accept_id=%d  WHERE  id=%d",$xtable, $this->quoteValue($data['imprison']),$this->quoteValue($data['date_sent_cd']),$this->quoteValue($data['number_sent_cd']),$this->quoteValue($data['command']),$this->quoteValue($data['date_ap']),$data['judge_id'],$data['accept'], $xid);
			}else{
				return array('result'=>false, 'errorString'=>"ขออภัยข้อมูลไม่ถูกต้อง บันทึกไม่ได้");		
			}

			if(mysql_query($qrs,$this->myid)){
				$sql=sprintf("SELECT * from %s WHERE id=%d LIMIT 1",$xtable, $xid);
				$rs=mysql_query($sql,$this->myid);	
				if($rs){
					if($row=mysql_fetch_assoc($rs)){
						return array('result'=>$row);					
					}
				}
			}

			$qrs=false;

		}
		return $qrs;
	}	
	public function saveCase3($data){
		$qrs=false;
		if($data && isset($data['user_id'])){
			$xtable=sprintf("`%scases`", $this->TablePrefix);
			if($data['number_red']){
				$sql=sprintf("SELECT *  from %s  WHERE number_red=%s ",$xtable,$this->quoteValue($data['number_red']));
				if(isset($data['id'])){
					$sql.=sprintf(" AND id!=%d", $data['id']);
				}
				if(isset($data['user_id'])){
					$sql.=sprintf(" AND user_id!=%d", $data['user_id']);
				}
				$sql.=" LIMIT 1";
				$rs=mysql_query($sql,$this->myid);	
		
				if($rs){
					if($row=mysql_fetch_assoc($rs)){
						return array('result'=>false, 'errorString'=>"เลขที่คดีแดงซ้ำ \n" . sprintf("%s : %s",$row['number_red'],$row['title']));					
					}
				}
			}

			if(isset($data['id'])){
				$xid=$data['id'];
				$qrs=sprintf("UPDATE %s set date_read=%s,date_sent_red=%s, number_sent_red=%s,number_red=%s  WHERE  id=%d",$xtable, $this->quoteValue($data['date_read']),$this->quoteValue($data['date_sent_red']),$this->quoteValue($data['number_sent_red']),$this->quoteValue($data['number_red']), $xid);
			}else{
				return array('result'=>false, 'errorString'=>"ขออภัยข้อมูลไม่ถูกต้อง บันทึกไม่ได้");		
			}

			if(mysql_query($qrs,$this->myid)){
				$sql=sprintf("SELECT * from %s WHERE id=%d LIMIT 1",$xtable, $xid);
				$rs=mysql_query($sql,$this->myid);	
				if($rs){
					if($row=mysql_fetch_assoc($rs)){
						return array('result'=>$row);					
					}
				}
			}

			$qrs=false;

		}
		return $qrs;
	}
	*/


	public function saveCaseEx($data){
		$qrs=false;

		if($data && isset($data['id'])){
			$values=array();
			$xtable=sprintf("`%scases`", $this->TablePrefix);
			
			if(isset($data['id'])){
				$xid=$data['id'];
				$template=sprintf("UPDATE %s SET %%s  WHERE  id=%d",$xtable, $xid);
		
				$fds=array(

			'date_sent'=>'date',
			'number_sent'=>'text',
			'user_id'=>'number',
			'type_id'=>'number',
			'topic_id'=>'number',
			'number_black'=>'text',
			'date_case'=>'date',
			'plaintiff'=>'text',
			'defendant'=>'text',
			'title'=>'text',

			'command_id'=>'number',
			'judge_id'=>'number',
			'imprison_id'=>'number',
			'accept_id'=>'number',
			'date_ap'=>'date',
			'date_sent2'=>'date',
			'number_sent2'=>'text',
			
			'number_red'=>'date',
			'date_read'=>'date',
			'date_sent3'=>'date',
			'number_sent3'=>'text',
				
			'result'=>'number',
			'date_received'=>'date',
			'number_received'=>'text',
			'judge2_id'=>'number',
			'judge3_id'=>'number',
			'date_received2'=>'date',
			'number_received2'=>'text',
			'date_received3'=>'date',
			'number_received3'=>'text',		
			'date_sent4'=>'date',
			'number_sent4'=>'text',
			'number_sent5'=>'text',		
			'date_sent5'=>'date',
			'number_sent4'=>'text',			
			'date_received4'=>'date',
			'number_received4'=>'text',
			'note1'=>'text',
			'note2'=>'text',
				'note3'=>'text'



				);
				

				
				foreach($data as $_a=>$_b){
					if(isset($fds[$_a])){
					
						$fval='null';
						if($_b!==null){
							switch($fds[$_a]){
								case 'date':
									if($_b){
										$fval=$this->quoteValue($_b);
									}
									break;
								case 'number':
									$fval=sprintf("%d",$_b);
									break;
								default:
									$fval=$this->quoteValue($_b);
									break;
							}
						}
						$values[]=sprintf("`%s`=%s",$_a,$fval);
					
					}
					
					
				}
				

			}
	
			if(count($values)>0){
				$values[]=sprintf("`%s`=%s",'date_modified','now()');
				$qrs=sprintf($template,implode(',',$values));

				if(mysql_query($qrs,$this->myid)){
					$sql=sprintf("SELECT * from %s WHERE id=%d LIMIT 1",$xtable, $xid);
					$rs=mysql_query($sql,$this->myid);	
					if($rs){
						if($row=mysql_fetch_assoc($rs)){
							return array('result'=>$row);	 				
						}else{
							return array('result'=>array('errorString'=>'บันทึกไม่ได้'));
						}
					}
				}
			}
			$qrs=false;
		}
		return $qrs;
	}

	public function deleteCase($data){
		$qrs=false;
		if($data && isset($data['items'])){

			$xtable=sprintf("`%scases`", $this->TablePrefix);
			$xtable2=sprintf("`%sappointments`", $this->TablePrefix);

			$xid=implode(',',$data['items']);
			$qrs=sprintf("DELETE FROM %s WHERE id IN (%s)",$xtable, $xid);
			if(mysql_query($qrs,$this->myid)){
				$qrs=sprintf("DELETE FROM %s WHERE case_id IN (%s)",$xtable2, $xid);
				mysql_query($qrs,$this->myid);
				return array('result'=>true, 'data'=>$data);
			}
		}
		return $qrs;
	}	

	public function getAppointments($id){
		$result=array();
		if(isset($id)){
			$xtable=sprintf("`%sappointments`", $this->TablePrefix);

			$sql=sprintf("SELECT * FROM %s WHERE case_id=%d order by ordering",$xtable,$id);
			$rs=mysql_query($sql,$this->myid);
			if($rs){
				while($row=mysql_fetch_assoc($rs)){
					$result[]=$row;
				}
			}
		}
		return $result;
	}
	
	public function saveAppointments($it){
		$result=false;
		if(isset($it["id"])){
			$id=$it["id"];
			$xtable=sprintf("`%sappointments`", $this->TablePrefix);
		
			$sql=sprintf("SELECT max(id) as n FROM %s ",$xtable);
			$rs=mysql_query($sql,$this->myid);
			
			$max_id=0;
			if($rs){
				if($row=mysql_fetch_assoc($rs)){
					$max_id=floatval($row["n"]);
				}
			}
			$max_id=$max_id+1;
			
			$sql=sprintf("DELETE  FROM %s WHERE case_id=%d ",$xtable,$id);
			mysql_query($sql,$this->myid);
			$idx=0;
			if(isset($it["items"])){
				foreach($it["items"] as $a){
					$idx++;
					
					$dt='null';
					if(isset($a['date_received'])){
						if($a['date_received']){
						$dt=$this->quoteValue($a['date_received']);
						}
					}
					$nu=$this->quoteValue($a['number_received']);
					
					
					
					if(isset($a['id'])){
						$sql=sprintf("INSERT INTO %s (id,case_id,name,date_sent,date_app,number_sent,mouth_number,ordering,date_received,number_received) VALUES (%d,%d,%s,%s,%s,%s,%d,%d,%s,%s)",$xtable,$a['id'],$id,$this->quoteValue($a['name']),$this->quoteValue($a['date_sent']),$this->quoteValue($a['date_app']),$this->quoteValue($a['number_sent']),$a['mouth_number'],$idx,$dt,$nu);	
					}else{
						$sql=sprintf("INSERT INTO %s (id,case_id,name,date_sent,date_app,number_sent,mouth_number,ordering,date_received,number_received) VALUES (%d,%d,%s,%s,%s,%s,%d,%d,%s,%s)",$xtable,$max_id++,$id,$this->quoteValue($a['name']),$this->quoteValue($a['date_sent']),$this->quoteValue($a['date_app']),$this->quoteValue($a['number_sent']),$a['mouth_number'],$idx,$dt,$nu);			
					}
					mysql_query($sql,$this->myid);
				
					$result[]=$sql;
				}
			}
			
		}
		
		return $result;
	}
	
	public function getAppointments2($id){
		$result=array();
		if(isset($id)){
			$xtable=sprintf("`%sappointments2`", $this->TablePrefix);

			$sql=sprintf("SELECT * FROM %s WHERE case_id=%d order by ordering",$xtable,$id);
			$rs=mysql_query($sql,$this->myid);
			if($rs){
				while($row=mysql_fetch_assoc($rs)){
					$result[]=$row;
				}
			}
		}
		return $result;
	}
	
	public function saveAppointments2($it){
		$result=false;
		if(isset($it["id"])){
			$id=$it["id"];
			$xtable=sprintf("`%sappointments2`", $this->TablePrefix);
		
			$sql=sprintf("SELECT max(id) as n FROM %s ",$xtable);
			$rs=mysql_query($sql,$this->myid);
			
			$max_id=0;
			if($rs){
				if($row=mysql_fetch_assoc($rs)){
					$max_id=floatval($row["n"]);
				}
			}
			$max_id=$max_id+1;
			
			$sql=sprintf("DELETE  FROM %s WHERE case_id=%d ",$xtable,$id);
			mysql_query($sql,$this->myid);
			$idx=0;
			if(isset($it["items"])){
				foreach($it["items"] as $a){
					$idx++;
					
					$dt='null';
					if(isset($a['date_received'])){
						if($a['date_received']){
						$dt=$this->quoteValue($a['date_received']);
						}
					}
					$nu=$this->quoteValue($a['number_received']);
					
					
					
					if(isset($a['id'])){
						$sql=sprintf("INSERT INTO %s (id,case_id,name,date_sent,date_app,date_app_time,number_sent,ordering,date_received,number_received) VALUES (%d,%d,%s,%s,%s,%s,%s,%d,%s,%s)",$xtable,$a['id'],$id,$this->quoteValue($a['name']),$this->quoteValue($a['date_sent']),$this->quoteValue($a['date_app']),$this->quoteValue($a['date_app_time']),$this->quoteValue($a['number_sent']),$idx,$dt,$nu);	
					}else{
						$sql=sprintf("INSERT INTO %s (id,case_id,name,date_sent,date_app,date_app_time,number_sent,ordering,date_received,number_received) VALUES (%d,%d,%s,%s,%s,%s,%s,%d,%s,%s)",$xtable,$max_id++,$id,$this->quoteValue($a['name']),$this->quoteValue($a['date_sent']),$this->quoteValue($a['date_app']),$this->quoteValue($a['date_app_time']),$this->quoteValue($a['number_sent']),$idx,$dt,$nu);			
					}
					mysql_query($sql,$this->myid);

					$result[]=$sql;
				}
			}
			
		}
		
		return $result;
	}
	
	
	public function getLookups(){
		$result=array();
		$xtable=sprintf("`%susers`", $this->TablePrefix);
		$sql=sprintf("SELECT id,name,admin FROM %s",$xtable);
		$result['users']=array();
		$rs=mysql_query($sql,$this->myid);	
		if($rs){
			$idx=0;
			while($row=mysql_fetch_assoc($rs)){
				$result['users'][]=$row;
			}
		}

		$xtable=sprintf("`%sgroups`", $this->TablePrefix);
		$sql=sprintf("SELECT * FROM %s",$xtable);
		$result['groups']=array();
		$rs=mysql_query($sql,$this->myid);	
		if($rs){
			while($row=mysql_fetch_assoc($rs)){
				$result['groups'][]=$row;
			}
		}

		$xtable=sprintf("`%stypes`", $this->TablePrefix);
		$sql=sprintf("SELECT * FROM %s ORDER BY group_id, name",$xtable);
		$result['types']=array();
		$rs=mysql_query($sql,$this->myid);	
		if($rs){
			while($row=mysql_fetch_assoc($rs)){
				$result['types'][]=$row;
			}
		}
		
		$xtable=sprintf("`%stopics`", $this->TablePrefix);
		$sql=sprintf("SELECT * FROM %s ORDER BY type_id, name",$xtable);
		$result['topics']=array();
		$rs=mysql_query($sql,$this->myid);	
		if($rs){
			while($row=mysql_fetch_assoc($rs)){
				$result['topics'][]=$row;
			}
		}
		$xtable=sprintf("`%simprisons`", $this->TablePrefix);
		$sql=sprintf("SELECT * FROM %s ORDER BY id, name",$xtable);
		$result['imprisons']=array();
		$rs=mysql_query($sql,$this->myid);	
		if($rs){
			while($row=mysql_fetch_assoc($rs)){
				$result['imprisons'][]=$row;
			}
		}
		$xtable=sprintf("`%saccepts`", $this->TablePrefix);
		$sql=sprintf("SELECT * FROM %s ORDER BY id, name",$xtable);
		$result['accepts']=array();
		$rs=mysql_query($sql,$this->myid);	
		if($rs){
			while($row=mysql_fetch_assoc($rs)){
				$result['accepts'][]=$row;
			}
		}
		$xtable=sprintf("`%sat`", $this->TablePrefix);
		$sql=sprintf("SELECT * FROM %s ORDER BY id, name",$xtable);
		$result['ats']=array();
		$rs=mysql_query($sql,$this->myid);	
		if($rs){
			while($row=mysql_fetch_assoc($rs)){
				$result['ats'][]=$row;
			}
		}	
		$xtable=sprintf("`%sresult`", $this->TablePrefix);
		$sql=sprintf("SELECT * FROM %s ORDER BY id, name",$xtable);
		$result['results']=array();
		$rs=mysql_query($sql,$this->myid);	
		if($rs){
			while($row=mysql_fetch_assoc($rs)){
				$result['results'][]=$row;
			}
		}				
		return $result;
	}
	public function getImprisons(){
		$result=array();
		$xtable=sprintf("`%simprisons`", $this->TablePrefix);
		$sql=sprintf("SELECT * FROM %s ORDER BY id, name",$xtable);
		$rs=mysql_query($sql,$this->myid);	
		if($rs){
			while($row=mysql_fetch_assoc($rs)){
				$result[]=$row;
			}
		}
		return $result;
	}

	function saveImprison($data){
		$qrs=false;
		if($data && isset($data['name'])){
			$xtable=sprintf("`%simprisons`", $this->TablePrefix);
			$sql=sprintf("SELECT *  from %s  WHERE name=%s",$xtable, $this->quoteValue($data['name']));
			if(isset( $data['id'])){
				$sql.=sprintf(" AND id!=%d", $data['id']);
			}

			$sql.=" LIMIT 1";
			
			$rs=mysql_query($sql,$this->myid);	
			if($rs){
				if($row=mysql_fetch_assoc($rs)){
					if(!isset($data['confirm'])){
					return array('result'=>false, 'errorString'=> sprintf("ชื่อซ้ำกับ:\n%d: %s\nบันทึกข้อมูลไม่ได้",$row['id'],$row['name']));			
					}
				}
			}

			$orow=false;
			if(isset($data['id'])){
				$xid=$data['id'];

				$sql=sprintf("SELECT * from %s WHERE id=%d",$xtable, $xid);
				$rs=mysql_query($sql,$this->myid);	
				
				if($rs){
					$orow=mysql_fetch_assoc($rs);	
				}
				$qrs=sprintf("UPDATE %s SET name=%s WHERE  id=%d",$xtable, $this->quoteValue($data['name']),$xid);
			
			}else{
				
				$xid=0;
				$sql=sprintf("SELECT max(id) as n FROM %s",$xtable);
				$rs=mysql_query($sql,$this->myid);	
				if($rs){
					if($row=mysql_fetch_assoc($rs)){
						$xid=intval($row['n']);
					}
				}
				$xid+=1;

				$qrs=sprintf("INSERT INTO %s (id,name) VALUES(%d,%s)",$xtable,$xid,$this->quoteValue($data['name']));
				
			}
			
			if(mysql_query($qrs,$this->myid)){
				
				$sql=sprintf("SELECT * from %s WHERE id=%d", $xtable,$xid);
				$rs=mysql_query($sql,$this->myid);	
				if($rs){
					if($row=mysql_fetch_assoc($rs)){
						return array('result'=>true, 'data'=>$row);					
					}
				}
			}
	

		}
		return false;
	}	

	function deleteImprison($data){
		$qrs=false;
		if($data && isset($data['id']) ){
			$xtable=sprintf("`%scases`", $this->TablePrefix);
			$xtable2=sprintf("`%simprisons`", $this->TablePrefix);
			$sql=sprintf("SELECT count(id) as n  from %s  WHERE	imprison=%d",$xtable,$data['id']);
			
			$rs=mysql_query($sql,$this->myid);	
			if($rs){
				if($row=mysql_fetch_assoc($rs)){
					if($row['n']>0){
						return array('result'=>false, 'errorString'=>"รายกานี้ มีข้อมูลรายงานลิงค์อยู่ ไม่สามารถลบได้");		
					}
				}
			}

			$xid=$data['id'];
			$qrs=sprintf("DELETE FROM %s WHERE id=%d",$xtable2,$xid);

			if(mysql_query($qrs,$this->myid)){
				return array('result'=>true, 'data'=>$data);					
			}

		}
		return $qrs;
	}
	public function getAccepts(){
		$result=array();
		$xtable=sprintf("`%saccepts`", $this->TablePrefix);
		$sql=sprintf("SELECT * FROM %s ORDER BY id, name",$xtable);
		$rs=mysql_query($sql,$this->myid);	
		if($rs){
			while($row=mysql_fetch_assoc($rs)){
				$result[]=$row;
			}
		}
		return $result;
	}

	function saveAccept($data){
		$qrs=false;
		if($data && isset($data['name'])){
			$xtable=sprintf("`%saccepts`", $this->TablePrefix);
			$sql=sprintf("SELECT *  from %s  WHERE name=%s",$xtable, $this->quoteValue($data['name']));
			if(isset( $data['id'])){
				$sql.=sprintf(" AND id!=%d", $data['id']);
			}

			$sql.=" LIMIT 1";
			
			$rs=mysql_query($sql,$this->myid);	
			if($rs){
				if($row=mysql_fetch_assoc($rs)){
					if(!isset($data['confirm'])){
					return array('result'=>false, 'errorString'=> sprintf("ชื่อซ้ำกับ:\n%d: %s\nบันทึกข้อมูลไม่ได้",$row['id'],$row['name']));			
					}
				}
			}

			$orow=false;
			if(isset($data['id'])){
				$xid=$data['id'];

				$sql=sprintf("SELECT * from %s WHERE id=%d",$xtable, $xid);
				$rs=mysql_query($sql,$this->myid);	
				
				if($rs){
					$orow=mysql_fetch_assoc($rs);	
				}
				$qrs=sprintf("UPDATE %s SET name=%s WHERE  id=%d",$xtable, $this->quoteValue($data['name']),$xid);
			
			}else{
				
				$xid=0;
				$sql=sprintf("SELECT max(id) as n FROM %s",$xtable);
				$rs=mysql_query($sql,$this->myid);	
				if($rs){
					if($row=mysql_fetch_assoc($rs)){
						$xid=intval($row['n']);
					}
				}
				$xid+=1;

				$qrs=sprintf("INSERT INTO %s (id,name) VALUES(%d,%s)",$xtable,$xid,$this->quoteValue($data['name']));
				
			}
			
			if(mysql_query($qrs,$this->myid)){
				
				$sql=sprintf("SELECT * from %s WHERE id=%d", $xtable,$xid);
				$rs=mysql_query($sql,$this->myid);	
				if($rs){
					if($row=mysql_fetch_assoc($rs)){
						return array('result'=>true, 'data'=>$row);					
					}
				}
			}
	

		}
		return false;
	}	

	function deleteAccept($data){
		$qrs=false;
		if($data && isset($data['id']) ){
			$xtable=sprintf("`%scases`", $this->TablePrefix);
			$xtable2=sprintf("`%saccepts`", $this->TablePrefix);
			$sql=sprintf("SELECT count(id) as n  from %s  WHERE	accept=%d",$xtable,$data['id']);
			
			$rs=mysql_query($sql,$this->myid);	
			if($rs){
				if($row=mysql_fetch_assoc($rs)){
					if($row['n']>0){
						return array('result'=>false, 'errorString'=>"รายกานี้ มีข้อมูลรายงานลิงค์อยู่ ไม่สามารถลบได้");		
					}
				}
			}

			$xid=$data['id'];
			$qrs=sprintf("DELETE FROM %s WHERE id=%d",$xtable2,$xid);

			if(mysql_query($qrs,$this->myid)){
				return array('result'=>true, 'data'=>$data);					
			}

		}
		return $qrs;
	}
	public function getAt(){
		$result=array();
		$xtable=sprintf("`%sat`", $this->TablePrefix);
		$sql=sprintf("SELECT * FROM %s ORDER BY id, name",$xtable);
		$rs=mysql_query($sql,$this->myid);	
		if($rs){
			while($row=mysql_fetch_assoc($rs)){
				$result[]=$row;
			}
		}
		return $result;
	}

	function saveAt($data){
		$qrs=false;
		if($data && isset($data['name'])){
			$xtable=sprintf("`%sat`", $this->TablePrefix);
			$sql=sprintf("SELECT *  from %s  WHERE name=%s",$xtable, $this->quoteValue($data['name']));
			if(isset( $data['id'])){
				$sql.=sprintf(" AND id!=%d", $data['id']);
			}

			$sql.=" LIMIT 1";
			
			$rs=mysql_query($sql,$this->myid);	
			if($rs){
				if($row=mysql_fetch_assoc($rs)){
					if(!isset($data['confirm'])){
					return array('result'=>false, 'errorString'=> sprintf("ชื่อซ้ำกับ:\n%d: %s\nบันทึกข้อมูลไม่ได้",$row['id'],$row['name']));			
					}
				}
			}

			$orow=false;
			if(isset($data['id'])){
				$xid=$data['id'];

				$sql=sprintf("SELECT * from %s WHERE id=%d",$xtable, $xid);
				$rs=mysql_query($sql,$this->myid);	
				
				if($rs){
					$orow=mysql_fetch_assoc($rs);	
				}
				$qrs=sprintf("UPDATE %s SET name=%s WHERE  id=%d",$xtable, $this->quoteValue($data['name']),$xid);
			
			}else{
				
				$xid=0;
				$sql=sprintf("SELECT max(id) as n FROM %s",$xtable);
				$rs=mysql_query($sql,$this->myid);	
				if($rs){
					if($row=mysql_fetch_assoc($rs)){
						$xid=intval($row['n']);
					}
				}
				$xid+=1;

				$qrs=sprintf("INSERT INTO %s (id,name) VALUES(%d,%s)",$xtable,$xid,$this->quoteValue($data['name']));
				
			}
			
			if(mysql_query($qrs,$this->myid)){
				
				$sql=sprintf("SELECT * from %s WHERE id=%d", $xtable,$xid);
				$rs=mysql_query($sql,$this->myid);	
				if($rs){
					if($row=mysql_fetch_assoc($rs)){
						return array('result'=>true, 'data'=>$row);					
					}
				}
			}
	

		}
		return false;
	}	

	function deleteAt($data){
		$qrs=false;
		if($data && isset($data['id']) ){
			$xtable=sprintf("`%scases`", $this->TablePrefix);
			$xtable2=sprintf("`%sat`", $this->TablePrefix);
			$sql=sprintf("SELECT count(id) as n  from %s  WHERE	command_id=%d",$xtable,$data['id']);
			
			$rs=mysql_query($sql,$this->myid);	
			if($rs){
				if($row=mysql_fetch_assoc($rs)){
					if($row['n']>0){
						return array('result'=>false, 'errorString'=>"รายกานี้ มีข้อมูลรายงานลิงค์อยู่ ไม่สามารถลบได้");		
					}
				}
			}

			$xid=$data['id'];
			$qrs=sprintf("DELETE FROM %s WHERE id=%d",$xtable2,$xid);

			if(mysql_query($qrs,$this->myid)){
				return array('result'=>true, 'data'=>$data);					
			}

		}
		return $qrs;
	}	
	public function getResult(){
		$result=array();
		$xtable=sprintf("`%sresult`", $this->TablePrefix);
		$sql=sprintf("SELECT * FROM %s ORDER BY id, name",$xtable);
		$rs=mysql_query($sql,$this->myid);	
		if($rs){
			while($row=mysql_fetch_assoc($rs)){
				$result[]=$row;
			}
		}
		return $result;
	}

	function saveResult($data){
		$qrs=false;
		if($data && isset($data['name'])){
			$xtable=sprintf("`%sresult`", $this->TablePrefix);
			$sql=sprintf("SELECT *  from %s  WHERE name=%s",$xtable, $this->quoteValue($data['name']));
			if(isset( $data['id'])){
				$sql.=sprintf(" AND id!=%d", $data['id']);
			}

			$sql.=" LIMIT 1";
			
			$rs=mysql_query($sql,$this->myid);	
			if($rs){
				if($row=mysql_fetch_assoc($rs)){
					if(!isset($data['confirm'])){
					return array('result'=>false, 'errorString'=> sprintf("ชื่อซ้ำกับ:\n%d: %s\nบันทึกข้อมูลไม่ได้",$row['id'],$row['name']));			
					}
				}
			}

			$orow=false;
			if(isset($data['id'])){
				$xid=$data['id'];

				$sql=sprintf("SELECT * from %s WHERE id=%d",$xtable, $xid);
				$rs=mysql_query($sql,$this->myid);	
				
				if($rs){
					$orow=mysql_fetch_assoc($rs);	
				}
				$qrs=sprintf("UPDATE %s SET name=%s WHERE  id=%d",$xtable, $this->quoteValue($data['name']),$xid);
			
			}else{
				
				$xid=0;
				$sql=sprintf("SELECT max(id) as n FROM %s",$xtable);
				$rs=mysql_query($sql,$this->myid);	
				if($rs){
					if($row=mysql_fetch_assoc($rs)){
						$xid=intval($row['n']);
					}
				}
				$xid+=1;

				$qrs=sprintf("INSERT INTO %s (id,name) VALUES(%d,%s)",$xtable,$xid,$this->quoteValue($data['name']));
				
			}
			
			if(mysql_query($qrs,$this->myid)){
				
				$sql=sprintf("SELECT * from %s WHERE id=%d", $xtable,$xid);
				$rs=mysql_query($sql,$this->myid);	
				if($rs){
					if($row=mysql_fetch_assoc($rs)){
						return array('result'=>true, 'data'=>$row);					
					}
				}
			}
	

		}
		return false;
	}	

	function deleteResult($data){
		$qrs=false;
		if($data && isset($data['id']) ){
			$xtable=sprintf("`%scases`", $this->TablePrefix);
			$xtable2=sprintf("`%sresult`", $this->TablePrefix);
			$sql=sprintf("SELECT count(id) as n  from %s  WHERE	result=%d",$xtable,$data['id']);
			
			$rs=mysql_query($sql,$this->myid);	
			if($rs){
				if($row=mysql_fetch_assoc($rs)){
					if($row['n']>0){
						return array('result'=>false, 'errorString'=>"รายกานี้ มีข้อมูลรายงานลิงค์อยู่ ไม่สามารถลบได้");		
					}
				}
			}

			$xid=$data['id'];
			$qrs=sprintf("DELETE FROM %s WHERE id=%d",$xtable2,$xid);

			if(mysql_query($qrs,$this->myid)){
				return array('result'=>true, 'data'=>$data);					
			}

		}
		return $qrs;
	}
	public function getUsers($parent_id=false){
		$xtable=sprintf("`%susers`", $this->TablePrefix);

		if($parent_id){
			$sql=sprintf("SELECT id,name,account,password,admin,position,parent_id FROM %s WHERE parent_id=%d",$xtable,$parent_id);
		}else{

			$sql=sprintf("SELECT id,name,account,password,admin FROM %s",$xtable);
		}

		$result=array();
		$rs=mysql_query($sql,$this->myid);	
		if($rs){
			while($row=mysql_fetch_assoc($rs)){
				$result[]=$row;
				
			}
		}
		return $result;
	}

	public function getUser($id){
		$xtable=sprintf("`%susers`", $this->TablePrefix);
		$sql=sprintf("SELECT * FROM %s WHERE id=%d LIMIT 1",$xtable,$id);
		$result=false;
		$rs=mysql_query($sql,$this->myid);	
		if($rs){
			while($row=mysql_fetch_assoc($rs)){
				$result=$row;
				break;
			}
		}
		return $result;
	}


	public function saveUser($data){
		$qrs=false;
		if($data && isset($data['account'])){
			$xtable=sprintf("`%susers`", $this->TablePrefix);
			if($data['number_black']){
			$sql=sprintf("SELECT *  from %s  WHERE account=%s",$xtable,$this->quoteValue($data['account']));
			if(isset($data['id'])){
				$sql.=sprintf(" AND id!=%d", $data['id']);
			}
			$sql.=" LIMIT 1";
			$rs=mysql_query($sql,$this->myid);	
			if($rs){
				if($row=mysql_fetch_assoc($rs)){
					return array('result'=>false, 'errorString'=>"ชื่อซ้ำกับ:\n" . sprintf("%s : %s",$row['account'],$data['name']));					
				}
			}
			}

			if(isset($data['id'])){
				$xid=$data['id'];
				if(isset($data['parent_id'])){
					$qrs=sprintf("UPDATE %s set account=%s, name=%s, password=%s,admin=%d,position=%s,parent_id=%d  WHERE  id=%d",$xtable, $this->quoteValue($data['account']),$this->quoteValue($data['name']),$this->quoteValue($data['password']), $data['admin'],$this->quoteValue($data['position']), $data['parent_id'],$xid);					
				}else{
					$qrs=sprintf("UPDATE %s set account=%s, name=%s, password=%s,admin=%d  WHERE  id=%d",$xtable, $this->quoteValue($data['account']),$this->quoteValue($data['name']),$this->quoteValue($data['password']), $data['admin'],$xid);
				}
			}else{
				$xid=0;
				$sql=sprintf("SELECT max(id) as n FROM %s",$xtable);
				$rs=mysql_query($sql,$this->myid);	
				if($rs){
					if($row=mysql_fetch_assoc($rs)){
						$xid=intval($row['n']);
					}
				}
				$xid+=1;
				if(isset($data['parent_id'])){
					$qrs=sprintf("INSERT INTO %s (id,account,password,name,admin,position,parent_id) VALUES(%d,%s,%s,%s,%d,%s,%d)",$xtable,$xid,$this->quoteValue($data['account']),$this->quoteValue($data['password']),$this->quoteValue($data['name']),$data['admin'],$this->quoteValue($data['position']),$data['parent_id']);
				}else{
					$qrs=sprintf("INSERT INTO %s (id,account,password,name,admin) VALUES(%d,%s,%s,%s,%d)",$xtable,$xid,$this->quoteValue($data['account']),$this->quoteValue($data['password']),$this->quoteValue($data['name']),$data['admin']);
			
				}
			}

			if(mysql_query($qrs,$this->myid)){
				$sql=sprintf("SELECT * from %s WHERE id=%d LIMIT 1",$xtable, $xid);
				$rs=mysql_query($sql,$this->myid);	
				if($rs){
					if($row=mysql_fetch_assoc($rs)){
						return array('result'=>true, 'data'=>$row);					
					}
				}
			}

			$qrs=false;

		}
		return $qrs;
	}

	public function deleteUser($data){
		$qrs=false;
		if($data && isset($data['id'])){
			$xtable=sprintf("`%susers`", $this->TablePrefix);
			$xtable2=sprintf("`%scases`", $this->TablePrefix);

			$sql=sprintf("SELECT count(id) as n  from %s  WHERE user_id=%d",$xtable2,$data['id']);
			
			$rs=mysql_query($sql,$this->myid);	
			if($rs){
				if($row=mysql_fetch_assoc($rs)){
					if($row['n']>0){
						return array('result'=>false, 'errorString'=>"user นี้ มีข้อมูลรายงานลิงค์อยู่ ไม่สามารถลบได้");		
					}
				}
			}

			$xid=$data['id'];
			$qrs=sprintf("DELETE FROM %s WHERE id=%d",$xtable, $xid);

			if(mysql_query($qrs,$this->myid)){
				return array('result'=>true, 'data'=>$data);
			}
		}
		return $qrs;
	}
	function getTypes(){
		$xtable=sprintf("`%stypes`", $this->TablePrefix);
		$sql=sprintf("SELECT * FROM %s ORDER BY group_id, name",$xtable);
		$result=array('groups'=>array(),'types'=>array());
		$rs=mysql_query($sql,$this->myid);	
		if($rs){
			while($row=mysql_fetch_assoc($rs)){
				$result['types'][]=$row;
				
			}
		}

		$xtable=sprintf("`%sgroups`", $this->TablePrefix);
		$sql=sprintf("SELECT * FROM %s",$xtable);
		$rs=mysql_query($sql,$this->myid);	
		if($rs){
			while($row=mysql_fetch_assoc($rs)){
				$result['groups'][]=$row;
				
			}
		}
		return $result;
	}
	function saveType($data){
		$qrs=false;
		if($data && isset($data['name'])){
			$xtable=sprintf("`%stypes`", $this->TablePrefix);
			$sql=sprintf("SELECT *  from %s  WHERE name=%s",$xtable, $this->quoteValue($data['name']));
			if(isset($data['id'])){
				$sql.=sprintf(" AND id!=%d", $data['id']);
			}
			if(isset($data['group_id'])){
				$sql.=sprintf(" AND group_id!=%d", $data['group_id']);
			}
			$sql.=" LIMIT 1";
			$rs=mysql_query($sql,$this->myid);	
			if($rs){
				if($row=mysql_fetch_assoc($rs)){
					if(!isset($data['confirm'])){
					return array('result'=>false, 'errorString'=> sprintf("รหัสซ้ำกับ:\n%d: %s\nต้องการบันทึกข้อมูลหรือไม่?",$row['id'],$row['name']));			
					}
				}
			}
			
			$orow=false;
			if(isset($data['id'])){
				$xid=$data['id'];

				$sql=sprintf("SELECT * from %s WHERE id=%d",$xtable, $xid);
				$rs=mysql_query($sql,$this->myid);	
				
				if($rs){
					$orow=mysql_fetch_assoc($rs);	
				}
				$qrs=sprintf("UPDATE %s set name=%s,group_id=%d WHERE  id=%d",$xtable, $this->quoteValue($data['name']),$data['group_id'],$xid);
			}else{
				$xid=0;
				$sql=sprintf("SELECT max(id) as n FROM %s",$xtable);
				$rs=mysql_query($sql,$this->myid);	
				if($rs){
					if($row=mysql_fetch_assoc($rs)){
						$xid=intval($row['n']);
					}
				}
				$xid+=1;

				$qrs=sprintf("INSERT INTO %s (id,name,group_id) VALUES(%d,%s,%d)",$xtable,$xid,$this->quoteValue($data['name']),$data['group_id']);
			}
			if(mysql_query($qrs,$this->myid)){
				$sql=sprintf("SELECT * from %s WHERE id=%d", $xtable,$xid);
				$rs=mysql_query($sql,$this->myid);	
				if($rs){
					if($row=mysql_fetch_assoc($rs)){
						return array('result'=>true, 'data'=>$row);					
					}
				}
			}

		}
		return $qrs;
	}

	function deleteType($data){
		$qrs=false;
		if($data && isset($data['id']) ){
			$xtable=sprintf("`%scases`", $this->TablePrefix);
			$xtable2=sprintf("`%stypes`", $this->TablePrefix);
			$sql=sprintf("SELECT count(id) as n  from %s  WHERE type_id=%d",$xtable,$data['id']);
			
			$rs=mysql_query($sql,$this->myid);	
			if($rs){
				if($row=mysql_fetch_assoc($rs)){
					if($row['n']>0){
						return array('result'=>false, 'errorString'=>"รายกานี้ มีข้อมูลรายงานลิงค์อยู่ ไม่สามารถลบได้");		
					}
				}
			}

			$xid=$data['id'];
			$qrs=sprintf("DELETE FROM %s WHERE id=%d",$xtable2,$xid);

			if(mysql_query($qrs,$this->myid)){
				return array('result'=>true, 'data'=>$data);					
			}

		}
		return $qrs;
	}
	function getTopics(){
		$xtable=sprintf("`%stopics`", $this->TablePrefix);
		$sql=sprintf("SELECT * FROM %s ORDER BY type_id, name",$xtable);
		$result=array('topics'=>array(),'types'=>array());
		$rs=mysql_query($sql,$this->myid);	
		if($rs){
			while($row=mysql_fetch_assoc($rs)){
				$result['topics'][]=$row;
				
			}
		}

		$xtable=sprintf("`%stypes`", $this->TablePrefix);
		$sql=sprintf("SELECT * FROM %s",$xtable);
		$rs=mysql_query($sql,$this->myid);	
		if($rs){
			while($row=mysql_fetch_assoc($rs)){
				$result['types'][]=$row;
				
			}
		}
		return $result;
	}

	function saveTopic($data){
		$qrs=false;
		if($data && isset($data['name'])){
			$xtable=sprintf("`%stopics`", $this->TablePrefix);
			$sql=sprintf("SELECT *  from %s  WHERE code=%s",$xtable, $this->quoteValue($data['code']));
			if(isset($data['id'])){
				$sql.=sprintf(" AND id!=%d", $data['id']);
			}
			/*
			if(isset($data['type_id'])){
				$sql.=sprintf(" AND type_id!=%d", $data['type_id']);
			}
			*/
			$sql.=" LIMIT 1";
			$rs=mysql_query($sql,$this->myid);	
			if($rs){
				if($row=mysql_fetch_assoc($rs)){
					if(!isset($data['confirm'])){
					return array('result'=>false, 'errorString'=> sprintf("รหัสซ้ำกับ:\n%d: %s\nบันทึกข้อมูลไม่ได้",$row['id'],$row['name']));			
					}
				}
			}
			
			$orow=false;
			if(isset($data['id'])){
				$xid=$data['id'];

				$sql=sprintf("SELECT * from %s WHERE id=%d",$xtable, $xid);
				$rs=mysql_query($sql,$this->myid);	
				
				if($rs){
					$orow=mysql_fetch_assoc($rs);	
				}
				$qrs=sprintf("UPDATE %s set code=%s,name=%s,type_id=%d WHERE  id=%d",$xtable, $this->quoteValue($data['code']), $this->quoteValue($data['name']),$data['type_id'],$xid);
			}else{
				$xid=0;
				$sql=sprintf("SELECT max(id) as n FROM %s",$xtable);
				$rs=mysql_query($sql,$this->myid);	
				if($rs){
					if($row=mysql_fetch_assoc($rs)){
						$xid=intval($row['n']);
					}
				}
				$xid+=1;

				$qrs=sprintf("INSERT INTO %s (id,code,name,type_id) VALUES(%d,%s,%s,%d)",$xtable,$xid,$this->quoteValue($data['code']),$this->quoteValue($data['name']),$data['type_id']);
			}
			if(mysql_query($qrs,$this->myid)){
				$sql=sprintf("SELECT * from %s WHERE id=%d", $xtable,$xid);
				$rs=mysql_query($sql,$this->myid);	
				if($rs){
					if($row=mysql_fetch_assoc($rs)){
						return array('result'=>true, 'data'=>$row);					
					}
				}
			}

		}
		return $qrs;
	}	
	function deleteTopic($data){
		$qrs=false;
		if($data && isset($data['id']) ){
			$xtable=sprintf("`%scases`", $this->TablePrefix);
			$xtable2=sprintf("`%stopics`", $this->TablePrefix);
			/*
			$sql=sprintf("SELECT count(id) as n  from %s  WHERE type_id=%d",$xtable,$data['id']);
			
			$rs=mysql_query($sql,$this->myid);	
			if($rs){
				if($row=mysql_fetch_assoc($rs)){
					if($row['n']>0){
						return array('result'=>false, 'errorString'=>"รายกานี้ มีข้อมูลรายงานลิงค์อยู่ ไม่สามารถลบได้");		
					}
				}
			}
			*/

			$xid=$data['id'];
			$qrs=sprintf("DELETE FROM %s WHERE id=%d",$xtable2,$xid);

			if(mysql_query($qrs,$this->myid)){
				return array('result'=>true, 'data'=>$data);					
			}

		}
		return $qrs;
	}	
	
	function saveGroup($data){
		$qrs=false;
		if($data && isset($data['name'])){
			$xtable=sprintf("`%sgroups`", $this->TablePrefix);
			$sql=sprintf("SELECT *  from %s  WHERE name=%s",$xtable, $this->quoteValue($data['name']));
			if(isset($data['id'])){
				$sql.=sprintf(" AND id!=%d", $data['id']);
			}
			$sql.=" LIMIT 1";
			$rs=mysql_query($sql,$this->myid);	
			if($rs){
				if($row=mysql_fetch_assoc($rs)){
					if(!isset($data['confirm'])){
					return array('result'=>false, 'errorString'=> sprintf("รหัสซ้ำกับ:\n%d: %s\nต้องการบันทึกข้อมูลหรือไม่?",$row['id'],$row['name']));			
					}
				}
			}
			
			$orow=false;
			if(isset($data['id'])){
				$xid=$data['id'];

				$sql=sprintf("SELECT * from %s WHERE id=%d",$xtable, $xid);
				$rs=mysql_query($sql,$this->myid);	
				
				if($rs){
					$orow=mysql_fetch_assoc($rs);	
				}
				$qrs=sprintf("UPDATE %s set name=%s WHERE  id=%d",$xtable, $this->quoteValue($data['name']),$xid);
			}else{
				$xid=0;
				$sql=sprintf("SELECT max(id) as n FROM %s",$xtable);
				$rs=mysql_query($sql,$this->myid);	
				if($rs){
					if($row=mysql_fetch_assoc($rs)){
						$xid=intval($row['n']);
					}
				}
				$xid+=1;

				$qrs=sprintf("INSERT INTO %s (id,name) VALUES(%d,%s)",$xtable,$xid,$this->quoteValue($data['name']));
			}
			if(mysql_query($qrs,$this->myid)){
				$sql=sprintf("SELECT * from %s WHERE id=%d", $xtable,$xid);
				$rs=mysql_query($sql,$this->myid);	
				if($rs){
					if($row=mysql_fetch_assoc($rs)){
						return array('result'=>true, 'data'=>$row);					
					}
				}
			}

		}
		return $qrs;
	}

	function deleteGroup($data){
		$qrs=false;
		if($data && isset($data['id']) ){
			$xtable=sprintf("`%sgroups`", $this->TablePrefix);
			$xtable2=sprintf("`%stypes`", $this->TablePrefix);
			$sql=sprintf("SELECT count(id) as n  from %s  WHERE group_id=%d",$xtable2,$data['id']);
			
			$rs=mysql_query($sql,$this->myid);	
			if($rs){
				if($row=mysql_fetch_assoc($rs)){
					if($row['n']>0){
						return array('result'=>false, 'errorString'=>"รายกานี้ มีข้อมูลรายงานลิงค์อยู่ ไม่สามารถลบได้");		
					}
				}
			}

			$xid=$data['id'];
			$qrs=sprintf("DELETE FROM %s WHERE id=%d",$xtable,$xid);

			if(mysql_query($qrs,$this->myid)){
				return array('result'=>true, 'data'=>$data);					
			}

		}
		return $qrs;
	}

	public function getRange($datestr){
		$old=strtotime($datestr);
		$datestr=date('Y-m-1',$old);
		$tm=strtotime($datestr);
		$tm2=strtotime('+1 months',$tm);
		$year=intval(date('Y',$tm));
		return array('year'=>$year, 'begin'=>date('Y-m-d',$tm) ,'date'=>date('Y-m-d',$old), 'end'=>date('Y-m-d',$tm2));

	}

	public function backup_tables()
	{

		$sql='ALTER TABLE `info_cases` ADD COLUMN (`note1` text CHARACTER SET utf8 NOT NULL, `note2` text CHARACTER SET utf8 NOT NULL, `note3` text CHARACTER SET utf8 NOT NULL)';
		mysql_query($sql,$this->myid);


		$tables=array('users','cases','types','groups');

		$bkfile=dirname(__FILE__).'/db-backup-informations-'.date('Y-m',time()) .'.sql';
		$handle=false;
		if(!file_exists($bkfile)){
			$handle = @fopen($bkfile,'w+');
		}

		//cycle through
		if($handle){
			foreach($tables as $xtable)
			{
				$table=$this->TablePrefix . $xtable;
				$result = mysql_query('SELECT * FROM '.$table, $this->myid);
				$num_fields = mysql_num_fields($result);
				
				$return='DROP TABLE IF EXISTS '.$table.';';
				$row2 = mysql_fetch_row(mysql_query('SHOW CREATE TABLE '.$table));
				$return.= "\n\n".$row2[1].";\n\n";
				
				for ($i = 0; $i < $num_fields; $i++) 
				{
					while($row = mysql_fetch_row($result))
					{
						$return.= 'INSERT INTO '.$table.' VALUES(';
						for($j=0; $j<$num_fields; $j++) 
						{
							$row[$j] = addslashes($row[$j]);
							$row[$j] = preg_replace("/\n/","\\n",$row[$j]);
							if (isset($row[$j])) { $return.= '"'.$row[$j].'"' ; } else { $return.= '""'; }
							if ($j<($num_fields-1)) { $return.= ','; }
						}
						$return.= ");\n";
					}
				}
				$return.="\n\n\n";
				fwrite($handle,$return);
			}
			@fclose($handle);
		}
	}

	function sortCodeFunc($a,$b){
		if ($a['code'] == $b['code']) {
			return 0;
		}
		return ($a['code'] < $b['code']) ? -1 : 1;
	}

	function sortIdxFunc($a,$b){
		if ($a['idx'] == $b['idx']) {
			return 0;
		}
		return ($a['idx'] < $b['idx']) ? -1 : 1;
	}


	private function &query($sql){
			$result=mysql_query($sql,$this->myid);	
			return $result;
	}

	private function _toNumber($value){
		return floatval(preg_replace('/[, ]/','',$value));
	}

	private function quoteValue($text, $like=false){
		if($like===true){
			return sprintf("'%%%s%%'",mysql_escape_string($text));
		}
		return sprintf("'%s'",mysql_escape_string($text));
	}

	private function _trace($filename, $content){
		$result=false;
		$handle = @fopen($filename, 'w+b');
		if($handle){
			$result=true;
			if (fwrite($handle, $content) === FALSE) {
				$result=false;
			}
			fclose($handle);

		}
		return $result;
	}
}
?>