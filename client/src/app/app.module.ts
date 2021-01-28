import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { usersReducer } from './reducers/users.reducer';
import { itemsReducer } from './reducers/items.reducer';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/elements/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/pages/login/login.component';
import { LoadingComponent } from './components/pages/loading/loading.component';
import { ItemCardSearchComponent } from './components/elements/item-card-search/item-card-search.component';
import { SearchPageComponent } from './components/pages/search-page/search-page.component';
import { BorrowPageComponent } from './components/pages/borrow-page/borrow-page.component';
import { ItemCardBorrowComponent } from './components/elements/item-card-borrow/item-card-borrow.component';
import { BorrowPageUsersComponent } from './components/pages/borrow-page-users/borrow-page-users.component';
import { UserCardComponent } from './components/elements/user-card/user-card.component';
import { BorrowPageLendComponent } from './components/pages/borrow-page-lend/borrow-page-lend.component';
import { ItemCardLendComponent } from './components/elements/item-card-lend/item-card-lend.component';
import { BorrowPageRequestComponent } from './components/pages/borrow-page-request/borrow-page-request.component';
import { RequestsPageComponent } from './components/pages/requests-page/requests-page.component';
import { ExchangeCardBorrowComponent } from './components/elements/exchange-card-borrow/exchange-card-borrow.component';
import { ExchangeCardLendComponent } from './components/elements/exchange-card-lend/exchange-card-lend.component';
import { MyListsPageComponent } from './components/pages/my-lists-page/my-lists-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    LoadingComponent,
    ItemCardSearchComponent,
    SearchPageComponent,
    BorrowPageComponent,
    ItemCardBorrowComponent,
    BorrowPageUsersComponent,
    UserCardComponent,
    BorrowPageLendComponent,
    ItemCardLendComponent,
    BorrowPageRequestComponent,
    RequestsPageComponent,
    ExchangeCardBorrowComponent,
    ExchangeCardLendComponent,
    MyListsPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({
      user: usersReducer,
      items: itemsReducer,
    }),
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
