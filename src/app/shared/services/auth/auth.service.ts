import { Injectable } from '@angular/core';
import {User} from '../../interfaces/user';
import {AuthenticationData} from '../../interfaces/authentication-data';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authChanges = new Subject<boolean>();
  private user: User;

  constructor() { }

  public registerUser(authData: AuthenticationData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authChanges.next(true);
  }

  public login(authData: AuthenticationData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authChanges.next(true);
  }

  public logout(): void {
    this.user = null;
    this.authChanges.next(false);
  }

  public getUser(): User | null {
    return {...this.user};
  }

  public isLoggedIn(): boolean {
    return !!this.user;
  }
}
