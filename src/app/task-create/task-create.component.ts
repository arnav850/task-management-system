import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
})
export class TaskCreateComponent {
  @Output() taskCreated = new EventEmitter<Task>();

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private taskService: TaskService) {
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: [new Date(), Validators.required],
      priority: ['low', Validators.required],
    });
  }

  addTask() {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value;
      this.taskService.addTask(formData).subscribe((tasks) => {
        // Emit the newly created task to the parent component
        this.taskCreated.emit(formData);

        // Reset the form fields after adding the task
        this.formGroup.reset();
      });
    }
  }

  onCancel() {
    this.formGroup.reset();
  }
}
