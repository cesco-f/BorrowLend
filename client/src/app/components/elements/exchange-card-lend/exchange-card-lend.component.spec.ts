import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ExchangeService } from 'src/app/services/exchange.service';
import { ExchangeCardLendComponent } from './exchange-card-lend.component';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/services/user.service';
import { EXCHANGE_COMPLETE } from 'src/app/testMocks/exchangeService';
import { of } from 'rxjs';


describe('ExchangeCardLendComponent', () => {
  let component: ExchangeCardLendComponent;
  let fixture: ComponentFixture<ExchangeCardLendComponent>;
  let mockExchangeService;
  let mockUserService;
  let mockStore;

  beforeEach(async () => {

    mockExchangeService = jasmine.createSpyObj([
      'deleteExchange', 'endExchange', 'acceptExchange', 'rejectExchange'
    ]);
    mockUserService = jasmine.createSpyObj(['getUserById']);
    mockStore = jasmine.createSpyObj(['dispatch']);

    mockExchangeService.rejectExchange.and.returnValue(of(null));
    mockUserService.getUserById.and.returnValue(of({}));
    mockStore.dispatch.and.returnValue(() => {});
    
    await TestBed.configureTestingModule({
      declarations: [ ExchangeCardLendComponent ],
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
    fixture = TestBed.createComponent(ExchangeCardLendComponent);
    component = fixture.componentInstance;
    component.exchange = EXCHANGE_COMPLETE;
    fixture.detectChanges();
  });

  fit('should create card lend component', () => {
    expect(component).toBeTruthy();
  });

  fit('should accept an exchange when accept button is clicked', fakeAsync(() => {
    const button = fixture.debugElement.query(By.css('.buttons__accept')).nativeElement;
    button.click();
    tick();
    expect(mockExchangeService.acceptExchange).toHaveBeenCalledWith(component.exchange.id);
  }));

  fit('should reject an exchange when reject button is clicked', fakeAsync(() => {
    const button = fixture.debugElement.query(By.css('.buttons__reject')).nativeElement;
    button.click();
    tick();
    expect(mockExchangeService.rejectExchange).toHaveBeenCalledWith(component.exchange.id);
    // tick();
    expect(mockUserService.getUserById).toHaveBeenCalled()
  }));

  
});
