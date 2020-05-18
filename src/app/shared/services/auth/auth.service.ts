import { Injectable } from '@angular/core';
import {User} from '../../interfaces/user';
import {AuthenticationData} from '../../interfaces/authentication-data';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authChanges = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) { }

  public registerUser(authData: AuthenticationData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.successfulAuthentication();
  }

  public login(authData: AuthenticationData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.successfulAuthentication();
  }

  public logout(): void {
    this.user = null;
    this.authChanges.next(false);
    this.router.navigate(['login']);
  }

  private successfulAuthentication() {
    this.authChanges.next(true);
    this.router.navigate(['training']);
  }

  public getUser(): User | null {
    return {...this.user};
  }

  public isLoggedIn(): boolean {
    return !!this.user;
  }
}
