import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutsectionPage } from './aboutsection.page';

const routes: Routes = [
  {
    path: '',
    component: AboutsectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutsectionPageRoutingModule {}
