import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { AuthService } from './auth.service';
import { AppConfig } from '../../app.config';
import { environment } from '../../../environments/environment.prod';
import { Task } from '../models/task.model';

/**
 * Mock AuthService for testing purposes.
 * Always returns a fixed token.
 */

class MockAuthService {
  getToken() { return 'mock-token'; }
}

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TaskService,
        { provide: AuthService, useClass: MockAuthService }
      ]
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch tasks', () => {
    const mockTasks: Task[] = [
      { id: '1', userEmail: 'test@example.com', title: 'Test 1', description: '', completed: false, createdAt: '2026-01-14T00:00:00Z' },
      { id: '2', userEmail: 'test@example.com', title: 'Test 2', description: 'Desc', completed: true, createdAt: '2026-01-14T01:00:00Z' }
    ];

    service.getTasks('test@example.com').subscribe(tasks => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${AppConfig.endpoints.tasks.list}test@example.com`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    req.flush({ message: '', data: mockTasks });
  });

  it('should create a task', () => {
    const taskData = { userEmail: 'test@example.com', title: 'New Task', description: 'Desc' };
    const mockResponse: Task = { ...taskData, id: '3', completed: false, createdAt: '2026-01-14T02:00:00Z' };

    service.createTask(taskData).subscribe(task => {
      expect(task).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${AppConfig.endpoints.tasks.create}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    req.flush({ message: '', data: mockResponse });
  });

  it('should update a task', () => {
    const updatedData = { title: 'Updated' };
    const mockResponse: Task = { id: '1', userEmail: 'test@example.com', title: 'Updated', description: '', completed: false, createdAt: '2026-01-14T00:00:00Z' };

    service.updateTask('1', updatedData).subscribe(task => {
      expect(task).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${AppConfig.endpoints.tasks.update}1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    req.flush({ message: '', data: mockResponse });
  });

  it('should delete a task', () => {
    service.deleteTask('1').subscribe(res => {
      expect(res).toEqual({});
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${AppConfig.endpoints.tasks.delete}/1`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    req.flush({});
  });
});
