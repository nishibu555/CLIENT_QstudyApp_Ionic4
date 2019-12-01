import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { QustadyService } from '../service/qustady.service';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.page.html',
  styleUrls: ['./student-details.page.scss'],
})
export class StudentDetailsPage implements OnInit {
  form: FormGroup;
  error_msg='';
  student_grade: '';
  
  grades=[1,2,3,4,5,6,7,8,9,10,11,12];

  user={
    id: '',
    image: '',
    name: '',
    user_email: '',
    user_mobile: '', 
    user_type: ''
  }

  student_detail={
    id: '',
    name: '',
    user_email: '',
    country: '',
    student_grade: '',
    studentRefLink: [],
    student_course: [],
    SCT_link: 'ddddd'
  }

  constructor(
    private storage:Storage,
    private router:Router,
    private serv:QustadyService,
    public formBuilder: FormBuilder
    ){

      this.form = formBuilder.group({
        username: '',
        loginname: '',
        country: '',
        student_grade: '',
        RefLinkNo: '',
        password: '',
        confirm_password: '',
      })
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('qstudy_user').then(res=>{
        this.user=res;
        const data = {
          action: 'get_student_detail',
          id: res.id
        }
        this.serv.commonFunctionCall(data).subscribe(res2=>{
            this.student_detail=res2;
            console.log(this.student_detail)
        });
    })
  }

  
  onSubmit(){
        if( this.form.value.password.length > 1 && this.form.value.password.length < 6){ 
          this.error_msg="Password must be at least 6 characters!"
        }else if(this.form.value.password != this.form.value.confirm_password){
          this.error_msg="Password confirm password dosen't match!"
        }else{
            this.error_msg='';
            const data={
              action: 'update_student',
              id: this.user.id,
              password: this.form.value.password,
              confirm_password : this.form.value.confirm_password,
              student_grade: this.student_grade
            }
            
            this.serv.commonFunctionCall(data).subscribe(res=>{  
               this.router.navigateByUrl('/home');
            });
        }
  } 
  
  selected_grade(grade:any){
    this.student_detail.student_grade=grade.detail.value;
    this.student_grade=grade.detail.value;
  }


}
