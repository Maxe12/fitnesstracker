import {Component, OnDestroy, OnInit} from '@angular/core';
import {Exercise} from '../../shared/interfaces/exercise';
import {TrainingService} from '../../shared/services/training/training.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {UiService} from '../../shared/services/ui/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  availableExercises: Exercise[];
  exerciseSubscription: Subscription;
  loadingStateSub: Subscription;
  isLoading = false;

  constructor(
    private trainingService: TrainingService,
    private uiService: UiService
  ) {}

  ngOnInit() {
    this.loadingStateSub = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.exerciseSubscription = this.trainingService.availableExercisesChanged.subscribe(exercises => {
      this.availableExercises = exercises;
    });
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
    this.loadingStateSub.unsubscribe();
  }

  startTraining(form: NgForm): void {
    this.trainingService.startExercise(form.value.exercise);
  }
}
