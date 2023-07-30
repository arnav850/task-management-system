import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import the FormsModule
import { CommonModule } from '@angular/common'; // Import the CommonModule
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { taskReducer } from './reducers/task.reducer';
import { TaskEffects } from './effects/task.effects';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { HistoryLogComponent } from './history-log/history-log.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskCreateComponent,
    TaskListComponent,
    TaskFormComponent,
    TaskDetailsComponent,
    HistoryLogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, // Add FormsModule to the imports array
    CommonModule, // Add CommonModule to the imports array
    StoreModule.forRoot({ tasks: taskReducer }),
    EffectsModule.forRoot([TaskEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
