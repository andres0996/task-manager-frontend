import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * AuthGuard
 *
 * This guard protects routes that require the user to be authenticated.
 *
 * It works with Angular Router. Before activating a route, it checks if the user
 * is logged in using `AuthService.isLoggedIn()`.
 *
 * If the user **is not authenticated**, it automatically redirects to the login page
 * and blocks access to the route.
 *
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Determines whether the route can be activated
   *
   * @returns boolean - true if the user is logged in, false otherwise
   */
  canActivate(): boolean {

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
