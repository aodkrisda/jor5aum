<?php
class HomeController extends Controller{
	protected function initialize(){
		$this->roles=array();//array('','user','admin');
	}

	public function ActionIndex(){
		$this->render('home.twig');
	}

	public function LoveMeLoveDogAction(){
		echo "TEST Helow World". time() ;
		var_dump(func_get_args()); 
	}	
}