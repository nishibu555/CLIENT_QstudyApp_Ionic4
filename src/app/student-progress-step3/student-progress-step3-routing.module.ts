import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentProgressStep3Page } from './student-progress-step3.page';

const routes: Routes = [
  {
    path: '',
    component: StudentProgressStep3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentProgressStep3PageRoutingModule {}
