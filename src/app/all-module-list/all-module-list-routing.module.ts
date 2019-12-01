import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllModuleListPage } from './all-module-list.page';

const routes: Routes = [
  {
    path: '',
    component: AllModuleListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllModuleListPageRoutingModule {}
