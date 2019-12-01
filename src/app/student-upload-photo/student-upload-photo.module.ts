import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentUploadPhotoPageRoutingModule } from './student-upload-photo-routing.module';

import { StudentUploadPhotoPage } from './student-upload-photo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentUploadPhotoPageRoutingModule
  ],
  declarations: [StudentUploadPhotoPage]
})
export class StudentUploadPhotoPageModule {}
