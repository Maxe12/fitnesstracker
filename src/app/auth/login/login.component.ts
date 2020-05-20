import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(loginData) {
    this.authService.login({
      email: loginData.value.email,
      password: loginData.value.password
    });
  }
}
