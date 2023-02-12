import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutsectionPageRoutingModule } from './aboutsection-routing.module';

import { AboutsectionPage } from './aboutsection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutsectionPageRoutingModule
  ],
  declarations: [AboutsectionPage]
})
export class AboutsectionPageModule {}
