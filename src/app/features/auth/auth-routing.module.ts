/**
 * AuthRoutingModule
 *
 * This routing module defines the routes for the Auth (authentication) feature module.
 * It handles navigation within the authentication section of the application.
 *
 * Routes:
 * - '': Displays the LoginPageComponent, which allows the user to log in.
 *
 * Notes:
 * - Exporting `RouterModule` allows other modules that import this module to recognize and use these routes.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from '../auth/components/login-page.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
