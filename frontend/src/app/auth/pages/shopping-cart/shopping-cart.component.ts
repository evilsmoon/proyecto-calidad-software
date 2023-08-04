import { Component, OnInit, Type } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Product, ProductCart } from 'src/app/interfaces/product.interfaces';
import { PatitoService } from 'src/app/services/patito.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit{

  sidebarVisible2: boolean = false;
  myStoreLength : number = 0;
  products: ProductCart[] = []
  private sub$!: Subscription;
  totalQuantity: number = 0; 
  totalPrice: number = 0; 
 
  constructor(
    private productoServ :ProductService,
    private patitoServ   :PatitoService,
    private router       :Router,
    private fb           :FormBuilder,
    public translate     :TranslateService
    ) { 
      translate.addLangs(['en', 'es',"de","fr","qu","zh"]);
      const lang = translate.getBrowserLang()
      if( (lang !== 'es') && ( lang !== 'en')  && ( lang !== 'de')  && ( lang !== 'fr')  && ( lang !== 'qu')  && ( lang !== 'zh') ){
        translate.setDefaultLang('en');
      }
    }

    ngOnInit(): void {
      this.products = this.productoServ.getShoppingCart();
      this.calculateTotalQuantity()
      this.calculateTotalPrice()
    }

    removeProduct(product:ProductCart){
      this.productoServ.removeProduto(product);
      this.calculateTotalQuantity()
      this.calculateTotalPrice()
    }
    generateNumbersArray(max: number): number[] {
      return Array.from({ length: max }, (_, index) => index + 1);
    }

    calculateTotalQuantity() {
      this.totalQuantity = this.products.reduce((total, product) => total + product.currentQty, 0);
    }
    calculateTotalPrice() {
      this.totalPrice = this.products.reduce((total, product) => {
        return total + (product.currentPrice * product.currentQty);
      }, 0);
    }

    navigateToPaymentPage(): void {

      console.log(this.products);
      this.router.navigate(['/auth/payment-page'], );
    }

    onChangeQuantity(event: any,product: Product, ) {

      const indexOfObject = this.products.findIndex((element) => {
        return element._id === product._id;
      });
      this.products[indexOfObject].currentQty = parseInt(event.target.value);
      this.calculateTotalQuantity()
      this.calculateTotalPrice()
    }
}
