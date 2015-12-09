<?php
function isAuth(){
	session_start();

	if(isset($_SESSION['user']) && isset($_SESSION['user']['id'])){
		return;
	}
	redirectUrl('login.php');
}

function isPost(){
    return (strtolower($_SERVER['REQUEST_METHOD'])=='post');
}

$__api=null;
function getApi(){
	global $__api;
	if(!$__api) $__api=new Informations();
	return $__api;
}

function getField($field,$escape=false){
	if($_POST && isset($_POST[$field])){
		if($escape){
			return htmlentities($_POST[$field]);
		}
		return $_POST[$field];
	}
	return '';
}

function redirectUrl($url){
	if($url){
		header(sprintf("Location: %s",$url));
		exit();
	}
}


/*
function backup_tables($orm){
    if(!$orm) return;
  
		$tables=array('cases');

		$bkfile=dirname(__FILE__).'/db-backup-'.date('Y-m',time()) .'.sql';
		$handle=false;
		if(!file_exists($bkfile)){
			$handle = @fopen($bkfile,'w+');
		}

		//cycle through
		if($handle){
			foreach($tables as $table)
			{
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
}
*/