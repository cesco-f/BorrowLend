import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setItems } from './actions/items.actions';
import { AppState } from './app.state';
import { ItemsService } from './services/items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client';
  constructor(
    private store: Store<AppState>,
    private itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    this.itemsService.getItems().subscribe((items) => {
      this.store.dispatch(setItems({ items }));
    });
  }
}
