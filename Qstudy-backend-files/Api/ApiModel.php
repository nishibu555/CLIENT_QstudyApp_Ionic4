<?php
class ApiModel extends CI_Model{


   public function login($result){
    $p=md5($result->password); 
    $res=$this->db->query('SELECT * FROM tbl_useraccount WHERE `user_email`="'.$result->email.'" AND `user_pawd`="'.$p.'" AND (`user_type`=1 OR `user_type`=2) OR `user_type`=6 ')->row();

	  if($res){
	  	return $res;
	  }
	  else{
	  	$data=array();
	  	$data['failed']=true;

	  	return $data;
	  }			
   }



   public function get_all_country(){
      $this->db->select('*');
      $this->db->from('tbl_country');
      return $this->db->get()->result_array();
   }     
   
   public function get_all_course($result){
      $this->db->select('*');
      $this->db->from('tbl_course');
      $this->db->where('is_enable', 1);
      $this->db->where('user_type', $result->user_type);
      $this->db->where('country_id', $result->country_id);
      return $this->db->get()->result_array();
   }
   
   public function send_message($result){
      return $result->code;
   }

   public function register($result){
      $response=array();
      $response['flag']='';

      $data['children_number'] = $result->children;
      $data['subscription_type']=$result->registrationType;
      $data['user_type']=$result->userType;
      $data['country_id']=$result->country_id;
      $data['name']=$result->parent_name;
      $data['user_email']=$result->email;
      $data['user_pawd'] = ($result->password);
      $data['user_mobile'] = $result->mobile;
      $data['created']=time();
      $this->db->insert('tbl_useraccount',$data);
      $parent_id=$this->db->insert_id();

      foreach ($result->student as $key => $value) {
                $raw_st_data=array();
                $st['name'] = $value->student;
                $pieces = explode(" ", $st['name']);
                $random_number = rand(100, 999);
                $st['user_email']=$pieces[0];
                $raw_st_data['st_name']=$pieces[0];
                $raw_st_data['st_password']=$pieces[0].$random_number;
                $st['user_pawd']=md5($pieces[0].$random_number);
                $st['parent_id']=$parent_id;
                $st['user_type']=6;
                $st['country_id']=$result->country_id;
                $st['student_grade']=$value->grade;
                $st['created']=time();
                $this->db->insert('tbl_useraccount', $st);
                $student_id=$this->db->insert_id();

                foreach ($result->selected_courses as $k => $v) {
                    $course['course_id']=$v->course_id;
                    $course['cost']=$v->course_cost;
                    $course['user_id'] = $student_id;
                    $course['created'] = time();
                    $this->db->insert('tbl_registered_course', $course);
                }

                $st['SCT_link'] = $value->sct;
                if ($st['SCT_link']) {
                    $sct_link=$this->db->select('*');
                              $this->db->from('tbl_useraccount');
                              $this->db->where('SCT_link',$st['SCT_link']);
                              return $this->db->get()->result_array();

                    if ($sct_link){
                        $enrl['sct_id'] = $sct_link[0]['id'];
                        $enrl['st_id'] = $student_id;
                        $enrl['sct_type'] = $sct_link[0]['user_type'];
                        $this->db->insert('tbl_enrollment', $enrl);
                    }
                }
                $student_list[]=$raw_st_data;
      }

      $courseName='';
      foreach ($result->selected_courses as $c) {
          $course['course_id']=$c->course_id;
          $course['cost']=$c->course_cost;
          $courseName .='course_name';
          $course['user_id']=$parent_id;
          $course['created']=time();
          $this->db->insert('tbl_registered_course', $course);
      }

      if ($result->registrationType != 'trial') {
        //  $this->mailTemplate($result->parent_name, $result->email, $result->password, $student_list);
          $response['flag']=1;
      }
      else {
       //  $this->mailTemplate($result->parent_name, $result->email, $result->password, $student_list);
           $response['flag']=2;
      } 

      return $response;
   }



}    