import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedAdmin } from './auth/guards';

const routes: Routes = [
  {
    path:'',
    loadChildren: ()=> import('./store/store.module').then(m => m.StoreModule)
  },
  {
    path:'auth',
    loadChildren: ()=> import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'admin',
    loadChildren: ()=> import('./admin/admin.module').then(m => m.AdminModule),
    canActivate:[isAuthenticatedAdmin]
  },
  {
    path: '**',
    redirectTo: ''
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
