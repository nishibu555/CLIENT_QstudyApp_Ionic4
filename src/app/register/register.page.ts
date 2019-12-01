import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private route:ActivatedRoute, 
     private router:Router,
     private storage:Storage) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    var registrationType= this.route.snapshot.paramMap.get('registrationType');
    this.storage.set('registrationType',registrationType);
  }

  next(userType){
    this.storage.set('userType',userType).then(()=>{
       if(userType==1){
         this.router.navigateByUrl('/registerparent');
       }
       if(userType==2){
         //redirect ot register upperlevel student
         //this.router.navigateByUrl('/registeulstudent');
       }
    })
  }
}

//get registration type trial/signup
//set usertType 1 for parent /6 for upperlevel student
//register parent or register upperlevel shows select country,choose plan, create account