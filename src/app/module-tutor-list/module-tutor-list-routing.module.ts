import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModuleTutorListPage } from './module-tutor-list.page';

const routes: Routes = [
  {
    path: '',
    component: ModuleTutorListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleTutorListPageRoutingModule {}
