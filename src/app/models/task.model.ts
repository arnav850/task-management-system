// task.model.ts

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  priority: "low" | "medium" | "high";
  status: "to-do" | "in-progress" | "completed";
  createdAt: Date;
  history: TaskHistoryEntry[]; // Add the 'history' property as an array of 'TaskHistoryEntry'
}

// Interface for a single history entry
export interface TaskHistoryEntry {
  timestamp: Date;
  action: string;
  changes: any; // You can replace 'any' with the appropriate type for the changes
}
