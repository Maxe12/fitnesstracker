import {Injectable} from '@angular/core';
import {Exercise} from '../../interfaces/exercise';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private _availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];
  private _runningExercise: Exercise;
  runningExerciseChanged = new Subject<Exercise>();
  private _completedExercises: Exercise[] = [];

  constructor() { }

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
