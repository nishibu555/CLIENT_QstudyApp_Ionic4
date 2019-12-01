import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentSettingPage } from './student-setting.page';

const routes: Routes = [
  {
    path: '',
    component: StudentSettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentSettingPageRoutingModule {}
