import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/tabs/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'slides',
    loadChildren: () => import('./pages/slides/slides.module').then( m => m.SlidesPageModule)
  },
  {
    path: '',
    redirectTo: 'slides',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'all-items',
    loadChildren: () => import('./pages/tabs/all-items/all-items.module').then( m => m.AllItemsPageModule)
  },
  {
    path: 'items/:id',
    loadChildren: () => import('./pages/tabs/items/items.module').then( m => m.ItemsPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/tabs/account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/tabs/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'forgotpass',
    loadChildren: () => import('./pages/forgotpass/forgotpass.module').then( m => m.ForgotpassPageModule)
  },
  {
    path: 'forgotpass',
    loadChildren: () => import('./pages/forgotpass/forgotpass.module').then( m => m.ForgotpassPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'forgotpass-verify',
    loadChildren: () => import('./pages/forgotpass-verify/forgotpass-verify.module').then( m => m.ForgotpassVerifyPageModule)
  },
  {
    path: 'aboutsection',
    loadChildren: () => import('./pages/aboutsection/aboutsection.module').then( m => m.AboutsectionPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./pages/feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
