import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
    private router       :Router,
    ) { 

    }


  ngOnInit(): void {
    console.log("ngOnInit");

    console.log(this.productoServ.getShoppingCart());
    this.products = this.productoServ.getShoppingCart()
  }

}
