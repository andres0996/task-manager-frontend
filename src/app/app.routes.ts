/**
 * appRoutes
 *
 * Defines the main routes of the Angular application.
 * Uses lazy loading for feature modules and includes fallback routes.
 *
 */
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  /**
   * Default route: redirects to the login page.
   */
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  /**
   * Login feature module (lazy loaded)
   * Handles user authentication (login and registration).
   */
  {
    path: 'login',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },

  /**
   * Tasks feature module (lazy loaded)
   * Displays the task list and allows CRUD operations.
   */
  {
    path: 'tasks',
    loadChildren: () => import('./features/tasks/tasks.module').then(m => m.TasksModule)
  },

  /**
   * Wildcard route: redirects any unknown paths to the login page.
   */
  { path: '**', redirectTo: 'login' }
];
