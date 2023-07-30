// models/task.model.ts

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  priority: "low" | "medium" | "high";
  status: "to-do" | "in-progress" | "completed";
  createdAt: Date;
  history: any[]; // You can replace 'any[]' with the appropriate type for the 'history' property
}
