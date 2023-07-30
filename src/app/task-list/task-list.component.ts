// src/app/task-list/task-list.component.ts

import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  editTask(task: Task) {
    this.selectedTask = { ...task };
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      // Task deleted successfully. Refresh the list of tasks.
      this.getTasks();
    });
  }

  exportCsv() {
    const csvData: { [key: string]: any }[] = this.tasks.map((task) => {
      return {
        Title: task.title,
        Description: task.description,
        'Due Date': task.dueDate,
        Priority: task.priority,
        Status: task.status,
      };
    });

    const csvRows = [];
    const headers = Object.keys(csvData[0]);
    csvRows.push(headers.join(','));

    for (const data of csvData) {
      const values = headers.map((header) => {
        return data[header];
      });
      csvRows.push(values.join(','));
    }

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'task_list.csv';
    a.click();

    window.URL.revokeObjectURL(url);
  }
}
