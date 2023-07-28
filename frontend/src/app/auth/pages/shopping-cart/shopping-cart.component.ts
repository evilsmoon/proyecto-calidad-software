import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PatitoService } from 'src/app/services/patito.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit{

  sidebarVisible2: boolean = false;
  myStoreLength : number = 0;
  products: any[] = []
  private sub$!: Subscription;
  
  constructor(
    private productoServ :ProductService,
    private patitoServ   :PatitoService,
    private router       :Router,
    ) { 

    }

    ngOnInit(): void {
      this.patitoServ.get().subscribe(
        resp=>( this.products =resp.slice(0,2))
      )
  
    }

    generateNumbersArray(max: number): number[] {
      return Array.from({ length: max }, (_, index) => index + 1);
    }
/*   ngOnInit(): void {
    console.log("ngOnInit");

    console.log(this.productoServ.getShoppingCart());
    this.products = this.productoServ.getShoppingCart()
  }
 */
}
