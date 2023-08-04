import { Component, OnInit, HostListener , inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { AuthStatus } from 'src/app/auth/interfaces';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector:'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  sidebarVisible2: boolean = false;
  myStoreLength : number = 0;
  private sub$!: Subscription;
  flag:string ="";

    constructor(
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'es',"de","fr","qu","zh"]);
    const lang = translate.getBrowserLang()
    this.flag = lang!;
    if( (lang !== 'es') && ( lang !== 'en') ){
      translate.setDefaultLang('en');
    }

  }

  switchLang = (lang: string) => {
    this.translate.use(lang)
    this.flag = lang;
  }

  

  public user = computed(() => this.authService.currentUser() );

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
    this.productoServ.myCart$
      .subscribe(products => {
        this.myStoreLength =  products.length;
      });
      this.flag = this.translate.getBrowserLang() || 'en';
      
  
  }


  @HostListener('document:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'c') {
      // Lógica que deseas ejecutar cuando se presione la tecla "c"
      console.log('Tecla "c" presionada');
      this.router.navigate(['/auth/shopping-cart']);
    }

    if (event.key === 'i') {
      // Lógica que deseas ejecutar cuando se presione la tecla "c"
      console.log('Tecla "c" presionada');
      this.router.navigate(['/']);
    }
    if (event.key === 'p') {
      // Lógica que deseas ejecutar cuando se presione la tecla "c"
      console.log('Tecla "c" presionada');
      this.router.navigate(['/auth/payment-page']);
    }
  }
  
/*   ngOnDestroy(): void {
    console.log("ngOnDestroy");
    this.sub$.unsubscribe();
  }
 */

  moveToShoppingCart(){

    this.router.navigate(['/auth/shopping-cart'],{ replaceUrl: true })
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/'], { replaceUrl: true });
  }




}
