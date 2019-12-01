import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModuleTutorListPageRoutingModule } from './module-tutor-list-routing.module';

import { ModuleTutorListPage } from './module-tutor-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModuleTutorListPageRoutingModule
  ],
  declarations: [ModuleTutorListPage]
})
export class ModuleTutorListPageModule {}
