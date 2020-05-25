import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthService} from '../../shared/services/auth/auth.service';
import {UiService} from '../../shared/services/ui/ui.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate;
  isLoading = false;
  private loadingStateSub: Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UiService
  ) { }

  ngOnInit() {
    this.loadingStateSub = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm): void {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy(): void {
    if (this.loadingStateSub) {
      this.loadingStateSub.unsubscribe();
    }
  }
}
