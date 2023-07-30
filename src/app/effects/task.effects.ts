// src/app/effects/task.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { TaskState } from '../reducers/task.reducer';
import { Task } from '../models/task.model';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private store: Store<TaskState>) {}

  updateLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType('[Task] Add', '[Task] Update', '[Task] Delete'),
        withLatestFrom(this.store.select('tasks')),
        tap(([action, tasks]) => {
          localStorage.setItem('tasks', JSON.stringify(tasks));
        })
      ),
    { dispatch: false }
  );
}
