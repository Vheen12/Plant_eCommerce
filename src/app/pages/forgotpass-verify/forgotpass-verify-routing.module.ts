import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotpassVerifyPage } from './forgotpass-verify.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotpassVerifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotpassVerifyPageRoutingModule {}
