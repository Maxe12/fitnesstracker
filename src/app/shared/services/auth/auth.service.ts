import { Injectable } from '@angular/core';
import {AuthenticationData} from '../../interfaces/authentication-data';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {TrainingService} from '../training/training.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UiService} from '../ui/ui.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import * as UI from '../../reducers/ui/ui.actions';
import * as Auth from '../../reducers/auth/auth.action';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private snackBar: MatSnackBar,
    private uiService: UiService,
    private store: Store<fromRoot.State>
  ) { }

  initAuthorization(): void {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.router.navigate(['login']);
      }
    });
  }

  public registerUser(authData: AuthenticationData): void {
    this.store.dispatch(new UI.StartLoading());
    this.fireAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    )
      .then(result => {
      })
      .catch(error => {
        this.uiService.showSnackbar(error.message, null, 3000);
    })
      .finally(() => {
        this.store.dispatch(new UI.StopLoading());
    });
  }

  public login(authData: AuthenticationData): void {
    this.store.dispatch(new UI.StartLoading());
    this.fireAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    )
      .then(result => {
      })
      .catch(error => {
        this.uiService.showSnackbar(error.message, null, 3000);
      })
      .finally(() => {
        this.store.dispatch(new UI.StopLoading());
      });
  }

  public logout(): void {
    this.fireAuth.auth.signOut();
  }
}
