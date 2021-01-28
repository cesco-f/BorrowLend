import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { apiUrl } from './apiUrl';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = `${apiUrl}/users`;

  constructor(private http: HttpClient) {}

	getUser(username: string): Observable<any> {
		return this.http.get<any>(`${this.userUrl}/username/${username}`);
	}

	getAllUsers(): Observable<User> {
		return this.http.get<any>(`${this.userUrl}`);
	}



	getUserById(userId: number): Observable<any> {
		return this.http.get<any>(`${this.userUrl}/${userId}`);
  }

	addToToBorrowList(userId: number, itemId: number): Observable<any> {
		return this.http.put<any>(
      `${this.userUrl}/toBorrowListAdd/${userId}/${itemId}`,
      {}
    );
  }

	removeFromToBorrowList(userId: number, itemId: number): Observable<any> {
		return this.http.put<any>(
      `${this.userUrl}/toBorrowListRem/${userId}/${itemId}`,
      {}
    );
  }

	addToToLendList(userId: number, itemId: number): Observable<any> {
		return this.http.put<any>(
      `${this.userUrl}/toLendListAdd/${userId}/${itemId}`,
      {}
    );
  }

	removeFromToLendList(userId: number, itemId: number): Observable<any> {
		return this.http.put<any>(
      `${this.userUrl}/toLendListRem/${userId}/${itemId}`,
      {}
    );
  }

	getUsersLending(itemId: number): Observable<any[]> {
		return this.http.get<any[]>(`${this.userUrl}/lending/${itemId}`);
  }
}
