import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Item } from 'src/app/models/item';
import { User } from 'src/app/models/user';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  user: User;
  user$ = this.store.pipe(select('user'));
  items: Item[];
  items$ = this.store.pipe(select('items'));
  itemsToShow = [];
  search = faSearch;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.user = user;
    });
    this.items$.subscribe((items) => {
      this.items = items;
    });
  }

  onKey(event: KeyboardEvent): void {
    const path = (event.target as HTMLInputElement).value;
    if (path) {
      this.itemsToShow = this.items.filter((item) =>
        item.title.toLowerCase().includes(path.toLowerCase())
      );
    } else {
      this.itemsToShow = [];
    }
  }
}
