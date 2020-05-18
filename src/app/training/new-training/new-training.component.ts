import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Exercise} from '../../shared/interfaces/exercise';
import {TrainingService} from '../../shared/services/training/training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  @Output() trainingDispatcher = new EventEmitter<void>();
  availableExercises: Exercise[] = [];

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.availableExercises = this.trainingService.availableExercises;
  }

  startTraining(): void {
    this.trainingDispatcher.emit();
  }

}
