import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
  })
export class ProductService {

    
    private myShoppingCart: Product[] = [];
    private myCart = new BehaviorSubject<Product[]>([]);
    public myCart$ = this.myCart.asObservable();

    constructor(){
      const savedCart = sessionStorage.getItem('carrito');
      if (savedCart) {
          this.myShoppingCart = JSON.parse(savedCart);
          this.myCart.next(this.myShoppingCart);
      }
    }
    
    addProducto(producto: Product): boolean {
      // Verificar si el producto ya existe en el carrito
      const productoExistente = this.myShoppingCart.find(item => item._id === producto._id);
  
      if (productoExistente) {
          // El producto ya existe en el carrito, no lo agregamos nuevamente.
          return false;
      }
  
      // El producto no existe en el carrito, lo agregamos.
      this.myShoppingCart.push(producto);
      this.myCart.next(this.myShoppingCart);
      // Guardar el carrito actualizado en SessionStorage
      sessionStorage.setItem('carrito', JSON.stringify(this.myShoppingCart));

      return true;
  }
    
    removeProduto(producto: Product  ){
      const indexOfObject = this.myShoppingCart.findIndex((element) => {
        return element._id === producto._id;
      });
      if (indexOfObject !== -1) {
        this.myShoppingCart.splice(indexOfObject, 1);
        this.myCart.next(this.myShoppingCart);
        sessionStorage.setItem('carrito', JSON.stringify(this.myShoppingCart));
      }
    }
    getShoppingCart() {
    return this.myShoppingCart;
    }


};