import { Component, OnInit } from '@angular/core';
import { QustadyService } from '../service/qustady.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-select-country',
  templateUrl: './select-country.page.html',
  styleUrls: ['./select-country.page.scss'],
})
export class SelectCountryPage implements OnInit {
  countries=[]
  selected_countryId='';
  countryName='';
  constructor(private serv: QustadyService, private storage:Storage) { }

  ngOnInit() {
  }
  
  ionViewWillEnter(){
    const data={
       action: 'get_all_country'
    }
    this.serv.commonFunctionCall(data).subscribe(res=>{
      this.countries=res;
    })
  }

  selected_country(countryId){
    this.selected_countryId=countryId.detail.value;
    for(let i=0; i< this.countries.length; i++){
      if(this.countries[i].id==countryId.detail.value){
        this.countryName=this.countries[i].countryName;
      }
    }
    const reg_data={countryId: countryId.detail.value, countryName: this.countryName}
    this.storage.set('registration_data',reg_data).then((res)=>{
    });
  }
}


//get registration type trial/signup
//set usertType 1 for parent /6 for upperlevel student
//set country info
