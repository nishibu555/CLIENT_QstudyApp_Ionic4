import { Component, OnInit } from '@angular/core';
import { QustadyService } from '../service/qustady.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-course',
  templateUrl: './select-course.page.html',
  styleUrls: ['./select-course.page.scss'],
})
export class SelectCoursePage implements OnInit {
  userType:any;
  disabled=true;
  countryId='';
  countryName='';
  total_course_cost=0;
  courses=[];
  selected_courses=[];
  paymentType='';
  children=1;

  constructor(private router:Router ,private serv: QustadyService,private storage:Storage) { }

  ngOnInit() {
  }
  
  ionViewWillEnter(){
    this.storage.get('registration_data').then(res=>{
        this.countryId=res.countryId;
        this.countryName=res.countryName;
        this.storage.get('userType').then(user_type=>{
           this.userType=user_type;
            const data={
              action: 'get_all_course',
              user_type: user_type,
              country_id: res.countryId
            }
            this.serv.commonFunctionCall(data).subscribe(res2=>{
              this.courses=res2;
            })
        })
    })
  }
  
  selected_course(course:any, course_id, course_cost){
    if(course.detail.checked==true){
       const data={course_id: course_id, course_cost:course_cost}
       this.selected_courses.push(data);
    }
    if(course.detail.checked==false){
       for(let i=0; i< this.selected_courses.length; i++){
         if(course_id==this.selected_courses[i].course_id){
            this.selected_courses.splice(i,1);  
         } 
       }
    }
    
    //at least one course must be selected to proceed next
    if(this.selected_courses.length>0){
      this.disabled=false;
    }
    this.calculate_total();
  }
  
  
  selected_children(children:any){
      this.children=children.detail.value;
      this.calculate_total();
  }
  
  selected_payment(paymentType:any){
    this.paymentType=paymentType.detail.value;
  }


  save(){
    const reg_data={
      country_id: this.countryId,
      country_name: this.countryName,
      selected_courses: this.selected_courses,
      children: this.children,
      total_course_cost: this.total_course_cost,
      paymentType:this.paymentType,
      token:1
    }
    this.storage.set('registration_data',reg_data).then(()=>{
        if(this.userType==1){
          this.router.navigateByUrl('/student-form');
        }
        else{
          this.router.navigateByUrl('/select-course');
        }
    });
  }

  calculate_total(){
       this.total_course_cost=0;
       for(let j=0; j< this.selected_courses.length; j++){
         this.total_course_cost=this.children * (this.total_course_cost+ +this.selected_courses[j].course_cost); 
       }
  }

}
