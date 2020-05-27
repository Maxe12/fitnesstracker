import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth/auth.service';
import {UiService} from '../../shared/services/ui/ui.service';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {State} from '../../shared/interfaces/state';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  private loadingSub: Subscription;
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private uiService: UiService,
    private store: Store<{ui: State}>
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));
    /*this.loadingSub = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });*/
  }

  onSubmit(loginData): void {
    this.authService.login({
      email: loginData.value.email,
      password: loginData.value.password
    });
  }

  /*ngOnDestroy(): void {
    if (this.loadingSub) {
      this.loadingSub.unsubscribe();
    }
  }*/
}
