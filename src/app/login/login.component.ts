import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  UserForm = new FormGroup({
    User: new FormControl(''),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  enviarFormulario() {
    if (this.UserForm.valid) {
      this.authService.login();
      this.router.navigate(['/home']);
    } else {
      alert('La Contraseña debe de ser mayor a 8 caracteres');
      this.router.navigate(['**']);
    }
  }
}
