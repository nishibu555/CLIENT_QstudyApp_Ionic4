import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentProgressStepPageRoutingModule } from './student-progress-step-routing.module';

import { StudentProgressStepPage } from './student-progress-step.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentProgressStepPageRoutingModule
  ],
  declarations: [StudentProgressStepPage]
})
export class StudentProgressStepPageModule {}
