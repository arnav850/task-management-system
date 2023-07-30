import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
})
export class TaskCreateComponent {
  newTask: Task = {
    id: 0,
    title: '',
    description: '',
    dueDate: new Date(),
    priority: 'low',
    status: 'to-do',
    createdAt: new Date(), // Add the missing createdAt property
    history: [], // Add the missing history property (assuming it's an array)
  };

  constructor(private taskService: TaskService) {}

  addTask() {
    // Implementation for adding a task
    this.taskService.addTask(this.newTask).subscribe((tasks) => {
      // Optionally, you can handle the response or do something after adding the task
      console.log('Task added successfully:', this.newTask);
    });

    // Reset the form fields after adding the task
    this.newTask = {
      id: 0,
      title: '',
      description: '',
      dueDate: new Date(),
      priority: 'low',
      status: 'to-do',
      createdAt: new Date(),
      history: [],
    };
  }

  onCancel() {
    // Implementation for canceling the form submission
    // Reset the form fields
    this.newTask = {
      id: 0,
      title: '',
      description: '',
      dueDate: new Date(),
      priority: 'low',
      status: 'to-do',
      createdAt: new Date(),
      history: [],
    };
  }
}
