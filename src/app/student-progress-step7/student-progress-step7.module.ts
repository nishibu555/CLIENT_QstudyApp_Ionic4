import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentProgressStep7PageRoutingModule } from './student-progress-step7-routing.module';

import { StudentProgressStep7Page } from './student-progress-step7.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentProgressStep7PageRoutingModule
  ],
  declarations: [StudentProgressStep7Page]
})
export class StudentProgressStep7PageModule {}
