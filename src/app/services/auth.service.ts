import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn: boolean = false;
  constructor() {}

  login() {
    // Lógica de inicio de sesión aquí
    this.isLoggedIn = true;
  }

  logout() {
    // Lógica de cierre de sesión aquí
    this.isLoggedIn = false;
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }
}
