import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Task } from '../models/task.model';
import { AppConfig } from '../../app.config';

/**
 * TaskService handles all CRUD operations for tasks.
 *
 */

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Get all tasks for a given user email.
   * @param email User's email
   * @returns Observable of Task array
   */
  getTasks(email: string): Observable<Task[]> {

    return this.http.get<{ message: string; data: Task[] }>(`${environment.apiUrl}${AppConfig.endpoints.tasks.list}${email}`, { headers: this.getAuthHeaders() })
      .pipe(map(response => response.data));
  }

  /**
   * Create a new task.
   * @param data Task data
   * @returns Observable of created Task
   */
  createTask(data: { title: string; description: string; userEmail: string }): Observable<Task> {
    return this.http.post<{ message: string; data: Task }>(`${environment.apiUrl}${AppConfig.endpoints.tasks.create}`, data, { headers: this.getAuthHeaders() })
      .pipe(map(response => response.data));
  }

  /**
   * Update an existing task.
   * @param id Task ID
   * @param data Fields to update
   * @returns Observable of updated Task
   */
  updateTask(id: string, data: { title?: string; description?: string; completed?: boolean }): Observable<Task> {
    return this.http.put<{ message: string; data: Task }>(`${environment.apiUrl}${AppConfig.endpoints.tasks.get}${id}`, data, { headers: this.getAuthHeaders() })
      .pipe(map(response => response.data));
  }

  /**
   * Delete a task by its ID.
   * @param id Task ID
   * @returns Observable of delete operation
   */
  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}${AppConfig.endpoints.tasks.delete}/${id}`, { headers: this.getAuthHeaders() });
  }

  /**
   * Helper to generate HTTP headers with the current auth token.
   */
  private getAuthHeaders(): { [header: string]: string } {
	  const token = this.authService.getToken();
	  return token ? { Authorization: `Bearer ${token}` } : {};
  }
}
