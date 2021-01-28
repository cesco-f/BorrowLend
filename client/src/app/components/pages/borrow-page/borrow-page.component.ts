import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-borrow-page',
  templateUrl: './borrow-page.component.html',
  styleUrls: ['./borrow-page.component.scss'],
})
export class BorrowPageComponent implements OnInit {
  user: User;
  user$ = this.store.pipe(select('user'));

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.user = user;
    });
  }
}
