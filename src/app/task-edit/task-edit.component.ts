import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-edit',
  
  template: `
    <div *ngIf="task">
      <h2>Edit Task</h2>
      <form [formGroup]="taskForm" (submit)="onSubmit()">
        <label for="title">Title:</label>
        <input type="text" id="title" formControlName="title" required>

        <label for="description">Description:</label>
        <textarea id="description" formControlName="description" required></textarea>

        <label for="dueDate">Due Date:</label>
        <input type="date" id="dueDate" formControlName="dueDate" required>

        <label for="priority">Priority:</label>
        <select id="priority" formControlName="priority" required>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button type="submit">Save</button>
        <button type="button" (click)="onCancel()">Cancel</button>
      </form>
    </div>
  `,
})
export class TaskEditComponent {
  @Input() task: Task | null = null;
  @Output() cancelEdit = new EventEmitter<void>();

  taskForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: [null, Validators.required],
      priority: ['low', Validators.required],
    });
  }

  ngOnChanges() {
    if (this.task) {
      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        dueDate: this.task.dueDate,
        priority: this.task.priority,
      });
    }
  }

  onSubmit() {
    if (this.taskForm.valid && this.task) {
      // Save the changes to the task
      this.task.title = this.taskForm.value.title;
      this.task.description = this.taskForm.value.description;
      this.task.dueDate = this.taskForm.value.dueDate;
      this.task.priority = this.taskForm.value.priority;

      // Emit the event to notify the parent component that editing is done
      this.cancelEdit.emit();
    }
  }

  onCancel() {
    this.cancelEdit.emit();
  }
  
}
