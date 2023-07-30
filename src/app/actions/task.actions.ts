// src/app/store/task.actions.ts

import { createAction, props } from '@ngrx/store';
import { Task } from '../models/task.model';

// Define the action type and the payload
export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());
export const updateTask = createAction('[Task] Update Task', props<{ task: Task }>());
export const deleteTask = createAction('[Task] Delete Task', props<{ id: number }>()); // Add the 'id' property to the deleteTask action
