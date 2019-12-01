import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Events,LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { QustadyService } from '../service/qustady.service';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  notMatched=false;
  submitAttempt = false;
  form: FormGroup;

  constructor(
    public serv: QustadyService,
    public storage: Storage,
    public router: Router,
    public events: Events,
    public formBuilder: FormBuilder,
    public loadingController: LoadingController
  ){ 
      this.form = formBuilder.group({
        email: ['',Validators.compose([Validators.required, Validators.email])],
        password: ['',Validators.compose([Validators.required,Validators.minLength(6)])],
      })
  }
  

  ngOnInit() {
  }


  onSubmit(){
      // this.submitAttempt = true;
      // if(!this.form.valid){
      //   return;
      // }
      // else {
          this.presentLoading();
          const data = {
            action: 'login',
            // email: this.form.value.email,
            // password: this.form.value.password,
            // email: 'qstudy@gmail.com',
            // password: 123456,
            email: 'abhro',
            password: 1234567,
          }
          this.serv.commonFunctionCall(data).subscribe(res=>{
            console.log(res)
              if(res.failed==true){
                this.notMatched=true;
              }
              else{ 
                  const qstudy_user = {
                      id: res.id,
                      image: res.image,
                      name: res.name,
                      user_email: res.user_email,
                      user_mobile: res.user_mobile, 
                      user_type: res.user_type
                  }
                  this.storage.set('qstudy_user',qstudy_user).then((res)=>{

                   this.loadingController.dismiss();
                   this.router.navigateByUrl('/home');
                  });
              }
          })
      //}    
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Signing in...',
    });
    await loading.present();
  }

}




