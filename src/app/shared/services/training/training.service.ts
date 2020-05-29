import {Injectable} from '@angular/core';
import {Exercise} from '../../interfaces/exercise';
import {Subject, Subscription} from 'rxjs';
import {AngularFirestore} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
import {UiService} from '../ui/ui.service';
import * as UI from '../../reducers/ui/ui.actions';
import * as fromRoot from '../../../app.reducer';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private _availableExercises: Exercise[] = [];
  availableExercisesChanged = new Subject<Exercise[]>();
  private _runningExercise: Exercise;
  runningExerciseChanged = new Subject<Exercise>();
  completedExercisesChanged = new Subject<Exercise[]>();
  private firebaseServiceSubs: Subscription[] = [];

  constructor(
    private firestore: AngularFirestore,
    private uiService: UiService,
    private store: Store<fromRoot.State>
  ) {
  }

  get availableExercises(): Exercise[] {
    return this._availableExercises.slice();
  }

  get runningExercise(): Exercise {
    return {...this._runningExercise};
  }

  set runningExercise(value: Exercise) {
    this._runningExercise = value;
  }

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.firebaseServiceSubs.push(this.firestore
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
        this.store.dispatch(new UI.StopLoading());
        this._availableExercises = exercises;
        this.availableExercisesChanged.next([...this._availableExercises]);
      }, error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar('Fetching exercises failed, please try again later', null, 5000);
        this.availableExercisesChanged.next(null);
      }));
  }

  startExercise(selectedId: string) {
    this._runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.runningExerciseChanged.next({...this._runningExercise});
  }

  exerciseFinished() {
    this.pushExerciseToDatabase({
      ...this.runningExercise,
      date: new Date().toString(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.runningExerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.pushExerciseToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date().toString(),
      state: 'cancelled'
    });
    this._runningExercise = null;
    this.runningExerciseChanged.next(null);
  }

  fetchCompletedExercises(): void {
    this.firebaseServiceSubs.push(this.firestore
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.completedExercisesChanged.next(exercises);
      }));
  }

  private pushExerciseToDatabase(exercise: Exercise): void {
    this.firestore.collection('finishedExercises').add(exercise);
  }

  cancelSubscriptions(): void {
    this.firebaseServiceSubs.forEach(sub => sub.unsubscribe());
  }
}
