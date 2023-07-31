import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task, TaskHistoryEntry } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent {
  private _task: Task | undefined;

  @Input()
  set task(task: Task | undefined) {
    this._task = task;
  }

  get task(): Task | undefined {
    return this._task;
  }

  // Getter to ensure task.history is always an array
  get historyLog(): TaskHistoryEntry[] {
    return this.task?.history || [];
  }

  // Create an output event to emit the selected task for editing
  @Output() editTaskEvent = new EventEmitter<Task>();

  // Inject the TaskService into the component
  constructor(private taskService: TaskService) {}

  // Method to update the status of the task
  updateTaskStatus(newStatus: 'to-do' | 'in-progress' | 'completed'): void {
    if (this.task) {
      // Call the task service method to update the task status
      this.taskService.updateTaskStatus(this.task.id, newStatus).subscribe((tasks: Task[]) => {
        console.log('Task status updated successfully:', newStatus);
        this.task!.status = newStatus;

        // Optionally, you can handle the response or do something after updating the status
      });
    }
  }

  // Method to emit the selected task for editing
  editTask(): void {
    if (this.task) {
      this.editTaskEvent.emit(this.task);
    }
  }
}

