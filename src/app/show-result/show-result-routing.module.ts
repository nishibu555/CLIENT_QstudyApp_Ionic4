import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowResultPage } from './show-result.page';

const routes: Routes = [
  {
    path: '',
    component: ShowResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowResultPageRoutingModule {}
