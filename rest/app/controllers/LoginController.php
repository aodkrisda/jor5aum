<?php
class LoginController extends Controller{
	protected function initialize(){
		$this->roles=array();
	}

	public function ActionIndex(){
		$result=null;
		$req=$this->app->request;
		if($req->isPost()){
			$user=$req->post('user','');
			$pass=$req->post('pass','');
			$r=$this->app->orm->user()->where('user_id',$user)->where('password',$pass)->limit(1);
			$success=count($r);
			if($success){
				$user=$r->fetch()->toArray();
				$result=$this->app->user->setUser($user);
			}
		}
		$errors=array('user'=>'', 'pass'=>'incorrect!');
		$this->app->flashNow('errors',$errors);
		$this->render('login.twig',$req->post());
	}

	public function ActionLogout(){
		$this->app->user->setUser(null);
		echo 9999;
		exit();
	}
}