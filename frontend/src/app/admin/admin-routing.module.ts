import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProductosComponent } from './productos/productos.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [

  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'productos', component: ProductosComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: '**', redirectTo: 'dashboard' },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }