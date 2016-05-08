<?php
@date_default_timezone_set("Asia/Bangkok");
/* fix input of CGI/FastCGI */
if(strpos($_SERVER["SERVER_SOFTWARE"],'nginx/')!==false){
if(!isset($_SERVER['PATH_INFO'])){
  $a=explode('.php',$_SERVER["PHP_SELF"]);
  if((count($a)>1)){
    $_SERVER["SCRIPT_NAME"]=$a[0] .'.php';
    $_SERVER['PATH_INFO']=$a[1];
  }
  unset($a);
}
}

//auto require
require 'autoload.php';


class REST_API{
  private $_allow_cros=true;
  private $_allow_cooki=true;
  private $_allow_auto_rest=false;
  private $_method;
  
  private $_prefix_apiphp='';
  private $_user=null;
  
  function __construct(){
    //@ini_set('session.use_cookies', ($this->_allow_cooki)?'1':'0');
  }
  
  public function removeCookie(){
    if(!$this->_allow_cooki){
      $na=session_name();
        if(!headers_sent()){
           @header_remove('set-cookie');
        }
    }
  }
  
  public function sendJson($data,$code=null){
    $this->removeCookie();
    if ($this->_allow_cros && isset($_SERVER['HTTP_ORIGIN'])) {
      if(isset($_SERVER['HTTP_HOST'])){
        if(strpos($_SERVER['HTTP_ORIGIN'], '://'.$_SERVER['HTTP_HOST'])===false){
          header('Access-Control-Allow-Origin: '.$_SERVER['HTTP_ORIGIN'] );
          header('Access-Control-Allow-Credentials: true');
          header('Access-Control-Allow-Headers: Authorization,Content-Type');
          if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
            header('Access-Control-Max-Age: 86400');
          }
        }
      }
    }
    if(Is_int($code)){
      @http_response_code($code);
    }
    header('Content-Type: text/json; charset=utf-8');
    echo json_encode($data,JSON_UNESCAPED_UNICODE);
    exit();
  }
  
  public function api_require_fields($fds,$pk=null){
    $error_fields='';
    if(is_array($fds)){
        foreach ($fds as $field) {
          if (!isset($_POST[$field])) {
              if(!$pk){
                if($error_fields) $error_fields.=', ';
                $error_fields .= $field;
              }
          }
        }
    }
    
    if($error_fields){
      header($_SERVER["SERVER_PROTOCOL"]." 400 Bad Request"); 
      $this->sendJson(array('error'=>true, 'message'=>'Required field(s) ' . $error_fields . ' is missing or empty'));
    }
  }
  
  public function api_set_user($data){
    if($data){
      if(!session_id()){
        @session_start();
      }
      $_SESSION['user']=$data;
      $_SESSION['id']=session_id();
      $this->_user = $data;
      return $_SESSION['id'];
    }
    return false;
  }
  
  public function api_get_user(){
    if($this->_user) return $this->_user;
    @session_start();
    if(isset($_SESSION['user'])){
		if($_SESSION['user']['id']==$this->auth_user){
			$this->_user=$_SESSION['user'];
			return $_SESSION['user'];
		}
		$this->_user=null;
    }
    $_SESSION=array();
    session_destroy();
      
    /*
    $sid='';
    if(isset($_COOKIE) && isset($_COOKIE[session_name()])){
      $sid=$_COOKIE[session_name()];
    }
    
    $headers = apache_request_headers();
    if($headers && isset($headers['Authorization']) && $headers['Authorization']){
      $sid=$headers['Authorization'];
    }
    
    if($sid && (session_id()!=$sid)){
      session_id($headers['Authorization']);
      session_start();

      if(isset($_SESSION['user'])){
          if($_SESSION['id']==$headers['Authorization']){
            return $_SESSION['user'];
          }
      }
      $_SESSION=array();
      session_destroy();
    }
    */
  
    return null;
  }
  
  public function api_get_role(){
    $user=$this->api_get_user();
    if($user && isset($user['admin'])){
      switch($user['admin']){
        case '0':
          return 'court';
        case '1':
          return 'admin';
        case '2':
        case '3':
          return 'judge';
      }
    }
    return 'unknow';
  }

  public function api_check_user(){
    if(!$this->api_get_user()){
        header($_SERVER["SERVER_PROTOCOL"]." 401 Unauthorized"); 
        $this->sendJson(array('error'=>true, 'message'=>'401 Unauthorized'));
    }
  }

  public function api_gen_key() {
     return md5(uniqid(rand(), true));
  }
  public function getMethod(){
    return $this->_method;
  }  
  public function isGet(){
    return ($this->_method=='get');
  }  
  public function isPost(){
    return ($this->_method=='post');
  }
  public function isPut(){
    return ($this->_method=='put');
  }  
  public function isDelete(){
    return ($this->_method=='delete');
  } 
  
  public function isOptions(){
    return ($this->_method=='options');
  }  
  
   
  public function start(){

    //if is main module
    $path=''; 
    if(isset($_SERVER['PATH_INFO'])) $path=preg_replace('/^\/{1,}/','',$_SERVER['PATH_INFO']);
    $path=preg_replace('/\/{1,}$/','',$path);

	$this->auth_user='';
	$this->auth_pwd='';
	if(isset($_SERVER['PHP_AUTH_USER'])){
		$this->auth_user=$_SERVER['PHP_AUTH_USER'];
		$this->auth_pwd=$_SERVER['PHP_AUTH_PW'];
	}

    if($path){
      $params=explode('/',$path);
      if(count($params)>1){
        $fn=array_shift($params);
        $api_dir=$this->_prefix_apiphp. $fn . '/';
        $api_file=$api_dir . 'main.php';
        


        if(is_file($api_file)){
          $method=strtolower($_SERVER['REQUEST_METHOD']);
          $this->_method=$method;
          
          if($method=='options'){
            $this->sendJson(array('error'=>false, 'data'=>null));          
          }  
          
          require_once($api_file);
          if(isset($_SERVER['HTTP_CONTENT_TYPE'])){
            if(!isset($_SERVER['CONTENT_TYPE'])){
                $_SERVER['CONTENT_TYPE']=$_SERVER['HTTP_CONTENT_TYPE'];
            }
          }
          if(isset($_SERVER['CONTENT_TYPE']) && strpos(strtolower($_SERVER['CONTENT_TYPE']), 'application/json')!==false){
            try{
             $json = file_get_contents('php://input');
             $_POST= json_decode($json,true);
            }catch(Exception $e){}
            if(!is_array( $_POST))  $_POST=array();
          }
          
         
          $fn=array_shift($params);
          $handler=$method . '_'. $fn;
          $ret=null;
          
          if(function_exists($handler)){
            $ret=call_user_func_array($handler,$params);
          }else{
            $handler='all_'. $fn;
            if(function_exists($handler)){
              $ret=call_user_func_array($handler,$params);      
            }else{
              $magic=true;
              $api_file2=$api_dir . $fn . '.php';
              if(($api_file2!=$api_file) && file_exists($api_file2)){
                  require_once($api_file2);
                  $handler=$method . '_'. $fn;
                  if(!function_exists($handler)){
                    $handler='all_'. $fn;
                  }
                  if(function_exists($handler)){
                    $ret=call_user_func_array($handler,$params);
                    $magic=false;
                  }
              }
              if(false && $magic && $this->_allow_auto_rest){
                $handler='magic_restfull';
                if(function_exists($handler)){
                  array_unshift($params,$fn);
                  $ret=call_user_func_array($handler,$params);      
                }
              }
            }
          }
          if($ret!==null){
            if($ret===false){
              header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found"); 
              $this->sendJson(array('error'=>true));
            }else{
              if(isset($ret['__raw']) && $ret['__raw']){
                unset($ret['__raw']);
                $this->sendJson($ret);
              }
              $this->sendJson(array('error'=>false,'data'=>$ret));
            }
          }

          header($_SERVER["SERVER_PROTOCOL"]." 405 Method Not Allowed"); 
          $this->sendJson(array('error'=>true, 'message'=>'405 Method Not Allowed'));
        }
      }
      header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found"); 
      $this->sendJson(array('error'=>true, 'message'=>'404 Not Found'));
    }
    echo "Restfull API 1.0";
  }
 }

//create api instance
$a=str_replace('\\','/',realpath($_SERVER['SCRIPT_FILENAME']));
$b=str_replace('\\','/',realpath(__FILE__));
if($a === $b){

  //@ini_set('display_errors', 'Off');
  global $api;
  global $norm;
  $norm=NotORM::getInstance();
  $api=new REST_API();
  $api->start();
}
