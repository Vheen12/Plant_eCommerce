import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotpassVerifyPageRoutingModule } from './forgotpass-verify-routing.module';

import { ForgotpassVerifyPage } from './forgotpass-verify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotpassVerifyPageRoutingModule
  ],
  declarations: [ForgotpassVerifyPage]
})
export class ForgotpassVerifyPageModule {}
