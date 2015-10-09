<?php
require_once ('NotORM/lib.php');


function all_reports(){
  return report1();
}

function report1(){
  $month='2015-01-01';
  $month2='2015-02-01';
  $user=3;
  
  global $norm;
  $rs=$norm->cases->select('number_black,plaintiff,defendant,title,result')->where("date_sent >= ? AND date_sent < ? AND user_id = ?", $month, $month2, $user)->order('date_sent');
  $result=$norm->groupBy($rs, 'title');
  return $result;
}
?>