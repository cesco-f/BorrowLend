import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { ExchangeService } from 'src/app/services/exchange.service';
import { UserService } from 'src/app/services/user.service';
import { EXCHANGE_COMPLETE } from 'src/app/testMocks/exchangeService';
import { of } from 'rxjs';

import { ExchangeCardBorrowComponent } from './exchange-card-borrow.component';
import { USER } from 'src/app/testMocks/user';

describe('ExchangeCardBorrowComponent', () => {
  let component: ExchangeCardBorrowComponent;
  let fixture: ComponentFixture<ExchangeCardBorrowComponent>;
  let mockExchangeService;
  let mockUserService;
  let mockStore;

  beforeEach(async () => {

    mockExchangeService = jasmine.createSpyObj(['deleteExchange', 'endExchange']);
    mockUserService = jasmine.createSpyObj(['getUserById']);
    mockStore = jasmine.createSpyObj(['dispatch']);

    mockExchangeService.deleteExchange.and.returnValue(of(null));
    mockUserService.getUserById.and.returnValue(of(USER));
    mockStore.dispatch.and.returnValue([])

    await TestBed.configureTestingModule({
      declarations: [ ExchangeCardBorrowComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: ExchangeService, useValue: mockExchangeService },
        { provide: UserService, useValue: mockUserService },
        { provide: Store, useValue: mockStore }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeCardBorrowComponent);
    component = fixture.componentInstance;
    component.exchange = EXCHANGE_COMPLETE;
    fixture.detectChanges();
  });

  fit('should create exchange card borrow component', () => {
    expect(component).toBeTruthy();
  });

  fit('should delete an exchange when delete button is clicked', fakeAsync(() => {
    const button = fixture.debugElement.query(By.css('.deletebutton')).nativeElement;
    button.click();
    tick();
    expect(mockExchangeService.deleteExchange).toHaveBeenCalledWith(component.exchange.id);
  }));

  fit('should dispatch a setUser action to update the state', fakeAsync(() => {
    const button = fixture.debugElement.query(By.css('.deletebutton')).nativeElement;
    button.click();
    tick();
    expect(mockExchangeService.deleteExchange).toHaveBeenCalledWith(component.exchange.id);
    expect(mockUserService.getUserById).toHaveBeenCalledWith(component.exchange.userBorrowing.id);
    expect(mockStore.dispatch).toHaveBeenCalled();

  }));

});
