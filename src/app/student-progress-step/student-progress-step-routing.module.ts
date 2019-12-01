import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentProgressStepPage } from './student-progress-step.page';

const routes: Routes = [
  {
    path: '',
    component: StudentProgressStepPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentProgressStepPageRoutingModule {}
