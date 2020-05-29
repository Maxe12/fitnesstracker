import {Injectable} from '@angular/core';
import {Exercise} from '../../interfaces/exercise';
import {Subject, Subscription} from 'rxjs';
import {AngularFirestore} from 'angularfire2/firestore';
import {map, take} from 'rxjs/operators';
import {UiService} from '../ui/ui.service';
import * as UI from '../../redux/ui/ui.actions';
import * as Training from '../../redux/training/training.actions';
import * as fromRoot from '../../../app.reducer';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  availableExercisesChanged = new Subject<Exercise[]>();
  completedExercisesChanged = new Subject<Exercise[]>();
  private firebaseServiceSubs: Subscription[] = [];

  constructor(
    private firestore: AngularFirestore,
    private uiService: UiService,
    private store: Store<fromRoot.State>
  ) {
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
        this.store.dispatch(new Training.SetAvailableExercise(exercises));
      }, error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar('Fetching exercises failed, please try again later', null, 5000);
        this.availableExercisesChanged.next(null);
      }));
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartExercise(selectedId));
  }

  exerciseFinished() {
    this.store.select(fromRoot.getActiveExercise)
      .pipe(take(1))
      .subscribe(exercise => {
      this.pushExerciseToDatabase({
        ...exercise,
        date: new Date().toString(),
        state: 'completed'
      });
    });
    this.store.dispatch(new Training.StopExercise());
  }

  cancelExercise(progress: number) {
    this.store.select(fromRoot.getActiveExercise)
      .pipe(take(1))
      .subscribe(exercise => {
      this.pushExerciseToDatabase({
        ...exercise,
        duration: exercise.duration * (progress / 100),
        calories: exercise.calories * (progress / 100),
        date: new Date().toString(),
        state: 'cancelled'
      });
    });
    this.store.dispatch(new Training.StopExercise());
  }

  fetchCompletedExercises(): void {
    this.firebaseServiceSubs.push(this.firestore
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new Training.SetFinishedExercises(exercises));
      }));
  }

  cancelSubscriptions(): void {
    this.firebaseServiceSubs.forEach(sub => sub.unsubscribe());
  }

  private pushExerciseToDatabase(exercise: Exercise): void {
    this.firestore.collection('finishedExercises').add(exercise);
  }
}
