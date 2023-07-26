import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './pages/home/home.component';
import { StoreRoutingModule } from './store-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    PrimeNgModule,
    ComponentsModule
  ],
  exports:[
    HomeComponent,
  ]
})
export class StoreModule { }