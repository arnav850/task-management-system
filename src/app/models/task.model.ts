// task.model.ts

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high'; // Add the priority property with allowed values
  createdAt: Date;
  history: TaskHistoryEntry[]; // Add the 'history' property as an array of 'TaskHistoryEntry'
  status: 'to-do' | 'in-progress' | 'completed'; // Add the status property
}

// Interface for a single history entry
export interface TaskHistoryEntry {
  timestamp: Date;
  action: 'Created' | 'Edited' | 'Status Updated';
  changes: any; // You can replace 'any' with the appropriate type for the changes
}
