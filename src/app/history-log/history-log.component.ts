// src/app/history-log/history-log.component.ts

import { Component, Input } from '@angular/core';
import { TaskHistoryEntry } from '../models/task.model'; // Correct import for TaskHistoryEntry

@Component({
  selector: 'app-history-log',
  templateUrl: './history-log.component.html',
  styleUrls: ['./history-log.component.scss']
})
export class HistoryLogComponent {
  @Input() historyLog: TaskHistoryEntry[]; // Correct property name for the array
}
