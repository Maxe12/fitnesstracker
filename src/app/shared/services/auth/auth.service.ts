import { Injectable } from '@angular/core';
import {User} from '../../interfaces/user';
import {AuthenticationData} from '../../interfaces/authentication-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;

  constructor() { }

  public registerUser(authData: AuthenticationData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
  }

  public login(authData: AuthenticationData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
  }

  public logout(): void {
    this.user = null;
  }

  public getUser(): User | null {
    return {...this.user};
  }

  public isLoggedIn(): boolean {
    return this.user != null;
  }
}
