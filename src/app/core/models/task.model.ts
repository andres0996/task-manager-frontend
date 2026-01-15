/**
 * Represents a task in the Task Manager application.
 */
export interface Task {
  /** The unique identifier of the task. */
  id?: string;

  /** The email of the user who owns this task. */
  userEmail: string;

  /** The title of the task. */
  title: string;

  /** A detailed description of the task. */
  description?: string;

  /** Indicates whether the task is completed. */
  completed: boolean;

  /** The date and time when the task was marked as completed (optional). */
  completedAt?: string | null;

  /** The date and time when the task was created. */
  createdAt: string;
}
