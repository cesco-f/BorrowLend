import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from './apiUrl';
import { Exchange } from '../models/exchange';
import { ExchangeComplete } from '../models/exchange-complete';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  private userUrl = `${apiUrl}/exchanges`;

  constructor(private http: HttpClient) {}

  createExchange(exchange: any): Observable<ExchangeComplete> {
    return this.http.post<ExchangeComplete>(`${this.userUrl}`, exchange);
  }

  getExchange(id: number): Observable<ExchangeComplete> {
    return this.http.get<ExchangeComplete>(`${this.userUrl}/${id}`);
  }

  deleteExchange(id: number): Observable<object> {
    return this.http.delete(`${this.userUrl}/${id}`);
  }

  endExchange(id: number, userId: number): Observable<ExchangeComplete> {
    return this.http.put<ExchangeComplete>(
      `${this.userUrl}/end/${id}/${userId}`,
      {}
    );
  }

  acceptExchange(id: number): Observable<ExchangeComplete> {
    return this.http.put<ExchangeComplete>(`${this.userUrl}/accept/${id}`, {});
  }

  rejectExchange(id: number): Observable<ExchangeComplete> {
    return this.http.put<ExchangeComplete>(`${this.userUrl}/reject/${id}`, {});
  }
}
