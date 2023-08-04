import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './pages/home/home.component';
import { StoreRoutingModule } from './store-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ComponentsModule } from '../components/components.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    PrimeNgModule,
    ComponentsModule,
    TranslateModule,
  ],
  exports:[
    HomeComponent,
  ]
})
export class StoreModule { }

