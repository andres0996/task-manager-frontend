/**
 * TasksRoutingModule
 *
 * This routing module defines the routes for the Tasks feature module.
 * It handles navigation within the tasks section of the application.
 *
 * Routes:
 * - '': Displays the TasksPageComponent, which shows the user's task list and provides CRUD operations.
 *
 * Notes:
 * - Exporting `RouterModule` allows the routes to be used by components that import this module.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksPageComponent } from '../tasks/components/tasks-page.component';

const routes: Routes = [
  {
    path: '',
    component: TasksPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
