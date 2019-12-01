import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterparentPage } from './registerparent.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterparentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterparentPageRoutingModule {}
