import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-show-result',
  templateUrl: './show-result.page.html',
  styleUrls: ['./show-result.page.scss'],
})
export class ShowResultPage implements OnInit {

user = {
    id: null,
    name: ''
}

module={
  id: null,
  name: '',
  type:null
}

mark_detail=[];
total_mark=0;
obtained_mark=0;
wrong_ans=[];

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private storage:Storage
  ) { }

  ngOnInit() {
  }
  
  ionViewWillEnter(){
    this.module.id=this.route.snapshot.paramMap.get('moduleId');
    this.storage.get('qstudy_user').then(user=>{
      this.user.id=user.id;
      this.user.name=user.name;
      this.storage.get('result_'+user.id).then(result=>{
          this.module.name=result.module_name;
          this.module.type=result.module_type;
          this.total_mark=result.total_mark;
          this.mark_detail=result.detail;
          for(let i=0; i<this.mark_detail.length; i++){
              this.obtained_mark += +this.mark_detail[i].obtained;
          }
          this.storage.get('wrong_ans_index').then(res=>{
            this.wrong_ans=res;
          })
      });
    })
  }

  revise_wrong_ans(index){
     this.storage.set('qIndex_to_revise', index).then(()=>{
       this.router.navigateByUrl('/get_tutor_tutorial_module/'+this.module.id);
     })
  }

  save_final_result(){

  }

}
