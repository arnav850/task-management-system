import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task.model';

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

  // Method to set tasks
  setTasks(tasks: Task[]): void {
    this.tasks = tasks;
  }
}

