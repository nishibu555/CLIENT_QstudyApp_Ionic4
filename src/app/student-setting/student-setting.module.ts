import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentSettingPageRoutingModule } from './student-setting-routing.module';

import { StudentSettingPage } from './student-setting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentSettingPageRoutingModule
  ],
  declarations: [StudentSettingPage]
})
export class StudentSettingPageModule {}
