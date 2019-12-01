import { Component, OnInit, RendererStyleFlags2 } from '@angular/core';
import { Storage } from '@ionic/storage';
import { QustadyService } from '../service/qustady.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-viewprogress',
  templateUrl: './viewprogress.page.html',
  styleUrls: ['./viewprogress.page.scss'],
})
export class ViewprogressPage implements OnInit {
  form: FormGroup;
  course_id='';
  progress_course_info={
    id: '', 
    name: '',
    grade: '', 
    module_types: []
  }

  data=[];

  constructor(
    private storage: Storage, 
    private serv:QustadyService, 
    private route:ActivatedRoute,
    public formBuilder: FormBuilder,) { 

      this.form = formBuilder.group({
        grade: '',
        name: '',
        module:''
      })
  }

  ngOnInit() {
  }
  ionViewWillEnter(){

    this.storage.get('qstudy_user').then(res=>{
      this.course_id=this.route.snapshot.paramMap.get('id');
       const data={ 
         action: 'student_progress_course',
         course_id: this.course_id,
         user_id: res.id,
         user_type: res.user_type
       }
       this.serv.commonFunctionCall(data).subscribe(res2=>{
          this.progress_course_info=res2;
       })
    })
  }

  submit(){
    console.log(this.form.value);
    const data={
      action: 'StProgTableData',
      student_id: this.progress_course_info.id,
      module_type: this.form.value.module,
      course_id: this.course_id,
      grade: this.form.value.grade
    }
    this.serv.commonFunctionCall(data).subscribe(res=>{
      this.data=res;
      console.log(res)
    });
  }

}
