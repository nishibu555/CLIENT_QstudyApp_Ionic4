import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentUploadPhotoPage } from './student-upload-photo.page';

const routes: Routes = [
  {
    path: '',
    component: StudentUploadPhotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentUploadPhotoPageRoutingModule {}
