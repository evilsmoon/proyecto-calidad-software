import { Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // private authService = inject( AuthService );
  // private router = inject( Router );

  constructor(
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'es',"de","fr","qu","zh"]);
    const lang = translate.getBrowserLang()
    if( (lang !== 'es') && ( lang !== 'en') ){
      translate.setDefaultLang('en');
    }

  }
  
  


  // public finishedAuthCheck = computed<boolean>( () => {
  //   console.log(this.authService.authStatus() )
  //   if ( this.authService.authStatus() === AuthStatus.checking ) {
  //     return false;
  //   }

  //   return true;
  // });


  // public authStatusChangedEffect = effect(() => {

  //   switch( this.authService.authStatus() ) {

  //     case AuthStatus.checking:
  //       return;

// case AuthStatus.authenticated:`
        // this.router.navigateByUrl('/');
  // return;

  //     case AuthStatus.notAuthenticated:
  //       this.router.navigateByUrl('/auth/login');
  //       return;

  //   }




  // });

}
