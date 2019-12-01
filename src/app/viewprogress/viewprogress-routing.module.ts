import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewprogressPage } from './viewprogress.page';

const routes: Routes = [
  {
    path: '',
    component: ViewprogressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewprogressPageRoutingModule {}
