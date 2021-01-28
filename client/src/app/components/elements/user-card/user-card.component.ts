import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { User } from 'src/app/models/user';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input() user: User; // The user lending the item that the logged user is looking for
  @Input() itemId: number;
  matchingItemsNo: number;
  user$ = this.store.pipe(select('user'));
  showToBorrowList = false;
  loggedUserToLendListIds: number[] = [];
  check = faCheck;
  cross = faTimes;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      if (user) {
        user.toLendList.forEach((item) => {
          this.loggedUserToLendListIds.push(item.id);
        });
        const matchingItems = this.user.toBorrowList.filter((a) =>
          user.toLendList.some((b) => a.id === b.id)
        );
        this.matchingItemsNo = matchingItems.length;
      }
    });
  }

  toggleShowToBorrowList(): void {
    this.showToBorrowList = !this.showToBorrowList;
  }
}
