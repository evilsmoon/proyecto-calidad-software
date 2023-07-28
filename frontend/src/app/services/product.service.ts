import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';
    
@Injectable({
    providedIn: 'root'
  })
export class ProductService {

    
    private myShoppingCart: Product[] = [];
    private myCart = new BehaviorSubject<Product[]>([]);
    public myCart$ = this.myCart.asObservable();
    
    addProducto(producto: Product   ): void {
        // El observable emitirá un nuevo valor con cada producto que se agregue al carrito.

        console.log(producto);
        this.myShoppingCart.push(producto);
        this.myCart.next(this.myShoppingCart);
      }
    
    getShoppingCart() {
    return this.myShoppingCart;
    }


};