<?php
defined('BASEPATH') or exit('No direct script access allowed');
class ApiController extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('Api/ApiModel');
        $this->load->model('Api/ApiSettings_model', 'settings');
        $this->load->model('Api/ApiEnrolement_model', 'enrolement');
        $this->load->model('Api/ApiModule_model', 'module');
        $this->load->model('Api/ApiProgress_model', 'progress');
        $this->load->model('Student_model');
    }

    public function request()
    {

        $jsondata = '';

        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        @header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        $data = file_get_contents("php://input");
        $result = json_decode($data);

        if (isset($result->action)){
            $action = $result->action;
        }
        else {
            $action = '';
        }

        switch ($action) {


            //LOGIN/REGSITRATION
            //----------------------------

            //Login
            case 'login':
                $jsondata = json_encode($this->ApiModel->login($result));
                break;

            //registration  
            case 'get_all_country':
                $jsondata = json_encode($this->ApiModel->get_all_country());
                break;
                
            case 'get_all_course':
                $jsondata = json_encode($this->ApiModel->get_all_course($result));
                break;

            case 'send_message':
                $jsondata = json_encode($this->ApiModel->send_message($result));
                break;  
                
            case 'register':
                $jsondata = json_encode($this->ApiModel->register($result));
                break;



            //HOME/PERSONAL
            //----------------------------

            //Settings
            case 'get_student_detail':
                $jsondata = json_encode($this->settings->get_student_detail($result));
                break;
                
            case 'update_student':
                $jsondata = json_encode($this->settings->update_student($result));
                break;

            //Logo/Photo
            case 'update_student_image':
                $jsondata = json_encode($this->settings->update_student_image($result));
                break;

            //Enrolement List
            case 'get_student_enrollment':
                $jsondata = json_encode($this->enrolement->get_student_enrollment($result));
                break;

            case 'save_ref_link':
                $jsondata = json_encode($this->enrolement->save_ref_link($result));
                break;
            



            //HOME/COURSES
            //----------------------------
                
            case 'tutorList':
                $jsondata = json_encode($this->module->tutorList($result));
                break;
                
            case 'all_tutors_by_type':
                $jsondata = json_encode($this->module->all_tutors_by_type($result));
                break;
                
            case 'get_modules_by_subject':
                $jsondata = json_encode($this->module->get_modules_by_subject($result));
                break;
                
            case 'get_question_by_module':
                $jsondata = json_encode($this->module->get_question_by_module($result));
                break;
                
                



            //HOME/VIEW PROGRESS
            //----------------------------

            //for qstudy, get all courses    
            case 'student_progress_step7':
                $jsondata = json_encode($this->progress->student_progress_step7($result));
                break;
            //find progress of course under qstudy
            case 'student_progress_course':
                $jsondata = json_encode($this->progress->student_progress_course($result));
                break;
                
            case 'StProgTableData':
                $jsondata = json_encode($this->progress->StProgTableData($result));
                break;
            

            default:
                $jsondata = json_encode(array("status" => 500, "msg" => "Invalid request"));
                break;
        }
        echo $jsondata;
    }

    public function tesitng($param)
    {}

    public function login($param)
    {
        echo 123123;
    }

}
