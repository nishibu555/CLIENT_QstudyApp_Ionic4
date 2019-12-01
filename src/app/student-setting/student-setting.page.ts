import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-student-setting',
  templateUrl: './student-setting.page.html',
  styleUrls: ['./student-setting.page.scss'],
})
export class StudentSettingPage implements OnInit {
 

  constructor(private storage:Storage) {}

  ngOnInit() {
  }
 
}
