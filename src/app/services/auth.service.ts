import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { AuthData } from '../models/AuthData';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  private errorHandler(errorRes: HttpErrorResponse) {
    let errorMsg = 'Something went wrong';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMsg);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMsg = 'This email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg = 'The email or password do not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMsg = 'The email or password do not exist';
        break;
    }
    return throwError(errorMsg);
  }

  signUp(email: string, password: string) {
    return this.http
      .post<AuthData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA1fwMSewf3UYB656G0litO2XP2UFBVUrc`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.errorHandler),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }
  login(email: string, password: string) {
    return this.http
      .post<AuthData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA1fwMSewf3UYB656G0litO2XP2UFBVUrc`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.errorHandler),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }
}
