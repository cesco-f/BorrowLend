import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-my-lists-page',
  templateUrl: './my-lists-page.component.html',
  styleUrls: ['./my-lists-page.component.scss'],
})
export class MyListsPageComponent implements OnInit {
  user: User;
  user$ = this.store.pipe(select('user'));

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.user = user;
    });
  }
}
