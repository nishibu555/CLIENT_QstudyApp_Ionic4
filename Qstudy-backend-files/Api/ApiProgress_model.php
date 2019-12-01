<?php
class ApiProgress_model extends CI_Model{

public function student_progress_step7($result){
   $data=array();
   $data['registered_courses'] = $this->db->select('tbl_registered_course.user_id,tbl_course.*')
                                          ->from('tbl_registered_course')
                                          ->join('tbl_course','tbl_course.id = tbl_registered_course.course_id')
                                          ->where('user_id',$result->user_id)
                                          ->get()->result();
   
   return $data;                                       
}
    
public function student_progress_course($result){

    if ($result->user_type==2 || $result->user_type==6) { 
        $data['id'] = $result->user_id;
        $info=$this->db->select('name,student_grade')->where('id',$result->user_id)->get('tbl_useraccount')->row();
        $data['name'] = $info->name;
        $data['grade'] = $info->student_grade;
        $data['module_types'] = $this->db->where(['module_type!='=>'sliding'])->get('tbl_moduletype')->result();
        return $data;
    }else{
      return $data=array();
    }
   
}


public function StProgTableData($result){
    $module_user_type = '';
    $course_id = $result->course_id;
    $conditions['student_id'] = $result->student_id;
    $conditions['moduletype'] = $result->module_type;
    $allProgress=$this->studentProgress($conditions,$module_user_type,$course_id);
    $data['st_progress'] = $allProgress;
    return $data['st_progress'];
}


public function studentProgress($conditions,$module_user_type='',$course_id)
{
    $tutorType  = 7;
    $userId  = 2;
    $tutorModule = $this->db
        ->select('id')
        ->where('user_id', $userId)
        ->get('tbl_module')
        ->result_array();
     $tutorModule = array_column($tutorModule, 'id');

     if ($module_user_type != '')
     {
         $student_module = $this->db
             ->select('id')
             ->where('user_type ', $module_user_type)
             ->get('tbl_module')
             ->result_array();
         $student_module = array_column($student_module, 'id');
     }

     if ($course_id != '')
     {
         $student_module = $this->db
             ->select('id')
             ->where('course_id ',$course_id)
             ->get('tbl_module')
             ->result_array();
         $student_module = array_column($student_module, 'id');
     }

    $res = $this->db
        ->where($conditions);
    if ($tutorType==7 ||$tutorType==3) {
        $res = $res->where_in('module', $tutorModule);
    }
    if ($tutorType==6 && !empty($student_module)) {
        $res = $res->where_in('module', $student_module);
    }
        $res= $res->order_by('answerTime', 'ASC')
        ->get('tbl_studentprogress')
        ->result_array();
    return $res;
}



}