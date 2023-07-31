import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  sortBy: 'dueDate' | 'priority' | 'status' = 'dueDate';

  // Property to store the selected task for editing
  selectedTask: Task | null = null;

  // Create an output event to emit the selected task
  @Output() taskSelected = new EventEmitter<Task>();

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
    // Emit the selected task using the taskSelected event
    this.taskSelected.emit(task);
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      // Task deleted successfully. Refresh the list of tasks.
      this.getTasks();
      this.selectedTask = null; // Clear the selected task after deletion if needed.
    });
  }

  exportCsv() {
    // ... (rest of the exportCsv method) ...
  }

  // Method to handle sorting tasks
  onSort(event: any): void {
    // Cast the event target to HTMLInputElement to access the 'value' property
    const sortByValue = (event.target as HTMLInputElement).value;
    this.sortBy = sortByValue as 'dueDate' | 'priority' | 'status';
    // Implement the logic for sorting the tasks based on the selected option
    // For example, you can use the sortBy value to sort the tasks array.
  }

  // Method to handle editing a task
  onEditTask(task: Task): void {
    this.selectedTask = task;
  }
}
