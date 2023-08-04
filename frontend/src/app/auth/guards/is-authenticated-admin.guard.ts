import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStatus } from '../interfaces';
import { AuthService } from '../../services/auth.service';

export const isAuthenticatedAdmin: CanActivateFn = (route, state) => {

  const authService = inject( AuthService );
  const router      = inject( Router );

  if ( authService.authStatus() === AuthStatus.authenticatedAdmin ) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};
