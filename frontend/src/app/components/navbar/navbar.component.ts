import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { AuthStatus } from 'src/app/auth/interfaces';

@Component({
  selector:'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  sidebarVisible2: boolean = false;
  myStoreLength : number = 0;
  private sub$!: Subscription;
  
  private authService  = inject( AuthService );
  private productoServ = inject( ProductService );
  private router       = inject( Router );

/* 
!Navigation Start
*/

navigateToHome(): void {
  this.router.navigate(['/'], { replaceUrl: true });
}
navigateToRegister(): void {
  this.router.navigate(['/auth/register'], { replaceUrl: true });
}

navigateToLogin(): void {
  this.router.navigate(['/auth/login'], { replaceUrl: true });
}

getAuthStatus():boolean{
  if ( this.authService.authStatus() === AuthStatus.authenticated ) {
    return true;
  }
  return false;
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


  onLogout() {
    this.authService.logout();
  }




}
