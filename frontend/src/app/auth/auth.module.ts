import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ComponentsModule } from '../components/components.module';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import {  TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    AuthLayoutComponent,
    ShoppingCartComponent,
    PaymentPageComponent,
    
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    PrimeNgModule,
    TranslateModule,
  ],
  exports:[
    LoginPageComponent,
    RegisterPageComponent,
    AuthLayoutComponent,
    ShoppingCartComponent,
    PaymentPageComponent,
  ]
})
export class AuthModule { }

