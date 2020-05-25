import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth/auth.service';
import {UiService} from '../../shared/services/ui/ui.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private loadingSub: Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UiService
  ) { }

  ngOnInit(): void {
    this.loadingSub = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  onSubmit(loginData): void {
    this.authService.login({
      email: loginData.value.email,
      password: loginData.value.password
    });
  }

  ngOnDestroy(): void {
    if (this.loadingSub) {
      this.loadingSub.unsubscribe();
    }
  }
}
