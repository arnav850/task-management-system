// src/app/sort-tasks.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './models/task.model'; // Make sure the file path is correct

@Pipe({
  name: 'sortTasks'
})
export class SortTasksPipe implements PipeTransform {
  transform(tasks: Task[], sortBy: 'dueDate' | 'priority' | 'status'): Task[] {
    // Implement the sorting logic based on the selected sortBy value
    // For example, you can use Array.sort() to sort tasks by the selected property.
    switch (sortBy) {
      case 'dueDate':
        return tasks.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
      case 'priority':
        return tasks.sort((a, b) => {
          const priorityOrder = { low: 1, medium: 2, high: 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
      case 'status':
        return tasks.sort((a, b) => {
          const statusOrder = { 'to-do': 1, 'in-progress': 2, completed: 3 };
          return statusOrder[a.status] - statusOrder[b.status];
        });
      default:
        return tasks;
    }
  }
}
