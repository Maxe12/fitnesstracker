import { Component, OnInit } from '@angular/core';
import {Exercise} from '../../shared/interfaces/exercise';
import {TrainingService} from '../../shared/services/training/training.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  availableExercises: Exercise[] = [];

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.availableExercises = this.trainingService.availableExercises;
  }

  startTraining(form: NgForm): void {
    this.trainingService.startExercise(form.value.exercise);
  }
}
