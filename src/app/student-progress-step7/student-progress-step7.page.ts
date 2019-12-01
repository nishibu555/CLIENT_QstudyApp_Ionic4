import { Component, OnInit } from '@angular/core';
import { QustadyService } from '../service/qustady.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-student-progress-step7',
  templateUrl: './student-progress-step7.page.html',
  styleUrls: ['./student-progress-step7.page.scss'],
})
export class StudentProgressStep7Page implements OnInit {
  courses=[];

  constructor(private serv: QustadyService,private storage:Storage) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
      this.storage.get('qstudy_user').then(res=>{
        console.log(res)
         const data={
           action: 'student_progress_step7',
           user_id: res.id
         }
         this.serv.commonFunctionCall(data).subscribe(res2=>{
           this.courses=res2.registered_courses;
         })
      })
  }
}
