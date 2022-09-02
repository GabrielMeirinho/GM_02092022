import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AppService {
  // Define API
  apiURL = 'http://localhost:8000';

  constructor(private http: HttpClient) {}
  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/
  // Http Options

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*'
  });
  

  // HttpClient API get() method => Fetch accounts list
  public getAccounts(): Observable<any> {
    return this.http
            .get<any>(this.apiURL + '/account',
            { headers: this.headers } )            
            .pipe(retry(1), catchError(this.handleError));
}
  // HttpClient API post() method => Create Account
  createAccount(acc: any): Observable<any> {
    return this.http.post<any>(
        this.apiURL + '/account',
        JSON.stringify(acc),
        { headers: this.headers })
   .pipe(retry(1), catchError(this.handleError));
  }


  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}