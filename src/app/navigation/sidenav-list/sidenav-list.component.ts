import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import {AuthService} from '../../shared/services/auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sidenavDispatcher = new EventEmitter<void>();
  isLoggedIn = false;
  authStatusSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authStatusSubscription = this.authService.authChanges.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }

  toggleSidenav(): void {
    this.sidenavDispatcher.emit();
  }

  handleLogout() {
    this.toggleSidenav();
    this.authService.logout();
  }
}
