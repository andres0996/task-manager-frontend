/**
 * AppConfig
 *
 * Centralized configuration object for the application.
 * Contains base URLs, API endpoints, and general application settings.
 *
 */
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

export const AppConfig = {
  /**
   * API endpoints organized by resource type.
   */
  endpoints: {
    auth:{
      /** Endpoint to check if a user exists. Use POST with user data */
      login: '/auth/login'
    },
    users: {
      /** Endpoint to create a new user. Use POST with user data */
      create: '/users',
      /** Endpoint to GET a user. Use GET with user EMAIL */
      get:'/users/email',
    },
    tasks: {
      /** Endpoint to list tasks. Use GET */
      list: '/tasks/user/',
      /** Endpoint to create a new task. Use POST */
      create: '/tasks',
      /** Endpoint to update an existing task. Use PUT/PATCH with task ID */
      update: '/tasks/',
      /** Endpoint to delete a task. Use DELETE with task ID */
      delete: '/tasks/',
      /** Endpoint to GET a task. Use GET with task ID */
      get: '/tasks/',
    }
  },

  /**
   * Default role assigned to new users.
   */
  defaultUserRole: 'user',

  /**
   * Default number of items per page (for pagination).
   */
  itemsPerPage: 10,

  /**
   * Name of the application.
   */
  appName: 'Task Manager'
};
