import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  private authService  = inject( AuthService );
  private router       = inject( Router );

  onLogout() {

    this.authService.logout();
    this.router.navigate(['/'], { replaceUrl: true });
  }

}
