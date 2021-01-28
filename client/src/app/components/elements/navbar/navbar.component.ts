import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setUser } from 'src/app/actions/users.actions';
import { AppState } from 'src/app/app.state';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: User;
  user$ = this.store.pipe(select('user'));

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  logout(): void {
    this.store.dispatch(setUser(null));
    this.router.navigate(['login']);
  }
}
