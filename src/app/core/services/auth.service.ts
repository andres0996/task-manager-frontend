import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { AppConfig } from '../../app.config';

/**
 * AuthService handles all user authentication operations.
 *
 * This service uses the base URL from Angular environments, making it easy
 * to switch between development and production endpoints.
 */

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  /**
   * Logs in a user using their email.
   * Sends a POST request to the /login endpoint.
   * @param userEmail User's email
   * @returns Observable containing the response from the API (usually with a JWT token)
   */
  login(userEmail: string): Observable<any> {
    const body = { userEmail };
    return this.http.post(`${environment.apiUrl}${AppConfig.endpoints.auth.login}`, body);
  }

  /**
   * Stores the authentication token and optionally the email in localStorage.
   * @param token JWT token received from the backend
   * @param email Optional user email to store
   */
  saveToken(token: string, email?: string) {
    localStorage.setItem('auth_token', token);
    if (email) {
      localStorage.setItem('email', email);
    }
  }

  /**
   * Retrieves the stored authentication token from localStorage.
   * @returns Token string or null if no token is found
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Retrieves the stored user email from localStorage.
   * @returns Email string or null if not found
   */
  getEmail(): string | null {
    return localStorage.getItem('email');
  }

  /**
   * Checks if the user is currently logged in.
   * @returns True if a token exists in localStorage, otherwise false
   */
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  /**
   * Logs out the user by removing token and email from localStorage.
   */
  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('email');
  }
}
