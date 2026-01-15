import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../../core/models/task.model';

/**
 * TaskDialogComponent
 *
 * This component represents a modal dialog for creating or editing a task.
 * Features:
 * - Displays a form to enter task title and description
 * - Validates the title field (required)
 * - Pre-fills form fields if a task is provided (edit mode)
 * - Can be closed without saving or by submitting the form
 */
@Component({
  selector: 'app-task-dialog',
  templateUrl: '../pages/task-dialog.component.html',
  styleUrls: ['../pages/task-dialog.component.scss']
})
export class TaskDialogComponent {

  /** Reactive form to manage task data (title and description) */
  taskForm: FormGroup;

  /**
   * Constructor
   * @param fb FormBuilder to create reactive form
   * @param dialogRef Reference to the opened dialog
   * @param task Optional task data passed to the dialog (for editing)
   */
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public task: Task | null
  ) {

    const taskData = task ? task : {
      userEmail: '',
      title: '',
      description: '',
      completed: false
    };

    this.taskForm = this.fb.group({
      title: [taskData.title, Validators.required],
      description: [taskData.description]
    });
  }

  /**
   * Closes the dialog without saving any data.
   */
  cancel() {
    this.dialogRef.close();
  }

  /**
   * Closes the dialog and returns the form data to the parent component,
   * only if the form is valid.
   */
  save() {
    if (this.taskForm.invalid) return;
    this.dialogRef.close(this.taskForm.value);
  }
}
