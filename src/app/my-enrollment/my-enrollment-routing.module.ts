import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyEnrollmentPage } from './my-enrollment.page';

const routes: Routes = [
  {
    path: '',
    component: MyEnrollmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyEnrollmentPageRoutingModule {}
