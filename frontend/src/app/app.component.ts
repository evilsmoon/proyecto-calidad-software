import { Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AuthStatus } from './auth/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // private authService = inject( AuthService );
  // private router = inject( Router );

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

<<<<<<< HEAD
      case AuthStatus.authenticated:
        // this.router.navigateByUrl('/');
        return;
=======
  //     case AuthStatus.authenticated:
  //       this.router.navigateByUrl('/');
  //       return;
>>>>>>> f9a7f98537abdc37edb83665b810860dc6d001d2

  //     case AuthStatus.notAuthenticated:
  //       this.router.navigateByUrl('/auth/login');
  //       return;

  //   }




  // });

}
