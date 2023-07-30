// src/app/reducers/task.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { addTask, updateTask, deleteTask } from '../actions/task.actions';
import { Task } from '../models/task.model';

export interface TaskState {
  tasks: Task[];
}

export const initialState: TaskState = {
  tasks: [],
};

export const taskReducer = createReducer(
  initialState,
  on(addTask, (state, { task }) => ({ ...state, tasks: [...state.tasks, task] })),
  on(updateTask, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
  })),
  on(deleteTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter((t) => t.id !== id),
  }))
);
