import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentFormPageRoutingModule } from './student-form-routing.module';

import { StudentFormPage } from './student-form.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    StudentFormPageRoutingModule
  ],
  declarations: [StudentFormPage]
})
export class StudentFormPageModule {}
