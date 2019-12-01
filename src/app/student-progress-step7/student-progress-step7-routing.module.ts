import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentProgressStep7Page } from './student-progress-step7.page';

const routes: Routes = [
  {
    path: '',
    component: StudentProgressStep7Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentProgressStep7PageRoutingModule {}
