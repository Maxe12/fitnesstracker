import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {StopTrainingComponent} from './stop-training.component';
import {TrainingService} from '../../shared/services/training/training.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromRoot.State>
  ) {
  }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  stopTimer() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(wantsToExit => {
      if (wantsToExit) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }

  private startOrResumeTimer() {
    this.store.select(fromRoot.getActiveExercise)
      .pipe(take(1))
      .subscribe(exercise => {
      const step = exercise.duration / 100 * 1000;
      this.timer = setInterval(() => {
        this.progress += 1;
        if (this.progress >= 100) {
          this.trainingService.exerciseFinished();
          clearInterval(this.timer);
        }
      }, step);
    });
  }
}
