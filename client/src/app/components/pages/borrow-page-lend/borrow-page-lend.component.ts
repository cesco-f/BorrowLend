import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Item } from 'src/app/models/item';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-borrow-page-lend',
  templateUrl: './borrow-page-lend.component.html',
  styleUrls: ['./borrow-page-lend.component.scss'],
})
export class BorrowPageLendComponent implements OnInit {
  userLendingId: number;
  itemBorrowedId: number;
  matchingItems: Item[];
  user$ = this.store.pipe(select('user'));
  userLendingUsername: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.userLendingId = +this.route.snapshot.paramMap.get('userLendId');
    this.itemBorrowedId = +this.route.snapshot.paramMap.get('itemId');
    this.user$.subscribe((user) => {
      if (user) {
        this.userService
          .getUserById(this.userLendingId)
          .subscribe((userLending) => {
            this.userLendingUsername = userLending.username;
            // Get all the items that are in the to borrow list of the user lending and in the to lend list of the user borrowing
            this.matchingItems = userLending.toBorrowList.filter((a) =>
              user.toLendList.some((b) => a.id === b.id)
            );
          });
      }
    });
  }
}
