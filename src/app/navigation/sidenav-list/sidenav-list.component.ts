import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavDispatcher = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidenav(): void {
    this.sidenavDispatcher.emit();
  }

}
