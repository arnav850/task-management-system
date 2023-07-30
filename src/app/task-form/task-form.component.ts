import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  @Input() task!: Task; // Use definite assignment assertion

  @Output() submitForm: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() cancelForm: EventEmitter<void> = new EventEmitter<void>();

  // Method to handle form submission
  onSubmit() {
    this.submitForm.emit(this.task);
  }

  // Method to handle form cancellation
  onCancel() {
    this.cancelForm.emit();
  }
}



