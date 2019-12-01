import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllModuleListPageRoutingModule } from './all-module-list-routing.module';

import { AllModuleListPage } from './all-module-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllModuleListPageRoutingModule
  ],
  declarations: [AllModuleListPage]
})
export class AllModuleListPageModule {}
