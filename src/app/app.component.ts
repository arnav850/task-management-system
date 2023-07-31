import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task, TaskHistoryEntry } from './models/task.model';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>Welcome to Task Management System</h1>
      <!-- Display the list of tasks and listen for the selected task -->
      <app-task-list (taskSelected)="onTaskSelected($event)"></app-task-list>
      <!-- Display the form to edit the selected task -->
      <app-task-edit [formGroup]="taskForm" [task]="selectedTask" (cancelEdit)="onCancelEdit()"></app-task-edit>
      <!-- Display the task details for the selected task -->
      <app-task-details *ngIf="selectedTask" [task]="selectedTask" (editTaskEvent)="onEditTask($event)" (deleteTaskEvent)="onDeleteTask()"></app-task-details>
    </div>
  `,
})
export class AppComponent {
  title: string = 'Task Management System';

  // Form group to handle task creation
  taskForm: FormGroup;

  // Variable to store the selected task
  selectedTask: Task | null = null;

  constructor(private formBuilder: FormBuilder, private taskService: TaskService) {
    // Initialize the taskForm with required form controls and validators
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: [new Date(), Validators.required],
      priority: ['low', Validators.required],
    });
  }

  // Event listener for window resize
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustLayoutForScreenSize();
  }

  // Method to adjust layout based on screen size
  private adjustLayoutForScreenSize() {
    const screenWidth = window.innerWidth;
    // Modify the logic below based on your responsive design requirements
    if (screenWidth <= 768) {
      // Apply responsive styles for small screens
      // For example:
      this.title = 'Task Management (Mobile)'; // Update the title for small screens
      // You can add more responsive logic here
    } else {
      // Apply default styles for larger screens
      // For example:
      this.title = 'Task Management System'; // Reset the title for larger screens
      // You can add more default styles here
    }
  }

  // Initialize the component and apply initial layout adjustments
  ngOnInit() {
    this.adjustLayoutForScreenSize();
  }

  // Method to handle the task selection and include history log
  onTaskSelected(task: Task) {
    this.selectedTask = {
      ...task,
      history: task.history || [], // Set history to an empty array if it's not defined in the task
    };
  }

  // Method to handle the task editing
  onEditTask(task: Task) {
    this.selectedTask = task;
  }

  // Method to handle the task deletion
  onDeleteTask() {
    if (this.selectedTask) {
      this.taskService.deleteTask(this.selectedTask.id).subscribe(() => {
        // Task deleted successfully. Refresh the list of tasks.
        this.selectedTask = null;
      });
    }
  }

  // Method to handle canceling the task edit
  onCancelEdit() {
    this.selectedTask = null;
  }
}


