<?php

class WebSession extends \Slim\Helper\Set {
	private $smy=null;
    public function __construct($items = array())
    {
		$this->smy = WebSesssionMYSQL::getInstance();
		$this->session_start();
		$this->data=&$_SESSION;
        parent::__construct($items);
    }

	protected function session_start($id=null){
		if($id){
			@session_id($id);
		}

		@ini_set('session.use_cookies', 0);
		@ini_set('session.use_only_cookies', 0);
		@ini_set('session.use_trans_sid', 0);
		@ini_set('session.cache_limiter', '');
		
		if($this->smy->has($auth)){
			@session_id($auth);
			@session_start();
		}
	}
}

class WebSesssionMYSQL implements SessionHandlerInterface {
	/*
	CREATE TABLE IF NOT EXISTS `sessions` (
	  `id` varchar(255) NOT NULL,
	  `data` mediumtext NOT NULL,
	  `access` int DEFAULT 0,
	  `created` int NOT NULL,
	  `modified` int NOT NULL
	) ENGINE=InnoDB DEFAULT CHARSET=utf8;
	ALTER TABLE `sessions` ADD PRIMARY KEY (`id`);
	*/

	static private $_instance=null;
	public static function getInstance(){
		if(!self::$_instance){
			self::$_instance=new WebSesssionMYSQL();
		}
		return self::$_instance;
	}

	private $app=null;
	public function __construct($app=null){
		if($app && is_a($WF, 'Slim')){
			$this->app=$app;
		}else{
			$this->app=\Slim\Slim::getInstance();
		}
		$this->app->orm->addPrimary('sessions','id');
		@session_set_save_handler($this, true);
	}

	public function has($id){
		if($id){
			$r=$this->app->orm->sessions()->where('id',$id)->limit(1);
			if(count($r)){
				return true;
			}
		}
		return false;
	}
    public function open($savePath, $sessionName) {
        return true;
    }

    public function close(){
        return true;
    }

    public function read($id){
		//retrive data and return
		$r=$this->app->orm->sessions()->where('id',$id)->fetch();
		if($r){
			return (string) $r['data'];
		}
        return true;
    }

    public function write($id, $data) {
		//insert update
		$t=$this->app->orm->sessions()->where('id',$id);
		$r=$t->fetch();
		$tm=array('data'=>$data, 'access'=>1, 'modified'=>time());
		if($r){
			$tm['access']=intval($r['access']) + 1;
			$r->update($tm);
		}else{
			$tm['id']=$id;
			$tm['created']=time();
			$r=$t->insert($tm);
		}
        return ($r) ? true:false;
    }

    public function destroy($id){
		//delete
		$this->app->orm->sessions()->where('id',$id)->delete();
        return true;
    }

    public function gc($maxlifetime) {
		$tm=time() - intval($maxlifetime);
		$this->app->orm->sessions()->where('modified < ?',$tm)->delete();
        return true;
    }
}

