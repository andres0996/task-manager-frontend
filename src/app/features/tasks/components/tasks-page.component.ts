import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from './task-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Task } from '../../../core/models/task.model';
import { ConfirmDialogComponent } from './confirm-dialog.component';

/**
 * TasksPageComponent
 *
 * Component that displays the list of tasks for the logged-in user.
 * Users can create, edit, delete, and toggle completion of tasks.
 * Includes Material Table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-tasks-page',
  templateUrl: '../pages/tasks-page/tasks-page.component.html',
  styleUrls: ['../pages/tasks-page/tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit {

  /** Columns displayed in the tasks table */
  displayedColumns: string[] = ['title', 'description', 'completed', 'createdAt', 'actions'];

  /** Data source for the Material table */
  dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>([]);

  /** Loading indicator */
  loading = false;

  /** Error message if fetching fails */
  error = '';

  /** Filter value */
  filterValue: string = '';
  displayedTasks: Task[] = [];

  /** References for sorting and pagination */
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  /**
   * OnInit lifecycle hook
   * - Checks if user is logged in, otherwise redirects to login
   * - Fetches the list of tasks for the current user
   */
  ngOnInit() {
    const email = this.authService.getEmail();
    this.displayedTasks = this.dataSource.data;
    if (!email) {
      this.router.navigate(['/login']);
      return;
    }
    this.fetchTasks(email);
  }

  /**
   * Fetches tasks for a given user email
   * @param email - User email
   */
  fetchTasks(email: string) {
    this.loading = true;
    this.taskService.getTasks(email).subscribe({
      next: (tasks: Task[]) => {
        this.dataSource.data = tasks;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Could not load tasks';
        this.loading = false;
      }
    });
  }

  /**
   * Opens a dialog to create a new task.
   * After dialog is closed, adds the new task to the table.
   */
  addTask() {
    const email = this.authService.getEmail()!;
    const dialogRef = this.dialog.open(TaskDialogComponent, { width: '400px', data: null });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.taskService.createTask({ userEmail: email, ...result })
        .subscribe(task => {
          // Prepend new task and refresh table
          this.dataSource.data = [task, ...this.dataSource.data];
        });
    });
  }

  /**
   * Opens a dialog to edit an existing task.
   * Updates the task in the table after successful edit.
   * @param task - Task to edit
   */
  editTask(task: Task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, { width: '400px', data: task });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.taskService.updateTask(task.id!, result)
        .subscribe(updated => {
          const index = this.dataSource.data.findIndex(t => t.id === updated.id);
          if (index > -1) this.dataSource.data[index] = updated;
          this.dataSource._updateChangeSubscription();
        });
    });
  }

  /**
   * Deletes a task after user confirmation.
   * @param id - Task ID to delete
   */
  deleteTask(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;

      this.taskService.deleteTask(id).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(t => t.id !== id);
      });
    });
  }

  /**
   * Toggles the completion state of a task.
   * @param task - Task to toggle
   */
  toggleCompleted(task: Task) {
    this.taskService.updateTask(task.id!, { completed: !task.completed })
      .subscribe(updated => {
        const index = this.dataSource.data.findIndex(t => t.id === updated.id);
        if (index > -1) this.dataSource.data[index] = updated;
        this.dataSource._updateChangeSubscription();
      });
  }

  /**
   * Logs out the user and redirects to the login page
   */
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  /**
   * Applies a filter to the table based on user input
   * @param event - Input event from filter input
   */
  applyFilter() {
    this.displayedTasks = this.filteredTasks();
  }

  filteredTasks(): Task[] {
    if (!this.filterValue) return this.dataSource.data;

    const filter = this.filterValue.toLowerCase();
    return this.dataSource.data.filter(task =>
      task.title.toLowerCase().includes(filter) ||
      (task.description ?? '').toLowerCase().includes(filter)
    );
  }
}
