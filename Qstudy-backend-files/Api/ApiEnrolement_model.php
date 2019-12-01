<?php
class ApiEnrolement_model extends CI_Model{

public function get_student_enrollment($result){
   $data=array();
   $data['get_involved_teacher'] = $this->get_sct_enrollment_info($result->id, 3);
   $data['get_involved_school'] = $this->get_sct_enrollment_info($result->id, 4);
   $data['get_involved_corporate'] = $this->get_sct_enrollment_info($result->id, 5);
   return $data;
} 

public function get_sct_enrollment_info($stId, $sctType){
    $this->db->select('tbl_useraccount.*,tbl_enrollment.sct_id,tbl_enrollment.st_id');
    $this->db->from('tbl_useraccount');
    $this->db->join('tbl_enrollment', 'tbl_useraccount.id=tbl_enrollment.sct_id');
    $this->db->where('tbl_useraccount.user_type', $sctType);
    $this->db->where('tbl_useraccount.parent_id', null);
    $this->db->where('tbl_enrollment.st_id', $stId);
    
    return $this->db->get()->result_array();
}



public function save_ref_link($result)
{  
    $response=array();
    $response['flag']='';

    $data_link = $result->link;

    if (!empty($data_link)) {
        $userType = $result->userType;
        $j = 0;
        foreach ($data_link as $single_link) {
            if ($single_link) {
                $get_link_validate = $this->getLinkInfo('tbl_useraccount', 'SCT_link', 'user_type', $single_link, $userType);
                if (!$get_link_validate) {
                    $j++;
                }
            }
        }
        
        if ($j > 0) {
            $response['flag']=2;
        } else {
            foreach ($data_link as $single_link) {
                $get_link_status = $this->db->where('SCT_link', $single_link)->get('tbl_useraccount')->result_array();
                if ($get_link_status) {
                    foreach ($get_link_status as $row) {
                        $enrollment_info = $this->getLinkInfo('tbl_enrollment', 'sct_id', 'st_id', $row['id'], $result->user_id);

                        if (!$enrollment_info) {
                            $link['sct_id'] = $row['id'];
                            $link['sct_type'] = $row['user_type'];
                            $link['st_id'] = $result->user_id;
                            $this->db->insert('tbl_enrollment', $link);
                        }
                    }
                }
            }

            $response['flag']=1;
        }
    }
    else {
        $response['flag']=0;
    }

    return $response;
}


public function getLinkInfo($table, $colName1, $colName2, $colValue1, $colValue2)
{
    $this->db->select('*');
    $this->db->from($table);
    $this->db->where($colName1, $colValue1);
    $this->db->where($colName2, $colValue2);
    $query = $this->db->get();
    return $query->result_array();
}

}