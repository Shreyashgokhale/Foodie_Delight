import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodieApiService {
  getItems() {
    throw new Error('Method not implemented.');
  }
  apiUrl = 'https://668a78a92c68eaf3211ce302.mockapi.io/foodieData';
  constructor(private http: HttpClient) { }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getDatabyId(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  addData(item: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, item)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateData(id: string, item: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, item)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteData(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong, please try again later.');
  }
}
