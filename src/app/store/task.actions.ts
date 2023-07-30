// src/app/store/task.actions.ts

import { createAction, props } from '@ngrx/store';
import { Task } from '../models/task.model';

// Define action types for tasks
export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());
export const updateTask = createAction('[Task] Update Task', props<{ task: Task }>());
export const deleteTask = createAction('[Task] Delete Task', props<{ taskId: number }>());
