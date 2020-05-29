import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromRoot from '../app.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  exerciseIsActive$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit(): void {
    this.exerciseIsActive$ = this.store.select(fromRoot.getExerciseIsActive);
  }
}
