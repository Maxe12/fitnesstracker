import { Component, OnInit } from '@angular/core';
import {Exercise} from '../../shared/interfaces/exercise';
import {TrainingService} from '../../shared/services/training/training.service';
import {NgForm} from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  availableExercises: Observable<any>;

  constructor(
    private trainingService: TrainingService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.availableExercises = this.firestore
      .collection('exercises')
      .valueChanges();
  }

  startTraining(form: NgForm): void {
    this.trainingService.startExercise(form.value.exercise);
  }
}
