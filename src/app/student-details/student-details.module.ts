import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentDetailsPageRoutingModule } from './student-details-routing.module';

import { StudentDetailsPage } from './student-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    StudentDetailsPageRoutingModule
  ],
  declarations: [StudentDetailsPage]
})
export class StudentDetailsPageModule {}
