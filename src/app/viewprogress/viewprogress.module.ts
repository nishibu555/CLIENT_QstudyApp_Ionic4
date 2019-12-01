import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewprogressPageRoutingModule } from './viewprogress-routing.module';

import { ViewprogressPage } from './viewprogress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ViewprogressPageRoutingModule
  ],
  declarations: [ViewprogressPage]
})
export class ViewprogressPageModule {}
