import { Injectable } from '@angular/core';
import {AuthenticationData} from '../../interfaces/authentication-data';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {TrainingService} from '../training/training.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authChanges = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private snackBar: MatSnackBar
  ) { }

  initAuthorization(): void {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.authChanges.next(true);
        this.isAuthenticated = true;
        this.router.navigate(['training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.authChanges.next(false);
        this.isAuthenticated = false;
        this.router.navigate(['login']);
      }
    });
  }

  public registerUser(authData: AuthenticationData): void {
    this.fireAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    )
      .then(result => {
      })
      .catch(error => {
        this.snackBar.open(error.message, null, {
          duration: 3000
        });
    });
  }

  public login(authData: AuthenticationData): void {
    this.fireAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    )
      .then(result => {
      })
      .catch(error => {
        this.snackBar.open(error.message, null, {
          duration: 3000
        });
      });
  }

  public logout(): void {
    this.fireAuth.auth.signOut();
  }

  public isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
