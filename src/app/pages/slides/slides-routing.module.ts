import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SlidesPage } from './slides.page';

const routes: Routes = [
  {
    path: '',
    component: SlidesPage,
    children: [
      {
          path: 'login',
          loadChildren: () => import('../../pages/login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: '',
        redirectTo: '/slides/login',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SlidesPageRoutingModule {}
