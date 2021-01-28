import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as confetti from 'canvas-confetti';
import { setUser } from 'src/app/actions/users.actions';
import { AppState } from 'src/app/app.state';
import { Item } from 'src/app/models/item';
import { User } from 'src/app/models/user';
import { ExchangeService } from 'src/app/services/exchange.service';
import { ItemsService } from 'src/app/services/items.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-borrow-page-request',
  templateUrl: './borrow-page-request.component.html',
  styleUrls: ['./borrow-page-request.component.scss'],
})
export class BorrowPageRequestComponent implements OnInit {
  userLend: User;
  itemToBorrow: Item;
  itemToLend: Item;
  userBorr: User;
  user$ = this.store.pipe(select('user'));

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private userService: UserService,
    private itemsService: ItemsService,
    private exchangeService: ExchangeService
  ) {}

  ngOnInit(): void {
    this.userService
      .getUserById(+this.route.snapshot.paramMap.get('userLendId'))
      .subscribe((userLend) => {
        this.userLend = userLend;
      });
    this.itemsService
      .getItemById(+this.route.snapshot.paramMap.get('itemId'))
      .subscribe((item) => {
        this.itemToBorrow = item;
      });
    this.itemsService
      .getItemById(+this.route.snapshot.paramMap.get('itemLendId'))
      .subscribe((item) => {
        this.itemToLend = item;
      });
    this.user$.subscribe((user) => {
      this.userBorr = user;
    });
  }

  createExchange(): void {
    this.exchangeService
      .createExchange({
        userLendingId: this.userLend.id,
        userBorrowingId: this.userBorr.id,
        itemLentId: this.itemToLend.id,
        itemBorrowedId: this.itemToBorrow.id,
      })
      .subscribe(
        () => {
          this.userService.getUserById(this.userBorr.id).subscribe((user) => {
            this.store.dispatch(setUser({ user }));
            confetti.create(undefined, { resize: true, useWorker: false })({
              startVelocity: 80,
              particleCount: 200,
              gravity: 2,
              ticks: 400,
              origin: {
                x: 0.5,
                y: 0.8,
              },
            });
          });
        },
        (error) => {
          alert('Request already sent');
        }
      );
  }
}
