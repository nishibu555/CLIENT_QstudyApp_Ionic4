import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { QustadyService } from '../service/qustady.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-my-enrollment',
  templateUrl: './my-enrollment.page.html',
  styleUrls: ['./my-enrollment.page.scss'],
})
export class MyEnrollmentPage implements OnInit {
  get_involved_teacher=[];
  get_involved_school=[];
  get_involved_corporate=[];
  user_id='';
  msg='';
  constructor(private storage:Storage, private serv:QustadyService,private alertController: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('qstudy_user').then(res=>{
       this.user_id=res.id;
       const data={
         action:'get_student_enrollment',
         id: res.id
       }
       this.serv.commonFunctionCall(data).subscribe(res2=>{
          this.get_involved_teacher=res2.get_involved_teacher;
       })
    })
  }

  async presentAlert(id,type,sct) {
    const alert = await this.alertController.create({
      header: 'Link Ref Number',
      inputs: [
        {
          name: 'link1',
          value: sct
        },
        {
          name: 'link2',
          placeholder: 'ref. Link Number',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
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
        const data={
          action: 'save_ref_link',
          link: [result.data.values.link1,result.data.values.link2],
          userType: type,
          user_id: this.user_id
        }
        this.serv.commonFunctionCall(data).subscribe(res=>{
          console.log(res)
            if(res.flag==2){
               this.msg='Enter a correct  link';
            }
            else if(res.flag==0){
              this.msg='Enter a link';
            }

        })
    }
  }



}
