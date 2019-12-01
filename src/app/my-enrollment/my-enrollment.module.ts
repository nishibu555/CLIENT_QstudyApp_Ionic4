import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyEnrollmentPageRoutingModule } from './my-enrollment-routing.module';

import { MyEnrollmentPage } from './my-enrollment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyEnrollmentPageRoutingModule
  ],
  declarations: [MyEnrollmentPage]
})
export class MyEnrollmentPageModule {}
