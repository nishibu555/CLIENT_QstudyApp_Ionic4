<?php
class ApiSettings_model extends CI_Model{

public function get_student_detail($result){
	$res=$this->db->select('id,name,user_email,SCT_link,country_id,student_grade')->where('id', $result->id)->get('tbl_useraccount')->row();
	$res->country=$this->db->where('id',$res->country_id)->get('tbl_country')->row()->countryName;
	$res->studentRefLink=$this->getStudentRefLink($result->id);
	$res->student_course=$this->db->select('tbl_course.*')
	                      ->join('tbl_course', 'tbl_course.id = tbl_registered_course.course_id', 'left')
	                      ->where('user_id', $result->id)
	                      ->get('tbl_registered_course')
	                      ->result_array();

	return $res;
} 

public function getStudentRefLink($stId){
	return  $this->db->select('tbl_useraccount.*,tbl_enrollment.sct_id,tbl_enrollment.st_id')
	                ->from('tbl_useraccount')
	                ->join('tbl_enrollment', 'tbl_useraccount.id=tbl_enrollment.sct_id')
	                ->where('tbl_enrollment.st_id', $stId)
	                ->get()->result_array();
}


public function update_student($result){
	  if($result->password != '' && $result->confirm_password != '' && $result->password == $result->confirm_password){
    $this->db->where('id', $result->id)->set('user_pawd', md5($result->password))->update('tbl_useraccount');
	  }
	  if($result->student_grade != ''){
    $this->db->where('id', $result->id)->set('student_grade', $result->student_grade)->update('tbl_useraccount');
	  }

	  return true;
}


   
public function update_student_image($result){
	   if($result->image){

      $raw_img = str_replace("data:image/jpeg;base64,","",$result->image);
      $img = base64_decode($raw_img);
      $filename = FCPATH."assets/images/uploads/user_".$result->id.".jpg";
      
      if(file_exists($filename)){
         unlink($filename);
      }

      file_put_contents($filename, $img);
      $this->db->set('image', $filename)->update('tbl_useraccount');
  }
  return true;
}


}    