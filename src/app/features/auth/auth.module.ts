/**
 * AuthModule
 *
 * Feature module responsible for authentication functionality in the application.
 * It encapsulates all components, routes, and dependencies related to user login and registration.
 *
 * Declarations:
 * - LoginPageComponent: Main login page where users can enter their email to log in.
 * - LoginDialogComponent: Modal dialog used for registering a new user when the email is not found.
 *
 * Imports:
 * - CommonModule: Provides common Angular directives like *ngIf, *ngFor.
 * - FormsModule & ReactiveFormsModule: Support template-driven and reactive forms for user input.
 * - AuthRoutingModule: Handles routing for the authentication feature module.
 *
 * Angular Material Modules:
 * - MatInputModule: Material styled input fields.
 * - MatButtonModule: Material buttons.
 * - MatIconModule: Material icons for UI elements.
 * - MatCardModule: Card layout for the login page.
 * - MatFormFieldModule: Material form fields for inputs.
 * - MatDialogModule: Support for modal dialogs (used in LoginDialogComponent).
 * - MatProgressSpinnerModule: Displays loading indicators when performing async operations.
 *
 * Providers:
 * - HTTP_INTERCEPTORS: Registers AuthInterceptor to automatically attach the authentication token
 *   to outgoing HTTP requests.
 *
 * Notes:
 * - This module is self-contained and only manages authentication functionality.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from '../auth/components/login-page.component';
import { LoginDialogComponent } from '../auth/components/login-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../core/interceptors/auth.interceptor';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    LoginPageComponent,
    LoginDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,

    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,

    MatDialogModule,

    MatProgressSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
})
export class AuthModule { }
