import * as fromApp from './../store/app.reducer';
import { Router } from '@angular/router';
import { HttpBackend, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import { AuthResponseData } from './model/auth-response-data';
import { SigninError } from './model/signin-error.enum';
import { SignupError } from './model/signup-error.enum';
import { User } from './model/user';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
  // user$ = new BehaviorSubject<User>(null);
  // newHttpClient = new HttpClient(this.httpBackend);
  expirationDurationTimer: any = null;

  constructor(
    // private http: HttpClient, 
    // private httpBackend: HttpBackend, 
    // private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  // signUp(email: string, password: string) {
  //   return this.newHttpClient.post<AuthResponseData>(environment.firebaseRestUrl + 'accounts:signUp?key=' + environment.firebaseApiKey,
  //     {
  //       email: email,
  //       password: password,
  //       returnSecureToken: true
  //     }).pipe(catchError(this.handleError), tap((resData) => this.handleAuthentication(resData)));
  // }

  // signIn(email: string, password: string) {
  //   return this.newHttpClient.post<AuthResponseData>(environment.firebaseRestUrl + 'accounts:signInWithPassword?key=' + environment.firebaseApiKey,
  //     {
  //       email: email,
  //       password: password,
  //       returnSecureToken: true
  //     }).pipe(catchError(this.handleError), tap((resData) => this.handleAuthentication(resData)))
  // }

  // logout() {
  //   // this.user$.next(null);
  //   // this.router.navigate(['/auth']);
  //   // localStorage.removeItem('userData');
  //   if(this.expirationDurationTimer) {
  //     clearTimeout(this.expirationDurationTimer);
  //   }
  //   this.expirationDurationTimer = null;
  // }

  // autoLogin() {
  //   const userData = JSON.parse(localStorage.getItem('userData'));
  //   if(!userData) {
  //     return;
  //   }

  //   const loadUser = new User(userData.email, userData.id, userData._token, userData._tokenExpirationDate);
  //   if(loadUser.token) {
  //     // this.user$.next(loadUser);
  //     this.store.dispatch(new AuthActions.AuthenticateSuccess({
  //       email: loadUser.email,
  //       id: loadUser.id,
  //       token: loadUser.token,
  //       expirationDate: userData._tokenExpirationDate
  //     }));
  //     const newExpirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
  //     this.autoLogout(newExpirationDuration);
  //   }
  // }

  clearLogoutTimer() {
    if (this.expirationDurationTimer) {
      clearTimeout(this.expirationDurationTimer);
    }
    this.expirationDurationTimer = null;
  }

  setLogoutTimer(expirationDuration: number) {
    this.expirationDurationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  // autoLogout(expirationDuration: number) {
  //     this.expirationDurationTimer = setTimeout(() => {
  //       this.logout();
  //     }, expirationDuration);
  // }

  // private handleAuthentication(responseData: AuthResponseData) {
  //   const expirationDate = new Date(new Date().getTime() + (+responseData.expiresIn) * 1000);
  //   const user = new User(responseData.email, responseData.localId, responseData.idToken, expirationDate);
  //   // this.user$.next(user);
  //   this.store.dispatch(new AuthActions.AuthenticateSuccess({
  //     email: user.email,
  //     id: user.id,
  //     token: user.token,
  //     expirationDate: expirationDate
  //   }));
  //   this.autoLogout((+responseData.expiresIn) * 1000);
  //   localStorage.setItem('userData', JSON.stringify(user));
  // }


  //   private handleError(errorResponse: HttpErrorResponse) {
  //     if (!errorResponse.error || !errorResponse.error.error) {
  //       return throwError(errorResponse);
  //     }

  //     let errorMessage = '';
  //     switch (errorResponse.error.error.message) {
  //       case 'EMAIL_EXISTS':
  //         errorMessage = SignupError.EMAIL_EXISTS;
  //         break;
  //       case 'OPERATION_NOT_ALLOWED':
  //         errorMessage = SignupError.OPERATION_NOT_ALLOWED;
  //         break;
  //       case 'TOO_MANY_ATTEMPTS_TRY_LATER':
  //         errorMessage = SignupError.TOO_MANY_ATTEMPTS_TRY_LATER;
  //         break;
  //       case 'EMAIL_NOT_FOUND':
  //         errorMessage = SigninError.EMAIL_NOT_FOUND;
  //         break;
  //       case 'INVALID_PASSWORD':
  //         errorMessage = SigninError.INVALID_PASSWORD;
  //         break;
  //       case 'USER_DISABLED':
  //         errorMessage = SigninError.USER_DISABLED;
  //         break;
  //     }

  //     if(errorResponse.error.error.message.includes('TOO_MANY_ATTEMPTS_TRY_LATER')){
  //       errorMessage = SigninError.TOO_MANY_ATTEMPTS_TRY_LATER;
  //     }

  //     return throwError(errorMessage);
  //   }
}
