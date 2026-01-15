import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AppConfig } from '../../app.config';

/**
 * Service responsible for managing users in the Task Manager application.
 * Handles checking if a user exists and creating new users.
 */

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /** Base URL of the users API. */

  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Checks if a user exists by their email.
   * @param email - The email address of the user to check.
   * @returns A Promise that resolves to true if the user exists, false otherwise.
   */
  async checkUser(email: string): Promise<boolean> {
    const response = await firstValueFrom(
      this.http.get<{ exists: boolean }>(`${environment.apiUrl}${AppConfig.endpoints.users.get}?email=${email}`, { headers: this.getAuthHeaders() })
    );
    return response.exists;
  }

  /**
   * Creates a new user with the provided email.
   * @param userEmail - The email of the user to create.
   * @returns An Observable of the HTTP response from the server.
   */
  createUser(userEmail: string): Observable<any> {
    const body = { email: userEmail };
    return this.http.post(`${environment.apiUrl}${AppConfig.endpoints.users.create}`, body, { headers: this.getAuthHeaders() });
  }

  /**
    * Helper to generate HTTP headers with the current auth token.
    */
  private getAuthHeaders(): { [header: string]: string } {
    const token = this.authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}
