import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { QustadyService } from '../service/qustady.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.page.html',
  styleUrls: ['./student-form.page.scss'],
})
export class StudentFormPage implements OnInit {
  userType='';
  registrationType='';
  reg_data={
    children: '',
    country_id: '',
    country_name: '',
    selected_courses: [],
    total_course_cost: '',
    token:''
  }

  notMatched=false;
  submitAttempt = false;
  form: FormGroup;

  grades=[1,2,3,4,5,6,7,8,9,10,11,12];
  temp_array=[];
  student_data=[];

  constructor(private storage:Storage,
    public formBuilder: FormBuilder,
    private serv:QustadyService,
    private alertController: AlertController,
    private router:Router
    ){ 
    this.form = formBuilder.group({
      parent_name: ['',Validators.compose([Validators.required])],
      email: ['',Validators.compose([Validators.required, Validators.email])],
      password: ['',Validators.compose([Validators.required,Validators.minLength(6)])],
      confirm_password: ['',Validators.compose([Validators.required,Validators.minLength(6)])],
      mobile: ['',Validators.compose([Validators.required])],
      student: '',
      sct: '',
      grade: ''
    })
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('registration_data').then(res=>{
      this.reg_data=res;
      for(let i=0; i<res.children;i++){
        this.temp_array.push(i);
      }
    })
    this.storage.get('registrationType').then(res2=>{
      this.registrationType=res2;
    })
    this.storage.get('userType').then(res3=>{
      this.userType=res3;
    })
  }
  
  save(){
    this.submitAttempt=true;
    if(!this.form.valid){
      return;
    }
    else if(this.form.value.password != this.form.value.confirm_password){
      this.notMatched=true;
    }
    else{
         this.presentAlert();
    }
  }



  async presentAlert() {
      const alert = await this.alertController.create({
        header: 'Link Ref Number',
        inputs: [
          {
            name: 'confirmation_code',
            placeholder: 'Enter confirmation code sent to your mobile.',
            type: 'text'
          }
        ],
        buttons: [
          {
            text: 'Resend',
            role: 'resend',
            cssClass: 'secondary',
            handler: (blah) => {
            }
          }, 
          { 
            text: 'Save',
            role: 'save',
            handler: () => {
            }
          }
        ]
      });

      await alert.present();
      let result = await alert.onDidDismiss();

      if(result.role=='save'){
         const data1={action: 'send_message', code:result.data.values.confirmation_code}
         this.serv.commonFunctionCall(data1).subscribe(res1=>{
            if(res1==1){
                const data={
                  action:'register',
                  userType:this.userType,
                  registrationType: this.registrationType,
                  country_id: this.reg_data.country_id,
                  country_name:this.reg_data.country_name,
                  children: this.reg_data.children,
                  selected_courses:this.reg_data.selected_courses,
                  parent_name: this.form.value.parent_name,
                  email: this.form.value.email,
                  password: this.form.value.confirm_password,
                  mobile:this.form.value.mobile,
                  student:[{student:this.form.value.student, grade:this.form.value.grade, sct:this.form.value.sct}],
                }
                this.serv.commonFunctionCall(data).subscribe(res=>{
                  console.log(res);
                  this.router.navigateByUrl('/login');
                })
            }
        })
      }
  }

  //test_student1526
}

