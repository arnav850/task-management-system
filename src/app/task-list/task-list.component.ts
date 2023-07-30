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
}
