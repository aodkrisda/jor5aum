<?php

class XmlClass {
	var $dom;
	var $dom_version;
	var $dom_encoding;
	
	function XmlClass($v="1.0",$en="UTF-8"){
		$this->XML_HEADER='<?xml version="1.0" encoding="UTF-8" ?>';
		$this->dom_version=$v;
		$this->dom_encoding=$en;
		$this->init();
	}

	function init(){
		unset($this->dom);
		$this->dom=new DOMDocument($this->dom_version,$this->dom_encoding);
		$this->dom->preserveWhiteSpace = false;
		$this->dom->formatOutput = true;

	}
	function parseString($xmlStr){
		$xmlStr=trim($xmlStr);
		if(!empty($xmlStr)){
			if (!ereg("<?xml (.)*\?>",$xmlStr)){
				$xmlStr=$this->XML_HEADER . $xmlStr;
			}
			$tmp=new XmlClass();
			@$tmp->loadXML($xmlStr);
			return $tmp;
		}
		return null;
	}
	function load($xmlFile){
		if(file_exists($xmlFile)){
			$xmlStr=@file($xmlFile);
			$xmlStr=implode('', $xmlStr);
			$this->loadXML($xmlStr);
			return true;
		}
		return false;
	}

	function loadXML($xmlStr=null){
		$this->init();
		@$this->dom->loadXML($this->clearSpace($xmlStr));
	}

	function Obj2Dom(&$obj){
		$dc=new XmlClass();
		if($obj){
			$top=$dc->documentElement('lib');
			
			foreach($obj as $id=>$value){
				if($id=='children'){
					if(is_array($value)){
						foreach($value as $value2){
							$this->_Obj2Dom($value2,$top,$dc);
						}
					}
				}else{
					@$top->setAttribute($id,$value);
				}
			}
			
		}
		return $dc;
	}

	function _Obj2Dom(&$obj, &$elm, &$dc){
		if($obj){
			$top=$dc->newElement('lib');
			$elm->appendChild($top);
			foreach($obj as $id=>$value){
				if($id=='children'){
					if(is_array($value)){
						foreach($value as $value2){
							$this->_Obj2Dom($value2,$top,$dc);
						}
					}
				}else{
					@$top->setAttribute($id,$value);
				}
			}
		}
	}

	function save($xmlFile=null,$formatOutput=true){
		$old=$this->dom->formatOutput;
		$this->dom->formatOutput=$formatOutput;
		if($xmlFile==null){
			$ret=$this->dom->saveXML();
		}else{
			$ret=$this->dom->save($xmlFile);
		}
		$this->dom->formatOutput=$old;
		return $ret;
	}

	function toString($node=null,$head=false,$formatOutput=true){
		if($node){
			$x_v=(empty($doc->version))?"1.0":$doc->version;
			$x_e=(empty($doc->encoding))?"UTF-8":$doc->encoding;
			$ret='';
			if($head){
				$ret='<?xml version="'. $x_v. '" encoding="' . $x_e . '"?>';
			}
			$old=$this->dom->formatOutput;
			$this->dom->formatOutput=$formatOutput;
			$ret=$ret . $this->dom->saveXML($node);
			$this->dom->formatOutput=$old;
			return $ret;
		}
		return $this->dom->saveXML();
	}
	function toObject(&$node){
		$row=null;
		if($node && $node->nodeType==1){
			foreach ($node->attributes as $at) {
				$row[$at->nodeName]=$at->nodeValue;
			}
		}
		return $row;
	}
	
	function setDocumentElement(&$elm){
		if($elm){
			$nelm=$this->cloneNode($elm,true);
			if($nelm){
				$this->loadXML($this->toString($nelm,true));
			}
		}
	}

	function cloneNode(&$src, $loop=true){
		$tmp=$this->dom->importNode($src, $loop);
		return $tmp->cloneNode($loop);
	}

	function newElement($path, $atts=null){
		if($this->dom){
			$tm=explode("/", $path);
			$paths=Array();
			foreach ($tm as $it) {	
				if(trim($it)!=''){
					$paths[]=$it;
				}
			}
			
			if(count($paths)<0) return null;
		
			$path=array_shift($paths);
			$tmp=$this->dom->createElement($path);
			$cursor=$tmp;
			while (($cursor)&&(count($paths))) {
				$path=array_shift($paths);
				$elm=$this->dom->createElement($path);
				$cursor=$cursor->appendChild($elm);				
			}
			if($tmp && is_array($atts)){
				foreach($atts as $_a=>$_b){
					@$tmp->setAttribute($_a,$_b);
				}
			}
			return $tmp;
		}
		return null;
	}

	function selectElement($path){
		if($this->dom){
			$xpath = new DOMXPath($this->dom);
			$entries=$xpath->query($path);
			if($entries->length>0)return $entries->item(0);
		}
		return null;
	}

	function setColumn(&$node,$cname,$value=''){
		if($value){
				$value=$this->removeInvalidCharacters($value);
		}
		if(ereg('^@.{1}',$cname)){
			$node->setAttribute(substr($cname,1),$value);
			return true;
		}
		$entries=$this->query($cname,$node);
		if($entries->length>0){	
			$entry=$entries->item(0);
			if($entry->hasChildNodes()){
				if($entry->firstChild->nodeType==3){ //text
					$entry->firstChild->nodeValue=$value ;
					return true;
				}
			}
		}else{
			$entry=$this->dom->createElement($cname);
			if($entry)$node->appendChild($entry);
		}
		if($entry){
			$tx=$this->dom->createTextNode($value);
			if($entry->hasChildNodes()){
				$entry->insertBefore($tx,$entry->firstChild);
			}else{
				$entry->appendChild($tx);
			}
			return true;
		}
		return false;
	}

	function getColumn(&$node,$cname,$defvalue=''){
		if(ereg('^@.{1}',$cname)){
			$atb=substr($cname,1);
			if($node->hasAttribute($atb)){
				return $node->getAttribute($atb);
			}
		}
		$entries=$this->query($cname,$node);
		if($entries->length>0){	
			$entry=$entries->item(0);
			if($entry->hasChildNodes()){
				if($entry->firstChild->nodeType==3){ //text
					return $entry->firstChild->nodeValue;
				}
			}
		}
		return $defvalue;
	}

	function createElement($path){
		if($this->dom){
			$tm=explode("/", $path);
			$paths=Array();
			foreach ($tm as $it) {	
				if(trim($it)!=''){
					$paths[]=$it;
				}
			}
			
			if(count($paths)<0) return null;
		
			if($this->dom->documentElement){
				$cursor=$this->dom->documentElement;
				
			}else{
				$elm=$this->dom->createElement('ROOT');
				$cursor=$this->dom->appendChild($elm);
			}

			$xpath = new DOMXPath($this->dom);
			do{
				$path=array_shift($paths);
				$entries=$xpath->query($path,$cursor);
				if($entries->length>0){
					$cursor=$entries->item(0);
				}else{
					$elm=$this->dom->createElement($path);
					$cursor=$cursor->appendChild($elm);				
				}
			}while(($cursor)&&(count($paths)));
			unset($xpath);
			return $cursor;
		}
		return null;
	}

	function removeElement($path){
		$elm=selectElement($path);
		if($elm) return $elm->parentNode->removeChild($elm);
		return null;
	}

	function query($sql,$node=null){
		$xpath = new DOMXPath($this->dom);
		if(empty($sql))return null;
		if($node==null){
			return $xpath->query($sql);	
		}else{
			return $xpath->query($sql, $node);	
		}
		return null;
	}

	function documentElement($name='ROOT'){
		if($this->dom->documentElement) return $this->dom->documentElement;
		if(empty($name))$name='ROOT';
		$elm=$this->dom->createElement($name);
		$this->dom->appendChild($elm);		
		return $this->dom->documentElement;
	}

	function moveTo($node,$index=1,$filter=''){
		$index=(int)$index;
		if ($index<1) $index=1;
		$root=$node->parentNode;
		if($root){
			if($root->removeChild($node)){
				$cols=$this->query($node->nodeName . ((empty($filter))?'':$filter), $root );
				if($cols->length){
					if($index <= $cols->length){
						return $root->insertBefore($node,$cols->item($index-1));
					}else{
						return $root->appendChild($node);
					}
				}else{
					return $root->appendChild($node);
				}
			}
		}
		return null;
	}

	function clearSpace($buffer=''){
		$buf=$this->removeInvalidCharacters(trim($buffer));
		return $buf;

		/*
		$buf=preg_replace("/>\s+</i", "><", $buf);
		$buf=preg_replace("/\?>\s+</i", "><", $buf);
		$buf=preg_replace("/\r\n/i", "&#13;", $buf);
		$buf=preg_replace("/\n/i", "&#13;", $buf);
		$buf=preg_replace("/\r/i", "&#13;", $buf);

		*/
		return $buf;
	}
	function removeInvalidCharacters($buf){
		$esc=array();
		$esc2=array();
		for($i=1;$i<32;$i++){
			if(($i==10)||($i==13))continue;
			$ch=chr($i);
			$esc[]=$ch;
			$esc2[]='';
		}

		$buf=str_replace($esc,$esc2,$buf);
		return $buf;
	}
}
?>