import { Component, OnInit } from '@angular/core';
import { QustadyService } from '../service/qustady.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-module-tutor-list',
  templateUrl: './module-tutor-list.page.html',
  styleUrls: ['./module-tutor-list.page.scss'],
})
export class ModuleTutorListPage implements OnInit {
  tutors=[];
  module_type='';
  constructor(public storage: Storage,private serv:QustadyService, private route:ActivatedRoute) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('qstudy_user').then((res)=>{
         this.module_type=this.route.snapshot.paramMap.get('moduleType');
          const data={
            action: 'tutorList',
            user_id: res.id,
            module_type: this.module_type
          }
          this.serv.commonFunctionCall(data).subscribe(res=>{
            console.log(res);
            this.tutors=res;
          })
     });
  }

}
