import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';

/**
 * LoginPageComponent
 *
 * This component handles the login flow of the application.
 * Features:
 * - User can input email to log in
 * - If the user does not exist, prompts a registration modal
 * - Handles login and registration via AuthService and UserService
 * - Redirects authenticated users to the tasks page
 */
@Component({
  selector: 'app-login-page',
  templateUrl: '../pages/login-page/login-page.component.html',
  styleUrls: ['../pages/login-page/login-page.component.scss']
})
export class LoginPageComponent {

  /** User input email */
  email = '';

  /** Error message to show on the UI */
  error = '';

  /** Loading state for login button */
  loading = false;

  /** Controls whether the registration modal is visible */
  showRegisterModal = false;

  /** Temporarily stores the email for registration */
  tempEmail = '';

  /** Loading state for the registration process */
  registerLoading = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  /**
   * Handles normal login submission.
   * - If the user exists, saves the token and navigates to tasks page.
   * - If the user does not exist, shows registration modal.
   * - Displays errors if login fails.
   */
  onSubmit() {
    this.error = '';
    this.loading = true;

    this.authService.login(this.email).subscribe({
      next: (res: any) => {
        this.authService.saveToken(res.token, this.email);
        this.router.navigate(['/tasks']);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 404) {

          this.tempEmail = this.email;
          this.showRegisterModal = true;
        } else {
          this.error = err.error?.message || 'Login error';
        }
      }
    });
  }

  /**
   * Handles user registration from the modal.
   * - Creates the user via UserService.
   * - Automatically logs in the newly registered user.
   * - Hides the modal and navigates to tasks page on success.
   */
  register() {
    this.registerLoading = true;
    this.userService.createUser(this.tempEmail).subscribe({
      next: () => {
        this.authService.login(this.tempEmail).subscribe({
          next: (res: any) => {
            this.authService.saveToken(res.token, this.email);
            this.showRegisterModal = false;
            this.registerLoading = false;
            this.router.navigate(['/tasks']);
          },
          error: (err) => {
            this.error = err.error?.message || 'Error logging in after registration';
            this.registerLoading = false;
          }
        });
      },
      error: (err) => {
        this.error = err.error?.message || 'Error registering user';
        this.registerLoading = false;
      }
    });
  }

  /**
   * Cancels the registration modal.
   */
  cancel() {
    this.showRegisterModal = false;
  }
}
