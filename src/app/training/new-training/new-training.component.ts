import {Component, OnDestroy, OnInit} from '@angular/core';
import {Exercise} from '../../shared/interfaces/exercise';
import {TrainingService} from '../../shared/services/training/training.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  availableExercises: Exercise[];
  exerciseSubscription: Subscription;

  constructor(
    private trainingService: TrainingService,
  ) {}

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exerciseDataChanges.subscribe(exercises => {
      this.availableExercises = exercises;
    });
    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
  }

  startTraining(form: NgForm): void {
    this.trainingService.startExercise(form.value.exercise);
  }
}
