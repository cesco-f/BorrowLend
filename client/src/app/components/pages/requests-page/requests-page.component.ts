import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { ExchangeComplete } from 'src/app/models/exchange-complete';
import { User } from 'src/app/models/user';
import { ExchangeService } from 'src/app/services/exchange.service';

@Component({
  selector: 'app-requests-page',
  templateUrl: './requests-page.component.html',
  styleUrls: ['./requests-page.component.scss'],
})
export class RequestsPageComponent implements OnInit {
  exchanges: ExchangeComplete[] = [];
  user: User;
  user$ = this.store.pipe(select((state) => state.user));

  constructor(
    private store: Store<AppState>,
    private exchangeService: ExchangeService
  ) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      if (user) {
        this.exchanges = []; // When the user is updated update the exchanges list
        this.user = user;
        user.exchangesBorr.forEach((exchange) => {
          this.exchangeService
            .getExchange(exchange.id)
            .subscribe((exchangeComplete) => {
              this.exchanges.push(exchangeComplete);
              this.exchanges.sort((a, b) => {
                return a.createdAt > b.createdAt ? -1 : 1;
              });
            });
        });
        user.exchangesLend.forEach((exchange) => {
          this.exchangeService
            .getExchange(exchange.id)
            .subscribe((exchangeComplete) => {
              this.exchanges.push(exchangeComplete);
              this.exchanges.sort((a, b) => {
                return a.createdAt > b.createdAt ? -1 : 1;
              });
            });
        });
      }
    });
  }
}
