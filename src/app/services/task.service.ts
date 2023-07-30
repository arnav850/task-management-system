import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task, TaskHistoryEntry } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];

  constructor() {}

  // Method to get all tasks
  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  // Method to add a new task
  addTask(task: Task): Observable<Task[]> {
    this.tasks.push(task);
    return of(this.tasks);
  }

  // Method to delete a task by id
  deleteTask(taskId: number): Observable<Task[]> {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    return of(this.tasks);
  }

  // Method to update a task by id
  updateTask(taskId: number, updatedTask: Task): Observable<Task[]> {
    const index = this.tasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      // Create a copy of the original task object
      const originalTask = { ...this.tasks[index] };

      // Update the task with the new data
      this.tasks[index] = { ...updatedTask };

      // Update the history log for the task
      this.updateTaskHistory(index, originalTask);

      return of(this.tasks);
    }

    return of([]);
  }

  // Method to set tasks
  setTasks(tasks: Task[]): void {
    this.tasks = tasks;
  }

  // Helper method to update the history log for a task
  private updateTaskHistory(index: number, originalTask: Task): void {
    if (!this.tasks[index].history) {
      this.tasks[index].history = [];
    }

    // Add the history log entry
    this.tasks[index].history.push({
      timestamp: new Date(),
      action: 'Edited',
      changes: this.getTaskChanges(originalTask, this.tasks[index]),
    });
  }

  // Helper method to get the changes between two task objects
  private getTaskChanges(originalTask: Task, updatedTask: Task): any {
    // Compare the properties of the two task objects and return the changes
    // You can implement this logic based on your requirements
    // For example, you can use a library like deep-diff to get the differences
    // between the two objects or manually compare the properties and return the changes as an object.
    // The returned object will be specific to your application's requirements for tracking changes.
    // Here's a simple example that returns all properties with their new values:
    const changes: any = {};

    Object.keys(updatedTask).forEach((property) => {
      if (originalTask[property as keyof Task] !== updatedTask[property as keyof Task]) {
        changes[property] = updatedTask[property as keyof Task];
      }
    });

    return changes;
  }
}
