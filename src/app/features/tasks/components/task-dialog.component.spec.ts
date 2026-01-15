import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDialogComponent } from './task-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('TaskDialogComponent', () => {
  let component: TaskDialogComponent;
  let fixture: ComponentFixture<TaskDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<TaskDialogComponent>>;

  const taskData = {
    userEmail: 'test@test.com',
    title: 'Test Task',
    description: 'Task description',
    completed: false
  };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatProgressSpinnerModule
      ],
      declarations: [TaskDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: taskData },
        { provide: MatDialogRef, useValue: dialogRefSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with task data if provided', () => {
    expect(component.taskForm.value.title).toBe(taskData.title);
    expect(component.taskForm.value.description).toBe(taskData.description);
  });

  it('should close dialog without data on cancel', () => {
    component.cancel();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should close dialog with form data on save if form is valid', () => {
    component.taskForm.setValue({ title: 'New Task', description: 'New Desc' });
    component.save();
    expect(dialogRefSpy.close).toHaveBeenCalledWith({ title: 'New Task', description: 'New Desc' });
  });

  it('should not close dialog on save if form is invalid', () => {
    component.taskForm.setValue({ title: '', description: '' });
    component.save();
    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });
});
