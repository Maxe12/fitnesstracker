import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import {AuthService} from '../../shared/services/auth/auth.service';
import {Observable, Subscription} from 'rxjs';
import * as fromRoot from '../../app.reducer';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuthenticated$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuthenticated);
  }

  toggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  handleLogout(): void {
    this.authService.logout();
  }
}
