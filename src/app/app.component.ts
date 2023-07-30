import { Component, HostListener } from '@angular/core';
import { Task, TaskHistoryEntry } from './models/task.model';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>Welcome to Task Management System</h1>
      <!-- Add your other components and content here -->
      <app-task-list></app-task-list>
      <app-task-create></app-task-create>

      <!-- Check if selectedTask is not null before displaying task details -->
      <app-task-details *ngIf="selectedTask" [task]="selectedTask"></app-task-details>
    </div>
  `,
})
export class AppComponent {
  // Add the title property here
  title: string = 'Task Management System';

  // You can add component logic here if needed

  // Variable to store the selected task
  selectedTask: Task | null = null;

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
}
