import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { isAuthenticatedGuard ,isNotAuthenticatedGuard} from './guards/';

const routes: Routes = [

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginPageComponent ,},
      { path: 'register', component: RegisterPageComponent, },
      { path: 'shopping-cart', component: ShoppingCartComponent ,},
      { path: 'payment-page', component: PaymentPageComponent,canActivate:[isAuthenticatedGuard] },
      { path: '**', redirectTo: 'login' },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }