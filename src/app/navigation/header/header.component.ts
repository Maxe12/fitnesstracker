import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import {AuthService} from '../../shared/services/auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isLoggedIn = false;
  userStatusSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userStatusSubscription = this.authService.authChanges.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnDestroy(): void {
    this.userStatusSubscription.unsubscribe();
  }

  toggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  handleLogout(): void {
    this.authService.logout();
  }
}
