import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentProgressStep3PageRoutingModule } from './student-progress-step3-routing.module';

import { StudentProgressStep3Page } from './student-progress-step3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentProgressStep3PageRoutingModule
  ],
  declarations: [StudentProgressStep3Page]
})
export class StudentProgressStep3PageModule {}
