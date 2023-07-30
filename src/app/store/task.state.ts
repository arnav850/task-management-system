// src/app/store/task.state.ts

import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { Task } from '../models/task.model';

export interface TaskState extends EntityState<Task> {}

export const taskAdapter = createEntityAdapter<Task>();

const initialState: TaskState = taskAdapter.getInitialState();

export const taskReducer = createReducer(
  initialState
  // You can add more reducer logic for handling different actions here
);
