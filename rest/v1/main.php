<?php

require_once ('NotORM/lib.php');
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

function all_upload($param=''){
    global $api;
    $api->api_check_user();
   
    $baseDir=dirname(__DIR__);
    $uploadsDir=dirname($baseDir) . '/uploads/';
    $chunksDir=dirname($baseDir) . '/.chunks/';
    
    require($baseDir.'/Flow/Autoloader.php');
    Flow\Autoloader::register($baseDir);

    $config = new Flow\Config();
    $config->setTempDir($chunksDir);
    $file = new Flow\File($config);

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if(!is_dir($uploadsDir)){
          @mkdir($uploadsDir);
        }
        if(!is_dir($chunksDir)){
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
    if ($file->validateFile() && $file->save($uploadsDir . $file->getFileName())) {
        echo "File upload was completed ";
	      echo $file->getFileName();
    } else {
        echo "This is not a final chunk, continue to upload";
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
   
   $courts=$norm->toArray($norm->users()->select('id,name')->where('admin < ?',1)->order('name')->limit(1000));
   $courts[]=array('id'=>'1','name'=>'ภาค');
   $groups=$norm->toArray($norm->groups()->limit(1000));
   $groups2=$norm->toArray($norm->usergroups()->limit(1000));
   $types=$norm->toArray($norm->types()->order('group_id, id')->limit(1000));
   $ats=$norm->toArray($norm->at()->limit(1000));
   $results=$norm->toArray($norm->result()->limit(1000));
   $topics=$norm->toArray($norm->topics()->limit(2000));
   $imprisons=$norm->toArray($norm->imprisons()->limit(2000));
   $accepts=$norm->toArray($norm->accepts()->limit(2000));
   $judges=$norm->toArray($norm->users()->select('id,name,admin,parent_id')->where('admin > ?',1)->order('name')->limit(2000));
   $roles=array(
        array('id'=> '0', 'name'=> 'ศาล'),
        array('id'=> '1', 'name'=> 'แอดมิน' ),
        array('id'=> '2', 'name'=> 'ผู้พิพากษา' ),
        array('id'=> '3', 'name'=> 'ผู้พิพากษา (ภาค)')
   );
   return array('server_date'=>$norm->now() ,'accepts'=>$accepts, 'imprisons'=>$imprisons, 'courts'=>&$courts, 'roles'=>&$roles,'ugroups'=>&$groups2, 'groups'=>&$groups, 'types'=>&$types, 'ats'=>&$ats, 'results'=>&$results, 'topics'=>&$topics, 'judges'=>&$judges);
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
  protected $roles=array();
  
  function __construct($table='samples', $pk='id') {
    global $api;
    global $norm;
    $this->pk=$pk;
    $this->tb=$table;
    $this->norm=&$norm;
    $this->api=&$api;
    
    //check role
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
       
       $rs->limit($_POST['count'],(($_POST['page']-1) * $_POST['count']));
       $n=$rs->count("*");
       $rows=$this->norm->toArray($rs);
       return array('error'=>false ,'__raw'=>true,'total'=>$n, 'sql'=>(string) $rs, 'page'=>$_POST['page'],'data'=>&$rows);    
  }
  function get(){
      $rs=$this->norm->{$this->tb}()[$_POST[$this->pk]];
      if($rs){
        return $this->norm->toArray($rs);
      }
      return false;
  }
  function update(){
      $this->api->api_require_fields($this->required);

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
       case '':
        return $this->query();
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
  function buildFilter(&$rs, $fs){
    if($rs){
      if($fs && isset($fs['search'])){
        $rs=$rs->where('name LIKE ?','%' . $fs['search']. '%');
      }
      if($fs && isset($fs['admin'])){
        $rs=$rs->where('admin', $fs['admin']);
      }
      if($fs && isset($fs['parent_id'])){
        $rs=$rs->where('parent_id', $fs['parent_id']);
      }        
      $me=$this->api->api_get_user();
      if($me && ($me['admin'] != 1)){
        $rs=$rs->where('parent_id',$me['id']);
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
}

class NGTABLE_TOPICS  extends NGTABLE{
  function __construct($table='topics', $pk='id') {
    parent::__construct($table, $pk);
    $this->required[]='name';
    $this->uniques['name']='ชื่อข้อหาซ้ำ กรูณาเปลี่ยนใหม่';
    $this->uniques['code']='รหัสซ้ำ กรุณาเปลี่ยนใหม่';
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
class NGTABLE_ADMIN_CASES  extends NGTABLE{
  function __construct($table='cases', $pk='id') {
    parent::__construct($table, $pk);
  }
  function buildFilter(&$rs, $data){
    if($rs && $data){
      if(isset($data['search']) && is_array($data['search'])){
		    $p=$data['search'];
        $q='';
        $qs=array();
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
          $rs->where('date_sent>=? AND date_sent<?',$dt['begin'],$dt['end']);
          if(isset($data['court'])){
            $rs->where('user_id', $data['court']);
          }
      }
      $rs->order('date_sent desc, id desc');
      $rs->select('id,number_black,number_red,plaintiff,defendant,title,date_sent,file1,file2');


      /*
      $me=$this->api->api_get_user();
      if($me && ($me['admin'] != 1)){
        $rs=$rs->where('parent_id',$me['id']);
      } 
      */
    }
  }
}

class NGTABLE_COURT_CASES  extends NGTABLE{
  function __construct($table='cases', $pk='id') {
    parent::__construct($table, $pk);
  }
  function buildFilter(&$rs, $data){
    if($rs){
      if($data && isset($data['search']) && is_array($data['search'])){
		    $p=$data['search'];
        $q='';
        $qs=array();
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
          $rs->where('date_sent>=? AND date_sent<?',$dt['begin'],$dt['end']);
          if(isset($data['court'])){
            $rs->where('user_id', $data['court']);
          }
      }
      $rs->order('date_sent desc, id desc');
      $rs->select('id,number_black,number_red,plaintiff,defendant,title,topic_id,result,command_id,date_sent,file1,file2');


    }
  }
}


function post_users($action=''){
  $cls=new NGTABLE_USERS();
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
function post_admin_cases($action=''){
  $cls=new NGTABLE_ADMIN_CASES();
  return $cls->process($action);
}
function post_court_cases($action=''){
  $cls=new NGTABLE_COURT_CASES();
  return $cls->process($action);
}
?>