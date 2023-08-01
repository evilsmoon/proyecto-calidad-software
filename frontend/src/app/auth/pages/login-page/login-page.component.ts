import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2'
@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router )

  public myForm: FormGroup = this.fb.group({
    email:    ['gabrielmorales201264@gmail.com', [ Validators.required, Validators.email ]],
    password: ['Gabriel201264@', [ Validators.required, Validators.minLength(6) ]],
  });


  login() {
    const { email, password } = this.myForm.value;

    console.log(email);
    console.log(password);
    this.authService.login(email, password)
      .subscribe({
        next: () => this.router.navigateByUrl('/auth/shopping-cart'),
        error: (message) => {
          Swal.fire('Error', message, 'error' )
        }
      })

  }
}
