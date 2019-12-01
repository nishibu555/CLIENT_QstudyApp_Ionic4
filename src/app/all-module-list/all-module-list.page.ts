import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QustadyService } from '../service/qustady.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-all-module-list',
  templateUrl: './all-module-list.page.html',
  styleUrls: ['./all-module-list.page.scss'],
})
export class AllModuleListPage implements OnInit {
  registered_courses=[];
  subjects_of_course=[];
  modules_of_subject=[];

  studentSubjects=[];
  module_type=null;
  subjects=[];
  chapters=[];
  user_info={
      id: '',
      name: '',
      countryCode: '',
      countryName: '',
      country_id: '',
      zone_id: '',
      zone_name:''
  };
  tutor_info={
    tutor_id: '',
    tutor_name: '',
    user_type: null
  }

  constructor(private route:ActivatedRoute, 
              private serv:QustadyService,
              private storage:Storage,
              private router: Router
              ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('qstudy_user').then((res)=>{
        this.module_type=this.route.snapshot.paramMap.get('moduleType');
        const data={
          action: 'all_tutors_by_type',
          user_id: res.id,
          tutor_id: this.route.snapshot.paramMap.get('tutorId'),
          module_type: this.module_type
        }
        this.serv.commonFunctionCall(data).subscribe(res2=>{
              console.log(res2)
              this.subjects=res2.studentSubjects;
              this.user_info=res2.user_info;
              this.tutor_info=res2.tutorInfo;
              this.studentSubjects=res2.studentSubjects;
              if(res2.registered_courses){
                this.registered_courses=res2.registered_courses;
              }
        })
    })
  }

  onRegisteredCourse(id){
     for(let i=0; i<this.registered_courses.length;i++){
       if(this.registered_courses[i].course_info.id==id){
           this.subjects_of_course=this.registered_courses[i].subjects_of_course;
       }
     }
  }

  onSubject(id, course_id){
    const data={
      action: 'get_modules_by_subject',
      moduleType : this.module_type,
      user_id: this.user_info.id,
      subjectId : id,
      tutorId : this.tutor_info.tutor_id,
      tutor_userType : this.tutor_info.user_type,
      courseId : course_id
    }
    this.serv.commonFunctionCall(data).subscribe(res=>{
      console.log(res);
      this.modules_of_subject=res;
    })
  }

}
