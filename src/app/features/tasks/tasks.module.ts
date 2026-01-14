/**
 * TasksModule
 *
 * This module handles everything related to task management in the frontend application.
 * It includes the TasksPageComponent (list, CRUD operations) and TaskDialogComponent (create/edit tasks dialog).
 *
 * Angular Material components are imported to provide a consistent and modern UI, including tables,
 * dialogs, buttons, form fields, chips, toolbars, pagination, and loading spinners.
 *
 * Declarations:
 * - TasksPageComponent: Main page for displaying tasks in a table with actions and state.
 * - TaskDialogComponent: Modal dialog used for creating or editing tasks.
 *
 * Imports:
 * - CommonModule: Provides common Angular directives like ngIf and ngFor.
 * - TasksRoutingModule: Routing module for the tasks feature.
 * - FormsModule & ReactiveFormsModule: For template-driven and reactive forms.
 *
 * Angular Material Modules:
 * - MatButtonModule: For buttons (raised, flat, icon).
 * - MatIconModule: For displaying icons inside buttons.
 * - MatCardModule: To wrap content inside Material cards.
 * - MatDialogModule: To open modal dialogs for task creation/editing.
 * - MatFormFieldModule: For Material form fields in the dialog.
 * - MatInputModule: To input text inside Material form fields.
 * - MatTableModule: To display tasks in a Material table with sorting.
 * - MatCheckboxModule: If you need checkbox inputs for task completion.
 * - MatToolbarModule: For the toolbar at the top of the tasks page.
 * - MatPaginator: Provides pagination controls for the table.
 * - MatProgressSpinnerModule: Displays loading spinners while data is fetching.
 * - MatChipsModule: Optional for showing task state badges.
 *
 * Notes:
 * - All CRUD operations rely on TaskService which handles API calls and authentication headers.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksPageComponent } from '../tasks/components/tasks-page.component';
import { TaskDialogComponent } from '../tasks/components/task-dialog.component';
import { TasksRoutingModule } from './tasks-routing.module';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginator } from "@angular/material/paginator";

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    TasksPageComponent,
    TaskDialogComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatPaginator,
    MatProgressSpinnerModule,
    MatChipsModule
]
})
export class TasksModule { }
