import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterparentPageRoutingModule } from './registerparent-routing.module';

import { RegisterparentPage } from './registerparent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterparentPageRoutingModule
  ],
  declarations: [RegisterparentPage]
})
export class RegisterparentPageModule {}
