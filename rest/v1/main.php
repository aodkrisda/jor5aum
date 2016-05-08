<?php

//API INTERFACE

function get_version(){
  global $api;
  global $norm;
  
  
  $r=$norm->cases()->where('type.id>10')->where('cases.id>?',0)->select('cases.id,type.id,jude.id');
  //$r=$norm->casese();//join_table('cases','left join type on cases.type_id=type.id','left join jude on cases.jud_id=judge.id')->where('type.id>10')->where('cases.id>?',0)->select('cases.id,type.id,jude.id');
  var_dump((string)$r); 
  exit();
  
  return array('version'=>floatval(preg_replace('/^[a-zA-Z]{1,}/','',basename(dirname(__FILE__)))), 'build_date'=>date("Y-m-d H:i:s",filemtime(__FILE__)), 'server_date'=> date("Y-m-d H:i:s") );
}

function get_get_token(){
  global $api;
  global $norm;

  if(isset($_SERVER['PHP_AUTH_USER']) && isset($_SERVER['PHP_AUTH_PW'])){
    $rs=$norm->users->where(array('account'=>$_SERVER['PHP_AUTH_USER'], 'password '=>$_SERVER['PHP_AUTH_PW']))->limit(1);
    if(count($rs)){  
      $user=$norm->toArray($rs)[0];
      if($user){
        unset($user['password']);
        $api_key=$api->api_set_user($user);
        if($api_key){
          return array('api_key'=>$api_key, 'user'=> $api->api_get_user()) ;
        }
      }
    }
  }
  $api->api_check_user();
}

function all_upload($id='0',$doc=''){
    global $api;
    global $norm;
    $api->api_check_user();
    $usr=$api->api_get_user();
    
    $rs=$norm->cases()->where('id',$id)->where('user_id',$usr['id']);
    $ok=(count($rs)>0) && ($doc=='file1' || $doc=='file2');
    if(!$ok){
          // error, invalid chunk upload request, retry
          header( $_SERVER["SERVER_PROTOCOL"]. " 400 Bad Request");
          exit();    
    }
    
    $baseDir=dirname(__DIR__);
    $uploadsDir=dirname($baseDir) . '/documents/' . $usr['id'] .'/';
    $chunksDir=dirname($baseDir) . '/.chunks/' . $usr['id'] . '/';
    
    require($baseDir.'/Flow/Autoloader.php');
    Flow\Autoloader::register($baseDir);

    $config = new Flow\Config();
    $config->setTempDir($chunksDir);
    $file = new Flow\File($config);

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if(!is_dir($uploadsDir)){
          @mkdir(dirname($uploadsDir));
           @mkdir($uploadsDir);
        }
        if(!is_dir($chunksDir)){
          @mkdir(dirname($chunksDir));
          @mkdir($chunksDir);
        }
        if ($file->checkChunk()) {
            header( $_SERVER["SERVER_PROTOCOL"]. " 200 Ok");
        } else {
            header( $_SERVER["SERVER_PROTOCOL"]. " 204 No Content");
            exit();
        }
    } else {
      if ($file->validateChunk()){
          $file->saveChunk();
      } else {
          // error, invalid chunk upload request, retry
          header( $_SERVER["SERVER_PROTOCOL"]. " 400 Bad Request");
          exit();
      }
    }
    $row=$rs->fetch();
    $filename=strtolower($file->getFileName());
    $filename=preg_replace('/[^a-zA-Z0-9_\.]/','_',$filename);

    if($doc){
      $filename=strtolower($doc. '-' . $filename);
    }
    $filename=$usr['id'].'-' . $row['id'] . '-'. $filename;
    $filename=str_replace('-','_',$filename);
     
    if ($file->validateFile() && $file->save($uploadsDir . $filename)) {
       $it=array();
       $it[$doc]=$filename;
       $row->update($it);
    
        echo "File upload was completed ";
	      echo $filename;
    } else {
        echo "This is not a final chunk, continue to upload";
    }
    exit();
}

function all_pdf($pdf){
    global $api;
    global $norm;
    $api->api_check_user();
    $usr=$api->api_get_user();
    $fd=dirname(dirname(__DIR__)).'/documents/' . $usr['id'] .'/' . $pdf;
    if(is_file($fd)){
      passthru($fd,$err);
    }else{
      header("HTTP/1.0 404 Not Found");
      echo "404 Not Found";
    }
    exit();
}

function get_test(){
  global $norm;
  return (count($norm->get_tables())>0);
}

function post_getlookups(){
  global $api;
  global $norm;
  
  //NotORM_Result
  //NotORM_Row
   $api->api_check_user();
   
   $courts=$norm->toArray($norm->users()->select('id,name')->where('admin < ?',1)->order('id')->limit(1000));
   $courts[]=array('id'=>'1','name'=>'ภาค');
   $groups=$norm->toArray($norm->groups()->limit(1000));
   $groups2=$norm->toArray($norm->usergroups()->limit(1000));
   $types=$norm->toArray($norm->types()->order('group_id, id')->limit(1000));
   $ats=$norm->toArray($norm->at()->limit(1000));
   $results=$norm->toArray($norm->result()->limit(1000));
   $topics=$norm->toArray($norm->topics()->limit(2000));
   $imprisons=$norm->toArray($norm->imprisons()->limit(2000));
   $accepts=$norm->toArray($norm->accepts()->limit(2000));
   $atresults=$norm->toArray($norm->at_results()->limit(2000));
   $judges=$norm->toArray($norm->users()->select('id,name,position,admin,parent_id')->where('admin > ?',1)->order('name')->limit(2000));
   $roles=array(
        array('id'=> '0', 'name'=> 'ศาล'),
        array('id'=> '1', 'name'=> 'แอดมิน' ),
        array('id'=> '2', 'name'=> 'ผู้พิพากษา' ),
        array('id'=> '3', 'name'=> 'ผู้พิพากษา (ภาค)')
   );
   return array('server_date'=>$norm->now() ,'at_results'=>$atresults,'accepts'=>$accepts, 'imprisons'=>$imprisons, 'courts'=>&$courts, 'roles'=>&$roles,'ugroups'=>&$groups2, 'groups'=>&$groups, 'types'=>&$types, 'ats'=>&$ats, 'results'=>&$results, 'topics'=>&$topics, 'judges'=>&$judges);
}

function magic_restfull(){
  global $api;
  global $norm;
  $args=func_get_args();
  
  //$api->api_check_user();
  $table=array_shift($args);
  $xtable=$norm->get_table_prefix() . $table;
  if($table && $norm->table_exists($xtable)){
    $fields='';
    if($table=='users') $fields='id,name';
    $tb=new RestTable($table, $fields);
    if($api->isGet()){
      if(count($args)){
        return $tb->read($args[0]);
      }
      return $tb->getlist();
    }
    if($api->isPost()){
      if(count($args)){
        if($args[0]=='list'){
          return $tb->getlist($_POST);
        }
        return false;
      }
      return $tb->create($_POST);
    }
    if($api->isPut()){
      if(count($args)) return $tb->insert_update($args[0],$_POST);
    }
    if($api->isDelete()){
      if(count($args)) return $tb->destroy($args[0]);
    }
  }
}

function post_logout(){
  @session_destroy();
  return true; ;
}

function post_login(){
  global $api;
  global $norm;

  $api->api_require_fields(array('user_number','password'));
    
  $rs=$norm->users->where(array('account'=>$_POST['user_number'], 'password '=>$_POST['password']))->limit(1);
  if(count($rs)){
    $obj=$rs->fetch();
    /*
    if (is_null($obj['date_first_used'])){
      $obj['date_first_used']=$norm->now();
    }
    $obj['date_last_used']=$norm->now();
    $affected = $obj->update();
    */
    $user=$norm->toArray($obj);
    unset($user['password']);
    $api_key=$api->api_set_user($user);
    if($api_key){
      return array('api_key'=>$api_key, 'user'=> $api->api_get_user()) ;
    }
  }
  $api->sendJson(array('error'=>true, 'message'=>'ชื่อผู้ใช้หรือรหัสผ่าน ไม่ถูกต้อง'),404);
}

function post_getcases(){
  global $api;
  $api->api_check_user();  
  $api->api_require_fields(array('user_id','date'));
  return _getInfo()->getCases($_POST);
}



function post_savecaseex(){
  global $api;
  $api->api_check_user();  
  $api->api_require_fields(array('id'));
  
  $rs=_getInfo()->saveCaseEx($_POST);
  if(is_array($rs) && isset($rs['errorString'])){
    $rs['error']=true;
    $rs['__raw']=true;
    return $rs;
  }
  return true;
}



/* NG-TABLE */

class NGTABLE{
  protected $tb;
  protected $api;
  protected $norm;
  protected $pk='id';
  protected $required=array();
  protected $uniques=array();
  protected $unique_group='';
  protected $roles=array();
  protected $meta=array();
  
  function __construct($table='samples', $pk='id') {
    global $api;
    global $norm;
    $this->pk=$pk;
    $this->tb=$table;
    $this->norm=&$norm;
    $this->api=&$api;
    
    //check role
	$this->api->api_check_user();
    if(is_array($this->roles) && count($this->roles)){
      if (!in_array($this->api->api_get_role(), $this->roles)) {
        $this->api->sendJson(array('error'=>true, 'messages'=>'ขออภัย คุณไม่ได้รับอนุญาติให้เข้าหน้านี้'),400);
        exit();
      }
    }
  }

  function getDateRange($datestr){
	  $old=strtotime($datestr);
	  $datestr=date('Y-m-1',$old);
	  $tm=strtotime($datestr);
	  $tm2=strtotime('+1 months',$tm);
	  $year=intval(date('Y',$tm));
    $month=intval(date('m',$tm));
    $date=intval(date('d',$old));
	  return array('year'=>$year, 'month'=>$month, 'day'=>$date, 'begin'=>date('Y-m-d',$tm) ,'date'=>date('Y-m-d',$old), 'end'=>date('Y-m-d',$tm2));
  }  
  function buildFilter(&$rs, $fs){
    if($rs){
      if($fs && isset($fs['search'])){
        $rs=$rs->where('name LIKE ?','%' . $fs['search']. '%');
      }     
    }
  }
  function query(){
       $rs=$this->norm->{$this->tb}();
       if(isset($_POST['filter']) && is_array($_POST['filter'])){
        $this->buildFilter($rs, $_POST['filter']);
       }else{
        $this->buildFilter($rs,null);
       }

       if(isset($_POST['sorting']) && is_array($_POST['sorting'])){
        $b=true;
        foreach($_POST['sorting'] as $k=>$v){
          if($b){
            $b=false;
            $rs->order('');
          }
          $rs->order($k . ' '  .$v);
        }
       }
	   $xpage=0;
	   $xcount=0;
       if(isset($_POST['count']) && isset($_POST['page'])){
	    $xpage=$_POST['page'];
		$xcount=$_POST['count'];
		$rs->limit($_POST['count'],(($_POST['page']-1) * $_POST['count']));
	   }

       $n=$rs->count("*");
       $rows=$this->norm->toArray($rs);
       return array('error'=>false ,'__raw'=>true,'total'=>$n, 'sql'=>(string) $rs, 'meta'=>$this->meta, 'page'=>$xpage,'data'=>&$rows);    
  }
  function get(){
      $rs=$this->norm->{$this->tb}()[$_POST[$this->pk]];
      if($rs){
        return $this->norm->toArray($rs);
      }
      return false;
  }
  function update(){
      $this->api->api_require_fields($this->required, isset($_POST[$this->pk]));

      foreach($this->uniques as $fd=>$err){
        if(isset($_POST[$fd]) && $_POST[$fd]){
          $rs=$this->norm->{$this->tb}()->where($fd, $_POST[$fd])->where($this->pk .' != ?', $_POST[$this->pk])->limit(1);
          if(count($rs)){
            $this->api->sendJson(array('error'=>true, 'message'=>$err),400);
          }
        }
      }
      
      $rs=$this->norm->{$this->tb}()->where($this->pk, $_POST[$this->pk])->limit(1);
      if(count($rs)){
        $obj=$rs->fetch();
        $affected = $obj->update($_POST);
        $r=array();
        if($affected>0){
          $rs=$this->norm->{$this->tb}()->where($this->pk, $_POST[$this->pk])->limit(1);
          $obj=$rs->fetch();
          foreach($_POST as $a=>$b){
            if(isset($obj[$a])){
              $r[$a]=$obj[$a];
            }
          }
          return $r;
        }else{
          $r[$this->pk]=$_POST[$this->pk];
          return $r;
        }
      }
      return false;
  }
  function add(){
      if($_POST){
        $this->api->api_require_fields($this->required);
        foreach($this->uniques as $fd=>$err){
          if(isset($_POST[$fd]) && $_POST[$fd]){
            $rs=$this->norm->{$this->tb}()->where($fd,$_POST[$fd])->limit(1);
            if($this->unique_group && isset($_POST[$this->unique_group])){
              $rs=$rs->where($this->unique_group,$_POST[$this->unique_group]);
            }
            if(count($rs)){
              $this->api->sendJson(array('error'=>true, 'message'=>$err),400);
            }
          }
        }        

        $obj=$this->norm->{$this->tb}()->insert($_POST);
        if($obj){
          if(isset($obj['password'])){
            unset($obj['password']);
          }
          return $obj;
        }
      } 
      return false;
  }
  function delete(){
      $rs=$this->norm->{$this->tb}()->where($this->pk,$_POST[$this->pk]);
      if($rs){
        $effected=$rs->delete();
        if($effected > 0){
          return array($this->pk=>$_POST[$this->pk]);
        }
      }
      $this->api->sendJson(array('error'=>true, 'message'=>'ลบข้อมูลไม่ได้'),400); 
      return false;
  }
  
  function process($action=''){
    if(($action=='get') || ($action=='delete') || ($action=='update')){
      $this->api->api_require_fields(array($this->pk));
    }  

    switch($action){
      case 'get':
        return $this->get();
        break;
      case 'add':
        return $this->add();
        break;
      case 'update':
        return $this->update();
        break;
      case 'delete':
        return $this->delete();
        break;
       case 'query':
       case '':
        return $this->query();
        break;
       default:
          $mt=$this->api->getMethod() . '_' . $action;
          if(is_callable(array($this,$mt))){
             return call_user_func_array(array($this,$mt),array());
          }
          break;
    }
    return false;
  }

}

class NGTABLE_USERS extends NGTABLE{
  function __construct($table='users', $pk='id') {
    $this->required[]='name';
    $this->uniques['account']='ชื่อผู้ใช้ซ้ำ กรุณาเปลี่ยนใหม่';
    //$this->roles[]='admin';
    parent::__construct($table, $pk);

  }
   function post_checkin_user(){
      if(isset($_POST[$this->pk])){
        $id=$_POST[$this->pk];
        $row=$this->norm->users()->where($this->pk, $id)->where('check_out',1)->fetch();
        if($row){
          $it=array('check_out'=>0);
          $usr=$this->api->api_get_user();
          if($usr) $it['parent_id']=$usr['id'];
          $row->update($it);
          return true;
        }
      }
      return false; 
  }
  function buildFilter(&$rs, $fs){
    if($rs){
      if($fs){
        if(isset($fs['search'])){
          $rs=$rs->where('name LIKE ?','%' . $fs['search']. '%');
        }
        if(isset($fs['_view']) && $fs['_view']=='moveuser'){
          $rs->where('admin',2)->where('(check_out=1) OR (parent_id=0)');
         
        }else{
          if(isset($fs['admin'])){
            $rs=$rs->where('admin', $fs['admin']);
          }
          if(isset($fs['parent_id'])){
            $rs=$rs->where('parent_id', $fs['parent_id']);
          }
          $me=$this->api->api_get_user();
          if($me && ($me['admin'] != 1)){
            $rs=$rs->where('parent_id',$me['id']);
          }           
        }
      }
       
     
    }
  }   
}

class NGTABLE_JUDGES extends NGTABLE_USERS{
  function __construct($table='users', $pk='id') {
    $this->required[]='name';
    $this->uniques['name']='ชื่อผู้พิพากษาซ้ำ กรุณาเปลี่ยนใหม่';
    parent::__construct($table, $pk);

  } 
}

class NGTABLE_TYPES  extends NGTABLE{
  function __construct($table='types', $pk='id') {
    parent::__construct($table, $pk);
    $this->required[]='name';
    $this->uniques['name']='ชื่อประเภทคดีซ้ำ กรุณาเปลี่ยนใหม่';

  }  
  function buildFilter(&$rs, $fs){
    if($rs){
      if($fs && isset($fs['search'])){
        $rs=$rs->where('name LIKE ?','%' . $fs['search']. '%');
      }

      if($fs && isset($fs['group_id'])){
        $rs=$rs->where('group_id', $fs['group_id']);
      }        
     
    }
  }
}

class NGTABLE_TOPICS  extends NGTABLE{
  function __construct($table='topics', $pk='id') {
    parent::__construct($table, $pk);
    $this->required[]='name';
    $this->unique_group='type_id';
    $this->uniques['name']='ชื่อข้อหาซ้ำ กรุณาเปลี่ยนใหม่';
    $this->uniques['code']='รหัสซ้ำ กรุณาเปลี่ยนใหม่';
  }  
  function buildFilter(&$rs, $fs){
    if($rs){
      if($fs && isset($fs['search'])){
        $rs=$rs->where('name LIKE ?','%' . $fs['search']. '%');
      }

      if($fs && isset($fs['type_id'])){
        $rs=$rs->where('type_id', $fs['type_id']);
      }        
     
    }
  } 
}

class NGTABLE_RESULTS  extends NGTABLE{
  function __construct($table='result', $pk='id') {
    parent::__construct($table, $pk);
    $this->required[]='name';
    $this->uniques['name']='ชื่อผลการปฏิบัติซ้ำ กรูณาเปลี่ยนใหม่';
  }  
}

class NGTABLE_ATS  extends NGTABLE{
  function __construct($table='at', $pk='id') {
    parent::__construct($table, $pk);
    $this->required[]='name';
    $this->uniques['name']='คำสั่ง อธ.ซ้ำ กรูณาเปลี่ยนใหม่';
  }  
}
class NGTABLE_IMPRISONS  extends NGTABLE{
  function __construct($table='imprisons', $pk='id') {
    parent::__construct($table, $pk);
    $this->required[]='name';
    $this->uniques['name']='จำเลยต้องขังซ้ำ กรูณาเปลี่ยนใหม่';
  }  
}
class NGTABLE_ACCEPTS  extends NGTABLE{
  function __construct($table='accepts', $pk='id') {
    parent::__construct($table, $pk);
    $this->required[]='name';
    $this->uniques['name']='จำเลยสารภาพซ้ำ กรูณาเปลี่ยนใหม่';
  }  
}
class NGTABLE_AT_RESULTS  extends NGTABLE{
  function __construct($table='at_results', $pk='id') {
    parent::__construct($table, $pk);
    $this->required[]='name';
    $this->uniques['name']='เหตุผลซ้ำ กรูณาเปลี่ยนใหม่';
  }  
}

class NGTABLE_ADMIN_RETURN_CASES  extends NGTABLE{
	function __construct($table='return_cases', $pk='id') {
	parent::__construct($table, $pk);
	}
	function buildFilter(&$rs, $data){
		global $norm;
		global $api;  
		if($rs){
			if(isset($_POST['case_id'])){ 
				$rs->where('case_id',$_POST['case_id']);
			}else{
			$rs->where('case_id<?',0);
			}
		}
	}

	function post_additems(){
		global $norm;
		if(isset($_POST['items']) && isset($_POST['case_id']) && is_array($_POST['items'])){
			$norm->transaction='BEGIN';
			
			$ids=array();
			foreach($_POST['items'] as $it){
				if(isset($it['id'])){
					$ids[]=$it['id'];
				}
			}
			
			$norm->return_cases()->where('case_id',$_POST['case_id'])->where('NOT id',$ids)->delete();

			$r=$norm->return_cases()->where('case_id',$_POST['case_id']);
			foreach($_POST['items'] as $it){
				if(isset($it['id'])){
					$r2=$r[$it['id']];
					if($r2){
						$r2->update($it);
					}
				}else{
					$r->insert($it);
				}
			}
			
			$norm->transaction='COMMIT';

			return true;
		}
	}
	function post_updateitems(){
		global $norm;
		if(isset($_POST['items']) && isset($_POST['case_id']) && is_array($_POST['items'])){
			$norm->transaction='BEGIN';
			$r=$norm->return_cases()->where('case_id',$_POST['case_id']);
			foreach($_POST['items'] as $it){
				if(isset($it['id'])){
					$r2=$r[$it['id']];
					if($r2){
						$r2->update($it);
					}
				}
			}
			
			$norm->transaction='COMMIT';

			return true;
		}
	}
}

class NGTABLE_ADMIN_CASES  extends NGTABLE{
  function __construct($table='cases', $pk='id') {
    parent::__construct($table, $pk);
  }
  function post_checkblknumber(){
    global $norm;
    global $api;
    if( isset($_POST['value']) &&  $_POST['value']){
        $r=$norm->cases()->where('number_black',$_POST['value']);
        if(isset($_POST['id']) && $_POST['id']){
          $r=$r->where('id!=?',$_POST['id']);
        }
        if(isset($_POST['user_id']) && $_POST['user_id']){
          $r=$r->where('user_id',$_POST['user_id']);
        }        
        if(count($r)>0){
          $api->sendJson(array('error'=>true, 'message'=>'เลขคดีดำซ้ำ กรุณาแก้ไขใหม่'),404);
        }
    }
    return true;
  }  
  function post_setnumber(){
    global $norm;
    $r=$norm->cases()->where('id',$_POST['id'])->fetch();
    if($r){
	  $tid=0;
	  if(isset($_POST['type_id']) && $_POST['type_id']){
		$tid=intval($_POST['type_id']);
	  }
      $code='';
      $auto_received_num=$r['auto_received_num'];
      $date_received3=$r['date_received3'];
      if(empty($auto_received_num)){
        $year=intval(date('Y'));
		if(!$tid) $tid=$r['type_id'];
        $tr=$norm->types()->where('id',$tid)->fetch();
        if($tr && $tr['code']){
          $code=trim($tr['code']);
          $ars=$norm->auto_received_nums()->where('type_id',$tid)->where('year_val',$year);
          $nextid=0;
          $ar=$ars->fetch();
          if($ar){
            $nextid=intval($ar['number_val']) + 1;
            $ar['number_val']= $nextid;
            $ar->update();
          }else{
            $nextid=1;
            $ar=$ars->insert(array('year_val'=>$year, 'type_id'=>$tid, 'number_val'=>$nextid));
          }
          if($ar){
            $auto_received_num=$code . $nextid . '/' . ($year + 543);
            $r['auto_received_num']=$auto_received_num;
            $r['date_received3']=date('Y-m-d');
            $r->update();
            $date_received3=$r['date_received3'];
          }
        }
      }
      return array('auto_received_num'=>$auto_received_num,'date_received3'=>$date_received3);
    }
   return false;
  }

  function post_setnumber2(){
    global $norm;
    $r=$norm->cases()->where('id',$_POST['id'])->fetch();
    if($r){
    $tid=0;
    if(isset($_POST['type_id']) && $_POST['type_id']){
    $tid=intval($_POST['type_id']);
    }
      $code='';
      $auto_received_num2=$r['auto_received_num2'];
      $date_received3_a=$r['date_received3_a'];
      if(empty($auto_received_num2)){
        $year=intval(date('Y'));
    if(!$tid) $tid=$r['type_id'];
        $tr=$norm->types()->where('id',$tid)->fetch();
        if($tr && $tr['code']){
          $code=trim($tr['code']);
          $ars=$norm->auto_received_nums2()->where('type_id',$tid)->where('year_val',$year);
          $nextid=0;
          $ar=$ars->fetch();
          if($ar){
            $nextid=intval($ar['number_val']) + 1;
            $ar['number_val']= $nextid;
            $ar->update();
          }else{
            $nextid=1;
            $ar=$ars->insert(array('year_val'=>$year, 'type_id'=>$tid, 'number_val'=>$nextid));
          }
          if($ar){
            $auto_received_num2=$code . $nextid . '/' . ($year + 543);
            $r['auto_received_num2']=$auto_received_num2;
            $r['date_received3_a']=date('Y-m-d');
            $r->update();
            $date_received3_a=$r['date_received3_a'];
          }
        }
      }
      return array('auto_received_num2'=>$auto_received_num2,'date_received3_a'=>$date_received3_a);
    }
   return false;
  }
  function post_clearnumber(){
    global $norm;
	$ret=false;
    $r=$norm->cases()->where('id',$_POST['id'])->fetch();
    if($r){
      $code='';
      $auto_received_num=$r['auto_received_num'];
      $date_received3=$r['date_received3'];
      if(!empty($auto_received_num)){
        $year=0;
        $tr=$norm->types()->where('id',$r['type_id'])->fetch();
        if($tr && $tr['code']){
          $code=trim($tr['code']);
          $tm=explode('/',  $auto_received_num);
          if(count($tm)>1){
            $year=intval($tm[1])-543;
            $nextid=$tm[0];
            if(preg_match("|\d+|", $nextid, $m)){
              $nextid=intval($m[0]);
            }else{
              $nextid=0;
            }
			$code=str_replace($nextid,'',$tm[0]);
          }else{
            $nextid=0;
          }
          if(($year>0) && ($nextid>0)){
			$tid=$r['type_id'];
			$c=$norm->types()->where('code',$code)->fetch();
			if($c){
				$tid=$c['id'];
			}
            $ars=$norm->auto_received_nums()->where('type_id',$tid)->where('year_val',$year);
            $ar=$ars->fetch();
            if($ar){
              if($ar['number_val']==$nextid){
                $ar['number_val']=max(0,$nextid-1);
                $ar->update();
              }
            }
          }
          $auto_received_num='';
          $date_received3=null;

          $r['auto_received_num']=$auto_received_num;
          $r['date_received3']=$date_received3;

          $r['number_received3']='';
          $r['command_id']=0;
          $r['at_correct']=1;
          $r['form2_note']='';
          $r['result']=0;
          $r['add_checked']=0;
          $r['link_checked']=0;
          $r['add_ids']='';
          $r['link_ids']='';

          $r->update();
		  $norm->return_cases()->where('case_id',$r['id'])->delete();
		  $ret=$r->toArray();
         }
      }
      return $ret;//array('auto_received_num'=>$auto_received_num,'date_received3'=>$date_received3);
    }
    return false;
  }  

 function post_clearnumber2(){
    global $norm;
  $ret=false;
    $r=$norm->cases()->where('id',$_POST['id'])->fetch();
    if($r){
      $code='';
      $auto_received_num2=$r['auto_received_num2'];
      $date_received3_a=$r['date_received3_a'];
      if(!empty($auto_received_num2)){
        $year=0;
        $tr=$norm->types()->where('id',$r['type_id'])->fetch();
        if($tr && $tr['code']){
          $code=trim($tr['code']);
          $tm=explode('/',  $auto_received_num2);
          if(count($tm)>1){
            $year=intval($tm[1])-543;
            $nextid=$tm[0];
            if(preg_match("|\d+|", $nextid, $m)){
              $nextid=intval($m[0]);
            }else{
              $nextid=0;
            }
      $code=str_replace($nextid,'',$tm[0]);
          }else{
            $nextid=0;
          }
          if(($year>0) && ($nextid>0)){
      $tid=$r['type_id'];
      $c=$norm->types()->where('code',$code)->fetch();
      if($c){
        $tid=$c['id'];
      }
            $ars=$norm->auto_received_nums2()->where('type_id',$tid)->where('year_val',$year);
            $ar=$ars->fetch();
            if($ar){
              if($ar['number_val']==$nextid){
                $ar['number_val']=max(0,$nextid-1);
                $ar->update();
              }
            }
          }
          $auto_received_num2='';
          $date_received3_a=null;

          $r['auto_received_num2']=$auto_received_num2;
          $r['date_received3_a']=$date_received3_a;
          $r['number_received3_a']='';
          $r['judge2_id_a']=0;
          $r['judge4_id_a']=0;
          $r['date_at_received1_a']='';
          $r['date_at_received2_a']='';
          $r['result']=0;
          $r['form3_note']='';
          $r->update();
          $norm->return_cases()->where('case_id',$r['id'])->delete();
          $ret=$r->toArray();
         }
      }
      return $ret;//array('auto_received_num'=>$auto_received_num,'date_received3'=>$date_received3);
    }
    return false;
  }  

  function buildFilter(&$rs, $data){
    global $norm;
    global $api;  
    if($rs){
	  if(isset($data['_view'])){ 
		if($data['_view']==='merge'){
			if(isset($data['search'])) $rs->where('number_black LIKE ?','%' . $data['search']. '%');
			if(isset($data['_court'])) 	$rs->where('user_id', $data['_court']);
			return;
		}
	  }

	  $atid=$norm->at()->select('id')->where('checked',1);
      $this->meta['notsent']=$norm->cases()->where('no_case_sent!=?',1)->where('(number_sent4   is null) or (number_sent4 =?)','')->where('(date_sent4 is null) or (date_sent4 =?)','0000-00-00')->count();
      $this->meta['notsent2']=$norm->cases()->where('auto_received_num!=?','')->where('(date_received3 is not null) AND (date_received3!=?)','0000-00-00')->where('number_sent5','')->where('(date_sent5 is null) or (date_sent5=?)','0000-00-00')->where('command_id',$atid)->count();
      $tm=$norm->cases()->where('return_checked',1)->where('return2_checked',1);
      $tm2=$norm->return_cases()->where('number_return=? or number_return is null','')->where('date_return is null')->where('number_sent!=?','')
        ->where('date_sent is not null')->where('(number_received=? or number_received is null or date_received is null)','')->where('case_id',$tm)->select('distinct case_id');
	$this->meta['notsent3']=$tm2->count('distinct case_id');

      if(isset($data['_view'])){ 

        if($data['_view']==='notify'){
          $rs->where('no_case_sent!=?',1)->where('(number_sent4   is null) or (number_sent4 =?)','')->where('(date_sent4 is null) or (date_sent4 =?)','0000-00-00');
          $rs->order('date_sent desc, id desc');
          return;
        }
        if($data['_view']==='notify2'){
          $rs->where('auto_received_num!=?','')->where('(date_received3 is not null) AND (date_received3!=?)','0000-00-00')->where('number_sent5','')->where('(date_sent5 is null) or (date_sent5=?)','0000-00-00')->where('command_id',$atid);
          $rs->order('date_sent desc, id desc');
          return;
        }  
        if($data['_view']==='notify3'){
          $rs->where('id',$tm2);
          $rs->order('date_sent desc, id desc');
          return;
        }   		      
      }
    }

    if($rs && $data){
	  $code='';
	  if(isset($data['type_id'])){
		$tm=$norm->types()->where('id',$data['type_id'])->fetch();
		if($tm){
			$code=$tm['code'];
			if($code){
				$rs->where('(auto_received_num LIKE ?)', $code . '%');
			}
		}
		unset($data['type_id']);
	  }

      if(isset($data['search']) && is_array($data['search'])){
		    $p=$data['search'];
			$q='';
			$qs=array();
              if(isset($p['_view']) && $p['_view']==='acases'){

                  if(isset($p['date1']) && $p['date1']){
                    $dt=$this->getDateRange($p['date1']);
                    if($q) $q.=' AND ';
                    $q.='(date_sent_a>=?)';
                   $qs[]=$dt['date'];
                  }
                  if(isset($p['date2']) && $p['date2']){
                    $dt=$this->getDateRange($p['date2']);
                  if($q) $q.=' AND ';
                    $q.='(date_sent_a<=?)';
                  $qs[]=$dt['date'];
                  }         
                   if($q) $q.=' AND ';
                  $q.=' (no_case_sent=?) ';
                  $qs[]=2;                     
              }else{

                  if(isset($p['date1']) && $p['date1']){
                    $dt=$this->getDateRange($p['date1']);
                    if($q) $q.=' AND ';
                    $q.='(date_sent>=?)';
                   $qs[]=$dt['date'];
                  }
                  if(isset($p['date2']) && $p['date2']){
                    $dt=$this->getDateRange($p['date2']);
                  if($q) $q.=' AND ';
                    $q.='(date_sent<=?)';
                  $qs[]=$dt['date'];
                  }
        
              }


		    if(isset($p['user_id']) && $p['user_id']){
				if($q) $q.=' AND ';
			    $q.='(user_id=?)';
				$qs[]=$p['user_id'];
		    }
			$fds=array('number_black', 'defendant', 'plaintiff', 'title');
			foreach($fds as $fd){
				  if(isset($p[$fd]) && $p[$fd]){
					  if($q) $q.=' AND ';
					  $q.='('. $fd . ' LIKE ?)';
				$qs[]='%'. $p[$fd] . '%';
				  }		    
			}

		    if(isset($data['court']) && ($data['court'])){
			    if($q) $q.=' AND ';
			    $q.='(user_id=%d)';
				$qs[]=$data['court'];
		    }

			if($qs){
			  $rs->where($q, $qs);
			}
 
	    }else if(isset($data['month']) && isset($data['year']) && $data['month'] && $data['year']){
          $dt=$this->getDateRange($data['year'].'-'. $data['month'] . '-1');
          if(isset($data['_view']) && $data['_view']==='acases'){
             $rs->where('date_sent_a>=? AND date_sent_a<?',$dt['begin'],$dt['end']);
          }else{
            $rs->where('date_sent>=? AND date_sent<?',$dt['begin'],$dt['end']);
          }
         
          if(isset($data['court'])){
            $rs->where('user_id', $data['court']);
          }
      }

    }
		if(isset($data['date_received']) && $data['date_received']){
			$rs->where('date_received3',$data['date_received']); //วันที่ภาครับสำนวน
		}

		if(isset($data['type_id']) && $data['type_id']){
			$rs->where('type_id',$data['type_id']); 
		}

		//$rs->order('date_sent desc, id desc');
		$adc='asc';
		if(isset($_POST['sorting'])){
			if(isset($_POST['sorting']['date_ap'])){
				$adc=$_POST['sorting']['date_ap'];
				unset($_POST['sorting']);
			}
		}

          if(isset($data['_view']) && $data['_view']==='acases'){
            $rs->where('(no_case_sent=?)', 2);
          }else{
          	if(!isset($data['search']) ){
          		$rs->where('(no_case_sent!=?)', 2);
          	}
          }
		$rs->select('')->select('*');
		$rs->select('TIMESTAMPDIFF(DAY,date_ap,CURDATE()) as _adays');
		$rs->select('IF(TIMESTAMPDIFF(DAY,date_ap,CURDATE())<0,1,0) as _bdays');
		$rs->order("_bdays $adc, _adays $adc");

  }
}

class NGTABLE_COURT_CASES  extends NGTABLE{
  function __construct($table='cases', $pk='id') {
    parent::__construct($table, $pk);
  }
  function post_checkblknumber(){
    global $norm;
    global $api;
    if( isset($_POST['value']) &&  $_POST['value']){
        $r=$norm->cases()->where('number_black',$_POST['value']);
        if(isset($_POST['id']) && $_POST['id']){
          $r=$r->where('id!=?',$_POST['id']);
        }
        if(isset($_POST['user_id']) && $_POST['user_id']){
          $r=$r->where('user_id',$_POST['user_id']);
        }        
        if(count($r)>0){
          $api->sendJson(array('error'=>true, 'message'=>'เลขคดีดำซ้ำ กรุณาแก้ไขใหม่'),404);
        }
    }
    return true;
  }
  
  function add(){
      if($_POST){
        $usr=$this->api->api_get_user();
        if($usr && isset($usr['id'])){
          if((!isset($_POST['user_id'])) || empty($_POST['user_id'])){
            $_POST['user_id']=$usr['id'];
            return parent::add();
          }
        }
      }
     return false;

  }
  function delete(){
      $usr=$this->api->api_get_user();
      if($usr && isset($usr['id'])){  
        $rs=$this->norm->{$this->tb}()->where('user_id',$usr['id'])->where($this->pk,$_POST[$this->pk]);
        if($rs){
          $effected=$rs->delete();
          if($effected > 0){
            return array($this->pk=>$_POST[$this->pk]);
          }
        }
        $this->api->sendJson(array('error'=>true, 'message'=>'ลบข้อมูลไม่ได้'),400); 
      }
      return false;
  }  
  function buildFilter(&$rs, $data){
    global $norm;
    global $api;  
	$usr=$this->api->api_get_user();
    if($rs){
	  $checked=$norm->at()->select('id')->where('checked',1);
	  $atid=$norm->at()->select('id')->where('copyied',1);

      $this->meta['notsent']=$norm->cases()->where('user_id', $usr['id'])->where('command_id',$checked)->where('(auto_received_num is null) or (auto_received_num=?)','')->where('(date_received3 is null) or (date_received3=?)','0000-00-00')->count();
      $this->meta['notsent2']=$norm->cases()->where('user_id', $usr['id'])->where('(date_received4  is null) or (number_received4  is null) or (date_received4 =?) or (number_received4=?)','','')->where('command_id',$atid)->count();
     
      $tm=$norm->cases()->where('user_id', $usr['id'])->where('return_checked',1)->where('auto_received_num!=?','')->where('date_sent5 is not NULL')->where('number_sent5!=?','');
      $n=count($tm);
      $tm2=$norm->return_cases()->where('number_return=? or number_return is null','')->where('date_return is null')->where('(number_sent!=? or date_sent is not null)','')->where('case_id', $tm)->select('distinct case_id');
	$this->meta['notsent3']=$n - $tm2->count();



      if(isset($data['_view'])){ 
        if($data['_view']==='notify'){
          $rs->where('user_id', $usr['id'])->where('command_id',$checked)->where('(auto_received_num is null) or (auto_received_num=?)','')->where('(date_received3 is null) or (date_received3=?)','0000-00-00');
          $rs->order('date_sent desc, id desc');
          return;
        }
        if($data['_view']==='notify2'){
          $rs->where('user_id', $usr['id'])->where('(date_received4  is null) or (number_received4  is null) or (date_received4 =?) or (number_received4=?)','','')->where('command_id',$atid);
          $rs->order('date_sent desc, id desc');
          return;
        }
        if($data['_view']==='notify3'){
          $rs->where('user_id', $usr['id'])->where('id', $tm)->where('NOT id',$tm2);
          $rs->order('date_sent desc, id desc');
          return;
        }    
      }
            
      if($data && isset($data['search']) && is_array($data['search'])){
		$p=$data['search'];
           $q='';
          $qs=array();
          if(isset($p['_view']) && $p['_view']==='acases'){

              if(isset($p['date1']) && $p['date1']){
                $dt=$this->getDateRange($p['date1']);
                if($q) $q.=' AND ';
                $q.='(date_sent_a>=?)';
                           $qs[]=$dt['date'];
              }
              if(isset($p['date2']) && $p['date2']){
                $dt=$this->getDateRange($p['date2']);
                          if($q) $q.=' AND ';
                $q.='(date_sent_a<=?)';
                           $qs[]=$dt['date'];
              }
             if($q) $q.=' AND ';
            $q.=' (no_case_sent=?) ';
            $qs[]=2;
          }else{

		    if(isset($p['date1']) && $p['date1']){
			    $dt=$this->getDateRange($p['date1']);
			    if($q) $q.=' AND ';
			    $q.='(date_sent>=?)';
                     $qs[]=$dt['date'];
		    }
		    if(isset($p['date2']) && $p['date2']){
			    $dt=$this->getDateRange($p['date2']);
                    if($q) $q.=' AND ';
			    $q.='(date_sent<=?)';
                     $qs[]=$dt['date'];
		    }

            }
        
			$fds=array('number_black', 'defendant', 'plaintiff', 'title');
			foreach($fds as $fd){
				  if(isset($p[$fd]) && $p[$fd]){
					  if($q) $q.=' AND ';
					  $q.='('. $fd . ' LIKE ?)';
				$qs[]='%'. $p[$fd] . '%';
				  }		    
			}

		    if($usr['id']){
			    if($q) $q.=' AND ';
			    $q.='(user_id=?)';
				$qs[]=$usr['id'];
		    }

			if($qs){
			  $rs->where($q, $qs);
			}
      
	}else if(isset($data['month']) && isset($data['year']) && $data['month'] && $data['year']){
          $dt=$this->getDateRange($data['year'].'-'. $data['month'] . '-1');
          if(isset($data['_view']) && $data['_view']==='acases'){
            $rs->where('date_sent_a>=? AND date_sent_a<?',$dt['begin'],$dt['end']);
          }else{
            $rs->where('date_sent>=? AND date_sent<?',$dt['begin'],$dt['end']);
          }
      }
 
      if($usr['id']){
        $rs->where('user_id', $usr['id']);
      }      

      if(isset($data['_view']) && ($data['_view']===true)){
          $rs->where('date_received3 IS  NOT NULL')->where('command_id',$atid);
      }         
      if(isset($data['date_received']) && ($data['date_received'])){
        $rs->where('date_received3',$data['date_received']);
      }  
      if(isset($data['type_id']) && $data['type_id']){
          $rs->where('type_id',$data['type_id']); 
      }      


      if(isset($data['_view']) && $data['_view']==='acases'){
          $rs->where('(no_case_sent=?)',2);
          $rs->order('date_sent_a desc, id desc');
      }else{
      	if(!isset($data['search'])){
      		  $rs->where('(no_case_sent!=?)',2);
      	}
        $rs->order('date_sent desc, id desc');
      }  

    }
  }
}


class NGTABLE_CUSERS extends NGTABLE{
  function __construct($table='users', $pk='id') {
    $this->required[]='name';
    $this->uniques['account']='ชื่อผู้ใช้ซ้ำ กรุณาเปลี่ยนใหม่';
    $this->uniques['name']="ฃื่อผู้พิพากษาซ้ำ (ซ้ำกับศาลอื่น)";
    //$this->roles[]='admin';
    parent::__construct($table, $pk);
  }
   function post_checkin_user(){
      if(isset($_POST[$this->pk])){
        $id=$_POST[$this->pk];
        $rs=$this->norm->users()->where($this->pk, $id);
        if(!isset($_POST['confirm'])){
          $rs->where('check_out',1);
        }
        $row=$rs->fetch();
        if($row){
          $it=array('check_out'=>0);
          $usr=$this->api->api_get_user();
          if($usr) $it['parent_id']=$usr['id'];
          $row->update($it);
          return true;
        }
      }
      return false; 
  }
  function buildFilter(&$rs, $fs){
    if($rs){
      if($fs){
        if(isset($fs['search'])){
          $rs->where('name LIKE ?','%' . $fs['search']. '%');
        }
        if(isset($fs['_view']) && $fs['_view']=='moveuser'){
          $rs->where('admin',2);
          if( ! isset($fs['search']) ){
            $rs->where('(check_out=1) OR (parent_id=0)');
          }
        }else{
          if(isset($fs['admin'])){
            $rs=$rs->where('admin', $fs['admin']);
          }
          if(isset($fs['parent_id'])){
            $rs=$rs->where('parent_id', $fs['parent_id']);
          }
          $me=$this->api->api_get_user();
          if($me && ($me['admin'] != 1)){
            $rs=$rs->where('parent_id',$me['id']);
          }           
        }
      }
       
     
    }
  }   
}

function post_users($action=''){
  $cls=new NGTABLE_USERS();
  return $cls->process($action);
}
function post_cusers($action=''){
  $cls=new NGTABLE_CUSERS();
  return $cls->process($action);
}
function post_judges($action=''){
  if($action=='add'){
    if(!isset($_POST['parent_id'])){
    $_POST['parent_id']='1';
    }
    $_POST['admin']='2';
    
    $cls=new NGTABLE_JUDGES();
    return $cls->process($action);
  }
  return false;
}


function post_types($action=''){
  $cls=new NGTABLE_TYPES();
  return $cls->process($action);
}

function post_topics($action=''){
  $cls=new NGTABLE_TOPICS();
  return $cls->process($action);
}

function post_results($action=''){
  $cls=new NGTABLE_RESULTS();
  return $cls->process($action);
}

function post_ats($action=''){
  $cls=new NGTABLE_ATS();
  return $cls->process($action);
}
function post_imprisons($action=''){
  $cls=new NGTABLE_IMPRISONS();
  return $cls->process($action);
}
function post_accepts($action=''){
  $cls=new NGTABLE_ACCEPTS();
  return $cls->process($action);
}
function post_at_results($action=''){
  $cls=new NGTABLE_AT_RESULTS();
  return $cls->process($action);
}
function post_admin_cases($action=''){
  $cls=new NGTABLE_ADMIN_CASES();
  return $cls->process($action);
}
function post_court_cases($action=''){
  $cls=new NGTABLE_COURT_CASES();
  return $cls->process($action);
}
function post_return_cases($action=''){
  $cls=new NGTABLE_ADMIN_RETURN_CASES();
  return $cls->process($action);
}