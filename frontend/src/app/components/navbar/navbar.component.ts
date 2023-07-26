import { Component, OnInit, OnDestroy } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector:'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  sidebarVisible2: boolean = false;
  myStoreLength : number = 0;
  private sub$!: Subscription;
  
  constructor(
    private productoServ : ProductService,
    private location     : Location,
    private router       : Router,
    ) { 

    }

/* 
!Navigation Start
*/

navigateToRegister(): void {
  this.router.navigate(['/auth/register'], { replaceUrl: true });
}

navigateToLogin(): void {
  this.router.navigate(['/auth/login'], { replaceUrl: true });
}


/* 
!Navigation End
*/
  ngOnInit(): void {
    console.log("ngOnInit");
    this.productoServ.myCart$
      .subscribe(products => {
        this.myStoreLength =  products.length;
      });
  }
  
/*   ngOnDestroy(): void {
    console.log("ngOnDestroy");
    this.sub$.unsubscribe();
  }
 */

  moveToShoppingCart(){

    this.router.navigate(['/auth/shopping-cart'])
  }
  responsiveOptions: any[] = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];



/*   getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
    }
  }
 */




}