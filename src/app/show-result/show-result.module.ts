import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowResultPageRoutingModule } from './show-result-routing.module';

import { ShowResultPage } from './show-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowResultPageRoutingModule
  ],
  declarations: [ShowResultPage]
})
export class ShowResultPageModule {}
