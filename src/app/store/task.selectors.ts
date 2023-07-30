// src/app/store/task.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState, taskAdapter } from './task.state';

export const getTaskState = createFeatureSelector<TaskState>('tasks');

export const {
  selectAll: getAllTasks,
  selectEntities: getTaskEntities,
  selectIds: getTaskIds,
  selectTotal: getTotalTasks,
} = taskAdapter.getSelectors(getTaskState);

export const selectTasks = createSelector(getAllTasks, (tasks) => tasks);
