import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {TrainingService} from '../shared/services/training/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  trainingIsActive = false;
  exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.runningExerciseChanged.subscribe(exercise => {
      this.trainingIsActive = !!exercise;
    });
  }
}
