import { Component, OnInit, Type } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { PatitoService } from 'src/app/services/patito.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit{

  sidebarVisible2: boolean = false;
  myStoreLength : number = 0;
  products: Product[] = []
  private sub$!: Subscription;
  totalQuantity: number = 0; 
  totalPrice: number = 0; 
 
  constructor(
    private productoServ :ProductService,
    private patitoServ   :PatitoService,
    private router       :Router,
    private fb           :FormBuilder,
    ) { 

    }

    ngOnInit(): void {
      this.products = this.productoServ.getShoppingCart();
      this.calculateTotalQuantity()
      this.calculateTotalPrice()
    }

    removeProduct(product:Product){
      this.productoServ.removeProduto(product);
      this.calculateTotalQuantity()
      this.calculateTotalPrice()
    }
    generateNumbersArray(max: number): number[] {
      return Array.from({ length: max }, (_, index) => index + 1);
    }

    calculateTotalQuantity() {
      this.totalQuantity = this.products.reduce((total, product) => total + product.qty, 0);
    }
    calculateTotalPrice() {
      this.totalPrice = this.products.reduce((total, product) => {
        console.log();
        return total + (product.price * product.qty);
      }, 0);
    }

    navigateToPaymentPage(): void {

      console.log(this.products);
      this.router.navigate(['/auth/payment-page'], );
    }

    onChangeQuantity(event: any,product: Product, ) {
      const quantity = event.target.value;

      console.log(product);
      const indexOfObject = this.products.findIndex((element) => {
        return element._id === product._id;
      });
      console.log(indexOfObject);
      console.log(quantity);
      this.products[indexOfObject].qty = parseInt(event.target.value);
      this.calculateTotalQuantity()
      this.calculateTotalPrice()
    }

/*   ngOnInit(): void {
    console.log("ngOnInit");

    console.log(this.productoServ.getShoppingCart());
    this.products = this.productoServ.getShoppingCart()
  }
 */
}
