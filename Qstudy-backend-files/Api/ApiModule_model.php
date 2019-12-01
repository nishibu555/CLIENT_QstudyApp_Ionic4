<?php
class ApiModule_model extends CI_Model{


public function tutorList($result){
    $studentsTutor =  $this->db->select('tbl_useraccount.id')
                      ->join('tbl_useraccount', 'tbl_useraccount.id=tbl_enrollment.sct_id', 'left')
                      ->where('st_id', $result->user_id)
                      ->get('tbl_enrollment')
                      ->result();
    
    $allTutorIds = array_column($studentsTutor, 'id');
    $all_parents = $this->db->query("SELECT id, name FROM `tbl_useraccount` ". "WHERE user_type = 7 OR ". "id IN (SELECT sct_id FROM tbl_enrollment WHERE st_id =$result->user_id) AND ". "`tbl_useraccount`.parent_id IS NULL AND user_type != 1")->result_array();
            
    $i = 0;
    foreach ($all_parents as $row) {
        $get_child_info = $this->db->where('parent_id', $row['id'])->get('tbl_useraccount')->result();
        if ($get_child_info) {
            $all_parents[$i]['child_info'] = $get_child_info;
        }
        $i++;
    }
    $data['allTutors'] = $all_parents;

    return $data['allTutors'];
}


public function all_tutors_by_type($result){
    $data=array();
    $this->db->where('st_id',$result->user_id)->delete('tbl_temp_tutorial_mod_ques');

    $data['moduleType'] = $result->module_type;
    $data['tutorInfo'] = $this->db->select('id as tutor_id,name as tutor_name, user_type')->where('id', $result->tutor_id)->get('tbl_useraccount')->row();

    $data['user_info'] = $this->db->select('tbl_useraccount.id,tbl_useraccount.name,tbl_country.id as country_id,tbl_country.countryName, tbl_country.countryCode,zone.zone_id,zone_name')
                                  ->from('tbl_useraccount')
                                  ->join('tbl_country', 'tbl_useraccount.country_id = tbl_country.id', 'LEFT')
                                  ->join('zone', 'UPPER(tbl_country.countryCode) = zone.country_code', 'LEFT')
                                  ->where('tbl_useraccount.id', $result->user_id)
                                  ->get()->row();
    
    if ($result->module_type == 2 && $data['tutorInfo']->user_type == 7) {
        $get_all_course = $this->db->join('tbl_course', 'tbl_course.id = tbl_registered_course.course_id', 'left')
						            ->where('user_id', $result->user_id)
						            ->get('tbl_registered_course')
						            ->result_array();
        $course_match_with_subject_key_val = array();
        foreach ($get_all_course as $course) {
            $course['subject_id'] = $course['course_id'];
            $course['subject_name'] = $course['courseName'];
            $course_match_with_subject_key_val[] = $course;
        }
        $data['studentSubjects'] = $course_match_with_subject_key_val;
     }
      else {
        if ($data['tutorInfo']->user_type == 7) {
            $subject_with_course = $this->studentSubjects($result->user_id);
        }
        if ($data['tutorInfo']->user_type == 3) {
            $subject_with_course =  $this->db->join('tbl_subject', 'tbl_module.subject = tbl_subject.subject_id', 'LEFT')
									        ->where('tbl_module.user_id', $result->tutor_id)
									        ->get('tbl_module')
									        ->result_array();
        }

        // $students_all_subject = array();

        // foreach ($subject_with_course as $subject_course) {
        //     $set_subject = 1;
        //     if ($subject_course['isAllStudent'] == 0) {
        //         $individualStudent = json_decode($subject_course['individualStudent']);
        //         $individualStudent = is_null($individualStudent) ? [] : $individualStudent;
        //         if (sizeof($individualStudent) && in_array($result->user_id, $individualStudent)) {
        //             $set_subject = 1;
        //         } else {
        //             $set_subject = 0;
        //         }
        //     }
        //     if ($set_subject == 1) {
        //         $students_all_subject[] = $subject_course;
        //     }
        // }

        // $data['studentSubjects'] = array_values(array_column($students_all_subject, null, 'subject_id'));
    }
    if ($result->tutor_id == 2){


        $all_registered_courses= $this->db->select('tbl_registered_course.user_id,tbl_course.*')
                                            ->from('tbl_registered_course')
                                            ->join('tbl_course','tbl_course.id = tbl_registered_course.course_id')
                                            ->where('user_id',$result->user_id)
                                            ->get()->result_array(); 
        $d=array();
        foreach ($all_registered_courses as $i => $rc_value) {
            $reg_courses=array();
            $reg_courses['course_info']=$rc_value;

            $assign_sub=$this->db->select('subject_id')->where('course_id',$rc_value['id'])->get('tbl_assign_subject')->row();
            $subject_ids=json_decode($assign_sub->subject_id);
            $dd=array();
            foreach ($subject_ids as $sub_k => $sub_id) {
               $sub=$this->db->where('subject_id',$sub_id)->get('tbl_subject')->row();
               $sub->course_id=$rc_value['id'];
               $dd[$sub_k]=$sub;
            }
            $reg_courses['subjects_of_course']= $dd;
            
          $d[$i]= $reg_courses;
        }
        $data['registered_courses']=  $d;
    }

     return $data;
}

public function studentSubjects($studentId){
    $temp=$this->db->join('tbl_course', 'tbl_course.id = tbl_registered_course.course_id', 'left')
        ->where('user_id', $studentId)
        ->get('tbl_registered_course')
        ->result_array();

    $studentCourses = array_column($temp, 'id');
    if (!count($studentCourses)) {
        return [];
    }

   return $this->db
    ->join('tbl_subject', 'tbl_module.subject = tbl_subject.subject_id', 'LEFT')//Newly Added
    ->where_in('tbl_module.course_id', $studentCourses)
    ->get('tbl_module')
    ->result_array();
}



public function get_modules_by_subject($result){
	$moduleType =$result->moduleType;
	$user_id=$result->user_id;
	$subjectId=$result->subjectId;
	$tutorId =$result->tutorId;
	$tutor_userType =$result->tutor_userType;
	$courseId =$result->courseId; 
	$studentGrade = $this->db->select('student_grade')->where('id',$result->user_id)->get('tbl_useraccount')->row()->student_grade;
	  

	$response=array();

	//for TUTORIAL(moduletype-1) QSTUDY(userType-7)
	if($moduleType==1 && $tutor_userType){
	  $response =$this->db->select('tbl_module.id,
	                                tbl_module.moduleName,
	                                tbl_module.trackerName,
	                                tbl_module.chapter,
	                                tbl_subject.subject_name, 
	                                tbl_chapter.chapterName'
	                              )
	                      ->where(['subject'=> $result->subjectId, 
	                               'course_id'=>$result->courseId, 
	                               'moduleType'=>$result->moduleType,
	                               'studentGrade'=>$studentGrade,
	                               'user_id'=> $tutorId,
	                               'user_type'=>$tutor_userType
	                             ])
	                      ->from('tbl_module')
	                      ->join('tbl_subject', 'tbl_subject.subject_id=tbl_module.subject') 
	                      ->join('tbl_chapter', 'tbl_chapter.id=tbl_module.chapter')
	                      ->get()->result();
	}

	return $response;
}


public function get_question_by_module($result){
	$res=$this->db->where('tbl_modulequestion.module_id', $result->module_id)
	              ->from('tbl_modulequestion')
	              ->join('tbl_module', 'tbl_modulequestion.module_id = tbl_module.id', 'LEFT')
	              ->join('tbl_moduletype', 'tbl_moduletype.id = tbl_module.moduleType', 'LEFT')
	              ->join('tbl_question', 'tbl_question.id = tbl_modulequestion.question_id', 'LEFT')
	              ->order_by('tbl_modulequestion.question_order')
	             ->get()->result();

	foreach ($res as $key => $value) {        
	    $value->questionName=json_decode($value->questionName);
	    $value->question_instruction=json_decode($value->question_instruction);
	} 

	$total=$this->db->select('sum(questionMarks) as total')
	              ->where('tbl_modulequestion.module_id', $result->module_id)
	              ->from('tbl_modulequestion')
	              ->join('tbl_question', 'tbl_question.id = tbl_modulequestion.question_id', 'LEFT')
	              ->get()->row();


	$response=array();
	$response['module_name']= $res[0]->moduleName; 
	$response['module_type']= $res[0]->moduleType;
	$response['all_question']= $res; 
	$response['total_mark']= $total->total;  

	return $response;               
}


}    