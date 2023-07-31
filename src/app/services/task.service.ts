// services/task.service.ts

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
    const newTask: Task = {
      ...task,
      id: this.tasks.length + 1,
      createdAt: new Date(),
      history: [],
    };

    this.tasks.push(newTask);
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
      const historyEntry: TaskHistoryEntry = {
        timestamp: new Date(),
        action: 'Edited',
        changes: this.getTaskChanges(originalTask, updatedTask),
      };
      this.updateTaskHistory(index, historyEntry);

      return of(this.tasks);
    }

    return of([]);
  }

  // Method to update the status of a task by id
  updateTaskStatus(taskId: number, newStatus: 'to-do' | 'in-progress' | 'completed'): Observable<Task[]> {
    const index = this.tasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      const originalTask = { ...this.tasks[index] };
      this.tasks[index].status = newStatus;

      const historyEntry: TaskHistoryEntry = {
        timestamp: new Date(),
        action: 'Status Updated',
        changes: {
          status: newStatus,
        },
      };
      this.updateTaskHistory(index, historyEntry);

      return of(this.tasks);
    }

    return of([]);
  }

  // Method to set tasks
  setTasks(tasks: Task[]): void {
    this.tasks = tasks;
  }

  // Helper method to update the history log for a task
  private updateTaskHistory(index: number, entry: TaskHistoryEntry): void {
    if (this.tasks[index]) {
      if (!this.tasks[index].history) {
        this.tasks[index].history = [];
      }
      this.tasks[index].history!.push(entry); // Use non-null assertion operator (!) here
    } else {
      console.error(`Task at index ${index} does not exist.`);
    }
  }

  // Helper method to get the changes between two task objects
  private getTaskChanges(originalTask: Task, updatedTask: Task): any {
    const changes: any = {};

    Object.keys(updatedTask).forEach((property) => {
      if (originalTask[property as keyof Task] !== updatedTask[property as keyof Task]) {
        changes[property] = updatedTask[property as keyof Task];
      }
    });

    return changes;
  }
}
