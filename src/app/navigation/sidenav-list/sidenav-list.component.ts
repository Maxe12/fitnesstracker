import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../shared/services/auth/auth.service';
import {Observable} from 'rxjs';
import * as fromRoot from '../../app.reducer';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavDispatcher = new EventEmitter<void>();
  isAuthenticated$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) {
  }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuthenticated);
  }

  toggleSidenav(): void {
    this.sidenavDispatcher.emit();
  }

  handleLogout() {
    this.toggleSidenav();
    this.authService.logout();
  }
}
