import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { auth } from '../../../core/models/auth.model';

/**
 * LoginDialogComponent
 *
 * This component represents a modal dialog for user login.
 * Features:
 * - Displays a form to enter an email
 * - Validates the email field (required and valid email format)
 * - Can be closed without submitting or with submitting the email
 */
@Component({
  selector: 'app-login-dialog',
  templateUrl: '../pages/login-dialog.component.html',
  styleUrls: ['../pages/login-dialog.component.scss']
})
export class LoginDialogComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: auth
  ) {

    this.loginForm = this.fb.group({
      email: [data.email || '', [Validators.required, Validators.email]]
    });
  }

  /**
   * Closes the dialog without sending data.
   */
  cancel() {
    this.dialogRef.close();
  }

  /**
   * Submits the form and closes the dialog, sending the email
   * to the parent component if the form is valid.
   */
  submit() {
    if (this.loginForm.invalid) return;
    this.dialogRef.close(this.loginForm.value);
  }
}
