import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { apiUrl } from './apiUrl';
import { ExchangeService } from './exchange.service';
import * as mock from './../testMocks/exchangeService';

describe('ExchangeService', () => {
  let service: ExchangeService;
  let httpTestingController: HttpTestingController;
  let userUrl = `${apiUrl}/exchanges`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExchangeService],
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(ExchangeService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('should create a new exchange and post it to the database', () => {
    service.createExchange(mock.PRE_EXCHANGE).subscribe((response) => {
      expect(response).toEqual(mock.EXCHANGE_COMPLETE);
      expect(response.userLending.id).toBe(mock.PRE_EXCHANGE.userLendingId);
      expect(response.userBorrowing.id).toBe(mock.PRE_EXCHANGE.userBorrowingId);
    });
    expect(service).toBeTruthy();
    const req = httpTestingController.expectOne(userUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(mock.EXCHANGE_COMPLETE);
  });

  fit('should get an exchange by id', () => {
    service.getExchange(2).subscribe((response) => {
      expect(response).toEqual(mock.EXCHANGE_COMPLETE);
      expect(response.id).toBe(2);
    });
    expect(service).toBeTruthy();
    const req = httpTestingController.expectOne(`${userUrl}/2`);
    expect(req.request.method).toEqual('GET');
    req.flush(mock.EXCHANGE_COMPLETE);
  });

  fit('should delete an exchange by id', () => {
    service.deleteExchange(2).subscribe((response) => {
      expect(response).toEqual({});
    });
    expect(service).toBeTruthy();
    const req = httpTestingController.expectOne(`${userUrl}/2`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });

  fit('should edit an exchange to be accepted', () => {
    service.acceptExchange(2).subscribe((response) => {
      expect(response).toEqual(mock.EXCHANGE_ACCEPTED);
      expect(response.accepted).toBe(true);
    });
    expect(service).toBeTruthy();
    const req = httpTestingController.expectOne(`${userUrl}/accept/2`);
    expect(req.request.method).toEqual('PUT');
    req.flush(mock.EXCHANGE_ACCEPTED);
  });

  fit('should edit an exchange to be rejected', () => {
    service.rejectExchange(2).subscribe((response) => {
      expect(response).toEqual(mock.EXCHANGE_REJECTED);
      expect(response.accepted).toBe(false);
    });
    expect(service).toBeTruthy();
    const req = httpTestingController.expectOne(`${userUrl}/reject/2`);
    expect(req.request.method).toEqual('PUT');
    req.flush(mock.EXCHANGE_REJECTED);
  });

});
