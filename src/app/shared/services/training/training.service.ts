import {Injectable} from '@angular/core';
import {Exercise} from '../../interfaces/exercise';
import {Subject} from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private _availableExercises: Exercise[] = [];
  exerciseDataChanges = new Subject<Exercise[]>();
  private _runningExercise: Exercise;
  runningExerciseChanged = new Subject<Exercise>();
  private _completedExercises: Exercise[] = [];

  constructor(private firestore: AngularFirestore) { }

  get availableExercises(): Exercise[] {
    return this._availableExercises.slice();
  }

  get runningExercise(): Exercise {
    return {...this._runningExercise};
  }

  set runningExercise(value: Exercise) {
    this._runningExercise = value;
  }

  get completedExercises(): Exercise[] {
    return this._completedExercises.slice();
  }

  set completedExercises(value: Exercise[]) {
    this._completedExercises = value;
  }

  fetchAvailableExercises() {
    this.firestore
      .collection('exercises')
      .snapshotChanges()
      .pipe(
        map(result => {
          return result.map(doc => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data()['name'],
              duration: doc.payload.doc.data()['duration'],
              calories: doc.payload.doc.data()['calories']
            };
          });
        })
      ).subscribe((exercises: Exercise[]) => {
        this._availableExercises = exercises;
        this.exerciseDataChanges.next([...this._availableExercises]);
    });
  }

  startExercise(selectedId: string) {
    this._runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.runningExerciseChanged.next({...this._runningExercise});
  }

  exerciseFinished() {
    this._completedExercises.push({
      ...this.runningExercise,
      date: new Date().toString(),
      state: 'completed'});
    this.runningExercise = null;
    this.runningExerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this._completedExercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date().toString(),
      state: 'cancelled'});
    this._runningExercise = null;
    this.runningExerciseChanged.next(null);
  }
}
